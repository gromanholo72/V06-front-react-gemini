import React, { useEffect } from 'react';
import { BalaoDicaMeuContrato } from '../BalaoDica/BalaoDicaMeuContrato';
import './MenuHorizontalCliente.css';


export const MenuHorizontalCliente = ({ 

    navegarERecolher, 

    dadosUsuarioBanco,

    ehComputador,

    exibirBalaoDicaMeuContrato

}) => {

    
  useEffect(() => {

        // console.log("");
        // console.log("📐 ----------------------------------");
        // console.log("📐 MONITOR: MenuHorizontalCliente.jsx");

        // console.log("📐 cadastroCompleto: ", dadosUsuarioBanco?.dadosCadastro?.cadastroCompleto);

        // console.log("📐 contratoLiberado: ", dadosUsuarioBanco?.dadosContrato?.contratoLiberado);
        // console.log("📐 contratoAssinado: ", dadosUsuarioBanco?.dadosContrato?.contratoAssinado);
        // console.log("📐 modalidadeAtendimento: ", dadosUsuarioBanco?.dadosContrato?.modalidadeAtendimento);

        // console.log("📐 prontuarioLiberado: ", dadosUsuarioBanco?.dadosProntuario?.prontuarioLiberado);

        // console.log("📐 ----------------------------------");

        // console.log("🔍 Valor Real Recebido :", dadosUsuarioBanco?.dadosContrato?.contratoLiberado);
        // console.log("🔍 Tipo do Valor       :", typeof dadosUsuarioBanco?.dadosContrato?.contratoLiberado);

    }, [dadosUsuarioBanco]);











    // 🎨 Estilo dinâmico para bloqueio de área
    const estiloListaBloqueada = {

        opacity: dadosUsuarioBanco?.dadosContrato?.contratoLiberado ? 1 : 0.5,
        pointerEvents: 'auto', // Liberado para que o cursor 'not-allowed' funcione visualmente
        filter: dadosUsuarioBanco?.dadosContrato?.contratoLiberado ? 'none' : 'grayscale(1)',
        cursor: dadosUsuarioBanco?.dadosContrato?.contratoLiberado ? 'pointer' : 'not-allowed'

    };



    return (

        <div className={`menu-horizontal-cliente-container ${!ehComputador ? 'menu-horizontal-cliente-celular' : ''}`}>


            {/* Só aparece no Mobile quando aberto */}
            {!ehComputador && (
                <h3 className="titulo-menu-mobile">Menu Geral</h3>
            )}


            {/* Wrapper para garantir alinhamento horizontal dos botões */}
            <div className="lista-botoes-cliente-horizontal">


                <button 
                    className="Btn-geral-cliente-horizontal"
                    onClick={() => navegarERecolher('/interno/UsuarioLogado')}
                >
                    Inicio
                </button>


                <button 
                    className="Btn-geral-cliente-horizontal" 
                    onClick={() => navegarERecolher('/interno/ClienteApresentacaoEmpresa')}
                >
                    Empresa
                </button>


                <button 
                    className="Btn-geral-cliente-horizontal" 
                    onClick={() => navegarERecolher('/interno/Diretrizes')}
                >
                    Diretrizes
                </button>






                <div style={{ 
                    position: 'relative', 
                    flex: 1,            
                    display: 'flex',   
                    width: '100%'       
                }}>

                    <button className={`Btn-geral-cliente-horizontal ${exibirBalaoDicaMeuContrato ? 'pulsar-ativo' : ''}`} 
                        style={estiloListaBloqueada}
                        onClick={() => {
                            if (dadosUsuarioBanco?.dadosContrato?.contratoLiberado) {
                                navegarERecolher('/interno/ClienteContrato');
                            }
                        }}
                    >
                        Contrato
                    </button>

                    <BalaoDicaMeuContrato 
                        exibirBalaoDicaMeuContrato={exibirBalaoDicaMeuContrato} 
                    />

                </div>








            </div>



        </div>
    );
};