import { useState, useEffect } from 'react';
import { ref, update, get } from "firebase/database"; 
// import { db_realtime } from './firebaseConfig.js';
import { useAuth } from './AutenticacaoContexto.jsx';
import './PacienteEstilo.css';

export function PacienteBanho() {

    const { dadosPublicos } = useAuth();

    /* // 🧰 Ferramentas de Trabalho (Hooks) */
    const [horarioManha, setHorarioManha] = useState('');
    const [horarioTarde, setHorarioTarde] = useState('');
    const [observacao, setObservacao] = useState('');

    /* // 🔒 Controle de Edição */
    const [podeEditar, setPodeEditar] = useState(false);

    /* // 🕵️‍♂️ FUNÇÃO: Carregar dados da Antena Central (Firebase) */
    const carregarDados = async () => {

        if (!dadosPublicos.cpef) return;

        const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `paciente/${cpfLimpo}/banho`);

        try {
            const snapshot = await get(caminhoNoBanco);

            if (snapshot.exists()) {
                const dados = snapshot.val();
                setHorarioManha(dados.horarioManha || '');
                setHorarioTarde(dados.horarioTarde || '');
                setObservacao(dados.observacao || '');
                setPodeEditar(false);
            } else {
                setPodeEditar(true);
            }
        } catch (error) {
            console.error("❌ Erro ao buscar dados da obra:", error);
        }
    };

    useEffect(() => { 
        carregarDados(); 
    }, [dadosPublicos.cpef]);

    /* // 💾 SALVAR NO FIREBASE */
    const salvarNoBanco = async () => {
        try {
            const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `paciente/${cpfLimpo}`);

            const vetorDados = {
                horarioManha: horarioManha,
                horarioTarde: horarioTarde,
                observacao: observacao
            };
    
            await update(caminhoNoBanco, { banho: vetorDados });

            alert("✅ Horários de banho registrados com sucesso!");
            setPodeEditar(false);
        } catch (error) {
            alert("Erro ao concretar os dados no banco.");
        }
    };

    return (
        <div className="componente-principal-padrao-paciente">

            <div className="componente-suporte-padrao-paciente">

                <div className="card-padrao-paciente">
                    
                    <div className="card-padrao-titulo">🚿 CONTROLE DE BANHO</div>

                    <div className="card-padrao-corpo">

                        {/* // 🧴 Período 1: Manhã */}
                        <div className="flex-paciente-banho-1">
                            <label>🌅 Banho 1</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={horarioManha} 
                                onChange={(e) => setHorarioManha(e.target.value)} 
                                placeholder="Ex: 08:30" 
                            />
                        </div>

                        {/* // 🧼 Período 2: Tarde/Noite */}
                        <div className="flex-paciente-banho-2">
                            <label>🌆 Banho 2</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={horarioTarde} 
                                onChange={(e) => setHorarioTarde(e.target.value)} 
                                placeholder="Ex: 18:00" 
                            />
                        </div>

                        {/* // 📝 Observações Adicionais */}
                        <div className="flex-paciente-banho-obs">
                            <label>📝 Observações de Pele/Higiene</label>
                            <input 
                                type="text" 
                                disabled={!podeEditar} 
                                value={observacao} 
                                onChange={(e) => setObservacao(e.target.value)} 
                                placeholder="Ex: Pele íntegra, aceitou bem." 
                            />
                        </div>

                        {/* // 🛠️ Área de Ações nos Cards */}
                        <div className="AreaBotoes">
                            {!podeEditar ? (
                                <button type="button" className="BotaoEditar 🔓" onClick={() => setPodeEditar(true)}>
                                    🔓 Editar Horários
                                </button>
                            ) : (
                                <>
                                    <button type="button" className="BotaoSalvar 💾" onClick={salvarNoBanco}>💾 Salvar</button>
                                    <button type="button" className="BotaoCancelar ✖️" onClick={() => { carregarDados(); setPodeEditar(false); }}>✖️ Cancelar</button>
                                </>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}