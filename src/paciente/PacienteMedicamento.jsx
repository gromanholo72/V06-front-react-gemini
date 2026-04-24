import { useState, useEffect, useRef, useCallback } from 'react';
import { ref, get, onValue, remove, push, set } from "firebase/database"; 
import { db_realtime } from '../firebaseConfig.js';
import { useAuth, URL_SERVIDOR } from '../AutenticacaoContexto.jsx';

import './PacienteMedicamento.css';

export function PacienteMedicamento() {

    // ---------------------------------
    // INICIO - ⚓ ÂNCORAS E REFERÊNCIAS
    // ---------------------------------
    const medicamentoInputRef = useRef(null);
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
    const [medicamento, setMedicamento] = useState('');
    const [dosagem, setDosagem] = useState('');
    const [horario, setHorario] = useState('');
    const [listaMedicamento, setListaMedicamento] = useState([]); // 📋 Lista para a tabela
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
            medicamentoInputRef.current?.focus();
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
            
            // 📐 Nó do Banco: dadosPaciente -> medicamento (SINGULAR para lista)
            const caminhoLista = ref(db_realtime, `usuarios/${cpfLimpo}/dadosPaciente/medicamento`);

            console.log("✨ 📡 Iniciando monitoramento de Medicamento...");

            const unsubscribe = onValue(caminhoLista, (snapshot) => {
                const dados = snapshot.val();
                
                if (dados) {
                    // 📐 Normalização Maestro: Converte objeto em lista indexada
                    const listaFormatada = Object.keys(dados).map(key => ({
                        id: key,
                        ...dados[key]
                    }));
                    
                    setListaMedicamento(listaFormatada);
                } else {
                    setListaMedicamento([]);
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
    const removerMedicamento = async (idMedicamento) => {
        const cpfLimpo = dadosToken?.cpef.replace(/\D/g, "");
        if (window.confirm("⚠️ Confirmar exclusão deste medicamento?")) {
            try {
                const caminhoItem = ref(db_realtime, `usuarios/${cpfLimpo}/dadosPaciente/medicamento/${idMedicamento}`);
                await remove(caminhoItem);
            } catch (error) {
                console.error("❌ Erro ao remover item:", error);
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
        setMedicamento(String(dados.nome || '').trim());
        setDosagem(String(dados.dose || '').trim());
        setHorario(String(dados.hora || '').trim());
    }, []);

    const limparCampos = useCallback(() => {
        setMedicamento('');
        setDosagem('');
        setHorario('');
    }, []);





    const carregarDadosDoBanco = useCallback(async () => {
        const cpfAtivo = dadosToken?.cpef;

        if (cpfAtivo) {

            console.log("");
            console.log(" 💊 -----------------------------------------------------------");
            console.log(" 💊 Buscando dados de Medicamento direto no Firebase");
            
            const cpfLimpo = cpfAtivo.replace(/\D/g, "");

            // 📐 Nó do Banco: dadosPaciente -> medicamento
            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/dadosPaciente/medicamento`);

            try {
                const snapshot = await get(caminhoNoBanco);

                if (snapshot.exists()) {
                    const dados = snapshot.val();
                    console.log("✨ ✅ Medicamento encontrado no Realtime.");
                    popularCampos(dados);
                } else {
                    console.log("✨ 💊 Antena limpa. Pronto para novo medicamento.");
                    limparCampos();
                    setPodeEditar(true);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar Medicamento na Antena Central:", error);
                setPodeEditar(true); 
            }
        }
    }, [dadosToken?.cpef, popularCampos, limparCampos]);




    
    // 🏆 Gatilho Seguro do useEffect (v1 estável)
    useEffect(() => {
        if (dadosToken?.cpef) {
            carregarDadosDoBanco();
        } else {
            console.warn("✨ ⏳ Aguardando sinal da Antena Central para carregar Medicamento...");
        }
    }, [dadosToken, carregarDadosDoBanco]);
    // ---------------------------------
    // FIM - 🕵️‍♂️ Distribui os dados para os cards
    // ---------------------------------



















    /* -------------------------------------------------------- */
    /* INICIO - 💾 SALVAR DIRETO NO FIREBASE (ANTENA CENTRAL)   */
    /* -------------------------------------------------------- */
    const salvarDadosMedicamento = async () => {

        if (carregandoOperacao) return;

        console.log("");
        console.log("💾 💊 -----------------------------------");
        console.log("💾 💊 INICIANDO SALVAMENTO DIRETO:");
        console.log("💾 💊 Componente - PacienteMedicamento.jsx");
        console.log("💾 💊 Funcao: salvarDadosMedicamento()");
        console.log("💾 💊 -----------------------------------");

        setCarregandoOperacao(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMsg({ tipo: '', texto: '' });

        try {
            const cpfLimpo = dadosToken?.cpef?.replace(/\D/g, "");

            if (!cpfLimpo) {
                console.error("✨ 💊 🛑 Falha crítica: CPF não encontrado para salvar paciente.");
                setMsg({ tipo: 'erro', texto: 'CPF não identificado.' });
                return;
            }

            if (!medicamento.trim() || !dosagem.trim() || !horario.trim()) {
                setMsg({ tipo: 'erro', texto: '⚠️ Nome, Dosagem e Período são obrigatórios!' });
                if (!medicamento.trim()) medicamentoInputRef.current?.focus();
                return;
            }

            // 📐 Preparando o pacote (Mapeamento V3)
            const novoMedicamento = {
                nome: medicamento.trim().toUpperCase(),
                dose: dosagem.trim(),
                hora: horario.trim(),
                datc: new Date().toLocaleDateString('pt-BR'),
                timestamp: Date.now()
            };

            console.log("");
            console.log("📐 ----------------------------------");
            console.log("📐 📦 DADOS PREPARADOS PARA GRAVAÇÃO DIRETA (FIREBASE):");
            console.log("📐 componente - PacienteMedicamento.jsx");
            console.log("📐 payload:", novoMedicamento);
            console.log("📐 ----------------------------------");

            // ⏳ UX: Garante tempo mínimo de 800 ms de loading (Padrão Maestro)
            const tempoMinimo = new Promise(resolve => setTimeout(resolve, 800));

            // 🔥 Gravação Direta na Antena Central (Lista de Medicamento)
            const caminhoLista = ref(db_realtime, `usuarios/${cpfLimpo}/dadosPaciente/medicamento`);
            const novaRef = push(caminhoLista);
            const operacaoFirebase = set(novaRef, novoMedicamento);

            await Promise.all([operacaoFirebase, tempoMinimo]);

            console.log("");
            console.log("💾 📡 -----------------------------------------------------------");
            console.log("💾 📡 Gravação Direta OK");
            console.log("💾 💊 Componente - PacienteMedicamento.jsx");
            console.log("💾 📡 Status : ✅ Sincronizado na Antena Central");
            console.log("💾 📡 -----------------------------------------------------------");

            setMsg({ tipo: 'sucesso', texto: '✅ Medicamento incluído com sucesso!' });

            // Limpeza e Foco
            setMedicamento('');
            setDosagem('');
            setHorario('');
            if (medicamentoInputRef.current) {
                medicamentoInputRef.current.focus();
            }

        } catch (error) {
            console.log("💾 🚨 FALHA CRÍTICA NO PROCESSO FIREBASE:");
            console.error("💾 🚨 Detalhes:", error);
            setMsg({ tipo: 'erro', texto: '❌ Erro ao conectar com o banco de dados.' });
        } finally {
            setCarregandoOperacao(false);
            temporizadorMSG();
        }
    };
    /* -------------------------------------------------------- */
    /* FIM - 💾 SALVAR DIRETO NO FIREBASE (ANTENA CENTRAL)      */
    /* -------------------------------------------------------- */
























    return (


        <div className="componente-principal">
            




            <div className="perfil-paciente-remedio-componente-suporte">





                <div className="perfil-paciente-remedio-usuario-card">
                    
                    <div className="perfil-paciente-remedio-card-titulo">💊 CADASTRO DE MEDICAMENTO</div>

                    {msg.texto && <div className={`cad-admin-feedback-paciente-remedio ${msg.tipo}`}>{msg.texto}</div>}






                    <div className="perfil-paciente-remedio-card-corpo">

                        {carregandoOperacao && <div className="loading-overlay-card">⏳ Processando...</div>}

                        {/* Campo Medicamento */}
                        <div className="Campo flex-paciente-remedio-nome">
                            <label>Nome</label>
                            <input 
                                ref={medicamentoInputRef}
                                type="text" 
                                placeholder="Ex: Dipirona 500mg"
                                // disabled={!podeEditar || carregandoOperacao} // Removido para permitir inclusão direta
                                value={medicamento} 
                                onChange={(e) => setMedicamento(e.target.value)}
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
                                onClick={salvarDadosMedicamento}
                            >
                                📥 Incluir Medicamento
                            </button>
                        </div>

                    </div>
                </div>





                {/* -------------------------------------- */}
                {/* INICIO - 📋 LISTA DE MEDICAMENTO       */}
                {/* -------------------------------------- */}

                <div className="perfil-paciente-remedio-usuario-card">
                    <div className="perfil-paciente-remedio-card-titulo">📋 LISTA DE MEDICAMENTO CADASTRADO</div>
                    <div className="perfil-paciente-remedio-card-corpo">
                        <table className="tabela-remedios">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Dose</th>
                                    <th>Período</th>
                                    <th style={{textAlign: 'center', width: '80px'}}>Excluir</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaMedicamento.length > 0 ? (
                                    listaMedicamento.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.nome}</td>
                                            <td>{item.dose}</td>
                                            <td>{item.hora}</td>
                                            <td style={{textAlign: 'center'}}>
                                                <button className="botao-excluir-tabela" onClick={() => removerMedicamento(item.id)}>🗑️</button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr><td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>Nenhum medicamento na lista.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* -------------------------------------- */}
                {/* FIM - 📋 LISTA DE MEDICAMENTO           */}
                {/* -------------------------------------- */}



            </div>

            
        </div>



    );
}