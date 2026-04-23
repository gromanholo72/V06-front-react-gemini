import React, { useEffect } from 'react';
import { useAuth } from '../../AutenticacaoContexto';


export function ModalCompletarCadastro({ visivel, aoFechar }) {

    
    const { 

        dadosToken,
        setExibirBalaoDicaMeuPerfil

    } = useAuth();


    const nomeUsuario = dadosToken?.nome || "Usuário";


    // ---------------------------------
    // INICIO - ✨ Sensor de Presença (Aviso de Cadastro Pendente)
    // ---------------------------------
    useEffect(() => {

        if (visivel) {

            console.log("");
            console.log(" ------------------------------------");
            console.log("🚀 ModalCompletarCadastro.jsx");
            console.log("✨ ⚠️ Situação: Cadastro Incompleto detectado");
            console.log(`🚀 visivel: ${visivel}`);
            console.log(" ---------------------------------");

        }

    }, [visivel, nomeUsuario]);
    // ---------------------------------
    // FIM - ✨ Sensor de Presença (Aviso de Cadastro Pendente)
    // ---------------------------------






    // ---------------------------------
    // INICIO - 🖼️ Estrutura Visual (JSX)
    // ---------------------------------

    if (!visivel) return null;

    return (

        <div className="modal-overlay-projeto" 
            style={{ 
                zIndex: 5000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start' 
            }} 
            onClick={() => aoFechar()}
        >
            <div 
                className="card-loading-moderno" 
                style={{ 
                    padding: '25px', 
                    maxWidth: '400px', 
                    textAlign: 'center',
                    background: '#ffffff',
                    marginTop: '70px',
                    // borderTop: '5px solid #306396', 
                    animation: 'modalMaestroPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ fontSize: '55px', marginBottom: '15px' }}>📝</div>
                
                <h2 style={{ color: '#306396', fontWeight: '800', marginBottom: '15px', letterSpacing: '1px' }}>
                    PERFIL INCOMPLETO
                </h2>
                
                <p style={{ color: '#333', fontSize: '18px', marginBottom: '10px'}}>
                    Olá, <strong>{nomeUsuario || "Usuário"}</strong>!
                </p>

                <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.5' }}>
                    Para que possamos liberar seu contrato e o uso total da plataforma, precisamos que você complete o preenchimento de todos os cards no seu perfil.
                </p>
                
                <p style={{ color: '#c0392b', fontWeight: 'bold', marginTop: '15px', fontSize: '16px' }}>
                    ⚠️ Dados como Endereço e Contato são obrigatórios para a análise administrativa.
                </p>


                <button 
                    className="Botao-Exibir-Dica-Interna" 
                    style={{ 
                        marginTop: '35px', 
                        width: '100%', 
                        backgroundColor: '#306396', 
                        padding: '15px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#fff',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                    onClick={() => {

                        // console.log("");
                        // console.log("📐 ----------------------------------");
                        // console.log("📐 🚀 EVENTO: Clique no botão 'Completar agora 🚀'");
                        // console.log("📐 componente - ModalCompletarCadastro.jsx");
                        // console.log("📐 📍 Ação: aoFechar() & setExibirBalaoDicaMeuPerfil(true)");
                        // console.log("📐 ----------------------------------");

                        aoFechar();
                        setExibirBalaoDicaMeuPerfil(true);
                    }}
                >
                    Completar agora 🚀
                </button>

                <button 
                    className="Botao-Exibir-Dica-Interna" 
                    style={{ 
                        marginTop: '15px', 
                        width: '100%', 
                        backgroundColor: '#c0392b', // Vermelho Maestro para cancelar/sair
                        padding: '15px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#fff',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                    onClick={() => aoFechar()}
                >
                    Completar depois ⏳
                </button>

            </div>
        </div>

    );

    // ---------------------------------
    // FIM - 🖼️ Estrutura Visual (JSX)
    // ---------------------------------

}
