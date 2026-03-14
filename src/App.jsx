
import { useState, useEffect, useRef } from 'react'; 
import { Routes, Route, useNavigate, Navigate} from 'react-router-dom';

//  🏛️ Cofre Central (AutenticacaoContexto)
import { useAuth } from './AutenticacaoContexto';

import { ref, onValue } from "firebase/database";
import { db_realtime } from './firebaseConfig.js';


import './App.css';


// 🧱 Os Cômodos (Componentes)
import { Inicio } from './Inicio';
import { Sobre } from './Sobre'; 
import { Contato } from './Contato';

import { Logar } from './Logar';
import { Cadastrar } from './Cadastrar';

import { Logado } from './Logado';
import { Diretrizes } from './Diretrizes';


import { UsuarioIdentificacao } from './UsuarioIdentificacao'; 
import { UsuarioContato } from './UsuarioContato';

import { Endereco } from './Endereco';
import { Cnpj } from './Cnpj';
import { Formacao } from './Formacao';
import { UsuarioReferencias } from './UsuarioReferencias';


import { CadAdministrador } from './CadAdministrador';
import { ListaUsuarios } from './ListaUsuarios';
import { ListaUsuariosToken } from './ListaUsuariosToken';



import { RelClientes } from './RelClientes';
import { RelCuidadoras } from './RelCuidadoras';
import { RelSolicitacoes } from './RelSolicitacoes';


/* // 🛠️ Importação dos novos componentes de cards de pacientes */
import { PacienteApresentacaoEmpresa } from './PacienteApresentacaoEmpresa';
import { PacienteIdentificacao } from './PacienteIdentificacao';
import { PacienteEndereco } from './PacienteEndereco';
import { PacienteAlimentacao } from './PacienteAlimentacao';
import { PacienteBanho } from './PacienteBanho';
import { PacienteEmergencia } from './PacienteEmergencia';


import { ClienteSolicitacao } from './ClienteSolicitacao';


import { PainelMaster } from './PainelMaster';

import { CardTerceiros } from './CardTerceiros';
import { TestePermissao } from './TestePermissao';
import { TestePermissaoMelhor } from './TestePermissaoMelhor';
import { ListaUsuariosPublico } from './ListaUsuariosPublico';

import { Notificacoes } from './Notificacoes';
import { Chamados } from './Chamados';
import { Chat } from './Chat';


// import { BalaoDica } from './componentes/BalaoDica';

import {BalaoDicaMenuHamburguer} from './componentes/BalaoDicaMenuHamburguer';
import {BalaoDicaCriarConta} from './componentes/BalaoDicaCriarConta.jsx';
import {BalaoDicaEntrar} from './componentes/BalaoDicaEntrar.jsx';




const formatarCPF = (cpf) => {
    if (!cpf) return "000.000.000-00";
    /* Remove qualquer caractere que não seja número */
    const apenasNumeros = cpf.replace(/\D/g, "");
    /* Aplica a máscara usando Regex */
    return apenasNumeros
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
};




