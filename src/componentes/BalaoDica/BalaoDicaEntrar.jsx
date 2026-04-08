import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BalaoDicaEntrar.css';

export const BalaoDicaEntrar = ({ exibirBalaoDicaEntrar }) => {
    return (
        <AnimatePresence>
            {exibirBalaoDicaEntrar && (
                <motion.div 
                    key="balao-criar-conta"
                    initial={{ opacity: 0, x: -20 }} /* ✨ Efeito lateral para variar */
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="BalaoDicaEntrarCorpo"
                >
                    ✨ Clique aqui para Entrar!
                </motion.div>
            )}
        </AnimatePresence>
    );
};