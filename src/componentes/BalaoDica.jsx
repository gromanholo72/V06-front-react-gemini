import React, { useEffect } from 'react';
import './BalaoDica.css';

export const BalaoDica = ({ texto, exibir, aoFechar, tipo = "informativo", xPos = "0px" }) => {
    
    // 🕵️ RASTREADOR DE CICLO DE VIDA: Monitora quando o balão nasce ou morre no DOM
    useEffect(() => {
        if (exibir) {
            console.log("📐 🎈 BalaoDica: MONTADO no DOM.");
        }
        return () => {
            if (exibir) console.log("📐 🎈 BalaoDica: DESMONTADO do DOM.");
        };
    }, [exibir]);

    // 🧱 Se a ordem for para não exibir, a peça nem sai do almoxarifado
    if (!exibir) return null;

    console.log("");
    console.log("📐 ----------------------------------");
    console.log("📐 Componente - 💡 ./componentes/BalaoDica.jsx");
    console.log("📐 🔵 Estado 'exibir'  = ", exibir);
    console.log("📐 📝 Texto exibido    = ", texto);
    console.log("📐 🎨 Tipo do Balão    = ", tipo);
    console.log("📐 📍 Posição X (CSS)  = ", xPos);
    console.log("📐 🛠️ Possui aoFechar? = ", typeof aoFechar === 'function' ? "✅ SIM" : "❌ NÃO");
    console.log("📐 ----------------------------------");

    const lidarComClique = (e) => {
        console.log("📐 💡 BalaoDica: Clique detectado no corpo do balão.");
        if (typeof aoFechar === 'function') {
            aoFechar(e);
        }
    };

    return (
        <div 
            className={`BalaoDicaGenerico tipo-${tipo}`} 
            style={{ left: xPos }}
            onClick={lidarComClique}
        >
            <div className="conteudo-balao">
                {texto}
            </div>
            <div className="seta-balao"></div>
        </div>
    );
};