

import { useState, useEffect } from 'react'; 

// import { getDatabase, ref, get } from "firebase/database"; 

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











    

    // ----------------------------------------
    // INICIO DO - TEXTE DE SEGURANCA DO FIREBASE
    // ----------------------------------------

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







    

    // useEffect(() => {

        // -----------------------
        // INICIO DA - DUPLA TRAVA
        // -----------------------

        // Se o Vigia ainda está conferindo os documentos na portaria vai ser igual a true
        // if (carregandoPermissoesFireBase) {
        //     return;
        // }

        
        // Isso garante que não estamos pegando o "cheiro" do crachá antigo
        // if (dadosToken?.func !== 'visitante') {
        //     return; 
        // }

        // -----------------------
        // FIM DA - DUPLA TRAVA
        // -----------------------

    //     const carregarTesteSemCracha = async () => {

    //         const db = getDatabase();

    //         const caminhoNoBanco = ref(db, 'usuarios'); 
            
    //         try {

    //             const snapshot = await get(caminhoNoBanco);

    //             setStatusIntegridadeBanco("vulneravel");

    //             console.log("");
    //             console.error("✨ 👣 🏁 ----------------------------------");
    //             console.error("✨ 👣 🏁 useEffect() - Componente - 🏁 inicio.jsx");
    //             console.error("✨ 👣 🏁 Visitante tentando acessar o banco de dados");
    //             console.error("✨ 👣 🏁 🎫 dadosToken?.func = ", dadosToken?.func);
    //             console.error("✨ 👣 🏁 🔓 BRECHA ENCONTRADA: Consegui ler sem crachá!", snapshot.val());
    //             console.error("✨ 👣 🏁 ----------------------------------");

    //         } catch (error) {

    //             setStatusIntegridadeBanco("protegido");

    //             console.log("");
    //             console.error("✨ 👣 🏁 ----------------------------------");
    //             console.error("✨ 👣 🏁 useEffect() - Componente - 🏁 inicio.jsx");
    //             console.error("✨ 👣 🏁 Visitante tentando acessar o banco de dados");
    //             console.error("✨ 👣 🏁 🎫 dadosToken?.func = ", dadosToken?.func);
    //             console.error("✨ 👣 🏁 🛡️ VIGIA ATENTO: Acesso negado.");
    //             console.error("✨ 👣 🏁 📋 Código:", error.code); 
    //             console.error("✨ 👣 🏁 ----------------------------------");

    //         }

    //     };

    //     carregarTesteSemCracha();

    // }, [dadosToken?.func]);


    // ----------------------------------------
    // FIM DO - TEXTE DE SEGURANCA DO FIREBASE
    // ----------------------------------------











    return (

        <div className="componente-de-pagina">




            <div className="Card-Apresentacao-Principal">
                
                    <p>✨</p> 
                    <p className="Texto-Destaque">
                        <strong>Bem-vindo à Nossa Instituição</strong>
                        <span className="Subtexto-Especialidade">Especializada em cuidar.</span>  
                    </p>
                
                    <img 
                        src="imagens/LogoSVG6.png" 
                        alt="Logo Padrao" 
                        className="Imagem-Card-Inicio"
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





        </div> 

    );
}