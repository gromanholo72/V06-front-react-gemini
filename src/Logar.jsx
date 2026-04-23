
import { useState, useEffect, useRef } from 'react';

import { useNavigate, useLocation} from 'react-router-dom';
import { ref, get } from "firebase/database"; 

import { useAuth, URL_SERVIDOR } from './AutenticacaoContexto.jsx';

import './Logar.css';



export function Logar({ setExibirBalaoDicaCriarConta }) {







    // ----------------------------------------------------
    // INICIO DO - Ferramentas de Trabalho (Hooks)
    // ----------------------------------------------------

    // 🚕 Motorista para navegação
    const navigate = useNavigate();

    // 🧭 Sensor de localização (Teletransporte de dados)
    const location = useLocation(); 

    // 🔑 Suprimentos de Autenticação
    const { 
        logarNoFirebase, 
        setCarregandoModal, 
        db_realtime,
        setDadosToken 
    } = useAuth();

    /* 🧱 Verifica se o usuário veio redirecionado do cadastro com sucesso */
    const veioDoCadastro = location.state?.cadastroSucesso;

    // console.log("");
    // console.log("🔍 -----------------------------------------------------------");
    // console.log("🔍 INSPEÇÃO DE FERRAMENTAS (Hooks Iniciais)");
    // console.log("🔍 componente - Logar.jsx - esta no comeco do - export function");
    // console.log("🔍 Localização Atual  :", location.pathname);
    // console.log("🔍 Veio do Cadastro?  :", veioDoCadastro ? "✅ SIM" : "❌ NÃO");
    // console.log("🔍 Dados no - location.state  :", location.state ? "📦 Recebidos" : "💨 Vazios");
    // if (location.state) {
    //     console.log("🔍 Conteúdo do State  :", location.state);
    // }
    // console.log("🔍 -----------------------------------------------------------");

    // ----------------------------------------------------
    // FIM DO - Ferramentas de Trabalho (Hooks)
    // ----------------------------------------------------














    /*  ---------------------------------------------------------------------- */
    /*  INICIO DA - 🖱️ MONITORAMENTO DE CLIQUES GLOBAIS (Cancelamento de Dicas) */
    /*  ---------------------------------------------------------------------- */

    const deveExibirDicaRef = useRef(false);

    useEffect(() => {
        const cancelarDicaFutura = () => {
             /* 🛑 Se houver clique em qualquer lugar, cancelamos a intenção futura de abrir o balão */
             deveExibirDicaRef.current = false;
             /* 🛑 E garantimos que feche imediatamente se já estiver aberto */
             setExibirBalaoDicaCriarConta(false);
        };
        window.addEventListener('click', cancelarDicaFutura);
        return () => window.removeEventListener('click', cancelarDicaFutura);
    }, [setExibirBalaoDicaCriarConta]);
    
    // ----------------------------------------------------------------------
    // FIM - 🖱️ MONITORAMENTO DE CLIQUES GLOBAIS (Cancelamento de Dicas)
    // ----------------------------------------------------------------------







    // ----------------------------------------------------------------------
    // INICIO - CPF TESTES - SÒ DURANTE DESENVOLVIMENTO - 🎨 PRÉ-LEITURA DO BANCO
    // ----------------------------------------------------------------------

    const [cpfsCadastrados, setCpfsCadastrados] = useState([]);

    useEffect(() => {
        if (!db_realtime) return;

        const verificarUsuariosCadastrados = async () => {

            const usuariosRef = ref(db_realtime, 'usuarios');

            try {

                const snapshot = await get(usuariosRef);

                if (snapshot.exists()) {

                    const listaCpfs = Object.keys(snapshot.val());

                    setCpfsCadastrados(listaCpfs);

                    // console.log("");
                    // console.log("🕵️‍♂️ ------------------------------------");
                    // console.log("🕵️‍♂️ componente - Logar.jsx");
                    // console.log("🕵️‍♂️ Verificando usuários já cadastrados.");
                    // console.log("🕵️‍♂️ Usado no - CPF TESTES");
                    // console.log("🕵️‍♂️ Apenas durante o desenvolvimento");
                    // console.log("🕵️‍♂️ Cadastrados encontrados:", listaCpfs.length);
                    // console.log("🕵️‍♂️ -------------------------------------");

                }
            } catch (error) {

                console.error("❌ Erro ao verificar cadastros:", error);

            }
        };

        verificarUsuariosCadastrados();

    }, [db_realtime]);

    /* 🎨 Função auxiliar para pintar o botão se já estiver cadastrado */
    const getEstiloBotao = (cpfFormatado) => {
        const cpfLimpo = cpfFormatado.replace(/\D/g, "");
        if (cpfsCadastrados.includes(cpfLimpo)) {
            return { backgroundColor: '#c0392b', color: 'white', borderColor: '#a93226' }; // 🔴 Vermelho "Alerta"
        }
        return {};
    
    };

    // ----------------------------------------------------------------------
    // FIM - CPF TESTES - SÒ DURANTE DESENVOLVIMENTO - 🎨 PRÉ-LEITURA DO BANCO
    // ----------------------------------------------------------------------









    /*  ---------------------------------------------------------------------- */
    /* INICIO DA - �🗂️ 🚨 GAVETA DE ALERTA: Para mostrar o erro na <div className="MsgForm"> */
    /*  ---------------------------------------------------------------------- */

    const timerGavetaRef = useRef(null);
    const [msgVisivel, setMsgVisivel] = useState(false);
    const [msgErro, setMsgErro] = useState("");
    const [tipoMsg, setTipoMsg] = useState("erro");

    const dispararMensagem = (texto, deveRedirecionar = false, dadoExtra = null, tipo = "erro") => {

        console.log("");
        console.log("🔫 ----------------------------------");
        console.log("🔫 const dispararMensagem ");
        console.log("🔫 Componente - Logar.jsx");
        console.log("🔫 📝 Texto =", texto);
        console.log("🔫 🚀 deveRedirecionar =", deveRedirecionar);
        console.log("🔫 🎟️ dadoExtra =", dadoExtra);
        console.log("🔫 🎨 Tipo =", tipo);
        console.log("🔫 ----------------------------------");

        /* A dica pode aparecer, a menos que um clique ocorra. */
        deveExibirDicaRef.current = true;

        /* Se já existir um timer rodando, nós o cancelamos usando o .current */
        if (timerGavetaRef.current) {
            console.log("🧹 Limpando timer anterior...");
            clearTimeout(timerGavetaRef.current);
        }

        // Segura 500 ms para ficar aparecendo o modalCarregando
        setTimeout(() => {

            // 🔓 Desliga o modal de carregamento
            setCarregandoModal(false);

            // 📝 Prepara a mensagem
            setTipoMsg(tipo);
            setMsgErro(texto);
            setMsgVisivel(true);


            // 🚀 Rolar para o topo para garantir que o usuário veja a mensagem
            window.scrollTo({ top: 0, behavior: 'smooth' });

            // Timer para ESCONDER a mensagem após 4 segundos
            timerGavetaRef.current = setTimeout(() => {
                
                setMsgVisivel(false);

                // Espera a animação de descida da gaveta terminar (1s) para limpar e navegar
                setTimeout(() => {

                    setMsgErro("");

                    if (texto === "Usuário não cadastrado." && deveExibirDicaRef.current) {
                        console.log("🔫 🎈 Condição atendida: Disparando Balão de Dica (Criar Conta)");
                        setExibirBalaoDicaCriarConta(true);
                    }

                    // ✈️ Se houver ordem de redirecionamento (Sucesso)
                    if (deveRedirecionar) {
                        console.log("✈️ 🚀 Navegando para /interno...");
                        navigate('/interno', {
                            state: { 
                                cadastroSucesso: true,
                                cpfVindoDoCadastro: dadoExtra
                            } 
                        });
                    }

                    

                }, 1000);

            }, 3000);

        }, 500);

    };

    // ----------------------------------------------------------------------
    // FIM DA - 🗂️ 🚨 GAVETA DE ALERTA: Para mostrar o erro na <div className="MsgForm">
    // ----------------------------------------------------------------------







    //  --------------------------------------------------------------
    //  INICIO DO  - BLOCO PREENCIAMENTO E MONITORAMENTO DE FORMULARIO LOGAR
    //  --------------------------------------------------------------

    const [credenciais, setCredenciais] = useState(() => {

        const valorInicial = {
            cpef: "",
            senh: ""
        };

        // console.log("");
        // console.log("📐 ----------------------------------");
        // console.log("📐 useState() - componente - 🏛️ Logar.jsx");
        // console.log("📐 Lazy Initialization - 📝 credenciais");
        // console.log("📐 📝 credenciais nasceu como = ", valorInicial);
        // console.log("📐 ----------------------------------");

        return valorInicial;
    });

    // ✨ Dispara sempre que as 'credenciais' mudarem de fato
    useEffect(() => {

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ useEffect() - componente - 🏛️ Logar.jsx");
        // console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 📝 credenciais = ", credenciais);
        // console.log("✨ ----------------------------------");
    
    }, [credenciais]);

    //  --------------------------------------------------------------
    //  FIM DO  - BLOCO PREENCIAMENTO E MONITORAMENTO DE FORMULARIO LOGAR
    //  --------------------------------------------------------------









    // ---------------------------------------------------------------------------
    // INICIO DO - CpefTextes - facilitar preenchimento - sai da versao de producao
    // ---------------------------------------------------------------------------

    const preencherCampos = (dadosVindosDoForm) => {

        // console.log("");
        // console.log("📇 ----------------------------------");
        // console.log("📇 componente - 🧿 App.jsx");
        // console.log("📇 preencherCampos = (dados vindo do CpefTextes)");
        // console.log("📇 essa funcao pertence a CpefTextes e na");
        // console.log("📇 na producao será substituida pelo");
        // console.log("📇 preenchimento dos inputs pelo usuario");
        // console.log("📇 👍 Dados preenchidos no Form:", dadosVindosDoForm);
        // console.log("📇 ----------------------------------");
        // console.log("📇 COMANDOS EXECUTADOS AQUI");
        // console.log("📇 setCredenciais(dadosVindosDoForm.cpef)");
        // console.log("📇 setCredenciais(dadosVindosDoForm.senh)");
        // console.log("📇 ----------------------------------");

        setCredenciais({
            cpef: dadosVindosDoForm.cpef,
            senh: dadosVindosDoForm.senh
        });

    };

    // ---------------------------------------------------------------------------
    // FIM DO - CpefTextes - facilitar preenchimento - sai da versao de producao
    // ---------------------------------------------------------------------------










    // ----------------------------------------------------
    // INICIO DO - Monitora digitação em tempo real
    // ----------------------------------------------------

    const handleChange = (e) => {

        const { name, value } = e.target;

        setCredenciais(prev => ({ ...prev, [name]: value }));

    };

    // ----------------------------------------------------
    // FIM DO - Monitora digitação em tempo real
    // ----------------------------------------------------










    // ----------------------------------------------------
    // INICIO DO - Recebe CPF vindo do Cadastro
    // ----------------------------------------------------

    useEffect(() => {

        if (location.state?.cpfVindoDoCadastro) {

            // console.log("");
            // console.log("✨ ----------------------------------");
            // console.log("✨ useEffect() - componente -  Logar.jsx");
            // console.log("✨ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
            // console.log("✨ 🕶️ location.state = ", location.state);
            // console.log("✨ 🕶️ ----------------------------------");
            // console.log("✨ 🕶️ 📦 CPF recebido do cadastro:", location.state.cpfVindoDoCadastro);
            // console.log("✨ 🕶️ ----------------------------------");
            
            setCredenciais(prev => ({

                ...prev,
                cpef: location.state.cpfVindoDoCadastro

            }));

        }

    }, [location.state]);

    // ----------------------------------------------------
    // FIM DO - Recebe CPF vindo do Cadastro
    // ----------------------------------------------------






    // ----------------------------------------------------------------------------------------
    // INICIO - 🕵️‍♂️ VIGIA CONSTANTE DO FORM LOGIN : Mostra o estado toda vez que ele é alterado
    // ----------------------------------------------------------------------------------------

    useEffect(() => {

        // console.log("");
        // console.log("-----------------------------------------");
        // console.log("🔍 [DADOS DO LOGIN] Estado atual:");
        // console.log("🔍 Logar.jsx - useEffect");
        // console.log("🔍 variavel credenciais = :", credenciais);
        // console.log("-----------------------------------------");

    }, [credenciais]);

    // ----------------------------------------------------------------------------------------
    // FIM - 🕵️‍♂️ VIGIA CONSTANTE DO FORM LOGIN : Mostra o estado toda vez que ele é alterado
    // ----------------------------------------------------------------------------------------










    // ----------------------------------------------------
    // INICIO DO - Enviar dados de login para o servidor
    // ----------------------------------------------------

    const enviarDadosLoginParaServidor = async (e) => {

        if (e) e.preventDefault(); 

        const cpfLimpo = credenciais.cpef.replace(/\D/g, "");

        if (!validarCPF(credenciais.cpef)) {
            dispararMensagem("O CPF informado é inválido. Por favor, confira os números.");
            return;
        }

        setCarregandoModal(true);
        setMsgVisivel(false);

        try {
            // 🔍 1. Localização do Morador na Antena Central (Firebase)
            const usuarioRef = ref(db_realtime, `usuarios/${cpfLimpo}`);
            
            // ⏳ UX: Pequeno delay para simular processamento e manter o modal visível (Padrão Maestro)
            const tempoMinimo = new Promise(resolve => setTimeout(resolve, 800));
            const buscaBanco = get(usuarioRef);

            const [snapshot] = await Promise.all([buscaBanco, tempoMinimo]);

            console.log("");
            console.log("🔄 📡 ----------------------------------");
            console.log("🔄 📡 Logar.jsx");
            console.log("🔄 📡 PROTOCOLO DE LOGIN DIRETO FIREBASE");
            console.log("🔄 📡 CPF Alvo:", cpfLimpo);
            console.log("🔄 📡 ----------------------------------");

            if (snapshot.exists()) {
                
                const dadosUsuario = snapshot.val();
                const senhaNoBanco = dadosUsuario.dadosSeguranca?.senh;

                //  2. Conferência de Chave (Senha)
                if (senhaNoBanco === credenciais.senh) {
                    
                    console.log("");
                    console.log("✅ ----------------------------------");
                    console.log("✅ ACESSO CONCEDIDO: Credenciais Válidas.");
                    console.log("✅ Usuário:", dadosUsuario.dadosBasico?.nome);
                    console.log("✅ Função :", dadosUsuario.dadosBasico?.func);
                    console.log("✅ ----------------------------------");

                    // 🎟️ Atualiza o crachá no contexto global (Injeção Direta)
                    setDadosToken({
                        cpef: dadosUsuario.dadosBasico.cpef,
                        nome: dadosUsuario.dadosBasico.nome,
                        func: dadosUsuario.dadosBasico.func
                    });

                    setCarregandoModal(false);
                    navigate('/interno/UsuarioLogado');

                } else {

                    console.warn("❌ ----------------------------------");
                    console.warn("❌ ACESSO NEGADO: Senha Incorreta.");
                    console.warn("❌ ----------------------------------");
                    
                    setTimeout(() => {
                        dispararMensagem("Senha incorreta. Por favor, tente novamente.");
                    }, 200);
                }
                
            } else {
                
                console.warn("❌ ----------------------------------");
                console.warn("❌ ACESSO NEGADO: CPF não encontrado.");
                console.warn("❌ ----------------------------------");
                
                setTimeout(() => {
                    dispararMensagem("Usuário não cadastrado.");
                }, 200);
            }

        } catch (error) {
            console.log("");
            console.error("🚨 -----------------------------------------------------------");
            console.error("🚨 ERRO CRÍTICO NA CONEXÃO FIREBASE:", error.message);
            console.error("🚨 -----------------------------------------------------------");

            setTimeout(() => {
                dispararMensagem("Erro de conexão com o servidor.");
            }, 500);
        } 
    };










    // ----------------------------------------------------
    // FIM DO - Enviar dados de login para o servidor
    // ----------------------------------------------------










    /*  ----------------- */
    /*  INICIO - Mascaras */
    /*  ----------------- */

    const mascaraCpef = (e) => {
        // 🧱 Passo 1: Limpeza (Remove tudo o que não é número)
        let v = e.target.value.replace(/\D/g, '');
    
        // 🧱 Passo 2: Corte (CPF tem 11 números)
        if (v.length > 11) v = v.substring(0, 11);
    
        // 🧱 Passo 3: Assentamento (Padrão 000.000.000-00)
        v = v.replace(/(\d{3})(\d)/, '$1.$2');       
        v = v.replace(/(\d{3})(\d)/, '$1.$2');       
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
    
        // 📐 🎫 console.log("📐 👔 cpef formatado = ", v);
    
        // 🧱 Passo 4: Atualiza o Objeto CORRETO (credenciais)
        setCredenciais({
            ...credenciais, // ⬅️ Mantém o que já existia (ex: senha)
            cpef: v        // ⬅️ Atualiza apenas o CPF
        });
    };

    const validarCPF = (cpf) => {

        // 🧱 Passo 1: Limpeza total
        const cpfLimpo = cpf.replace(/\D/g, '');
    
        // 🧱 Passo 2: Bloqueio de sequências óbvias (111.111.111-11, etc.)
        if (cpfLimpo.length !== 11 || !!cpfLimpo.match(/(\d)\1{10}/)) return false;
    
        // 🧱 Passo 3: Cálculo do 1º Dígito Verificador
        let soma = 0;
        for (let i = 1; i <= 9; i++) soma = soma + parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
        let resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;
    
        // 🧱 Passo 4: Cálculo do 2º Dígito Verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) soma = soma + parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
        resto = (soma * 10) % 11;
        if ((resto === 10) || (resto === 11)) resto = 0;
        if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;
    
        return true; // 🏆 CPF Válido!
    };

    /*  ----------------- */
    /*  FIM - Mascaras */
    /*  ----------------- */









    /*  --------------------------- */
    /*  INICIO DO RETURN - Retorno  */
    /*  ----------------------------*/

    return (
        
        <>


        <div className="Card-Logar-Tudo">

            {/* -------------------------- */}
            {/* INICIO - 📋 CARD CADASTRAR */}
            {/* -------------------------- */}

            <div className="Card-Logar">

                {/* ------------------------------ */}
                {/* INICIO DO - FORM LOGIN TUDO */}
                {/* ------------------------------ */}

                <div className="LoginTudo-Login">
        



                    {/* <div className="info-gaveta">
                        <div>
                            <p>📡 Monitorando da gaveta - credenciais:</p>
                            <div><span>👔 cpef: </span> <strong>{credenciais.cpef}</strong></div>
                            <div><span>🔑 senh: </span> <strong>{credenciais.senh}</strong></div>
                        </div>
                    </div> */}




                    <div className={`MsgForm-Login ${msgVisivel ? 'ativo-Login' : ''} ${tipoMsg}`}>
                        <span className="alerta-erro-Login">
                                <> ⚠️ {msgErro} </>
                        </span>
                    </div>




                    {/* ------------------------------ */}
                    {/* INICIO DO - FORM LOGIN - className="LoginForm-Login" */}
                    {/* ------------------------------ */}

                    <form className="LoginForm-Login" onSubmit={enviarDadosLoginParaServidor}>  

                        <h3>LOGIN</h3>

                        <img src="imagens/login.jpg" alt="Login" />

                        <div className="InputLarguraTotal-Login">
                            <label>CPF:</label>
                            <input 
                                type="text" 
                                name="cpef" 
                                value={credenciais.cpef}
                                onChange={mascaraCpef} 
                                autoComplete="username"
                                placeholder="Digite seu CPF"
                                maxLength="14"
                                required 
                            /> 
                        </div>

                        <div className="InputLarguraTotal-Login">
                            <label>Senha:</label>
                            <input 
                                type="password" 
                                className={`${veioDoCadastro ? 'input-pulsar-Login' : ''}`}
                                name="senh" 
                                value={credenciais.senh}
                                placeholder="Digite sua senha"
                                autoComplete="current-password"
                                onChange={handleChange} 
                                required 
                            />
                        </div>

                        {/* 🛑 O onClick abaixo impede que este clique chegue na window e feche a dica que vai nascer */}
                        <button 
                            type="submit" 
                            className="BotaoPadraoLogin-Login"
                            onClick={(e) => e.stopPropagation()} 
                        >
                            Entrar
                        </button>

                        <div className="CampoLink-Login"> 
                            <button type="button" id="BotaoLinkEsqueci-Login">Esqueci a senha</button>  
                        </div>  

                    </form> 

                    {/* ------------------------------ */}
                    {/* FIM DO - FORM LOGIN - className="LoginForm-Login" */}
                    {/* ------------------------------ */}






                </div> 

                {/* ------------------------------ */}
                {/* FIM DO - FORM LOGIN TUDO */}
                {/* ------------------------------ */}
            
    
            </div>

            {/* -------------------------- */}
            {/* FIM - 📋 CARD CADASTRAR */}
            {/* -------------------------- */}




        </div>



        

        {/* ------------------------------ */}
        {/* INICIO DO - className="CpefTextes-Login"> */}
        {/* ------------------------------ */}

        <div className="CpefTextes-Login">


            {/* 🛠️ LINHA 1: PROGRAMADOR */}
            <div className="Linha-Botoes-Teste-Login Linha-Prog-Login">
                <h4 className="Rotulo-Teste-Login">Programador</h4>
                <input type="button" className="Botao-Teste-Login" value="GIULIANO" 
                    style={getEstiloBotao("121.149.148-01")}
                    onClick={() => preencherCampos({
                        cpef: "121.149.148-01",
                        senh: "Olhoquetudove@7"
                    })}
                /> 
            </div>


            {/* 🛡️ LINHA 2: ADMINISTRADORES */}
            <div className="Linha-Botoes-Teste-Login Linha-Admin-Login">


                <h4 className="Rotulo-Teste-Login">Administrador</h4>
                <input type="button" className="Botao-Teste-Login" value="ANDRESSA" 
                    style={getEstiloBotao("663.745.531-87")}
                    onClick={() => preencherCampos({
                        cpef: "663.745.531-87",
                        senh: "123"
                    })}
                />

                <input type="button" className="Botao-Teste-Login" value="JOÃO VICTOR" 
                    style={getEstiloBotao("505.842.550-55")}
                    onClick={() => preencherCampos({
                        cpef: "505.842.550-55",
                        senh: "123"
                    })}
                />


            </div>



            {/* 👩‍⚕️ LINHA 3: CUIDADORAS */}
            <div className="Linha-Botoes-Teste-Login Linha-Cuida-Login">


                <h4 className="Rotulo-Teste-Login">Cuidadoras</h4>
                <input type="button" className="Botao-Teste-Login" value="JOANA" 
                    style={getEstiloBotao("103.646.340-06")}
                    onClick={() => preencherCampos({
                        cpef: "103.646.340-06",
                        senh: "1"
                    })}/> 

                <input type="button" className="Botao-Teste-Login" value="PAULA" 
                    style={getEstiloBotao("293.348.470-69")}
                    onClick={() => preencherCampos({ 
                        cpef: "293.348.470-69",
                        senh: "12"
                    })}/>

                <input type="button" className="Botao-Teste-Login" value="MARIA" 
                    style={getEstiloBotao("519.310.058-93")}
                    onClick={() => preencherCampos({
                        cpef: "519.310.058-93",
                        senh: "123"
                    })}/>

                <input type="button" className="Botao-Teste-Login" value="ISABEL" 
                    style={getEstiloBotao("200.335.920-63")}
                    onClick={() => preencherCampos({ 
                        cpef: "200.335.920-63",
                        senh: "123"
                    })}/>

                <input type="button" className="Botao-Teste-Login" value="ANA" 
                    style={getEstiloBotao("123.456.789-09")}
                    onClick={() => preencherCampos({ 
                        cpef: "123.456.789-09",
                        senh: "123"
                    })}/>


            </div>


            {/* 🏠 LINHA 4: CLIENTES */}
            <div className="Linha-Botoes-Teste-Login Linha-Cliente-Login">
                <h4 className="Rotulo-Teste-Login">Clientes</h4>
                <input type="button" className="Botao-Teste-Login" value="BEATRIZ" 
                    style={getEstiloBotao("060.915.660-83")}
                    onClick={() => preencherCampos({
                        cpef: "060.915.660-83",
                        senh: "12345"
                    })}/> 

                <input type="button" className="Botao-Teste-Login" value="LUCIANA" 
                    style={getEstiloBotao("763.626.770-56")}
                    onClick={() => preencherCampos({
                        cpef: "763.626.770-56",
                        senh: "12345"
                    })}/> 

                <input type="button" className="Botao-Teste-Login" value="MARCO" 
                    style={getEstiloBotao("844.450.750-43")}
                    onClick={() => preencherCampos({    
                        cpef: "844.450.750-43",
                        senh: "12345"
                    })}/> 

                <input type="button" className="Botao-Teste-Login" value="PEDRO" 
                    style={getEstiloBotao("004.838.240-03")}
                    onClick={() => preencherCampos({
                        cpef: "004.838.240-03",
                        senh: "12345"
                    })}/>

                <input type="button" className="Botao-Teste-Login" value="CARLA" 
                    style={getEstiloBotao("342.297.530-63")}
                    onClick={() => preencherCampos({
                        cpef: "342.297.530-63",
                        senh: "12345"
                    })}/>

                <input type="button" className="Botao-Teste-Login" value="ROBERTO" 
                    style={getEstiloBotao("236.326.400-25")}
                    onClick={() => preencherCampos({
                        cpef: "236.326.400-25",
                        senh: "123"
                    })}/>

                <input type="button" className="Botao-Teste-Login" value="SANDRA" 
                    style={getEstiloBotao("765.316.010-78")}
                    onClick={() => preencherCampos({
                        cpef: "765.316.010-78",
                        senh: "1111"
                    })}/>
            </div>


            {/* 🎧 LINHA 2.5: ATENDENTES */}
            <div className="Linha-Botoes-Teste-Login Linha-Atendente-Login">
                <h4 className="Rotulo-Teste-Login">Atendentes</h4>
                <input type="button" className="Botao-Teste-Login" value="FERNANDA" 
                    style={getEstiloBotao("875.673.130-22")}
                    onClick={() => preencherCampos({
                        cpef: "875.673.130-22",
                        senh: "123"
                    })}
                />

                <input type="button" className="Botao-Teste-Login" value="CARLOS" 
                    style={getEstiloBotao("943.757.760-99")}
                    onClick={() => preencherCampos({
                        cpef: "943.757.760-99",
                        senh: "123"
                    })}
                />
            </div>



        </div> 

        {/* ------------------------------ */}
        {/* FIM DO - className="CpefTextes-Login"> */}
        {/* ------------------------------ */}





        </>

    ); 

    /*  ----------------------- */
    /*  FIM DO RETURN - Retorno */
    /*  ----------------------- */




}