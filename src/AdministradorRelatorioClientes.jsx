import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db_realtime } from './firebaseConfig';
import { DetalhesCliente } from './DetalhesCliente';
import './AdministradorRelatorioClientes.css';

/* 🧭 INICIO - RELATÓRIO DE CLIENTES (V3) */

export function AdministradorRelatorioClientes() {

    const [clientes, setClientes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    // 🚀 CONSOLE DE INSPEÇÃO MAESTRO
    useEffect(() => {

        console.log("");
        console.log("🔍 -----------------------------------------------------------");
        console.log("🔍 MONITOR: Relatório de Clientes");
        console.log("🔍 Status Carregamento:", carregando ? "⏳ Pendente" : "✅ Finalizado");
        console.log("🔍 Total de Clientes:", clientes.length);
        console.log("🔍 -----------------------------------------------------------");

    }, [carregando, clientes]);

    // ---------------------------------
    // FIM - 📐 Monitoramento de Dados Maestro
    // ---------------------------------









    // ---------------------------------
    // INICIO - 📡 Busca de Dados na Antena Central (Firebase)
    // ---------------------------------
    useEffect(() => {

        if (!db_realtime) return;

        const caminhoDb = ref(db_realtime, 'usuarios');
        
        const unsubscribe = onValue(caminhoDb, (snapshot) => {

            const dados = snapshot.val();

            console.log("");
            console.log("✨ 🛡️ --------------------------------------");
            console.log("✨ 🛡️ AdministradorRelatorioClientes.jsx - useEffect");
            console.log("✨ 🛡️ dados:", dados);


            if (dados) {

                const listaFormatada = Object.keys(dados).map(id => {
                    
                    const original = dados[id];
                    
                    // 📐 Extração de metadados para ordenação e filtro
                    const funcao = original.dadosBasico?.func || original.func || "";

                    let pesoOrdem = 99;
                    if (funcao === 'administrador') pesoOrdem = 1;
                    if (funcao === 'cuidadora') pesoOrdem = 2;
                    if (funcao === 'cliente') pesoOrdem = 3;

                    // 📐 PADRÃO CAD-ADMINISTRADOR: Extração de Data e Hora
                    const timestamp = original.timestamp || original.dadosInterno?.timestamp || 0;

                    return {
                        ...original,
                        id_firebase: id,
                        ordem_maestro: pesoOrdem,
                        datcExibicao: timestamp ? new Date(timestamp).toLocaleDateString('pt-BR') : (original.dadosInterno?.datc || "N/A"),
                        horaExibicao: timestamp ? new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ""
                    };
                })
                .filter(u => u.ordem_maestro === 3)
                .sort((a, b) => a.ordem_maestro - b.ordem_maestro);

                console.log("");
                console.log("✨ 🛡️ --------------------------------------");
                console.log("✨ 🛡️ AdministradorRelatorioClientes.jsx - useEffect");
                console.log("✨ 🛡️ FILTRO: Apenas Clientes Detectados (Ordem 3)");
                console.log("✨ 🛡️ Lista de Clientes:", listaFormatada);
                console.log("✨ 🛡️ --------------------------------------");

                setClientes(listaFormatada);
            } else {
                setClientes([]);
            }
            
            setCarregando(false);
        });

        return () => {
            unsubscribe();
        };
    }, []);
    // ---------------------------------
    // FIM - 📡 Busca de Dados na Antena Central (Firebase)
    // ---------------------------------







    






    // ---------------------------------
    // INICIO - 📄 Protocolo de Exportação Maestro (PDF)
    // ---------------------------------
    const handleExportarPDF = () => {
        console.log("");
        console.log("📐 -----------------------------------------------------------");
        console.log("📐 Componente: AdministradorRelatorioClientes.jsx");
        console.log("📐 Funcao: handleExportarPDF()");
        console.log("📐 Ação: Disparando motor de exportação de dados.");
        console.log("📐 Quantidade de registros no lote:", clientes.length);
        console.log("📐 -----------------------------------------------------------");

        alert('Gerando PDF...');
    };
    // ---------------------------------
    // FIM - 📄 Protocolo de Exportação Maestro (PDF)
    // ---------------------------------





    return (
        <div className="relatorio-cliente-principal">
            <div className="relatorio-cliente-suporte">
                
                <header className="relatorio-cliente-header">
                    <h2>👥 Relatório Geral de Clientes</h2>
                    {/* 📐 Botão de exportação movido para o header conforme padrão Cuidadoras */}
                    <button className="relatorio-cliente-btn-pdf" onClick={handleExportarPDF}>
                        Gerar PDF
                    </button>
                </header>

                {carregando ? (
                    <p style={{ padding: '60px', textAlign: 'center', fontWeight: 'bold', color: 'rgb(212, 175, 55)' }}>
                        ⏳ Sincronizando base de clientes com a Antena Central...
                    </p>
                ) : (

                    <div className="relatorio-cliente-tabela-container">
                        <table className="relatorio-cliente-tabela">
                            <thead>
                                <tr>
                                    <th className="adm-relatorio-col-nome">👤 Nome</th>
                                    <th className="adm-relatorio-col-cadastro">🛡️ Cadastro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientes.length > 0 ? (
                                    clientes.map((cliente) => (
                                        <tr 
                                            key={cliente.id_firebase} 
                                            onClick={() => {
                                                console.log("");
                                                console.log("📐 -----------------------------------------------------------");
                                                console.log("📐 EVENTO: Clique na linha da tabela (Cliente)");
                                                console.log("📐 Alvo Selecionado:", cliente.dadosBasico?.nome?.toUpperCase() || "N/A");
                                                console.log("📐 ID Firebase:", cliente.id_firebase);
                                                console.log("📐 -----------------------------------------------------------");

                                                setUsuarioSelecionado(cliente);
                                            }} 
                                        >
                                            <td className="nome-destaque">
                                                {cliente.dadosBasico?.nome?.toUpperCase() || "N/A"}
                                            </td>

                                            <td className="adm-relatorio-col-cadastro">
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
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                                            🚫 Nenhum cliente cadastrado no momento.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* 🚀 MODAL DE DETALHES (PADRÃO MAESTRO) */}
            {usuarioSelecionado && (
                <DetalhesCliente 
                    usuario={usuarioSelecionado} 
                    aoFechar={() => setUsuarioSelecionado(null)} 
                />
            )}
        </div>
    );
}