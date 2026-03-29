
import { useState, useEffect, useRef, useCallback } from 'react'; 
import { Routes, Route, useNavigate, Navigate, Outlet } from 'react-router-dom'; // 🧱 Importando Outlet
import { ref, get, set, push, serverTimestamp, onValue, update } from 'firebase/database'; // Importe do Firebase RTDB
import { db_realtime } from './firebaseConfig';
import { useAuth } from './AutenticacaoContexto';


import './App.css';
// import './Logado.css'; // 🧱 Importando o CSS do layout diretamente


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



import { AdministradorRelatorioClientes } from './AdministradorRelatorioClientes';
import { AdministradorRelatorioCuidadoras } from './AdministradorRelatorioCuidadoras';
import { ClienteContrato } from './ClienteContrato';



import { RelClientes } from './RelClientes';
import { RelCuidadoras } from './RelCuidadoras';
import { RelSolicitacoes } from './RelSolicitacoes';


/* // 🛠️ Importação dos novos componentes de cards de pacientes */
import { PacienteApresentacaoEmpresa } from './PacienteApresentacaoEmpresa';
import { PacienteIdentificacao } from './PacienteIdentificacao';
import { PacienteEndereco } from './PacienteEndereco';
import { PacienteCadastroRemedio } from './PacienteCadastroRemedio';
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
    /* INICIO - 🛠️ VIGILÂNCIA DE PREENCHIMENTO DOS CARDS - CLIENTE */
    // -------------------------------------------------------------

    const [statusAdministrador, setStatusAdministrador] = useState({
        contato: false,
        endereco: false
    });

    /* 🔍 Monitor de Status Administrador */
    useEffect(() => {

        // console.log("");
        // console.log("🔍 -------------------------------------");
        // console.log("🔍 INSPEÇÃO DE STATUS ADMINISTRADOR");
        // console.log("🔍 contato  :", statusAdministrador.contato);
        // console.log("🔍 endereco :", statusAdministrador.endereco);
        // console.log("🔍 -------------------------------------");

    }, [statusAdministrador]);
  
    const [statusCuidadora, setStatusCuidadora] = useState({
        contato: false,
        endereco: false,
        cnpj: false,
        formacao: false
    });

    // 📐 ESTADO MAESTRO: Autorização Global da Cuidadora
    const [autorizadoAdministrador, setAutorizadoAdministrador] = useState(false);
















    /* 🔍 Monitor de Status Cuidadora */
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

    const [statusCliente, setStatusCliente] = useState({
        contato: false,
        endereco: false
    });

    /* 🔍 Monitor de Status Cliente */
    useEffect(() => {

        // console.log("");
        // console.log("🔍 -------------------------------------");
        // console.log("🔍 INSPEÇÃO DE STATUS CLIENTE");
        // console.log("🔍 contato  :", statusCliente.contato);
        // console.log("🔍 endereco :", statusCliente.endereco);
        // console.log("🔍 -------------------------------------");

    }, [statusCliente]);

    /* // 🧱 Nova Lógica: Busca direta no RTDB baseada no CPF do Token (Tempo Real) */
    useEffect(() => {

        // 3️⃣ Verificação de Segurança usando o CPF do Token
        // 🛡️ A trava de segurança agora vive dentro da função que é chamada
        if (!dadosToken?.cpef) {

            // console.log("🔍 🚨 -----------------------------------------------------------");
            // console.log("🔍 🚨 VIGILÂNCIA DE BANCO DE DADOS:");
            // console.log("🔍 🚨 useEffect() - componente - 🧿 App.jsx");
            // console.log("🔍 🚨 Vigilância de integridade: Nenhum CPF detectado no token. Resetando status.");


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

        
        const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
       
        const usuarioRef = ref(db_realtime, `usuarios/${cpfLimpo}`);

        const unsubscribe = onValue(usuarioRef, (snapshot) => {
            
            if (snapshot.exists()) {
                
                const dadosUsuario = snapshot.val();


                // --- INICIO DA ANÁLISE DE INTEGRIDADE (Validações) ---

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

                // --- FIM DA ANÁLISE DE INTEGRIDADE ---




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

            console.log("🔍 🔴 ✨ Encerrando escuta do Realtime Database (Clean-up).");
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

    /* 🔍 Monitor: Status CLIENTE (Vigilância Maestro) */
    useEffect(() => {
        // 🛡️ TRAVA DE PERFIL: Só executa se o usuário logado for cliente
        if (dadosToken?.func !== 'cliente') return;

        const cpfLimpo = dadosToken?.cpef?.replace(/\D/g, "");

        // console.log("");
        // console.log("🔍 -----------------------------------------------------------");
        // console.log("🔍 MONITOR CLIENTE: Ativado para Perfil Cliente");
        // console.log("🔍 Status Local (Vite)  :", perfilEstaCompletoCliente ? "✅ Completo" : "❌ Incompleto");

        if (!cpfLimpo) {
            console.log("🔍 🛡️ TRAVA: CPF ausente. Abortando.");
            console.log("🔍 -----------------------------------------------------------");
            return;
        }

        const atualizarStatusCliente = async () => {
            try {
                const statusRef = ref(db_realtime, `usuarios/${cpfLimpo}/dadosInterno/dadosUsuarioCompleto`);
                const snapshot = await get(statusRef);
                const statusNoBanco = snapshot.val();

                if (perfilEstaCompletoCliente && statusNoBanco !== true) {
                    await set(statusRef, true);
                    console.log("📐 🚀 LOG: Gravando 'true' no perfil do Cliente.");
                } 
                else if (!perfilEstaCompletoCliente && statusNoBanco === true) {
                    await set(statusRef, false);
                    console.log("📐 ⚠️ LOG: Perfil Cliente REGREDIU.");
                } else {
                    console.log("🔍 ✨ LOG: Sincronia de Cliente OK.");
                }
            } catch (error) {
                console.error("❌ 📐 Erro no monitor do Cliente:", error);
            }
            console.log("🔍 -----------------------------------------------------------");
        };

        atualizarStatusCliente();
    }, [perfilEstaCompletoCliente, dadosToken?.func]);

    /* 🔍 Monitor: Status CUIDADORA (Vigilância Maestro) */
    // useEffect(() => {
    
    //     if (dadosToken?.func !== 'cuidadora') return;

    //     const cpfLimpo = dadosToken?.cpef?.replace(/\D/g, "");
        
    //     console.log("");
    //     console.log("🔍 -----------------------------------------------------------");
    //     console.log("🔍 App.jsx: Ativado para Perfil Cuidadora");

    //     console.log("🔍 cpfLimpo  :", cpfLimpo );
    //     console.log("🔍 perfilEstaCompletoCuidadora  :", perfilEstaCompletoCuidadora );

    //     if (!cpfLimpo) {
    //         console.log("🔍 🛡️ TRAVA: CPF ausente. Abortando.");
    //         console.log("🔍 -----------------------------------------------------------");
    //         return;
    //     }

    //     const atualizarStatusCuidadora = async () => {

    //         try {

    //             const statusRef = ref(db_realtime, `usuarios/${cpfLimpo}/dadosInterno/dadosUsuarioCompleto`);
    //             const snapshot = await get(statusRef);
    //             const statusNoBanco = snapshot.val();

    //             console.log("🔍 statusNoBanco :", snapshot.val() );

    //             if (perfilEstaCompletoCuidadora && statusNoBanco !== true) {

    //                 await set(statusRef, true);
    //                 console.log("📐 🚀 LOG: Gravando 'true' no perfil da Cuidadora.");

    //             } 
    //             else if (!perfilEstaCompletoCuidadora && statusNoBanco === true) {

    //                 await set(statusRef, false);
    //                 console.log("📐 ⚠️ LOG: Perfil Cuidadora REGREDIU.");

    //             } else {

    //                 console.log("🔍 ✨ LOG: Sincronia de Cuidadora OK.");

    //             }

    //         } catch (error) {

    //             console.error("❌ 📐 Erro no monitor da Cuidadora:", error);

    //         }

    //         console.log("🔍 -----------------------------------------------------------");

    //     };

    //     atualizarStatusCuidadora();

    // }, [perfilEstaCompletoCuidadora, dadosToken?.func]);


















































    /* 🔍 Monitor: Status CUIDADORA (Vigilância Maestro) */
    useEffect(() => {
    
        if (dadosToken?.func !== 'cuidadora') return;

        const cpfLimpo = dadosToken?.cpef?.replace(/\D/g, "");
        
        // console.log("");
        // console.log("🔍 -----------------------------------------------------------");
        // console.log("🔍 App.jsx: Ativado para Perfil Cuidadora");
        // console.log("🔍 cpfLimpo  :", cpfLimpo );
        // console.log("🔍 perfilEstaCompletoCuidadora  :", perfilEstaCompletoCuidadora );

        if (!cpfLimpo) {
            console.log("🔍 🛡️ TRAVA: CPF ausente. Abortando.");
            console.log("🔍 -----------------------------------------------------------");
            return;
        }

        const atualizarStatusCuidadora = async () => {

            try {

                // 📐 Referência ao nó de cadastro para atualização múltipla
                const cadastroRef = ref(db_realtime, `usuarios/${cpfLimpo}/dadosCadastro`);
                const snapshot = await get(cadastroRef);
                const dadosAtuais = snapshot.val() || {};

                // console.log("🔍 Status Atual no Banco:", dadosAtuais.dadosUsuarioCompleto);

                if (perfilEstaCompletoCuidadora && dadosAtuais.dadosUsuarioCompleto !== true) {

                    const dataHoje = new Date().toLocaleDateString('pt-BR');

                    await update(cadastroRef, { 
                        perfilCompleto: true,
                        perfilCompletoData: dataHoje // 📅 Salvando a data de preenchimento
                    });

                    // console.log("🔍 dadosUsuarioCompleto:", true);
                    // console.log(`📐 🚀 LOG: Perfil concluído em ${dataHoje}. Sincronizado.`);

                } 
                else if (!perfilEstaCompletoCuidadora && dadosAtuais.dadosUsuarioCompleto === true) {

                    await update(cadastroRef, { 
                        perfilCompleto: false,
                        perfilCompletoData: "" // Limpa a data se o perfil regredir
                    });

                    console.log("📐 ⚠️ LOG: Perfil Cuidadora REGREDIU.");

                } else {

                    // console.log("🔍 ✨ LOG: Sincronia de Cuidadora OK.");

                }

            } catch (error) {

                console.error("❌ 📐 Erro no monitor da Cuidadora:", error);

            }

            // console.log("🔍 -----------------------------------------------------------");

        };

        atualizarStatusCuidadora();

    }, [perfilEstaCompletoCuidadora, dadosToken?.func]);














    /* ------------------------------------------------------------- */
    /* INICIO - 🔍 MONITOR: AUTORIZAÇÃO CUIDADORA (VIGILÂNCIA REALTIME) */
    /* ------------------------------------------------------------- */
    useEffect(() => {
    
        if (dadosToken?.func !== 'cuidadora') return;

        const cpfLimpo = dadosToken?.cpef?.replace(/\D/g, "");
        
        if (!cpfLimpo) {
            setAutorizadoAdministrador(false);
            return;
        }

        // 📐 Protocolo Maestro V3: Monitoramento em Tempo Real do Nó Interno
        const statusRef = ref(db_realtime, `usuarios/${cpfLimpo}/dadosCadastro`);
        
        const unsubscribe = onValue(statusRef, (snapshot) => {
            // 🧱 Blindagem Maestro: Garante que 'dados' seja um objeto mesmo se o nó for null no Firebase
            const dados = snapshot.val() || {};

            console.log("");
            console.log("🔍 🛡️ -----------------------------------------------------------");
            console.log("🔍 🛡️ MONITOR REALTIME: Autorização Admin");
            console.log("🔍 🛡️ Cuidadora:", dadosToken?.nome?.toUpperCase());
            console.log("🔍 🛡️ autorizadoAdministrador:", dados.autorizadoAdministrador || false);
            console.log("🔍 🛡️ -----------------------------------------------------------");

            setAutorizadoAdministrador(!!dados.autorizadoAdministrador);
        });

        return () => unsubscribe(); // 🧹 Cleanup Sagrado

    }, [dadosToken?.cpef, dadosToken?.func]);
    
    /* ------------------------------------------------------------- */
    /* FIM - 🔍 MONITOR: AUTORIZAÇÃO CUIDADORA                       */
    /* ------------------------------------------------------------- */







    // ---------------------------------
    // INICIO - 📐 MONITOR: autorizadoAdministrador (ESTADO MAESTRO)
    // ---------------------------------
    
    useEffect(() => {

        console.log("");
        console.log("✨ 📐 -----------------------------------------------------------");
        console.log("✨ 📐 MONITOR DE ESTADO: autorizadoAdministrador");
        console.log("✨ 📐 Contexto: App.jsx");
        console.log("✨ 📐 Valor Atual:", autorizadoAdministrador);
       
        console.log("✨ 📐 -----------------------------------------------------------");

    }, [autorizadoAdministrador]);

    // ---------------------------------
    // FIM - 📐 MONITOR: autorizadoAdministrador
    // ---------------------------------



















    // -------------------------------------------------------------
    /* FIM - 🛠️ VIGILÂNCIA DE PREENCHIMENTO DOS CARDS - CLIENTE */
    // -------------------------------------------------------------




























    // -------------------------------------------------------------
    /* INICIO DO - MODAL 🔥 FIREBASE */
    // -------------------------------------------------------------

    // SEMPRE MANTER ESSE COMO SENDO O ULTIMO ANTES DO RETURN

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





        /* -------------------------------------- */
        /* INICIO - 🛡️ CONTAINER-EXTERNO-BLINDADO */
        /* -------------------------------------- */

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

                <button className={`btn-menu-base ${exibirBalaoDicaMenuHamburguer ? 'pulsar-ativo' : ''}`}

                    onClick={() => {

                        // 🍔 Verificamos se o menu já está aberto
                        if (menuAberto) {

                            // console.log("");
                            // console.log("📐 ----------------------------------");
                            // console.log("📐 🚀 EVENTO: Clique no botão 'Menu Hambúrguer'");
                            // console.log("📐 🔵 Ação: FECHANDO menu (Toggle Off).");
                            // console.log("📐 ----------------------------------");
                            
                            setMenuAberto(false); // Fecha o container principal
                            setSecaoAberta(null); // Limpa qualquer submenu aberto

                        } else {

                            // console.log("");
                            // console.log("📐 ----------------------------------");
                            // console.log("📐 🚀 EVENTO: Clique no botão 'Menu Hambúrguer'");
                            // console.log("📐 🟢 Ação: ABRINDO menu (Toggle On).");
                            // console.log("📐 ----------------------------------");
                            
                            setMenuAberto(true);
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

                <div className={`submenu-container-geral ${menuAberto ? 'menu-mobile-ativo' : ''}`}
                    ref={menuRef}  
                >



       
                    {dadosToken?.func === 'programador' && (
                        <>


                            {/* -------------------------------------------------------------------------------------------- */}
                            {/* INICIO - ELEMENTOS DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - PROGRAMADOR */}
                            {/* -------------------------------------------------------------------------------------------- */}

                            <div className="menu-horizontal-programador-container">


                                {/* ------------------------------------ */}
                                {/* INICIO - BOTOES COMUNS - PROGRAMADOR */}
                                {/* ------------------------------------ */}

                                <button className="Btn-geral-programador-prof btn-centralizado"
                                    onClick={() => navegarERecolher('/interno/UsuarioLogado')}
                                >
                                    Inicio
                                </button>

                                {/* ------------------------------------ */}
                                {/* FIM - BOTOES COMUNS - PROGRAMADOR */}
                                {/* ------------------------------------ */}



                                {/* ----------------------------------------- */}
                                {/* INICIO - SUBMENU HORIZONTAL - PROGRAMADOR */}
                                {/* ----------------------------------------- */}

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
                                       
                                    </div>
                                </div>

                                {/* ----------------------------------------- */}
                                {/* FIM - SUBMENU HORIZONTAL - PROGRAMADOR */}
                                {/* ----------------------------------------- */}

    
                            </div>

                            {/* -------------------------------------------------------------------------------------------- */}
                            {/* FIM - ELEMENTOS DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - PROGRAMADOR */}
                            {/* -------------------------------------------------------------------------------------------- */}





                            {/* -------------------------------------------------- */}
                            {/* INICIO - 📊 MENU SIDEBAR: PROGRAMADOR - RELATÓRIOS */}
                            {/* -------------------------------------------------- */}

                            <div className="menu-sidebar-programador-container">

                                <div className="menu-sidebar-programador-header">
                                    <div className="menu-sidebar-programador-funcao">
                                        <span className="menu-sidebar-programador-titulo">Relatórios</span>
                                    </div>
                                </div>
                                
                                <div className="menu-sidebar-programador-lista-botoes">

                                    <button 
                                        className="menu-sidebar-programador-btn-item"
                                        onClick={() => navegarERecolher('/interno/RelClientes')}
                                    >
                                        Usuarios-leitura antiga <span className="menu-sidebar-programador-icon">👥</span>
                                    </button>



                                    <button 
                                        className="menu-sidebar-programador-btn-item"
                                        onClick={() => navegarERecolher('/interno/ProgramadorRelatorioCliente')}
                                    >
                                        Usuarios <span className="menu-sidebar-programador-icon">👥</span>
                                    </button>


                                    
                                </div>

                            </div>

                            {/* ----------------------------------------------- */}
                            {/* FIM - 📊 MENU SIDEBAR: PROGRAMADOR - RELATÓRIOS */}
                            {/* ----------------------------------------------- */}




                        </>
                    )}






                    {dadosToken?.func === 'administrador' && (
                        <>


                            {/* -------------------------------------------------------------------------------------------- */}
                            {/* INICIO - ELEMENTOS DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - ADMINISTRADOR */}
                            {/* -------------------------------------------------------------------------------------------- */}

                            <div className="menu-horizontal-administrador-container">

                                {/* -------------------------------------------------------------------------------------------- */}
                                {/* INICIO - BOTOES DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - ADMINISTRADOR */}
                                {/* -------------------------------------------------------------------------------------------- */}

                                <button className="Btn-geral-administrador-prof btn-centralizado"
                                    onClick={() => navegarERecolher('/interno/UsuarioLogado')}
                                >
                                    Inicio
                                </button>

                                <button className="Btn-geral-administrador-prof btn-centralizado"
                                    onClick={() => navegarERecolher('/interno/Funcoes')}
                                >
                                    Funcoes
                                </button>


                                {/* -------------------------------------------------------------------------------------------- */}
                                {/* FIM - BOTOES DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - ADMINISTRADOR */}
                                {/* -------------------------------------------------------------------------------------------- */}

                            </div>

                            {/* -------------------------------------------------------------------------------------------- */}
                            {/* INICIO - ELEMENTOS DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - ADMINISTRADOR */}
                            {/* -------------------------------------------------------------------------------------------- */}

                            


                            {/* --------------------------------------- */}
                            {/* INICIO - MENU SIDEBAR: administrador */}
                            {/* ---------------------------------------- */}

                            <div className="menu-sidebar-administrador-container">

                                <div className="menu-sidebar-administrador-header">
                                    <div className="menu-sidebar-administrador-funcao">
                                        <span className="menu-sidebar-administrador-titulo">Administração</span>
                                    </div>
                                </div>
                                
                                <div className="menu-sidebar-administrador-lista-botoes">
                                    
                                    <button 
                                        className="menu-sidebar-administrador-btn-item"
                                        onClick={() => navegarERecolher('/interno/AdministradorRelatorioClientes')}
                                    >
                                        <span>Clientes</span> <span className="menu-sidebar-administrador-icon">👥</span>
                                    </button>


                                    <button 
                                        className="menu-sidebar-administrador-btn-item"
                                        onClick={() => navegarERecolher('/interno/AdministradorRelatorioCuidadoras')}
                                    >
                                        <span>Cuidadoras</span> <span className="menu-sidebar-administrador-icon">👩‍⚕️</span>
                                    </button>

                                    <button 
                                        className="menu-sidebar-administrador-btn-item"
                                        onClick={() => navegarERecolher('/interno/AdmFinanceiro')}
                                    >
                                        <span>Financeiro</span> <span className="menu-sidebar-administrador-icon">💰</span>
                                    </button>
                                    
                                    <button 
                                        className="menu-sidebar-administrador-btn-item"
                                        onClick={() => navegarERecolher('/interno/AdmConfiguracoes')}
                                    >
                                        <span>Configurações</span> <span className="menu-sidebar-administrador-icon">⚙️</span>
                                    </button>

                                    <button 
                                        className="menu-sidebar-administrador-btn-item"
                                        onClick={() => navegarERecolher('/interno/AdmLogs')}
                                    >
                                        <span>Solicitações</span> <span className="menu-sidebar-administrador-icon">📝</span>
                                    </button>

                                </div>

                            </div>

                            {/* ------------------------------------ */}
                            {/* FIM - MENU SIDEBAR: administrador */}
                            {/* -------------------------------- --- */}




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

                        </>

                    )}


                    



                    {dadosToken?.func === 'cuidadora' && (
                        <>

                            {/* -------------------------------------------------------------------------------------------- */}
                            {/* INICIO - ELEMENTOS DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - CUIDADORA  */}
                            {/* -------------------------------------------------------------------------------------------- */}

                            <div className="menu-horizontal-cuidadora-container">

                                {/* -------------------------------------------------------------------------------------------- */}
                                {/* INICIO - BOTOES DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - CUIDADORA  */}
                                {/* -------------------------------------------------------------------------------------------- */}

                                <button 
                                    className="Btn-geral-cuidadora-prof btn-centralizado"
                                    onClick={() => navegarERecolher('/interno/UsuarioLogado')}
                                >
                                    Inicio
                                </button>



                                <button 
                                    className="Btn-geral-cuidadora-prof btn-centralizado"
                                    onClick={() => navegarERecolher('/interno/Funcoes')}
                                >
                                    Funcoes
                                </button>



                            
                                <button 
                                    className="Btn-geral-cuidadora-prof btn-centralizado"
                                    onClick={() => navegarERecolher('/interno/Diretrizes')}
                                >
                                    Diretrizes
                                </button>



                                <button 
                                    className={`Btn-geral-cuidadora-prof ${perfilEstaCompletoCuidadora ? '' : 'BotaoBloqueado'}`}
                                    onClick={() => perfilEstaCompletoCuidadora && navegarERecolher('/interno/Chamados')}
                                    title={!perfilEstaCompletoCuidadora ? "Complete seu perfil (Contato, Endereço, CNPJ e Formação) para liberar." : "Acessar Chamados"}
                                >
                                    Chamados {!perfilEstaCompletoCuidadora && "🔒"}
                                </button>


                                {/* -------------------------------------------------------------------------------------------- */}
                                {/* FIM - BOTOES DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - CUIDADORA     */}
                                {/* -------------------------------------------------------------------------------------------- */}

                            </div>

                            {/* -------------------------------------------------------------------------------------------- */}
                            {/* FIM - ELEMENTOS DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - CUIDADORA     */}
                            {/* -------------------------------------------------------------------------------------------- */}








                            {/* --------------------------------------------------- */}
                            {/* INICIO - 👩‍⚕️ MENU SIDEBAR: CUIDADORA - EXCLUSIVO */}
                            {/* --------------------------------------------------- */}




                            <div className="menu-sidebar-cuidadora-container">

                                <div className="menu-sidebar-cuidadora-header">
                                    <div className="menu-sidebar-cuidadora-funcao">
                                        <span className="menu-sidebar-cuidadora-titulo">
                                            
                                        {autorizadoAdministrador ? "Área da Cuidadora" : "Área da Cuidadora 🔓"}
                                        
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="menu-sidebar-cuidadora-lista-botoes"
                                style={{
                                    opacity: autorizadoAdministrador ? 1 : 0.5,
                                    pointerEvents: autorizadoAdministrador ? 'auto' : 'none',
                                    filter: autorizadoAdministrador ? 'none' : 'grayscale(1)',
                                    cursor: autorizadoAdministrador ? 'default' : 'not-allowed'
                                }}
                                
                                >
                                    
                                    <button 
                                        className="menu-sidebar-cuidadora-btn-item"
                                        onClick={() => navegarERecolher('/interno/MeusPlantoes')}
                                      
                                    >
                                        Meus Plantões <span className="menu-sidebar-cuidadora-icon">⏰</span>
                                    </button>
                                    
                                    <button 
                                        className="menu-sidebar-cuidadora-btn-item"
                                        onClick={() => navegarERecolher('/interno/EvolucaoPaciente')}
                                    >
                                        Registrar Evolução <span className="menu-sidebar-cuidadora-icon">🩺</span>
                                    </button>
                                    
                                    <button 
                                        className="menu-sidebar-cuidadora-btn-item"
                                        onClick={() => navegarERecolher('/interno/EscalaMensal')}
                                    >
                                        Minha Escala <span className="menu-sidebar-cuidadora-icon">📅</span>
                                    </button>

                                    <button 
                                        className="menu-sidebar-cuidadora-btn-item"
                                        onClick={() => navegarERecolher('/interno/AssumirPlantao')}
                                    >
                                        Assumir Plantão <span className="menu-sidebar-cuidadora-icon">🤝</span>
                                    </button>

                                    <button 
                                        className="menu-sidebar-cuidadora-btn-item menu-sidebar-cuidadora-btn-alerta"
                                        onClick={() => navegarERecolher('/interno/SuporteOperacional')}
                                    >
                                        Suporte / S.O.S <span className="menu-sidebar-cuidadora-icon">🚨</span>
                                    </button>

                                </div>

                            </div>





                            {/* ------------------------------------------------- */}
                            {/* FIM - 👩‍⚕️ MENU SIDEBAR: CUIDADORA - EXCLUSIVO */}
                            {/* ------------------------------------------------- */}











                        </>
                    )}






                    {dadosToken?.func === 'cliente' && (
                        <>




                            {/* -------------------------------------------------------------------------------------------- */}
                            {/* INICIO - ELEMENTOS DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - CLIENTE    */}
                            {/* -------------------------------------------------------------------------------------------- */}

                            <div className="menu-horizontal-cliente-container">

                                {/* -------------------------------------------------------------------------------------------- */}
                                {/* INICIO - BOTOES DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - CLIENTE    */}
                                {/* -------------------------------------------------------------------------------------------- */}

                                <button 
                                    className="Btn-geral-cliente-prof btn-centralizado fonte-diretrizes"
                                    onClick={() => navegarERecolher('/interno/UsuarioLogado')}
                                >
                                    Inicio
                                </button>


                                <button 
                                    className="Btn-geral-cliente-prof btn-centralizado fonte-diretrizes" 
                                    onClick={() => navegarERecolher('/interno/PacienteApresentacaoEmpresa')}
                                >
                                    Empresa
                                </button>

                                <button 
                                    className="Btn-geral-cliente-prof btn-centralizado fonte-diretrizes" 
                                    onClick={() => navegarERecolher('/interno/Diretrizes')}
                                >
                                    Diretrizes
                                </button>


                                <button 
                                    className="Btn-geral-cliente-prof btn-centralizado fonte-diretrizes" 
                                    onClick={() => navegarERecolher('/interno/clienteContrato')}
                                >
                                    Contrato
                                </button>

                                {/* -------------------------------------------------------------------------------------------- */}
                                {/* FIM - BOTOES DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - CLIENTE       */}
                                {/* -------------------------------------------------------------------------------------------- */}

                            </div>

                            {/* -------------------------------------------------------------------------------------------- */}
                            {/* FIM - ELEMENTOS DO MENU HORIZONTAL HERDADO DA DIV - submenu-container-geral  - CLIENTE       */}
                            {/* -------------------------------------------------------------------------------------------- */}

                          



                            {/* ------------------------------- */}
                            {/* INICIO - SIDEBAR FIXA: PACIENTE */}
                            {/* ------------------------------- */}

                            <div className="submenu-tudo-paciente-prof">
                                
                                {/* Título da Seção (Substituiu o antigo Botão Dropdown) */}
                                <h3 className="titulo-setor-sidebar">
                                    Prontuario do Paciente {!perfilEstaCompletoCliente && <span title="Perfil Incompleto"></span>}
                                </h3>

                                
                                <div className="lista-botoes-vertical">
                                    <button 
                                        // className="BotaoBloqueado" 
                                        onClick={() => navegarERecolher('/interno/PacienteIdentificacao')}
                                    >
                                        Identificação
                                    </button>
                                    





                                    <button 
                                        // className="BotaoBloqueado" 
                                        onClick={() => navegarERecolher('/interno/PacienteEndereco')}
                                    >
                                        Endereço
                                    </button>
                                    
                                    <button 
                                        onClick={() => navegarERecolher('/interno/PacienteRemedio')}
                                    >
                                        Medicamentos
                                    </button>
                                    
                                    <button 
                                        // className="BotaoBloqueado" 
                                        onClick={() => navegarERecolher('/interno/PacienteAlimentacao')}
                                    >
                                        Alimentação
                                    </button>
                                    
                                    <button 
                                        // className="BotaoBloqueado" 
                                        onClick={() => navegarERecolher('/interno/PacienteBanho')}
                                    >
                                        Banho
                                    </button>
                                    
                                    <button 
                                        // className="BotaoBloqueado" 
                                        onClick={() => navegarERecolher('/interno/PacienteAcordado')}
                                    >
                                        Acordado
                                    </button>
                                    
                                    <button 
                                        // className="BotaoBloqueado" 
                                        onClick={() => navegarERecolher('/interno/PacienteRecreacao')}
                                    >
                                        Recreação
                                    </button>
                                    
                                    <button 
                                        // className="BotaoBloqueado" 
                                        onClick={() => navegarERecolher('/interno/PacienteEmergencia')}
                                    >
                                        Emergência
                                    </button>
                                </div>
                            </div>

                            {/* ------------------------------- */}
                            {/* INICIO - SIDEBAR FIXA: PACIENTE */}
                            {/* ------------------------------- */}





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
                                    navegarERecolher('/'); 
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
























            {/* ----------------------- */}
            {/* INICIO - ROUTES - ROTAS */}
            {/* ----------------------- */}

            <main className="main-area-principal">

            <div className="header-spacer"></div>

            
                <Routes>



                    {/* -------------------------- */}
                    {/* INICIO - 🌍 Rotas Públicas */}
                    {/* -------------------------- */}

                    <Route 
                        path="/" 
                        element={
                            <Inicio  

                            />
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
                            carregandoModal ? null :
                            dadosToken?.func && dadosToken.func !== 'visitante' ? (                   
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
                                    perfilEstaCompletoAdministrador={perfilEstaCompletoAdministrador} 
                                    perfilEstaCompletoCuidadora={perfilEstaCompletoCuidadora}
                                    perfilEstaCompletoCliente={perfilEstaCompletoCliente} 
                                />
                            } 
                        />



                        {/* 👥 Rota do Relatório de Clientes: Administrador */}
                        <Route 
                        path="/interno/AdministradorRelatorioClientes" 
                        element={<AdministradorRelatorioClientes />} 
                    />



                        {/* -------------------------------------------------------------------------------------------- */}
                        {/* INICIO - 👩‍⚕️ ROTA DO RELATÓRIO DE CUIDADORAS: ADMINISTRADOR                                  */}
                        {/* -------------------------------------------------------------------------------------------- */}
                        <Route 
                            path="/interno/AdministradorRelatorioCuidadoras" 
                            element={<AdministradorRelatorioCuidadoras />} 
                        />
                        {/* -------------------------------------------------------------------------------------------- */}
                        {/* FIM - 👩‍⚕️ ROTA DO RELATÓRIO DE CUIDADORAS: ADMINISTRADOR                                     */}
                        {/* -------------------------------------------------------------------------------------------- */}






                        {/* 🛣️ Definição de rotas para os setores de Pacientes */}
                        <Route path="PacienteApresentacaoEmpresa"element={<PacienteApresentacaoEmpresa />} />
                        <Route path="PacienteIdentificacao" element={<PacienteIdentificacao />} />
                        <Route path="PacienteEndereco" element={<PacienteEndereco />} />
                        <Route path="PacienteRemedio" element={<PacienteCadastroRemedio />} />
                        <Route path="PacienteAlimentacao" element={<PacienteAlimentacao />} />
                        <Route path="PacienteBanho" element={<PacienteBanho />} />
                        <Route path="PacienteEmergencia" element={<PacienteEmergencia />} />
                        <Route path="ClienteSolicitacao" element={<ClienteSolicitacao />} />
















                        {/* ------------------------------------------------------------- */}
                        {/* INICIO - 📜 ROTA: CONTRATO DO CLIENTE                         */}
                        {/* ------------------------------------------------------------- */}
                        <Route 
                            path="clienteContrato" 
                            element={<ClienteContrato />} 
                        />
                        {/* ------------------------------------------------------------- */}
                        {/* FIM - 📜 ROTA: CONTRATO DO CLIENTE                            */}
                        {/* ------------------------------------------------------------- */}
                        






                    </Route>

                    {/* ----------------------------------------------------------------------- */}
                    {/* FIM - 🔐 Setor Privativo: Acesso condicionado ao fim do carregamento */}
                    {/* ----------------------------------------------------------------------- */}





                    {/* 🛡️ Trava de Segurança: Redireciona qualquer rota inexistente para o Início */}
                    <Route path="*" element={<Navigate to="/" />} />





                </Routes>


            </main>

            {/* ----------------------- */}
            {/* FIM - ROUTES - ROTAS */}
            {/* ----------------------- */}






        </div> 

        /* -------------------------------------- */
        /* FIM DO - 🛡️ CONTAINER-EXTERNO-BLINDADO */
        /* -------------------------------------- */





    );

    /*  ------------------------------------- */
    /*  FIM DO RETURN - Retorno da Central: */
    /*  ------------------------------------- */






} 
