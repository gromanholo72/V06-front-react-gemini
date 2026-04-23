import React, { useEffect } from 'react';


export function ModalContratoLiberado({ nomeUsuario, visivel, aoFechar }) {

    // ---------------------------------
    // INICIO - ✨ Sensor de Presença (Contrato Liberado)
    // ---------------------------------
    useEffect(() => {

        if (visivel) {

            console.log("");
            console.log(" ------------------------------------");
            console.group("🚀 componente: ModalContratoLiberado.jsx");
            console.log("✨ 📜 Situação: Contrato Liberado pela Administração");
            console.log("✨ 📜 Próximo Passo: Assinatura Digital");
            console.log(`🚀 nomeUsuario: ${nomeUsuario}`);
            console.log(`🚀 visivel: ${visivel}`);
            console.groupEnd();
            console.log(" ---------------------------------");

        }

    }, [visivel, nomeUsuario]);
    // ---------------------------------
    // FIM - ✨ Sensor de Presença (Contrato Liberado)
    // ---------------------------------










    // ---------------------------------
    // INICIO - 🖼️ Estrutura Visual (JSX)
    // ---------------------------------

    if (!visivel) return null;

    return (

        <div className="modal-overlay-projeto" 
            style={{ 
                zIndex: 35000,
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
                    marginTop: '80px',
                    borderTop: '5px solid #d4af37',
                    animation: 'modalMaestroPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ fontSize: '55px', marginBottom: '15px' }}>🚀</div>
                
                <h2 style={{ color: '#306396', fontWeight: '800', marginBottom: '15px', letterSpacing: '1px' }}>
                    CONTRATO LIBERADO!
                </h2>
                
                <p style={{ color: '#333', fontSize: '18px', marginBottom: '10px'}}>
                    Olá, <strong>{nomeUsuario || "Usuário"}</strong>!
                </p>

                <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.5' }}>
                    Temos ótimas notícias! Seu contrato foi analisado e já está disponível para sua conferência e assinatura.
                </p>
                
                <p style={{ color: '#27ae60', fontWeight: 'bold', marginTop: '15px', fontSize: '16px' }}>
                    🛡️ Assine agora para liberar o acesso aos recursos do sistema.
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
                        cursor: 'pointer'
                    }}
                    onClick={() => aoFechar()}
                >
                    Ir para Assinatura 📜
                </button>

                <button 
                    className="Botao-Exibir-Dica-Interna" 
                    style={{ 
                        marginTop: '15px', 
                        width: '100%', 
                        backgroundColor: '#c0392b', 
                        padding: '15px', 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        textAlign: 'center',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        color: '#fff',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                    onClick={() => aoFechar()}
                >
                    Assinar depois ⏳
                </button>

            </div>
        </div>

    );

    // ---------------------------------
    // FIM - 🖼️ Estrutura Visual (JSX)
    // ---------------------------------

}
