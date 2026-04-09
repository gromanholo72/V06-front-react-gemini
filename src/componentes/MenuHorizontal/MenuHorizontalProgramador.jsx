import React, { useEffect } from 'react';
import './MenuHorizontalProgramador.css';

// 🏗️ Componente: MenuHorizontalProgramador (Padronizado Maestro)
export const MenuHorizontalProgramador = ({
    navegarERecolher,
    lidarComClique,
    secaoAberta,
    ehComputador // Adicionado para responsividade
}) => {

    // ---------------------------------
    // INICIO - ✨ Monitor de Propriedades (Inspeção Maestro)
    // ---------------------------------
    useEffect(() => {
        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ MenuHorizontalProgramador.jsx");
        console.log("✨ secaoAberta             :", secaoAberta);
        // console.log("✨ navegarERecolher        :", navegarERecolher);
        // console.log("✨ lidarComClique          :", lidarComClique); // Comentado para evitar poluir o console
        console.log("✨ ehComputador            :", ehComputador);
        console.log("✨ ----------------------------------");
    }, [secaoAberta, navegarERecolher, lidarComClique, ehComputador]);

    // ---------------------------------
    // FIM - ✨ Monitor de Propriedades
    // ---------------------------------

    return (
        <div className={`menu-horizontal-programador-container ${!ehComputador ? 'menu-horizontal-programador-ativo' : ''}`}>


            {/* 🏷️ Título condicional: Só aparece no Mobile quando aberto */}
            {!ehComputador && (
                <h3 className="titulo-menu-mobile">Menu Geral</h3>
            )}



            {/* ------------------------------------ */}
            {/* INICIO - BOTOES COMUNS - PROGRAMADOR */}
            {/* ------------------------------------ */}

            <button className="Btn-geral-programador-prof btn-centralizado"
                onClick={() => navegarERecolher('/interno/UsuarioLogado')}
            >
                Inicio
            </button>

            {/* ------------------------------------ */}
            {/* FIM - BOTOES COMUNS - PROGRAMADOR */}
            {/* ------------------------------------ */}





            {/* ----------------------------------------- */}
            {/* INICIO - SUBMENU HORIZONTAL - PROGRAMADOR */}
            {/* ----------------------------------------- */}

            <div className="submenu-tudo-cadastrar-prof">
                <button
                    className="Btn-geral-programador-prof"
                    onClick={(e) => lidarComClique(e, 'cadastrar')}
                    aria-expanded={secaoAberta === 'cadastrar'}
                >
                    Cadastrar
                    <span className="icone-seta">
                        {secaoAberta === 'cadastrar' ? "🔼" : "🔽"}
                    </span>
                </button>

                {/* 🚀 O Submenu não tem mais o && para permitir a animação de saída */}
                <div className={`submenu-flutuante-cadastrar-prof ${secaoAberta === 'cadastrar' ? 'aberto' : 'fechado'}`}>

                    <button onClick={() => navegarERecolher('/interno/CadAdministrador')}>
                        Administrador
                    </button>

                </div>
            </div>

            {/* ----------------------------------------- */}
            {/* FIM - SUBMENU HORIZONTAL - PROGRAMADOR */}
            {/* ----------------------------------------- */}



        </div>
    );
};