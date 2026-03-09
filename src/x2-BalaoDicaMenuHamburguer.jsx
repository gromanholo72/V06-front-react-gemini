import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BalaoDicaMenuHamburguer.css';

export const BalaoDicaMenuHamburguer = ({ exibirBalaoDicaMenuHamburguer }) => {

    // 🕵️ RASTREADOR DE CICLO DE VIDA
    useEffect(() => {
        if (exibirBalaoDicaMenuHamburguer) {
            console.log("📐 ----------------------------------");
            console.log("📐 Componente - 💡 ./componentes/BalaoDicaMenuHamburguer.jsx");
            console.log("📐 📢 STATUS: Balão acaba de ser MONTADO no DOM");
            console.log("📐 🔵 Estado 'exibir' = ", exibirBalaoDicaMenuHamburguer);
            console.log("📐 ----------------------------------");
        }
        return () => {
            if (exibirBalaoDicaMenuHamburguer) {
                console.log("📐 💡 BalaoDicaMenuHamburguer: DESMONTANDO / Saindo da tela...");
            }
        };
    }, [exibirBalaoDicaMenuHamburguer]);

    return (
        <AnimatePresence>
            {exibirBalaoDicaMenuHamburguer && (
                <motion.div 
                    key="balao-dica"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="BalaoDicaCorpo"
                    /* 🔍 Monitoramento de Animação */
                    onAnimationComplete={() => console.log("📐 ✨ Animação do Balão Concluída!")}
                >
                    <div className="conteudo-balao-hamburguer">
                        👋 Toque aqui para navegar!
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};