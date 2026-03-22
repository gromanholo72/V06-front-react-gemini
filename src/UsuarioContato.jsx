

import { useState, useEffect, useRef, useCallback } from 'react'; 
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';
import { useAuth, URL_SERVIDOR } from './AutenticacaoContexto.jsx';

import './UsuarioContato.css'; 



export function UsuarioContato () {

    const emailInputRef = useRef(null);

    const [ ehNovoCadastro, setEhNovoCadastro ] = useState(false);

    const { dadosToken, carregandoPermissoesFireBase, setCarregandoModal } = useAuth();
    
    const [formContato, setFormContato] = useState({

        email: '',
        telefone: ''

    });




    

    
    // ---------------------------------
    // INICIO - 🏷️ Monitoramento de formContato
    // ---------------------------------

    // useEffect(() => {

    //     console.log("");
    //     console.log("✨ --------------------------------------------------");
    //     console.log("✨ useEffect() - Componente - 📞 UsuarioContato.jsx");
    //     console.log("✨ 🏷️ VARIÁVEL MONITORADA QUANTO A MUDANÇA");
    //     console.log("✨ OBS: Passa a primeira vez independente de mudancas");
    //     console.log("✨ 📞 formContato = ", formContato);
    //     console.log("✨ --------------------------------------------------");
   
    // }, [formContato]); 
    
    // ---------------------------------
    // FIM - 🏷️ Monitoramento de formContato
    // ---------------------------------


    const [podeEditar, setPodeEditar] = useState(false);

    // ---------------------------------
    // INICIO - ✏️ Foco Automático ao Editar
    // ---------------------------------

    useEffect(() => {
        if (podeEditar) {
            emailInputRef.current?.focus();
        }
    }, [podeEditar]);

    // ---------------------------------
    // FIM - ✏️ Foco Automático ao Editar
    // ---------------------------------






    
    // 🛠️ MÁSCARA DE EMAIL
    const mascaraEmail = (e) => {
        // 🧱 Trava de segurança da obra
        if (!podeEditar) return;
        
        // 🧱 Força minúsculas e remove espaços
        let v = e.target.value.toLowerCase().replace(/\s/g, '');
        
        setFormContato(prev => ({ ...prev, email: v }));
    };






    // 🛠️ MÁSCARA DE TELEFONE (Padrão solicitado)
    const mascaraTelefone = (e) => {
        // 🧱 Trava de segurança da obra
        if (!podeEditar) return;

        // 🧱 Passo 1: Limpeza total
        let v = e.target.value.replace(/\D/g, '');
    
        // 🧱 Passo 2: Corte (Máximo 11 números)
        if (v.length > 11) v = v.substring(0, 11);
    
        // 🧱 Passo 3: Assentamento Dinâmico (Aparece o parêntese logo no início)
        if (v.length > 0) {
            // Se tem pelo menos 1 número, já envolve com o parêntese
            v = v.replace(/^(\d{1,2})/, "($1"); 
        }
        if (v.length > 3) {
            // Se passou de 2 números (DDD), fecha o parêntese e dá o espaço
            v = v.replace(/^\((\d{2})(\d)/, "($1) $2");
        }
        if (v.length > 9) {
            // Se chegou no tamanho de celular, coloca o traço no lugar certo
            // Transforma (11) 988887777 em (11) 98888-7777
            v = v.replace(/(\d{5})(\d)/, "$1-$2");
        }

        // 📐 👔 console.log("📐 📱 fone formatado = ", v);
    
        // 🧱 Passo 4: Atualiza o Estado Local
        setFormContato(prev => ({ ...prev, telefone: v }));
    };







    


















    /* ----------------------------------------------------------- */
    /* INICIO - 🕵️‍♂️ FUNÇÃO: Distribui os dados do contato no card */
    /* ----------------------------------------------------------- */
    
    const popularCamposGerais = useCallback((dados) => {
        
        const mailFinal = dados?.mail || '';
        const foneFinal = dados?.fone || '';

        setFormContato({

            email: String(mailFinal).trim(),
            telefone: String(foneFinal).trim()

        });

    }, []);

    const limparCampos = useCallback(() => {

        setFormContato({ email: '', telefone: '' });

    }, []); 

    const carregarDadosDoBanco = useCallback(async () => {

        // 🛡️ A trava de segurança agora vive dentro da função que é chamada
        if (!dadosToken?.cpef) return;

        const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/dadosContato`);

        try {

            const snapshot = await get(caminhoNoBanco);
            
            if (snapshot.exists() && Object.values(snapshot.val()).some(v => v)) {

                const dadosContato = snapshot.val();

                console.log("");
                console.log("✨ --------------------------------------------------");
                console.log("✨ CARREGANDO DADOS DO CONTATO DIRETO DO FIREBASE");
                console.log("✨ useEffect() - Componente - 📞 UsuarioContato.jsx");
                console.log("✨ ✅ Contato encontrado no Realtime - dadosContato");
                console.log("✨ --------------------------------------------------");

                popularCamposGerais(dadosContato);
                setEhNovoCadastro(false);
                setPodeEditar(false);

            } else {

                console.warn("✨ 📍 Nenhum contato no banco. Liberando edição para novo cadastro.");
              
                limparCampos();
                setEhNovoCadastro(true);
                setPodeEditar(true);

            }

        } catch (error) {

            console.error("❌ Erro ao buscar contato na Antena Central:", error);

            setPodeEditar(true);

        }

    }, [dadosToken?.cpef, popularCamposGerais, limparCampos]); 

    useEffect(() => {

        if (carregandoPermissoesFireBase || !dadosToken?.cpef) {
            console.log("✨ 🛰️ Aguardando sinal da Antena Central para carregar Contato...");
            return;
        }

        carregarDadosDoBanco();

    }, [carregandoPermissoesFireBase, dadosToken?.cpef, carregarDadosDoBanco]); 

    /* ----------------------------------------------------------- */
    /* FIM - 🕵️‍♂️ FUNÇÃO: Distribui os dados do contato no card */
    /* ----------------------------------------------------------- */























    /* -------------------------------------------------------- */
    /* INICIO - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API) */
    /* -------------------------------------------------------- */

    const [msg, setMsg] = useState({ tipo: '', texto: '' });
    
    // ⏳ Função centralizada para limpar mensagens após um tempo
    const temporizadorMSG = () => {
        setTimeout(() => {
            setMsg({ tipo: '', texto: '' });
        }, 3000);
    };

    const salvardadosContato = async () => {
        
        // console.log("");
        // console.log("💾 📞 -----------------------------------");
        // console.log("💾 📞 INICIANDO SALVAMENTO:");
        // console.log("💾 📞 Componente - 📞 UsuarioContato.jsx");
        // console.log("💾 📞 Funcao: salvardadosContato()");
        // console.log("💾 📞 -----------------------------------");
    
        setMsg({ tipo: '', texto: '' });

        try {

            // 🛡️ VALIDAÇÃO DE SEGURANÇA: Bloqueia salvamento de campos vazios
            if (!formContato.email.trim() || !formContato.telefone.trim()) {

                console.log("💾 ⚠️ ALERTA: Tentativa de salvar com campos vazios barrada.");
                setMsg({ tipo: 'erro', texto: '⚠️ E-mail e Telefone são obrigatórios!' });
                if (!formContato.email.trim()) emailInputRef.current?.focus();  
                return; 

            }

            const cpefOriginal = dadosToken?.cpef;
            const cpfLimpo = cpefOriginal?.replace(/\D/g, "");

            // console.log("");
            // console.log("💾 📞 --------------------------------------");
            // console.log("💾 📞 🔍 EXTRAÇÃO DE IDENTIDADE:");
            // console.log("💾 📞 🛰️ Componente - 📞 UsuarioContato.jsx");
            // console.log("💾 📞 🆔 cpefOriginal:", cpefOriginal);
            // console.log("💾 📞 🆔 cpfLimpo (para URL):", cpfLimpo);
            // console.log("💾 📞 🌐 URL_SERVIDOR:", URL_SERVIDOR);
            // console.log("💾 📞 --------------------------------------");

            if (!cpfLimpo) {

                console.log("💾 📞 🚨 ERRO: CPF não encontrado. Abortando fetch.");
                throw new Error("CPF não identificado para atualização.");

            }



            const payload = {
                cpef: cpfLimpo,
                dadosContato: {
                    mail: formContato.email.trim(),
                    fone: formContato.telefone.trim()
                }
            };



            // console.log("");
            // console.log("📐 ----------------------------------");
            // console.log("📐 📦 DADOS PREPARADOS PARA ENVIO (CONTATO):");
            // console.log("📐 componente - UsuarioContato.jsx");
            // console.log("📐 payload:", payload);
            // console.log("📐 ----------------------------------");

            // �📡 Transmissão para a VPS
            const resposta = await fetch(`${URL_SERVIDOR}/atualizar-contato`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const resultado = await resposta.json();


            // console.log("💾 --------------------------------------------------");
            // console.log("💾 📥 RESPOSTA DO SERVIDOR:", { 
            //     status: resposta.status, 
            //     ok: resposta.ok, 
            //     resultado 
            // });



            if (resposta.ok) {

                // console.log("");
                // console.log("💾 📡 -----------------------------------------------------------");
                // console.log("💾 📡 Resposta do Servidor OK");
                // console.log("💾 🛰️ Componente - 📞 UsuarioContato.jsx");
                // console.log("💾 📡 Status : ✅ Sincronizado");
                // console.log("💾 📡 -----------------------------------------------------------");

                setMsg({ tipo: 'sucesso', texto: '✅ Contato atualizado com sucesso!' });

                carregarDadosDoBanco();

            } else {

                console.log("💾 ⚠️ SERVIDOR REJEITOU:", resultado.erro);
                setMsg({ tipo: 'erro', texto: resultado.erro });

            }

        } catch (error) {

            console.log("💾 🚨 FALHA CRÍTICA NO PROCESSO:");
            console.error("💾 🚨 Detalhes:", error);
            alert("❌ Erro de conexão com o servidor VPS.");

        } finally {

            temporizadorMSG();

        }
    };

    /* -------------------------------------------------------- */
    /* FIM - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API) */
    /* -------------------------------------------------------- */























return (

    <div className="componente-de-pagina">

        <div className="perfil-contato-componente-suporte">

                <div className="perfil-contato-usuario-card">

                    <div className="perfil-contato-card-titulo">📞 CONTATO</div>

                    {msg.texto && <div className={`cad-admin-feedback ${msg.tipo}`}>{msg.texto}</div>}

                    <div className="perfil-contato-card-corpo">

                        <div className="flex-contato-mail">
                            <label>E-mail</label>
                            <input 
                                ref={emailInputRef} 
                                id="campo-email"
                                type="email" 
                                name="email"
                                autoComplete="email"
                                placeholder="exemplo@maestro.com.br"
                                disabled={!podeEditar} 
                                value={formContato.email} 
                                onChange={mascaraEmail}
                                
                                style={{ 
                                    borderColor: (podeEditar && formContato.email.length > 0 && !formContato.email.includes('@')) ? 'red' : '',
                                    transition: 'border-color 0.3s ease' 
                                }} 
                                
                                autoCapitalize="none"
                                autoCorrect="off"

                            />
                        </div>


                        <div className="flex-contato-fone">
                            <label>Telefone / WhatsApp</label>
                            <input 
                                id="campo-telefone" 
                                type="text" 
                                name="tel"
                                autoComplete="tel" 
                                placeholder="(00) 00000-0000"
                                disabled={!podeEditar} 
                                value={formContato.telefone} 
                                onChange={mascaraTelefone} 
                                maxLength="15" 
                                
                                style={{ 
                                    borderColor: (podeEditar && formContato.telefone.length > 0 && formContato.telefone.length < 14) ? 'red' : '',
                                    transition: 'border-color 0.3s ease' 
                                }}
                                
                                inputMode="numeric" 

                            />
                        </div>










                        <div className="AreaBotoes">

                            {!podeEditar ? (
                                <button 
                                    type="button" 
                                    className="BotaoEditar" 
                                    onClick={() => {
                                        console.log("");
                                        console.log("📐 ----------------------------------");
                                        console.log("📐 🚀 EVENTO: Clique no botão '🔓 Editar Contato'");
                                        console.log("📐 componente - 🧿 UsuarioContato.jsx");
                                        console.log("📐 📍 setPodeEditar(true)");
                                        console.log("📐 ----------------------------------");
                                        setPodeEditar(true);
                                    }}
                                >
                                    🔓 Editar
                                </button>
                            ) : (
                                <>
                                    <button 
                                        type="button" 
                                        className="BotaoSalvar" 
                                        onClick={salvardadosContato}
                                    >
                                        💾 Salvar
                                    </button>
                                    
                                    {!ehNovoCadastro && (
                                        <button 
                                            type="button" 
                                            className="BotaoCancelar" 
                                            onClick={() => { 
                                                console.log("📐 ----------------------------------");
                                                console.log("📐 ✖️ CANCELAR: UsuarioContato.jsx");
                                                carregarDadosDoBanco(); 
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