import React, { useState, useEffect } from 'react';
import './LoadingModalUXLimpo.css';













// ---------------------------------
// INICIO - ⏳ COMPONENTE: LoadingModalUXLimpo
// ---------------------------------
export function LoadingModalUXLimpo({ visivel }) {


    // ---------------------------------
    // INICIO - 🛠️ Ferramentas de Trabalho (Hooks)
    // ---------------------------------
    const [modalVisivelUX, setModalVisivelUX] = useState(false);
    const [segundos, setSegundos] = useState(0);
    // ---------------------------------
    // FIM - 🛠️ Ferramentas de Trabalho (Hooks)










    // ---------------------------------
    // INICIO - ✨ Monitor de Ciclo de Vida (UX Rápido - 1s Mínimo)
    // ---------------------------------
    useEffect(() => {
        let intervalo;

        if (visivel) {
            setModalVisivelUX(true);
        }

        if (modalVisivelUX) {
            intervalo = setInterval(() => {
                setSegundos(prev => prev + 1);
            }, 500);
        }

        // 🛡️ Regra Maestro: Só removemos o modal se a rede terminou E o timer bateu o mínimo de 1 segundo
        if (!visivel && segundos >= 1) {
            console.log("");
            console.log("✨ ⏳ ----------------------------------");
            console.log("✨ ⏳ Componente - LoadingModalUXLimpo.jsx");
            console.log("✨ ⏳ Status: Ciclo de Conforto Visual atingido (1s).");
            console.log("✨ ⏳ ----------------------------------");

            setModalVisivelUX(false);
            setSegundos(0);
        }

        return () => clearInterval(intervalo);

    }, [visivel, modalVisivelUX, segundos]);

    // ---------------------------------
    // FIM - ✨ Monitor de Ciclo de Vida (UX Rápido - 1s Mínimo)
    // ---------------------------------









    if (!modalVisivelUX) return null;

    return (
        <div className="modal-overlay-limpo">
            <div className="card-loading-moderno">
                <div className="spinner-dual-ring"></div>
                <h3 className="titulo-loading">Aguarde...</h3>
                <p className="subtitulo-loading">
                    Sincronizando ambiente...
                </p>
            </div>
        </div>
    );


}
// ---------------------------------
// FIM - ⏳ COMPONENTE: LoadingModalUXLimpo
// ---------------------------------
