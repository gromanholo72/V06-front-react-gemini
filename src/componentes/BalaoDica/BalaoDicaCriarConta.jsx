import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BalaoDicaCriarConta.css';

export const BalaoDicaCriarConta = ({ exibirBalaoDicaCriarConta }) => {
    return (
        <AnimatePresence>
            {exibirBalaoDicaCriarConta && (
                <motion.div 
                    key="balao-criar-conta"
                    initial={{ opacity: 0, x: -20 }} 
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="BalaoDicaCriarContaCorpo"
                >
                    ✨ Clique aqui para criar sua conta!
                </motion.div>
            )}
        </AnimatePresence>
    );
};