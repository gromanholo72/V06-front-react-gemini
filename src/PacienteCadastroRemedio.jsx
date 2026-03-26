import { useState, useEffect, useRef, useCallback } from 'react';
import { ref, get, onValue, remove } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';
import { useAuth, URL_SERVIDOR } from './AutenticacaoContexto';

import './PacienteCadastroRemedio.css';

export function PacienteCadastroRemedio() {

    // ---------------------------------
    // INICIO - ⚓ ÂNCORAS E REFERÊNCIAS
    // ---------------------------------
    const remedioInputRef = useRef(null);
    const { dadosToken } = useAuth();
    // ---------------------------------
    // FIM - ⚓ ÂNCORAS E REFERÊNCIAS
    // ---------------------------------

    // ---------------------------------
    // INICIO - 📋 ESTADOS DO COMPONENTE
    // ---------------------------------
    // Estados de Controle
    const [carregandoOperacao, setCarregandoOperacao] = useState(false);
    const [podeEditar, setPodeEditar] = useState(false);

    // Estados de Dados
    const [remedio, setRemedio] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [horario, setHorario] = useState('');
    const [listaRemedios, setListaRemedios] = useState([]); // 📋 Lista para a tabela
    // ---------------------------------
    // FIM - 📋 ESTADOS DO COMPONENTE
    // ---------------------------------

    /* -------------------------------------------------------- */
    /* INICIO - 📨 SISTEMA DE MENSAGENS E FEEDBACK VISUAL */
    /* -------------------------------------------------------- */
    const [msg, setMsg] = useState({ tipo: '', texto: '' });

    const temporizadorMSG = useCallback(() => {
        setTimeout(() => {
            setMsg({ tipo: '', texto: '' });
        }, 4000);
    }, []);
    /* -------------------------------------------------------- */
    /* FIM - 📨 SISTEMA DE MENSAGENS E FEEDBACK VISUAL */
    /* -------------------------------------------------------- */

    // ---------------------------------
    // INICIO - 🏆 CONTROLE DE FLUXO (PONTO SÊNIOR)
    // ---------------------------------
    // 🏆 PONTO SÊNIOR 1: Trava de fluxo com Ref
    const podeEditarRef = useRef(podeEditar);
    useEffect(() => {
        podeEditarRef.current = podeEditar;
    }, [podeEditar]);
    // ---------------------------------
    // FIM - 🏆 CONTROLE DE FLUXO (PONTO SÊNIOR)
    // ---------------------------------

    // ---------------------------------
    // INICIO - 🧭 Sensor de Foco
    // ---------------------------------
    useEffect(() => {
        if (podeEditar) {
            remedioInputRef.current?.focus();
        }
    }, [podeEditar]);
    // ---------------------------------
    // FIM - 🧭 Sensor de Foco
    // ---------------------------------

    // ---------------------------------
    // INICIO - 📡 MONITORAMENTO DE LISTA (Igual CadAdministrador)
    // ---------------------------------
    
    useEffect(() => {
        const cpfAtivo = dadosToken?.cpef;
        
        // 🛡️ Escudo: Só liga se a máquina estiver pronta e tiver CPF
        if (cpfAtivo && db_realtime) {
            
            const cpfLimpo = cpfAtivo.replace(/\D/g, "");
            
            // 📐 Nó do Banco: dadosPaciente -> remedios (PLURAL para lista)
            const caminhoLista = ref(db_realtime, `usuarios/${cpfLimpo}/dadosPaciente/remedios`);

            console.log("✨ 📡 Iniciando monitoramento de Remédios...");

            const unsubscribe = onValue(caminhoLista, (snapshot) => {
                const dados = snapshot.val();
                
                if (dados) {
                    // 📐 Transforma Objeto do Firebase em Array para a Tabela
                    const listaFormatada = Object.keys(dados).map(key => ({
                        id: key,
                        ...dados[key]
                    }));
                    
                    setListaRemedios(listaFormatada);
                } else {
                    setListaRemedios([]);
                }
            });

            return () => unsubscribe();
        }
    }, [dadosToken, db_realtime]);

    // ---------------------------------
    // FIM - 📡 MONITORAMENTO DE LISTA
    // ---------------------------------

    // ---------------------------------
    // INICIO - 🗑️ FUNÇÃO DE REMOVER
    // ---------------------------------
    const removerRemedio = async (idRemedio) => {
        const cpfLimpo = dadosToken?.cpef.replace(/\D/g, "");
        if (window.confirm("⚠️ Tem certeza que deseja excluir este remédio?")) {
            try {
                const caminhoItem = ref(db_realtime, `usuarios/${cpfLimpo}/dadosPaciente/remedios/${idRemedio}`);
                await remove(caminhoItem);
            } catch (error) {
                alert("❌ Erro ao excluir remédio.");
            }
        }
    };
    // ---------------------------------
    // FIM - 🗑️ FUNÇÃO DE REMOVER
    // ---------------------------------




    // ---------------------------------
    // INICIO - 🕵️‍♂️ Distribui os dados para os cards
    // ---------------------------------
    const popularCampos = useCallback((dados) => {
        setRemedio(String(dados.nome || '').trim());
        setDosagem(String(dados.dose || '').trim());
        setHorario(String(dados.hora || '').trim());
    }, []);

    const limparCampos = useCallback(() => {
        setRemedio('');
        setDosagem('');
        setHorario('');
    }, []);





    const carregarDadosDoBanco = useCallback(async () => {
        const cpfAtivo = dadosToken?.cpef;

        if (cpfAtivo) {

            console.log("");
            console.log(" 💊 -----------------------------------------------------------");
            console.log(" 💊 Buscando dados de Remédio direto no Firebase");
            
            
            const cpfLimpo = cpfAtivo.replace(/\D/g, "");
            // 📐 Nó do Banco: dadosPaciente -> remedio
            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/dadosPaciente/remedio`);

            try {
                const snapshot = await get(caminhoNoBanco);
                
                if (snapshot.exists()) {
                    const dados = snapshot.val();
                    console.log("✨ ✅ Remédio encontrado no Realtime.");
                    popularCampos(dados);
                } else {
                    console.log("✨ 💊 Nenhum remédio cadastrado. Liberando edição.");
                    limparCampos();
                    setPodeEditar(true);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar Remédio na Antena Central:", error);
                setPodeEditar(true); 
            }
        }
    }, [dadosToken?.cpef, popularCampos, limparCampos]);




    
    // 🏆 Gatilho Seguro do useEffect (v1 estável)
    useEffect(() => {
        if (dadosToken?.cpef) {
            carregarDadosDoBanco();
        } else {
            console.warn("✨ ⏳ Aguardando sinal da Antena Central para carregar Remédio...");
        }
    }, [dadosToken, carregarDadosDoBanco]);
    // ---------------------------------
    // FIM - 🕵️‍♂️ Distribui os dados para os cards
    // ---------------------------------












/* -------------------------------------------------------- */
    /* INICIO - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API) */
    /* -------------------------------------------------------- */
    const salvarDadosRemedio = async () => {

        if (carregandoOperacao) return;

        setCarregandoOperacao(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMsg({ tipo: '', texto: '' });

        try {

            const cpfLimpo = dadosToken?.cpef ? dadosToken.cpef.replace(/\D/g, "") : "";

            console.log("");
            console.log("📡 -----------------------------------------------------------");
            console.log("📡 componente: PacienteCadastroRemedio.jsx");
            console.log("📡 Funcao: const salvarDadosRemedio");
            console.log("📡 🕵️‍♂️ CPF do Paciente:", cpfLimpo);
            console.log("📡 -----------------------------------------------------------");

            // 🛡️ VALIDAÇÃO DE SEGURANÇA
            if (!cpfLimpo) {
                setMsg({ tipo: 'erro', texto: 'Falha na identificação do usuário!' });
                setCarregandoOperacao(false);
                return;
            }

            if (!remedio.trim() || !dosagem.trim() || !horario.trim()) {
                setMsg({ tipo: 'erro', texto: '⚠️ Nome, Dosagem e Período são obrigatórios!' });
                if (!remedio.trim()) remedioInputRef.current?.focus();
                setCarregandoOperacao(false);
                return;
            }

            const payload = {
                cpef: cpfLimpo,
                dadosPaciente: {
                    remedio: {
                        nome: remedio.trim().toUpperCase(),
                        dose: dosagem.trim(),
                        hora: horario.trim(),
                        datc: new Date().toLocaleDateString('pt-BR'),
                        timestamp: Date.now()
                    }
                }
            };

            // ⏳ UX: Garante tempo mínimo de 1 segundo de loading
            const tempoMinimo = new Promise(resolve => setTimeout(resolve, 500));

            const requisicao = await fetch(`${URL_SERVIDOR}/atualizar-paciente-remedio`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const [resposta] = await Promise.all([requisicao, tempoMinimo]);

            const resultado = await resposta.json();

            if (resposta.ok) {

                console.log("✅ FUNDAÇÃO: Medicamento sincronizado!");
                setMsg({ tipo: 'sucesso', texto: '✅ Medicamento cadastrado com sucesso!' });

                // Limpeza de campos
                setRemedio('');
                setDosagem('');
                setHorario('');
                remedioInputRef.current?.focus(); 
                
            } else {
                setMsg({ tipo: 'erro', texto: resultado.erro });
            }

        } catch (error) {
            console.error("🚨 ERRO CRÍTICO:", error.message);
            setMsg({ tipo: 'erro', texto: '❌ Erro de conexão com o servidor VPS.' });
        } finally {
           
            setCarregandoOperacao(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            setTimeout(() => setMsg({ tipo: '', texto: '' }), 4000);
        }
    };
    /* -------------------------------------------------------- */
    /* FIM - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API)    */
    /* -------------------------------------------------------- */













    return (


        <div className="componente-principal">
            




            <div className="perfil-paciente-remedio-componente-suporte">





                <div className="perfil-paciente-remedio-usuario-card">
                    
                    <div className="perfil-paciente-remedio-card-titulo">💊 CADASTRO DE MEDICAMENTOS</div>

                    {msg.texto && <div className={`cad-admin-feedback-paciente-remedio ${msg.tipo}`}>{msg.texto}</div>}






                    <div className="perfil-paciente-remedio-card-corpo">

                        {carregandoOperacao && <div className="loading-overlay-card">⏳ Processando...</div>}

                        {/* Campo Remédio */}
                        <div className="Campo flex-paciente-remedio-nome">
                            <label>Nome</label>
                            <input 
                                ref={remedioInputRef}
                                type="text" 
                                placeholder="Ex: Dipirona 500mg"
                                // disabled={!podeEditar || carregandoOperacao} // Removido para permitir inclusão direta
                                value={remedio} 
                                onChange={(e) => setRemedio(e.target.value)}
                                autoComplete="off" 
                                required
                            />
                        </div>


                        {/* Agrupamento: Dosagem e Período (Para quebrarem juntos) */}
                        <div className="grupo-dose-horario">
                            
                            {/* Campo Dosagem */}
                            <div className="Campo flex-paciente-remedio-dose">
                                <label>Dosagem</label>
                                <input 
                                    type="text" 
                                    placeholder="Ex: 500mg"
                                    // disabled={!podeEditar || carregandoOperacao}
                                    value={dosagem} 
                                    onChange={(e) => setDosagem(e.target.value)}
                                    autoComplete="off" 
                                    required
                                />
                            </div>

                            {/* Campo Período */}
                            <div className="Campo flex-paciente-remedio-horario">
                                <label>Período</label>
                                <select
                                    // disabled={!podeEditar || carregandoOperacao}
                                    value={horario} 
                                    onChange={(e) => setHorario(e.target.value)} 
                                    required
                                >
                                    <option value="">Selecione...</option>
                                    <option value="6/6">6/6 hs</option>
                                    <option value="8/8">8/8 hs</option>
                                    <option value="12/12">12/12 hs</option>
                                </select>
                            </div>

                        </div>







                        {/* Área de Botões */}
                        <div className="AreaBotoes">
                            <button 
                                type="button" 
                                className="BotaoSalvar" 
                                disabled={carregandoOperacao}
                                onClick={salvarDadosRemedio}
                            >
                                📥 Incluir Medicamento
                            </button>
                        </div>

                    </div>
                </div>





                {/* -------------------------------------- */}
                {/* INICIO - 📋 LISTA DE REMÉDIOS          */}
                {/* -------------------------------------- */}

                <div className="perfil-paciente-remedio-usuario-card">
                    <div className="perfil-paciente-remedio-card-titulo">📋 LISTA DE MEDICAMENTOS CADASTRADOS</div>
                    <div className="perfil-paciente-remedio-card-corpo">
                        <table className="tabela-remedios">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Dose</th>
                                    <th>Período</th>
                                    <th style={{textAlign: 'center', width: '80px'}}>Remover</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaRemedios.length > 0 ? (
                                    listaRemedios.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.nome}</td>
                                            <td>{item.dose}</td>
                                            <td>{item.hora}</td>
                                            <td style={{textAlign: 'center'}}>
                                                <button className="botao-excluir-tabela" onClick={() => removerRemedio(item.id)}>🗑️</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Nenhum remédio cadastrado.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* -------------------------------------- */}
                {/* FIM - 📋 LISTA DE REMÉDIOS             */}
                {/* -------------------------------------- */}



            </div>

            
        </div>



    );
}