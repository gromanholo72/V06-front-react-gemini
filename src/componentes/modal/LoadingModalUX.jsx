import React, { useEffect } from 'react';
import './LoadingModalUX.css';










// ---------------------------------
// INICIO - ⏳ COMPONENTE: LoadingModalUX
// ---------------------------------
export function LoadingModalUX({ visivel, segundos }) {


    // ---------------------------------
    // INICIO - ✨ Monitor de Ciclo de Vida (UX)
    // ---------------------------------

    // useEffect(() => {

    //     if (visivel) {

            // console.log("");
            // console.log("✨ ⏳ ----------------------------------");
            // console.log("✨ ⏳ Componente - LoadingModalUX.jsx");
            // console.log("✨ ⏳ Status: MODAL UX EXIBIDO.");

    //         if (segundos !== undefined) {

    //             console.log(`✨ ⏳ Cronômetro em: ${segundos}s`);

    //         }

            // console.log("✨ ⏳ ----------------------------------");

    //     }

    // }, [visivel, segundos]);

    // ---------------------------------
    // FIM - ✨ Monitor de Ciclo de Vida (UX)
    // ---------------------------------










    if (!visivel) return null;


    return (
        <div className="modal-overlay-projeto">
            <div className="card-loading-moderno">
                <div className="spinner-dual-ring"></div>
                <h3 className="titulo-loading">Aguarde...</h3>
                <p className="subtitulo-loading">
                    Validando acessos à sua área interna... {segundos !== undefined && `(${segundos}s)`}
                </p>
                <div className="barra-progresso-container">
                    <div className="barra-progresso-infinita"></div>
                </div>
            </div>
        </div>
    );


}
// ---------------------------------
// FIM - ⏳ COMPONENTE: LoadingModalUX
// ---------------------------------
