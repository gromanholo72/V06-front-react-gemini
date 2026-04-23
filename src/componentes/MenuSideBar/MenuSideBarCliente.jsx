import React, { useEffect } from 'react';
import { BalaoDicaProntuarioPaciente } from '../BalaoDica/BalaoDicaProntuarioPaciente';
import './MenuSideBarCliente.css';


export const MenuSideBarCliente = ({ 

    navegarERecolher, 
   
    dadosUsuarioBanco,

    ehComputador ,

    exibirBalaoDicaProntuarioPaciente

}) => {


    useEffect(() => {

        // console.log("");
        // console.log("📐 ----------------------------------");
        // console.log("📐 MONITOR: MenuSideBarCliente.jsx");

        // console.log("📐 cadastroCompleto: ", dadosUsuarioBanco?.dadosCadastro?.cadastroCompleto);

        // console.log("📐 contratoLiberado: ", dadosUsuarioBanco?.dadosContrato?.contratoLiberado);
        // console.log("📐 contratoAssinado: ", dadosUsuarioBanco?.dadosContrato?.contratoAssinado);
        // console.log("📐 modalidadeAtendimento: ", dadosUsuarioBanco?.dadosContrato?.modalidadeAtendimento);

        // console.log("📐 prontuarioLiberado: ", dadosUsuarioBanco?.dadosProntuario?.prontuarioLiberado);

        // console.log("📐 ----------------------------------");

    }, [dadosUsuarioBanco]);
   
    
    // 🎨 Estilo dinâmico para bloqueio de área
    const estiloListaBloqueada = {

        opacity: dadosUsuarioBanco?.dadosProntuario?.prontuarioLiberado ? 1 : 0.5,
        pointerEvents: dadosUsuarioBanco?.dadosProntuario?.prontuarioLiberado ? 'auto' : 'none',
        filter: dadosUsuarioBanco?.dadosProntuario?.prontuarioLiberado ? 'none' : 'grayscale(1)',
        cursor: dadosUsuarioBanco?.dadosProntuario?.prontuarioLiberado ? 'default' : 'not-allowed'

    };


    return (
        
        <div className={`menu-sidebar-cliente-container ${!ehComputador ? 'menu-sidebar-cliente-celular' : ''}`}>


            {ehComputador ? (
                /* 💻 Estrutura Completa para Desktop */
                <div className="menu-sidebar-paciente-header">
                    <div className="menu-sidebar-paciente-funcao">
                        <span className="titulo-setor-sidebar">
                            Prontuário do Paciente {dadosUsuarioBanco?.dadosProntuario?.prontuarioLiberado ? "" : "🔒"}
                        </span>
                    </div>
                </div>
            ) : (
                /* 📱 No Celular: Renderiza APENAS o título direto */
                <h3 className="titulo-setor-sidebar">
                   Prontuário do Paciente {dadosUsuarioBanco?.dadosProntuario?.prontuarioLiberado ? "" : "🔒"}
                </h3>
            )}
            





            <div className="lista-botoes-cliente-vertical" 
                style={estiloListaBloqueada}
            >
                






                <div className={`Btn-dica-paciente ${exibirBalaoDicaProntuarioPaciente ? 'pulsar-ativo' : ''}`}
                    style={{ 
                        position: 'relative', 
                        width: '100%', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        gap: '5px' 
                    }}
                >


                    <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteIdentificacao')}>
                        👤 Identificação <span className="menu-sidebar-cliente-icon"></span>
                    </button>


                    {/* 📐 Trava Maestro: Só exibe Endereço se for Home Care */}
                    {dadosUsuarioBanco?.dadosContrato?.modalidadeAtendimento === "Atendimento no Lar" && (
                        <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteEndereco')}>
                            📍 Endereço <span className="menu-sidebar-cliente-icon"></span>
                        </button>
                    )}


                    <button className="Btn-geral-cliente-vertical" onClick={() => navegarERecolher('/interno/PacienteRemedio')}>
                        💊 Medicamentos <span className="menu-sidebar-cliente-icon"></span>
                    </button>

                    
                    <BalaoDicaProntuarioPaciente
                        exibirBalaoDicaProntuarioPaciente={exibirBalaoDicaProntuarioPaciente}
                        descerDica={dadosUsuarioBanco?.dadosContrato?.modalidadeAtendimento === "Atendimento no Lar"}
                    />


                </div>






                <button className="Btn-geral-cliente-vertical btn-bloqueado" disabled onClick={() => navegarERecolher('/interno/PacienteHistorico')}>
                    📜 Histórico Clínico <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-vertical btn-bloqueado" disabled onClick={() => navegarERecolher('/interno/PacienteSinaisVitais')}>
                    🌡️ Sinais Vitais <span className="menu-sidebar-cliente-icon"></span>
                </button>

                <button className="Btn-geral-cliente-vertical btn-bloqueado" disabled onClick={() => navegarERecolher('/interno/PacienteAlimentacao')}>
                    🍏 Alimentação <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-vertical btn-bloqueado" disabled onClick={() => navegarERecolher('/interno/PacienteBanho')}>
                    🚿 Banho / Higiene <span className="menu-sidebar-cliente-icon"></span>
                </button>

                <button className="Btn-geral-cliente-vertical btn-bloqueado" disabled onClick={() => navegarERecolher('/interno/PacienteMobilidade')}>
                    🚶 Mobilidade / Quedas <span className="menu-sidebar-cliente-icon"></span>
                </button>

                <button className="Btn-geral-cliente-vertical btn-bloqueado" disabled onClick={() => navegarERecolher('/interno/PacienteExames')}>
                    📁 Exames / Laudos <span className="menu-sidebar-cliente-icon"></span>
                </button>
                
                <button className="Btn-geral-cliente-vertical btn-bloqueado" disabled onClick={() => navegarERecolher('/interno/PacienteEmergencia')}>
                    🚨 Emergência <span className="menu-sidebar-cliente-icon"></span>
                </button>

            </div>



        </div>
        // --------------------------------------------------------------------------------------------
        // FIM - 🧱 ESTRUTURA DA SIDEBAR: CLIENTE (PACIENTE)
        // --------------------------------------------------------------------------------------------
    );
};