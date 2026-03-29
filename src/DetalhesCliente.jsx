import React from 'react';
import './DetalhesCliente.css';

/* ------------------------------------------------------------- */
/* INICIO - 🔎 COMPONENTE: DetalhesCliente (FICHA DO CLIENTE)    */
/* ------------------------------------------------------------- */

export function DetalhesCliente({ usuario, aoFechar }) {
    if (!usuario) return null;

    // 📐 Mapeamento Seguro Maestro (Protocolo V3)
    const dBasico = usuario.dadosBasico || {};
    const dInterno = usuario.dadosInterno || {};
    const dSeguranca = usuario.dadosSeguranca || {};
    
    // Extração do ID Limpo (Apenas números do CPF para ID de Sistema)
    const idSistema = dBasico.cpef ? dBasico.cpef.replace(/\D/g, "") : "---";



    return (
        <div className="detalhes-cliente-overlay">



            {/* -------------------------------- */}
            {/* INICIO - FICHA RESUMO CLIENTE    */}
            {/* -------------------------------- */}

            <div className="detalhes-cliente-modal-card">
                



                {/* ----------------------------------------- */}
                {/* INICIO - FICHA RESUMO CLIENTE - TITULO    */}
                {/* ----------------------------------------- */}

                <header className="detalhes-cliente-header-card">
                    <div className="header-info-texto">
                        <h2>🔍 FICHA DO CLIENTE</h2>
                        <span className="id-subtitulo">ID SISTEMA: {idSistema}</span>
                    </div>
                    <button className="btn-fechar-cliente" onClick={aoFechar}>&times;</button>
                </header>

                {/* ----------------------------------------- */}
                {/* FIM - FICHA RESUMO CLIENTE - TITULO    */}
                {/* ----------------------------------------- */}




                {/* ----------------------------------------- */}
                {/* INICIO - FICHA RESUMO CLIENTE - CORPO     */}
                {/* ----------------------------------------- */}

                <div className="detalhes-cliente-corpo-card">



                    {/* --------------------------------------------------------- */}
                    {/* INICIO - 👤 SEÇÃO: IDENTIFICAÇÃO                          */}
                    {/* --------------------------------------------------------- */}

                    <section className="card-cliente-secao-interna">
                        
                        <h3 className="titulo-cliente-secao-pequeno">👤 IDENTIFICAÇÃO</h3>

                        <div className="grade-cliente-detalhes">
                            
                            <div className="detalhe-item-cliente">
                                <label>NOME:</label>
                                <span>{dBasico.nome?.toUpperCase() || "NOME NÃO INFORMADO"}</span>
                            </div>

                            <div className="detalhe-item-cliente">
                                <label>CPF:</label>
                                <span>{dBasico.cpef || "---"}</span>
                            </div>

                            <div className="detalhe-item-cliente">
                                <label>FUNÇÃO NO SISTEMA:</label>
                                <span className="valor-destaque-azul">{dBasico.func || "cliente"}</span>
                            </div>

                        </div>

                    </section>

                    {/* --------------------------------------------------------- */}
                    {/* FIM - 👤 SEÇÃO: IDENTIFICAÇÃO                             */}
                    {/* --------------------------------------------------------- */}




                    {/* --------------------------------------------------------- */}
                    {/* INICIO - ⚙️ SEÇÃO: CONTROLE OPERACIONAL                    */}
                    {/* --------------------------------------------------------- */}

                    <section className="card-cliente-secao-interna">

                        <h3 className="titulo-cliente-secao-pequeno">⚙️ CONTROLE OPERACIONAL</h3>

                        <div className="grade-cliente-detalhes">
                            
                            <div className="detalhe-item-cliente">
                                <label>SITUAÇÃO:</label>
                                <span className={`status-pill-texto ${dInterno.situ?.toLowerCase() || 'ativo'}`}>
                                    {dInterno.situ?.toUpperCase() || "ATIVO"}
                                </span>
                            </div>

                            <div className="detalhe-item-cliente">
                                <label>PERMISSÃO:</label>
                                <span>{dInterno.perm?.toUpperCase() || "BASICA"}</span>
                            </div>

                            <div className="detalhe-item-cliente">
                                <label>DATA CADASTRO:</label>
                                <span>{dInterno.datc || "---"}</span>
                            </div>

                            <div className="detalhe-item-cliente">
                                <label>MEU PREFIL:</label>
                                <span>{dInterno.dadosUsuarioCompleto ? "✅ CADASTRO CONCLUÍDO" : "⏳ CADASTRO PENDENTE"}</span>
                            </div>

                            <div className="detalhe-item-cliente">
                                <label>PRONTUARIO DO PACIENTE:</label>
                                <span>{dInterno.usuarioLiberadoPeloAdministrador ? "🔓 LIBERADO" : "🔒 BLOQUEADO"}</span>
                            </div>

                        </div>

                    </section>

                    {/* --------------------------------------------------------- */}
                    {/* FIM - ⚙️ SEÇÃO: CONTROLE OPERACIONAL                       */}
                    {/* --------------------------------------------------------- */}



                </div>

                {/* ---------------------------------------- */}
                {/* FIM - FICHA RESUMO CLIENTE - CORPO       */}
                {/* ---------------------------------------- */}





                <footer className="detalhes-cliente-footer-card">
                    <button className="btn-cliente-voltar" onClick={aoFechar}>Voltar ao Relatório</button>
                </footer>




            </div>

            {/* -------------------------------- */}
            {/* FIM - FICHA RESUMO CLIENTE    */}
            {/* -------------------------------- */}



        </div>
    );
}

/* ------------------------------------------------------------- */
/* FIM - 🔎 COMPONENTE: DetalhesCliente                          */
/* ------------------------------------------------------------- */