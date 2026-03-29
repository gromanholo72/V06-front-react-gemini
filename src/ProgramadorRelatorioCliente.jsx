import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database"; 
import { db_realtime } from './firebaseConfig';
import { useAuth } from './AutenticacaoContexto';
import { DetalhesUsuario } from './DetalhesUsuario';
import './ProgramadorRelatorioCliente.css'; 

// ---------------------------------
// INICIO - 📐 COMPONENTE: ProgramadorRelatorioCliente
// ---------------------------------
export function ProgramadorRelatorioCliente() {
    const { socket } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    // ---------------------------------
    // INICIO - 📐 Monitoramento de Dados Maestro
    // ---------------------------------
    useEffect(() => {
        console.log("");
        console.log("📐 -----------------------------------------------------------");
        console.log("📐 Componente: ProgramadorRelatorioCliente.jsx");
        console.log("📐 Funcao: useEffect (Monitoramento)");
        console.log("📐 Status Carregamento:", carregando ? "⏳ Pendente" : "✅ Finalizado");
        console.log("📐 Total de Usuarios no Dossiê:", usuarios.length);
        console.log("📐 -----------------------------------------------------------");
    }, [usuarios, carregando]);
    // ---------------------------------
    // FIM - 📐 Monitoramento de Dados Maestro
    // ---------------------------------





    // ---------------------------------
    // INICIO - 📡 Busca de Dados na Antena Central (Firebase)
    // ---------------------------------
    useEffect(() => {
        if (!db_realtime) return;

        console.log("");
        console.log("✨ 📡 ----------------------------------");
        console.log("✨ 📡 ProgramadorRelatorioCliente.jsx: Ligando rádio de escuta...");
        
        const caminhoUsuarios = ref(db_realtime, 'usuarios');
        
        const unsubscribe = onValue(caminhoUsuarios, (snapshot) => {
            const dados = snapshot.val();
            
            if (dados) {
                // 📐 Mapeamento técnico para visualização do Programador
                const listaFormatada = Object.keys(dados).map(id => ({
                    id_firebase: String(id),
                    ...dados[id]
                }));
                setUsuarios(listaFormatada);
            } else {
                setUsuarios([]);
            }
            setCarregando(false);
            
            console.log("✨ 📡 Dados recebidos e formatados com sucesso.");
        });

        return () => {
            console.log("✨ 📡 Desligando rádio de escuta (Clean-up).");
            unsubscribe();
        };
    }, [db_realtime]);
    // ---------------------------------
    // FIM - 📡 Busca de Dados na Antena Central (Firebase)
    // ---------------------------------









    // ---------------------------------
    // INICIO - 📄 Protocolo de Exportação Maestro (PDF)
    // ---------------------------------
    const handleExportarPDF = () => {
        console.log("");
        console.log("📐 -----------------------------------------------------------");
        console.log("📐 Componente: ProgramadorRelatorioCliente.jsx");
        console.log("📐 Funcao: handleExportarPDF()");
        console.log("📐 Ação: Disparando motor de exportação de dados.");
        console.log("📐 Quantidade de registros no lote:", usuarios.length);
        console.log("📐 -----------------------------------------------------------");

        alert('Gerando PDF...');
    };
    // ---------------------------------
    // FIM - 📄 Protocolo de Exportação Maestro (PDF)
    // ---------------------------------





    return (
        <div className="componente-de-pagina">
            <div className="rel-clientes-suporte">
                <header className="rel-clientes-header">
                    <h2>Relatório Técnico de Usuários 🖥️</h2>
                    <div className="controles-programador">
                        <span className="badge-tecnica">MODO: PROGRAMADOR</span>
                        <button className="btn-exportar" onClick={handleExportarPDF}>
                            Exportar PDF 📄
                        </button>
                    </div>
                </header>

                <main className="rel-clientes-tabela-container">
                    {carregando ? (
                        <div className="carregando-alerta">Acessando Antena Central... ⏳</div>
                    ) : (
                        <table className="rel-clientes-tabela">
                            <thead>
                                <tr>
                                    <th>ID Firebase</th>
                                    <th>Nome</th>
                                    <th>CPF (CPEF)</th>
                                    <th>Função</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map(user => (
                                    <tr key={String(user.id_firebase || Math.random())}>
                                        <td><code>{String(user.id_firebase).substring(0, 14)}</code></td>
                                        <td className="nome-destaque">{user.dadosBasico?.nome || user.nome || "N/A"}</td>
                                        <td>{user.dadosBasico?.cpef || user.cpef || "---"}</td>
                                        <td>
                                            <span className={`tag-func ${user.dadosBasico?.func || user.func}`}>
                                                {user.dadosBasico?.func || user.func}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-pill ${user.dadosInterno?.situ || "ativo"}`}>
                                                {user.dadosInterno?.situ || "Ativo"}
                                            </span>
                                        </td>
                                        <td>
                                            <button className="btn-visualizar" onClick={() => setUsuarioSelecionado(user)}>
                                                🔍 Inspecionar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </main>
            </div>

            {/* 🚀 MODAL DE DETALHES TÉCNICOS */}
            {usuarioSelecionado && (
                <DetalhesUsuario 
                    usuario={usuarioSelecionado} 
                    aoFechar={() => setUsuarioSelecionado(null)} 
                />
            )}
        </div>
    );
}
// ---------------------------------
// FIM - 📐 COMPONENTE: ProgramadorRelatorioCliente
// ---------------------------------