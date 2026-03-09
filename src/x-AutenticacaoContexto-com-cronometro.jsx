// ⚛️ Ferramentas de Trabalho da Central:
import { createContext, useState, useContext, useEffect, useMemo } from 'react';

import io from 'socket.io-client';


/* 1. Materiais de Base (Bibliotecas Externas) */

/* 1.1 - 🚀 Ferramentas de Autenticação (Ações do Vigia) */
import { signOut, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";

/* 1.2 - 💾 Operações do Banco de Dados (Busca e Referência) */
import { ref, get } from "firebase/database";

/* 2. A Fundação Energizada (O que você mesmo construiu) */
// import { auth, db_realtime } from './firebaseConfig.js';

/* 3. Logística e Rotas (As coordenadas da obra) */
// import { BASE_URL_SERVIDOR } from './config/api.js';




/* 🧱 2. Molde padrão (Antes do Provider) */
const valores_padrao_dadosToken = { 

    nome: 'Visitante', 
    cpef: null,
    func: 'visitante'
    
};




/* 🔌 Definição dos Canais de Comunicação */
const AutenticacaoContexto = createContext();
const CronometroContexto = createContext();

export const AutenticacaoProvider = ({ children }) => {


    // -------------------------
    // INICIO - Link do servidor
    // -------------------------

    // OBS: Pela natureza da constante esse estado {statusConexaoServidor} talvez nem seja usado

    const [statusConexaoServidor, setStatusConexaoServidor] = useState(() => {
        // 📐 O sistema verifica a sede antes de respirar
        const valorInicial = BASE_URL_SERVIDOR;

        // console.log("");
        // console.log("📐 ----------------------------------");
        // console.log("📐 useState() - componente - 🏛️ AutenticacaoContexto.jsx");
        // console.log("📐 Lazy Initialization - 📡 statusConexaoServidor");
        // console.log("📐 📡 Sede identificada: ", valorInicial);
        // console.log("📐 ----------------------------------");

        return valorInicial;

    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ useEffect() - Monitor de Estabilidade");
        // console.log("✨ 📡 Rota Ativa: ", statusConexaoServidor);
        // console.log("✨ ----------------------------------");

    }, [statusConexaoServidor]);

    // -------------------------
    // FIM - Link do servidor
    // -------------------------











    // -------------------------------------------------------------------------
    // INICIO - 🔵 State do Modal Global (que você já usa) 
    // -------------------------------------------------------------------------

    const [carregandoModal, setCarregandoModal] = useState(() => {

        const valorInicial = false;
    
        // console.log("");
        // console.log("📐 ----------------------------------");
        // console.log("📐 useState() - componente - 🏛️ AutenticacaoContexto.jsx");
        // console.log("📐 Lazy Initialization - 🔵 carregandoModal");
        // console.log("📐 🔵 carregandoModal nasceu como = ", valorInicial);
        // console.log("📐 ----------------------------------");
    
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











    // ----------------------------------------------------
    // INICIO - Carrega dados iniciais e monitora dadosToken
    // ----------------------------------------------------

    const [dadosToken, setDadosToken] = useState(() => {
       
        const valorInicial = valores_padrao_dadosToken;
    
        // console.log("");
        // console.log("📐 ----------------------------------");
        // console.log("📐 useState() - componente - 🏛️ AutenticacaoProvider.jsx");
        // console.log("📐 Lazy Initialization - 🎫 dadosToken");
        // console.log("📐 🎫 dadosToken nasceu como = ", valorInicial);
        // console.log("📐 ----------------------------------");
        
        return valorInicial;

    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ useEffect() - Componente - 🏛️ AutenticacaoContexto.jsx");
        // console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🎫 dadosToken = ", dadosToken);
        // console.log("✨ ----------------------------------");
   
    }, [dadosToken]); 

    // ----------------------------------------------------
    // FIM - Carrega dados iniciais e monitora dadosToken
    // ----------------------------------------------------
    












    // ----------------------------------------------------
    // INICIO - CONECTA COM O SERVIDOR PARA CHAT (MENSAGENS)
    // ----------------------------------------------------

    const socket = useMemo(() => {

        /* 🧱 Conectando usando a coordenada do seu .env */

        const novaConexao = io(BASE_URL_SERVIDOR, {

            transports: ["websocket"],
            autoConnect: true

        });

        // console.log("");
        // console.log("📐 🔵 ----------------------------------");
        // console.log("📐 🔵 componente - 🏛️ AutenticacaoProvider.jsx");
        // console.log("📐 🔵 CONECTA COM O SERVIDOR PARA CHAT (MENSAGENS)");
        // console.log("📐 🔵 BASE_URL_SERVIDOR:", BASE_URL_SERVIDOR);
        // console.log("📐 🔵 VITE_NOME_SISTEMA:", import.meta.env.VITE_NOME_SISTEMA);
        // console.log("📐 🔵 ----------------------------------");

        return novaConexao;

    }, []); /* 📐 Trava a conexão para não repetir o aperto de mão */

    // ----------------------------------------------------
    // FIM - CONECTA COM O SERVIDOR PARA CHAT (MENSAGENS)
    // ----------------------------------------------------









    

    // ---------------------
    // INICIO - OBJETO BIND
    // ---------------------

    useEffect(() => {
        if (dadosToken?.cpef && dadosToken.cpef !== 0) {


            const objetoBind = {
                sender_nome: dadosToken.nome,
                sender_cpef: dadosToken.cpef,
                user_role: dadosToken.func
            };
            
            socket.emit('bind', objetoBind);

            // console.log("");
            // console.log("📐 🪀 ----------------------------------");
            // console.log("📐 🪀 componente - 🏛️ AutenticacaoProvider.jsx");
            // console.log("📐 🪀 socket.emit('bind', objetoBind);");
            // console.log("📐 🪀 Socket.io - Vinculado aos cards de: ", objetoBind);
            // console.log("📐 🪀 ----------------------------------");

        }
    }, [dadosToken, socket]);

    // ---------------------
    // FIM - OBJETO BIND
    // ---------------------








    


    // -------------------------
    // INICIO - TOTAL CONECTADOS
    // -------------------------

    // todo useEffect que "liga um rádio" ou "abre uma escuta" (socket.on) 
    // precisa obrigatoriamente desse socket.off

    useEffect(() => {

        if (socket) {
           
            socket.on('totalConect', (dados) => {

                console.log("");
                console.log("✨ 🔵 ----------------------------------");
                console.log("✨ useEffect() - componente - 🏛️ AutenticacaoProvider.jsx");
                console.log("✨ 🔵 Recebido do Servidor VPS");
                console.log("✨ 👥 Total de Conexões nos Cards: ", dados.varTotalConect);
                console.log("✨ ----------------------------------");
                
            });
    
            return () => socket.off('totalConect');

        }

    }, [socket]);

    // -------------------------
    // FIM - TOTAL CONECTADOS
    // -------------------------














    // -------------------------------------------------------------------------
    /* INICIO - 🕵️ VIGIA DE SESSÃO E CARDS: Reconhecimento e Busca de Dados no Firebase */
    // -------------------------------------------------------------------------

    const [carregandoPermissoesFireBase, setCarregandoPermissoesFireBase] = useState(() => {
        
        // Configuração de Segurança por Padrão
        // O false apenas diz que o Firebase terminou a análise
        // Se ele terminou e achou um crachá: dadosToken terá os dados do usuário.
        // Se ele terminou e NÃO achou nada: dadosToken será { func: 'visitante' }.
        const valorInicial = true;

        console.log("");
        console.log("📐 ----------------------------------");
        console.log("📐 useState() - componente - 🏛️ AutenticacaoProvider.jsx");
        console.log("📐 Lazy Initialization - 🙌 carregandoPermissoesFireBase");
        console.log("📐 🙌 carregandoPermissoesFireBase nasceu como = ", valorInicial);
        console.log("📐 ----------------------------------");

        return valorInicial;

    });

    /* // 🕵️ Monitora o carregamento do Firebase */
    useEffect(() => {

        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ useEffect() - Componente - 🏛️ AutenticacaoContexto.jsx");
        console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        console.log("✨ 🙌 carregandoPermissoesFireBase = ", carregandoPermissoesFireBase);
        console.log("✨ ----------------------------------");

    }, [carregandoPermissoesFireBase]);












    // ------------------------------------------------------
    /* INICIO - 📇 Dossiê do Usuário: Inicialização Estratégica */
    // ------------------------------------------------------

    const [dadosUsuarioCompleto, setDadosUsuarioCompleto] = useState(() => {
        
        const valorInicial = null;

        // console.log("");
        // console.log("📐 ----------------------------------");
        // console.log("📐 useState() - componente - 🏛️ AutenticacaoProvider.jsx");
        // console.log("📐 Lazy Initialization - 🧖‍♂️ dadosUsuarioCompleto");
        // console.log("📐 🧖‍♂️ dadosUsuarioCompleto nasceu como = ", valorInicial);
        // console.log("📐 ----------------------------------");

        return valorInicial;

    });

    /* // 🕵️ Monitora o dadosUsuarioCompleto */
    useEffect(() => {

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ useEffect() - Componente - 🏛️ AutenticacaoProvider.jsx");
        // console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🧖‍♂️ dadosUsuarioCompleto = ", dadosUsuarioCompleto);
        // console.log("✨ ----------------------------------");

    }, [dadosUsuarioCompleto]);

    // ------------------------------------------------------
    /* FIM - 📇 Dossiê do Usuário: Inicialização Estratégica */
    // ------------------------------------------------------
















    /* 🧱 1. A NOVA FUNÇÃO DE LOGIN CENTRALIZADA */
    const logarNoFirebase = async (token) => {

        try {

            console.log("📐 🔵 ----------------------------------");
            console.log("📐 👔 Iniciando validação no Firebase...");
            console.log("📐 🎟️ Token recebido (resumo):", token?.substring(0, 20) + "...");
            
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











    useEffect(() => {
    
        // Assim que o Firebase termina de validar o token com sucesso, 
        // ele "assobia" para o seu Vigia (onAuthStateChanged)
        const monitorarVigia = onAuthStateChanged(auth, async (user) => {

        console.log("");
        console.warn("✨ 🕵️‍♂️ 📢 🟢 ----------------------------------");
        console.warn("✨ 🕵️‍♂️ 📢 🟢 Componente - 🏛️ AutenticacaoContexto.jsx");
        console.warn("✨ 🕵️‍♂️ 📢 🟢 useEffect() - const monitorarVigia firebase");
        console.warn("✨ 🕵️‍♂️ 📢 🟢 VIGIA ACORDOU!");
        console.warn("✨ 🕵️‍♂️ 📢 🟢 user:", user );
    
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

                    console.warn("✨ 👤 📢 🔵 Usuario possui token no Firebase Auth.");
                    console.warn("✨ 👤 📢 🔵 🔑 user.uid:", user.uid);
                    console.warn("✨ 👤 📢 🔵 cpef: idTokenResult.claims.cpef:", cpefNoToken);
                    console.warn("✨ 👤 📢 🔵 nome: idTokenResult.claims.nome:", nomeNoToken);
                    console.warn("✨ 👤 📢 🔵 func: idTokenResult.claims.func:", funcNoToken);
                    console.warn("✨ 👤 📢 🔵 user.emailVerified = ", user.emailVerified);
                    console.warn("✨ 👤 📢 🔵 user.isAnonymous = ", user.isAnonymous);
                    console.warn("✨ 👤 📢 🔵 🏠 Nome do App =", auth?.app?.options?.projectId);
                    console.warn("✨ 👤 📢 🔵 ----------------------------------");
            
                    if (user.uid) {

                        // ⏱️ Iniciando cronômetro para medir a performance da obra
                        const inicioBusca = performance.now();

                        console.warn("✨ 🔍 📢 🍛 Iniciando busca do card completo para user.uid:", user.uid);

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

                            console.log("");
                            console.warn("✨ Componente - 🏛️ AutenticacaoContexto.jsx");
                            console.warn("✨ 🎚️ COMANDO EXECUTADO");
                            console.warn("✨ 🎚️ 🧖‍♂️ setDadosUsuarioCompleto(snap.val());");
                            console.warn("✨ 🎚️  snap.val():", snap.val());
                            console.warn("✨ 🎚️  dadosRecuperados?.func no banco de dados:", dadosRecuperados?.func);
                            console.warn("✨ 🎚️  dadosRecuperados?.nome no banco de dados:", dadosRecuperados?.nome);
                            console.warn("✨ 🎚️  dadosRecuperados?.cpef no banco de dados:", dadosRecuperados?.cpef);
                            console.warn(`✨ 🎚️ ⏱️ Tempo de resposta da obra: ${tempoGasto}ms`);
                            console.warn("✨ ----------------------------------");

                        } else {

                            setDadosToken({ 
                                func: 'visitante', 
                                nome: 'Visitante', 
                                cpef: null 
                            });

                            setDadosUsuarioCompleto(null);

                            console.log("");
                            console.error("✨ ----------------------------------");
                            console.error("✨ Componente - 🏛️ AutenticacaoContexto.jsx");
                            console.error("✨ 🔎 useEffect() - get(ref(db_realtime, ...))");
                            console.error("✨ ⚠️ AVISO: Usuário identificado, mas sem ficha no Database.");
                            console.error("✨ 📍 Local verificado: /usuarios/" + user.uid);
                            console.error(`✨ ⏱️ Busca concluída em: ${tempoGasto}ms`);
                            console.error("✨ ----------------------------------");

                        }

                    } else {

                        /* 🧱 Caso o UID (CPF) venha nulo ou indefinido do Auth */
                        console.error("");
                        console.error("✨ ----------------------------------");
                        console.error("✨ Componente - 🏛️ AutenticacaoContexto.jsx");
                        console.error("✨ 🚨 ERRO CRÍTICO: Identificador (UID/CPF) não encontrado no crachá.");
                        console.error("✨ 🕵️‍♂️ O Vigia não tem um alvo para buscar no banco.");
                        console.error("✨ ----------------------------------");
                        
                        setDadosToken({ 
                            func: 'visitante', 
                            nome: 'Visitante', 
                            cpef: null 
                        });

                        setDadosUsuarioCompleto(null);

                    }

                } else {

                    /* 🧱 O Vigia confirmou que não há sessão ativa */
                    console.warn("✨ 👤 📢 🛑 Nenhum usuário ativo. Definindo como visitante.");
                    console.warn("✨ 👤 📢 🛑 ----------------------------------");
                    console.warn("✨ 👤 📢 🛑 COMANDOS EXECUTADOS AQUI");
                    console.warn("✨ 👤 📢 🛑 setDadosToken({ func: 'visitante', nome: 'Visitante', cpef: null });");
                    console.warn("✨ 👤 📢 🛑 setDadosUsuarioCompleto(null)");
                    console.warn("✨ 👤 📢 🛑 ----------------------------------");

                    setDadosToken({ 
                        func: 'visitante', 
                        nome: 'Visitante', 
                        cpef: null 
                    });

                    setDadosUsuarioCompleto(null);

                }

            } catch (error) {

                console.log("");
                console.error("✨ ----------------------------------");
                console.error("✨ Componente - 🏛️ AutenticacaoContexto.jsx");
                console.error("✨ 🚨 Falha na vistoria do Vigia:", error.message);
                console.error("✨ ----------------------------------");

            } finally {

                /* Independente do resultado, a vistoria inicial acabou */
                // Ja pode tentar carregar cards no banco de dados
                // já buscou os dados no banco e agora as permissões estão prontas
                setCarregandoPermissoesFireBase(false); 
                
            }

        });

        // Desliga o vigia ao sair da obra
        return () => monitorarVigia(); 

    }, []); // 🧱 Dica: Remova o [dadosToken?.cpef] se o Vigia deve rodar só no nascimento

    // -------------------------------------------------------------------------
    /* FIM - 🕵️ VIGIA DE SESSÃO E CARDS: Reconhecimento e Busca de Dados no Firebase */
    // -------------------------------------------------------------------------
























    /* // ---------------------------------------------- */
    /* // INICIO - 🧹 ROTINA DE SAÍDA (LOGOUT) - BLINDAGEM TOTAL */
    /* // ---------------------------------------------- */

    const onClickSair = async () => {

        try {

            /* 🧱 Avisa o Firebase para queimar o crachá */
            await signOut(auth);

            setDadosToken(valores_padrao_dadosToken);

            setDadosUsuarioCompleto(null);

            console.log("");
            console.log("📴 ✅ ----------------------------------");
            console.log("📴 ✅ Componente - 🏛️ AutenticacaoContexto.jsx");
            console.log("📴 ✅ const onClickSair = async () => {");
            console.log("📴 ✅ Vistoria: Sessão oficial do Firebase encerrada.");
            console.log("📴 ✅ ----------------------------------");
            console.log("📴 🔵 dadosToken resetado para o padrão de visitante.");
            console.log("📐 🔵 ID resetado para:", valores_padrao_dadosToken);

            console.log("📴 ✅ 📋 Relatório de Saída:", {
                localStorageLimpo: !localStorage.getItem('dadosToken'),
                estadoResetado: true,
                timestamp: new Array(new Date().toLocaleString())
            });

            console.log("📴 ✅ ----------------------------------");

        } catch (error) {

            console.log("");
            console.log("📴 ✅ ----------------------------------");
            console.log("📴 ✅ Componente - 🏛️ AutenticacaoContexto.jsx");
            console.log("📴 ✅ const onClickSair = async () => {");

           /* // 🚨 ALERTA DE FALHA NO PORTÃO: Log Unificado para Vistoria */
            console.log("📴 ✅ ❌ FALHA CRÍTICA AO SAIR:", {

                mensagem: "O portão ficou entreaberto!",
                codigo: error.code,
                detalhe: error.message,
                instante: new Date().toLocaleString()

            });

            console.log("📴 ✅ ----------------------------------");

        }

    };

    /* // ---------------------------------------------- */
    /* // FIM - 🧹 ROTINA DE SAÍDA (LOGOUT) - BLINDAGEM TOTAL */
    /* // ---------------------------------------------- */
    



















    /* // 🧱 Retorno da Central: O AutenticacaoContexto "abraça" o CronometroProvider */
    return (
        <AutenticacaoContexto.Provider value={{ 

            carregandoModal,
            setCarregandoModal,

            carregandoPermissoesFireBase, 
            setCarregandoPermissoesFireBase,

            dadosToken,
            setDadosToken,

            dadosUsuarioCompleto, 
            setDadosUsuarioCompleto,

            logarNoFirebase,

            socket,

            onClickSair

        }}>
            <CronometroProvider 
                dadosToken={dadosToken}  
                onClickSair={onClickSair} 
            >
                {children}
            </CronometroProvider>
        </AutenticacaoContexto.Provider>
    );




};








/* // ---------------------------------------------- */
/* // SETOR 2 - RELÓGIO (DINÂMICO) */
/* // ---------------------------------------------- */

const CronometroProvider = ({ children, dadosToken, onClickSair}) => {

    // ----------------------------------------------
    // --- INICIO DO - ⏱️ CRONÔMETRO CENTRALIZADO ---
    // ----------------------------------------------

    // Ferramentas de Trabalho (Hooks)
    const [tempoToken, setTempoToken] = useState(null); 

    // Conversor de Medidas Global)
    const formatarTempo = (segundosTotais) => {

        /* // 1. Se for a mensagem de cargo ilimitado (string), retorna o texto puro */
        if (typeof segundosTotais === 'string') return segundosTotais;

        /* // Se não for um número válido ou for menor que 1, entrega o padrão zerado */
        if (!segundosTotais || segundosTotais <= 0) return "00:00:00";

        const horas = Math.floor(segundosTotais / 3600);
        const minutos = Math.floor((segundosTotais % 3600) / 60);
        const segundos = segundosTotais % 60;
        return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

    };

    // Chamamos o conversor aqui para que os CARDS já recebam o relógio pronto (00:00:00)
    const tempoFormatado = formatarTempo(tempoToken);

    // 🛠️ Etapa 2: O Relógio (Agora muito mais leve)
    useEffect(() => {

        setTempoToken(null);

        if (dadosToken?.func === 'programador' || dadosToken?.func === 'administrador') {

            setTempoToken("Não possui tempo");
            return;

        }

        /* // 🚧 Espera o material (expiração) chegar antes de ligar o motor */
        if (!dadosToken?.exp) return;

        const agora = Math.floor(Date.now() / 1000);
        const segundosIniciais = dadosToken.exp - agora;

        /* // Sincroniza o valor inicial imediatamente */
        if (segundosIniciais > 0) {
            setTempoToken(segundosIniciais);
        }


        const cronometro = setInterval(() => {
            const agoraAtual = Math.floor(Date.now() / 1000);
            const segundosRestantes = dadosToken.exp - agoraAtual;
    
            if (segundosRestantes > 0) {
                setTempoToken(segundosRestantes);
            } else {
                setTempoToken(0);
                clearInterval(cronometro);
                onClickSair();
            }
        }, 1000);




        return () => clearInterval(cronometro);

    }, [dadosToken?.exp, dadosToken?.func, onClickSair]);

    // ----------------------------------------------
    // --- FIM DO - ⏱️ CRONÔMETRO CENTRALIZADO ---
    // ----------------------------------------------

    return (
        <CronometroContexto.Provider value={{ tempoFormatado }}>
            {children}
        </CronometroContexto.Provider>
    );

};



/* // 🛠️ Ferramentas de Trabalho para Exportação */
export const useAuth = () => useContext(AutenticacaoContexto);
export const useCronometro = () => useContext(CronometroContexto);