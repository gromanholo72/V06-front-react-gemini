import React, { useState } from 'react';
import { PulsarTitulo } from './componentes/PulsarTitulo';
import './Sobre.css';

export function Sobre() {





    // 2. Lazy Initialization ("A Estratégica")
    const [dicaMissao, setDicaMissao] = useState(() => {
        const jaLeu = localStorage.getItem('dicaMissaoLida');
        const valorInicial = jaLeu !== "true";

        console.log("");
        console.log("📐 ----------------------------------");
        console.log("📐 useState() - componente - 🚩 Sobre.jsx");
        console.log("📐 Lazy Initialization - 🔵 dicaMissao");
        console.log("📐 🔵 dicaMissao nasceu como = ", valorInicial);
        console.log("📐 ----------------------------------");
        
        return valorInicial;
    });

    // 🧱 Função para selar a leitura e parar o pulso do título
    const fecharDica = () => {
        setDicaMissao(false);
        localStorage.setItem('dicaMissaoLida', 'true');
        console.log("📐 🔵 dicaMissao = ", false);
    };









    return (

        <div className="componente-de-pagina">



            <div className="Card-Sobre-Informativo">
                

                {/* 🎯 Título com fundo pulsante */}
                <PulsarTitulo ativo={dicaMissao}>
                    <div className="Container-Missao-Destaque" onClick={fecharDica}>
                        <h2 className="Texto-Destaque">
                            Nossa Missão em São Carlos
                        </h2>
                    </div>
                </PulsarTitulo>


                <span className="Subtexto-Especialidade">Qualidade de vida e segurança no lar.</span>

                <div className="Corpo-Texto-Sobre">
                    <p>
                        Em São Carlos e região, oferecemos um serviço <strong>humanizado e profissional</strong> de 
                        <strong> cuidado domiciliar para idosos</strong>, permitindo que eles desfrutem da melhor 
                        qualidade de vida no conforto e segurança do seu lar.
                    </p>


                    <ul className="Lista-Diferenciais">
                        <li>
                            <strong>Companhia Afetiva:</strong> 
                            <br /> 
                            Combatendo o isolamento e promovendo o bem-estar emocional.
                        </li>
                        
                        <li>
                            <strong>Apoio Personalizado:</strong> 
                            <br /> 
                            Auxílio na higiene, alimentação, medicação e mobilidade.
                        </li>
                        
                        <li>
                            <strong>Tranquilidade para a Família:</strong> 
                            <br /> 
                            Garantia de que seu familiar está sendo cuidado por profissionais qualificados.
                        </li>


                        <li>
                            <strong>Quartos Climatizados:</strong> 
                        </li>

                        <li>
                            <strong>Campainhas nas cabeceiras das camas:</strong> 
                        </li>


                        <li>
                            <strong>Acesso a ambulancia:</strong> 
                        </li>

                    </ul>



                    <p className="Frase-Final">
                        <strong>Cuidar de quem cuidou de você é a nossa missão.</strong>
                    </p>
                </div>

                
            </div>



















        </div> 

    );
}