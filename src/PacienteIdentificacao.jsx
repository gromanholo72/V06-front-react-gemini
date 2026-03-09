import { useState, useEffect } from 'react';
import { ref, update, get } from "firebase/database"; 
// import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto';

import './PacienteEstilo.css';

export function PacienteIdentificacao() {


    const { dadosPublicos } = useAuth();


    // 🧰 Ferramentas de Trabalho (Hooks)
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');


    // 🔒 Controle de Edição
    const [podeEditar, setPodeEditar] = useState(false);









    // 🕵️‍♂️ FUNÇÃO: Carregar dados da 📡🗼 Antena Central (Firebase)
    const carregarDados = async () => {

        if (!dadosPublicos.cpef) return;

        const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `paciente/${cpfLimpo}/identificacao`);

        try {

            const snapshot = await get(caminhoNoBanco);

            if (snapshot.exists()) {

                const dados = snapshot.val();

                setNome(dados.nome || '');
                setIdade(dados.idade || '');
                
                setPodeEditar(false);

            } else {

                setPodeEditar(true);

            }

        } catch (error) {

            console.error("❌ Erro ao buscar dados:", error);

        }
    };

    useEffect(() => { 
        
        carregarDados(); 
    
    }, [dadosPublicos.cpef]);














    // 💾 SALVAR NO FIREBASE
    const salvarNoBanco = async () => {

        try {

            const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `paciente/${cpfLimpo}`);

            const vetorDados = {
                nome: nome,
                idade: idade
            };

            await update(caminhoNoBanco, { identificacao: vetorDados });

            alert("✅ Dados salvos com sucesso!");

            setPodeEditar(false);

        } catch (error) {

            alert("Erro ao salvar dados.");

        }

    };







    



    
    return (
        <div className="componente-principal-padrao-paciente">
        

            <div className="componente-suporte-padrao-paciente">


                <div className="card-padrao-paciente">
                    
                    <div className="card-padrao-titulo">📋 IDENTIFICAÇÃO</div>

                    <div className="card-padrao-corpo">

                      
                        {/* 🏥 Setor de Identificação do Paciente */}
                        <div className="flex-paciente-nome">
                            <label>👤 Nome Completo</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={nome} 
                                onChange={(e) => setNome(e.target.value)} 
                                placeholder="Digite o nome do paciente" 
                            />
                        </div>

                        <div className="flex-paciente-idade">
                            <label>🎂 Idade:</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={idade} 
                                onChange={(e) => setIdade(e.target.value)} 
                                placeholder="Ex: 25" 
                            />
                        </div>

                       







                        <div className="AreaBotoes">
                            {!podeEditar ? (
                                <button type="button" className="BotaoEditar" onClick={() => setPodeEditar(true)}>
                                    🔓 Editar
                                </button>
                            ) : (
                                <>
                                    <button type="button" className="BotaoSalvar" onClick={salvarNoBanco}>💾 Salvar</button>
                                    <button type="button" className="BotaoCancelar" onClick={() => { carregarDados(); setPodeEditar(false); }}>✖️ Cancelar</button>
                                </>
                            )}
                        </div>

                


                    </div>
                </div>

            </div>
        </div>
    );
}