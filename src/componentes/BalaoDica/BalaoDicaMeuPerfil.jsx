import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BalaoDicaMeuPerfil.css';

export const BalaoDicaMeuPerfil = ({ exibirBalaoDicaMeuPerfil }) => {
    
    return (

        <AnimatePresence>
            {exibirBalaoDicaMeuPerfil && (
                <motion.div 
                    key="balao-dica-perfil"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="BalaoDicaMeuPerfilCorpo"
                >
                    Complete seus dados aqui!
                </motion.div>
            )}
        </AnimatePresence>
        
    );

};
