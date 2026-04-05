

import { useState, useEffect } from 'react'; 
import { useAuth } from './AutenticacaoContexto'; 
import './Inicio.css';

export function Inicio() {

    const { dadosToken, carregandoPermissoesFireBase } = useAuth();

    /* 🎫 VISTORIA DOS DADOS DO TOKEN */
    useEffect(() => {

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ useEffect() - Componente - 🏁 inicio.jsx");
        // console.log("✨ 🏷️ VARIAVEL MONITORADA: DADOS DO TOKEN");
        // console.log("✨ 🎫 dadosToken = ", dadosToken);
        // console.log("✨ ----------------------------------");

    }, [dadosToken]);

    /* ⌛ VISTORIA DA TRAVA DE CARREGAMENTO DO FIREBASE*/
    useEffect(() => {

        // console.log("");
        // console.log("✨ ----------------------------------");
        // console.log("✨ useEffect() - Componente - 🏁 inicio.jsx");
        // console.log("✨ 🏷️ VARIAVEL MONITORADA: TRAVA DE CARREGAMENTO");
        // console.log("✨ ⌛ carregandoPermissoesFireBase = ", carregandoPermissoesFireBase);
        // console.log("✨ ----------------------------------");

    }, [carregandoPermissoesFireBase]);


    
    const [statusIntegridadeBanco, setStatusIntegridadeBanco] = useState(() => {

        const valorInicial = "verificando"; 
        
        // console.log("");
        // console.log("📐 🏁 ----------------------------------");
        // console.log("📐 🏁 useState() - componente - 🏁 inicio.jsx");
        // console.log("📐 🏁 Lazy Initialization - 🛡️ statusIntegridadeBanco");
        // console.log("📐 🏁 🛡️ statusIntegridadeBanco nasceu como = ", valorInicial);
        // console.log("📐 🏁 ----------------------------------");
        
        return valorInicial;

    });

    useEffect(() => {

        // console.log("");
        // console.log("✨ 🏁 ----------------------------------");
        // console.log("✨ 🏁 useEffect() - componente - 🏁 inicio.jsx");
        // console.log("✨ 🏁 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
        // console.log("✨ 🏁 🛡️ statusIntegridadeBanco = ", statusIntegridadeBanco);
        // console.log("✨ 🏁 ----------------------------------");

    }, [statusIntegridadeBanco]);



    return (

        // <div className="componente-de-pagina">




            <div className="Card-Apresentacao-Principal">
                
                    <p>✨</p> 
                    <p className="Texto-Destaque">
                        <strong>Bem-vindo à Nossa Instituição</strong>
                        <span className="Subtexto-Especialidade">Especializada em cuidar.</span>  
                    </p>
                
                    <img className="Imagem-Card-Inicio"
                        src="imagens/LogoSVG6.png" 
                        alt="Logo Padrao" 
                        
                    />

                    <p className="Texto-Chamada">
                    📞 <strong>Crie uma conta</strong> em nosso sistema e entre em <strong>"Contato"</strong> hoje mesmo...
                    </p>

                    <div className="container-apresentacao-cards">
                        
                        <div className="card-apresentacao-servico">
                        <h3>🩺 Cuidados Médicos</h3>
                        <p>Acompanhamento 24h com equipe especializada.</p>
                        </div>

                        
                        <div className="card-apresentacao-servico">
                        <h3>🎨 Atividades Cognitivas</h3>
                        <p>Estímulos diários para manter a mente ativa e saudável.</p>
                        </div>

                        
                        <div className="card-apresentacao-servico">
                        <h3>🍎 Nutrição Balanceada</h3>
                        <p>Cardápios personalizados para cada necessidade dietética.</p>
                        </div>
                
                    </div>




            </div>





        // </div> 

    );
}