import React from 'react';
import { ref, update } from "firebase/database";

import { useAuth } from '../AutenticacaoContexto.jsx';

import './DetalhesCliente.css';



export function DetalhesCliente({ usuario, aoFechar }) {

    if (!usuario) return null;

    const { db_realtime } = useAuth();

    // 📐 Mapeamento Seguro Maestro (Protocolo V3)
    const dBasico = usuario.dadosBasico || {};
    const dadosInterno = (usuario.dadosInterno && typeof usuario.dadosInterno === 'object') ? usuario.dadosInterno : {};
    const dadosCadastro = (usuario.dadosCadastro && typeof usuario.dadosCadastro === 'object') ? usuario.dadosCadastro : {};
    const dSeguranca = usuario.dadosSeguranca || {};
    
    // Extração do ID Limpo (Apenas números do CPF para ID de Sistema)
    const idSistema = dBasico.cpef ? dBasico.cpef.replace(/\D/g, "") : "---";




    // ---------------------------------
    // INICIO - 💾 AÇÃO: CONFIRMAR CADASTRO CLIENTE (ADMIN)
    // ---------------------------------
    const handleConfirmarCadastro = async () => {
        const cpfLimpo = dBasico.cpef ? dBasico.cpef.replace(/\D/g, "") : null;
        const ehParaConfirmar = !dadosCadastro.autorizadoAdministrador;

        console.log("");
        console.log("💾 🛡️ ------------------------------");
        console.log(`💾 🛡️ AÇÃO: ${ehParaConfirmar ? "Confirmar" : "Cancelar"} Cadastro Cliente (Admin)`);
        console.log("💾 🛡️ CPF Alvo:", cpfLimpo);
        console.log("💾 🛡️ -------------------------------");

        if (!cpfLimpo) return;

        try {
            const internoRef = ref(db_realtime, `usuarios/${cpfLimpo}/dadosCadastro`);
            await update(internoRef, {
                autorizadoAdministrador: ehParaConfirmar,
                autorizadoAdministradorData: ehParaConfirmar ? new Date().toLocaleDateString('pt-BR') : ""
            });
            console.log(`📐 ✅ SUCESSO: Cliente ${ehParaConfirmar ? "autorizado" : "suspenso"} na Antena Central.`);
            alert(`✅ Cadastro do cliente ${ehParaConfirmar ? "confirmado" : "cancelado"} com sucesso!`);
            aoFechar();
        } catch (error) {
            console.error("❌ 🚨 Erro no salvamento Maestro (Cliente):", error);
            alert("❌ Falha ao sincronizar confirmação.");
        }
    };
    // ---------------------------------
    // FIM - 💾 AÇÃO: CONFIRMAR CADASTRO CLIENTE (ADMIN)
    // ---------------------------------




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
                        <h2>FICHA DO CLIENTE</h2>
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
                                <span className={`status-pill-texto ${dadosInterno.situ?.toLowerCase() || 'ativo'}`}>
                                    {dadosInterno.situ?.toUpperCase() || "ATIVO"}
                                </span>
                            </div>

                            <div className="detalhe-item-cliente">
                                <label>PERMISSÃO:</label>
                                <span>{dadosInterno.perm?.toUpperCase() || "BASICA"}</span>
                            </div>

                            <div className="detalhe-item-cliente">
                                <label>DATA CADASTRO:</label>
                                <span>{dadosInterno.datc || "---"}</span>
                            </div>

                            <div className="detalhe-item-cliente">
                                <label>Dados Cadastrais:</label>
                                <span>{dadosCadastro.perfilCompleto ? "✅ CADASTRO CONCLUÍDO" : "⏳ CADASTRO PENDENTE"}</span>
                            </div>





                            <div className="detalhe-item-cliente">
                                <label>PRONTUARIO DO PACIENTE:</label>
                                <span>{dadosCadastro.autorizadoAdministrador ? "✅ SIM" : "❌ NÃO"}</span>
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

            {/* -------------------------------- */}
            {/* FIM - FICHA RESUMO CLIENTE    */}
            {/* -------------------------------- */}



        </div>
    );
}

/* ------------------------------------------------------------- */
/* FIM - 🔎 COMPONENTE: DetalhesCliente                          */
/* ------------------------------------------------------------- */