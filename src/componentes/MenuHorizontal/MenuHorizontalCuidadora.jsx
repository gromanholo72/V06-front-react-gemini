
import { useEffect} from 'react';
import './MenuHorizontalCuidadora.css';

export const MenuHorizontalCuidadora = ({ 
    navegarERecolher, 
    autorizadoAdministrador, 
    ehComputador
}) => {

    // ---------------------------------
    // INICIO - ✨ Monitor de Propriedades
    // ---------------------------------

    useEffect(() => {
        console.log("");
        console.log("✨ ----------------------------------");
        console.log("✨ MenuHorizontalCuidadora.jsx");
        console.log("✨ ehComputador                  :", ehComputador);
        console.log("✨ autorizadoAdministrador  :", autorizadoAdministrador);
        // console.log("✨ navegarERecolher            :", navegarERecolher);
        console.log("✨ ----------------------------------");
    }, [ehComputador, autorizadoAdministrador, navegarERecolher]);

    // ---------------------------------
    // FIM - ✨ Monitor de Propriedades
    // ---------------------------------


    
    return (

        <div className={`menu-horizontal-cuidadora-container ${!ehComputador ? 'menu-horizontal-cuidadora-ativo' : ''}`}>

           

            {/* 🏷️ Título condicional: Só aparece se o menu estiver aberto */}
            {!ehComputador && (
                <h3 className="titulo-menu-mobile">Menu Geral</h3>
            )}



            {/* 🧱 Container para os botões ficarem alinhados horizontalmente */}
            <div className="botoes-cuidadora-wrapper">

                <button
                    className="Btn-geral-cuidadora-prof"
                    onClick={() => navegarERecolher('/interno/UsuarioLogado')}
                >
                    Inicio
                </button>

                <button
                    className="Btn-geral-cuidadora-prof"
                    onClick={() => navegarERecolher('/interno/Funcoes')}
                >
                    Funções
                </button>

                <button
                    className="Btn-geral-cuidadora-prof"
                    onClick={() => navegarERecolher('/interno/Diretrizes')}
                >
                    Diretrizes
                </button>

                <button
                    className={`Btn-geral-cuidadora-prof ${autorizadoAdministrador ? '' : 'BotaoBloqueado'}`}
                    onClick={() => autorizadoAdministrador && navegarERecolher('/interno/Chamados')}
                >
                    Chamados {!autorizadoAdministrador && "🔒"}
                </button>

            </div>

            

        </div>

    );
};