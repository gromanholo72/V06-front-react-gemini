
import { useEffect} from 'react';
import './MenuHorizontalCuidadora.css';

export const MenuHorizontalCuidadora = ({ 
    navegarERecolher, 
    perfilEstaCompletoCuidadora,
    menuAberto
}) => {

    // ---------------------------------
    // INICIO - 📐 MONITOR DE MONTAGEM MAESTRO
    // ---------------------------------

    useEffect(() => {
        console.log("");
        console.log("📐 -----------------------------------------------------------");
        console.log("📐 COMPONENTE: MenuHorizontalCuidadora.jsx");
        console.log("📐 STATUS: ✅ Estilos e Componente Carregados na Interface");
        console.log("📐 -----------------------------------------------------------");
    }, []);

    // ---------------------------------
    // FIM - 📐 MONITOR DE MONTAGEM MAESTRO
    // ---------------------------------

    
    return (
        <div className={`menu-horizontal-cuidadora-container ${menuAberto ? 'menu-horizontal-cuidadora-ativo' : ''}`}>

           
           
            {/* 🏷️ Título condicional: Só aparece se o menu estiver aberto */}
            {menuAberto && (
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
                    className={`Btn-geral-cuidadora-prof ${perfilEstaCompletoCuidadora ? '' : 'BotaoBloqueado'}`}
                    onClick={() => perfilEstaCompletoCuidadora && navegarERecolher('/interno/Chamados')}
                    title={!perfilEstaCompletoCuidadora
                        ? "Complete seu perfil (Contato, Endereço, CNPJ e Formação) para liberar."
                        : "Acessar Chamados"
                    }
                >
                    Chamados {!perfilEstaCompletoCuidadora && "🔒"}
                </button>
            </div>

        </div>
    );
};