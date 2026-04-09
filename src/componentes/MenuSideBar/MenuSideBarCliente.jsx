import React, { useEffect } from 'react';
import './MenuSideBarCliente.css';

// 🏗️ Componente: MenuSideBarCliente (Padronizado Maestro V3)
export const MenuSideBarCliente = ({ 
    autorizadoAdministrador, 
    navegarERecolher, 
    ehComputador 
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
        <div className={`menu-sidebar-cliente-container ${!ehComputador ? 'menu-sidebar-cliente-celular' : ''}`}>


            {ehComputador ? (
                /* 💻 Estrutura Completa para Desktop */
                <div className="menu-sidebar-paciente-header">
                    <div className="menu-sidebar-paciente-funcao">
                        <span className="titulo-setor-sidebar">
                            Prontuário do Paciente {autorizadoAdministrador ? "" : "🔒"}
                        </span>
                    </div>
                </div>
            ) : (
                /* 📱 No Celular: Renderiza APENAS o título direto */
                <h3 className="titulo-setor-sidebar">
                   Prontuário do Paciente {autorizadoAdministrador ? "" : "🔒"}
                </h3>
            )}
            



            <div className="lista-botoes-cliente-vertical" 
                style={estiloListaBloqueada}
            >
                
                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteIdentificacao')}>
                    👤 Identificação <span className="menu-sidebar-cliente-icon"></span>
                </button>

                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteEndereco')}>
                    📍 Endereço <span className="menu-sidebar-cliente-icon"></span>
                </button>

                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteContatos')}>
                    📞 Família / Responsáveis <span className="menu-sidebar-cliente-icon"></span>
                </button>

                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteHistorico')}>
                    📜 Histórico Clínico <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteSinaisVitais')}>
                    🌡️ Sinais Vitais <span className="menu-sidebar-cliente-icon"></span>
                </button>

                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteRemedio')}>
                    💊 Medicamentos <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteAlimentacao')}>
                    🍏 Alimentação <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteBanho')}>
                    🚿 Banho / Higiene <span className="menu-sidebar-cliente-icon"></span>
                </button>

                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteMobilidade')}>
                    🚶 Mobilidade / Quedas <span className="menu-sidebar-cliente-icon"></span>
                </button>

                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteExames')}>
                    📁 Exames / Laudos <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteEmergencia')}>
                    🚨 Emergência <span className="menu-sidebar-cliente-icon"></span>
                </button>

            </div>



        </div>
        // --------------------------------------------------------------------------------------------
        // FIM - 🧱 ESTRUTURA DA SIDEBAR: CLIENTE (PACIENTE)
        // --------------------------------------------------------------------------------------------
    );
};