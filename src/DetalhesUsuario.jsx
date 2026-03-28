import React from 'react';
import './DetalhesUsuario.css';

export function DetalhesUsuario({ usuario, aoFechar }) {
    if (!usuario) return null;

    // 📐 Mapeamento Seguro para os nós do Maestro
    const dadosBasico = usuario.dadosBasico || {};
    const dadosInterno = usuario.dadosInterno || {};
    const { id_firebase, ordem_maestro, ...objetoLimpo } = usuario;

    return (
        <div className="detalhes-overlay">
            <div className="detalhes-modal">
                <div className="detalhes-header">
                    <h2>🔍 Ficha Técnica do Programador</h2>
                    <button className="btn-fechar" onClick={aoFechar}>&times;</button>
                </div>
















                <div className="detalhes-corpo">





                    {/* --------------------------------------------------------- */}
                    {/* INICIO - 👤 SEÇÃO DE IDENTIFICAÇÃO                        */}
                    {/* --------------------------------------------------------- */}
                    <section className="detalhes-secao">
                        <h3>👤 Identificação de Conta</h3>
                        <div className="detalhes-grid">
                            <div className="item"><strong>CPEF:</strong> <span>{dadosBasico.cpef}</span></div>
                            <div className="item"><strong>Nome:</strong> <span>{dadosBasico.nome}</span></div>
                            <div className="item"><strong>Função:</strong> <span className={`tag-func ${dadosBasico.func}`}>{dadosBasico.func}</span></div>
                        </div>
                    </section>
                    {/* --------------------------------------------------------- */}
                    {/* FIM - 👤 SEÇÃO DE IDENTIFICAÇÃO                           */}
                    {/* --------------------------------------------------------- */}

















































                    {/* --------------------------------------------------------- */}
                    {/* INICIO - ⚙️ FLAGS DE SISTEMA                               */}
                    {/* --------------------------------------------------------- */}
                    <section className="detalhes-secao">
                        <h3>⚙️ Flags de Sistema (Firebase)</h3>
                        <div className="detalhes-grid">
                            <div className="item">
                                <strong>Cadastro Completo:</strong> 
                                <span>{dadosInterno.dadosUsuarioCompleto ? "✅ TRUE" : "❌ FALSE"}</span>
                            </div>
                            <div className="item">
                                <strong>Acesso ao Prontuário:</strong> 
                                <span>{dadosInterno.usuarioLiberadoPeloAdministrador ? "🔓 LIBERADO" : "🔒 BLOQUEADO"}</span>
                            </div>
                            <div className="item">
                                <strong>Peso de Ordenação:</strong> 
                                <span>{ordem_maestro}</span>
                            </div>
                        </div>
                    </section>
                    {/* --------------------------------------------------------- */}
                    {/* FIM - ⚙️ FLAGS DE SISTEMA                                  */}
                    {/* --------------------------------------------------------- */}








































                    {/* --------------------------------------------------------- */}
                    {/* INICIO - 📂 OBJETO COMPLETO (DEBUG)                       */}
                    {/* --------------------------------------------------------- */}
                    <section className="detalhes-secao">
                        <h3>📂 Estrutura Pura Maestro (Debug)</h3>
                        <pre className="debug-json">
                            {JSON.stringify(objetoLimpo, null, 2)}
                        </pre>
                    </section>
                    {/* --------------------------------------------------------- */}
                    {/* FIM - 📂 OBJETO COMPLETO (DEBUG)                          */}
                    {/* --------------------------------------------------------- */}




















                </div>
                
                <div className="detalhes-footer">
                    <button className="btn-voltar" onClick={aoFechar}>Voltar ao Relatório</button>
                </div>
            </div>
        </div>
    );
}