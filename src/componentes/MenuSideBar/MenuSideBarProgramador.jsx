import React, { useEffect } from 'react';
import './MenuSideBarProgramador.css';



// 🏗️ Componente: MenuSideBarProgramador (Padronizado Maestro V3)
export const MenuSideBarProgramador = ({
    autorizadoAdministrador, 
    navegarERecolher, 
    ehComputador 
}) => {



    // ---------------------------------
    // INICIO - ✨ Monitor de Propriedades (Inspeção Maestro)
    // ---------------------------------

    useEffect(() => {
        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ Componente: MenuSideBarProgramador.jsx");
        console.log("✨ Status: ✅ Carregado com Sucesso");
        console.log("✨ ehComputador            :", ehComputador);
        console.log("✨ Autorizado Admin        :", autorizadoAdministrador);
        console.log("✨ ----------------------------------");
    }, [ehComputador, autorizadoAdministrador]);

    // ---------------------------------
    // FIM - ✨ Monitor de Propriedades (Inspeção Maestro)
    // ---------------------------------











    // ---------------------------------
    // INICIO - 🧱 ESTRUTURA DA SIDEBAR: PROGRAMADOR
    // ---------------------------------

    return (
        <div className={`menu-sidebar-programador-container ${!ehComputador ? 'menu-sidebar-programador-celular' : ''}`}>


            {ehComputador ? (
                /* 💻 Estrutura Completa para Desktop */
                <div className="menu-sidebar-programador-header">
                    <div className="menu-sidebar-programador-funcao">
                        <span className="titulo-setor-sidebar">
                            Painel de Controle {autorizadoAdministrador ? "" : "🔒"}
                        </span>
                    </div>
                </div>
            ) : (
                /* 📱 No Celular: Renderiza APENAS o título direto conforme padrão cliente */
                <h3 className="titulo-setor-sidebar">
                   Painel de Controle {autorizadoAdministrador ? "" : "🔒"}
                </h3>
            )}



            <div className="lista-botoes-programador-vertical">

                <button
                    className="Btn-geral-programador-vertical"
                    onClick={() => navegarERecolher('/interno/RelClientes')}
                >
                    👥 Usuarios (Antigo) <span className="menu-sidebar-programador-icon"></span>
                </button>

                <button
                    className="Btn-geral-programador-vertical"
                    onClick={() => navegarERecolher('/interno/ProgramadorRelatorioCliente')}
                >
                    👥 Usuarios V2 <span className="menu-sidebar-programador-icon"></span>
                </button>
                
            </div>

        </div>
    );

    // ---------------------------------
    // FIM - 🧱 ESTRUTURA DA SIDEBAR: PROGRAMADOR
    // ---------------------------------
};