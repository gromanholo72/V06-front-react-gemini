import './Contato.css';

export function Contato() {
    return (

        <div className="componente-de-pagina">





            <div className="Card-Apresentacao-Principal">
                
                <h2 className="Texto-Destaque">Atendimento em Tempo Real</h2>
                <span className="Subtexto-Especialidade">Estamos prontos para ouvir você.</span>

                <p className="Texto-Instrucao">
                    Para iniciar seu atendimento, clique em <strong>Criar Conta</strong> no canto superior direito.
                    Após preencher sua identificação, um de nossos consultores estará pronto para 
                    tirar todas as suas dúvidas.
                </p>

                <div className="Zona-Chat-Interativo">
                    
                    <img 
                        className="ChatDireto" 
                        src="imagens/FigChat.png" 
                        alt="Chat Direto - Clique para conversar" 
                    />
                
                </div>


            </div>





        </div> 
        
    );
}