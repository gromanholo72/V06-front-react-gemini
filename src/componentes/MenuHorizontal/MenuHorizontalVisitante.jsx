// import React from 'react';
import './MenuHorizontalVisitante.css';

export const MenuHorizontalVisitante = ({ 
    navegarERecolher,
    ehComputador
}) => {

    // 🚀 CONSOLE DE INSPEÇÃO MAESTRO
    console.log("");
    console.log("🔍 ---------------------------------");
    console.log("🔍 MenuHorizontalVisitante ");
    console.log("🔍 ehComputador         :", ehComputador);
    // console.log("🔍 navegarERecolher   :", navegarERecolher);
    console.log("🔍 ---------------------------------");

    return (




        <div className={`menu-horizontal-visitante-container ${!ehComputador ? 'visitante-container-ativo' : ''}`}>
            

            {/* 🏷️ Título condicional: Só aparece se o menu estiver aberto */}
            {!ehComputador && (
                <h3 className="titulo-menu-mobile">Menu Geral</h3>
            )}

            {/* 🧱 Container para os botões ficarem alinhados horizontalmente */}
            <div className="botoes-visitante-wrapper">
                <button 
                    className="Btn-geral-visitante-prof" 
                    onClick={() => navegarERecolher('/')}
                >
                    Início
                </button>

                <button 
                    className="Btn-geral-visitante-prof" 
                    onClick={() => navegarERecolher('/Sobre')}
                >
                    Sobre
                </button>

                <button 
                    className="Btn-geral-visitante-prof" 
                    onClick={() => navegarERecolher('/Contato')}
                >
                    Contato
                </button>
            </div>

        </div>




    );
};