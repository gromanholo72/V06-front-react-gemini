import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BalaoDicaMenuHamburguer.css';

/* ✨ Mestre, agora ele só recebe o que é essencial para o balão brilhar */
export const BalaoDicaMenuHamburguer = ({ exibirBalaoDicaMenuHamburguer }) => {
    
    return (
        /* 🎈 Removido o botão e o container blindado, pois agora moram no App */
        <AnimatePresence>
            {exibirBalaoDicaMenuHamburguer && (
                <motion.div 
                    key="balao-dica"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="BalaoDicaCorpo"
                >
                    👋 Toque aqui para navegar!
                </motion.div>
            )}
        </AnimatePresence>
    );
};