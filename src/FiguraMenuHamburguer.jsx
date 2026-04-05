import React from 'react';
import './FiguraMenuHamburguer.css';
import {BalaoDicaMenuHamburguer} from './componentes/BalaoDicaMenuHamburguer';

export const FiguraMenuHamburguer = ({ 
    menuAberto, 
    setMenuAberto, 
    setSecaoAberta, 
    exibirBalaoDicaMenuHamburguer 
}) => {

    const handleToggleMenu = () => {
        if (menuAberto) {
            setMenuAberto(false);
            setSecaoAberta(null);
        } else {
            setMenuAberto(true);
        }
    };

    return (
        <>
            <button 
                className={`botao-figura-menu-hamburguer 
                    ${menuAberto ? 'menu-ativo' : ''} 
                    ${exibirBalaoDicaMenuHamburguer ? 'pulsar-ativo' : ''}`}
                onClick={handleToggleMenu}
            >
                {/* 📐 Sensores Visuais: 3 linhas que formam o hambúrguer ou o X via CSS */}
                <div className="container-linhas-maestro">
                    <span className="linha-maestro-hamburguer"></span>
                    <span className="linha-maestro-hamburguer"></span>
                    <span className="linha-maestro-hamburguer"></span>
                </div>
            </button>

            {/* 🎈 O Balão de Dica (Componente Visual de Apoio) */}
            <BalaoDicaMenuHamburguer 
                exibirBalaoDicaMenuHamburguer={exibirBalaoDicaMenuHamburguer} 
            />
        </>
    );
};