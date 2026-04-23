import React, { useEffect } from 'react';
// import './ModalCadastroCompleto.css';


export function ModalCadastroCompleto({ nomeUsuario, visivel, aoFechar  }) {

    // ---------------------------------
    // INICIO - ✨ Sensor de Presença (Celebração)
    // ---------------------------------
    useEffect(() => {

        if (visivel) {

           
            console.log("");
            console.log(" ------------------------------------");
            console.log("🎊 ModalCadastroCompleto.jsx");
            console.log("✨ 🏆 Situação: Cadastro completo");
            console.log("✨ 🏆 Esperando: liberaçao do contrato");
            console.log(`🎊 nomeUsuario: ${nomeUsuario}`);
            console.log(`🎊 visivel: ${visivel}`);
            console.log(`🎊 aoFechar: ${aoFechar}`);
            console.log(" ---------------------------------");

        }

    }, [visivel, nomeUsuario, aoFechar]);
    // ---------------------------------
    // FIM - ✨ Sensor de Presença (Celebração)
    // ---------------------------------










    // ---------------------------------
    // INICIO - 🖼️ Estrutura Visual (JSX)
    // ---------------------------------

    if (!visivel) return null;

    return (




        <div className="modal-overlay-projeto" 
        style={{ 
            zIndex: 30000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start' 
        }} 
        onClick={() => aoFechar()}
        >
            <div 
                className="card-loading-moderno" 
                style={{ 
                    padding: '20px', 
                    maxWidth: '370px', 
                    textAlign: 'center',
                    background: '#ffffff',
                    marginTop: '80px',
                    animation: 'modalMaestroPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ fontSize: '50px', marginBottom: '10px' }}>🎊</div>
                
                <h2 style={{ color: '#306396', fontWeight: '800', marginBottom: '15px' }}>
                    CADASTRO COMPLETO!
                </h2>
                
                <p style={{ color: '#444', fontSize: '17px', marginBottom: '10px'}}>
                    <strong>{nomeUsuario || "Usuário"}</strong>! <br />
                </p>


                <p style={{ color: '#444', fontSize: '17px' }}>
                    Seus dados foram registrados com sucesso pelo sistema.
                </p>
                
                <p style={{ color: 'red', fontWeight: 'bold', marginTop: '15px', fontSize: '16px' }}>
                    Aguarde a liberação do seu contrato pela administração.
                </p>

                <button 
                    className="Botao-Exibir-Dica-Interna" 
                    style={{ 
                        marginTop: '30px', 
                        width: '100%', 
                        backgroundColor: '#d4af37', 
                        padding: '15px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#000',
                    }}
                    onClick={() => aoFechar()}
                >
                    Ótimo, entendi!
                </button>
            </div>
        </div>





    );

    // ---------------------------------
    // FIM - 🖼️ Estrutura Visual (JSX)
    // ---------------------------------

}
