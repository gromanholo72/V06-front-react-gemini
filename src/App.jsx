
import { useState, useEffect, useRef, useCallback } from 'react'; 
import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom'; // 🧱 Importando Outlet
import { ref, get, set, push, serverTimestamp, onValue, update } from 'firebase/database'; // Importe do Firebase RTDB
// import { db_realtime } from './firebaseConfig'; 
import { useAuth } from './AutenticacaoContexto'; 


import './App.css';


// 🧱 Os Cômodos (Componentes)
import { Inicio } from './Inicio';
import { Sobre } from './Sobre'; 
import { Contato } from './Contato';

import { Logar } from './Logar';
import { Cadastrar } from './Cadastrar';

import { Diretrizes } from './Diretrizes';
import { Funcoes } from './Funcoes';


import { UsuarioIdentificacao } from './UsuarioIdentificacao'; 
import { UsuarioContato } from './UsuarioContato';
import { UsuarioFormacao } from './UsuarioFormacao';
import { UsuarioLogado } from './UsuarioLogado'; 

import { Endereco } from './Endereco';
import { Cnpj } from './Cnpj';
import { Formacao } from './Formacao';
import { UsuarioReferencias } from './UsuarioReferencias';


import { CadAdministrador } from './CadAdministrador';
import { ListaUsuarios } from './ListaUsuarios';
import { ListaUsuariosToken } from './ListaUsuariosToken';



import {ProgramadorRelatorioCliente } from './ProgramadorRelatorioCliente';



import { AdministradorRelatorioClientes } from './administrador/AdministradorRelatorioClientes';
import { AdministradorRelatorioCuidadoras } from './administrador/AdministradorRelatorioCuidadoras';




import { RelClientes } from './RelClientes';
import { RelCuidadoras } from './RelCuidadoras';
import { RelSolicitacoes } from './RelSolicitacoes';


/* // 🛠️ Importação dos novos componentes de cards de pacientes */
import { PacienteIdentificacao } from './paciente/PacienteIdentificacao';
import { PacienteEndereco } from './paciente/PacienteEndereco';


import { PacienteCadastroRemedio } from './PacienteCadastroRemedio';
import { PacienteAlimentacao } from './PacienteAlimentacao';
import { PacienteBanho } from './PacienteBanho';
import { PacienteEmergencia } from './PacienteEmergencia';


import { ClienteSolicitacao } from './cliente/ClienteSolicitacao';
import { ClienteContrato } from './cliente/ClienteContrato';

import { PainelMaster } from './PainelMaster';

import { CardTerceiros } from './CardTerceiros';
import { TestePermissao } from './TestePermissao';
import { TestePermissaoMelhor } from './TestePermissaoMelhor';
import { ListaUsuariosPublico } from './ListaUsuariosPublico';

import { Notificacoes } from './Notificacoes';
import { Chamados } from './Chamados';
import { Chat } from './Chat';





import {FiguraMenuHamburguer} from './FiguraMenuHamburguer';




// CLIENTE
import { ClienteApresentacaoEmpresa } from './cliente/ClienteApresentacaoEmpresa';






// BALAO DICA
import {BalaoDicaCriarConta} from './componentes/BalaoDica/BalaoDicaCriarConta';
import {BalaoDicaEntrar} from './componentes/BalaoDica/BalaoDicaEntrar';
import {BalaoDicaMeuPerfil} from './componentes/BalaoDica/BalaoDicaMeuPerfil';
import {BalaoDicaMeuContrato} from './componentes/BalaoDica/BalaoDicaMeuContrato';
import {BalaoDicaProntuarioPaciente} from './componentes/BalaoDica/BalaoDicaProntuarioPaciente';


// MENU HORIZONTAL
import { MenuHorizontalProgramador } from './componentes/MenuHorizontal/MenuHorizontalProgramador';
import { MenuHorizontalAdministrador } from './componentes/MenuHorizontal/MenuHorizontalAdministrador';
import { MenuHorizontalVisitante } from './componentes/MenuHorizontal/MenuHorizontalVisitante';
import { MenuHorizontalCuidadora } from './componentes/MenuHorizontal/MenuHorizontalCuidadora';
import { MenuHorizontalCliente } from './componentes/MenuHorizontal/MenuHorizontalCliente';



//MENU SIDEBAR
import { MenuSideBarProgramador } from './componentes/MenuSideBar/MenuSideBarProgramador';
import { MenuSideBarAdministrador } from './componentes/MenuSideBar/MenuSideBarAdministrador';
import { MenuSideBarCuidadora } from './componentes/MenuSideBar/MenuSideBarCuidadora';
import { MenuSideBarCliente } from './componentes/MenuSideBar/MenuSideBarCliente';


// MODAL
// 📐 Ajuste Maestro: Garantindo importação nomeada do caminho correto
import { LoadingModalUX } from './componentes/modal/LoadingModalUX';
import { LoadingModalUXLimpo } from './componentes/modal/LoadingModalUXLimpo';
import { ModalProcessando } from './componentes/modal/ModalProcessando';
import { ModalCompletarCadastro } from './componentes/modal/ModalCompletarCadastro';
import { ModalCadastroCompleto } from './componentes/modal/ModalCadastroCompleto';
import { ModalContratoLiberado } from './componentes/modal/ModalContratoLiberado';



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




// 1️⃣ Crie um mapa de larguras (Pode ficar fora do componente para organizar)
const LARGURAS_SIDEBAR = {
    visitante:     '0px',
    programador:   'var(--LarguraSidebarProgramador)',
    administrador: 'var(--LarguraSidebarAdministrador)',
    cuidadora:     'var(--LarguraSidebarCuidadora)',
    cliente:       'var(--LarguraSidebarCliente)',
    financeiro:    'var(--LarguraSidebarFinanceiro)'
};





