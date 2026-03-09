import { useState, useEffect } from 'react';
import { ref, update, get } from "firebase/database"; 
// import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto.jsx';

import './PacienteEstilo.css';

export function PacienteEndereco() {


    const { dadosPublicos } = useAuth();


    // 🧰 Ferramentas de Trabalho (Hooks)
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');


    // 🔒 Controle de Edição
    const [podeEditar, setPodeEditar] = useState(false);









    // 🕵️‍♂️ FUNÇÃO: Carregar dados da 📡🗼 Antena Central (Firebase)
    const carregarDados = async () => {

        if (!dadosPublicos.cpef) return;

        const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `paciente/${cpfLimpo}/endereco`);

        try {

            const snapshot = await get(caminhoNoBanco);

            if (snapshot.exists()) {

                const dados = snapshot.val();

                setCep(dados.cepe || '');
                setRua(dados.ruaa || '');
                setBairro(dados.bair || '');
                setCidade(dados.cida || '');
                setEstado(dados.esta || '');
                setNumero(dados.nume || '');
                
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












    // 🔍 BUSCA ViaCEP (Só se estiver em modo edição) - Versão Moderna 2026
    /* 🏗️ Definimos a lógica de busca assíncrona */
    const realizarBuscaCep = async () => {
        if (!podeEditar) return;

        const apenasNumeros = cep.replace(/\D/g, '');

        if (apenasNumeros.length === 8) {

            try {
                
                /* 📡 Conexão com a antena do ViaCEP */
                const resposta = await fetch(`https://viacep.com.br/ws/${apenasNumeros}/json/`);
                const dados = await resposta.json();

                if (!dados.erro) {

                    setRua(dados.logradouro || '');
                    setBairro(dados.bairro || '');
                    setCidade(dados.localidade || '');
                    setEstado(dados.uf || '');

                }

            } catch (error) {

                console.error("❌ Falha na comunicação com o serviço de CEP:", error);

            }

        }
    };

    useEffect(() => {
       
        realizarBuscaCep();

    }, [cep, podeEditar]);











    // 🛠️ MÁSCARA DE CEP
    const lidarComCep = (e) => {
        if (!podeEditar) return;
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 5) v = v.replace(/^(\d{2})(\d{3})(\d{0,3})/, '$1.$2-$3');
        else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,3})/, '$1.$2');
        setCep(v);
    };























    // 💾 SALVAR NO FIREBASE
    const salvarNoBanco = async () => {

        try {

            const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `paciente/${cpfLimpo}`);

            const vetorDados = {
                cepe: cep,
                ruaa: rua,
                nume: numero,
                bair: bairro,
                cida: cidade,
                esta: estado
            };

            await update(caminhoNoBanco, { endereco: vetorDados });

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
                    
                    <div className="card-padrao-titulo">📋 ENDEREÇO</div>

                    <div className="card-padrao-corpo">




                      
                        <div className="flex-cep">
                                <label>CEP</label>
                                <input type="text" disabled={!podeEditar} value={cep} onChange={lidarComCep} maxLength="10" />
                            </div>

                            <div className="flex-rua">
                                <label>Rua/Avenida</label>
                                <input type="text" disabled={!podeEditar} value={rua} onChange={(e) => setRua(e.target.value)} />
                            </div>
        
                            <div className="flex-numero">    
                                <label>Nº</label>
                                <input type="text" disabled={!podeEditar} value={numero} onChange={(e) => setNumero(e.target.value)} />   
                            </div>

                            <div className="flex-bairro "> 
                                <label>Bairro</label>
                                <input type="text" disabled={!podeEditar} value={bairro} onChange={(e) => setBairro(e.target.value)} />
                            </div>

                            <div className="flex-cidade"> 
                                <label>Cidade</label>
                                <input type="text" disabled={!podeEditar} value={cidade} onChange={(e) => setCidade(e.target.value)} />
                            </div>

                            <div className="flex-estado "> 
                                <label>UF</label>
                                <input type="text" disabled={!podeEditar} value={estado} maxLength="2" onChange={(e) => setEstado(e.target.value.toUpperCase())} />
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