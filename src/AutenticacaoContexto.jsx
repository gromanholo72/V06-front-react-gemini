
// ⚛️ Ferramentas de Trabalho da Central:
import { createContext, useState, useContext, useEffect, useMemo, useRef } from 'react';

// import io from 'socket.io-client';

/* 1. Materiais de Base (Bibliotecas Externas) */

/* 1.1 - 🚀 Ferramentas de Autenticação (Ações do Vigia) */
import { signOut, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";

/* 1.2 - 💾 Operações do Banco de Dados (Busca e Referência) */
import { ref, get, onValue, update } from "firebase/database";

/* 2. A Fundação Energizada (O que você mesmo construiu) */
import { auth, db_realtime } from './firebaseConfig.js';

/* 🧱 2. Molde padrão (Antes do Provider) */
const valores_padrao_dadosToken = { 

    cpef: null,
    nome: 'Visitante',
    func: 'visitante'
    
};







/* 🤖 Inteligência de Ambiente: Detecta se é local ou produção */
// export const URL_SERVIDOR = window.location.hostname === "192.168.15.4" 
//     ? "http://192.168.15.4:3001"                         // Se estiver no PC
//     : "https://v06-back-node-gemini-production.up.railway.app"; // Se estiver no Railway

//     console.log("");
//     console.log("🔍 -----------------------------------------------------------");
//     console.log("🔍 INSPEÇÃO DE DOMÍNIO");
//     console.log("🔍 componente - 🏛️ AutenticacaoProvider.jsx");
//     console.log("🔍 Hostname atual:", window.location.hostname);
//     console.log("🔍 URL_SERVIDOR atribuida:", URL_SERVIDOR);
//     console.log("🔍 -----------------------------------------------------------");




/* 🤖 Inteligência de Ambiente: Detecta se é local ou produção */
export const URL_SERVIDOR = 
    (window.location.hostname === "localhost" || window.location.hostname.startsWith("192.168.")) 
    ? `http://${window.location.hostname}:3001`
    : "https://v06-back-node-gemini-production.up.railway.app";

// console.log("");
// console.log("🔍 -----------------------------------------------------------");
// console.log("🔍 INSPEÇÃO DE DOMÍNIO (Maestro Dynamic)");
// console.log("🔍 Hostname atual:", window.location.hostname);
// console.log("🔍 URL_SERVIDOR atribuida:", URL_SERVIDOR);
// console.log("🔍 -----------------------------------------------------------");














/* 🔌 Definição dos Canais de Comunicação */
const AutenticacaoContexto = createContext();





export const AutenticacaoProvider = ({ children }) => {











   









    const [usuarioSelecionadoContrato, setUsuarioSelecionadoContrato] = useState(null);
    useEffect(() => {
       
        // console.log("");
        // console.log("🔍 -----------------------------------------------------------");
        // console.log("🔍 componente - 🏛️ AutenticacaoProvider.jsx");
        // console.log("🔍 usuarioSelecionadoContrato", usuarioSelecionadoContrato);
        // console.log("🔍 -----------------------------------------------------------");

    }, [usuarioSelecionadoContrato]);











    /* ------------------------------------------------------- */
    /* INICIO - DADOS DO USUARIO CARREGADOS DIRETO DO FIREBASE */
    /* ------------------------------------------------------- */

    const [dadosUsuarioBanco, setDadosUsuarioBanco] = useState(null);
    useEffect(() => {
       
        // console.log("");
        // console.log("🔍 ---------------------------------------");
        // console.log("🔍 🏛️ AutenticacaoProvider.jsx");
        // console.log("🔍 0 - dadosUsuarioBanco", dadosUsuarioBanco);
        // console.log("🔍 ---------------------------------------");

    }, [dadosUsuarioBanco]);

    /* ------------------------------------------------------- */
    /* FIM - DADOS DO USUARIO CARREGADOS DIRETO DO FIREBASE */
    /* ------------------------------------------------------- */












    /* ---------------------------------------- */
    /* INICIO - VARIAVEL PARA TODOS OS USUARIOS */
    /* ---------------------------------------- */

    const [cadastroCompleto, setCadastroCompleto] = useState(false);
    useEffect(() => {

        // console.log("");
        // console.log("🔍 ---------------------------");
        // console.log("🔍 🏛️ AutenticacaoContexto.jsx");
        // console.log("🔍 1 - cadastroCompleto = ", cadastroCompleto);
        // if (cadastroCompleto) {
        //     console.log("✅ 🏛️ Status: Cadastro validado como completo!");
        //     console.log("⏳ 🏛️ Aguardando liberação de contrato pelo admin.");
        // }
        // console.log("🔍 Todos os usuarios");
        // console.log("🔍 ---------------------------");

    }, [cadastroCompleto]);

    /* ---------------------------------------- */
    /* FIM - VARIAVEL PARA TODOS OS USUARIOS */
    /* ---------------------------------------- */







    /* ---------------------------------------- */
    /* INICIO - VARIAVEL SOMENTE PARA CLIENTE */
    /* ---------------------------------------- */

    const [contratoLiberado, setContratoLiberado] = useState(false);
    useEffect(() => {
       
        // console.log("");
        // console.log("🔍 ------------------------------------");
        // console.log("🔍 🏛️ AutenticacaoProvider.jsx");
        // console.log("🔍 2 - contratoLiberado: ", contratoLiberado);
        // console.log("🔍 Somente para clientas");
        // console.log("🔍 ------------------------------------");
        
    }, [contratoLiberado]);

    const [contratoAssinado, setContratoAssinado] = useState(false);
    useEffect(() => {
       
        // console.log("");
        // console.log("🔍 ----------------------------------------");
        // console.log("🔍 🏛️ AutenticacaoProvider.jsx");
        // console.log("🔍 3 - contratoAssinado: ", contratoAssinado);
        // console.log("🔍 Somente para clientas");
        // console.log("🔍 ----------------------------------------");

    }, [contratoAssinado]);

    const [prontuarioLiberado, setProntuarioLiberado] = useState(false);
    useEffect(() => {
       
        // console.log("");
        // console.log("🔍 ------------------------");
        // console.log("🔍 🏛️ AutenticacaoProvider.jsx");
        // console.log("🔍 4 - prontuarioLiberado: ", prontuarioLiberado);
        // console.log("🔍 Somente para clientas");
        // console.log("🔍 ------------------------");

    }, [prontuarioLiberado]);

    /* ---------------------------------------- */
    /* FIM - VARIAVEL SOMENTE PARA CLIENTE */
    /* ---------------------------------------- */


















    // ----------------------------------------------------
    // INICIO - Inspeção das URL do servidor socket e dados
    // ----------------------------------------------------

    useEffect(() => {
       
        // console.log("");
        // console.log("🔍 -----------------------------------------------------------");
        // console.log("🔍 INSPEÇÃO DE AMBIENTE (Vite + AutenticacaoContexto)");
        // console.log("🔍 componente - 🏛️ AutenticacaoProvider.jsx");
        // console.log("🔍 Servidor de Dados e socket :", URL_SERVIDOR || "❌ Não Definido");
        // console.log("🔍 -----------------------------------------------------------");

    }, []);

    // ----------------------------------------------------
    // FIM - Inspeção das URL do servidor socket e dados
    // ----------------------------------------------------




























    // ------------------------------------------------
    // INICIO - MODAL PARA SALVAR CONTATO E ENDERECO
    // ------------------------------------------------

    const [carregandoOperacao, setCarregandoOperacao] = useState(false);
    const [msg, setMsg] = useState({ tipo: '', texto: '' });

    // ------------------------------------------------
    // FIM - MODAL PARA SALVAR CONTATO E ENDERECO
    // ------------------------------------------------




    

    // -------------------------------------------------------------------------
    // INICIO - 🔵 State do Modal Global (que você já usa) 
    // -------------------------------------------------------------------------

    const [carregandoModal, setCarregandoModal] = useState(() => {

        const valorInicial = false;

        // console.log("");
        // console.log("📐 ----------------------------------");
        // console.log("📐 useState() - componente - 🏛️ AutenticacaoContexto.jsx");
        // console.log("📐 Lazy Initialization - 🔵 carregandoModal");
        // console.log("📐 🏛️ 🔵 carregandoModal nasceu como = ", valorInicial);
        // console.log("📐 🏛️ ----------------------------------");
    
        return valorInicial;

    });

    /* // 🕵️ Monitora o carregandoModal */
    useEffect(() => {

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ useEffect() - Componente - 🏛️ AutenticacaoContexto.jsx");
        // console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🔵 carregandoModal = ", carregandoModal);
        // console.log("✨ ----------------------------------");
    
    }, [carregandoModal]); 

    // -------------------------------------------------------------------------
    // FIM - 🔵 State do Modal Global (que você já usa) 
    // -------------------------------------------------------------------------













    // -------------------------------------------------------------------------
    // INICIO - 🔵 State do Modal Global (que você já usa) 
    // -------------------------------------------------------------------------

    const [carregandoModalRapido, setCarregandoModalRapido] = useState(() => {

        const valorInicial = false;
    
        // console.log("");
        // console.log("📐 🏛️ ----------------------------------");
        // console.log("📐 🏛️ useState() - componente - 🏛️ AutenticacaoContexto.jsx");
        // console.log("📐 🏛️ Lazy Initialization - 🔵 carregandoModal");
        // console.log("📐 🏛️ 🔵 carregandoModalRapido nasceu como = ", valorInicial);
        // console.log("📐 🏛️ ----------------------------------");
    
        return valorInicial;

    });

    /* 🕵️ Monitora o carregandoModal */
    useEffect(() => {

        // console.log("");
        // console.log("✨ 🏛️ ----------------------------------");
        // console.log("✨ 🏛️ useEffect() - Componente - 🏛️ AutenticacaoContexto.jsx");
        // console.log("✨ 🏛️ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🏛️ 🔵 carregandoModalRapido = ", carregandoModalRapido);
        // console.log("✨ 🏛️ ----------------------------------");
    
    }, [carregandoModalRapido]); 

    // -------------------------------------------------------------------------
    // FIM - 🔵 State do Modal Global (que você já usa) 
    // -------------------------------------------------------------------------














    // ----------------------------------------------------
    // INICIO - Carrega dados iniciais e monitora dadosToken
    // ----------------------------------------------------

    const [dadosToken, setDadosToken] = useState(() => {
       
        const valorInicial = valores_padrao_dadosToken;
    
        // console.log("");
        // console.log("📐 🏛️ ----------------------------------");
        // console.log("📐 🏛️ useState() - componente - 🏛️ AutenticacaoProvider.jsx");
        // console.log("📐 🏛️ Lazy Initialization - 🎫 dadosToken");
        // console.log("📐 🏛️ 🎫 dadosToken nasceu como = ", valorInicial);
        // console.log("📐 🏛️ ----------------------------------");
        
        return valorInicial;

    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ 🏛️ ----------------------------------");
        // console.log("✨ 🏛️ useEffect() - Componente - 🏛️ AutenticacaoContexto.jsx");
        // console.log("✨ 🏛️ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🏛️ 🎫 dadosToken = ", dadosToken);
        // console.log("✨ 🏛️ ----------------------------------");
   
    }, [dadosToken]); 

    // ----------------------------------------------------
    // FIM - Carrega dados iniciais e monitora dadosToken
    // ----------------------------------------------------
    













    

    // ------------------------------------------------------
    /* INICIO - 📇 Dossiê do Usuário: Inicialização Estratégica */
    // ------------------------------------------------------

    const [dadosUsuarioCompleto, setDadosUsuarioCompleto] = useState(() => {
        
        const valorInicial = null;

        // console.log("");
        // console.log("📐 🏛️ ----------------------------------");
        // console.log("📐 🏛️ useState() - componente - 🏛️ AutenticacaoProvider.jsx");
        // console.log("📐 🏛️ Lazy Initialization - 🧖‍♂️ dadosUsuarioCompleto");
        // console.log("📐 🏛️ 🧖‍♂️ dadosUsuarioCompleto nasceu como = ", valorInicial);
        // console.log("📐 🏛️ ----------------------------------");

        return valorInicial;

    });

    /* // 🕵️ Monitora o dadosUsuarioCompleto */
    useEffect(() => {

        // console.log("");
        // console.log("✨ 🏛️ ----------------------------------");
        // console.log("✨ 🏛️ useEffect() - Componente - 🏛️ AutenticacaoProvider.jsx");
        // console.log("✨ 🏛️ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🏛️ 🧖‍♂️ dadosUsuarioCompleto = ", dadosUsuarioCompleto);
        // console.log("✨ 🏛️ ----------------------------------");

    }, [dadosUsuarioCompleto]);

    // ------------------------------------------------------
    /* FIM - 📇 Dossiê do Usuário: Inicialização Estratégica */
    // ------------------------------------------------------























    

    
























    






    // ----------------------------------------------------
    // INICIO - INFORMA TERMINO DO CARREGAMENTO DO FIREBASE
    // ----------------------------------------------------

    const [carregandoPermissoesFireBase, setCarregandoPermissoesFireBase] = useState(() => {
        
        // Configuração de Segurança por Padrão
        // O false apenas diz que o Firebase terminou a análise
        // Se ele terminou e achou um crachá: dadosToken terá os dados do usuário.
        // Se ele terminou e NÃO achou nada: dadosToken será { func: 'visitante' }.
        const valorInicial = true;

        // console.log("");
        // console.log("📐 🏛️ ----------------------------------");
        // console.log("📐 🏛️ useState() - componente - 🏛️ AutenticacaoProvider.jsx");
        // console.log("📐 🏛️ Lazy Initialization - 🙌 carregandoPermissoesFireBase");
        // console.log("📐 🏛️ 🙌 carregandoPermissoesFireBase nasceu como = ", valorInicial);
        // console.log("📐 🏛️ ----------------------------------");

        return valorInicial;

    });

    /* // 🕵️ Monitora o carregamento do Firebase */
    useEffect(() => {

        // console.log("");
        // console.log("✨ 🏛️ ----------------------------------");
        // console.log("✨ 🏛️ useEffect() - Componente - 🏛️ AutenticacaoContexto.jsx");
        // console.log("✨ 🏛️ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🏛️ 🙌 carregandoPermissoesFireBase = ", carregandoPermissoesFireBase);
        // console.log("✨ 🏛️ ----------------------------------");

    }, [carregandoPermissoesFireBase]);

    // ----------------------------------------------------
    // FIM - INFORMA TERMINO DO CARREGAMENTO DO FIREBASE
    // ----------------------------------------------------





















    // -------------------------------------------------------------------------
    // INICIO - 🔵 State Global: Balao Dica Meu Perfil (Maestro 2026)
    // -------------------------------------------------------------------------
    const [exibirBalaoDicaMeuPerfil, setExibirBalaoDicaMeuPerfil] = useState(() => {
        const valorInicial = false;
        // console.log("📐 🏛️ 💡 Balão Perfil nasceu como:", valorInicial);
        return valorInicial;
    });

    useEffect(() => {
        // console.log("✨ 🏛️ 💡 Mudança no Balão Perfil:", exibirBalaoDicaMeuPerfil);
    }, [exibirBalaoDicaMeuPerfil]);
    // -------------------------------------------------------------------------
    // FIM - 🔵 State Global: Balao Dica Meu Perfil
    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------
    // INICIO - 🔵 State Global: Balao Dica Meu Contrato (Maestro 2026)
    // -------------------------------------------------------------------------
    const [exibirBalaoDicaMeuContrato, setExibirBalaoDicaMeuContrato] = useState(() => {
        const valorInicial = false;
        // console.log("📐 🏛️ 📜 Balão Contrato nasceu como:", valorInicial);
        return valorInicial;
    });

    useEffect(() => {
        // console.log("✨ 🏛️ 📜 Mudança no Balão Contrato:", exibirBalaoDicaMeuContrato);
    }, [exibirBalaoDicaMeuContrato]);
    // -------------------------------------------------------------------------
    // FIM - 🔵 State Global: Balao Dica Meu Contrato
    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------
    // INICIO - 🔵 State Global: Balao Dica Prontuário Paciente (Maestro 2026)
    // -------------------------------------------------------------------------
    const [exibirBalaoDicaProntuarioPaciente, setExibirBalaoDicaProntuarioPaciente] = useState(() => {
        const valorInicial = false;
        // console.log("📐 🏛️ 🩺 Balão Prontuário nasceu como:", valorInicial);
        return valorInicial;
    });

    useEffect(() => {
        // console.log("✨ 🏛️ 🩺 Mudança no Balão Prontuário:", exibirBalaoDicaProntuarioPaciente);
    }, [exibirBalaoDicaProntuarioPaciente]);
    // -------------------------------------------------------------------------
    // FIM - 🔵 State Global: Balao Dica Prontuário Paciente
    // -------------------------------------------------------------------------





    



















    // ------------------------------
    /* INICIO - LOGIN CENTRALIZADO */
    // ------------------------------

    const logarNoFirebase = async (token) => {

        try {

            // console.log("");
            // console.log("🔥 ----------------------------------");
            // console.log("🔥 Componente: 🏛️ AutenticacaoProvider.jsx");
            // console.log("🔥 Funcao: logarNoFirebase = async (token) => {");
            // console.log("🔥 👔 Iniciando validação a pedido do login");
            // console.log("🔥 ----------------------------------");
            
            /* 1. O await trava aqui até o Firebase validar o material (Token) */
            const userCredential = await signInWithCustomToken(auth, token);
            
            /* 2. 🎟️ Resgate imediato das Claims (CPEF, Nome, Func) */
            const idTokenResult = await userCredential.user.getIdTokenResult();
            const claims = idTokenResult.claims;

            /* 3. 💾 Abastece as Ferramentas de Trabalho (Hooks) do Contexto */
            setDadosToken({
                cpef: claims.cpef,
                nome: claims.nome,
                func: claims.func
            });

            return true;

        } catch (error) {

            console.error("❌ Erro no login centralizado:", error.code, error.message);

            throw error; 
        }

    };

    // ------------------------------
    /* FIM - LOGIN CENTRALIZADO */
    // ------------------------------












    // -------------------------------------------------------------------------
    /* INICIO - 🕵️ const monitorarVigia = onAuthStateChanged(auth, async (user) => { */
    // -------------------------------------------------------------------------
    
    useEffect(() => {
    
        const monitorarVigia = onAuthStateChanged(auth, async (user) => {

        // console.log("");
        // console.warn("✨ 📢 🟢 ----------------------------------");
        // console.warn("✨ 📢 🟢 Componente - 🏛️ AutenticacaoContexto.jsx");
        // console.warn("✨ 📢 🟢 useEffect() - const monitorarVigia firebase");
        // console.warn("✨ 📢 🟢 VIGIA ACORDOU!");
        // console.warn("✨ 📢 🟢 user:", user );
       
            try {

                if (user) {

                    const idTokenResult = await user.getIdTokenResult();

                    setDadosToken({
                        cpef: idTokenResult.claims.cpef,
                        nome: idTokenResult.claims.nome,
                        func: idTokenResult.claims.func
                    });

                } else {

                    // console.warn("✨ 📢 🛑 Nenhum usuário ativo. Definindo como visitante.");

                    setDadosToken({ ...valores_padrao_dadosToken });

                }

            } catch (error) {

                console.warn("✨ 📢 🛑 Falha na vistoria do Vigia:", error.message);

                setDadosToken({ ...valores_padrao_dadosToken });

            } finally {

                // console.warn("✨ 📢 🟢 ----------------------------------");

                setCarregandoPermissoesFireBase(false); 
                
            }

        });

        return () => monitorarVigia(); 

    }, []); 

    // -------------------------------------------------------------------------
    /* FIM - 🕵️ const monitorarVigia = onAuthStateChanged(auth, async (user) => { */
    // -------------------------------------------------------------------------















    /*  ---------------------------------------------- */
    /*  INICIO - 🧹 ROTINA DE SAÍDA (LOGOUT) - BLINDAGEM TOTAL */
    /*  ---------------------------------------------- */

    const onClickSair = async () => {

        try {

            /* 🧱 Avisa o Firebase para queimar o crachá */
            await signOut(auth);

            // if (navigate) navigate('/', { replace: true });

            setDadosToken(valores_padrao_dadosToken);

            // console.log("");
            // console.log("📴 🏛️ ✅ ----------------------------------");
            // console.log("📴 🏛️ ✅ Componente - 🏛️ AutenticacaoContexto.jsx");
            // console.log("📴 🏛️ ✅ const onClickSair = async () => {");
            // console.log("📴 🏛️ ✅ Vistoria: Sessão oficial do Firebase encerrada.");
            // console.log("📴 🏛️ ✅ ----------------------------------");
            // console.log("📴 🏛️ ✅ dadosToken resetado para o padrão de visitante.");
            // console.log("📴 🏛️ ✅ ID resetado para:", valores_padrao_dadosToken);

            // console.log("📴 🏛️ ✅ 📋 Relatório de Saída:", {
            //     localStorageLimpo: !localStorage.getItem('dadosToken'),
            //     estadoResetado: true,
            //     timestamp: new Array(new Date().toLocaleString())
            // });

            // console.log("📴 🏛️ ✅ ----------------------------------");

        } catch (error) {

            console.log("");
            console.log("📴 🏛️ ✅ ----------------------------------");
            console.log("📴 🏛️ ✅ Componente - 🏛️ AutenticacaoContexto.jsx");
            console.log("📴 🏛️ ✅ const onClickSair = async () => {");

           /* // 🚨 ALERTA DE FALHA NO PORTÃO: Log Unificado para Vistoria */
            console.log("📴 🏛️ ✅ ❌ FALHA CRÍTICA AO SAIR:", {

                mensagem: "O portão ficou entreaberto!",
                codigo: error.code,
                detalhe: error.message,
                instante: new Date().toLocaleString()

            });

            console.log("📴 🏛️ ✅ ----------------------------------");

        }

    };

    /*  ---------------------------------------------- */
    /*  FIM - 🧹 ROTINA DE SAÍDA (LOGOUT) - BLINDAGEM TOTAL */
    /*  ---------------------------------------------- */
    












    



    











    /* ------------------------------------------------------- */
    /* INICIO - VERIFICANDO SE CADASTRO DO ADMINISTRADOR ESTA COMPLETO */
    /* ------------------------------------------------------- */
    
    const [cadastroAdministrador, setCadastroAdministrador] = useState({
        temContatoBanco: false,
        temEnderecoBanco: false
    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ 🏛️ ----------------------------------");
        // console.log("✨ 🏛️ AutenticacaoContexto.jsx");
        // console.log("✨ 🏛️ cadastroAdministrador = ", cadastroAdministrador);
        // console.log("✨ 🏛️ ----------------------------------");

    }, [cadastroAdministrador]);

    useEffect(() => {
        // 1. Bloqueio básico: Sem CPF não faz nada
        if (!dadosToken?.cpef) return;

        // console.log("");
        // console.log("🔥 🛡️ ----------------------------------");
        // console.log("🔥 🛡️ Vigilância firebase em tempo real (administrador)");
        // console.log("🔥 🛡️ AutenticacaoContexto.jsx");
        // console.log("🔥 🛡️ cpef:", dadosToken?.cpef);
        // console.log("🔥 🛡️ func:", dadosToken?.func);

        // Inicializa como função vazia para evitar erro no return
        let unsubscribe = () => {}; 

        // 2. Fluxo Específico: CLIENTE
        if (dadosToken?.func === 'administrador') {

            const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
            
            if (!db_realtime) return;

            const caminho_firebase = ref(db_realtime, `usuarios/${cpfLimpo}`);

            // 📡 Inicia a escuta em tempo real
            unsubscribe = onValue(caminho_firebase, (snapshot) => {

                console.log("");
                console.log("🔥 📥 -----------------------------------------------");
                console.log("🔥 📥 onValue (É Administrador)");
                console.log("🔥 📥 Usuário é administrador. INICIANDO A VERIFICACA.");
                console.log("🔥 📥 snapshot.exists():", snapshot.exists());

                if (snapshot.exists()) {
                    const dadosUsuario = snapshot.val();

                    /* 🔐 Dados de Contato */
                    const dadosContato = dadosUsuario?.dadosContato;
                    const temContatoBanco = !!(dadosContato?.mail?.trim() && dadosContato?.fone?.trim());

                    /* ⚙️ Dados de Endereço */
                    const dadosEndereco = dadosUsuario?.dadosEndereco;
                    const temEnderecoBanco = !!(dadosEndereco?.cepe?.trim() && dadosEndereco?.nume?.trim());

                    

                    setCadastroAdministrador({ 
                        temContatoBanco: temContatoBanco, 
                        temEnderecoBanco: temEnderecoBanco 
                    });

                    /* 💎 Status de Cadastro */
                    const cadastroCompleto = temContatoBanco && temEnderecoBanco;
                    setCadastroCompleto(cadastroCompleto);
                    

                    /* 📜 Status de Contrato */
                    // const contratoLiberado = !!dadosUsuario?.dadosContrato?.contratoLiberado;
                    // setContratoLiberado(contratoLiberado);
                   

                    console.log("🔥 📥 dadosUsuario:", dadosUsuario);
                    console.log("🔥 📥 temContatoBanco:", temContatoBanco);
                    console.log("🔥 📥 temEnderecoBanco:", temEnderecoBanco);
                    console.log("🔥 📥 cadastroCompleto:", cadastroCompleto);
                    // console.log("🔥 📥 contratoLiberado:", contratoLiberado);


                    /* 🚀 Sincronia Automática */
                    if (cadastroCompleto === true && dadosUsuario?.dadosCadastro?.cadastroCompleto !== true) {

                        console.log("🚀 🔄 Atualização de cadastro completo do administrador.");
                        
                        const caminhoSincronia = ref(db_realtime, `usuarios/${cpfLimpo}/dadosCadastro`);

                        update(caminhoSincronia, {

                            cadastroCompleto: true,
                            cadastroCompletoData: new Date().toISOString()

                        }).catch(err => console.error("Erro sincronia:", err));

                    }
                } else {
                    
                    console.warn("🔥 ⚠️ Usuário não encontrado no Realtime Database.");
                    setCadastroAdministrador({ temContatoBanco: false, temEnderecoBanco: false });
                    setCadastroCompleto(false);

                }

                console.log("🔥 📥 --------------------------");

            }, (error) => {

                console.error("❌ 🔴 Erro no onValue (Cliente):", error.message);

            });

        } else {

            // 3. SE NÃO FOR CLIENTE: Limpa estados e permite que o próximo useEffect (ou lógica) assuma
           
            // console.log("🔥 🛡️ Usuário não é administrador.");
            // console.log("🔥 🛡️ Limpando estados de monitoramento administrador.");
            // console.log("🔥 🛡️ ------------------------------------------------");

            setCadastroAdministrador({ temContatoBanco: false, temEnderecoBanco: false });
            setCadastroCompleto(false);
            
        }

        // Limpeza do Listener ao desmontar ou mudar dependências
        return () => unsubscribe();

    }, [dadosToken?.cpef, dadosToken?.func, db_realtime]);

    /* ------------------------------------------------------- */
    /* FIM - VERIFICANDO SE CADASTRO DO ADMINISTRADOR ESTA COMPLETO */
    /* ------------------------------------------------------- */




















    /* ------------------------------------------------------- */
    /* INICIO - VERIFICANDO SE CADASTRO DO CLIENTE ESTA COMPLETO */
    /* ------------------------------------------------------- */
    
    const [cadastroCliente, setCadastroCliente] = useState({
        temContatoBanco: false,
        temEnderecoBanco: false
    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ 🏛️ ----------------------------------");
        // console.log("✨ 🏛️ AutenticacaoContexto.jsx");
        // console.log("✨ 🏛️ cadastroCliente = ", cadastroCliente);
        // console.log("✨ 🏛️ ----------------------------------");

    }, [cadastroCliente]);

    useEffect(() => {
        if (!dadosToken?.cpef) return;

        let unsubscribe = () => {};

        if (dadosToken?.func === 'cliente') {

            const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
            
            if (!db_realtime) return;

            const caminho_firebase = ref(db_realtime, `usuarios/${cpfLimpo}`);

            // 📡 Inicia a escuta em tempo real
            unsubscribe = onValue(caminho_firebase, (snapshot) => {

                if (snapshot.exists()) {

                    const dadosUsuario = snapshot.val();

                    setDadosUsuarioBanco(dadosUsuario);


                    
                    /* 🔐 Dados de Contato */
                    const dadosContato = dadosUsuario?.dadosContato;
                    const temContatoBanco = !!(dadosContato?.mail?.trim() && dadosContato?.fone?.trim());

                    /* ⚙️ Dados de Endereço */
                    const dadosEndereco = dadosUsuario?.dadosEndereco;
                    const temEnderecoBanco = !!(dadosEndereco?.cepe?.trim() && dadosEndereco?.nume?.trim());

                    setCadastroCliente({ 
                        temContatoBanco: temContatoBanco, 
                        temEnderecoBanco: temEnderecoBanco 
                    });



                    /* 💎 Status de Cadastro */
                    const cadastroCompleto = temContatoBanco && temEnderecoBanco;
                    setCadastroCompleto(cadastroCompleto);
                    


                    /* 📜 Status de Contrato */
                    const contratoLiberado = !!dadosUsuario?.dadosContrato?.contratoLiberado;
                    const contratoAssinado = !!dadosUsuario?.dadosContrato?.contratoAssinado;
                    setContratoLiberado(contratoLiberado);
                    setContratoAssinado(contratoAssinado);
                    


                    /* 📜 Prontuario Liberado */
                    const prontuarioLiberado = !!dadosUsuario?.dadosProntuario?.prontuarioLiberado;
                    setProntuarioLiberado(prontuarioLiberado);
                   

                    console.log("");
                    console.log(" ----------------------------------");
                    console.log("🏛️ AutenticacaoContexto.jsx");
                    console.log("🔥 📥 DADOS RECEBIDOS: onValue (Cliente)");
                    // console.groupCollapsed("✨ 🏛️ DADOS:");
                    console.log("🔥 📥 dadosUsuarioBanco:", dadosUsuario);
                    console.log("🔥 📥 temContatoBanco:", temContatoBanco);
                    console.log("🔥 📥 temEnderecoBanco:", temEnderecoBanco);
                    console.log("🔥 📥 cadastroCompleto:", cadastroCompleto);
                    console.log("🔥 📥 contratoLiberado:", contratoLiberado);
                    console.log("🔥 📥 contratoAssinado:", contratoAssinado);
                    console.log("🔥 📥 prontuarioLiberado:", prontuarioLiberado);
                    // console.groupEnd();
                    console.log(" ---------------------------");




                    /* Atualiza informacao no banco de dados caso o cadastro esteja completo em preenchimento e tempo real*/
                    if (cadastroCompleto === true && dadosUsuario?.dadosCadastro?.cadastroCompleto !== true) {

                        console.log("🚀 🔄 Atualização de cadastro completo do cliente.");
                        
                        console.log("");
                        console.log("🚀 🔄 ----------------------------------");
                        console.log("🚀 🔄 SENSOR DE COMPLETUDE ATIVADO");
                        console.log("🚀 🔄 Ação: Limpando mensagens residuais e movendo para UsuarioLogado");
                        console.log("🚀 🔄 ----------------------------------");

                        // setMsg({ tipo: '', texto: '' });
                        
                        // window.location.pathname = "/interno/UsuarioLogado";
                       
                        const caminhoSincronia = ref(db_realtime, `usuarios/${cpfLimpo}/dadosCadastro`);

                        update(caminhoSincronia, {

                            cadastroCompleto: true,
                            cadastroCompletoData: new Date().toISOString()

                        }).catch(err => console.error("Erro no Banco: ", err));

                    }
                    



                    
                } else {
                    
                    console.warn("🔥 ⚠️ Usuário não encontrado no Realtime Database.");
                    setCadastroCliente({ temContatoBanco: false, temEnderecoBanco: false });
              
                    setCadastroCompleto(false);

                }

              

            }, (error) => {

                console.error("❌ 🔴 Erro no onValue (Cliente):", error.message);

            });

        } else {

            // 3. SE NÃO FOR CLIENTE: Limpa estados e permite que o próximo useEffect (ou lógica) assuma
           
            console.log("🔥 🛡️ Usuário não é Cliente.");
            console.log("🔥 🛡️ Limpando estados de monitoramento administrador.");
            console.log("🔥 🛡️ ------------------------------------------------");
            setCadastroCliente({ temContatoBanco: false, temEnderecoBanco: false });

            setCadastroCompleto(false);
            
        }

        // Limpeza do Listener ao desmontar ou mudar dependências
        return () => unsubscribe();

    }, [dadosToken?.cpef, dadosToken?.func, db_realtime]);

    /* ------------------------------------------------------- */
    /* FIM - VERIFICANDO SE CADASTRO DO CLIENTE ESTA COMPLETO */
    /* ------------------------------------------------------- */


    









    

    



    /*  ------------------------------------- */
    /*  INICIO DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */

    return (
        <AutenticacaoContexto.Provider value={{

            auth, 
            db_realtime,

            usuarioSelecionadoContrato,
            setUsuarioSelecionadoContrato,
            
           
            
            dadosUsuarioBanco,

            cadastroCompleto, 
            contratoLiberado,
            contratoAssinado,
            prontuarioLiberado,

            carregandoOperacao,
            setCarregandoOperacao,

            msg, 
            setMsg,

            carregandoModal,
            setCarregandoModal,

            carregandoModalRapido, 
            setCarregandoModalRapido,

            carregandoPermissoesFireBase, 
            setCarregandoPermissoesFireBase,

            exibirBalaoDicaMeuPerfil,
            setExibirBalaoDicaMeuPerfil,

            exibirBalaoDicaMeuContrato,
            setExibirBalaoDicaMeuContrato,

            exibirBalaoDicaProntuarioPaciente,
            setExibirBalaoDicaProntuarioPaciente,

            dadosToken,
            setDadosToken,

            logarNoFirebase,
            
           

            onClickSair

        }}>
            
            {children}

        </AutenticacaoContexto.Provider>

    );

    /*  ------------------------------------- */
    /*  FIM DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */

    



};


export const useAuth = () => useContext(AutenticacaoContexto);
