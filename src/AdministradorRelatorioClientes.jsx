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
        <div className="componente-de-pagina adm-relatorio-principal">
            <div className="adm-relatorio-suporte">
                
                <div className="adm-relatorio-usuario-card">
                    
                    <header className="adm-relatorio-header">
                        <h2>Relatório Geral de Clientes 👥</h2>
                        <button className="btn-exportar" onClick={handleExportarPDF}>
                            Gerar PDF
                        </button>
                    </header>

                    <main className="adm-relatorio-content">
                        {carregando ? (
                            <div className="carregando-alerta">Processando dados... ⏳</div>
                        ) : (
                            <div className="adm-relatorio-tabela-responsiva">
                                <table className="adm-relatorio-tabela">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Plano</th>
                                            <th>Status</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clientes.map(cliente => (
                                            <tr 
                                                key={String(cliente.id_firebase || Math.random())}
                                                onClick={() => setUsuarioSelecionado(cliente)}
                                            >
                                                <td>#{cliente.id_firebase ? String(cliente.id_firebase).substring(0, 14) : "---"}</td>
                                                <td className="nome-destaque">{cliente.dadosBasico?.nome?.toUpperCase() || "N/A"}</td>
                                                <td style={{textTransform: 'capitalize'}}>{cliente.dadosBasico?.func || "---"}</td>
                                                <td>
                                                    <span className={`status-pill ${cliente.dadosInterno?.situ?.toLowerCase() || 'ativo'}`}>
                                                        {cliente.dadosInterno?.situ || "Ativo"}
                                                    </span>
                                                </td>
                                                <td>
                                                    <button 
                                            className="btn-visualizar"
                                            onClick={() => setUsuarioSelecionado(cliente)}
                                        >
                                            👁️ Ver Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                            </div>
                        )}
                    </main>

                </div>

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