import React from 'react';
import { ref, update } from "firebase/database";
import { db_realtime } from './firebaseConfig';
import './DetalhesCuidadora.css';



/* ------------------------------------------------------------- */
/* INICIO - 🔎 COMPONENTE: DetalhesCuidadora (FICHA TÉCNICA)     */
/* ------------------------------------------------------------- */

export function DetalhesCuidadora({ usuario, aoFechar }) {
    if (!usuario) return null;

    // 📐 Mapeamento Seguro Maestro (Protocolo V3)
    const dBasico = usuario.dadosBasico || {};

    const dContato = usuario.dadosContato || {};
    const dEndereco = usuario.dadosEndereco || {};
    const dEmpresa = usuario.dadosEmpresa || {};
    const dFormacao = usuario.dadosFormacao || {};

    // 🧱 Blindagem Sênior: Garante que sejam objetos mesmo se o Firebase retornar booleano 'true'
    const dInterno = (usuario.dadosInterno && typeof usuario.dadosInterno === 'object') ? usuario.dadosInterno : {};
    const dCadastro = (usuario.dadosCadastro && typeof usuario.dadosCadastro === 'object') ? usuario.dadosCadastro : {};

    const dSeguranca = usuario.dadosSeguranca || {};
    
    // Extração do ID Limpo conforme regra Maestro
    const idSistema = dBasico.cpef ? dBasico.cpef.replace(/\D/g, "") : "---";
















    // ---------------------------------
    // INICIO - 💾 AÇÃO: CONFIRMAR CADASTRO (ADMIN)
    // ---------------------------------
    const handleConfirmarCadastro = async () => {
        const cpfLimpo = dBasico.cpef ? dBasico.cpef.replace(/\D/g, "") : null;

        console.log("");
        console.log("💾 🛡️ ------------------------------");
        console.log("💾 🛡️ AÇÃO: Confirmar Cadastro (Admin)");
        console.log("💾 🛡️ CPF Alvo:", cpfLimpo);
        console.log("💾 🛡️ -------------------------------");

        if (!cpfLimpo) return;

        try {
            const internoRef = ref(db_realtime, `usuarios/${cpfLimpo}/dadosCadastro`);
            await update(internoRef, {
                autorizadoAdministrador: true,
                autorizadoAdministradorData: new Date().toLocaleDateString('pt-BR')
            });
            console.log("📐 ✅ SUCESSO: Cadastro validado na Antena Central.");
            alert("✅ Cadastro da cuidadora confirmado com sucesso!");
            aoFechar();
        } catch (error) {
            console.error("❌ 🚨 Erro no salvamento Maestro:", error);
            alert("❌ Falha ao sincronizar confirmação.");
        }
    };
    // ---------------------------------
    // FIM - 💾 AÇÃO: CONFIRMAR CADASTRO (ADMIN)
    // ---------------------------------
















    return (
        <div className="detalhes-cliente-overlay">



            {/* -------------------------------- */}
            {/* INICIO - FICHA RESUMO CUIDADORA  */}
            {/* -------------------------------- */}

            <div className="detalhes-cliente-modal-card">




                {/* ----------------------------------------- */}
                {/* INICIO - FICHA RESUMO CUIDADORA - TITULO    */}
                {/* ----------------------------------------- */}

                <header className="detalhes-cliente-header-card">
                    <div className="header-info-texto">
                        <h2>FICHA DA CUIDADORA</h2>
                        <span className="id-subtitulo">ID SISTEMA: {idSistema}</span>
                    </div>
                    <button className="btn-fechar-cliente" onClick={aoFechar}>&times;</button>
                </header>

                {/* ----------------------------------------- */}
                {/* FIM - FICHA RESUMO CUIDADORA - TITULO    */}
                {/* ----------------------------------------- */}





                {/* ----------------------------------------- */}
                {/* INICIO - FICHA RESUMO CUIDADORA - CORPO    */}
                {/* ----------------------------------------- */}

                <div className="detalhes-cliente-corpo-card">

                    {/* --- SEÇÃO: IDENTIFICAÇÃO --- */}
                    <section className="card-cliente-secao-interna">
                        <h3 className="titulo-cliente-secao-pequeno">👤 IDENTIFICAÇÃO</h3>
                        <div className="grade-cliente-detalhes">
                            <div className="detalhe-item-cliente">
                                <label>NOME:</label>
                                <span>{dBasico.nome?.toUpperCase() || "NÃO INFORMADO"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>CPF:</label>
                                <span>{dBasico.cpef || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>FUNÇÃO:</label>
                                <span className="valor-destaque-azul">{dBasico.func?.toUpperCase() || "CUIDADORA"}</span>
                            </div>
                        </div>
                    </section>
                    {/* --------------------------------------------------------- */}
                    {/* FIM - FICHA RESUMO CUIDADORA - IDENTIFICAÇÃO              */}
                    {/* --------------------------------------------------------- */}
















                    {/* --------------------------------------------------------- */}
                    {/* INICIO - FICHA RESUMO CUIDADORA - CONTATO                 */}
                    {/* --------------------------------------------------------- */}
                    <section className="card-cliente-secao-interna">
                        <h3 className="titulo-cliente-secao-pequeno">📱 CONTATO</h3>
                        <div className="grade-cliente-detalhes">
                            <div className="detalhe-item-cliente">
                                <label>E-MAIL:</label>
                                <span>{dContato.mail || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>TELEFONE:</label>
                                <span>{dContato.fone || "---"}</span>
                            </div>
                        </div>
                    </section>
                    {/* --------------------------------------------------------- */}
                    {/* FIM - FICHA RESUMO CUIDADORA - CONTATO                    */}
                    {/* --------------------------------------------------------- */}
















                    {/* --------------------------------------------------------- */}
                    {/* INICIO - FICHA RESUMO CUIDADORA - ENDEREÇO                */}
                    {/* --------------------------------------------------------- */}
                    <section className="card-cliente-secao-interna">
                        <h3 className="titulo-cliente-secao-pequeno">📍 ENDEREÇO</h3>
                        <div className="grade-cliente-detalhes">
                            <div className="detalhe-item-cliente">
                                <label>CEP:</label>
                                <span>{dEndereco.cepe || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>RUA:</label>
                                <span>{dEndereco.ruaa || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>Nº:</label>
                                <span>{dEndereco.nume || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>BAIRRO:</label>
                                <span>{dEndereco.bair || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>CIDADE:</label>
                                <span>{(dEndereco.cida || "---") + " / " + (dEndereco.esta || "")}</span>
                            </div>
                        </div>
                    </section>
                    {/* --------------------------------------------------------- */}
                    {/* FIM - FICHA RESUMO CUIDADORA - ENDEREÇO                   */}
                    {/* --------------------------------------------------------- */}
















                    {/* --------------------------------------------------------- */}
                    {/* INICIO - FICHA RESUMO CUIDADORA - DADOS EMPRESARIAIS      */}
                    {/* --------------------------------------------------------- */}
                    <section className="card-cliente-secao-interna">
                        <h3 className="titulo-cliente-secao-pequeno">🏢 EMPRESA (CNPJ)</h3>
                        <div className="grade-cliente-detalhes">
                            <div className="detalhe-item-cliente">
                                <label>CNPJ:</label>
                                <span>{dEmpresa.cnpj || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>RAZÃO SOCIAL:</label>
                                <span>{dEmpresa.raza || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>NOME FANTASIA:</label>
                                <span>{dEmpresa.Fant || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>SITUAÇÃO:</label>
                                <span>{dEmpresa.situ || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>ATIVIDADE:</label>
                                <span>{dEmpresa.ativ || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>SOCIOS:</label>
                                <span>{dEmpresa.soci || "---"}</span>
                            </div>
                        </div>
                    </section>
                    {/* --------------------------------------------------------- */}
                    {/* FIM - FICHA RESUMO CUIDADORA - DADOS EMPRESARIAIS         */}
                    {/* --------------------------------------------------------- */}
















                    {/* --------------------------------------------------------- */}
                    {/* INICIO - FICHA RESUMO CUIDADORA - FORMAÇÃO                */}
                    {/* --------------------------------------------------------- */}
                    <section className="card-cliente-secao-interna">
                        <h3 className="titulo-cliente-secao-pequeno">🎓 FORMAÇÃO PROFISSIONAL</h3>
                        <div className="grade-cliente-detalhes">
                            <div className="detalhe-item-cliente">
                                <label>NÍVEL:</label>
                                <span>{dFormacao.nivel || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>ESPEC.:</label>
                                <span>{dFormacao.espec || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>REGISTRO:</label>
                                <span>{dFormacao.regis || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>INSTITUIÇÃO:</label>
                                <span>{dFormacao.insti || "---"}</span>
                            </div>
                        </div>
                    </section>
                    {/* --------------------------------------------------------- */}
                    {/* FIM - FICHA RESUMO CUIDADORA - FORMAÇÃO                   */}
                    {/* --------------------------------------------------------- */}
















                    {/* --------------------------------------------------------- */}
                    {/* INICIO - FICHA RESUMO CUIDADORA - CONTROLE OPERACIONAL    */}
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
                                <span>{dInterno.perm?.toUpperCase() || "BÁSICA"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>DATA CADASTRO:</label>
                                <span>{dInterno.datc || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>Dados Cadastrais:</label>
                                <span>{dCadastro.perfilCompleto ? "✅ CONCLUÍDO" : "⏳ PENDENTE"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>Autorizado pelo Administrador:</label>
                                <span>{dCadastro.autorizadoAdministrador ? "✅ SIM" : "❌ NÃO"}</span>
                            </div>
                        </div>
                    </section>
                    {/* --------------------------------------------------------- */}
                    {/* FIM - FICHA RESUMO CUIDADORA - CONTROLE OPERACIONAL       */}
                    {/* --------------------------------------------------------- */}



                </div>


                {/* ----------------------------------------- */}
                {/* FIM - FICHA RESUMO CUIDADORA - CORPO    */}
                {/* ----------------------------------------- */}



                <footer className="detalhes-cliente-footer-card">
                    <button 
                        className="btn-confirmar-cadastro" 
                        onClick={handleConfirmarCadastro}
                    >
                        Confirmar Cadastro
                    </button>

                    <button className="btn-cliente-voltar" onClick={aoFechar}>Voltar ao Relatório</button>
                </footer>



            </div>

            {/* ------------------------------- */}
            {/* FIM - FICHA RESUMO CUIDADORA    */}
            {/* ------------------------------- */}






        </div>
    );
}

/* ------------------------------------------------------------- */
/* FIM - 🔎 COMPONENTE: DetalhesCuidadora                        */
/* ------------------------------------------------------------- */