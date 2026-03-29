import React from 'react';
import './Diretrizes.css';

/* ------------------------------------------------------------- */
/* INICIO - ⚖️ COMPONENTE: Diretrizes                            */
/* ------------------------------------------------------------- */
export function Diretrizes() {
    return (
        <div className="componente-de-pagina">

           <div className="Card-Informativo-Diretrizes">
                
                <h2 className="Texto-Destaque-Diretrizes">⚖️ Diretrizes de Conduta</h2>
                
                <span className="Subtexto-Especialidade-Diretrizes">
                🛡️ Fundamental para a excelência no atendimento.
                </span>

                <div className="Corpo-Texto-Diretrizes">
                    <p>
                    📝 Leia com atenção as normas de conduta da empresa. Estas diretrizes 
                        garantem a segurança de todos e a qualidade do nosso serviço.
                    </p>

                    <ul className="Lista-Diferenciais-Diretrizes">
                        <li>
                            <strong>🍎 Alimentação:</strong> 
                            <br /> 
                            Não é permitido alimentar-se com as provisões do cliente. 
                            Traga sua própria refeição e mantenha o ambiente limpo.
                        </li>
                        
                        <li>
                            <strong>💊 Medicação e Cuidados:</strong> 
                            <br /> 
                            Ministrar medicamentos <b>apenas</b> sob orientação médica. 
                            Siga rigorosamente os horários registrados neste sistema.
                        </li>
                        
                        <li>
                            <strong>🤝 Respeito e Ética:</strong> 
                            <br /> 
                            Priorizamos o respeito absoluto. Qualquer comportamento 
                            desrespeitoso é considerado uma infração grave.
                        </li>

                        <li>
                            <strong>🧠 Terapia Ocupacional:</strong> 
                            <br /> 
                            O entretenimento recreativo não é função direta da cuidadora. 
                            Atividades específicas são realizadas por profissionais qualificados.
                        </li>

                        <li>
                            <strong>Horario de visita:</strong> 
                            <br /> 
                            Familiares podem visitar a qualquer momento podendo integrar com pacientes a qualguer momento
                        </li>

                        <li>
                            <strong> Respeito com paciente</strong> 
                            <br /> 
                            Tocar no paciente para exames apos solicitar permissao ao mesmo:
                        </li>

                        <li>
                            <strong>👣 Podologia:</strong> 
                            <br /> 
                            O serviço de podólogo é cobrado separado da mensalidade base de cuidados.
                        </li>

                    </ul>

                    <p className="Frase-Final-Diretrizes">
                        <strong>Estas diretrizes fazem parte do seu contrato de prestação de serviços.</strong>
                    </p>
                </div>

            </div>



        </div>
    );
}
/* ------------------------------------------------------------- */
/* FIM - ⚖️ COMPONENTE: Diretrizes                               */
/* ------------------------------------------------------------- */