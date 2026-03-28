import React, { useEffect } from 'react';
import './DetalhesCliente.css';

// ---------------------------------
// INICIO - 📐 COMPONENTE: DetalhesCliente
// ---------------------------------
export function DetalhesCliente({ usuario, aoFechar }) {
    if (!usuario) return null;

    // 📐 Mapeamento Seguro para os nós do Maestro
    const dbas = usuario.dadosBasico || {};
    const dint = usuario.dadosInterno || {};
    const dseg = usuario.dadosSeguranca || {};

    // 🚀 CONSOLE DE INSPEÇÃO MAESTRO
    useEffect(() => {
        console.log("");
        console.log("📐 -----------------------------------------------------------");
        console.log("📐 Componente: DetalhesCliente.jsx");
        console.log("📐 Funcao: Renderização de Ficha Administrativa");
        console.log("📐 Nome Alvo:", dbas.nome || "N/A");
        console.log("📐 CPF Alvo:", dbas.cpef || "N/A");
        console.log("📐 -----------------------------------------------------------");
    }, [dbas]);





    return (
        <div className="detalhes-cliente-overlay">
            <div className="detalhes-cliente-modal-card">
                
                <header className="detalhes-cliente-header-card">
                    <div className="header-info">
                        <h2>🔍 FICHA DO CLIENTE</h2>
                        <span className="id-subtitulo">ID SISTEMA: {usuario.id_firebase || "N/A"}</span>
                    </div>
                    <button className="btn-fechar-cliente" onClick={aoFechar}>&times;</button>
                </header>





                <main className="detalhes-cliente-corpo-card">

                    {/* --------------------------------- */}
                    {/* INICIO - 👤 SEÇÃO: DADOS BÁSICOS  */}
                    {/* --------------------------------- */}
                    <section className="card-cliente-secao-interna">
                        <h3 className="titulo-cliente-secao-pequeno">👤 IDENTIFICAÇÃO</h3>
                        <div className="grade-cliente-detalhes">
                            <div className="detalhe-item-cliente"><strong>NOME:</strong> <span>{dbas.nome || "N/A"}</span></div>
                            <div className="detalhe-item-cliente"><strong>CPF:</strong> <span>{dbas.cpef || "---"}</span></div>
                            <div className="detalhe-item-cliente"><strong>FUNÇÃO:</strong> <span className={`tag-badge-cliente ${dbas.func}`}>{dbas.func || "---"}</span></div>
                        </div>
                    </section>
                    {/* --------------------------------- */}
                    {/* FIM - 👤 SEÇÃO: DADOS BÁSICOS     */}
                    {/* --------------------------------- */}





                    {/* --------------------------------- */}
                    {/* INICIO - ⚙️ SEÇÃO: CONTROLE INTERNO */}
                    {/* --------------------------------- */}
                    <section className="card-cliente-secao-interna">
                        <h3 className="titulo-cliente-secao-pequeno">⚙️ CONTROLE OPERACIONAL</h3>
                        <div className="grade-cliente-detalhes">
                            <div className="detalhe-item-cliente"><strong>SITUAÇÃO:</strong> <span>{dint.situ?.toUpperCase() || "ATIVO"}</span></div>
                            <div className="detalhe-item-cliente"><strong>PERMISSÃO:</strong> <span>{dint.perm?.toUpperCase() || "BÁSICA"}</span></div>
                            <div className="detalhe-item-cliente"><strong>DATA CADASTRO:</strong> <span>{dint.datc || "---"}</span></div>
                            <div className="detalhe-item-cliente">
                                <strong>STATUS PERFIL:</strong> 
                                <span>{dint.dadosUsuarioCompleto ? "✅ CONCLUÍDO" : "⚠️ PENDENTE"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <strong>LIBERAÇÃO ADM:</strong> 
                                <span>{dint.usuarioLiberadoPeloAdministrador ? "🔓 LIBERADO" : "🔒 BLOQUEADO"}</span>
                            </div>
                        </div>
                    </section>
                    {/* --------------------------------- */}
                    {/* FIM - ⚙️ SEÇÃO: CONTROLE INTERNO   */}
                    {/* --------------------------------- */}





                    {/* --------------------------------- */}
                    {/* INICIO - 🔐 SEÇÃO: SEGURANÇA      */}
                    {/* --------------------------------- */}
                    <section className="card-cliente-secao-interna">
                        <h3 className="titulo-cliente-secao-pequeno">🔐 SEGURANÇA</h3>
                        <div className="grade-cliente-detalhes">
                            <div className="detalhe-item-cliente"><strong>SENHA ATUAL:</strong> <code>{dseg.senh || "******"}</code></div>
                        </div>
                    </section>
                    {/* --------------------------------- */}
                    {/* FIM - 🔐 SEÇÃO: SEGURANÇA         */}
                    {/* --------------------------------- */}

                </main>

                <footer className="detalhes-cliente-footer-card">
                    <button className="btn-cliente-voltar" onClick={aoFechar}>Fechar Ficha</button>
                </footer>

            </div>
        </div>
    );
}