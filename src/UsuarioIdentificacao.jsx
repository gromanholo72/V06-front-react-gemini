
import { useState, useEffect } from 'react'; 

import { ref, update, get } from "firebase/database"; 
// import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto';

import './UsuarioIdentificacao.css'; 


export function UsuarioIdentificacao () {



    // const { dadosPublicos } = useAuth();
    const { dadosToken, carregandoPermissoesFireBase } = useAuth();

    
    // 🧰 Ferramentas de Trabalho (Hooks)
    const [nome, setNome] = useState('');
    const [senh, setSenh] = useState('');
    
    const [podeEditar, setPodeEditar] = useState(false);


    const ehProgramador = dadosToken?.func === 'programador';
    const ehAdmin = dadosToken?.func === 'administrador';


    const [nomeSalvoNoBanco, setNomeSalvoNoBanco] = useState("");
    const [senhSalvaNoBanco, setSenhSalvaNoBanco] = useState("");

    
    /* 📂 Ferramenta para gerenciar estados de menu ou seções */
    // const [secaoAberta, setSecaoAberta] = useState(null);











    
    /* 🎫 VISTORIA DOS DADOS DO TOKEN */
    // useEffect(() => {
    //     console.log("");
    //     console.log("✨ 📍 ----------------------------------");
    //     console.log("✨ 📍 useEffect() - Componente - 📍 UsuarioIdentificacao.jsx");
    //     console.log("✨ 📍 🏷️ VARIAVEL MONITORADA: DADOS DO TOKEN");
    //     console.log("✨ 📍 🎫 dadosToken = ", dadosToken);
    //     console.log("✨ 📍 ----------------------------------");
    // }, [dadosToken]);


    /* ⌛ VISTORIA DA TRAVA DE CARREGAMENTO DO FIREBASE*/
    // useEffect(() => {
    //     console.log("");
    //     console.log("✨ 📍 ----------------------------------");
    //     console.log("✨ 📍 useEffect() - Componente - 📍 UsuarioIdentificacao.jsx");
    //     console.log("✨ 📍 🏷️ VARIAVEL MONITORADA: TRAVA DE CARREGAMENTO");
    //     console.log("✨ 📍 ⌛ carregandoPermissoesFireBase = ", carregandoPermissoesFireBase);
    //     console.log("✨ 📍 ----------------------------------");
    // }, [carregandoPermissoesFireBase]);





    
    



















    // --------------------------------------
    // TESTANDO A SEGURANCA NO BANCO DE DADOS
    // --------------------------------------

    // const carregarDadosDoBanco = async () => {

    //     const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");

    //     const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}`);
        
    //     try {

    //         const snapshot = await get(caminhoNoBanco);

    //         if (snapshot.exists()) {

    //             const dados = snapshot.val();

    //             console.log("");
    //             console.warn("📍 ----------------------------------");
    //             console.warn("📍 componente - 📍 UsuarioIdentificacao.jsx");
    //             console.warn("📍 const snapshot = await get(caminhoNoBanco);");
    //             console.warn("📍 📦 TENTANDO LER O BANCO DE DADOS");
    //             console.warn("📍 ✅ Dados recebidos com sucesso:", dados);
    //             console.warn("📍 ----------------------------------");

    //             setNome(dados.nome || '');
    //             setSenh(dados.senh || '');
              
    //             /* 🏛️ Registra o que já está salvo oficialmente */
    //             setNomeSalvoNoBanco(dados.nome || ''); 
    //             setSenhSalvaNoBanco(dados.senh || '');

    //             setPodeEditar(false);

    //         } else {

    //             console.log("");
    //             console.warn("📍 ----------------------------------");
    //             console.warn("📍 componente - 📍 UsuarioIdentificacao.jsx");
    //             console.warn("📍 O usuário existe no Login, mas não possui dados na pasta 'usuarios' do Realtime.");
    //             console.warn("📍 ----------------------------------");

    //         }

    //     } catch (error) {

    //         console.log("");
    //         console.error("📍 ----------------------------------");
    //         console.error("📍 componente - 📍 UsuarioIdentificacao.jsx");
    //         console.error("📍 const carregarDadosDoBanco = async () => {");
    //         console.error("📍 cpfLimpo = ", cpfLimpo);
    //         console.error("📍 ❌ Erro ao buscar dados no fire Base:", error);
    //         console.error("📍 ----------------------------------");

    //     }


    // };










    // useEffect(() => { 

        // -----------------------
        // INICIO DA - DUPLA TRAVA (BARRAGEM DE TOPO)
        // -----------------------

        // 🧱 1. Espera o Vigia terminar a conferência na portaria
        // if (carregandoPermissoesFireBase) {

        //     console.log("");
        //     console.log("✨ 📍 ----------------------------------");
        //     console.log("✨ 📍 useEffect() - componente - 📍 UsuarioIdentificacao.jsx");
        //     console.log("✨ 📍 ⏳ VIGIA: Aguarde, ainda estou conferindo os documentos...");
        //     console.log("✨ 📍 carregandoPermissoesFireBase = ", carregandoPermissoesFireBase);
        //     console.log("✨ 📍 ----------------------------------");

        //     return;

        // }

        // 🧱 2. Verifica se o morador tem o CPF no crachá
        // if (!dadosToken?.cpef) {

        //     console.log("");
        //     console.log("✨ 📍 ----------------------------------");
        //     console.log("✨ 📍 useEffect() - componente - 📍 UsuarioIdentificacao.jsx");
        //     console.log("✨ 📍 🚨 BUSCA CANCELADA: CPF não identificado no Token.");
        //     console.log("✨ 📍 ----------------------------------");

        //     return;

        // }

        // -----------------------
        // FIM DA - DUPLA TRAVA
        // -----------------------

        // carregarDadosDoBanco();
        
    // 🧱 GATILHO DUPLO: Reage ao tempo do Vigia e ao dado do Crachá
    // }, [carregandoPermissoesFireBase, dadosToken?.cpef]);















    













    const salvarPerfilCompleto = async () => {

        // 🛡️ VALIDAÇÃO DE SEGURANÇA (Obrigatório para Admin ter acesso)

        console.log("📍 O que tem no dadosToken?", dadosToken);

        if (ehAdmin && (!nome.trim() || !senh.trim())) {

            alert("⚠️ Atenção: Para ativar seu acesso, você deve informar seu Nome e criar uma Senha!");
            return;

        }

        try {

            const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");

            const caminhoNoBanco = ref(db_realtime, 'usuarios/' + cpfLimpo);
            
            const nomeFormatado = nome.toUpperCase().trim();

            const atualizacao = { 
                nome: nomeFormatado,
                senh: senh.trim(),
            };


            console.log("📍 👑 CPF Limpo:", cpfLimpo);
            console.log("📍 👑 Caminho Final:", 'usuarios/' + cpfLimpo);


            await update(caminhoNoBanco, atualizacao);
            
            console.log("📍 👑 ✅ PASSO 1: Banco de Dados atualizado!");

            // const novosDadosParaContexto = {
            //     ...dadosToken, 
            //     nome: nomeFormatado,
            //     senh: senh.trim()
            // };
    
            // Atualiza a ferramenta oficial de autenticação
            // atualizarLocalStorange(novosDadosParaContexto);

            
            /* O PULO DO GATO: Atualiza os carimbos oficiais na hora! */
            setNomeSalvoNoBanco(nome);
            setSenhSalvaNoBanco(senh);

            alert("📍 ✅ Perfil e Acessos ativados com sucesso!");
            setPodeEditar(false);

        } catch (error) {

            alert("📍 ❌ Erro na conexão com a fundação.");

        }

    };







    return (

        <div className="painel-componente-principal">


            
            <div className="grade-componente-suporte">
                





                <div className="card-padrao-identificacao-usuario">

                    <div className="card-padrao-titulo">📋 IDENTIFICAÇÃO</div>

                    <div className="card-padrao-corpo">



                        <div className="flex-perfil-nome">
                            <label>Nome Completo  
                                {(ehAdmin && !nomeSalvoNoBanco) && <span style={{color: 'red'}}> *</span>}
                            </label>
                            <input 
                                className="InputPadrao" 
                                type="text" 
                                disabled={!podeEditar || ehProgramador} 
                                value={ehProgramador ? dadosToken?.nome : nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="DIGITE SEU NOME"
                            />
                        </div>




                        {/* 🔐 Campo de Senha: Crucial para o Administrador */}
                        {(ehAdmin && (!nomeSalvoNoBanco || !senhSalvaNoBanco)) && (
                            <div className="flex-perfil-senha">
                                <label>Senha de Acesso <span style={{color: 'red'}}>*</span></label>
                                <input 
                                    className="InputPadrao" 
                                    type="text" // Pode mudar para password se preferir esconder
                                    disabled={!podeEditar} 
                                    value={senh}
                                    onChange={(e) => setSenh(e.target.value)}
                                    placeholder="Crie uma senha forte"
                                />

                                {/* {(!senha || !nome) && ( */}
                                    <small style={{color: 'red', textAlign: 'left', display: 'block', width: '100%'}}>
                                        ⚠️ Você precisa informar seu nome e definir uma senha para acesso como administrador.
                                    </small>
                                {/* )} */}
                            </div>

                        )}




                        {/* <div className="flex-perfil-cpf">
                            <label>CPF</label>
                            <input type="text" disabled value={dadosToken?.cpef || ''} />
                        </div>



                        <div className="flex-perfil-funcao">
                            <label>Função</label>
                            <input type="text" disabled value={dadosToken?.func || ''} style={{textTransform: 'capitalize'}} />
                        </div> */}

                  




                        {/* 🕹️ Área de Comando: Só aparece se houver pendência de Nome ou Senha no Banco */}
                        {(ehAdmin && (!nomeSalvoNoBanco || !senhSalvaNoBanco)) && (
                            <div className="AreaBotoes">
                                {!podeEditar ? (
                                    <button type="button" className="BotaoEditar 🔓" onClick={() => setPodeEditar(true)}>
                                        🔓 Completar/Editar Cadastro
                                    </button>
                                ) : (
                                    <>
                                        <button type="button" className="BotaoSalvar 💾" onClick={salvarPerfilCompleto}>
                                            💾 Salvar
                                        </button>
                                        <button type="button" className="BotaoCancelar ✖️" onClick={() => { carregarDadosDoBanco(); setPodeEditar(false); }}>
                                            ✖️ Cancelar
                                        </button>
                                    </>
                                )}
                            </div>
                        )}






                    </div>





                </div>





            </div>




        </div>

    );
}