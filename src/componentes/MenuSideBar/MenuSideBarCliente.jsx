import React, { useEffect } from 'react';
import './MenuSideBarCliente.css';

// 🏗️ Componente: MenuSideBarCliente (Padronizado Maestro V3)
export const MenuSideBarCliente = ({ 
    autorizadoAdministrador, 
    navegarERecolher, 
    menuAberto 
}) => {

    // ---------------------------------
    // INICIO - ✨ Monitor de Propriedades
    // ---------------------------------
    useEffect(() => {
        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ Componente: MenuSideBarCliente.jsx");
        console.log("✨ Status: ✅ Carregado com Sucesso");
        console.log("✨ Autorizado Admin:", autorizadoAdministrador);
        console.log("✨ ----------------------------------");
    }, [autorizadoAdministrador]);
    // ---------------------------------
    // FIM - ✨ Monitor de Propriedades
    // ---------------------------------

    // 🎨 Estilo dinâmico para bloqueio de área
    const estiloListaBloqueada = {
        opacity: autorizadoAdministrador ? 1 : 0.5,
        pointerEvents: autorizadoAdministrador ? 'auto' : 'none',
        filter: autorizadoAdministrador ? 'none' : 'grayscale(1)',
        cursor: autorizadoAdministrador ? 'default' : 'not-allowed'
    };










    return (
        // --------------------------------------------------------------------------------------------
        // INICIO - 🧱 ESTRUTURA DA SIDEBAR: CLIENTE (PACIENTE)
        // --------------------------------------------------------------------------------------------
        <div className={`menu-sidebar-cliente-container ${menuAberto ? 'menu-sidebar-cliente-ativo' : ''}`}>




            <div className="menu-sidebar-paciente-header">
                <div className="menu-sidebar-paciente-funcao">
                    <span className="titulo-setor-sidebar">
                        {autorizadoAdministrador ? "Prontuário do Paciente" : "Prontuário do Paciente 🔒"}
                    </span>
                </div>
            </div>
            



            <div className="lista-botoes-vertical" 
                style={estiloListaBloqueada}
            >

                <button className="Btn-geral-cliente-prof" onClick={() => navegarERecolher('/interno/PacienteIdentificacao')}>
                    👤 Identificação <span className="menu-sidebar-cliente-icon"></span>
                </button>

                <button className="Btn-geral-cliente-prof" onClick={() => navegarERecolher('/interno/PacienteEndereco')}>
                    📍 Endereço <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-prof" onClick={() => navegarERecolher('/interno/PacienteRemedio')}>
                    💊 Medicamentos <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-prof" onClick={() => navegarERecolher('/interno/PacienteAlimentacao')}>
                 🍏 Alimentação <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-prof" onClick={() => navegarERecolher('/interno/PacienteBanho')}>
                    🚿Banho <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-prof" onClick={() => navegarERecolher('/interno/PacienteEmergencia')}>
                    🚨 Emergência <span className="menu-sidebar-cliente-icon"></span>
                </button>

            </div>



        </div>
        // --------------------------------------------------------------------------------------------
        // FIM - 🧱 ESTRUTURA DA SIDEBAR: CLIENTE (PACIENTE)
        // --------------------------------------------------------------------------------------------
    );
};