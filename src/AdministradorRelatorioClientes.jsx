import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db_realtime } from './firebaseConfig.js';
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

                    return {
                        ...original,
                        id_firebase: id,
                        ordem_maestro: pesoOrdem
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

        if (clientes.length === 0) {
            alert("⚠️ Nenhum dado disponível para exportação.");
            return;
        }

        // 📝 1. Definição de Cabeçalhos
        const cabecalhos = ["ID Firebase", "Nome do Cliente", "Funcao/Plano", "Situacao"];

        // 📝 2. Mapeamento das Linhas (Extraindo dados do Dossiê)
        const linhas = clientes.map(c => [
            c.id_firebase || "---",
            c.dadosBasico?.nome || "N/A",
            c.dadosBasico?.func || "---",
            c.dadosInterno?.situ || "Ativo"
        ]);

        // 📝 3. Construção do CSV (Delimitado por ponto e vírgula para Excel PT-BR)
        const conteudoCSV = [
            cabecalhos.join(";"),
            ...linhas.map(linha => linha.join(";"))
        ].join("\n");

        // 💾 4. Criação do Link de Download
        const blob = new Blob(["\ufeff" + conteudoCSV], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Relatorio_Clientes_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("✅ 📄 Exportação de dados concluída com sucesso.");
    };
    // ---------------------------------
    // FIM - 📄 Protocolo de Exportação Maestro (PDF)
    // ---------------------------------





    return (
        <div className="adm-relatorio-container">
            <header className="adm-relatorio-header">
                <h2>Relatório Geral de Clientes 👥</h2>
                <button className="btn-exportar" onClick={handleExportarPDF}>
                    Exportar Relatório 📄
                </button>
            </header>

            <main className="adm-relatorio-content">
                {carregando ? (
                    <div className="carregando-alerta">Processando dados... ⏳</div>
                ) : (
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
                                <tr key={cliente.id_firebase || Math.random()}>
                                    <td>#{cliente.id_firebase || "---"}</td>
                                    <td className="nome-destaque">{cliente.dadosBasico?.nome || "N/A"}</td>
                                    <td>{cliente.dadosBasico?.func || "---"}</td>
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
                )}
            </main>

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