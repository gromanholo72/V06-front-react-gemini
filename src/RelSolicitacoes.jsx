import { useState, useEffect } from 'react';
import { ref, onValue, update, remove, set } from "firebase/database"; 
// import { db_realtime } from './firebaseConfig.js';

/* // 🧱 Estilo padrão compartilhado */
import './PacienteEstilo.css';

export function RelSolicitacoes() {
    /* // 🧰 Ferramentas de Trabalho (Hooks) */
    const [listaSolicitacoes, setListaSolicitacoes] = useState([]);

    /* // 🕵️‍♂️ Função para formatar data de AAAA-MM-DD para DD/MM/AAAA */
    const formatarDataBR = (dataEstrangeira) => {
        if (!dataEstrangeira) return '--/--/----';
        const [ano, mes, dia] = dataEstrangeira.split('-');
        return `${dia}/${mes}/${ano}`;
    };

    useEffect(() => {
        const caminhoNoBanco = ref(db_realtime, 'solicitacao');
        
        /* // 📡 Monitorando a chegada de novos cards de pedido em tempo real */
        const unsubscribe = onValue(caminhoNoBanco, (snapshot) => {
            const dados = snapshot.val();
            if (dados) {
                const arrayFormatado = Object.keys(dados).map(id => ({
                    id, /* // O ID interno é o cpef do cliente */
                    ...dados[id]
                }));
                setListaSolicitacoes(arrayFormatado);
            } else {
                setListaSolicitacoes([]);
            }
        });

        return () => unsubscribe();
    }, []);

    /* // ✅ FUNÇÃO: Aprovar e enviar para o mural de todas as cuidadoras */
    const aprovarSolicitacao = async (item) => {
        try {
            /* // 1. Caminho no perfil do paciente (Histórico individual) */
            const caminhoPaciente = ref(db_realtime, `paciente/${item.id}/solicitacao_aprovada`);
            
            /* // 2. Caminho GLOBAL para as CUIDADORAS (Oportunidade visível para todas) */
            const caminhoVagasGerais = ref(db_realtime, `vagas_abertas/${item.id}`);
            
            /* // 3. Caminho da solicitação pendente para limpeza */
            const caminhoPendente = ref(db_realtime, `solicitacao/${item.id}`);

            const dadosDaVaga = {
                clienteNome: item.nome_cliente,
                dataInicio: item.dataInicio,
                dataFim: item.dataFim,
                horarioSolicitado: item.horarioSolicitado,
                status: "Disponível",
                dataAprovacaoAdmin: new Date().toISOString(),
                clienteId: item.id
            };

            /* // 🚀 Processando a aprovação em massa nos cards do banco */
            
            /* // Atualiza o status para o cliente ver */
            await update(caminhoPaciente, { ...dadosDaVaga, status: "Aprovado" });
            
            /* // Publica a vaga no mural das cuidadoras */
            await set(caminhoVagasGerais, dadosDaVaga);
            
            /* // Remove da fila de espera do administrador */
            await remove(caminhoPendente);
            
            alert("✅ Pedido aprovado! Agora todas as cuidadoras podem visualizar esta vaga.");
            
        } catch (error) {
            console.error("Erro na aprovação:", error);
            alert("Erro ao processar a aprovação.");
        }
    };

    return (
        <div className="componente-principal-padrao">
            <div className="componente-suporte-padrao-administrador">
                <h2>📋 ANÁLISE DE AGENDAMENTOS</h2>
                
                {listaSolicitacoes.length === 0 ? (
                    <p>Nenhum pedido pendente no momento. 📭</p>
                ) : (
                    listaSolicitacoes.map((item) => (
                        /* // 🧱 Cards de Gerenciamento do Administrador */
                        <div key={item.id} className="card-padrao">
                            <div className="card-padrao-titulo">👤 Cliente: {item.nome_cliente}</div>
                            
                            <div className="card-padrao-corpo">
                                
                                <div className="info-solicitacao-periodo">
                                    <div className="item-solicitacao">
                                        <strong>📅 Início</strong>
                                        <span>{formatarDataBR(item.dataInicio)}</span>
                                    </div>

                                    <div className="item-solicitacao">
                                        <strong>📅 Término</strong>
                                        <span>{formatarDataBR(item.dataFim)}</span>
                                    </div>

                                    <div className="item-solicitacao">
                                        <strong>⏰ Turno</strong>
                                        <span>{item.horarioSolicitado}</span>
                                    </div>
                                </div>
                                
                                <div className="AreaBotoes">
                                    <button 
                                        type="button" 
                                        className="BotaoSalvar ✅" 
                                        onClick={() => aprovarSolicitacao(item)}
                                    >
                                        ✅ Aprovar Pedido
                                    </button>
                                    <button 
                                        type="button" 
                                        className="BotaoCancelar ✖️" 
                                        onClick={() => { /* Lógica para recusar */ }}
                                    >
                                        ✖️ Recusar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}