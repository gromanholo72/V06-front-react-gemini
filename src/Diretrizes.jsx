import React, { useState } from 'react';
import { BalaoDica } from './componentes/BalaoDica';
import './Diretrizes.css';

export function Diretrizes() {
   




// 2. Lazy Initialization ("A Estratégica")
const [dicaDiretrizes, setDicaDiretrizes] = useState(() => {
    const jaLeu = localStorage.getItem('dicaDiretrizesLida');
    const valorInicial = jaLeu !== "true";

    console.log("");
    console.log("📐 ----------------------------------");
    console.log("📐 useState() - componente - ⚖️ Diretrizes.jsx");
    console.log("📐 Lazy Initialization - 🔵 dicaDiretrizes");
    console.log("📐 🔵 dicaDiretrizes nasceu como = ", valorInicial);
    console.log("📐 ----------------------------------");
    
    return valorInicial;
});

// 🧱 Função para selar a leitura da dica
const fecharDicaDiretrizes = () => {
    setDicaDiretrizes(false);
    localStorage.setItem('dicaDiretrizesLida', 'true');
    
    console.log("📐 🔵 dicaDiretrizes = false (Leitura Confirmada)");
};





    return (

        <div className="componente-de-pagina">




           {/* O "Pai" precisa ser relative para o balão se basear nele */}
           <div className="Card-Informativo-Diretrizes" style={{ position: 'relative' }}>
                

                {/* 🧱 Peça Reutilizável: Posicionada no topo do Card */}
                <BalaoDica 
                    exibir={dicaDiretrizes} 
                    texto="✨ Leia com atenção o conteudo abaixo pois são a base do seu contrato!" 
                    aoFechar={fecharDicaDiretrizes}
                />


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

                    </ul>

                    <p className="Frase-Final-Diretrizes">
                        <strong>Estas diretrizes fazem parte do seu contrato de prestação de serviços.</strong>
                    </p>
                </div>

            </div>



        </div>

    );
}