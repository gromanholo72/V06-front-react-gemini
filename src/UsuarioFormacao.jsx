import { useState, useEffect, useRef, useCallback } from 'react';
import { ref, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';
import { useAuth, URL_SERVIDOR } from './AutenticacaoContexto';

import './UsuarioFormacao.css';

export function UsuarioFormacao() {

    // ---------------------------------
    // INICIO - ⚓ ÂNCORAS E REFERÊNCIAS
    // ---------------------------------
    const nivelInputRef = useRef(null);
    const { dadosToken } = useAuth();
    // ---------------------------------
    // FIM - ⚓ ÂNCORAS E REFERÊNCIAS
    // ---------------------------------



    // ---------------------------------
    // INICIO - 📋 ESTADOS DO COMPONENTE
    // ---------------------------------
    const [nivel, setNivel] = useState('');
    const [especificacao, setEspecificacao] = useState('');
    const [registro, setRegistro] = useState('');
    const [instituicao, setInstituicao] = useState('');

    const [ehNovoCadastro, setEhNovoCadastro] = useState(false);
    const [carregandoOperacao, setCarregandoOperacao] = useState(false);
    const [podeEditar, setPodeEditar] = useState(false);
    // ---------------------------------
    // FIM - 📋 ESTADOS DO COMPONENTE
    // ---------------------------------



    // --------------------------------------------------------
    // INICIO - 📨 SISTEMA DE MENSAGENS E FEEDBACK VISUAL
    // --------------------------------------------------------
    const [msg, setMsg] = useState({ tipo: '', texto: '' });

    const temporizadorMSG = useCallback(() => {
        setTimeout(() => {
            setMsg({ tipo: '', texto: '' });
        }, 4000);
    }, []);
    // --------------------------------------------------------
    // FIM - 📨 SISTEMA DE MENSAGENS E FEEDBACK VISUAL
    // --------------------------------------------------------



    // ---------------------------------
    // INICIO - ✏️ FOCO AUTOMÁTICO AO EDITAR
    // ---------------------------------
    useEffect(() => {
        if (podeEditar) {
            nivelInputRef.current?.focus();
        }
    }, [podeEditar]);
    // ---------------------------------
    // FIM - ✏️ FOCO AUTOMÁTICO AO EDITAR
    // ---------------------------------



    // ---------------------------------
    // INICIO - 🏗️ FUNÇÕES DE MANIPULAÇÃO DE DADOS
    // ---------------------------------
    const popularCamposFormacao = useCallback((dados) => {
        setNivel(String(dados.nivel || '').trim());
        setEspecificacao(String(dados.espec || '').trim());
        setRegistro(String(dados.registro || '').trim());
        setInstituicao(String(dados.instituicao || '').trim());
    }, []);

    const limparCampos = useCallback(() => {
        setNivel('');
        setEspecificacao('');
        setRegistro('');
        setInstituicao('');
    }, []);
    // ---------------------------------
    // FIM - 🏗️ FUNÇÕES DE MANIPULAÇÃO DE DADOS
    // ---------------------------------



    // ---------------------------------
    // INICIO - 📡 CARREGAMENTO DE DADOS DO FIREBASE
    // ---------------------------------
    const carregarDadosDoBanco = useCallback(async () => {
        const cpfAtivo = dadosToken?.cpef;
        if (cpfAtivo) {
            console.warn("✨ 🛰️ Formação vazia na memória. Buscando na Antena Central...");
            const cpfLimpo = cpfAtivo.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/dadosFormacao`);

            try {
                const snapshot = await get(caminhoNoBanco);
                if (snapshot.exists()) {
                    const dadosFormacao = snapshot.val();
                    console.log("✨ ✅ Formação encontrada no Realtime. Populando campos...");
                    popularCamposFormacao(dadosFormacao);
                    setEhNovoCadastro(false);
                    setPodeEditar(false);
                } else {
                    console.log("✨ 📍 Nenhuma Formação no banco. Liberando edição.");
                    limparCampos();
                    setEhNovoCadastro(true);
                    setPodeEditar(true);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar Formação na Antena Central:", error);
                setPodeEditar(true);
            }
        }
    }, [dadosToken?.cpef, popularCamposFormacao, limparCampos]);

    useEffect(() => {
        if (dadosToken?.cpef) {
            carregarDadosDoBanco();
        } else {
            console.warn("✨ 🛰️ ⏳ Aguardando sinal da Antena Central para carregar Formação...");
        }
    }, [dadosToken, carregarDadosDoBanco]);
    // ---------------------------------
    // FIM - 📡 CARREGAMENTO DE DADOS DO FIREBASE
    // ---------------------------------



    // -------------------------------------------------------------
    // 🔄 PADRÃO SINCRETISTA FRONT-END (SALVAMENTO VPS)
    // -------------------------------------------------------------
    const salvardadosFormacao = async () => {
        // A - Logs de Início
        console.log("");
        console.log("💾 🎓 ------------------------------");
        console.log("💾 🎓 INICIANDO SALVAMENTO:");
        console.log("💾 🎓 Componente - UsuarioFormacao.jsx");
        console.log("💾 🎓 Funcao: salvardadosFormacao()");
        console.log("💾 🎓 -------------------------------");

        // B - Trava de Concorrência e UX Inicial
        if (carregandoOperacao) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMsg({ tipo: '', texto: '' });
        setCarregandoOperacao(true);

        try {
            // C - Extração e Validação do CPF
            const cpfLimpo = dadosToken?.cpef ? dadosToken.cpef.replace(/\D/g, "") : "";
            if (!cpfLimpo) {
                console.error("✨ 🎓 🛑 Falha crítica: CPF não encontrado para salvar nos cards.");
                return;
            }

            // D - Logs de Identidade
            console.log("");
            console.log("💾 🎓 -------------------------------");
            console.log("💾 🎓 🔍 EXTRAÇÃO DE IDENTIDADE:");
            console.log("💾 🎓 🛰️ Componente - UsuarioFormacao.jsx");
            console.log("💾 🎓 🆔 cpfLimpo (para URL):", cpfLimpo);
            console.log("💾 🎓 🌐 URL_SERVIDOR:", URL_SERVIDOR);
            console.log("💾 🎓 -------------------------------");

            // E - Preparação do Payload
            const payload = {
                cpef: cpfLimpo,
                dadosFormacao: {
                    nivel: nivel.trim(),
                    espec: especificacao.trim(),
                    regis: registro.trim(),
                    insti: instituicao.trim()
                }
            };

            // F - Logs do Payload
            console.log("");
            console.log("📐 ----------------------------------");
            console.log("📐 📦 DADOS PREPARADOS PARA ENVIO (Formacao):");
            console.log("📐 componente - UsuarioFormacao.jsx");
            console.log("📐 payload:", payload);
            console.log("📐 ----------------------------------");

            // G - UX: Tempo Mínimo de Loading
            const tempoMinimo = new Promise(resolve => setTimeout(resolve, 800));

            // H - Transmissão Assíncrona
            const requisicao = fetch(`${URL_SERVIDOR}/atualizar-formacao`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            // I - Espera Paralela
            const [resposta] = await Promise.all([requisicao, tempoMinimo]);
            const resultado = await resposta.json();

            // J - Tratamento do Resultado
            if (resposta.ok) {
                console.log("");
                console.log("💾 📡 -----------------------------------------------------------");
                console.log("💾 📡 Resposta do Servidor OK");
                console.log("💾 🎓 Componente - UsuarioFormacao.jsx");
                console.log("💾 📡 Status : ✅ Sincronizado");
                console.log("💾 📡 -----------------------------------------------------------");
                setMsg({ tipo: 'sucesso', texto: '✅ Dados de Formação atualizados com sucesso!' });
                carregarDadosDoBanco();
            } else {
                console.warn("💾 ⚠️ SERVIDOR REJEITOU:", resultado.erro);
                setMsg({ tipo: 'erro', texto: resultado.erro });
            }
        } catch (error) {
            // K - Tratamento de Falha Crítica
            console.error("💾 🚨 FALHA CRÍTICA NO PROCESSO:");
            console.error("💾 🚨 Detalhes:", error);
            setMsg({ tipo: 'erro', texto: '❌ Erro de conexão com o servidor VPS.' });
        } finally {
            // L - Finalização Obrigatória
            setCarregandoOperacao(false);
            temporizadorMSG();
        }
    };
    // -------------------------------------------------------------
    // FIM - 🔄 PADRÃO SINCRETISTA FRONT-END
    // -------------------------------------------------------------



    return (

        <div className="componente-de-pagina">

            <div className="perfil-formacao-componente-suporte">



                <div className="perfil-formacao-usuario-card">

                    <div className="perfil-formacao-card-titulo">🎓 FORMAÇÃO PROFISSIONAL</div>

                    {msg.texto && <div className={`cad-admin-feedback-formacao ${msg.tipo}`}>{msg.texto}</div>}

                    <div className="perfil-formacao-card-corpo">
                        {carregandoOperacao && <div className="loading-overlay-card-formacao">⏳ Processando...</div>}

                       

                        <div className="Campo-formacao flex-nivel-formacao">
                            <label>Nível de Formação<span className="asterisco-obrigatorio">*</span></label>
                            <select
                                ref={nivelInputRef} 
                                disabled={!podeEditar || carregandoOperacao} 
                                value={nivel} 
                                onChange={(e) => setNivel(e.target.value)}
                                className="SelectFormatado"
                            >
                                <option value="">Selecione uma opção...</option>
                                <option value="Cuidador">Cuidador(a) de Idosos</option>
                                <option value="Auxiliar">Auxiliar de Enfermagem</option>
                                <option value="Tecnico">Técnico(a) de Enfermagem</option>
                                <option value="Enfermeira">Enfermeiro(a)</option>
                            </select>
                        </div>

                        <div className="Campo-formacao flex-curso-formacao">
                            <label>Especificação / Curso</label>
                            <input
                                type="text"
                                placeholder="Especifique"
                                disabled={!podeEditar}
                                value={especificacao}
                                onChange={(e) => setEspecificacao(e.target.value)}
                            />
                        </div>

                        <div className="Campo-formacao flex-registro-formacao">
                            <label>Registro Profissional</label>
                            <input
                                type="text"
                                placeholder="Opcional"
                                disabled={!podeEditar}
                                value={registro}
                                onChange={(e) => setRegistro(e.target.value)}
                            />
                        </div>

                        <div className="Campo-formacao flex-instituicao-formacao">
                            <label>Instituição de Ensino</label>
                            <input
                                type="text"
                                placeholder="Nome da escola ou faculdade"
                                disabled={!podeEditar}
                                value={instituicao}
                                onChange={(e) => setInstituicao(e.target.value)}
                            />
                        </div>



                        <small className="observacao-obrigatorio-formacao">
                            Apenas o campo com <span className="asterisco-obrigatorio">*</span> é de preenchimento obrigatório.
                        </small>



                        <div className="AreaBotoes-formacao">
                            {!podeEditar ? (
                                <button type="button" className="BotaoEditar-formacao" onClick={() => setPodeEditar(true)}>
                                    🔓 Editar
                                </button>
                            ) : (
                                <>
                                    <button type="button" className="BotaoSalvar-formacao" onClick={salvardadosFormacao}>
                                        💾 Salvar
                                    </button>
                                    {!ehNovoCadastro && (
                                        <button
                                            type="button"
                                            className="BotaoCancelar-formacao"
                                            onClick={() => {
                                                carregarDadosDoBanco();
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                        >
                                            ✖️ Cancelar
                                        </button>
                                    )}
                                </>
                            )}
                        </div>







                    </div>
                </div>     
            </div>
        </div>
    );
}