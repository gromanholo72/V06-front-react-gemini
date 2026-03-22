

import { useState, useEffect, useRef } from 'react';
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto';

import './Formacao.css';



export function Formacao() {

    const { dadosToken } = useAuth();

    const formacaoInputRef = useRef(null);

    // 📦 Buscando o crachá no Armário (localStorage)
    // const dadosArmario = JSON.parse(localStorage.getItem('dadosPublicos')) || {};
    // const dadosUsuarioCompleto = {
    //     cpef: dadosArmario.cpef || "",
    //     nome: dadosArmario.nome || "Usuário"
    // };

    // 🧰 Ferramentas de Trabalho (Hooks)
    const [formacao, setFormacao] = useState('');
    const [especificacao, setEspecificacao] = useState('');
    const [registroProfissional, setRegistroProfissional] = useState('');
    const [instituicao, setInstituicao] = useState('');

    // 🔒 Controle de Edição
    const [ehNovoCadastro, setEhNovoCadastro] = useState(false);
    const [podeEditar, setPodeEditar] = useState(false);

    const [carregandoOperacao, setCarregandoOperacao] = useState(false);

    /* -------------------------------------------------------- */
    /* INICIO - 📨 SISTEMA DE MENSAGENS E FEEDBACK VISUAL */
    /* -------------------------------------------------------- */
    const [msg, setMsg] = useState({ tipo: '', texto: '' });

    // ⏳ Função centralizada para limpar mensagens após um tempo
    const temporizadorMSG = () => {
        setTimeout(() => {
            setMsg({ tipo: '', texto: '' });
        }, 4000);
    };
    /* -------------------------------------------------------- */
    /* FIM - 📨 SISTEMA DE MENSAGENS E FEEDBACK VISUAL */
    /* -------------------------------------------------------- */

    useEffect(() => {
        // Se o portão de edição abrir, foca no primeiro campo
        if (podeEditar) {
            formacaoInputRef.current?.focus();
        }
    }, [podeEditar]);
    













    
    useEffect(() => {
        // 🚀 CONSOLE DE INSPEÇÃO MAESTRO
        console.log("");
        console.log("🔍 -----------------------------------------------------------");
        console.log("🔍 INSPEÇÃO DE GATILHO - 🎓 Formacao.jsx");
        console.log("🔍 dadosToken está:", dadosToken);
        console.log("🔍 Possui CPEF?:", dadosToken?.cpef ? "✅ Sim" : "❌ Não");
        console.log("🔍 -----------------------------------------------------------");
    
        if (dadosToken?.cpef) {
            carregarDadosDoBanco();
        } else {
            console.warn("✨ ⏳ Aguardando sinal da Antena Central para carregar Formação...");
        }
    }, [dadosToken]);
    
    


    /* 🕵️‍♂️ FUNÇÃO: Carrega os dados da Antena Central */
    const carregarDadosDoBanco = async () => {
    
        const cpfAtivo = dadosToken?.cpef;

        if (cpfAtivo) {
            console.warn("✨ 🎓 Formação vazia na memória. Buscando na Antena Central...");
            
            const cpfLimpo = cpfAtivo.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/formacao_dados`);
    
            try {
                const snapshot = await get(caminhoNoBanco);
                
                if (snapshot.exists() && Object.values(snapshot.val()).some(v => v)) {
                    const dadosFormacao = snapshot.val();
                    console.warn("✨ ✅ Formação encontrada no Realtime.");
                    popularCamposFormacao(dadosFormacao);
                    setEhNovoCadastro(false);
                    setPodeEditar(false);
                } else {
                    console.warn("✨ 🎓 Nenhuma formação no banco. Liberando edição para novo cadastro.");
                    limparCampos();
                    setEhNovoCadastro(true);
                    setPodeEditar(true);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar formação na Antena Central:", error);
                setPodeEditar(true); // Libera edição em caso de erro
            }
        }
    };
    
    const limparCampos = () => {
        setFormacao('');
        setEspecificacao('');
        setRegistroProfissional('');
        setInstituicao('');
    };





    /* 🧱 Função Auxiliar para popular os estados dos cards */
    const popularCamposFormacao = (dados) => {
        // Se 'dados' for nulo ou vazio, o '||' garante que o campo fique limpo
        setFormacao(dados?.nivel || '');
        setEspecificacao(dados?.espec || '');
        setRegistroProfissional(dados?.reg || '');
        setInstituicao(dados?.inst || '');
    };










    // 💾 SALVAR NO FIREBASE
    const salvarEspecialidadeNoBanco = async () => {

        if (carregandoOperacao) return;

        // 🧱 VALIDAÇÃO DE SEGURANÇA
        if (!formacao.trim()) {
            setMsg({ tipo: 'erro', texto: '⚠️ Por favor, selecione o Nível de Formação.' });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            formacaoInputRef.current?.focus();
            return;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log("");
        console.log("📐 ----------------------------------");
        console.log("📐 🚀 EVENTO: Clique no botão '💾 Salvar Formação'");
        console.log("📐 componente - 🧿 Formacao.jsx");
        console.log("📐 📍 update(ref(db_realtime, `usuarios/...`))");
        console.log("📐 ----------------------------------");

        setCarregandoOperacao(true);
        setMsg({ tipo: '', texto: '' });

        try {

            const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, 'usuarios/' + cpfLimpo);

            const dadosFormacao = {
                nivel: formacao,
                espec: especificacao,
                reg: registroProfissional,
                inst: instituicao
            };

            // ⏳ UX: Garante tempo mínimo de loading para feedback visual
            const tempoMinimo = new Promise(resolve => setTimeout(resolve, 500));
            
            const operacaoBanco = update(caminhoNoBanco, { formacao_dados: dadosFormacao });

            await Promise.all([operacaoBanco, tempoMinimo]);

            setMsg({ tipo: 'sucesso', texto: '✅ Formação atualizada com sucesso!' });
            
            // Recarrega para garantir sincronia e travar edição
            carregarDadosDoBanco();

        } catch (error) {

            console.error("❌ Erro ao salvar:", error);
            setMsg({ tipo: 'erro', texto: '❌ Erro ao conectar com a Antena Central.' });

        } finally {
            setCarregandoOperacao(false);
            temporizadorMSG();
        }
    };















    return (

         <div className="componente-de-pagina">
            

            <div className="perfil-formacao-componente-suporte">

                {/* 🏗️ Início do Card de Formação */}
                <div className="perfil-formacao-usuario-card">
                    <div className="perfil-formacao-card-titulo">🎓 FORMAÇÃO PROFISSIONAL</div>

                    {/* 📨 Feedback Visual para o Usuário */}
                    {msg.texto && <div className={`cad-admin-feedback ${msg.tipo}`}>{msg.texto}</div>}
                                        
                    <div className="perfil-formacao-card-corpo">
                      
                            {carregandoOperacao && <div className="loading-overlay-card">⏳ Processando...</div>}
                      
                            
                            <div className="flex-nivel">
                                <label>Nível de Formação<span className="asterisco-obrigatorio">*</span></label>
                                <select
                                    ref={formacaoInputRef} 
                                    disabled={!podeEditar || carregandoOperacao} 
                                    value={formacao} 
                                    onChange={(e) => setFormacao(e.target.value)}
                                    className="SelectFormatado"
                                >
                                    <option value="">Selecione uma opção...</option>
                                    <option value="Cuidador">Cuidador(a) de Idosos</option>
                                    <option value="Auxiliar">Auxiliar de Enfermagem</option>
                                    <option value="Tecnico">Técnico(a) de Enfermagem</option>
                                    <option value="Enfermeira">Enfermeiro(a)</option>
                                    
                                </select>
                            </div>

                            <div className="flex-curso">
                                <label>Curso / Especialidade</label>
                                <input 
                                    type="text" 
                                    disabled={!podeEditar || carregandoOperacao} 
                                    value={especificacao} 
                                    onChange={(e) => setEspecificacao(e.target.value)} 
                                    placeholder="Ex: Geriatria, Instrumentação, etc."
                                />
                            </div>

                           
                            <div className="flex-registro">
                                <label>Registro Profissional</label>
                                <input 
                                    type="text" 
                                    disabled={!podeEditar || carregandoOperacao} 
                                    value={registroProfissional} 
                                    onChange={(e) => setRegistroProfissional(e.target.value)} 
                                />
                            </div>

                            <div className="flex-instituicao">
                                <label>Instituição de Ensino</label>
                                <input 
                                    type="text" 
                                    disabled={!podeEditar || carregandoOperacao} 
                                    value={instituicao} 
                                    onChange={(e) => setInstituicao(e.target.value)} 
                                />
                            </div>


                            <small className="observacao-obrigatorio">
                                Apenas o campo com <span className="asterisco-obrigatorio">*</span> é de preenchimento obrigatório.
                            </small>



                            <div className="AreaBotoes">

                                {!podeEditar ? (

                                    <button 
                                        type="button" 
                                        className="BotaoEditar" 
                                        onClick={() => {
                                            console.log("");
                                            console.log("📐 ----------------------------------");
                                            console.log("📐 🚀 EVENTO: Clique no botão '🔓 Editar Formação'");
                                            console.log("📐 componente - 🧿 Formacao.jsx");
                                            console.log("📐 📍 setPodeEditar(true)");
                                            console.log("📐 ----------------------------------");
                                            setPodeEditar(true)
                                        }}>
                                        🔓 Editar Formação
                                    </button>

                                ) : (
                                    <>
                                        <button 
                                            type="button" 
                                            className="BotaoSalvar" 
                                            disabled={carregandoOperacao}
                                            onClick={salvarEspecialidadeNoBanco}>
                                            {carregandoOperacao ? '⏳ Salvando...' : '💾 Salvar Formação'}
                                        </button>
                                        
                                        {!ehNovoCadastro && !carregandoOperacao && (
                                            <button type="button" className="BotaoCancelar" onClick={() => { 
                                                console.log("");
                                                console.log("📐 ----------------------------------");
                                                console.log("📐 🚀 EVENTO: Clique no botão '✖️ Cancelar'");
                                                console.log("📐 componente - 🧿 Formacao.jsx");
                                                console.log("📐 📍 carregarDadosDoBanco() & setPodeEditar(false)");
                                                console.log("📐 ----------------------------------");
                                                carregarDadosDoBanco(); setPodeEditar(false); 
                                            }}>✖️ Cancelar</button>
                                        )}
                                        
                                    </>
                                )}
                            </div>


                            
                      
                    </div>
                </div>
                {/* 🏗️ Fim do Card */}

            </div>
        </div>
    );
}