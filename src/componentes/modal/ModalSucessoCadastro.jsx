import React, { useEffect } from 'react';
import './ModalSucessoCadastro.css';

// ---------------------------------
// INICIO - 📋 COMPONENTE: ModalSucessoCadastro
// ---------------------------------
export function ModalSucessoCadastro() {

    return (
        <div className="Overlay-Modal-Sucesso">

            <div className="Card-Modal-Redirecionamento">

                <div className="Icone-Sucesso-Animado">✅</div>

                <h2 className="Aviso-Destaque">Voce será redirecionado para o Formulario de Login!</h2>

            </div>

        </div>
    );
   
}
