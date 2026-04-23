import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BalaoDicaMeuContrato.css';

export const BalaoDicaMeuContrato = ({ exibirBalaoDicaMeuContrato }) => {
    
    return (

        <AnimatePresence>
            {exibirBalaoDicaMeuContrato && (
                <motion.div 
                    key="balao-dica-contrato"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="BalaoDicaMeuContratoCorpo"
                >
                    Assine seu contrato aqui!
                </motion.div>
            )}
        </AnimatePresence>
        
    );

};
