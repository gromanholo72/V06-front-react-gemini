/* // 🧱 Componente Reutilizável de Apoio */
import React from 'react';
import './BalaoDica.css'; // Vamos criar esse CSS já já

export const BalaoDica = ({ texto, exibir, aoFechar }) => {
    
    // Se a ordem for para não exibir, a peça nem sai do almoxarifado
    if (!exibir) return null;

    console.log("📐 💡 BalaoDica renderizado com o texto: ", texto);

    return (
        <div className="BalaoDicaGenerico" onClick={aoFechar}>
            <div className="conteudo-balao">
                {texto}
            </div>
            <div className="seta-balao"></div>
        </div>
    );
};