import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BalaoDicaProntuarioPaciente.css';

export const BalaoDicaProntuarioPaciente = ({ 

    exibirBalaoDicaProntuarioPaciente, 
    descerDica 

}) => {
    
    return (

        <AnimatePresence>
            {exibirBalaoDicaProntuarioPaciente && (
                <motion.div 
                    key="balao-dica-prontuario"
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    className="BalaoDicaProntuarioPacienteCorpo"
                    style={{ 
                        top: descerDica ? "145px" : "100px" 
                    }}
                >
                    Preencha as informações!
                </motion.div>
            )}
        </AnimatePresence>

    );

};
