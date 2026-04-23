import React, { useEffect } from 'react';
import './MenuHorizontalAdministrador.css';

// 🏗️ Componente: MenuHorizontalAdministrador (Padronizado Maestro)
export const MenuHorizontalAdministrador = ({ 
    navegarERecolher, 
    ehComputador
}) => {

    // ---------------------------------
    // INICIO - ✨ Monitor de Propriedades (Inspeção Maestro)
    // ---------------------------------
    useEffect(() => {

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ MenuHorizontalAdministrador.jsx");
        // console.log("✨ ehComputador            :", ehComputador);
        // console.log("✨ ----------------------------------");

    }, [ehComputador, navegarERecolher]);

    // ---------------------------------
    // FIM - ✨ Monitor de Propriedades
    // ---------------------------------



    return (
        <div className={`menu-horizontal-administrador-container ${!ehComputador ? 'menu-horizontal-administrador-celular' : ''}`}>



            {/* 🏷️ Título condicional: Só aparece no Mobile quando aberto */}
            {!ehComputador && (
                <h3 className="titulo-menu-mobile">Menu Geral</h3>
            )}



            {/* 🧱 Wrapper para garantir alinhamento horizontal dos botões */}
            <div className="lista-botoes-administrador-horizontal">

                <button 
                    className="Btn-geral-administrador-prof btn-centralizado"
                    onClick={() => navegarERecolher('/interno/UsuarioLogado')}
                >
                    Inicio
                </button>

                <button 
                    className="Btn-geral-administrador-prof btn-centralizado"
                    onClick={() => navegarERecolher('/interno/Funcoes')}
                >
                    Suas Funções
                </button>

            </div>




        </div>
    );
};