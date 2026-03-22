import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AutenticacaoContexto'; 
import './UsuarioLogado.css';

export function UsuarioLogado({ perfilEstaCompletoAdministrador, perfilEstaCompletoCuidadora, perfilEstaCompletoCliente }) {
    
    const navigate = useNavigate();
    const { dadosToken } = useAuth();

    return (

        <div className="componente-de-pagina">





            <div className="Grid-Status-Informativo-logado">



                {/* 🧱 Lógica Exclusiva: Programador vê apenas Painel Master */}
                {dadosToken?.func === 'programador' ? (

                    /* ---------------------------------- */
                    /* INICIO - CARD LOGADODO PROGRAMADOR */
                    /* ---------------------------------- */

                    <div className="Card-Status-Informativo-logado 🛠️">

                        <h3>💻 Modo Desenvolvedor Ativo</h3>
                        <span>Você tem acesso à fundação do sistema. Gerencie os <strong>cards</strong> de usuários e monitore o Firebase.</span>
                        
                        <button 
                            className="botao-master-programador-logado" 
                            onClick={() => navigate('/interno/PainelMaster')}
                        >
                            Ir para Painel Master
                        </button>

                    </div>

                    /* ---------------------------------- */
                    /* FIM - CARD LOGADODO PROGRAMADOR */
                    /* ---------------------------------- */

                ) : (
                    <>







                    {/* ------------------------------------------------------------------- */}
                    {/* INICIO - CARD LOGADODO USUARIOS (ADMINISTRADOR, CUIDADORA, CLIENTE) */}
                    {/* ------------------------------------------------------------------- */}

                        <div className="Card-Status-Informativo-logado">
                            <h2>👋 Olá, {dadosToken?.nome || "Usuário"}!</h2>
                            <p> Você acessou sua area interna com sucesso.</p>
                            <br />
                            <h3>📜 Leia com atenção todas as instruções abaixo</h3>
                            <span>Utilize o menu no canto superior direito para navegar pelos setores e gerenciar seus <strong>cards</strong>.</span>
                        </div>



                        {dadosToken?.func === 'administrador' && (
                            <>

                                {!perfilEstaCompletoAdministrador && (
                                    <div className="Card-Alerta-Cadastro-logado">
                                        <h3>Ação Necessária</h3>
                                        <p>Detectamos que seu perfil ainda possui campos vazios.</p>
                                        <strong>⚠️ Complete todos os cards do cadastro para liberar o acesso total aos recursos do sistema.</strong>
                                    </div>
                                )}


                            </>
                       
                        )}




                        {dadosToken?.func === 'cuidadora' && (
                            <>

                                {!perfilEstaCompletoCuidadora && (
                                    <div className="Card-Alerta-Cadastro-logado">
                                        <h3>Ação Necessária</h3>
                                        <p>Detectamos que seu perfil ainda possui campos vazios.</p>
                                        <strong>⚠️ Complete todos os cards do cadastro para liberar o acesso total aos recursos do sistema.</strong>
                                    </div>
                                )}

                            </>
                        )}





                        {dadosToken?.func === 'cliente' && (
                            <>

                                {!perfilEstaCompletoCliente && (
                                    <div className="Card-Alerta-Cadastro-logado">
                                        <h3>Ação Necessária</h3>
                                        <p>Detectamos que seu perfil ainda possui campos vazios.</p>
                                        <strong>⚠️ Complete todos os cards do cadastro para liberar o acesso total aos recursos do sistema.</strong>
                                    </div>
                                )}

                            </>
                        )}


                        {/* ------------------------------------------------------------------- */}
                        {/* INICIO - CARD LOGADODO USUARIOS (ADMINISTRADOR, CUIDADORA, CLIENTE) */}
                        {/* ------------------------------------------------------------------- */}



                    </>
                )}



              

            </div>
        </div>
    );
}