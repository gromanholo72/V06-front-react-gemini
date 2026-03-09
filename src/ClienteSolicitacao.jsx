import { useState, useEffect } from 'react';
import { ref, update, get, set } from "firebase/database"; 
// import { db_realtime } from './firebaseConfig.js';
import { useAuth } from './AutenticacaoContexto.jsx';

/* // 🧱 Importação do estilo padrão */
import './PacienteEstilo.css';

export function ClienteSolicitacao() {
    const { dadosPublicos } = useAuth();

    /* // 🧰 Ferramentas de Trabalho (Hooks) */
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [horarioSolicitado, setHorarioSolicitado] = useState('');

    /* // 🔒 Controle de Edição */
    const [podeEditar, setPodeEditar] = useState(false);

    /* // 🕵️‍♂️ FUNÇÃO: Carregar dados da Raiz Global */
    const carregarDados = async () => {
        if (!dadosPublicos.cpef) return;

        const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `solicitacao/${cpfLimpo}`);

        try {
            const snapshot = await get(caminhoNoBanco);

            if (snapshot.exists()) {
                const dados = snapshot.val();
                setDataInicio(dados.dataInicio || '');
                setDataFim(dados.dataFim || '');
                setHorarioSolicitado(dados.horarioSolicitado || '');
                
                /* // 🕵️‍♂️ Lógica de Validação: verifica se o intervalo e o turno existem */
                const temDados = !!(dados.dataInicio && dados.dataFim && dados.horarioSolicitado);
                setPodeEditar(!temDados);
            } else {
                setPodeEditar(true);
            }
        } catch (error) {
            console.error("❌ Erro ao buscar dados:", error);
        }
    };

    useEffect(() => { 
        carregarDados(); 
    }, [dadosPublicos.cpef]);

    /* // 💾 SALVAR NA RAIZ GLOBAL */
    const salvarNoBanco = async () => {
        try {
            const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `solicitacao/${cpfLimpo}`);

            const vetorDados = {
                cpef_cliente: cpfLimpo,
                nome_cliente: dadosPublicos.nome || "Não informado",
                dataInicio: dataInicio,
                dataFim: dataFim,
                horarioSolicitado: horarioSolicitado,
                status: "Pendente",
                dataEnvio: new Date().toISOString()
            };
    
            await set(caminhoNoBanco, vetorDados);

            alert("✅ Período enviado para análise!");
            setPodeEditar(false);
        } catch (error) {
            alert("Erro ao enviar período.");
        }
    };

    return (
        <div className="componente-principal-padrao">
            <div className="componente-suporte-padrao">

                {/* // 🧱 Card de Solicitação de Período */}
                <div className="card-padrao">
                    <div className="card-padrao-titulo">📅 SOLICITAR PERÍODO</div>

                    <div className="card-padrao-corpo">
                        
                        {/* // 📅 Data de Início */}
                        <div className="flex-cliente-solicitacao-inicio">
                            <label>📅 Data de Início</label>
                            <input 
                                type="date" 
                                disabled={!podeEditar} 
                                value={dataInicio} 
                                onChange={(e) => setDataInicio(e.target.value)} 
                            />
                        </div>

                        {/* // 📅 Data de Término */}
                        <div className="flex-cliente-solicitacao-fim">
                            <label>📅 Data de Término</label>
                            <input 
                                type="date" 
                                disabled={!podeEditar} 
                                value={dataFim} 
                                onChange={(e) => setDataFim(e.target.value)} 
                            />
                        </div>

                        {/* // ⏰ Turno */}
                        <div className="flex-cliente-solicitacao-hora">
                            <label>⏰ Turno Desejado</label>
                            <select 
                                disabled={!podeEditar} 
                                value={horarioSolicitado} 
                                onChange={(e) => setHorarioSolicitado(e.target.value)}
                                className="seletor-turno-padrao"
                                style={{ cursor: podeEditar ? 'pointer' : 'not-allowed' }}
                            >
                                <option value="">Selecione o turno</option>
                                <option value="07:00 às 19:00">07:00 às 19:00 (Dia) ☀️</option>
                                <option value="19:00 às 07:00">19:00 às 07:00 (Noite) 🌙</option>
                            </select>
                        </div>

                        <div className="AreaBotoes">
                            {!podeEditar ? (
                                <button type="button" className="BotaoEditar 🔓" onClick={() => setPodeEditar(true)}>
                                    🔓 Editar Período
                                </button>
                            ) : (
                                <>
                                    <button type="button" className="BotaoSalvar 💾" onClick={salvarNoBanco}>💾 Enviar Período</button>
                                    <button type="button" className="BotaoCancelar ✖️" onClick={() => { carregarDados(); setPodeEditar(false); }}>✖️ Cancelar</button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}