export default function App() {


    const navigate = useNavigate();



    // --------------------------------------------------------------
    // INICIO DO - Importacoes do componente AutenticacaoContexto.jsx
    // --------------------------------------------------------------

    const { 

        carregandoModal, 
        // setCarregandoModal,


        carregandoModalRapido, 
        setCarregandoModalRapido,


        dadosToken, 
        carregandoPermissoesFireBase, 
        onClickSair, 
        socket 

    } = useAuth();

    // --------------------------------------------------------------
    // FIM DO - Importacoes do componente AutenticacaoContexto.jsx
    // --------------------------------------------------------------







  






    // --------------------------------------
    // INICIO DO - Balao Dica Menu Hamburguer
    // --------------------------------------

    const [exibirBalaoDicaMenuHamburguer, setExibirBalaoDicaMenuHamburguer] = useState(() => {

        const valorInicial = false;
    
        // console.log("");
        // console.log("📐 🧿 ----------------------------------");
        // console.log("📐 🧿 useState() - componente - 🧿 App.jsx");
        // console.log("📐 🧿 Lazy Initialization - 🍔 exibirBalaoDicaMenuHamburguer");
        // console.log("📐 🧿 🍔 exibirBalaoDicaMenuHamburguer nasceu como = ", valorInicial);
        // console.log("📐 🧿 ----------------------------------");
    
        return valorInicial;

    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ 🧿 ----------------------------------");
        // console.log("✨ 🧿 useEffect() - Componente - 🧿 App.jsx.jsx");
        // console.log("✨ 🧿 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🧿 🍔 exibirBalaoDicaMenuHamburguer = ", exibirBalaoDicaMenuHamburguer);
        // console.log("✨ 🧿 ----------------------------------");
    
    }, [exibirBalaoDicaMenuHamburguer]);

    // Verifica se dica ja foi vista
    useEffect(() => {
        
        const jaViuGeral = localStorage.getItem("dicaMenuHamburguer_Vista_Global");
    
        if (!jaViuGeral) {
            // respiro de tempo 700 ms para o usuário se localizar antes da dica aparecer.
            const timer = setTimeout(() => {
                setExibirBalaoDicaMenuHamburguer(true);
            }, 700);
            return () => clearTimeout(timer);
        } else {
            setExibirBalaoDicaMenuHamburguer(false);
        }
       
    }, []);

    // FECHAR - Balao Dica Menu Hamburguer - clicando em qualquer lugar
    useEffect(() => {
        // Se o balão já estiver desligado, não faz nada
        if (!exibirBalaoDicaMenuHamburguer) return;

        const fecharBalaoDicaMenuHamburguer = () => {

            // console.log("");
            // console.log("🔇 ----------------------------------");
            // console.log("🔇 componente - 🧿 App.jsx");
            // console.log("🔇 executou - const fecharBalaoDicaMenuHamburguer = () => {");
            // console.log("🔇 no - useEffect(() => {");
            // console.log("🔇 ----------------------------------");
            // console.log("📐 🔵 Lacre Global: Clique detectado em qualquer lugar.");
            // console.log("🔇 ----------------------------------");
            
            // 🔐 Grava o "visto" no LocalStorage
            const chaveGlobal = "dicaMenuHamburguer_Vista_Global";
            localStorage.setItem(chaveGlobal, "sim");
            
            // 🎈 Desliga o balão e o efeito de pulsar
            setExibirBalaoDicaMenuHamburguer(false);

        };

        // 👂 Escuta o clique em QUALQUER LUGAR (incluindo o próprio botão)
        window.addEventListener('click', fecharBalaoDicaMenuHamburguer);

        // 🧹 Limpa o rastro ao desmontar
        return () => window.removeEventListener('click', fecharBalaoDicaMenuHamburguer);
        
    }, [exibirBalaoDicaMenuHamburguer]);

    // --------------------------------------
    // FIM DO - Balao Dica Menu Hamburguer
    // --------------------------------------














    

    // --------------------------------------
    // INICIO DO - Balao Dica Criar Conta
    // --------------------------------------

    const [exibirBalaoDicaCriarConta, setExibirBalaoDicaCriarConta] = useState(() => {
        
        const valorInicial = false;

        // console.log("");
        // console.log("📐 🧿 ----------------------------------");
        // console.log("📐 🧿 useState() - componente - 🧿 App.jsx");
        // console.log("📐 🧿 Lazy Initialization - 🎫 exibirBalaoDicaCriarConta");
        // console.log("📐 🧿 🎫 exibirBalaoDicaCriarConta nasceu como = ", valorInicial);
        // console.log("📐 🧿 ----------------------------------");

        return valorInicial;
    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ 🧿 ----------------------------------");
        // console.log("✨ 🧿 useEffect() - Componente - 🧿 App.jsx");
        // console.log("✨ 🧿 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🧿 🎫 exibirBalaoDicaCriarConta = ", exibirBalaoDicaCriarConta);
        // console.log("✨ 🧿 ----------------------------------");

    }, [exibirBalaoDicaCriarConta]);

    // FECHAR - Balao Dica "Criar Conta" - clicando em qualquer lugar
    useEffect(() => {

        if (!exibirBalaoDicaCriarConta) return;

        // console.log("");
        // console.log("👂 ----------------------------------");
        // console.log("👂 ATIVANDO SENSOR DE CLIQUE (Lacre)");
        // console.log("👂 Componente - 🧿 App.jsx");
        // console.log("👂 Status: Aguardando clique para fechar Balão Criar Conta.");
        // console.log("👂 ----------------------------------");

        const fecharExibirBalaoDicaCriarConta = () => {

            // console.log("");
            // console.log("🔇 ----------------------------------");
            // console.log("🔇 AÇÃO: fecharExibirBalaoDicaCriarConta()");
            // console.log("📐 🔵 Motivo: Clique detectado na Window.");
            // console.log("🔇 ----------------------------------");

            setExibirBalaoDicaCriarConta(false);

        };

        window.addEventListener('click', fecharExibirBalaoDicaCriarConta);

        return () => {

            // console.log("🧹 ----------------------------------");
            // console.log("🧹 Sensor de clique Removido (Cleanup)");
            // console.log("🧹 ----------------------------------");

            window.removeEventListener('click', fecharExibirBalaoDicaCriarConta);

        };
        
    }, [exibirBalaoDicaCriarConta]);

    // --------------------------------------
    // FIM DO - Balao Dica Criar Conta
    // --------------------------------------


























    // -----------------------------------------
    // INICIO DO - Balao Dica Entrar (Login)
    // -----------------------------------------

    const [exibirBalaoDicaEntrar, setExibirBalaoDicaEntrar] = useState(() => {
        
        const valorInicial = false;

        // console.log("");
        // console.log("📐 🧿 ----------------------------------");
        // console.log("📐 🧿 useState() - componente - 🧿 App.jsx");
        // console.log("📐 🧿 Lazy Initialization - 🎫 exibirBalaoDicaEntrar");
        // console.log("📐 🧿 🎫 exibirBalaoDicaEntrar nasceu como = ", valorInicial);
        // console.log("📐 🧿 ----------------------------------");

        return valorInicial;
    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ 🧿 ----------------------------------");
        // console.log("✨ 🧿 useEffect() - Componente - 🧿 App.jsx");
        // console.log("✨ 🧿 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🧿 🎫 exibirBalaoDicaEntrar = ", exibirBalaoDicaEntrar);
        // console.log("✨ 🧿 ----------------------------------");

    }, [exibirBalaoDicaEntrar]);

    // FECHAR - Balao Dica "Entrar" - clicando em qualquer lugar
    useEffect(() => {

        if (!exibirBalaoDicaEntrar) return;

        // console.log("");
        // console.log("👂 ----------------------------------");
        // console.log("👂 ATIVANDO SENSOR DE CLIQUE (Lacre)");
        // console.log("👂 Componente - 🧿 App.jsx");
        // console.log("👂 Status: Aguardando clique para fechar Balão Entrar.");
        // console.log("👂 ----------------------------------");

        const fecharExibirBalaoDicaEntrar = () => {

            // console.log("");
            // console.log("🔇 ----------------------------------");
            // console.log("🔇 AÇÃO: fecharExibirBalaoDicaEntrar()");
            // console.log("📐 🔵 Motivo: Clique detectado na Window.");
            // console.log("🔇 ----------------------------------");

            setExibirBalaoDicaEntrar(false);

        };

        window.addEventListener('click', fecharExibirBalaoDicaEntrar);

        return () => {

            // console.log("🧹 ----------------------------------");
            // console.log("🧹 Sensor de clique Removido (Cleanup)");
            // console.log("🧹 ----------------------------------");

            window.removeEventListener('click', fecharExibirBalaoDicaEntrar);

        };
        
    }, [exibirBalaoDicaEntrar]);

    // -----------------------------------------
    // FIM DO - Balao Dica Entrar (Login)
    // -----------------------------------------

















    // ----------------------------------------
    // INICIO DO - TEXTE DE SEGURANCA DO FIREBASE
    // ----------------------------------------

    const [statusIntegridadeBanco, setStatusIntegridadeBanco] = useState(() => {

        const valorInicial = "verificando"; 
        
        // console.log("");
        // console.log("📐 🧿 ----------------------------------");
        // console.log("📐 🧿 useState() - componente - 🧿 App.jsx");
        // console.log("📐 🧿 Lazy Initialization - 🛡️ statusIntegridadeBanco");
        // console.log("📐 🧿 🛡️ statusIntegridadeBanco nasceu como = ", valorInicial);
        // console.log("📐 🧿 ----------------------------------");
        
        return valorInicial;

    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ 🧿 ----------------------------------");
        // console.log("✨ 🧿 useEffect() - componente - 🧿 App.jsx");
        // console.log("✨ 🧿 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🧿 🛡️ statusIntegridadeBanco = ", statusIntegridadeBanco);
        // console.log("✨ 🧿 ----------------------------------");

    }, [statusIntegridadeBanco]);

    // ----------------------------------------
    // FIM DO - TEXTE DE SEGURANCA DO FIREBASE
    // ----------------------------------------
   



















    // ------------------------------------
    // INICIO DO - SUBMENU (Sanfona Profissional)
    // ------------------------------------

    // 🚪 Controle da Gaveta e Submenus
    const [menuAberto, setMenuAberto] = useState(false);
    const [secaoAberta, setSecaoAberta] = useState(null); 

    const menuRef = useRef(null);

    // 🛠️ Função Mestra de Navegação - BLINDADA
    const navegarERecolher = (rota) => {
        
        // console.log("");
        // console.log("✈️ 🆗 ----------------------------------");
        // console.log("✈️ 🆗 const navegarERecolher = (rota) => {");
        // console.log("✈️ 🆗 componente - 🧿 App.jsx");
        // console.log(`✈️ 🆗 Rota: ${rota}`);
        
        // 🧱 1. Bloqueio de Interface (Prevenção de cliques duplos)
        setCarregandoModalRapido(true);
        
        // 🧱 2. Reset de UI (Fecha tudo antes de mudar de página)
        setMenuAberto(false);
        setSecaoAberta(null);

        // 🧱 3. Navegação Imediata
        if (rota) {
            navigate(rota);
        }

        // 🕒 4. Delay de Cortesia (Para a animação do modal ser fluida)
        setTimeout(() => {

            // console.log("✈️ 🆗 Interface Liberada.");
            // console.log("✈️ 🆗 ----------------------------------");

            setCarregandoModalRapido(false);

        }, 500);
    };

    // 🧱 Função de Toggle (Abre se fechado / Fecha se aberto)
    const lidarComClique = (e, secao) => {
   
        if (e && e.stopPropagation) e.stopPropagation();
    
        setSecaoAberta((valorAnterior) => {

            const novoValor = valorAnterior === secao ? null : secao;
            
            // ✨ Segurança: Se abrir um submenu, garante que o menu lateral continue ativo
            if (novoValor !== null) {

                setMenuAberto(true); 

            }
            
            return novoValor;

        });

    };

    // 🛡️ SENSOR GLOBAL: FECHAR MENU AO CLICAR EM QUALQUER LUGAR
    useEffect(() => {
        
        if (!menuAberto) return;
    
        // console.log("");
        // console.log("👂 ----------------------------------");
        // console.log("👂 MONITORANDO CLIQUE FORA (Menu)");
        // console.log("👂 useEffect() - componente - 🧿 App.jsx");
        // console.log("👂 Status: Menu Aberto. Aguardando clique externo.");
        // console.log("👂 ----------------------------------");
    
        const fecharAoClicarFora = (event) => {
           
            const clicouNoMenu = event.target.closest('.submenu-container-geral');
            const clicouNoBotaoAbrir = event.target.closest('.btn-abrir-menu'); 
    
            if (!clicouNoMenu && !clicouNoBotaoAbrir) {

                // console.log("");
                // console.log("🔇 ----------------------------------");
                // console.log("🔇 AÇÃO: Fechando Submenu");
                // console.log("🔇 useEffect() - componente - 🧿 App.jsx");
                // console.log("🔇 Motivo: Clique fora do container detectado.");
                // console.log("🔇 ----------------------------------");
                
                setMenuAberto(false);
                setSecaoAberta(null);
            }
        };
    
        const timer = setTimeout(() => {
            window.addEventListener('click', fecharAoClicarFora);
        }, 0);
    
        return () => {
            clearTimeout(timer);
            window.removeEventListener('click', fecharAoClicarFora);

            // console.log("");
            // console.log("🧹 ----------------------------------");
            // console.log("🧹 AÇÃO: Fechando Submenu");
            // console.log("🧹 useEffect() - componente - 🧿 App.jsx");
            // console.log("🧹 Sensor de clique fora removido.");

        };
    }, [menuAberto]);
    
    // ------------------------------------
    // FIM DO - SUBMENU (Sanfona Profissional)
    // ------------------------------------
























    // -------------------------------------------------------------
    /* INICIO - 🛠️ VIGILÂNCIA DE INTEGRIDADE DOS CARDS - CLIENTE */
    // -------------------------------------------------------------

    /* // 🛠️ Ferramenta de Trabalho para o status de integridade dos cards de paciente */
    const [statusCliente, setStatusCliente] = useState({
        contato: false,
        endereco: false,
        cnpj: false,
        formacao: false
    });


    // -----------------------------------------------------------------
    /* INICIO - 🚦 SEMÁFORO GERAL: Verifica se todos os cards estão OK */
    // -----------------------------------------------------------------

    const perfilEstaCompleto = Object.values(statusCliente).every(status => status === true);

    // 🧱 Regra de Ouro: Cliente só acessa Paciente se tiver Contato e Endereço preenchidos
    const clientePodeAcessarPaciente = statusCliente.contato && statusCliente.endereco;

    useEffect(() => {

        console.log("");
        console.log("🚦 ----------------------------------");
        console.log("🚦 SEMÁFORO DE INTEGRIDADE (App.jsx)");
        console.log(`🚦 Perfil completo? ${perfilEstaCompleto ? '✅ SIM' : '❌ NÃO'}`);
        console.log(`🚦 Cliente (Paciente)? ${clientePodeAcessarPaciente ? '✅ LIBERADO' : '🔒 TRAVADO'}`);
        console.log("🚦 ----------------------------------");

    }, [statusCliente]);

    // -----------------------------------------------------------------
    /* FIM - 🚦 SEMÁFORO GERAL: Verifica se todos os cards estão OK */
    // -----------------------------------------------------------------

    useEffect(() => {

        console.log("");
        console.log("🔍 -----------------------------------------------------------");
        console.log("🔍 VIGILÂNCIA FIREBASE: Iniciando monitoramento...");
        console.log("🔍 useEffect() - componente - 🧿 App.jsx");
        console.log("🔍 CPF no Token:", dadosToken?.cpef);
        console.log("🔍 DB Conectado:", !!db_realtime);

        if (!dadosToken?.cpef || !db_realtime) {
            
            console.log("🔍 ⚠️ VIGILÂNCIA ABORTADA: Falta CPF ou conexão com banco.");
            console.log("🔍 -----------------------------------------------------------");

            return;

        }

        const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}`);

        const desativarVigilancia = onValue(caminhoNoBanco, (snapshot) => {

            if (snapshot.exists()) {

                const dados = snapshot.val();

                console.log("");
                console.log("🔍 -----------------------------------------------------------");
                console.log("🔍 INSPEÇÃO DE SUPRIMENTOS (FirebaseSnapshot)");
                console.log("🔍 useEffect() - componente - 🧿 App.jsx");
                console.log("🔍 Dados Recebidos:", dados);
                console.log("🔍 -----------------------------------------------------------");

                const contatoNoBanco = dados; 
                const temContato = !!(
                    contatoNoBanco?.mail?.trim() &&
                    contatoNoBanco?.fone?.trim()
                );

                const enderecoNoBanco = dados.ende;
                const temEndereco = !!(
                    enderecoNoBanco?.cepe?.trim() &&
                    enderecoNoBanco?.nume?.trim() 
                );

                const cnpjNoBanco = dados.cnpj_dados;
                const temCnpj = !!(
                    cnpjNoBanco?.num_cnpj?.trim()
                );

                const formacaoNoBanco = dados.formacao_dados;
                const temFormacao = !!(
                    formacaoNoBanco?.nivel?.trim()
                );

                console.log("");
                console.log("🔍 -----------------");
                console.log("🔍 STATUS DO CLIENTE");
                console.log("🔍 📞 Contato  :", temContato);
                console.log("🔍 📍 Endereco :", temEndereco);
                console.log("🔍 🏢 CNPJ     :", temCnpj);
                console.log("🔍 🎓 Formação :", temFormacao);
                console.log("🔍 ------------------");

                setStatusCliente({
                    contato: temContato,
                    endereco: temEndereco,
                    cnpj: temCnpj,
                    formacao: temFormacao
                });

            } else {
                
                setStatusCliente({
                    contato: false,
                    endereco: false,
                    cnpj: false,
                    formacao: false
                });

            }
        });

        return () => desativarVigilancia();

    }, [dadosToken?.cpef, db_realtime]);


    // -------------------------------------------------------------
    /* FIM - 🛠️ VIGILÂNCIA DE INTEGRIDADE DOS CARDS - CLIENTE */
    // -------------------------------------------------------------

























    // -------------------------------------------------------------
    /* INICIO DO - MODAL 🔥 FIREBASE */
    // -------------------------------------------------------------
    // SEMPRE MANTER O ULTIMO ANTES DO RETURN
    if (carregandoPermissoesFireBase) {
        return (
            <div className="modal-overlay-projeto">
                <div className="card-loading-moderno">
                    <div className="spinner-dual-ring"></div>
                    <h3 className="titulo-loading">✨ Aguarde...</h3>
                    <p className="subtitulo-loading">Validando acessos à sua área interna.</p>
                    <div className="barra-progresso-container">
                        <div className="barra-progresso-infinita"></div>
                    </div>
                </div>
            </div>
        );
    }

    // -------------------------------------------------------------
    /* FIM DO - MODAL 🔥 FIREBASE */
    // -------------------------------------------------------------






    /*  ------------------------------------- */
    /*  INICIO DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */

    return (



        /* 🛡️ CONTAINER-EXTERNO-BLINDADO */
        <div className="container-externo-blindado" data-func={dadosToken?.func}>


            {/* 🛡️ MONITORAMENTO DE PROTOCOLO - BARRA DE VARREDURA */}
            {carregandoModalRapido && (
                <div className="camada-interceptacao-fluxo">
                    <div className="painel-comando-central">
                        <span className="rotulo-identificador-sistema">PROCESSANDO...</span>
                        <div className="trilho-varredura-binaria">
                            <div className="feixe-energia-dinamico"></div>
                        </div>
                    </div>
                </div>
            )}


            {/*🧱 Se carregando for true, o modal trava a tela */}
            {carregandoModal && (
                <div className="modal-overlay-projeto">
                    <div className="card-loading-moderno">
                        <div className="spinner-dual-ring"></div>
                        <h3 className="titulo-loading">Aguarde...</h3>
                        <p className="subtitulo-loading">Validando acessos à sua area interna.</p>
                        <div className="barra-progresso-container">
                            <div className="barra-progresso-infinita"></div>
                        </div>
                    </div>
                </div>
            )}















            {/* 🏗️ VIGA MESTRA (Controle Superior) */}
            <header className="header-container">






                {/* 🖼️ NUCLEO-IDENTIDADE (Extrema Esquerda) */}
                <div className="header-Logo" onClick={() => navigate('/')}>
                    <img className="Imagem-Logotipo"  src="/imagens/LogoSVG6.png" alt="Logo" />
                </div>








                {/* ---------------------------------- */}
                {/* INICIO - 🍔 O Botão Hambúrguer assume o controle direto aqui */}
                {/* ---------------------------------- */}

                <button 
                    className={`btn-menu-base ${exibirBalaoDicaMenuHamburguer ? 'pulsar-ativo' : ''}`}
                    onClick={() => {


                        // 🍔 Verificamos se o menu já está aberto
                        if (menuAberto) {
                            console.log("");
                            console.log("📐 ----------------------------------");
                            console.log("📐 🚀 EVENTO: Clique no botão 'Menu Hambúrguer'");
                            console.log("📐 🔵 Ação: FECHANDO menu (Toggle Off).");
                            console.log("📐 ----------------------------------");
                            
                            setMenuAberto(false); // Fecha o container principal
                            setSecaoAberta(null); // Limpa qualquer submenu aberto
                        } else {
                            console.log("");
                            console.log("📐 ----------------------------------");
                            console.log("📐 🚀 EVENTO: Clique no botão 'Menu Hambúrguer'");
                            console.log("📐 🟢 Ação: ABRINDO menu (Toggle On).");
                            console.log("📐 ----------------------------------");
                            
                            setMenuAberto(true); // Abre o container principal
                            // Se você usa a função abrirSecao para logs extras, chame-a aqui:
                            // abrirSecao('menu-aberto'); 
                        }


                    }}
                >
                    ☰
                </button>

                {/* 🎈 O Balão de Dica (Agora apenas o componente visual) */}
                <BalaoDicaMenuHamburguer 
                    exibirBalaoDicaMenuHamburguer={exibirBalaoDicaMenuHamburguer} 
                />

                {/* ---------------------------------- */}
                {/* FIM - 🍔 O Botão Hambúrguer assume o controle direto aqui */}
                {/* ---------------------------------- */}













                {/* ---------------------------------- */}
                {/* INICIO do - 🔩 Conteiner geral individualizado*/}
                {/* ---------------------------------- */}

                <div 
                    ref={menuRef}
                    className={`submenu-container-geral ${menuAberto ? 'menu-mobile-ativo' : ''}`}
                >



                
       
                    {dadosToken?.func === 'programador' && (
                        <>
                            <button 
                                className="Btn-geral-programador-prof btn-centralizado"
                                onClick={() => navegarERecolher('/interno/Relatorios')}
                            >
                                Relatório
                            </button>

                            {/* --- SUBMENU: CADASTRAR --- */}
                            <div className="submenu-tudo-cadastrar-prof">
                                <button  
                                    className="Btn-geral-programador-prof"
                                    onClick={(e) => lidarComClique(e, 'cadastrar')}
                                    aria-expanded={secaoAberta === 'cadastrar'}
                                >
                                    Cadastrar
                                    <span className="icone-seta">
                                        {secaoAberta === 'cadastrar' ? "🔼" : "🔽"}
                                    </span>
                                </button>
                                
                                {/* 🚀 O Submenu não tem mais o && para permitir a animação de saída */}
                                <div className={`submenu-flutuante-cadastrar-prof ${secaoAberta === 'cadastrar' ? 'aberto' : 'fechado'}`}>
                                    <button onClick={() => navegarERecolher('/interno/CadAdministrador')}>
                                        Administrador
                                    </button>
                                    <button onClick={() => navegarERecolher('/interno/CadAtendente')}>
                                        Atendente
                                    </button>
                                </div>
                            </div>

                            <button 
                                className="Btn-geral-programador-prof btn-centralizado"
                                onClick={() => navegarERecolher('/ListaUsuarios')}
                            >
                                Usuários
                            </button>

                            <button 
                                className="Btn-geral-programador-prof btn-centralizado"
                                onClick={() => navegarERecolher('/ListaUsuariosToken')}
                            >
                                Token
                            </button>
                        </>
                    )}





                    {dadosToken?.func === 'administrador' && (
                        <>
                            <button 
                                className="Btn-geral-administrador-prof btn-centralizado"
                                onClick={() => navegarERecolher('/interno/RelatoriosAdmin')}
                            >
                                Painel Geral
                            </button>

                            {/* --- SUBMENU: GERENCIAR --- */}
                            <div className="submenu-tudo-gerenciar-prof">
                                <button  
                                    className="Btn-geral-administrador-prof"
                                    onClick={(e) => lidarComClique(e, 'gerenciar')}
                                    aria-expanded={secaoAberta === 'gerenciar'}
                                >
                                    Gerenciar
                                    <span className="icone-seta">
                                        {secaoAberta === 'gerenciar' ? "🔼" : "🔽"}
                                    </span>
                                </button>
                                
                                <div className={`submenu-flutuante-gerenciar-prof ${secaoAberta === 'gerenciar' ? 'aberto' : 'fechado'}`}>
                                    <button onClick={() => navegarERecolher('/interno/ListaColaboradores')}>
                                        Colaboradores
                                    </button>
                                    <button onClick={() => navegarERecolher('/interno/Configuracoes')}>
                                        Configurações
                                    </button>
                                </div>
                            </div>

                            <button 
                                className="Btn-geral-administrador-prof btn-centralizado"
                                onClick={() => navegarERecolher('/ListaLogs')}
                            >
                                Logs
                            </button>

                            <button 
                                className="Btn-geral-administrador-prof btn-centralizado"
                                onClick={() => navegarERecolher('/SuporteAdmin')}
                            >
                                Suporte
                            </button>
                        </>
                    )}




                    
                    {dadosToken?.func === 'visitante' && (
                        <>

                            <button 
                                className="Btn-geral-visitante" 
                                onClick={() => navegarERecolher('/')}
                            >
                                Início
                            </button>

                            <button 
                                className="Btn-geral-visitante" 
                                onClick={() => navegarERecolher('/Sobre')}
                            >
                                Sobre
                            </button>

                            <button 
                                className="Btn-geral-visitante" 
                                onClick={() => navegarERecolher('/Contato')}
                            >
                                Contato
                            </button>


                            <button 
                                className="Btn-geral-visitante Lista-Publica" 
                                // onClick={() => navegarERecolher('/ListaUsuariosPublico')}
                            >
                                Lista Publica
                            </button>


                            
                        </>
                    )}


                    

                    {dadosToken?.func === 'cuidadora' && (
                        <>
                            <button 
                                className="Btn-geral-cuidadora-prof btn-centralizado"
                                onClick={() => navegarERecolher('/interno/Diretrizes')}
                            >
                                Diretrizes
                            </button>



                            <button 
                                className={`Btn-geral-cuidadora-prof btn-centralizado ${perfilEstaCompleto ? '' : 'BotaoBloqueado'}`}
                                onClick={() => perfilEstaCompleto && navegarERecolher('/interno/Chamados')}
                                title={!perfilEstaCompleto ? "Complete seu perfil (Contato, Endereço, CNPJ e Formação) para liberar." : "Acessar Chamados"}
                            >
                                Chamados {!perfilEstaCompleto && "🔒"}
                            </button>


                        </>
                    )}





                    {dadosToken?.func === 'cliente' && (
                        <>
                            <button 
                                className="Btn-geral-cliente-prof btn-centralizado" 
                                onClick={() => navegarERecolher('/interno/PacienteApresentacaoEmpresa')}
                            >
                                Apresentação
                            </button>

                            <button 
                                className="Btn-geral-cliente-prof btn-centralizado fonte-diretrizes" 
                                onClick={() => navegarERecolher('/interno/Diretrizes')}
                            >
                                Diretrizes
                            </button>

                            {/* --- SUBMENU: SOLICITAÇÃO --- */}
                            <div className="submenu-tudo-solicitacao-prof">
                                <button 
                                    className="Btn-geral-cliente-prof" 
                                    onClick={(e) => lidarComClique(e, 'solicitacao')}
                                    aria-expanded={secaoAberta === 'solicitacao'}
                                >
                                    Solicitação
                                    <span className="icone-seta">
                                        {secaoAberta === 'solicitacao' ? "🔼" : "🔽"}
                                    </span>
                                </button>

                                <div className={`submenu-flutuante-cliente-prof ${secaoAberta === 'solicitacao' ? 'aberto' : 'fechado'}`}>
                                    <button onClick={() => navegarERecolher('/interno/ClienteSolicitacaoNova')}>Serviços</button>
                                    <button onClick={() => navegarERecolher('/interno/ClienteMinhasSolicitacoes')}>Orçamento</button>
                                    <button onClick={() => navegarERecolher('/interno/HistoricoSolicitacoes')}>Extrato</button>
                                </div>
                            </div>

                            {/* --- SUBMENU: PACIENTE --- */}
                            <div className="submenu-tudo-paciente-prof">
                                <button 
                                    className={`Btn-geral-cliente-prof btn-fonte-paciente ${clientePodeAcessarPaciente ? '' : 'BotaoBloqueado'}`}
                                    onClick={(e) => clientePodeAcessarPaciente && lidarComClique(e, 'paciente')}
                                    aria-expanded={secaoAberta === 'paciente'}
                                    title={!clientePodeAcessarPaciente ? "Preencha Contato e Endereço para liberar." : "Gerenciar Paciente"}
                                >
                                    Paciente
                                    <span className="icone-seta">
                                        {!clientePodeAcessarPaciente ? "🔒" : (secaoAberta === 'paciente' ? "🔼" : "🔽")}
                                    </span>
                                </button>
                                
                                <div className={`submenu-flutuante-cliente-prof ${secaoAberta === 'paciente' ? 'aberto' : 'fechado'}`}>
                                    <button onClick={() => navegarERecolher('/interno/PacienteIdentificacao')}>Identificação</button>
                                    <button onClick={() => navegarERecolher('/interno/PacienteEndereco')}>Endereço</button>
                                    <button onClick={() => navegarERecolher('/interno/PacienteAlimentacao')}>Alimentação</button>
                                    <button onClick={() => navegarERecolher('/interno/PacienteAlimentacao')}>Remédios</button>
                                    <button onClick={() => navegarERecolher('/interno/PacienteBanho')}>Banho</button>
                                    <button onClick={() => navegarERecolher('/interno/PacienteBanho')}>Acordado</button>
                                    <button onClick={() => navegarERecolher('/interno/PacienteBanho')}>Recreação</button>
                                    <button onClick={() => navegarERecolher('/interno/PacienteEmergencia')}>Emergência</button>
                                </div>
                            </div>
                        </>
                    )}





                </div>

                {/* ---------------------------------- */}
                {/* FIM do - 🔩 Conteiner geral individualizado */}
                {/* ---------------------------------- */}













                {/* // ------------------------------------------------- */}
                {/* 🔘 SUBMENU FLUTUANTE DE PERFIL (Abertura por Clique) */}
                {/* // ------------------------------------------------- */}

                {dadosToken?.func !== 'visitante' ? (


                    // ---------------------------------------------------
                    // INICIO - AREA PRIVADA - MENU PARA LOGADOS - BOTAO MEU PERFIL
                    // ---------------------------------------------------

                    <div className="submenu-container-perfil">





                        {/* BOTAO CHAT */}
                        <div 
                            className="Botao-Chat" 
                            onClick={() => {
                                console.log("");
                                console.log("📐 ----------------------------------");
                                console.log("📐 🚀 EVENTO: Clique no botão 'Chat'");
                                console.log("📐 📍 Navegando para /interno/Chat");
                                console.log("📐 ----------------------------------");
                                navegarERecolher('/interno/Chat');
                            }}
                        >
                            <img 
                                className="Img-Chat-Icone" 
                                alt="Chat"
                                src="/imagens/chat.png"    
                            />
                        </div>




                        
                        {/* INICIO - BOTAO MEU PERFIL */}
                        <button 
                            className={`Botao-Acao-Meu-Perfil ${secaoAberta === 'perfil' ? 'Ativo' : ''}`}
                            onClick={() => setSecaoAberta(secaoAberta === 'perfil' ? null : 'perfil')}
                        >
                            <div className="Avatar-Circulo">
                                {dadosToken?.nome ? dadosToken.nome.charAt(0).toUpperCase() : "?"}
                            </div>
                            <span>Meu Perfil</span>
                            <span className={`Seta-Drop ${secaoAberta === 'perfil' ? 'Aberta' : ''}`}>▼</span>
                        </button>
                        {secaoAberta === 'perfil' && (
                            <div className="Cortina-Fechar" onClick={() => setSecaoAberta(null)} />
                        )}







                        {/* INICIO DO - SUB MENU - DADOS DO USUARIO */}
                        
                        <div className={`SubmenuFlutuante-Estilizado ${secaoAberta === 'perfil' ? 'Ativo' : ''}`}>
                            
                            <div className="Header-Menu-Perfil">
                                <strong>{dadosToken?.nome || "Usuário"}</strong>
                                <span>{formatarCPF(dadosToken?.cpef)}</span>
                            </div>

                          
                            <div className="Header-Funcao">
                                <span>Função:</span>
                                <strong>{dadosToken?.func}</strong>   
                            </div>


                            {/* PROGRAMADOR - NAO PRECISA PREENCHER DADOS PESSOAIS */}
                            {dadosToken?.func !== 'programador' && (
                                <>





                                  




                                    {/* ADMINISTRADOR - PRECISA PREENCHER NOME E SENHA */}
                                    {/* {(dadosToken?.func === 'administrador' && dadosToken?.nome === '') && (
                                        <>

                                            <button onClick={() => navegarERecolher('/interno/UsuarioIdentificacao')}>
                                            Identificação
                                                Identificação {statusCards.identificacao ? "✔️" : "❌"}
                                            </button>

                                        </>
                                    )} */}





                                   
                                    <button 
                                    
                                        className="Perfil-Opcoes"
                                        onClick={() => navegarERecolher('/interno/UsuarioContato')}>

                                        {statusCliente.contato ? "✔️" : "❌"} Contato

                                    </button>



                                 



                                    <button 

                                        className="Perfil-Opcoes"
                                        onClick={() => navegarERecolher('/interno/Endereco')}>

                                        {statusCliente.endereco ? "✔️" : "❌"} Endereço

                                    </button>



                                  

                                    


                                    {dadosToken?.func !== 'cliente' && (
                                    <>

                                        <button 
                                        
                                            className="Perfil-Opcoes"
                                            onClick={() => navegarERecolher('/interno/Cnpj')}>
                                            {statusCliente.cnpj ? "✔️" : "❌"} CNPJ
                                        </button>
                                        
                                    
                                        <button 
                                        
                                            className="Perfil-Opcoes"
                                            onClick={() => navegarERecolher('/interno/Formacao')}>
                                            {statusCliente.formacao ? "✔️" : "❌"} Formação 

                                        </button>
                                        
                                    </>
                                    )}


                                </>
                            )}








                            {/* BOTAO SAIR - PARA TODOS O USUARIOS */}

                            <button 
                                className="Botao-Acao-Sair" 
                                onClick={() => { 
                                    onClickSair(); 
                                    navegarERecolher('/'); 
                                }}
                            >
                                Sair
                            </button>

                           






                            {/* ------------------------------------ */}
                            {/* MEUS TESTES DE PERMISSAO NO FIREBASE */}
                            {/* ------------------------------------ */}

                         
                           
                            {/* <button onClick={() => {

                                console.log("");
                                console.error(" --------------------------------------------------");
                                console.error(" Botão (Teste Permissao) clicado! Indo para componente");
                                console.error(" --------------------------------------------------");

                                navegarERecolher('/interno/TestePermissao');
                                }}>
                                Teste Permissao
                            </button> */}




                            <button onClick={() => {
                                console.log("");
                                console.log("📐 ----------------------------------");
                                console.log("📐 🚀 EVENTO: Clique no botão 'Teste Permissao'");
                                console.log("📐 📍 Navegando para /interno/TestePermissaoMelhor");
                                console.log("📐 ----------------------------------");
                                navegarERecolher('/interno/TestePermissaoMelhor');
                                }}>
                                Teste Permissao
                            </button>





                        </div>

                        {/* FIM DO - SUB MENU - DADOS DO USUARIO */}




                    </div>

                    // ---------------------------------------------------
                    // FIM - AREA PRIVADA - MENU PARA LOGADOS - BOTAO MEU PERFIL
                    // ---------------------------------------------------


                ) : (
                    


                    // ------------------------------------
                    // INICIO - PARA VISITANTES - ENTRAR OU CADASTRAR
                    // ------------------------------------

                    <div className="submenu-container-visitante">



                        {/* INICIO - BOTAO CRIAR CONTA */}

                        <div style={{ position: 'relative', display: 'inline-block' }}>

                            <button 

                                className={`Botao-Acao-Visitante-Perfil ${exibirBalaoDicaCriarConta ? 'pulsar-ativo' : ''}`} 
                             
                                onClick={(e) => {

                                    console.log("");
                                    console.log("📐 ----------------------------------");
                                    console.log("📐 🚀 EVENTO: Clique no botao 'Criar Conta'");
                                    console.log("📐 🔵 Estado 'Dica Visível' = ", exibirBalaoDicaCriarConta);
                                    
                                    navegarERecolher('/Cadastrar');

                                }}

                            >
                                <span>Criar Conta</span>
                            </button>

                            <BalaoDicaCriarConta 
                                exibirBalaoDicaCriarConta={exibirBalaoDicaCriarConta} 
                            />
                        </div>

                        {/* FIM - BOTAO CRIAR CONTA */}



                        {/* INICIO - BOTAO ENTRAR */}

                           <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button 
                                className={`Botao-Acao-Visitante-Perfil ${exibirBalaoDicaEntrar ? 'pulsar-ativo' : ''}`} 
                                style={{ width: '90px' }} 
                                onClick={(e) => {

                                    // console.log("");
                                    // console.log("📐 ----------------------------------");
                                    // console.log("📐 🚀 EVENTO: Clique no botão 'Entrar'");
                                    // console.log("📐 componente - 🧿 App.jsx");
                                    // console.log("📐 📍 navegarERecolher('/Logar');");
                                    // console.log("📐 ----------------------------------");

                                    navegarERecolher('/Logar');

                                }}
                            >
                                <span>Entrar</span>
                            </button>

                            <BalaoDicaEntrar 
                                exibirBalaoDicaEntrar={exibirBalaoDicaEntrar} 
                            />
                        </div>     
                               
                        {/* FIM - BOTAO ENTRAR */}



                   </div>

                    // ------------------------------------
                    // FIM - PARA VISITANTES - ENTRAR OU CADASTRAR
                    // ------------------------------------


                )}




             


            </header>


























            {/* 🧱 AREA-PALCO: Onde os CARDS brilham */}
            <main className="main-area-principal">

            <div className="header-spacer"></div>

                <Routes>





                    {/* 🌍 Rotas Públicas */}
                    <Route 
                        path="/" 
                        element={
                            <Inicio 
                                // exibirDica={exibirDica} 
                            />
                        } 
                    />

                    <Route path="/sobre" element={<Sobre />} /> 
                    <Route path="/contato" element={<Contato />} />


                    <Route 
                        path="/logar" 
                        element={
                            <Logar 
                                socket={socket} 
                                setExibirBalaoDicaCriarConta={setExibirBalaoDicaCriarConta} 
                                // setSecaoAberta={setSecaoAberta}
                            />
                        } 
                    />





                    <Route 
                        path="/Cadastrar" 
                        element={
                            <Cadastrar 
                                socket={socket} 
                                /* // Passando a ferramenta de trabalho para o componente filho */
                                setExibirBalaoDicaEntrar={setExibirBalaoDicaEntrar} 
                                // exibirBalaoDicaEntrar={exibirBalaoDicaEntrar}
                            />
                        } 
                    />






                    <Route
                        
                        path="ListaUsuariosPublico" 
                        element={<ListaUsuariosPublico />} 
                    
                    />
                 









                    {/* 🛠️ Rotas de Administração Técnica (Programador) */}
                    <Route 
                        path="/ListaUsuarios" 
                        element={
                            dadosToken?.func === 'programador' ? (
                                <ListaUsuarios />
                            ) : (
                                <Navigate to="/" replace />
                            )
                        } 
                    />


                    <Route 
                        path="/ListaUsuariosToken" 
                        element={
                            dadosToken?.func === 'programador' ? (
                                <ListaUsuariosToken />
                            ) : (
                                /* // 🚀 Se o token expirar e ele virar visitante, a mola dispara: */
                                <Navigate to="/" replace />
                            )
                        } 
                    />










                    {/* 🔐 Setor Privativo: Acesso condicionado ao fim do carregamento */}
                    <Route 
                        path="/interno/*" 
                        element={

                            carregandoModal ? null :

                            dadosToken?.func && dadosToken.func !== 'visitante' ? (
                                <Logado 

                                // Não preciso disso mais, só vou de8ixar aqui para lembrar do aprendizado
                                    // sinalInternet={sinalInternet}
                                    // sinalFirebase={sinalFirebase}
                                    // perfilEstaCompleto={perfilEstaCompleto} 
                                    // pacienteEstaCompleto={pacienteEstaCompleto}

                                />
                            ) : (
                                <Navigate 

                                    to="/" replace 

                                />
                            )


                        } 
                    >












                        {/* 🚪 Sub-cômodos (Rotas Filhas de /interno) */}
                       
                        <Route path="UsuarioIdentificacao" element={<UsuarioIdentificacao />} />
                        <Route path="UsuarioContato" element={<UsuarioContato />} />
                        
                        <Route path="Endereco" element={<Endereco />} />
                        <Route path="Cnpj" element={<Cnpj />} />
                        <Route path="Formacao" element={<Formacao />} />
                        <Route path="UsuarioReferencias" element={<UsuarioReferencias />} />

                        <Route path="CadAdministrador" element={<CadAdministrador />} />
                        <Route path="diretrizes" element={<Diretrizes />} />
                        <Route path="Chamados" element={<Chamados />} />

                        <Route path="RelCuidadoras" element={<RelCuidadoras />} />
                        <Route path="RelClientes" element={<RelClientes />} />
                        <Route path="RelSolicitacoes" element={<RelSolicitacoes />} />
                        


                        
















                        {/* 🧱 Controle do Programador dentro do Interno */}
                        <Route 

                            path="PainelMaster" 
                            element={
                                dadosToken?.func === 'programador' ? (
                                    <PainelMaster />
                                ) : (
                                    <Navigate to="/interno" replace />
                                )
                            } 

                        />












                        {/* 🧱 Botoes texte - dentro do app.jsx */}

                        {/* <Route
                        
                            path="CardTerceiros" 
                            element={<CardTerceiros />} 
                            
                        /> */}
                 
                        <Route
                        
                            path="TestePermissao" 
                            element={<TestePermissao />} 
                        
                        />



                        <Route
                            
                            path="TestePermissaoMelhor" 
                            element={<TestePermissaoMelhor />} 
                        
                        />


                        <Route
                            
                            path="Notificacoes" 
                            element={<Notificacoes />} 
                        
                        />


                        <Route
                            
                            path="Chat" 
                            element={<Chat />} 
                        
                        />







                        {/* /* 🛣️ Definição de rotas para os setores de Pacientes */}
                        <Route path="PacienteApresentacaoEmpresa"element={<PacienteApresentacaoEmpresa />} />
                        <Route path="PacienteIdentificacao" element={<PacienteIdentificacao />} />
                        <Route path="PacienteEndereco" element={<PacienteEndereco />} />
                        <Route path="PacienteAlimentacao" element={<PacienteAlimentacao />} />
                        <Route path="PacienteBanho" element={<PacienteBanho />} />
                        <Route path="PacienteEmergencia" element={<PacienteEmergencia />} />
                        <Route path="ClienteSolicitacao" element={<ClienteSolicitacao />} />
                        





                    </Route>






                    {/* 🛡️ Trava de Segurança: Redireciona qualquer rota inexistente para o Início */}
                    <Route path="*" element={<Navigate to="/" />} />




                </Routes>

            </main>









        </div> /* FIM DO - 🛡️ CONTAINER-EXTERNO-BLINDADO */

    );

    /*  ------------------------------------- */
    /*  FIM DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */






} 
