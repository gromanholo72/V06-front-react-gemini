
import React, { useEffect } from 'react';
import './AlertaMensagem.css';

export function AlertaMensagem ({ 
    visivel, 
    tipo, 
    mensagem, 
    prefixoClasse = "Cadastro" }) {


    // ---------------------------------
    // INICIO - ✨ Monitor de Alerta
    // ---------------------------------

    // useEffect(() => {

    //     if (visivel && mensagem) {
    //         console.log("");
    //         console.log(`🔫 📐 ----------------------------------`);
    //         console.log(`🔫 📐 Componente - AlertaMensagem.jsx`);
    //         console.log(`🔫 📐 Status: [${tipo}]`);
    //         console.log(`🔫 📐 Mensagem: ${mensagem}`);
    //         console.log(`🔫 📐 ----------------------------------`);
    //     }

    // }, [visivel, mensagem, tipo]);

    // ---------------------------------
    // FIM - ✨ Monitor de Alerta
    // ---------------------------------



    

    // ---------------------------------
    // INICIO - 🎨 Renderização Maestro
    // ---------------------------------

    const classeContainer = `MsgForm-${prefixoClasse} ${visivel ? `ativo-${prefixoClasse}` : ''} ${tipo}`;
    const classeAlerta = `alerta-erro-${prefixoClasse}`;

    return (
        <div className={classeContainer}>
            
            <div className={classeAlerta}>
                
                {tipo === "sucesso" ? (
                    /* 📐 Ajuste Maestro: Feedback de Sucesso (Verde via CSS .sucesso) */
                    <div className={`linha-sucesso-${prefixoClasse}`}>
                        ✅ {mensagem}
                    </div>
                ) : (
                    /* 📐 Ajuste Maestro: Feedback de Erro (Vermelho via CSS .erro) */
                    <div className={`linha-erro-${prefixoClasse}`}>
                        ⚠️ {mensagem}
                    </div>
                )}
            
            </div>

        </div>
    );

    // ---------------------------------
    // FIM - 🎨 Renderização Maestro
    // ---------------------------------


}