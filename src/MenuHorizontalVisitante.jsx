import React from 'react';
import './MenuHorizontalVisitante.css';

export const MenuHorizontalVisitante = ({ navegarERecolher }) => {
    return (
        <div className="menu-horizontal-visitante-container">
            
            <button 
                className="Btn-geral-visitante" 
                onClick={() => navegarERecolher('/')}
            >
                Início
            </button>

            <button 
                className="Btn-geral-visitante" 
                onClick={() => navegarERecolher('/Sobre')}
            >
                Sobre
            </button>

            <button 
                className="Btn-geral-visitante" 
                onClick={() => navegarERecolher('/Contato')}
            >
                Contato
            </button>

        </div>
    );
};