import React, { useEffect } from 'react';
import './MenuHorizontalCuidadora.css';

export const MenuHorizontalCuidadora = ({ 
    navegarERecolher, 
    perfilEstaCompletoCuidadora 
}) => {

    // ---------------------------------
    // INICIO - 📐 MONITOR DE MONTAGEM MAESTRO
    // ---------------------------------

    useEffect(() => {
        console.log("");
        console.log("📐 -----------------------------------------------------------");
        console.log("📐 COMPONENTE: MenuHorizontalCuidadora.jsx");
        console.log("📐 STATUS: ✅ Estilos e Componente Carregados na Interface");
        console.log("📐 -----------------------------------------------------------");
    }, []);

    // ---------------------------------
    // FIM - 📐 MONITOR DE MONTAGEM MAESTRO
    // ---------------------------------

    
    return (
        <div className="menu-horizontal-cuidadora-container">

            {/* ---------------------------------------------- */}
            {/* INICIO - BOTOES DO MENU HORIZONTAL - CUIDADORA */}
            {/* -----------------------------------------------*/}

            <button 
                className="Btn-geral-cuidadora-prof btn-centralizado"
                onClick={() => navegarERecolher('/interno/UsuarioLogado')}
            >
                Inicio
            </button>

            <button 
                className="Btn-geral-cuidadora-prof btn-centralizado"
                onClick={() => navegarERecolher('/interno/Funcoes')}
            >
                Funções
            </button>

            <button 
                className="Btn-geral-cuidadora-prof btn-centralizado"
                onClick={() => navegarERecolher('/interno/Diretrizes')}
            >
                Diretrizes
            </button>

            <button 
                className={`Btn-geral-cuidadora-prof ${perfilEstaCompletoCuidadora ? '' : 'BotaoBloqueado'}`}
                onClick={() => perfilEstaCompletoCuidadora && navegarERecolher('/interno/Chamados')}
                title={!perfilEstaCompletoCuidadora 
                    ? "Complete seu perfil (Contato, Endereço, CNPJ e Formação) para liberar." 
                    : "Acessar Chamados"
                }
            >
                Chamados {!perfilEstaCompletoCuidadora && "🔒"}
            </button>

            {/* ------------------------------------------- */}
            {/* FIM - BOTOES DO MENU HORIZONTAL - CUIDADORA */}
            {/* ------------------------------------------- */}

        </div>
    );
};