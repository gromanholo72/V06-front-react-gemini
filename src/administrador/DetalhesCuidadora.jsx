import React from 'react';
import { ref, update } from "firebase/database";

import { useAuth } from '../AutenticacaoContexto.jsx';

import './DetalhesCuidadora.css';



export function DetalhesCuidadora({ usuario, aoFechar }) {

    if (!usuario) return null;

     const { db_realtime } = useAuth();


    const dBasico = usuario.dadosBasico || {};

    const dContato = usuario.dadosContato || {};
    const dEndereco = usuario.dadosEndereco || {};
    const dEmpresa = usuario.dadosEmpresa || {};
    const dFormacao = usuario.dadosFormacao || {};

    // Garante que sejam objetos mesmo se o Firebase retornar booleano 'true'
    const dadosInterno = (usuario.dadosInterno && typeof usuario.dadosInterno === 'object') ? usuario.dadosInterno : {};
    const dadosCadastro = (usuario.dadosCadastro && typeof usuario.dadosCadastro === 'object') ? usuario.dadosCadastro : {};

    const dSeguranca = usuario.dadosSeguranca || {};
    
    const id = dBasico.cpef ? dBasico.cpef.replace(/\D/g, "") : "---";





    // ---------------------------------
    // INICIO - 💾 AÇÃO: CONFIRMAR CADASTRO (ADMIN)
    // ---------------------------------
    const handleConfirmarCadastro = async () => {
        const cpfLimpo = dBasico.cpef ? dBasico.cpef.replace(/\D/g, "") : null;
        const ehParaConfirmar = !dadosCadastro.autorizadoAdministrador;

        console.log("");
        console.log("💾 🛡️ ------------------------------");
        console.log(`💾 🛡️ AÇÃO: ${ehParaConfirmar ? "Confirmar" : "Cancelar"} Cadastro (Admin)`);
        console.log("💾 🛡️ CPF Alvo:", cpfLimpo);
        console.log("💾 🛡️ -------------------------------");

        if (!cpfLimpo) return;

        try {
            const internoRef = ref(db_realtime, `usuarios/${cpfLimpo}/dadosCadastro`);
            await update(internoRef, {
                autorizadoAdministrador: ehParaConfirmar,
                autorizadoAdministradorData: ehParaConfirmar ? new Date().toLocaleDateString('pt-BR') : ""
            });
            console.log(`📐 ✅ SUCESSO: Cadastro ${ehParaConfirmar ? "validado" : "suspenso"} na Antena Central.`);
            alert(`✅ Cadastro da cuidadora ${ehParaConfirmar ? "confirmado" : "cancelado"} com sucesso!`);
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

            <div className="detalhes-cliente-modal-card">



                {/* ----------------------------------------- */}
                {/* INICIO - FICHA RESUMO CUIDADORA - TITULO    */}
                {/* ----------------------------------------- */}

                <header className="detalhes-cliente-header-card">
                    <div className="header-info-texto">
                        <h2>FICHA DA CUIDADORA</h2>
                        <span className="id-subtitulo">ID SISTEMA: {id}</span>
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

                    {/* ---------------------- */}
                    {/* INICIO - IDENTIFICAÇÃO */}
                    {/* ---------------------- */}

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

                    {/* ---------------------- */}
                    {/* FIM - IDENTIFICAÇÃO */}
                    {/* ---------------------- */}








                    {/* ----------------- */}
                    {/* INICIO - CONTATO  */}
                    {/* ----------------- */}

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

                    {/* ------------- */}
                    {/* FIM - CONTATO */}
                    {/* ------------- */}








                    {/* ----------------- */}
                    {/* INICIO - ENDEREÇO */}
                    {/* ----------------- */}

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

                    {/* -------------- */}
                    {/* FIM - ENDEREÇO */}
                    {/* -------------- */}








                    {/* --------------------------- */}
                    {/* INICIO - DADOS EMPRESARIAIS */}
                    {/* --------------------------- */}

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

                    {/* ------------------------ */}
                    {/* FIM - DADOS EMPRESARIAIS */}
                    {/* ------------------------ */}









                    {/* ----------------- */}
                    {/* INICIO - FORMAÇÃO */}
                    {/* ----------------- */}

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

                    {/* -------------- */}
                    {/* FIM - FORMAÇÃO */}
                    {/* -------------- */}








                    {/* ------------------------------ */}
                    {/* INICIO - CONTROLE OPERACIONAL  */}
                    {/* ------------------------------ */}

                    <section className="card-cliente-secao-interna">
                        <h3 className="titulo-cliente-secao-pequeno">⚙️ CONTROLE OPERACIONAL</h3>
                        <div className="grade-cliente-detalhes">
                            <div className="detalhe-item-cliente">
                                <label>SITUAÇÃO:</label>
                                <span className={`status-pill-texto ${dadosInterno.situ?.toLowerCase() || 'ativo'}`}>
                                    {dadosInterno.situ?.toUpperCase() || "ATIVO"}
                                </span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>PERMISSÃO:</label>
                                <span>{dadosInterno.perm?.toUpperCase() || "BÁSICA"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>DATA CADASTRO:</label>
                                <span>{dadosInterno.datc || "---"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>Dados Cadastrais:</label>
                                <span>{dadosCadastro.perfilCompleto ? "✅ CONCLUÍDO" : "⏳ PENDENTE"}</span>
                            </div>
                            <div className="detalhe-item-cliente">
                                <label>Autorizado pelo Administrador:</label>
                                <span>{dadosCadastro.autorizadoAdministrador ? "✅ SIM" : "❌ NÃO"}</span>
                            </div>
                        </div>
                    </section>

                    {/* --------------------------- */}
                    {/* FIM - CONTROLE OPERACIONAL  */}
                    {/* --------------------------- */}



                </div>

                {/* ----------------------------------------- */}
                {/* FIM - FICHA RESUMO CUIDADORA - CORPO    */}
                {/* ----------------------------------------- */}








                <footer className="detalhes-cliente-footer-card">

                    <button 
                        className="btn-confirmar-cadastro" 
                        onClick={handleConfirmarCadastro}
                        style={{ backgroundColor: dadosCadastro.autorizadoAdministrador ? '#c0392b' : '' }}
                    >
                        {dadosCadastro.autorizadoAdministrador ? "Cancelar Cadastro" : "Confirmar Cadastro"}
                    </button>


                    <button className="btn-cliente-voltar" onClick={aoFechar}>Voltar ao Relatório</button>


                </footer>









            </div>

          


        </div>
    );
}
