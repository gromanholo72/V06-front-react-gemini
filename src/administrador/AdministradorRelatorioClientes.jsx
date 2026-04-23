import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";

import { useAuth } from '../AutenticacaoContexto.jsx';

import { DetalhesCliente } from './DetalhesCliente';
import { DetalhesClienteContrato } from './DetalhesClienteContrato';

import './AdministradorRelatorioClientes.css';



export function AdministradorRelatorioClientes() {

    const { db_realtime, usuarioSelecionadoContrato, setUsuarioSelecionadoContrato } = useAuth();

    const [carregando, setCarregando] = useState(true);
    const [clientes, setClientes] = useState([]);
    
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

   





    // --------------------------------
    // FIM - 📐 - Monitoramento de dados iniciais
    // --------------------------------

    // useEffect(() => {

    //     console.log("");
    //     console.log("");
    //     console.log("🔍 ------------------------------");
    //     console.log("🔍 MONITOR: RELATÓRIO DE CLIENTES");
    //     console.log("🔍 Arquivo : AdministradorRelatorioCliente.jsx");
    //     console.log("🔍 Status Carregando :", carregando);
    //     console.log("🔍 Total de Clientes :", clientes.length);
    //     console.log("🔍 Usuário Selecionado:", usuarioSelecionado);
        
    //     if (usuarioSelecionado) {
    //         console.log("🔍 ID Selecionado    :", usuarioSelecionado.id_firebase);
    //         console.log("🔍 Nome Selecionado  :", usuarioSelecionado.nome);
    //     }
    //     console.log("🔍 ------------------------------");

    // }, [carregando, clientes]);

    // --------------------------------
    // FIM - 📐 Monitoramento de dados iniciais
    // --------------------------------










    // ---------------------------------
    // INICIO - 📡 Busca de Dados no Firebase
    // ---------------------------------

    useEffect(() => {

        if (!db_realtime) return;

        const caminho_firebase = ref(db_realtime, 'usuarios');
        
        const unsubscribe = onValue(caminho_firebase, (snapshot) => {

            const dados_firebase = snapshot.val();

            console.log("");
            console.log("🔥 -----------------------------------------");
            console.log("🔥 CARREGANDO DADOS AUTOMATICAMENTE NO FIREBASE");
            console.log("🔥 AdministradorRelatorioClientes.jsx");
            console.log("🔥 dados_firebase:", dados_firebase);
            console.log("🔥 -----------------------------------------");

            if (dados_firebase) {

                const listaFormatada = Object.keys(dados_firebase).map(id => {
                    
                    const dados = dados_firebase[id];
                    
                    const funcao = dados.dadosBasico?.func || dados.func || "";

                    let pesoOrdem = 99;
                    if (funcao === 'administrador') pesoOrdem = 1;
                    if (funcao === 'cuidadora') pesoOrdem = 2;
                    if (funcao === 'cliente') pesoOrdem = 3;

                    // 📐 PADRÃO CAD-ADMINISTRADOR: Extração de Data e Hora
                    const timestamp = dados.timestamp || dados.dadosInterno?.timestamp || 0;

                    return {
                        ...dados,
                        id_firebase: id,
                        ordem_maestro: pesoOrdem,
                        timestampOrdem: timestamp,
                        datcExibicao: timestamp ? new Date(timestamp).toLocaleDateString('pt-BR') : (dados.dadosInterno?.datc || "N/A"),
                        horaExibicao: timestamp ? new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ""
                    };
                })

                // 🎯 Filtro exclusivo para Clientes - Ordenação: Mais antigos no topo (Crescente)
                .filter(u => u.ordem_maestro === 3)
                .sort((a, b) => a.timestampOrdem - b.timestampOrdem);

                console.log("");
                console.log("🔥 👤 --------------------------------------");
                console.log("🔥 👤 AdministradorRelatorioClientes.jsx - useEffect");
                console.log("🔥 👤 FILTRO: Apenas Clientes Detectados (Ordem 3)");
                console.log("🔥 👤 listaFormatada:", listaFormatada);
                console.log("🔥 👤 --------------------------------------");

                setClientes(listaFormatada);

            } else {
                
                setClientes([]);

            }
            
            setCarregando(false);

        });

        return () => unsubscribe();

    }, [db_realtime]);

    // ---------------------------------
    // FIM - 📡 Busca de Dados no Firebase 
    // ---------------------------------












    // ---------------------------------
    // INICIO - 🔄 SO PRA USUARIO SELECIONADO - SINCRONIA DE SELEÇÃO VIVA (MAESTRO)
    // ---------------------------------

    useEffect(() => {

        if (!usuarioSelecionado) return;

        console.log("");
        console.log("🔄 📐 ----------------------------------");
        console.log("🔄 📐 SINCRONIA VIVA (MAESTRO) - EXECUTANDO");
        console.log("🔄 📐 usuarioSelecionado (ID):", usuarioSelecionado?.id_firebase);
        console.log("🔄 📐 clientes (Total sincronizado):", clientes.length);

        // 🔍 Busca a versão mais recente do cliente na lista atualizada pelo Firebase
        const usuarioVivo = clientes.find(c => c.id_firebase === usuarioSelecionado.id_firebase);

        console.log("🔄 📐 usuarioVivo localizado:", usuarioVivo ? "✅ SIM" : "❌ NÃO");

        // ✨ Se os dados mudaram (ex: autorizadoAdministrador), atualizamos a ficha aberta
        if (usuarioVivo && JSON.stringify(usuarioVivo) !== JSON.stringify(usuarioSelecionado)) {
            console.log("🔄 📐 ✨ DADOS ALTERADOS NO FIREBASE! Sincronizando modal de detalhes...");
            setUsuarioSelecionado(usuarioVivo);
        }

        console.log("🔄 📐 ----------------------------------");

    }, [clientes, usuarioSelecionado]);

    // ---------------------------------
    // FIM - 🔄 SO PRA USUARIO SELECIONADO - SINCRONIA DE SELEÇÃO VIVA (MAESTRO)
    // ---------------------------------










    // ---------------------------------
    // INICIO - 📄 Protocolo de Exportação (PDF)
    // ---------------------------------

    const handleExportarPDF = () => {
        console.log("");
        console.log("📐 ---------------------------------------------");
        console.log("📐 Componente: AdministradorRelatorioClientes.jsx");
        console.log("📐 Funcao: handleExportarPDF()");
        console.log("📐 Ação: Disparando motor de exportação de dados.");
        console.log("📐 Quantidade de registros no lote:", clientes.length);
        console.log("📐 ---------------------------------------------");
        
        alert('Gerando PDF...');

    };

    // ---------------------------------
    // FIM - 📄 Protocolo de Exportação (PDF)
    // ---------------------------------


    return (





        <div className="relatorio-cliente-principal">

            <div className="relatorio-cliente-suporte">
                
                <header className="relatorio-cliente-header">

                    <h2>👥 Relatório Geral de Clientes</h2>
                
                    <button className="relatorio-cliente-btn-pdf" onClick={handleExportarPDF}>
                        Gerar PDF
                    </button>

                </header>

                {carregando ? (

                    <p className="relatorio-cliente-loading">
                        ⏳ Sincronizando clientes com o banco de dados...
                    </p>

                ) : (

                    <div className="relatorio-cliente-tabela-container">
                        <table className="relatorio-cliente-tabela">
                            <thead>
                                <tr>
                                    <th className="adm-relatorio-col-nome">Nome</th>
                                    <th className="adm-relatorio-col-nome">CPF</th>  
                                    <th className="adm-relatorio-col-nome">Data de cadastro</th>
                                    {/* <th className="adm-relatorio-col-cadastro">Cadastro</th> */}
                                    <th className="adm-relatorio-col-nome"> Contrato</th>
                                </tr>
                            </thead>
                            <tbody>

                                {clientes.length > 0 ? (

                                    clientes.map((cliente) => (

                                        < tr key={cliente.id_firebase} className="relatorio-cliente-linha" >




                                            {/* -------------------------------------- */}
                                            {/* INICIO - COLUNA NOME DO CLIENTE */}
                                            {/* -------------------------------------- */}

                                            <td className="nome-destaque">
                                                {cliente.dadosBasico?.nome?.toUpperCase() || "N/A"}
                                            </td>

                                            {/* -------------------------------------- */}
                                            {/* FIM - COLUNA NOME DO CLIENTE */}
                                            {/* -------------------------------------- */}






                                            {/* -------------------------------------- */}
                                            {/* INICIO - COLUNA CPF DO CLIENTE */}
                                            {/* -------------------------------------- */}

                                            <td className="nome-destaque">
                                                {cliente.dadosBasico?.cpef || "N/A"}
                                            </td>

                                            {/* -------------------------------------- */}
                                            {/* FIM - COLUNA CPF DO CLIENTE */}
                                            {/* -------------------------------------- */}






                                            {/* -------------------------------------- */}
                                            {/* INICIO - COLUNA DATA E HORA DE CADASTRO DO CLIENTE */}
                                            {/* -------------------------------------- */}

                                            <td className="nome-destaque">
                                                {cliente.datcExibicao}
                                                <small style={{ color: '#888', fontSize: '0.8em', marginLeft: '5px' }}>
                                                    às {cliente.horaExibicao}
                                                </small>
                                            </td>

                                            {/* -------------------------------------- */}
                                            {/* FIM - COLUNA DATA E HORA DE CADASTRO DO CLIENTE */}
                                            {/* -------------------------------------- */}







                                            {/* -------------------------------------- */}
                                            {/* INICIO - CONFIRMAR CADASTRO DO CLIENTE */}
                                            {/* -------------------------------------- */}

                                            {/* <td className="adm-relatorio-col-cadastro"
                                            
                                                onClick={(e) => {

                                                    e.stopPropagation(); 

                                                    if (cliente.dadosCadastro?.perfilCompleto !== true) {
                                                        console.log("");
                                                        console.log("📐 🛑 -----------------------------------------------------------");
                                                        console.log("📐 🛑 BLOQUEIO: Cadastro Pendente (Clique no Botão)");
                                                        console.log("📐 🛑 Motivo: Perfil incompleto no banco.");
                                                        console.log("📐 🛑 -----------------------------------------------------------");
                                                        alert("⏳ Cadastro Pendente!\n\nEste cliente ainda não completou os dados obrigatórios.");
                                                        return;
                                                    }

                                                    console.log("");
                                                    console.log("🔍 -----------------------------------------------------------");
                                                    console.log("🔍 EVENTO: onClick - Abertura de Detalhes via Coluna Cadastro");
                                                    console.log("🔍 EVENTO: Abertura de Detalhes via Coluna Cadastro");
                                                    console.log("🔍 Cliente:", cliente.dadosBasico?.nome?.toUpperCase());
                                                    console.log("🔍 ID Firebase:", cliente.id_firebase);
                                                    console.log("🔍 -----------------------------------------------------------");

                                                    setUsuarioSelecionado(cliente);

                                                }}
                                              
                                            >

                                                {cliente.dadosCadastro?.autorizadoAdministrador === true ? (

                                                    <span className="relatorio-cliente-tag-autorizado">
                                                        <span>✅</span> <span>Confirmado</span>
                                                    </span>

                                                ) : cliente.dadosCadastro?.perfilCompleto === true ? (

                                                    <span className="relatorio-cliente-tag-confirmar">
                                                        <span>🌌</span> <span>Confirmar</span>
                                                    </span>

                                                ) : (

                                                    <span className="relatorio-cliente-tag-pendente">
                                                        <span>⏳</span> <span>Pendente</span>
                                                    </span>

                                                )}
                                                
                                            </td> */}

                                            {/* ----------------------------------- */}
                                            {/* FIM - CONFIRMAR CADASTRO DO CLIENTE */}
                                            {/* ----------------------------------- */}








                                            {/* ---------------------------------------- */}
                                            {/* INICIO - LIBERAR CONTRATO PARA O CLIENTE */}
                                            {/* ---------------------------------------- */}

                                            <td className="adm-relatorio-col-contrato"
                                        
                                                onClick={(e) => {

                                                    e.stopPropagation(); 

                                                    // 🛡️ Bloqueio Maestro: Se o perfil estiver pendente, não abre
                                                    if (cliente.dadosCadastro?.cadastroCompleto !== true) {

                                                        console.log("");
                                                        console.log("📐 🛑 -----------------------------------------------------------");
                                                        console.log("📐 🛑 BLOQUEIO: Cadastro Pendente (Clique no Botão)");
                                                        console.log("📐 🛑 Motivo: Caastro incompleto no banco.");
                                                        console.log("📐 🛑 -----------------------------------------------------------");

                                                        alert("⏳ Cadastro Pendente! Este cliente ainda não completou os dados obrigatórios de cadastro.");
                                                        return;
                                                    }

                                                    // 🚀 Se passou na validação, abre o Modal
                                                    console.log("");
                                                    console.log("🔍 -----------------------------------------------------------");
                                                    console.log("🔍 EVENTO: Abertura de Detalhes via Coluna Cadastro");
                                                    console.log("🔍 id_firebase:", cliente.id_firebase);
                                                    console.log("🔍 dadosBasico?.nome:", cliente.dadosBasico?.nome);
                                                    console.log("🔍 dadosCadastro?.cadastroCompleto:", cliente.dadosCadastro?.cadastroCompleto);
                                                    console.log("🔍 dadosContrato?.contratoLiberado:", cliente.dadosContrato?.contratoLiberado);
                                                    console.log("🔍 -----------------------------------------------------------");

                                                    setUsuarioSelecionadoContrato(cliente);

                                                }}

                                            >

                                                {cliente.dadosContrato?.contratoLiberado === true ? (

                                                    <span className="relatorio-cliente-tag-autorizado">
                                                        <span>✅</span> <span>Liberado</span>
                                                    </span>

                                                ) : cliente.dadosCadastro?.cadastroCompleto === true ? (

                                                    <span className="relatorio-cliente-tag-confirmar">
                                                        <span>🌌</span> <span>Liberar</span>
                                                    </span>

                                                ) : (

                                                    <span className="relatorio-cliente-tag-pendente">
                                                        <span>⏳</span> <span>Bloqueado</span>
                                                    </span>

                                                )}

                                            </td>

                                            {/* ---------------------------------------- */}
                                            {/* FIM - LIBERAR CONTRATO PARA O CLIENTE */}
                                            {/* ---------------------------------------- */}






                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="5" style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                                            🚫 Nenhum cliente cadastrado no momento.
                                        </td>
                                    </tr>
                                    
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                )}
            </div>





            {/* 🚀 MODAL DE DETALHES CLIENTE CADASTRO */}
            {usuarioSelecionado && (
                <DetalhesCliente 
                    usuario={usuarioSelecionado} 
                    aoFechar={() => setUsuarioSelecionado(null)} 
                />
            )}


            {/* 🚀 MODAL DE DETALHES CLIENTE CADASTRO */}
            {usuarioSelecionadoContrato && (
                <DetalhesClienteContrato 
                    usuario={usuarioSelecionadoContrato} 
                    aoFechar={() => setUsuarioSelecionadoContrato(null)} 
                />
            )}




        </div>





    );
}