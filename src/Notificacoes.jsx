
import { useState, useEffect } from 'react'; 
import './Diretrizes.css';

export function Notificacoes() {
   






    // -------------------------------
    // INICIO - TESTAR SOM NOTIFICACAO
    // -------------------------------

    const testarSom = () => {
        const audio = document.getElementById('soundNotification');
        
        if (audio) {
            console.log(`✨ 🔵 Iniciando teste de áudio: ${audio.src}`);
            
            audio.play()
                .then(() => {
                    console.log("✨ 🔵 Sucesso: O áudio está tocando corretamente!");
                })
                .catch((erro) => {
                    console.log(`✨ 🔵 Erro no teste: ${erro.message}`);
                    console.log("✨ 🔵 Dica: Verifique se o arquivo está em public/audio/chegou.mp3");
                });
        } else {
            console.log("✨ 🔵 Erro: Elemento de áudio não encontrado no DOM.");
        }
    };

    // -------------------------------
    // FIM - TESTAR SOM NOTIFICACAO
    // -------------------------------










    return (

        <div className="componente-de-pagina">






           
           <div className="Card-Notificações" style={{ position: 'relative' }}>
                

                <h2 className="Titulo-Notificações">⚖️ Notificações</h2>


                <audio id="soundNotification" src="/audio/chegou.mp3" preload="auto"></audio>
                        {/* BOTAO TESTAR SOM NOTIFICACAO */}
                        <button 
                            onClick={testarSom}
                            style={{ padding: '15px', background: '#25D366', color: 'white', borderRadius: '5px', cursor: 'pointer' }}
                        >
                            🔔 Teste som notificação
                        </button>


              

                
                
            </div>



        </div>

    );
}