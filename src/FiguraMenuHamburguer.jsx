import React, { useEffect } from 'react';
import './FiguraMenuHamburguer.css';
import {BalaoDicaMenuHamburguer} from './componentes/BalaoDica/BalaoDicaMenuHamburguer';

export const FiguraMenuHamburguer = ({ 
    menuAberto, 
    setMenuAberto, 

    secaoAberta,
    setSecaoAberta, 
    exibirBalaoDicaMenuHamburguer 
}) => {


    useEffect(() => {
        console.log("");
        console.log("🔍 -----------------------");
        console.log("🔍 FiguraMenuHamburguer");
        console.log("🔍 menuAberto:", menuAberto);
        console.log("🔍 secaoAberta:", secaoAberta);
        // console.log("🔍 exibirBalaoDicaMenuHamburguer :", exibirBalaoDicaMenuHamburguer);
        // console.log("🔍 setMenuAberto                 :", setMenuAberto ? "✅ Recebida" : "❌ Vazia");
        // console.log("🔍 setSecaoAberta                :", setSecaoAberta ? "✅ Recebida" : "❌ Vazia");
        console.log("🔍 -----------------------");
    }, [menuAberto, secaoAberta]);
    

    const handleToggleMenu = () => {

        setSecaoAberta(null);
        
        if (menuAberto) {
            setMenuAberto(false);
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