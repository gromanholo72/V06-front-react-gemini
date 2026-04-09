import React, { useEffect } from 'react';
import './MenuHorizontalCliente.css';

// 🏗️ Componente: MenuHorizontalCliente (Padronizado Maestro)
export const MenuHorizontalCliente = ({ 
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
        console.log("✨ MenuHorizontalCliente.jsx");
        console.log("✨ ehComputador            :", ehComputador);
        console.log("✨ autorizadoAdministrador :", autorizadoAdministrador);
        // console.log("✨ navegarERecolher        :", navegarERecolher);
        console.log("✨ ----------------------------------");
    }, [ehComputador, autorizadoAdministrador, navegarERecolher]);

    // ---------------------------------
    // FIM - ✨ Monitor de Propriedades
    // ---------------------------------

    return (
        <div className={`menu-horizontal-cliente-container ${!ehComputador ? 'menu-horizontal-cliente-celular' : ''}`}>



            {/* 🏷️ Título condicional: Só aparece no Mobile quando aberto */}
            {!ehComputador && (
                <h3 className="titulo-menu-mobile">Menu Geral</h3>
            )}



            {/* 🧱 Wrapper para garantir alinhamento horizontal dos botões */}
            <div className="lista-botoes-cliente-horizontal">

                <button 
                    className="Btn-geral-cliente-horizontal"
                    onClick={() => navegarERecolher('/interno/UsuarioLogado')}
                >
                    Inicio
                </button>

                <button 
                    className="Btn-geral-cliente-horizontal" 
                    onClick={() => navegarERecolher('/interno/PacienteApresentacaoEmpresa')}
                >
                    Empresa
                </button>

                <button 
                    className="Btn-geral-cliente-horizontal" 
                    onClick={() => navegarERecolher('/interno/Diretrizes')}
                >
                    Diretrizes
                </button>

                <button 
                    className="Btn-geral-cliente-horizontal" 
                    style={{
                        opacity: autorizadoAdministrador ? 1 : 0.5,
                        pointerEvents: autorizadoAdministrador ? 'auto' : 'none',
                        filter: autorizadoAdministrador ? 'none' : 'grayscale(1)',
                        cursor: autorizadoAdministrador ? 'default' : 'not-allowed'
                    }}
                    onClick={() => navegarERecolher('/interno/clienteContrato')}
                >
                    Contrato
                </button>
            </div>




        </div>
    );
};