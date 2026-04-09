import React, { useEffect } from 'react';
import './MenuSideBarCuidadora.css';

export const MenuSideBarCuidadora = ({ 
    navegarERecolher, 
    autorizadoAdministrador,
    ehComputador
}) => {




// ---------------------------------
    // INICIO - ✨ Monitor de Propriedades (Inspeção Maestro)
    // ---------------------------------
    useEffect(() => {
        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ Componente: MenuSideBarCuidadora.jsx");
        console.log("✨  ehComputador:", ehComputador);
        console.log("✨ autorizadoAdministrador:", autorizadoAdministrador);
        // console.log("✨ navegarERecolher        :", navegarERecolher ? "✅ Recebida" : "❌ Vazia");
       
        console.log("✨ ----------------------------------");
    }, [ehComputador, autorizadoAdministrador, navegarERecolher]);
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

        <div className={`menu-sidebar-cuidadora-container ${!ehComputador ? 'menu-sidebar-cuidadora-ativo' : ''}`}>

            <div className="menu-sidebar-cuidadora-header">
                <div className="menu-sidebar-cuidadora-funcao">
                    <span className="menu-sidebar-cuidadora-titulo">
                        {autorizadoAdministrador ? "Área da Cuidadora" : "Área da Cuidadora 🔓"}
                    </span>
                </div>
            </div>
            
            <div 
                className="menu-sidebar-cuidadora-lista-botoes"
                style={estiloListaBloqueada}
            >
                
                <button 
                    className="menu-sidebar-cuidadora-btn-item"
                    onClick={() => navegarERecolher('/interno/MeusPlantoes')}
                >
                    Meus Plantões <span className="menu-sidebar-cuidadora-icon">⏰</span>
                </button>
                
                <button 
                    className="menu-sidebar-cuidadora-btn-item"
                    onClick={() => navegarERecolher('/interno/EvolucaoPaciente')}
                >
                    Registrar Evolução <span className="menu-sidebar-cuidadora-icon">🩺</span>
                </button>
                
                <button 
                    className="menu-sidebar-cuidadora-btn-item"
                    onClick={() => navegarERecolher('/interno/EscalaMensal')}
                >
                    Minha Escala <span className="menu-sidebar-cuidadora-icon">📅</span>
                </button>

                <button 
                    className="menu-sidebar-cuidadora-btn-item"
                    onClick={() => navegarERecolher('/interno/AssumirPlantao')}
                >
                    Assumir Plantão <span className="menu-sidebar-cuidadora-icon">🤝</span>
                </button>

                <button 
                    className="menu-sidebar-cuidadora-btn-item menu-sidebar-cuidadora-btn-alerta"
                    onClick={() => navegarERecolher('/interno/SuporteOperacional')}
                >
                    Suporte / S.O.S <span className="menu-sidebar-cuidadora-icon">🚨</span>
                </button>

            </div>

        </div>



    );
};