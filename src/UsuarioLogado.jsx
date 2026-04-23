import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AutenticacaoContexto'; 
import './UsuarioLogado.css';

export const UsuarioLogado = ({
    
    setModalCompletarCadastro,
    mostrarModalCompletarCadastro,
    setModalCadastroCompleto,
    mostrarModalCadastroCompleto

    

}) => {
    

    const navigate = useNavigate();

    const { 
        dadosToken, 

        cadastroCompleto, 
        contratoLiberado,
        contratoAssinado,
        prontuarioLiberado,

        exibirBalaoDicaMeuPerfil, 
        setExibirBalaoDicaMeuPerfil,

        exibirBalaoDicaMeuContrato,
        setExibirBalaoDicaMeuContrato,

        exibirBalaoDicaProntuarioPaciente,
        setExibirBalaoDicaProntuarioPaciente,

        carregandoPermissoesFireBase

    } = useAuth();

   
    // 🧱 Definimos quem precisa ver o alerta de cadastro incompleto
    const precisaCompletarCadastro = ['cuidadora', 'cliente'].includes(dadosToken?.func);




    // ---------------------------------
    // INICIO - 📐 MONITOR: INSPEÇÃO DE ACESSO
    // ---------------------------------

    useEffect(() => {
       
        // console.log("");
        // console.log(" ---------------------------");
        // console.groupCollapsed("📐 UsuarioLogado.jsx");
        
        // console.log("📐 🏛️ MONITOR: UsuarioLogado.jsx");
        // console.log("📐 🏛️ Nome: ", dadosToken?.nome || "N/A");
        // console.log("📐 🏛️ Função: ", dadosToken?.func || "N/A");

        // console.log("📐 🏛️ precisaCompletarCadastro: ", precisaCompletarCadastro ? "🔔 Ativo" : "🔕 Inativo");
        // console.log("📐 🏛️ carregandoPermissoesFireBase: ", carregandoPermissoesFireBase);
        
        // console.log("📐 🏛️ cadastroCompleto: ", cadastroCompleto);
        // console.log("📐 🏛️ contratoLiberado: ", contratoLiberado);
        // console.log("📐 🏛️ contratoAssinado: ", contratoAssinado);
        // console.log("📐 🏛️ prontuarioLiberado: ", prontuarioLiberado);

        // console.log("📐 🏛️ exibirBalaoDicaMeuPerfil: ", exibirBalaoDicaMeuPerfil);
        // console.log("📐 🏛️ exibirBalaoDicaMeuContrato: ", exibirBalaoDicaMeuContrato);
        // console.log("📐 🏛️ exibirBalaoDicaProntuarioPaciente: ", exibirBalaoDicaProntuarioPaciente);

        // console.groupEnd();
        // console.log(" ---------------------------");
 
    }, [
        dadosToken, 
        precisaCompletarCadastro,

        cadastroCompleto, 
        contratoLiberado, 
        contratoAssinado, 
        prontuarioLiberado,

        exibirBalaoDicaMeuPerfil,
        exibirBalaoDicaMeuContrato,
        exibirBalaoDicaProntuarioPaciente
        
    ]);

    // ---------------------------------
    // FIM - 📐 MONITOR: INSPEÇÃO DE ACESSO
    // ---------------------------------











    // ---------------------------------
    // INICIO - ESSA PARTE ESTA EM TESTE
    // ---------------------------------

    // useEffect(() => {
    //     if (!carregandoPermissoesFireBase && precisaCompletarCadastro && cadastroCompleto === false) {
    //         setModalCompletarCadastro(true);
    //     }
    // }, [carregandoPermissoesFireBase, precisaCompletarCadastro, cadastroCompleto]);

    // useEffect(() => {
    //     if (cadastroCompleto === true && mostrarModalCompletarCadastro === true) {
            
    //         setModalCompletarCadastro(false);
        
    //         setTimeout(() => {
    //             setModalCadastroCompleto(true);
    //         }, 500); 
    //     }
    // }, [cadastroCompleto, mostrarModalCompletarCadastro]);

    // ---------------------------------
    // FIM - ESSA PARTE ESTA EM TESTE
    // ---------------------------------
















    return (


        <div className="Grid-Status-Informativo-logado">



            {dadosToken?.func === 'programador' ? (

                /* ---------------------------------- */
                /* INICIO - CARD LOGADODO PROGRAMADOR */
                /* ---------------------------------- */

                <div className="Card-Status-Informativo-logado">

                    <h3>💻 Modo Desenvolvedor Ativo</h3>
                    <span>Acesso Total</span>
                    
                    <button 
                        className="botao-master-programador-logado" 
                        onClick={() => navigate('/interno/PainelMaster')}
                    >
                        Painel Master
                    </button>

                </div>

                /* ---------------------------------- */
                /* FIM - CARD LOGADODO PROGRAMADOR */
                /* ---------------------------------- */

            ) : (
                <>


                {/* ------------------------------- */}
                {/* INICIO - PARA TODOS OS USUARIOS */}
                {/* ------------------------------- */}

                <div className="Card-Status-Informativo-logado">

                    <h2>{dadosToken?.nome || "Usuário"}!</h2>
                    <p> Você está na sua area interna do sistema.</p>
                
                </div>

                {/* ------------------------------- */}
                {/* FIM - PARA TODOS OS USUARIOS */}
                {/* ------------------------------- */}











                {/* --------------------------------- */}
                {/* INICIO - PARA USUARIOS ESPECIFICOS*/}
                {/* --------------------------------- */}

                <div className="Card-usuario-logado-mensagens">

                  

                    {/* ------------------------------------------ -- */}
                    {/* INICIO - VERIFICA SE O CADASTRO ESTA COMPLETO */}
                    {/* --------------------------------------------- */}
                    {!carregandoPermissoesFireBase && precisaCompletarCadastro && !cadastroCompleto && (
                        <>
                            <div className="Card-Status-Informativo-logado">
                                <p>📜 Leia com atenção todas as instruções abaixo.</p>
                            </div>

                            <div className="Card-Alerta-Cadastro-logado">
                                <h3>Ação Necessária</h3>
                                <p>Detectamos que seu perfil ainda possui campos vazios.</p>
                                <strong>⚠️ Complete todos os cards do cadastro para liberar o proximo acesso.</strong>

                                {/* 💡 Novo recurso: Botão de Dica Estratégica Maestro */}
                                <div className="Area-Acao-Dica-Logado">
                                    <button 
                                        className="Botao-Exibir-Dica-Interna"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Previne fechar no mesmo clique
                                            setExibirBalaoDicaMeuPerfil(!exibirBalaoDicaMeuPerfil);
                                        }}
                                    >
                                        {exibirBalaoDicaMeuPerfil ? "🙈 Esconder Dica" : "💡 Dica da acao necessaria"}
                                    </button>

                                </div>
                            </div>

                        </>
                    )}

                    {/* ------------------------------------------ -- */}
                    {/* FIM - VERIFICA SE O CADASTRO ESTA COMPLETO */}
                    {/* --------------------------------------------- */}









                    {/* ----------------------------------------------------------- */}
                    {/* INICIO - ✅ CARD: AGUARDANDO LIBERAÇÃO (MAESTRO 2026)      */}
                    {/* ----------------------------------------------------------- */}

                    {!carregandoPermissoesFireBase && precisaCompletarCadastro && cadastroCompleto && !contratoLiberado && (
                    
                        <div className="Card-Status-Seguranca-logado">
                            <div className="Icone-Status-logado"></div>
                            <div>
                                <h3>✅ Cadastro Completo!</h3>
                                <span>Aguarde a liberação do contrato pelo administrador para acessar todos os recursos.</span>
                            </div>
                        </div>

                    )}
                 
                    {/* ----------------------------------------------------------- */}
                    {/* FIM - ✅ CARD: AGUARDANDO LIBERAÇÃO                        */}
                    {/* ----------------------------------------------------------- */}










                    {/* ----------------------------------------------------------- */}
                    {/* INICIO - 🚀 CARD: CONTRATO LIBERADO (MAESTRO 2026)         */}
                    {/* ----------------------------------------------------------- */}
                    {!carregandoPermissoesFireBase && precisaCompletarCadastro && cadastroCompleto && contratoLiberado && !contratoAssinado && (
                        <>

                            <div className="Card-Status-Seguranca-logado">
                                <div className="Icone-Status-logado"></div>
                                <div>
                                    <h3>🚀 Contrato Liberado!</h3>
                                </div>
                            </div>


                            <div className="Card-Alerta-Cadastro-logado">
                                <h3>Ação Necessária</h3>
                                <p>Detectamos que voce ainda nao assinou o contrato.</p>
                                <strong>⚠️ Va ao botao contrato, leia, escolha as opçoes e assine que logo em seguida tera acesso aos recursos do sistema.</strong>

                                {/* 💡 Novo recurso: Botão de Dica Estratégica Maestro */}
                                <div className="Area-Acao-Dica-Logado">
                                    <button 
                                        className="Botao-Exibir-Dica-Interna"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Previne fechar no mesmo clique
                                            setExibirBalaoDicaMeuContrato(!exibirBalaoDicaMeuContrato);
                                        }}
                                    >
                                        {exibirBalaoDicaMeuContrato ? "🙈 Esconder Dica" : "💡 Dica da ação necessária"}
                                    </button>

                                </div>
                            </div>



                        </>
                    )}
                    {/* ----------------------------------------------------------- */}
                    {/* FIM - 🚀 CARD: CONTRATO LIBERADO                           */}
                    {/* ----------------------------------------------------------- */}










                    {/* ----------------------------------------------------------- */}
                    {/* INICIO - ✅ CARD: CONTRATO ASSINADO (MAESTRO 2026)         */}
                    {/* ----------------------------------------------------------- */}
                    {!carregandoPermissoesFireBase && precisaCompletarCadastro && cadastroCompleto && contratoLiberado && contratoAssinado && (
                        <>

                            <div className="Card-Status-Seguranca-logado">
                                <div className="Icone-Status-logado"></div>
                                <div>
                                    <h3>✅ Contrato Assinado!</h3>
                                    <span>O protocolo de assinatura digital foi registrado com sucesso. Seu acesso total está garantido. Explore todos os recursos do sistema!</span>
                                </div>
                            </div>




                            <div className="Card-Alerta-Cadastro-logado">
                                <h3>Ação Necessária</h3>
                                <p>Detectamos que voce ainda nao preencheu o prontuario do paciente.</p>
                                <strong>⚠️ Va ao "Prontuario do Paciente" e preencha todas as informações.</strong>

                                {/* 💡 Novo recurso: Botão de Dica Estratégica Maestro */}
                                <div className="Area-Acao-Dica-Logado">
                                    <button 
                                        className="Botao-Exibir-Dica-Interna"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Previne fechar no mesmo clique
                                            setExibirBalaoDicaProntuarioPaciente(!exibirBalaoDicaProntuarioPaciente);
                                        }}
                                    >
                                        {exibirBalaoDicaProntuarioPaciente ? "🙈 Esconder Dica" : "💡 Dica da ação necessária"}
                                    </button>

                                </div>
                            </div>




                        </>
                    )}
                    {/* ----------------------------------------------------------- */}
                    {/* FIM - ✅ CARD: CONTRATO ASSINADO                           */}
                    {/* ----------------------------------------------------------- */}

















                </div>

                {/* --------------------------------- */}
                {/* FIM - PARA USUARIOS ESPECIFICOS  */}
                {/* --------------------------------- */}


                </>
            )}



        
        </div>




       
    );
};