export default function App() {


    const navigate = useNavigate();



    const { 

        db_realtime,
        dadosToken,  
        onClickSair, 
        socket,

        carregandoPermissoesFireBase, 
        carregandoModal,
        setCarregandoModalRapido,

        dadosUsuarioBanco,

        cadastroCompleto,
        contratoLiberado,
        contratoAssinado,
        prontuarioLiberado,

        exibirBalaoDicaMeuPerfil,
        setExibirBalaoDicaMeuPerfil,

        exibirBalaoDicaMeuContrato,
        setExibirBalaoDicaMeuContrato,

        exibirBalaoDicaProntuarioPaciente,
        setExibirBalaoDicaProntuarioPaciente


    } = useAuth();

  
    



    const larguraAtual = LARGURAS_SIDEBAR[dadosToken?.func] || '0px';

    // console.log("");
    // console.log("🔍 -----------------------------------------------------------");
    // console.log("🔍 INSPEÇÃO DE LAYOUT (Sidebar)");
    // console.log("🔍 App.jsx - declarado logo no comedo");
    // console.log("🔍 Função do Usuário :", dadosToken?.func || "Não identificado");
    // console.log("🔍 Largura Definida  :", larguraAtual);
    // console.log("🔍 -----------------------------------------------------------");



















   
    // -------------------------------------------------------------------------
    // INICIO - 🏆 MONITOR PARA VERIFICAR SE O CADASTRO, CONTRATO E PRONTUARIO
    // -------------------------------------------------------------------------
    
    const [mostrarModalCompletarCadastro, setModalCompletarCadastro] = useState(false);

    const [mostrarModalCadastroCompleto, setModalCadastroCompleto] = useState(false);

    const [mostrarModalContratoLiberado, setMostrarModalContratoLiberado] = useState(false);
    const jaMostrouSucessoGeralRef = useRef(false);
    const jaMostrouCadastroImcompletoRef = useRef(false);

    useEffect(() => {

        // console.log("");
        // console.log(" ---------------------------");
        // console.log("✨ 🧿 App.jsx");
        // console.log("✨ 🧿 mostrarModalCadastroCompleto:", mostrarModalCadastroCompleto);
        // console.log("✨ 🧿 mostrarModalContratoLiberado:", mostrarModalContratoLiberado);
        // console.log(" ---------------------------");

    }, [mostrarModalCadastroCompleto, mostrarModalContratoLiberado]);
    
    useEffect(() => {

        // console.log("");
        // console.log(" ---------------------------");
        // console.log("✨ 🧿 App.jsx");
        // console.log("✨ 🧿 chamando - ModalCadastroCompleto");
      
        //     console.log("🧿 Situação: Cadastro completo");
        //     console.log("🧿 Esperando: liberaçao do contrato");
        //     console.log("🧿 carregandoPermissoesFireBase:", carregandoPermissoesFireBase);
        //     console.log("🧿 carregandoModal:", carregandoModal);
        //     console.log("🧿 dadosToken?.func:", dadosToken?.func);
        //     console.log("🧿 jaMostrouSucessoGeralRef.current:", jaMostrouSucessoGeralRef.current);
        //     console.log("🧿 cadastroCompleto:", cadastroCompleto);
        //     console.log("🧿 contratoLiberado:", contratoLiberado);
       
        // console.log(" ---------------------------");

        if (carregandoPermissoesFireBase || carregandoModal || dadosToken?.func === 'visitante') return;

        if (dadosToken?.func === 'visitante') {
            jaMostrouSucessoGeralRef.current = false;
            return;
        }




        // if (
        //     dadosToken?.func === 'cliente' &&
        //     mostrarModalCompletarCadastro &&
        //     !cadastroCompleto
        // ) {

        //     setModalCompletarCadastro(true);
        
        //     console.log("");
        //     console.log("-------------------------------");
        //     console.log("🧿 App.jsx");
        //     console.log("📝 Precisa completar o cadastro");
        //     console.log("-------------------------------");

        // }






        // if (
        //     dadosToken?.func === 'cliente' &&
        //     cadastroCompleto === true && 
        //     !contratoLiberado  
        // ) {

        //     setModalCadastroCompleto(true);
            
        //     console.log("");
        //     console.log("----------------------------------");
        //     console.log("🧿 App.jsx");
        //     console.log("🎊 Cadastro completo");
        //     console.log("🎊 Esperando liberaçao do contrato");
        //     console.log("----------------------------------");

        // }











        // if (

        //     dadosToken?.func === 'cliente' &&
        //     cadastroCompleto === true && 
        //     contratoLiberado && 
        //     !contratoAssinado

        // ) {

        //     setMostrarModalContratoLiberado(true);

        
        //     console.log("");
        //     console.log("------------------------------------------------------");
        //     console.log("🎊 🏆 App.jsx");
        //     console.log("🎊 🏆 Cadastro completo e esperando assinatura!");
        //     console.log("------------------------------------------------------");

        // }














    }, [

        carregandoPermissoesFireBase, 
        carregandoModal,
        dadosToken?.func,
        cadastroCompleto, 
        contratoLiberado,
        setModalCadastroCompleto

    ]);
   
    // -------------------------------------------------------------------------
    // FIM - 🏆 MONITOR PARA VERIFICAR SE O CADASTRO EST COMPLETO
    // -------------------------------------------------------------------------
    














    // --------------------------------
    // INICIO - MONITORA AS VARIAVEIS DE TODOS OS USUARIOS
    // --------------------------------

    useEffect(() => {

        // console.log("");
        // console.log("🚀 -------------------------");
        // console.log("🚀 🧿 App.jsx");
        // console.log("🚀 dadosUsuarioBanco:", dadosUsuarioBanco);
        // console.log("🚀 -------------------------");
        
    }, [dadosUsuarioBanco]);

    // --------------------------------
    // FIM - MONITORA AS VARIAVEIS DE TODOS OS USUARIOS
    // --------------------------------


    // --------------------------------
    // INICIO - MONITORA AS VARIAVEIS SOMENTE DOS CLIENTES
    // --------------------------------

    useEffect(() => {
       
        // console.log("");
        // console.log("🔍 ---------------------------");
        // console.log("🔍 🧿 App.jsx");
        // console.log("🔍 2 - contratoLiberado: ", contratoLiberado);
        // console.log("🔍 Somente para clientas");
        // console.log("🔍 ---------------------------");

    }, [contratoLiberado]);

    useEffect(() => {
       
        // console.log("");
        // console.log("🔍 ----------------------------------------");
        // console.log("🔍 🧿 App.jsx");
        // console.log("🔍 3 - contratoAssinado: ", contratoAssinado);
        // console.log("🔍 Somente para clientas");
        // console.log("🔍 ----------------------------------------");

    }, [contratoAssinado]);

    useEffect(() => {
       
        // console.log("");
        // console.log("🔍 -----------------------");
        // console.log("🔍 🧿 App.jsx");
        // console.log("🔍 4 - prontuarioLiberado: ", prontuarioLiberado);
        // console.log("🔍 Somente para clientas");
        // console.log("🔍 -----------------------");

    }, [prontuarioLiberado]);

    // --------------------------------
    // FIM - MONITORA AS VARIAVEIS SOMENTE DOS CLIENTES
    // --------------------------------



    
















    // ---------------------------------
    // INICIO - ⏱️ CRONÔMETRO DE UX (Loading Modal - Mínimo 1s)
    // ---------------------------------

    // const [segundosCarregando, setSegundosCarregando] = useState(0);
    const [modalVisivelUX, setModalVisivelUX] = useState(false);

    useEffect(() => {
        // let intervalo;

        // Se o porteiro sinalizar início, ativamos a visibilidade visual
        if (carregandoModal) {
            setModalVisivelUX(true);
        }

        // Se o modal visual estiver ativo, o motor do relógio bate
        // if (modalVisivelUX) {
        //     intervalo = setInterval(() => {
        //         setSegundosCarregando(prev => prev + 1);
        //     }, 1000);
        // }

        // 🛡️ Regra Maestro: Só removemos o modal se a rede terminou E o timer bateu o mínimo de 1 segundo
        if (!carregandoModal) {
            
            // console.log("");
            // console.log("⏱️ 📐 ----------------------------------");
            // console.log("⏱️ 📐 App.jsx - Ciclo de UX Concluído.");
            // console.log(`⏱️ 📐 Status: Modal liberado após ${segundosCarregando}s.`);
            // console.log("⏱️ 📐 ----------------------------------");

            setModalVisivelUX(false);
            // setSegundosCarregando(0);
        }

        // return () => {
        //     if (intervalo) clearInterval(intervalo);
        // };

    }, [carregandoModal, modalVisivelUX]);

    // ---------------------------------
    // FIM - ⏱️ CRONÔMETRO DE UX (Loading Modal - Mínimo 1s)
    // ---------------------------------

















    // -----------------------------------
    // VERIFICA SE É COMPUTADOR OU CELULAR
    // -----------------------------------

    const [ehComputador, setEhComputador] = useState(window.innerWidth > 768);

    useEffect(() => {

        const checarTamanho = () => {

            const larguraAtual = window.innerWidth;

            // Se for maior que 768, é computador
            const veredictEhComputador = larguraAtual > 768; 
            
            setEhComputador(veredictEhComputador);

            // console.log("");
            // console.log("🔍 -----------------------------------------------------------");
            // console.log("🔍 INSPEÇÃO DE DISPOSITIVO (Responsividade)");
            // console.log("🔍 App.jsx");
            // console.log("🔍 Largura da Janela :", larguraAtual + "px");
            // console.log("🔍 veredictEhComputador :", veredictEhComputador);
            // console.log("🔍 Modo Computador   :", veredictEhComputador ? "✅ SIM (Desktop)" : "❌ NÃO (Mobile)");   
            // console.log("🔍 -----------------------------------------------------------");
      
        };

        checarTamanho();

        window.addEventListener('resize', checarTamanho);
        return () => window.removeEventListener('resize', checarTamanho);
        
    }, []);

    // -----------------------------------
    // VERIFICA SE É COMPUTADOR OU CELULAR
    // -----------------------------------
  


















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
    // INICIO - 🛡️ SENSOR: FECHAR DICA PERFIL AO CLICAR FORA
    // --------------------------------------
    useEffect(() => {
        if (!exibirBalaoDicaMeuPerfil) return;

        const fecharDicaPerfilGlobal = () => {
            // console.log("🔇 💡 Dica Perfil encerrada por clique global.");
            setExibirBalaoDicaMeuPerfil(false);
        };

        window.addEventListener('click', fecharDicaPerfilGlobal);
        return () => window.removeEventListener('click', fecharDicaPerfilGlobal);
    }, [exibirBalaoDicaMeuPerfil, setExibirBalaoDicaMeuPerfil]);
    // --------------------------------------
    // FIM - 🛡️ SENSOR: FECHAR DICA PERFIL
    // --------------------------------------










    // --------------------------------------
    // INICIO - 🛡️ SENSOR: FECHAR DICA CONTRATO AO CLICAR FORA
    // --------------------------------------
    useEffect(() => {
        if (!exibirBalaoDicaMeuContrato) return;
        const fecharDicaContratoGlobal = () => setExibirBalaoDicaMeuContrato(false);
        window.addEventListener('click', fecharDicaContratoGlobal);
        return () => window.removeEventListener('click', fecharDicaContratoGlobal);
    }, [exibirBalaoDicaMeuContrato, setExibirBalaoDicaMeuContrato]);
    // --------------------------------------
    // FIM - 🛡️ SENSOR: FECHAR DICA CONTRATO
    // --------------------------------------










    // --------------------------------------
    // INICIO - 🛡️ SENSOR: FECHAR DICA PRONTUÁRIO AO CLICAR FORA
    // --------------------------------------
    useEffect(() => {
        if (!exibirBalaoDicaProntuarioPaciente) return;
        const fecharDicaProntuarioGlobal = () => setExibirBalaoDicaProntuarioPaciente(false);
        window.addEventListener('click', fecharDicaProntuarioGlobal);
        return () => window.removeEventListener('click', fecharDicaProntuarioGlobal);
    }, [exibirBalaoDicaProntuarioPaciente, setExibirBalaoDicaProntuarioPaciente]);
    // --------------------------------------
    // FIM - 🛡️ SENSOR: FECHAR DICA PRONTUÁRIO
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
       
        
        // 🚀 AJUSTE MAESTRO: Força o scroll para o topo imediatamente no clique
        // window.scrollTo(0, 0);

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

    // ------------------------------------
    // FIM DO - SUBMENU (Sanfona Profissional)
    // ------------------------------------











    // -----------------------------------------------------
    // INICIO DO - SUBMENU (Sanfona - CADASTRAR ADMNISTRADOR
    // -----------------------------------------------------

    // 🧱 Função de Toggle (Abre se fechado / Fecha se aberto)

    const lidarComClique = (e, secao) => {
   
        if (e && e.stopPropagation) e.stopPropagation();
    
        setSecaoAberta((valorAnterior) => {

            const novoValor = valorAnterior === secao ? null : secao;
        
            if (novoValor !== null) {

                setMenuAberto(true); 

            }
            
            return novoValor;

        });

    };

    // -----------------------------------------------------
    // FIM DO - SUBMENU (Sanfona - CADASTRAR ADMNISTRADOR
    // -----------------------------------------------------

    



    // ------------------------------------------------------------------
    // INICIO - 🛡️ SENSOR GLOBAL: FECHAR MENU AO CLICAR EM QUALQUER LUGAR
    // ------------------------------------------------------------------

    // 🚪 Controle da Gaveta e Submenus
    const [menuAberto, setMenuAberto] = useState(false);
    const [secaoAberta, setSecaoAberta] = useState(null); 

    useEffect(() => {

        // console.log("");
        // console.log("🔍 -----------------------------");
        // console.log("🔍 App.jsx");
        // console.log("🔍 menuAberto:", menuAberto);
        // console.log("🔍 secaoAberta:", secaoAberta);
        // console.log("🔍 -----------------------------");

    }, [menuAberto, secaoAberta]);

    const menuRef = useRef(null);

    useEffect(() => {
        
        if (!menuAberto) return;
    
        // console.log("");
        // console.log("👂 ----------------------------------");
        // console.log("👂 MONITORANDO CLIQUE FORA (Menu)");
        // console.log("👂 useEffect() - componente - 🧿 App.jsx");
        // console.log("👂 Status: Menu Aberto. Aguardando clique externo.");
        // console.log("👂 ----------------------------------");
    



        const fecharAoClicarFora = (event) => {
           
            // 🔍 Identifica os alvos
            const clicouNoMenu = event.target.closest('.submenu-container-geral');
            const clicouNoBotaoAbrir = event.target.closest('.btn-abrir-menu');
            
            // 🚀 NOVA EXCLUSÃO: Identifica se o clique foi no botão "Meu Perfil"
            const clicouNoPerfil = event.target.closest('.Botao-Acao-Meu-Perfil');
    
           

            // 🛡️ Só fecha se NÃO clicou no menu, nem no hambúrguer, NEM no perfil
            if (!clicouNoMenu && !clicouNoBotaoAbrir && !clicouNoPerfil) {
        
                console.log("🔇 Clique fora detectado (Ignorando Perfil e Menu)");

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

    // ------------------------------------------------------------------
    // FIM - 🛡️ SENSOR GLOBAL: FECHAR MENU AO CLICAR EM QUALQUER LUGAR
    // ------------------------------------------------------------------








    // ------------------------------------------------------------------
    // INICIO - 🔒 TRAVA DE MOVIMENTO SEM SUMIR SCROLL (ANTI-PULO)
    // ------------------------------------------------------------------

    useEffect(() => {
        if (!ehComputador && menuAberto) {
            console.log("🔒 📐 SCROLL LOCK: Travando movimento, mantendo visual.");
            
            // 🛑 Impede que o scroll do menu "empurre" o scroll do fundo
            document.body.style.overscrollBehavior = 'none';
            
            // 🛑 Alternativa robusta: fixa o body mas mantém a barra
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`; // Mantém a posição atual
            document.body.style.overflowY = 'scroll'; // FORÇA a barra a continuar visível
            
        } else {
            // 🧹 Restauração inteligente
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.body.style.overflowY = '';
            document.body.style.overscrollBehavior = '';
            
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            document.body.style.overflowY = '';
            document.body.style.overscrollBehavior = '';
        };
    }, [menuAberto, ehComputador]);

    // ------------------------------------------------------------------
    // FIM - 🔒 TRAVA DE MOVIMENTO
    // ------------------------------------------------------------------
















    /* --------------------------------------------------------------------------------------- */
    /* INICIO - 🛠️ VIGILÂNCIA DE PREENCHIMENTO DOS CARDS DOS USUSARIOS E VERIFICAR PERMISSOES  */
    /* --------------------------------------------------------------------------------------- */



    /* -------------------------------------- */
    /* INICIO - 🔍 Monitor de Status Administrador */
    /* -------------------------------------- */

    const [statusAdministrador, setStatusAdministrador] = useState({
        contato: false,
        endereco: false
    });

    useEffect(() => {

        // console.log("");
        // console.log("🔍 -------------------------------------");
        // console.log("🔍 INSPEÇÃO DE STATUS ADMINISTRADOR");
        // console.log("🔍 contato  :", statusAdministrador.contato);
        // console.log("🔍 endereco :", statusAdministrador.endereco);
        // console.log("🔍 -------------------------------------");

    }, [statusAdministrador]);

    /* -------------------------------------- */
    /* FIM - 🔍 Monitor de Status Administrador */
    /* -------------------------------------- */
  








    



    /* -------------------------------------- */
    /* INICIO - 🔍 Monitor de Status Cuidadora */
    /* -------------------------------------- */

    const [statusCuidadora, setStatusCuidadora] = useState({
        contato: false,
        endereco: false,
        cnpj: false,
        formacao: false
    });

    useEffect(() => {

        // console.log("");
        // console.log("🔍 -------------------------------------");
        // console.log("🔍 INSPEÇÃO DE STATUS CUIDADORA");
        // console.log("🔍 contato  :", statusCuidadora.contato);
        // console.log("🔍 endereco :", statusCuidadora.endereco);
        // console.log("🔍 cnpj     :", statusCuidadora.cnpj);
        // console.log("🔍 formacao :", statusCuidadora.formacao);
        // console.log("🔍 -------------------------------------");

    }, [statusCuidadora]);

    /* -------------------------------------- */
    /* FIM - 🔍 Monitor de Status Cuidadora */
    /* -------------------------------------- */











    /* -------------------------------------- */
    /* INICIO - 🔍 Monitor de Status Cliente */
    /* -------------------------------------- */

    const [statusCliente, setStatusCliente] = useState({
        contato: false,
        endereco: false
    });

    useEffect(() => {

        // console.log("");
        // console.log("🔍 -------------------------------------");
        // console.log("🔍 STATUS CLIENTE");
        // console.log("🔍 contato  :", statusCliente.contato);
        // console.log("🔍 endereco :", statusCliente.endereco);
        // console.log("🔍 -------------------------------------");

    }, [statusCliente]);

    /* -------------------------------------- */
    /* FIM - 🔍 Monitor de Status Cliente */
    /* -------------------------------------- */








    // 1. O Estado com nome mais claro
    const [perfilCompleto, setPerfilCompleto] = useState(false);

    useEffect(() => {
        // Extraímos os valores do status que vem do Contexto
        const { contato, endereco } = statusCliente;

        // Se ambos estiverem preenchidos (true)
        if (contato === true && endereco === true) {
            
            // Atualiza para completo, evitando re-renders desnecessários
            setPerfilCompleto(prev => {
                if (prev === true) return prev;
                return true;
            });

        } else {
            // Se o usuário remover um dado, o perfil deixa de estar completo
            setPerfilCompleto(false);
        }

    }, [statusCliente]);

    useEffect(() => {

        // console.log("");
        // console.log("🔍 -------------------------------------");
        // console.log("🔍 App.jsx");
        // console.log("🔍 perfilCompleto  :", perfilCompleto);
        // console.log("🔍 -------------------------------------");

    }, [perfilCompleto]);










































    


    // 📐 ESTADO MAESTRO: Autorização Global da Cuidadora
    const [autorizadoAdministrador, setAutorizadoAdministrador] = useState(false);






    /* Busca direta no RTDB baseada no CPF do Token (Tempo Real) */
    useEffect(() => {

        if (!dadosToken?.cpef) {

            setStatusAdministrador({
                contato: false,
                endereco: false
            });


            setStatusCuidadora({
                contato: false,
                endereco: false,
                cnpj: false,
                formacao: false
            });

            setStatusCliente({
                contato: false,
                endereco: false
            });

            return;

        }

        
        const cpfLimpo = dadosToken?.cpef.replace(/\D/g, "");
       
        const usuarioRef = ref(db_realtime, `usuarios/${cpfLimpo}`);

        const unsubscribe = onValue(usuarioRef, (snapshot) => {
            
            if (snapshot.exists()) {
                
                const dadosUsuario = snapshot.val();

                // A - 🔐 Dados de Contato
                // Padrão: { mail, fone } (Obrigatórios)
                const contato = dadosUsuario?.dadosContato;
                const temContato = !!(contato?.mail?.trim() && contato?.fone?.trim());

                // B - ⚙️ Dados de Endereço (conforme Endereco.jsx)
                // Padrão: dadosEndereco: { cep, num } (Obrigatórios)
                const endereco = dadosUsuario?.dadosEndereco;
                const temEndereco = !!(endereco?.cepe?.trim() && endereco?.nume?.trim());

                // C - 🏢 Dados da Empresa (conforme Cnpj.jsx)
                // Padrão: cnpj_dados: { num_cnpj, razao } (Obrigatórios)
                const empresa = dadosUsuario?.dadosEmpresa;
                const temEmpresa = !!(empresa?.cnpj?.trim() && empresa?.raza?.trim());

                // D - 🎓 Dados de Formação (conforme Formacao.jsx)
                // Padrão: formacao_dados: { nivel } (Obrigatório)
                const formacao = dadosUsuario?.dadosFormacao;
                const temFormacao = !!(formacao?.nivel?.trim());

                // 📐 Estabilização Maestro: Só atualiza se o valor BOLEANO mudar

                setStatusAdministrador(prev => {
                    if (prev.contato === temContato && prev.endereco === temEndereco) return prev;
                    return { contato: temContato, endereco: temEndereco };
                });

                setStatusCuidadora(prev => {
                    if (prev.contato === temContato && 
                        prev.endereco === temEndereco && 
                        prev.cnpj === temEmpresa && 
                        prev.formacao === temFormacao) return prev;
                    return { 
                        contato: temContato, 
                        endereco: temEndereco, 
                        cnpj: temEmpresa, 
                        formacao: temFormacao 
                    };
                });

                setStatusCliente(prev => {
                    if (prev.contato === temContato && prev.endereco === temEndereco) return prev;
                    return { contato: temContato, endereco: temEndereco };
                });

   


            } else {
                

                console.warn("❌ ✨ Alerta: Usuário logado (CPF) mas sem dados cadastrados no Realtime.");


                setStatusAdministrador({
                    contato: false,
                    endereco: false
                });

                setStatusCuidadora({
                    contato: false,
                    endereco: false,
                    cnpj: false,
                    formacao: false
                });

                setStatusCliente({
                    contato: false,
                    endereco: false
                });


            }

        }, (error) => {
            
            console.error("❌ 🔴 Erro fatal na escuta do Realtime Database (CPF):", error.message);

        });

        return () => {

            // console.log("🔍 🔴 ✨ Encerrando escuta do Realtime Database (Clean-up).");
            unsubscribe();

        };

    }, [dadosToken?.cpef]); 




    const perfilEstaCompletoAdministrador = Object.values(statusAdministrador).every(status => status === true);
    const perfilEstaCompletoCuidadora = Object.values(statusCuidadora).every(status => status === true);
    const perfilEstaCompletoCliente = Object.values(statusCliente).every(status => status === true);





    /* 🔍 Monitor de Status Geral (Calculado) */
    useEffect(() => {

        // console.log("");
        // console.log("🔍 -------------------------------------");
        // console.log("🔍 INSPEÇÃO DE STATUS GERAL (CALCULADO)");
        // console.log("🔍 perfilEstaCompletoAdministrador:", perfilEstaCompletoAdministrador);
        // console.log("🔍 perfilEstaCompletoCuidadora:", perfilEstaCompletoCuidadora);
        // console.log("🔍 perfilEstaCompletoCliente:", perfilEstaCompletoCliente);
        // console.log("🔍 -------------------------------------");

    }, [perfilEstaCompletoAdministrador, perfilEstaCompletoCuidadora, perfilEstaCompletoCliente]);

    /* INICIO - 🔍 VERIFICANDO NO BANCO DE DADOS SE O PERDIL DA CUIDADORA ESTA COMPLETO) */
    useEffect(() => {
    
        if (dadosToken?.func !== 'cuidadora') return;

        const cpfLimpo = dadosToken?.cpef?.replace(/\D/g, "");
        
        if (!cpfLimpo) return;

        const atualizarStatusCuidadora = async () => {

            try {

                // 📐 Referência ao nó de cadastro para atualização múltipla
                const cadastroRef = ref(db_realtime, `usuarios/${cpfLimpo}/dadosCadastro`);
                const snapshot = await get(cadastroRef);
                const dadosAtuais = snapshot.val() || {};

                // console.log("");
                // console.log("📐 🔍 -----------------------------------------------------------");
                // console.log("📐 🔍 App.jsx: Verificacao para o Perfil Cuidadora");
                // console.log("📐 🔍 cpfLimpo  :", cpfLimpo );
                // console.log("📐 🔍 perfilEstaCompletoCuidadora  :", perfilEstaCompletoCuidadora );
                
                // console.log("📐 🔍 Dados atuais do Banco de dados - dadosAtuais:");
                // console.log(dadosAtuais);
                // console.log("📐 🔍 perfilCompleto:", dadosAtuais.perfilCompleto);
                // console.log("📐 🔍 perfilCompletoData:", dadosAtuais.perfilCompletoData);
                // console.log("📐 🔍 -----------------------------");

                if (perfilEstaCompletoCuidadora && dadosAtuais.perfilCompleto !== true) {

                    const dataHoje = new Date().toLocaleDateString('pt-BR');

                    await update(cadastroRef, { 
                        perfilCompleto: true,
                        perfilCompletoData: dataHoje
                    });

                    // console.log("");
                    // console.log("📐 🔍 ✔️ -----------------------------");
                    // console.log("📐 🔍 ✔️ perfilCompleto:", true); 
                    // console.log("📐 🔍 ✔️ perfilCompletoData:", dataHoje); 
                    // console.log("📐 🔍 ✔️ -----------------------------");

                } 

                else if (!perfilEstaCompletoCuidadora && dadosAtuais.perfilCompleto === true) {

                    await update(cadastroRef, { 
                        perfilCompleto: false,
                        perfilCompletoData: ""
                    });

                    // console.log("");
                    // console.log("📐 🔍 ❌ -----------------------------");
                    // console.log("📐 🔍 ❌ perfilCompleto:", false);
                    // console.log("📐 🔍 ❌ perfilCompletoData:", ""); 
                    // console.log("📐 🔍 ❌ -----------------------------");

                } else {

                    // console.log("");
                    // console.log("📐 🔍 --------------------------------");
                    // console.log("📐 🔍 componente - App.jsx");
                    // console.log("📐 🔍  LOG: Sincronia de Cuidadora OK.");
                    // console.log("📐 🔍 --------------------------------");

                }

            } catch (error) {

                console.error("📐 ❌  Erro no monitor da Cuidadora:", error);

            }

        };

        atualizarStatusCuidadora();

    }, [perfilEstaCompletoCuidadora, dadosToken?.func]);








    /* ------------------------------------------------------------------------------- */
    /* INICIO - 🔍 VERIFICANDO NO BANCO DE DADOS SE O perfilCompleto DO CLIENTE ) */
    /* ------------------------------------------------------------------------------- */

    useEffect(() => {
       
        if (dadosToken?.func !== 'cliente') return;

        const cpfLimpo = dadosToken?.cpef?.replace(/\D/g, "");

        if (!cpfLimpo) return;

        const atualizarStatusCliente = async () => {

            try {

                const cadastroRef = ref(db_realtime, `usuarios/${cpfLimpo}/dadosCadastro`);
                const snapshot = await get(cadastroRef);
                const dadosAtuais = snapshot.val() || {};

                // console.log("");
                // console.log("📐 🔍 -----------------------------------------------------------");
                // console.log("📐 🔍 App.jsx: Verificacao para o Perfil Cliente");
                // console.log("📐 🔍 cpfLimpo  :", cpfLimpo );
                // console.log("📐 🔍 perfilEstaCompletoCliente  :", perfilEstaCompletoCliente );
                
                // console.log("📐 🔍 dadosAtuais:");
                // console.log(dadosAtuais);
                // console.log("📐 🔍 perfilCompleto:", dadosAtuais.perfilCompleto);
                // console.log("📐 🔍 perfilCompletoData:", dadosAtuais.perfilCompletoData);
                // console.log("📐 🔍 -----------------------------");

                if (perfilEstaCompletoCliente && dadosAtuais.perfilCompleto !== true) {

                    const dataHoje = new Date().toLocaleDateString('pt-BR');

                    await update(cadastroRef, { 
                        perfilCompleto: true,
                        perfilCompletoData: dataHoje
                    });

                    // console.log("");
                    // console.log("📐 🔍 ✔️ -----------------------------");
                    // console.log("📐 🔍 ✔️ perfilCompleto:", true); 
                    // console.log("📐 🔍 ✔️ perfilCompletoData:", dataHoje); 
                    // console.log("📐 🔍 ✔️ -----------------------------");

                } 

                else if (!perfilEstaCompletoCliente && dadosAtuais.perfilCompleto === true) {

                    await update(cadastroRef, { 
                        perfilCompleto: false,
                        perfilCompletoData: ""
                    });

                    // console.log("");
                    // console.log("📐 🔍 ❌ -----------------------------");
                    // console.log("📐 🔍 ❌ perfilCompleto:", false);
                    // console.log("📐 🔍 ❌ perfilCompletoData:", ""); 
                    // console.log("📐 🔍 ❌ -----------------------------");

                } else {

                    // console.log("");
                    // console.log("📐 🔍 --------------------------------");
                    // console.log("📐 🔍 componente - App.jsx");
                    // console.log("📐 🔍  LOG: Sincronia de Cuidadora OK.");
                    // console.log("📐 🔍 --------------------------------");

                }

            } catch (error) {

                console.error("❌ 📐 Erro no monitor do Cliente:", error);

            }

            // console.log("🔍 ------------------------");

        };

        atualizarStatusCliente();

    }, [perfilEstaCompletoCliente, dadosToken?.func]);

    /* ------------------------------------------------------------------------------- */
    /* FIM - 🔍 VERIFICANDO NO BANCO DE DADOS SE O perfilCompleto DO CLIENTE ) */
    /* ------------------------------------------------------------------------------- */










    /* INICIO - 🔍 VERIFICANDO NO BANCO DE DADOS SE EXISTE INFORMACAO DE AURORIZACAO DO ADMINISTRADOR PARA OS USUARIOS  */
    useEffect(() => {
    
        if (dadosToken?.func !== 'cuidadora' && dadosToken?.func !== 'cliente') return;

        const cpfLimpo = dadosToken?.cpef?.replace(/\D/g, "");
        
        if (!cpfLimpo) {
            setAutorizadoAdministrador(false);
            return;
        }

        // 📐 Protocolo Maestro V3: Monitoramento em Tempo Real do Nó Interno
        const statusRef = ref(db_realtime, `usuarios/${cpfLimpo}/dadosCadastro`);
        
        const unsubscribe = onValue(statusRef, (snapshot) => {

            // 🧱 Garante que 'dados' seja um objeto mesmo se o nó for null no Firebase
            const dados = snapshot.val() || {};

            // console.log("");
            // console.log("✨ 🛡️ --------------------------------------");
            // console.log("✨ 🛡️ App.jsx - useEffect: Autorização Admin");
            // console.log("✨ 🛡️ Cuidadora:", dadosToken?.nome?.toUpperCase());
            // console.log("✨ 🛡️ dadosToken?.cpef:", dadosToken?.cpef);
            // console.log("✨ 🛡️ dadosToken?.func:", dadosToken?.func);
            // console.log("✨ 🛡️ autorizadoAdministrador:", dados.autorizadoAdministrador || false);
            // console.log("✨ 🛡️ ---------------------------------------");

            setAutorizadoAdministrador(!!dados.autorizadoAdministrador);

        });

        return () => unsubscribe(); // 🧹 Cleanup Sagrado

    }, [dadosToken?.cpef, dadosToken?.func]);
    
    useEffect(() => {

        // console.log("");
        // console.log("✨ 🛡️ -----------------------------------------------------------");
        // console.log("✨ 🛡️ App.jsx - useEffect PURO - autorizadoAdministrador");
        // console.log("✨ 🛡️ autorizadoAdministrador - Valor Atual:", autorizadoAdministrador);
        // console.log("✨ 🛡️ -----------------------------------------------------------");

    }, [autorizadoAdministrador]);

    /* --------------------------------------------------------------------------------------- */
    /* FIM - 🛠️ VIGILÂNCIA DE PREENCHIMENTO DOS CARDS DOS USUSARIOS E VERIFICAR PERMISSOES  */
    /* --------------------------------------------------------------------------------------- */






   








    /* ------------------------------------------------------------- */
    /* INICIO DO - MODAL 🔥 FIREBASE */
    /* ------------------------------------------------------------- */

    /* SEMPRE MANTER ESSE COMO SENDO O ULTIMO ANTES DO RETURN */

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


































    /*  ---------------- */
    /*  INICIO DO RETURN */
    /*  ---------------- */

    return (





        /* -------------------------------------- */
        /* INICIO - 🛡️ CONTAINER-EXTERNO-BLINDADO */
        /* -------------------------------------- */

        <div className="container-externo-blindado" data-func={dadosToken?.func}>







            {/* ------------------------- */}
            {/* INICIO - MODAL CARREGANDO */}
            {/* ------------------------- */}

            <LoadingModalUX 
                visivel={carregandoModal} 
            />

            {/* ------------------------- */}
            {/* FIM - MODAL CARREGANDO */}
            {/* ------------------------- */}

         


            {/* ---------------------------------------------------- */}
            {/* INICIO - MOSTRANDO MODAL SE FALTAR COMPLETAR CADASTRO */}
            {/* ---------------------------------------------------- */}

            <ModalCompletarCadastro 
                visivel={mostrarModalCompletarCadastro && !cadastroCompleto }
                aoFechar={() => setModalCompletarCadastro(false)}
            />

            {/* ---------------------------------------------------- */}
            {/* FIM - MOSTRANDO MODAL SE FALTAR COMPLETAR CADASTRO */}
            {/* ---------------------------------------------------- */}




            {/* ------------------------------------------------------------------------------------- */}
            {/* INICIO - MOSTRANDO MODAL SE O CADASTRO ESTIVER COMPLETO E O CONTRATO NAO FOI ASSINADO  */}
            {/* ------------------------------------------------------------------------------------- */}

            <ModalCadastroCompleto 
                visivel={mostrarModalCadastroCompleto && cadastroCompleto && !contratoLiberado}
                aoFechar={() => setModalCadastroCompleto(false)}
                nomeUsuario={dadosToken?.nome}
            />

            {/* ------------------------------------------------------------------------------------- */}
            {/* FIM - MOSTRANDO MODAL SE O CADASTRO ESTIVER COMPLETO E O CONTRATO NAO FOI ASSINADO  */}
            {/* ------------------------------------------------------------------------------------- */}










            <ModalContratoLiberado 
                visivel={mostrarModalContratoLiberado && cadastroCompleto && contratoLiberado}
                aoFechar={() => setMostrarModalContratoLiberado(false)}
                nomeUsuario={dadosToken?.nome}
            />




















            {/* -------------------------------------------------------------------- */}
            {/* INICIO - HEADER - header-spacer - CABEÇALHO FIXO - TOPO - HORIZONTAL */}
            {/* -------------------------------------------------------------------- */}

            <header className="header-container">








                {/* ------------------------------------------ */}
                {/* INICIO - 🖼️ LOGOMARCA (Extrema Esquerda) */}
                {/* ------------------------------------------ */}

                <div className="div-Logo-header" onClick={() => navigate('/')}>
                    <img className="Imagem-Logotipo"  src="/imagens/LogoSVG6.png" alt="Logo" />
                </div>

                {/* ------------------------------------------ */}
                {/* FIM - 🖼️ LOGOMARCA (Extrema Esquerda) */}
                {/* ------------------------------------------ */}








        

                {/* ------------------------------------------------- */}
                {/* INICIO do - 💻🔩 MENU HORIZONTAL PARA COMPUTADOR */}
                {/* ------------------------------------------------- */}

                {/* 💻 CASO 01: É COMPUTADOR */}
                {ehComputador && (
                    <>



                        {/* PROGRAMADOR */}
                        {dadosToken?.func === 'programador' && (
                            <MenuHorizontalProgramador 
                                navegarERecolher={navegarERecolher}
                                lidarComClique={lidarComClique}
                                secaoAberta={secaoAberta}
                                ehComputador={ehComputador}
                            />
                        )}



                        {/* ADMINISTRADOR */}
                        {dadosToken?.func === 'administrador' && (
                            <MenuHorizontalAdministrador
                                navegarERecolher={navegarERecolher}
                                ehComputador={ehComputador}
                            />
                        )}



                        {/* VISITANTE */}
                        {dadosToken?.func === 'visitante' && (
                            <MenuHorizontalVisitante 
                                navegarERecolher={navegarERecolher}
                                ehComputador={ehComputador}
                            />
                        )}



                        {/* CUIDADORA */}
                        {dadosToken?.func === 'cuidadora' && (
                            <MenuHorizontalCuidadora 
                                navegarERecolher={navegarERecolher}
                                autorizadoAdministrador={autorizadoAdministrador}
                                ehComputador={ehComputador}
                            />
                        )}



                        {/* CLIENTE */}
                        {dadosToken?.func === 'cliente' && (
                            <MenuHorizontalCliente 
                                navegarERecolher={navegarERecolher}
                                dadosUsuarioBanco={dadosUsuarioBanco}
                                ehComputador={ehComputador}    
                                exibirBalaoDicaMeuContrato={exibirBalaoDicaMeuContrato}
                            />
                        )}



                    </>
                )}

                {/* ------------------------------------------------- */}
                {/* INICIO do - 💻🔩 MENU HORIZONTAL PARA COMPUTADOR */}
                {/* ------------------------------------------------- */}
                








                {/* ------------------------------------------------------------ */}
                {/* INICIO - 🍔 O Botão Hambúrguer assume o controle direto aqui */}
                {/* ------------------------------------------------------------ */}

                {/* 📱 CASO 02: É CELULAR - MOSTRAR A FIGURA DO MENU HAMBURGUER */}
                {!ehComputador && (

                    <FiguraMenuHamburguer 
                        menuAberto={menuAberto}
                        setMenuAberto={setMenuAberto}

                        secaoAberta={secaoAberta}
                        setSecaoAberta={setSecaoAberta}

                        exibirBalaoDicaMenuHamburguer={exibirBalaoDicaMenuHamburguer}
                    />

                )}

                {/* --------------------------------------------------------- */}
                {/* FIM - 🍔 O Botão Hambúrguer assume o controle direto aqui */}
                {/* --------------------------------------------------------- */}









                {/* ------------------------------------------------------------- */}
                {/* INICIO do - 📱🔩 Conteiner geral individualizado PARA CELULAR*/}
                {/* ------------------------------------------------------------- */}

                {/* 📱 CASO 02: É CELULAR + MENU ABERTO */}
                {!ehComputador && menuAberto && (

                    <div className={`submenu-container-geral ${menuAberto ? 'menu-mobile-ativo' : ''}`}
                        ref={menuRef}
                    >


                        {/* 👩‍⚕️ CASO PROGRAMADOR */}
                        {dadosToken?.func === 'programador' && (

                            <div className="div-pai-menu-mobile">
                                
                                {/* ⬆️ Parte de Cima: Horizontal */}
                                <MenuHorizontalProgramador 
                                    navegarERecolher={navegarERecolher}
                                    autorizadoAdministrador={autorizadoAdministrador}
                                    ehComputador={ehComputador}
                                />
                                
                                {/* ⬇️ Parte de Baixo: Sidebar (Empilhado) */}
                                <MenuSideBarProgramador
                                    navegarERecolher={navegarERecolher}
                                    autorizadoAdministrador={autorizadoAdministrador}
                                    ehComputador={ehComputador}
                                />

                            </div>

                        )}



                        {/* 👤 CASO VISITANTE */}
                        {dadosToken?.func === 'visitante' && (
                        
                            <MenuHorizontalVisitante 
                                navegarERecolher={navegarERecolher} 
                                menuAberto={menuAberto}
                            />
                            
                        )}



                        {/* 👩‍⚕️ CASO CUIDADORA */}
                        {dadosToken?.func === 'cuidadora' && (

                            <div className="div-pai-menu-mobile">
                                
                                {/* ⬆️ Parte de Cima: Horizontal */}
                                <MenuHorizontalCuidadora 
                                    navegarERecolher={navegarERecolher}
                                    autorizadoAdministrador={autorizadoAdministrador}
                                    ehComputador={ehComputador}
                                />
                                
                                {/* ⬇️ Parte de Baixo: Sidebar (Empilhado) */}
                                <MenuSideBarCuidadora
                                    navegarERecolher={navegarERecolher}
                                    autorizadoAdministrador={autorizadoAdministrador}
                                    ehComputador={ehComputador}
                                />
                            
                            </div>

                        )}



                        {/* 🏠 CASO CLIENTE */}
                        {dadosToken?.func === 'cliente' && (
                            

                            /* ⬇️ Parte de Baixo: Sidebar (Empilhado) */
                            <div className="div-pai-menu-mobile-cliente">
                                
                                {/* CLIENTE */}
                                <MenuHorizontalCliente 
                                     navegarERecolher={navegarERecolher}
                                     dadosUsuarioBanco={dadosUsuarioBanco}
                                     ehComputador={ehComputador}    
                                     exibirBalaoDicaMeuContrato={exibirBalaoDicaMeuContrato}
                                />
                                


                                
                                {/* CLIENTE */}
                                <MenuSideBarCliente 
                                    navegarERecolher={navegarERecolher}
                                    dadosUsuarioBanco={dadosUsuarioBanco}
                                    ehComputador={ehComputador}
                                    exibirBalaoDicaProntuarioPaciente={exibirBalaoDicaProntuarioPaciente}
                                />
                       

                            </div>
                            
                        )}

                        
                    </div>

                )}

                {/* ------------------------------------------------------------- */}
                {/* INICIO do - 📱🔩 Conteiner geral individualizado PARA CELULAR*/}
                {/* ------------------------------------------------------------- */}









                {/* -------------------------------------------- */}
                {/* INICIO - 🔘 ESPACO PARA VISITANTE OU LOGADO  */}
                {/* -------------------------------------------- */}

                <div className="div-visitante-e-meu-perfil">




                    {dadosToken?.func !== 'visitante' ? (



                        /* ------------------------------------------------------------ */
                        /* INICIO - AREA PRIVADA - MENU PARA LOGADOS - BOTAO MEU PERFIL */
                        /* ------------------------------------------------------------ */

                        <div className="submenu-container-perfil">






                            {/* ------------------- */}
                            {/* INICIO - BOTAO CHAT */}
                            {/* ------------------- */}

                            <div className="Botao-Chat" 
                                onClick={() => {
                                    navegarERecolher('/interno/Chat');
                                }}
                            >
                                <img 
                                    className="Img-Chat-Icone" 
                                    alt="Chat"
                                    src="/imagens/chat.png"    
                                />
                            </div>

                            {/* ---------------- */}
                            {/* FIM - BOTAO CHAT */}
                            {/* ---------------- */}







                            {/* ------------------------- */}
                            {/* INICIO - BOTAO MEU PERFIL */}
                            {/* ------------------------- */}

                            <button className={`Botao-Acao-Meu-Perfil ${secaoAberta === 'perfil' ? 'Ativo' : ''} ${exibirBalaoDicaMeuPerfil ? 'pulsar-ativo' : ''}`}
                                onClick={() => {
                                    // Garante que o menu lateral (gaveta) seja fechado
                                    setMenuAberto(false);
                                    // Abre/Fecha a seção de perfil
                                    setSecaoAberta(secaoAberta === 'perfil' ? null : 'perfil');       
                                }}
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

                            <BalaoDicaMeuPerfil 
                                exibirBalaoDicaMeuPerfil={exibirBalaoDicaMeuPerfil} 
                            />

                            {/* ---------------------- */}
                            {/* FIM - BOTAO MEU PERFIL */}
                            {/* ---------------------- */}







                            {/* ------------------------------------ */}
                            {/* INICIO DO - SUB MENU - DADOS DO USUARIO */}
                            {/* ------------------------------------ */}
                            
                            <div className={`SubmenuFlutuante-Estilizado ${secaoAberta === 'perfil' ? 'Ativo' : ''}`}>




                                <div className="Header-Menu-Perfil">
                                    <strong>{dadosToken?.nome || "Usuário"}</strong>
                                    <span>{formatarCPF(dadosToken?.cpef)}</span>
                                </div>
                          
                                <div className="Header-Funcao">
                                    <span>Função:</span>
                                    <strong>{dadosToken?.func}</strong>   
                                </div>




                                {/* ----------------------- */}
                                {/* INICIO - DADOS PESSOAIS */}
                                {/* ----------------------- */}

                                <div className="dados-pessoais">

                                    {dadosToken?.func === 'administrador' && (
                                        <>


                                            <button                                          
                                                className="Perfil-Opcoes"
                                                onClick={() => navegarERecolher('/interno/UsuarioContato')}>
                                                {statusAdministrador.contato ? "✔️" : "❌"} Contato
                                            </button>


                                            <button 
                                                className="Perfil-Opcoes"
                                                onClick={() => navegarERecolher('/interno/Endereco')}>
                                                {statusAdministrador.endereco ? "✔️" : "❌"} Endereço
                                            </button>


                                        </>
                                    )}


                                    {dadosToken?.func === 'cuidadora' && (
                                        <>


                                            <button                                           
                                                className="Perfil-Opcoes"
                                                onClick={() => navegarERecolher('/interno/UsuarioContato')}>
                                                {statusCuidadora.contato ? "✔️" : "❌"} Contato
                                            </button>


                                            <button 
                                                className="Perfil-Opcoes"
                                                onClick={() => navegarERecolher('/interno/Endereco')}>
                                                {statusCuidadora.endereco ? "✔️" : "❌"} Endereço
                                            </button>


                                            <button  
                                                className="Perfil-Opcoes"
                                                onClick={() => navegarERecolher('/interno/Cnpj')}>
                                                {statusCuidadora.cnpj ? "✔️" : "❌"} CNPJ
                                            </button>
                                            
                                        
                                            <button 
                                                className="Perfil-Opcoes"
                                                onClick={() => navegarERecolher('/interno/UsuarioFormacao')}>
                                                {statusCuidadora.formacao ? "✔️" : "❌"} Formação 
                                            </button>

                                        </>
                                    )}


                                    {dadosToken?.func === 'cliente' && (
                                        <>


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


                                        </>
                                    )}

                                </div>

                                {/* ----------------------- */}
                                {/* INICIO - DADOS PESSOAIS */}
                                {/* ----------------------- */}



                                    
        
                                {/* ------------------------------------------- */}
                                {/* INICIO - BOTAO SAIR - PARA TODOS O USUARIOS */}
                                {/* ------------------------------------------- */}

                                <button className="Botao-Acao-Sair" 
                                    onClick={() => { 
                                        onClickSair(); 
                                    }}
                                >
                                    Sair
                                </button>

                                {/* ------------------------------------------- */}
                                {/* FIM - BOTAO SAIR - PARA TODOS O USUARIOS */}
                                {/* ------------------------------------------- */}







                                {/* ------------------------------------------------------ */}
                                {/* INICIO - TESTE PERMISSAO - PROVISORIO - DESENVOLVIMENTO*/}
                                {/* ------------------------------------------------------ */}

                                {/* <button onClick={() => {
                                    console.log("");
                                    console.log("📐 ----------------------------------");
                                    console.log("📐 🚀 EVENTO: Clique no botão 'Teste Permissao'");
                                    console.log("📐 📍 Navegando para /interno/TestePermissaoMelhor");
                                    console.log("📐 ----------------------------------");
                                    navegarERecolher('/interno/TestePermissaoMelhor');
                                    }}>
                                    Teste Permissao
                                </button> */}

                                {/* ------------------------------------------------------ */}
                                {/* FIM - TESTE PERMISSAO - PROVISORIO - DESENVOLVIMENTO*/}
                                {/* ------------------------------------------------------ */}







                            </div>

                            {/* ------------------------------------ */}
                            {/* FIM DO - SUB MENU - DADOS DO USUARIO */}
                            {/* ------------------------------------ */}






                        </div>

                        /* ------------------------------------------------------------ */
                        /* FIM - AREA PRIVADA - MENU PARA LOGADOS - BOTAO MEU PERFIL */
                        /* ------------------------------------------------------------ */



                    ) : (
                        


                        // ------------------------------------
                        // INICIO - AREA PARA VISITANTES - ENTRAR OU CADASTRAR
                        // ------------------------------------

                        <div className="submenu-container-visitante">



                            {/* INICIO - BOTAO CRIAR CONTA */}

                            <div style={{ position: 'relative', display: 'inline-block' }}>

                                <button className={`Botao-Acao-Visitante-Perfil ${exibirBalaoDicaCriarConta ? 'pulsar-ativo' : ''}`} 
                                
                                    onClick={(e) => {

                                        // console.log("");
                                        // console.log("📐 ----------------------------------");
                                        // console.log("📐 🚀 EVENTO: Clique no botao 'Criar Conta'");
                                        // console.log("📐 🔵 Estado 'Dica Visível' = ", exibirBalaoDicaCriarConta);
                                        
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

                                <button className={`Botao-Acao-Visitante-Perfil ${exibirBalaoDicaEntrar ? 'pulsar-ativo' : ''}`} 
                                    // style={{ width: '90px' }} 
                                    onClick={(e) => {
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
                        // FIM - AREA PARA VISITANTES - ENTRAR OU CADASTRAR
                        // ------------------------------------



                    )}



                </div>

                {/* -------------------------------------------- */}
                {/* FIM - 🔘 ESPACO PARA VISITANTE OU LOGADO  */}
                {/* -------------------------------------------- */}

             







            </header>

            {/* ----------------------------------------------------------------- */}
            {/* FIM - HEADER - header-spacer - CABEÇALHO FIXO - TOPO - HORIZONTAL */}
            {/* ----------------------------------------------------------------- */}








            
            {/* ----------------------------------------------------------------- */}
            {/* INICIO- ESPACO (CALÇO) DE ALTURA PARA O - header-spacer */}
            {/* ----------------------------------------------------------------- */}

            <div className="header-spacer"></div>

            {/* ----------------------------------------------------------------- */}
            {/* INICIO - ESPACO (CALÇO) DE ALTURA PARA O - header-spacer */}
            {/* ----------------------------------------------------------------- */}









            {/* ---------------------------------------------------- */}
            {/* INICIO - MAIN - main-area-principal - ROUTES - ROTAS */}
            {/* ---------------------------------------------------- */}

            <main className="main-area-principal">










                {/* ------------------------------------------------- */}
                {/* INICIO do - 💻🔩 MENU SIDEBAR PARA COMPUTADOR */}
                {/* ------------------------------------------------- */}

                {/* 💻 CASO 01: É COMPUTADOR */}
                {ehComputador && (
                    <>

                        {/* PROGRAMADOR*/}
                        {dadosToken?.func === 'programador' && (
                            <MenuSideBarProgramador
                                navegarERecolher={navegarERecolher}
                                autorizadoAdministrador={autorizadoAdministrador}
                                ehComputador={ehComputador}
                            />
                        )}




                        {/* ADMINISTRADOR*/}
                        {dadosToken?.func === 'administrador' && (
                            <MenuSideBarAdministrador
                                navegarERecolher={navegarERecolher}
                                cadastroCompleto={cadastroCompleto}
                                ehComputador={ehComputador}
                            />
                        )}



                        {/* CLIENTE */}
                        {dadosToken?.func === 'cuidadora' && (
                            <MenuSideBarCuidadora 
                                navegarERecolher={navegarERecolher}
                                autorizadoAdministrador={autorizadoAdministrador}
                                ehComputador={ehComputador}
                            />
                        )}


                         {/* CLIENTE */}
                         {dadosToken?.func === 'cliente' && (
                            <MenuSideBarCliente 
                                navegarERecolher={navegarERecolher}
                                dadosUsuarioBanco={dadosUsuarioBanco}
                                ehComputador={ehComputador}
                                exibirBalaoDicaProntuarioPaciente={exibirBalaoDicaProntuarioPaciente}
                            />
                        )}


                    </>
                )}

                {/* ------------------------------------------------- */}
                {/* FIM do - 💻🔩 MENU SIDEBAR PARA COMPUTADOR */}
                {/* ------------------------------------------------- */}

                









                {/* ----------------------------- */}
                {/* INICIO - componente de pagina */}
                {/* ----------------------------- */}

                <div className={`componente-de-pagina 

                    ${ ehComputador && dadosToken?.func !== 'visitante' ? 'com-sidebar' : 'sem-sidebar' }`}

                    style={{ '--largura-dinamica': larguraAtual }}
                    
                >

                    <Routes>






                        {/* -------------------------- */}
                        {/* INICIO - 🌍 Rotas Públicas */}
                        {/* -------------------------- */}

    
                        <Route 
                            path="/" 
                            element={
                                carregandoPermissoesFireBase ? null : 
                                dadosToken?.func && dadosToken?.func !== 'visitante' ? (
                                    <Navigate to="/interno/UsuarioLogado" replace />
                                ) : (
                                    <Inicio />
                                )
                            } 
                        />


                        <Route 
                            path="/sobre" 
                            element={
                                <Sobre 

                                />
                            } 
                        /> 

                        <Route 
                            path="/contato" 
                            element={
                                <Contato 
                                
                                />
                            } 
                        />


                        <Route 
                            path="/logar" 
                            element={
                                <Logar 
                                    socket={socket} 
                                    setExibirBalaoDicaCriarConta={setExibirBalaoDicaCriarConta} 
                                />
                            } 
                        />

                        <Route 
                            path="/Cadastrar" 
                            element={
                                <Cadastrar 
                                    socket={socket} 
                                    setExibirBalaoDicaEntrar={setExibirBalaoDicaEntrar} 
                                />
                            } 
                        />

                        {/* -------------------------- */}
                        {/* FIM - 🌍 Rotas Públicas */}
                        {/* -------------------------- */}
                










                        {/* ----------------------------------------------------------------------- */}
                        {/* INICIO - 🔐 Setor Privativo: Acesso condicionado ao fim do carregamento */}
                        {/* ----------------------------------------------------------------------- */}

                        <Route 
                            path="/interno" 
                            element={
                                dadosToken?.func && dadosToken?.func !== 'visitante' ? (                   
                                    <Outlet  />         
                                ) : (
                                    <Navigate to="/" replace />
                                )
                            } 
                        >


                            {/* 🧭 Rota Index: Evita tela branca ao acessar /interno diretamente */}
                            <Route 
                                index 
                                element={
                                    <Navigate to="UsuarioLogado" replace />
                                } 
                            />


                            {/* 🧱 Controle do Programador dentro do Interno */}
                            <Route 
                                path="PainelMaster" 
                                element={
                                    dadosToken?.func === 'programador' ? (
                                        <PainelMaster />
                                    ) : (
                                        <Navigate to="/interno/UsuarioLogado" replace />
                                    )
                                } 
                            />



                            {/* 🚪 Sub-cômodos (Rotas Filhas de /interno) */}          
                            <Route 
                                path="UsuarioIdentificacao" 
                                element={<UsuarioIdentificacao />} 
                            />


                            <Route 
                                path="UsuarioContato" 
                                element={<UsuarioContato />} 
                            />


                            <Route 
                                path="Endereco" 
                                element={<Endereco />} 
                            />


                            <Route 
                                path="Cnpj" 
                                element={<Cnpj />} 
                            />


                            <Route 
                                path="UsuarioFormacao" 
                                element={<UsuarioFormacao />} 
                            />


                            <Route 
                                path="Formacao" 
                                element={<Formacao />} 
                            />


                            <Route 
                                path="Funcoes" 
                                element={<Funcoes />} 
                            />


                            <Route 
                                path="UsuarioReferencias" 
                                element={<UsuarioReferencias />} 
                            />


                            <Route 
                                path="CadAdministrador" 
                                element={<CadAdministrador />} 
                            />


                            <Route 
                                path="diretrizes" 
                                element={<Diretrizes />} 
                            />


                            <Route 
                                path="Chamados" 
                                element={<Chamados />} 
                            />


                            <Route 
                                path="RelClientes" 
                                element={<RelClientes />} 
                            />


                            <Route 
                                path="RelCuidadoras" 
                                element={<RelCuidadoras />} 
                            />


                            <Route 
                                path="ProgramadorRelatorioCliente" 
                                element={<ProgramadorRelatorioCliente />} 
                            />


                            <Route 
                                path="RelSolicitacoes" 
                                element={<RelSolicitacoes />} 
                            />
                            

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


                
                            <Route 
                                path="UsuarioLogado" 
                                element={
                                    <UsuarioLogado 
                                        setModalCompletarCadastro={setModalCompletarCadastro} 
                                        mostrarModalCompletarCadastro={mostrarModalCompletarCadastro}
                                        setModalCadastroCompleto={setModalCadastroCompleto} 
                                        mostrarModalCadastroCompleto={mostrarModalCadastroCompleto}
                                    />
                                } 
                            />







                            {/* 👥 Rota do Relatório de Clientes: Administrador */}
                            <Route 
                                path="/interno/AdministradorRelatorioClientes" 
                                element={<AdministradorRelatorioClientes />} 
                            />



                            {/* -----------------------------------------------------------*/}
                            {/* INICIO - 👩‍⚕️ ROTA DO RELATÓRIO DE CUIDADORAS: ADMINISTRADOR */}
                            {/* ---------------------------------------------------------- */}
                            <Route 
                                path="/interno/AdministradorRelatorioCuidadoras" 
                                element={<AdministradorRelatorioCuidadoras />} 
                            />
                            {/* ----------------------------------------------------- */}
                            {/* FIM - 👩‍⚕️ ROTA DO RELATÓRIO DE CUIDADORAS: ADMINISTRADOR  */}
                            {/* ----------------------------------------------------- */}



                            



                            {/* 🛣️ Definição de rotas para os setores de Pacientes */}
                            
                            <Route path="PacienteIdentificacao" element={<PacienteIdentificacao />} />
                            <Route path="PacienteEndereco" element={<PacienteEndereco />} />
                            <Route path="PacienteRemedio" element={<PacienteCadastroRemedio />} />
                            <Route path="PacienteAlimentacao" element={<PacienteAlimentacao />} />
                            <Route path="PacienteBanho" element={<PacienteBanho />} />
                            <Route path="PacienteEmergencia" element={<PacienteEmergencia />} />
                            
















                            {/* ----------------------------- */}
                            {/* INICIO - 📜 ROTA DO CLIENTE   */}
                            {/* ----------------------------- */}

                            <Route path="ClienteApresentacaoEmpresa"element={<ClienteApresentacaoEmpresa />} />
                            <Route path="ClienteSolicitacao" element={<ClienteSolicitacao />} />

                            <Route 
                                path="ClienteContrato" 
                                element={
                                    <ClienteContrato 
                                        ehComputador={ehComputador} 
                                    />
                                }
                            />
                            
                            {/* ------------------------- */}
                            {/* FIM - 📜 ROTA DO CLIENTE  */}
                            {/* ------------------------- */}
                            






                        </Route>

                        {/* ----------------------------------------------------------------------- */}
                        {/* FIM - 🔐 Setor Privativo: Acesso condicionado ao fim do carregamento */}
                        {/* ----------------------------------------------------------------------- */}





                        {/* 🛡️ Trava de Segurança: Redireciona qualquer rota inexistente para o Início */}
                        <Route path="*" element={<Navigate to="/" />} />





                    </Routes>

                </div>

                {/* ----------------------------- */}
                {/* FIM - componente de pagina */}
                {/* ----------------------------- */}







            </main>

            {/* ---------------------------------------------------- */}
            {/* FIM - MAIN - main-area-principal - ROUTES - ROTAS */}
            {/* ---------------------------------------------------- */}



















        </div> 

        /* -------------------------------------- */
        /* FIM DO - 🛡️ CONTAINER-EXTERNO-BLINDADO */
        /* -------------------------------------- */








    );

    /*  ------------- */
    /*  FIM DO RETURN */
    /*  ------------- */






} 
