
// ⚛️ Ferramentas de Trabalho da Central:
import { createContext, useState, useContext, useEffect, useMemo, useRef } from 'react';

import io from 'socket.io-client';

/* 1. Materiais de Base (Bibliotecas Externas) */

/* 1.1 - 🚀 Ferramentas de Autenticação (Ações do Vigia) */
import { signOut, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";

/* 1.2 - 💾 Operações do Banco de Dados (Busca e Referência) */
import { ref, get } from "firebase/database";

/* 2. A Fundação Energizada (O que você mesmo construiu) */
import { auth, db_realtime } from './firebaseConfig.js';

/* 🧱 2. Molde padrão (Antes do Provider) */
const valores_padrao_dadosToken = { 

    nome: 'Visitante', 
    cpef: null,
    func: 'visitante'
    
};







/* 🤖 Inteligência de Ambiente: Detecta se é local ou produção */
export const URL_SERVIDOR = window.location.hostname === "localhost" 
    ? "http://localhost:3001"                         // Se estiver no PC
    : "https://v06-back-node-gemini-production.up.railway.app"; // Se estiver no Railway

    console.log("");
    console.log("🔍 -----------------------------------------------------------");
    console.log("🔍 INSPEÇÃO DE DOMÍNIO");
    console.log("🔍 componente - 🏛️ AutenticacaoProvider.jsx");
    console.log("🔍 Hostname atual:", window.location.hostname);
    console.log("🔍 -----------------------------------------------------------");







/* 🔌 Definição dos Canais de Comunicação */
const AutenticacaoContexto = createContext();





export const AutenticacaoProvider = ({ children }) => {












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
    















    // ----------------------------------------------------
    // INICIO - CONECTA COM O SERVIDOR PARA CHAT (MENSAGENS)
    // ----------------------------------------------------

    //  useMemo(() guarda a variavel na memoria

    const socket = useMemo(() => {
        
        /* 🧱 Configurações de Conexão */
        const reconectaTentativas = Number(import.meta.env.VITE_SOCKET_RECONECT_ATTEMPTS) || 5;
        const tempoLimite = Number(import.meta.env.VITE_SOCKET_TIMEOUT) || 20000;

        /* 🚀 Iniciando a Ferramenta de Trabalho (Socket) */
        const novaConexao = io(URL_SERVIDOR, {
            transports: ["websocket", "polling"],
            autoConnect: true,
            withCredentials: true,
            reconnectionAttempts: reconectaTentativas,
            timeout: tempoLimite
        });

        // console.log("");
        // console.log("🔍 -----------------------------------------------------------");
        // console.log("🔍 INSPEÇÃO DE SUPRIMENTOS (Socket Connection)");
        // console.log("🔍 Servidor Destino (URL_SERVIDOR) :", URL_SERVIDOR);
        // console.log("🔍 Tentativas de Reconexão (env/5) :", reconectaTentativas);
        // console.log("🔍 Tempo Limite de Resposta (env/20k):", tempoLimite + "ms");
        // console.log("🔍 Transmimento (Transports)       :", "Websocket & Polling");
        // console.log("🔍 Status de Inicialização         :", "🚀 Conexão Disparada");
    
        // console.log("🔍 🏛️ Componente: AutenticacaoContexto.jsx");
        // console.log("🔍 🏛️ VITE_NOME_SISTEMA:", import.meta.env.VITE_NOME_SISTEMA || "Sistema do Giuliano - externo");
        // console.log("🔍 🏛️ VITE_VERSAO_SISTEMA:", import.meta.env.VITE_VERSAO_SISTEMA || "front V07 - producao");
        // console.log("🔍 -----------------------------------------------------------");

        return novaConexao;

    }, []); /* 📐 Trava a conexão para não repetir o aperto de mão */

    // ----------------------------------------------------
    // FIM - CONECTA COM O SERVIDOR PARA CHAT (MENSAGENS)
    // ----------------------------------------------------














    

    // ---------------------
    // INICIO - OBJETO BIND
    // ---------------------

    // 🧱 Adicione essa referência no topo do seu componente
    const bindRealizado = useRef(null);

    useEffect(() => {

        // 📐 Só dispara se tiver os dados, o socket e se o ID do socket atual ainda não fez bind
        if (dadosToken?.cpef && socket && bindRealizado.current !== socket.id) {

            const objetoBind = {
                sender_nome: dadosToken.nome,
                sender_cpef: dadosToken.cpef,
                user_role: dadosToken.func
            };

            // ✅ Tranca a porta: "Para este socket ID, o bind está feito!"
            bindRealizado.current = socket.id;
            
            socket.emit('bind', objetoBind);

            // console.log("");
            // console.log("✨ 🏛️ 🪀 ----------------------------------");
            // console.log("✨ 🏛️ 🪀 componente - 🏛️ AutenticacaoProvider.jsx");
            // console.log("✨ 🏛️ 🪀 socket.emit('bind', objetoBind);");
            // console.log("✨ 🏛️ 🪀 Socket.io - Vinculado aos cards de: ", objetoBind);
            // console.log("✨ 🏛️ 🪀 ----------------------------------");

        }
    }, [dadosToken, socket]);

    // ---------------------
    // FIM - OBJETO BIND
    // ---------------------












    // -------------------------------------------------------------
    // INICIO - socket.on('connect') e socket.on('disconnect')
    // -------------------------------------------------------------

    /* // 🏢 Sensor 2: Conexão com o Servidor VPS (Socket) */
    const [sinalServidor, setSinalServidor] = useState(false);

    useEffect(() => {
        
        // 🧱 Só inicia se o socket já estiver "na obra"
        if (socket) {
            
           
            
            let idTemporario = "";

            const aoConectar = () => {

                idTemporario = socket.id;

                setSinalServidor(true);

                // console.log("");
                // console.log("📡 🛰️ ----------------------------------");
                // console.log("📡 🛰️ 📻 componente 🏛️ AutenticacaoContexto.jsx");
                // console.log("📡 🛰️ 🟢 EVENTO ESPECIAL - socket.on('connect')");
                // console.log("📡 🛰️ 🏢 setSinalServidor(true)");
                // console.log("📡 🛰️ 🤝 Aperto de mao confirmado pelo 🏢 Servidor/VPS");
                // console.log(`📡 🛰️ 🆔 socket.id: ${socket.id}`);
                // console.log("📡 🛰️ 🏢 ----------------------------------");
        
            };

            const aoDesconectar = (motivo) => {

                setSinalServidor(false);

                // console.log("");
                // console.log("📡 🛰️ ----------------------------------");
                // console.log("📡 🛰️ 📻 componente 🏛️ AutenticacaoContexto.jsx");
                // console.log("📡 🛰️ 🛑 socket.on('disconnect')");
                // console.log(`📡 🛰️ 🆔 ID que saiu: ${idTemporario}`); 
                // console.log(`📡 🛰️ 📝 Motivo: ${motivo}`);
                // console.log("📡 🛰️ ----------------------------------");
            };

            // 🧱 1. Limpeza Preventiva (Zera antes de ligar)
            socket.off('connect', aoConectar);
            socket.off('disconnect', aoDesconectar);

            // 🧱 2. Liga os Sensores
            socket.on('connect', aoConectar);
            socket.on('disconnect', aoDesconectar);

            return () => {
                // 🧹 3. Cleanup Oficial
                socket.off('connect', aoConectar);
                socket.off('disconnect', aoDesconectar);
            };
        }

    }, [socket]);
    
    // -------------------------------------------------------------
    // FIM - socket.on('connect') e socket.on('disconnect')
    // -------------------------------------------------------------











    // -------------------------
    // INICIO - TOTAL CONECTADOS
    // -------------------------

    /* contagem de usuarios conectados */
    const [totalConect, setTotalConect] = useState(() => {

        const valorInicial = 0;

        // console.log("");
        // console.log("📐 🏛️ ----------------------------------");
        // console.log("📐 🏛️ useState() - componente - 🏛️ AutenticacaoContexto.jsx");
        // console.log("📐 🏛️ Lazy Initialization - 🔵 totalConect");
        // console.log("📐 🏛️ 🔵 totalConect nasceu como = ", valorInicial);
        // console.log("📐 🏛️ ----------------------------------");

        return valorInicial;

    });

   /* ✨ A FERRAMENTA DE TRABALHO - Ouvinte e Monitor */
    useEffect(() => {
       
        /* 🧱 2. Ligação com a VPS (Se o socket existir) */
        if (socket) {

            const tratarTotalConect = (dados) => {

                setTotalConect(dados.varTotalConect);
                
                // console.log("");
                // console.log("✨ 🏛️ ----------------------------------");
                // console.log("✨ 🏛️ useEffect() - componente - 🏛️ AutenticacaoContexto.jsx");
                // console.log("✨ 🏛️ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
                // console.log("✨ 🏛️ 🔵 totalConect = ", dados.varTotalConect);
                // console.log("✨ 🏛️ ----------------------------------");

            };

            socket.off('totalConect', tratarTotalConect); 

            socket.on('totalConect', tratarTotalConect);

            return () => {

                socket.off('totalConect', tratarTotalConect);

            };

        }

    }, [socket]); 

    // -------------------------
    // FIM - TOTAL CONECTADOS
    // -------------------------












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












    // ------------------------------
    /* INICIO - LOGIN CENTRALIZADO */
    // ------------------------------

    const logarNoFirebase = async (token) => {

        try {

            // console.log("🏛️ ----------------------------------");
            // console.log("🏛️ Componente - 🏛️ AutenticacaoProvider.jsx");
            // console.log("🏛️ logarNoFirebase = async (token) => {");
            // console.log("🏛️ 👔 Iniciando validação no Firebase...");
            
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

        console.log("");
        console.warn("✨ 🏛️ 🕵️‍♂️ 📢 🟢 ----------------------------------");
        console.warn("✨ 🏛️ 🕵️‍♂️ 📢 🟢 Componente - 🏛️ AutenticacaoContexto.jsx");
        console.warn("✨ 🏛️ 🕵️‍♂️ 📢 🟢 useEffect() - const monitorarVigia firebase");
        console.warn("✨ 🏛️ 🕵️‍♂️ 📢 🟢 VIGIA ACORDOU!");
        console.warn("✨ 🏛️ 🕵️‍♂️ 📢 🟢 user:", user );
    
            try {

                if (user) {

                    // 🎟️ USUÁRIO LOGADO: Extraímos as permissões do Token oficial
                    const idTokenResult = await user.getIdTokenResult();
                    const cpefNoToken = idTokenResult.claims.cpef;
                    const nomeNoToken = idTokenResult.claims.nome;
                    const funcNoToken = idTokenResult.claims.func;

                    setDadosToken({
                        cpef: idTokenResult.claims.cpef,
                        nome: idTokenResult.claims.nome,
                        func: idTokenResult.claims.func
                    });

                    // console.warn("✨ 🏛️ 👤 📢 🔵 Usuario possui token no Firebase Auth.");
                    // console.warn("✨ 🏛️ 👤 📢 🔵 🔑 user.uid:", user.uid);
                    // console.warn("✨ 🏛️ 👤 📢 🔵 cpef: idTokenResult.claims.cpef:", cpefNoToken);
                    // console.warn("✨ 🏛️ 👤 📢 🔵 nome: idTokenResult.claims.nome:", nomeNoToken);
                    // console.warn("✨ 🏛️ 👤 📢 🔵 func: idTokenResult.claims.func:", funcNoToken);
                    // console.warn("✨ 🏛️ 👤 📢 🔵 user.emailVerified = ", user.emailVerified);
                    // console.warn("✨ 🏛️ 👤 📢 🔵 user.isAnonymous = ", user.isAnonymous);
                    // console.warn("✨ 🏛️ 👤 📢 🔵 🏠 Nome do App =", auth?.app?.options?.projectId);
                    // console.warn("✨ 🏛️ 👤 📢 🔵 ----------------------------------");
            
                    if (user.uid) {

                        // ⏱️ Iniciando cronômetro para medir a performance da obra
                        const inicioBusca = performance.now();

                        const snap = await get(ref(db_realtime, `usuarios/${user.uid}`));

                        const fimBusca = performance.now();

                        const tempoGasto = (fimBusca - inicioBusca).toFixed(2);

                        if (snap.exists()) {

                            const dadosRecuperados = snap.val();

                            setDadosToken(prev => ({
                                ...prev,
                                // Só usa o dado do banco se o do Token (prev) estiver vazio
                                func: prev.func || dadosRecuperados?.func, 
                                nome: prev.nome || dadosRecuperados?.nome,
                                cpef: prev.cpef || dadosRecuperados?.cpef
                            }));

                            setDadosUsuarioCompleto(dadosRecuperados);

                            // console.log("");
                            // console.warn("✨ 🏛️ Componente - 🏛️ AutenticacaoContexto.jsx");
                            // console.warn("✨ 🏛️ 🎚️ COMANDO EXECUTADO");
                            // console.warn("✨ 🏛️ 🎚️ 🧖‍♂️ setDadosUsuarioCompleto(snap.val());");
                            // console.warn("✨ 🏛️ 🎚️  snap.val():", snap.val());
                            // console.warn("✨ 🏛️ 🎚️  dadosRecuperados?.func no banco de dados:", dadosRecuperados?.func);
                            // console.warn("✨ 🏛️ 🎚️  dadosRecuperados?.nome no banco de dados:", dadosRecuperados?.nome);
                            // console.warn("✨ 🏛️ 🎚️  dadosRecuperados?.cpef no banco de dados:", dadosRecuperados?.cpef);
                            // console.warn(`✨ 🏛️ 🎚️ ⏱️ Tempo de resposta da obra: ${tempoGasto}ms`);
                            // console.warn("✨ ----------------------------------");

                        } else {

                            setDadosToken({ 
                                func: 'visitante', 
                                nome: 'Visitante', 
                                cpef: null 
                            });

                            setDadosUsuarioCompleto(null);

                            console.log("");
                            console.error("✨ 🏛️ ----------------------------------");
                            console.error("✨ 🏛️ Componente - 🏛️ AutenticacaoContexto.jsx");
                            console.error("✨ 🏛️ 🔎 useEffect() - get(ref(db_realtime, ...))");
                            console.error("✨ 🏛️ ⚠️ AVISO: Usuário identificado, mas sem ficha no Database.");
                            console.error("✨ 🏛️ 📍 Local verificado: /usuarios/" + user.uid);
                            console.error(`✨ 🏛️ ⏱️ Busca concluída em: ${tempoGasto}ms`);
                            console.error("✨ 🏛️ ----------------------------------");

                        }

                    } else {

                        /* 🧱 Caso o UID (CPF) venha nulo ou indefinido do Auth */
                        console.error("");
                        console.error("✨ 🏛️ ----------------------------------");
                        console.error("✨ 🏛️ Componente - 🏛️ AutenticacaoContexto.jsx");
                        console.error("✨ 🏛️ 🚨 ERRO CRÍTICO: Identificador (UID/CPF) não encontrado no crachá.");
                        console.error("✨ 🏛️ 🕵️‍♂️ O Vigia não tem um alvo para buscar no banco.");
                        console.error("✨ 🏛️ ----------------------------------");
                        
                        setDadosToken({ 
                            func: 'visitante', 
                            nome: 'Visitante', 
                            cpef: null 
                        });

                        setDadosUsuarioCompleto(null);

                    }

                } else {

                    // console.warn("✨ 🏛️ 👤 📢 🛑 Nenhum usuário ativo. Definindo como visitante.");
                    // console.warn("✨ 🏛️ 👤 📢 🛑 ----------------------------------");
                    // console.warn("✨ 🏛️ 👤 📢 🛑 COMANDOS EXECUTADOS AQUI");
                    // console.warn("✨ 🏛️ 👤 📢 🛑 setDadosToken({ func: 'visitante', nome: 'Visitante', cpef: null });");
                    // console.warn("✨ 🏛️ 👤 📢 🛑 setDadosUsuarioCompleto(null)");
                    // console.warn("✨ 🏛️ 👤 📢 🛑 ----------------------------------");

                    setDadosToken({ 
                        func: 'visitante', 
                        nome: 'Visitante', 
                        cpef: null 
                    });

                    setDadosUsuarioCompleto(null);

                }

            } catch (error) {

                console.log("");
                console.error("✨ 🏛️ ----------------------------------");
                console.error("✨ 🏛️ Componente - 🏛️ AutenticacaoContexto.jsx");
                console.error("✨ 🏛️ 🚨 Falha na vistoria do Vigia:", error.message);
                console.error("✨ 🏛️ ----------------------------------");

            } finally {

                setCarregandoPermissoesFireBase(false); 
                
            }

        });

        // Desliga o vigia ao sair da obra
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

            setDadosToken(valores_padrao_dadosToken);

            setDadosUsuarioCompleto(null);

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
    











    /*  ------------------------------------- */
    /*  INICIO DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */

    return (
        <AutenticacaoContexto.Provider value={{

            auth, 
            db_realtime,
            
            socket, 
            totalConect,

            carregandoModal,
            setCarregandoModal,

            carregandoModalRapido, 
            setCarregandoModalRapido,

            carregandoPermissoesFireBase, 
            setCarregandoPermissoesFireBase,

            dadosToken,
            setDadosToken,

            dadosUsuarioCompleto, 
            setDadosUsuarioCompleto,

            logarNoFirebase,
            
            sinalServidor,

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
