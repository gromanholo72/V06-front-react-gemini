import React, { useEffect } from 'react';
import './MenuSideBarAdministrador.css';



// 🏗️ Componente: MenuSideBarAdministrador (Padronizado Maestro V3)
export const MenuSideBarAdministrador = ({

    navegarERecolher, 
    cadastroCompleto, 
    ehComputador 

}) => {


    // ---------------------------------
    // INICIO - ✨ Monitor de Propriedades (Inspeção Maestro)
    // ---------------------------------

    useEffect(() => {
        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ MenuSideBarAdministrador.jsx");
        console.log("✨ ehComputador:", ehComputador);
        console.log("✨ cadastroCompleto:", cadastroCompleto);
        console.log("✨ ----------------------------------");
    }, [ehComputador, cadastroCompleto]);

    // ---------------------------------
    // FIM - ✨ Monitor de Propriedades (Inspeção Maestro)
    // ---------------------------------



    return (

        <div className={`menu-sidebar-administrador-container ${!ehComputador ? 'menu-sidebar-administrador-celular' : ''}`}>



            {ehComputador ? (
                /* 💻 Estrutura Completa para Desktop */
                <div className="menu-sidebar-administrador-header">
                    <div className="menu-sidebar-administrador-funcao">
                        <span className="titulo-setor-sidebar">
                            Painel Administrativo
                        </span>
                    </div>
                </div>
            ) : (
                /* 📱 No Celular: Renderiza APENAS o título direto conforme padrão cliente */
                <h3 className="titulo-setor-sidebar">
                   Painel Administrativo
                </h3>
            )}




            <div className="lista-botoes-administrador-vertical">

                {/* ✅ Módulos Operacionais - Condicionados ao cadastroCompleto */}
                
                <button 
                    className={`Btn-geral-administrador-vertical ${!cadastroCompleto ? 'btn-bloqueado' : ''}`} 
                    onClick={() => navegarERecolher('/interno/AdministradorRelatorioCuidadoras')}
                    disabled={!cadastroCompleto}
                    title={!cadastroCompleto ? "Complete o cadastro para acessar" : "Cuidadoras"}
                >
                    <span>Cuidadoras</span> <span className="menu-sidebar-administrador-icon">👩‍⚕️</span>
                </button>

                <button 
                    className={`Btn-geral-administrador-vertical ${!cadastroCompleto ? 'btn-bloqueado' : ''}`} 
                    onClick={() => navegarERecolher('/interno/AdministradorRelatorioClientes')}
                    disabled={!cadastroCompleto}
                    title={!cadastroCompleto ? "Complete o cadastro para acessar" : "Clientes"}
                >
                    <span>Clientes</span> <span className="menu-sidebar-administrador-icon">👥</span>
                </button>

                {/* 🔒 BLOQUEADOS: Módulos em Desenvolvimento (Fase 2) */}

                <button className="Btn-geral-administrador-vertical btn-bloqueado" disabled title="Em desenvolvimento">
                    <span>Configurações</span> <span className="menu-sidebar-administrador-icon">⚙️</span>
                </button>

                <button className="Btn-geral-administrador-vertical btn-bloqueado" disabled title="Em desenvolvimento">
                    <span>Financeiro</span> <span className="menu-sidebar-administrador-icon">💰</span>
                </button>

                <button className="Btn-geral-administrador-vertical btn-bloqueado" disabled title="Em desenvolvimento">
                    <span>Documentação</span> <span className="menu-sidebar-administrador-icon">📂</span>
                </button>

                <button className="Btn-geral-administrador-vertical btn-bloqueado" disabled title="Em desenvolvimento">
                    <span>Solicitações</span> <span className="menu-sidebar-administrador-icon">📝</span>
                </button>

                <button className="Btn-geral-administrador-vertical btn-bloqueado" disabled title="Em desenvolvimento">
                    <span>Escalas / Plantões</span> <span className="menu-sidebar-administrador-icon">🗓️</span>
                </button>

                <button className="Btn-geral-administrador-vertical btn-bloqueado" disabled title="Em desenvolvimento">
                    <span>Auditoria Médica</span> <span className="menu-sidebar-administrador-icon">💊</span>
                </button>

                <button className="Btn-geral-administrador-vertical btn-bloqueado" disabled title="Em desenvolvimento">
                    <span>Alertas de Emergência</span> <span className="menu-sidebar-administrador-icon">🚨</span>
                </button>

            </div>



        </div>

    );

};