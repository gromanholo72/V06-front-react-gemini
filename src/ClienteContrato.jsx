import React, { useEffect } from 'react';
import './ClienteContrato.css';















/* ------------------------------------------------------------- */
/* INICIO - 📜 COMPONENTE: ClienteContrato                       */
/* ------------------------------------------------------------- */
export function ClienteContrato() {

    // 🚀 CONSOLE DE INSPEÇÃO MAESTRO
    useEffect(() => {
        console.log("");
        console.log("📐 -----------------------------------------------------------");
        console.log("📐 MONITOR: Visualização de Contrato Institucional");
        console.log("📐 Componente: ClienteContrato.jsx");
        console.log("📐 Status: Documento pronto para leitura");
        console.log("📐 -----------------------------------------------------------");
    }, []);















    return (
        <div className="componente-de-pagina cliente-contrato-principal">
            <div className="cliente-contrato-suporte">

                <div className="contrato-usuario-card">
                    


                    <header className="contrato-card-header">
                        <h2>📄 Termos de Prestação de Serviço</h2>
                        <button className="btn-contrato-pdf" onClick={() => alert("Gerando PDF do Contrato...")}>
                            Baixar PDF
                        </button>
                    </header>



                    <div className="contrato-card-corpo">

                        {/* --- SEÇÃO 1: OBJETO --- */}
                        <section className="contrato-secao">
                            <h3>⚖️ 1. Objeto do Contrato</h3>
                            <p>
                                O presente instrumento tem como objetivo a prestação de serviços de cuidado e assistência ao idoso, 
                                abrangendo monitoramento 24h, auxílio em atividades de vida diária e suporte operacional especializado.
                            </p>
                        </section>

                        {/* --- SEÇÃO 2: SERVIÇOS INCLUSOS --- */}
                        <section className="contrato-secao">
                            <h3>🩺 2. Serviços e Assistência</h3>
                            <ul className="contrato-lista">
                                <li>Acompanhamento por cuidadoras qualificadas em regime de escala.</li>
                                <li>Monitoramento da administração de medicamentos via sistema.</li>
                                <li>Suporte à higiene pessoal e mobilidade assistida.</li>
                                <li>Elaboração de cardápios adaptados por equipe de nutrição.</li>
                            </ul>
                        </section>

                        {/* --- SEÇÃO 3: OBRIGAÇÕES DO CONTRATANTE --- */}
                        <section className="contrato-secao">
                            <h3>🤝 3. Responsabilidades do Cliente</h3>
                            <p>
                                O contratante compromete-se a fornecer todas as informações clínicas necessárias, 
                                manter o estoque de medicamentos atualizado e respeitar as diretrizes de visitação 
                                vigentes na instituição.
                            </p>
                        </section>

                        {/* --- SEÇÃO 4: RESCISÃO --- */}
                        <section className="contrato-secao">
                            <h3>🚫 4. Cancelamento e Prazos</h3>
                            <p>
                                A rescisão deste contrato pode ser solicitada por ambas as partes mediante aviso prévio 
                                de 30 (trinta) dias, garantindo a transição segura dos cuidados do paciente.
                            </p>
                        </section>















                        <footer className="contrato-footer">
                            <div className="alerta-contrato">
                                <strong>⚠️ Nota:</strong> Este documento é uma visualização digital dos termos aceitos no momento do cadastro.
                            </div>
                        </footer>

                    </div>





                </div>

            </div>
        </div>
    );
}
/* ------------------------------------------------------------- */
/* FIM - 📜 COMPONENTE: ClienteContrato                          */
/* ------------------------------------------------------------- */