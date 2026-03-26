
import { useState, useEffect, useRef, useCallback } from 'react';
import { ref, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';
import { useAuth, URL_SERVIDOR } from './AutenticacaoContexto';
import './PacienteIdentificacao.css'; 

export function PacienteIdentificacao() {

    const nomeInputRef = useRef(null);
    const { dadosToken } = useAuth();
    
    const [ehNovoCadastro, setEhNovoCadastro] = useState(false);
   
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    
    const [carregandoOperacao, setCarregandoOperacao] = useState(false);
    const [podeEditar, setPodeEditar] = useState(false);

    // 🎯 Efeito de Injeção de Foco
    // Sempre que 'podeEditar' se tornar verdadeiro, o Maestro foca no input
    useEffect(() => {
        if (podeEditar) {
            // Pequeno delay para garantir que o disabled já saiu do DOM
            const timer = setTimeout(() => {
                nomeInputRef.current?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [podeEditar]);




    // ---------------------------------
    // INICIO - 🕵️‍♂️ Distribui os dados para os cards
    // ---------------------------------

    const popularCamposPaciente = useCallback((dados) => {
        setNome(String(dados.nome || '').trim());
        setIdade(String(dados.idad || '').trim());
    }, []);

    const limparCampos = useCallback(() => {
        setNome('');
        setIdade('');
    }, []);





    const carregarDadosDoBanco = useCallback(async () => {

        const cpfAtivo = dadosToken?.cpef;

        if (cpfAtivo) {
            console.warn("✨ 🛰️ Identificação vazia. Buscando na Antena Central...");
            
            const cpfLimpo = cpfAtivo.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/dadosPaciente`);

            try {
                
                const snapshot = await get(caminhoNoBanco);
                
                console.log("📐 -----------------------------------------------------------");
                console.log("📐 INSPEÇÃO DE DADOS (Antena Central)");
            
                const val = snapshot.exists() ? snapshot.val() : null;

                const info = val?.identificacao || val;
            
                // 🚀 A CONDIÇÃO MESTRA: O registro só é "Encontrado" se o 'info' tiver o NOME
                if (info && info.nome) {
                    console.log("📐 STATUS: ✅ Identificação encontrada.");
                    console.log("📐 DADOS EXTRAÍDOS:", info);
            
                    popularCamposPaciente(info);

                    console.log("📐 STATUS: ✅ Registro encontrado.");
                    console.log("📐 DADOS EXTRAÍDOS:", info);

                    popularCamposPaciente(info);
                    setEhNovoCadastro(false);
                    setPodeEditar(false);
                } else {

                    console.log("📐 STATUS: ❓ Registro inexistente no Firebase.");
                    console.log("📐 AÇÃO: Iniciando modo 'Novo Cadastro'.");

                    limparCampos();  
                    setEhNovoCadastro(true); 
                    setPodeEditar(true);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar identificação:", error);
                setPodeEditar(true); 
            }
        }
    }, [dadosToken?.cpef, popularCamposPaciente, limparCampos]);




    useEffect(() => {
        if (dadosToken?.cpef) {
            carregarDadosDoBanco();
        }
    }, [dadosToken, carregarDadosDoBanco]);

    // ---------------------------------
    // FIM - 🕵️‍♂️ Distribui os dados para os cards
    // ---------------------------------





    /* -------------------------------------------------------- */
    /* INICIO - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API) */
    /* -------------------------------------------------------- */

    const [msg, setMsg] = useState({ tipo: '', texto: '' });
    
    const temporizadorMSG = () => {
        setTimeout(() => {
            setMsg({ tipo: '', texto: '' });
        }, 3000);
    };



    const salvarDadosPaciente = async () => {
        if (carregandoOperacao) return;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setMsg({ tipo: '', texto: '' });
        setCarregandoOperacao(true); 

        try {
            const cpfLimpo = dadosToken?.cpef ? dadosToken.cpef.replace(/\D/g, "") : "";
            
            if (!cpfLimpo) {
                console.error("✨ 🛑 Falha crítica: CPF não encontrado.");
                return;
            }



            const payload = {
                cpef: cpfLimpo,
                dadosPaciente: {
                    identificacao: {
                        nome: nome.trim().toUpperCase(),
                        idad: idade.trim(),
                        datc: new Date().toLocaleDateString('pt-BR'),
                        timestamp: Date.now()
                    }
                }
            };



            const tempoMinimo = new Promise(resolve => setTimeout(resolve, 500));

            const requisicao = fetch(`${URL_SERVIDOR}/atualizar-paciente-identificacao`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const [resposta] = await Promise.all([requisicao, tempoMinimo]);
            const resultado = await resposta.json();

            if (resposta.ok) {
                setMsg({ tipo: 'sucesso', texto: '✅ Identificação atualizada!' });
                carregarDadosDoBanco();
            } else {
                setMsg({ tipo: 'erro', texto: resultado.erro });
            }

        } catch (error) {
            console.error("💾 🚨 FALHA CRÍTICA:", error);
            alert("❌ Erro de conexão com o servidor VPS.");
        } finally {
            setCarregandoOperacao(false); 
            temporizadorMSG();
        }
    };

    /* -------------------------------------------------------- */
    /* FIM - 💾 SALVAR VIA SERVIDOR VPS                         */
    /* -------------------------------------------------------- */





    return (
        <div className="componente-de-pagina">
            <div className="perfil-endereco-componente-suporte">
                <div className="perfil-endereco-usuario-card">
                    <div className="perfil-endereco-card-titulo">👤 IDENTIFICAÇÃO DO PACIENTE</div>

                    {msg.texto && <div className={`cad-admin-feedback-endereco ${msg.tipo}`}>{msg.texto}</div>}

                    <div className="perfil-endereco-card-corpo">

                        {carregandoOperacao && <div className="loading-overlay-card">⏳ Processando...</div>}

                        <div className="Campo flex-rua">
                            <label>Nome Completo</label>
                            <input 
                                ref={nomeInputRef}
                                type="text" 
                                disabled={!podeEditar || carregandoOperacao} 
                                value={nome} 
                                onChange={(e) => setNome(e.target.value)} 
                            />
                        </div>

                        <div className="Campo flex-numero">    
                            <label>Idade</label>
                            <input 
                                type="text" 
                                maxLength="3"
                                disabled={!podeEditar || carregandoOperacao} 
                                value={idade} 
                                onChange={(e) => setIdade(e.target.value.replace(/\D/g, ""))} 
                            />  
                        </div>







                        <div className="AreaBotoes">
                            {/* 🛡️ Só mostra o botão 'Editar' se NÃO estiver em modo de edição E NÃO for um novo cadastro */}
                            {!podeEditar && !ehNovoCadastro ? (
                                <button 
                                    type="button" 
                                    className="BotaoEditar" 
                                    onClick={() => { 
                                        setPodeEditar(true);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    🔓 Editar
                                </button>
                            ) : (
                                <>
                                    {/* Se pode editar OU for novo cadastro, mostra o Salvar */}
                                    <button 
                                        type="button" 
                                        className="BotaoSalvar" 
                                        disabled={carregandoOperacao}
                                        onClick={salvarDadosPaciente}
                                    >
                                        {carregandoOperacao ? '⏳ Salvando...' : '💾 Salvar'}
                                    </button>

                                    {/* O cancelar NÃO aparece em novos cadastros para não deixar o formulário vazio e travado */}
                                    {!ehNovoCadastro && !carregandoOperacao && (
                                        <button 
                                            type="button" 
                                            className="BotaoCancelar" 
                                            onClick={() => { 
                                                carregarDadosDoBanco(); 
                                                // setPodeEditar(false);
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