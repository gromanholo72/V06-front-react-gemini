
import { useState, useEffect, useRef, useCallback } from 'react';
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from '../firebaseConfig.js';
import { useAuth, URL_SERVIDOR } from '../AutenticacaoContexto.jsx';
import './PacienteEndereco.css';

export function PacienteEndereco() {

    const cepInputRef = useRef(null);

    const { dadosToken } = useAuth();
    
    const [ehNovoCadastro, setEhNovoCadastro] = useState(false);
   
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');

    const [carregandoOperacao, setCarregandoOperacao] = useState(false);
    const [podeEditar, setPodeEditar] = useState(false);



















    const podeEditarRef = useRef(podeEditar);
    useEffect(() => {
        podeEditarRef.current = podeEditar;
    }, [podeEditar]);



    // ---------------------------------
    // INICIO - 🧭 Sensor de localização
    // ---------------------------------

    useEffect(() => {
        if (podeEditar) {
            cepInputRef.current?.focus();
        }
    }, [podeEditar]);

    // ---------------------------------
    // FIM - 🧭 Sensor de localização
    // ---------------------------------











    // ---------------------------------
    // INICIO - 🕵️‍♂️ Distribui o endereço para os cards
    // ---------------------------------

    const popularCamposEndereco = useCallback((dados) => {

        setCep(String(dados.cepe || '').trim());
        setRua(String(dados.ruaa || '').trim());
        setBairro(String(dados.bair || '').trim());
        setCidade(String(dados.cida || '').trim());
        setEstado(String(dados.esta || '').trim());
        setNumero(String(dados.nume || '').trim());

    }, []);

    const limparCampos = useCallback(() => {
        setCep('');
        setRua('');
        setBairro('');
        setCidade('');
        setEstado('');
        setNumero('');
    }, []);


    const carregarDadosDoBanco = useCallback(async () => {

        const cpfAtivo = dadosToken?.cpef;

        if (cpfAtivo) {

            console.warn("✨ 🛰️ Endereço vazio. Buscando na Antena Central...");
            
            const cpfLimpo = cpfAtivo.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/dadosPaciente`);

            try {
                
                const snapshot = await get(caminhoNoBanco);
                
                console.log("📐 -----------------------------------------------------------");
                console.log("📐 INSPEÇÃO DE DADOS (Antena Central)");
            
                const val = snapshot.exists() ? snapshot.val() : null;

                // Para o Endereço, o snapshot já aponta diretamente para o nó 'endereco'
                const info = val?.endereco || val;
            
                // 🚀 A CONDIÇÃO MESTRA: O registro só é "Encontrado" se o 'info' tiver o CEP (cepe)
                if (info && info.cepe) {
                    console.log("📐 STATUS: ✅ Endereço encontrado.");
                    console.log("📐 DADOS EXTRAÍDOS:", info);
            
                    popularCamposEndereco(info);
                    setEhNovoCadastro(false);
                    setPodeEditar(false);
                } else {

                    console.log("📐 STATUS: ❓ Registro inexistente no Firebase.");
                    console.log("📐 AÇÃO: Iniciando modo 'Novo Cadastro'.");

                    limparCampos();  
                    setEhNovoCadastro(true); 
                    setPodeEditar(true);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar endereço:", error);
                setPodeEditar(true); 
            }
        }
    }, [dadosToken?.cpef, popularCamposEndereco, limparCampos]);


    useEffect(() => {
        if (dadosToken?.cpef) {
            carregarDadosDoBanco();
        } else {
            console.warn("✨ 🛰️ ⏳ Aguardando sinal da Antena Central para carregar Endereço...");
        }
    }, [dadosToken, carregarDadosDoBanco]);

































    // --------------------------------------------------------------------
    // INICIO - 🔍 BUSCA ViaCEP (Só se estiver em modo edição) - Versão Moderna 2026
    // --------------------------------------------------------------------

    const realizarBuscaCep = useCallback(async () => {

        if (!podeEditarRef.current) return;

        const apenasNumeros = cep.replace(/\D/g, '');

        if (apenasNumeros.length < 8) {
            setRua('');
            setBairro('');
            setCidade('');
            setEstado('');
            return;
        }

        if (apenasNumeros.length === 8) {
            try {
                setCarregandoOperacao(true); 
                
                const tempoMinimo = new Promise(resolve => setTimeout(resolve, 500));

                const requisicao = fetch(`https://viacep.com.br/ws/${apenasNumeros}/json/`);

                const [resposta] = await Promise.all([requisicao, tempoMinimo]);
                const dados = await resposta.json();
                if (!dados.erro) {
                    setRua(dados.logradouro || '');
                    setBairro(dados.bairro || '');
                    setCidade(dados.localidade || '');
                    setEstado(dados.uf || '');
                } else {
                    alert("⚠️ CEP não encontrado na base de dados.");
                    limparCampos(); 
                }
            } catch (error) {
                console.error("❌ Falha na comunicação com o serviço de CEP:", error);
                alert("❌ Erro ao buscar CEP. Verifique sua conexão.");
            } finally {
                setCarregandoOperacao(false); 
            }
        }
    }, [cep, limparCampos]);

    useEffect(() => {
        realizarBuscaCep();
    }, [realizarBuscaCep]); 

    // --------------------------------------------------------------------
    // FIM - 🔍 BUSCA ViaCEP (Só se estiver em modo edição) - Versão Moderna 2026
    // --------------------------------------------------------------------








    // 🛠️ MÁSCARA DE CEP
    const lidarComCep = (e) => {
        if (!podeEditar) return;
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 5) v = v.replace(/^(\d{2})(\d{3})(\d{0,3})/, '$1.$2-$3');
        else if (v.length > 2) v = v.replace(/^(\d{2})(\d{0,3})/, '$1.$2');
        setCep(v);
    };





















    /* -------------------------------------------------------- */
    /* INICIO - 📨 SISTEMA DE MENSAGENS E FEEDBACK VISUAL       */
    /* -------------------------------------------------------- */

    const [msg, setMsg] = useState({ tipo: '', texto: '' });

    // ⏳ Função centralizada para limpar mensagens após um tempo
    const temporizadorMSG = () => {
        setTimeout(() => {
            setMsg({ tipo: '', texto: '' });
        }, 3000);
    };

    /* -------------------------------------------------------- */
    /* FIM - 📨 SISTEMA DE MENSAGENS E FEEDBACK VISUAL          */
    /* -------------------------------------------------------- */





   
    /* -------------------------------------------------------- */
    /* INICIO - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API) */
    /* -------------------------------------------------------- */

    const salvardadosPacienteEndereco = async () => {

        if (carregandoOperacao) return;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setMsg({ tipo: '', texto: '' });
        setCarregandoOperacao(true); // ⏳ Ativa modo carregando

        try {

            const cpfLimpo = dadosToken?.cpef ? dadosToken.cpef.replace(/\D/g, "") : "";
            
            if (!cpfLimpo) {

                console.error("✨ 🛑 Falha crítica: CPF não encontrado para salvar nos cards.");
                return;

            }

            const payload = {
                cpef: cpfLimpo,
                dadosPaciente: {
                    endereco: {
                        cepe: cep,
                        ruaa: rua,
                        nume: numero,
                        bair: bairro,
                        cida: cidade,
                        esta: estado
                    }
                }
            };
            

            console.log("");
            console.log("💾 📍 ------------------------------");
            console.log("💾 📍 INICIANDO SALVAMENTO:");
            console.log(`💾 📍 Componente - PacienteEndereco.jsx`);
            console.log(`💾 📍 Funcao: salvardadosPacienteEndereco()`);
            console.log("💾 📍 -------------------------------");

            console.log("");
            console.log("💾 📍 -------------------------------");
            console.log("💾 📍 🔍 EXTRAÇÃO DE IDENTIDADE:");
            console.log(`💾 📍 🛰️ Componente - PacienteEndereco.jsx`);
            console.log("💾 📍 🆔 cpfLimpo (para URL):", cpfLimpo);
            console.log("💾 📍 🌐 URL_SERVIDOR:", URL_SERVIDOR);
            console.log("💾 📍 -------------------------------");

            console.log("");
            console.log("📐 ----------------------------------");
            console.log(`📐 📦 DADOS PREPARADOS PARA ENVIO (Endereco Paciente):`);
            console.log(`📐 componente - PacienteEndereco.jsx`);
            console.log("📐 payload:", payload);
            console.log("📐 ----------------------------------");


            // ⏳ UX: Garante tempo mínimo de 800 ms para feedback visual
            const tempoMinimo = new Promise(resolve => setTimeout(resolve, 800));

            // 📡 Transmissão para a VPS
            const requisicao = fetch(`${URL_SERVIDOR}/atualizar-paciente-endereco`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const [resposta] = await Promise.all([requisicao, tempoMinimo]);

            const resultado = await resposta.json();

            if (resposta.ok) {

                console.log("");
                console.log("💾 📡 --------------------------");
                console.log("💾 📡 Resposta do Servidor OK");
                console.log("💾 📍 Componente - PacienteEndereco.jsx");
                console.log("💾 📡 Status : ✅ Sincronizado");
                console.log("💾 📡 ---------------------------");

                setMsg({ tipo: 'sucesso', texto: '✅ Endereço do paciente atualizado!' });
                carregarDadosDoBanco();

            } else {

                console.log("💾 ⚠️ SERVIDOR REJEITOU:", resultado.erro);
                setMsg({ tipo: 'erro', texto: resultado.erro });

            }

        } catch (error) {

            console.log("💾 🚨 FALHA CRÍTICA NO PROCESSO:");
            console.error("💾 🚨 Detalhes:", error);
            alert("❌ Erro de conexão com o servidor VPS.");

        } finally {

            setCarregandoOperacao(false); // 🏁 Finaliza modo carregando
            temporizadorMSG();

        }
    };

    /* -------------------------------------------------------- */
    /* FIM - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API)    */
    /* -------------------------------------------------------- */










    return (
        <div className="componente-principal-padrao-paciente">
        

            <div className="componente-suporte-padrao-paciente">


                <div className="card-padrao-paciente">
                    
                    <div className="card-padrao-titulo">📍 ENDEREÇO DO PACIENTE</div>

                    {/* 📐 FEEDBACK FLUTUANTE (SALTADO) - Condicional */}
                    {msg.texto && <div className={`cad-admin-feedback-endereco ${msg.tipo}`}>{msg.texto}</div>}

                    <div className="card-padrao-corpo">

                        {/* ⏳ OVERLAY DE CARREGAMENTO NO CARD (Bloqueio Visual) */}
                        {carregandoOperacao && <div className="loading-overlay-card">⏳ Processando...</div>}


     
                        <div className="flex-cep">
                                <label>CEP</label>
                                <input ref={cepInputRef} type="text" disabled={!podeEditar || carregandoOperacao} value={cep} onChange={lidarComCep} maxLength="10" />
                            </div>

                            <div className="flex-rua">
                                <label>Rua/Avenida</label>
                                <input type="text" disabled={!podeEditar || carregandoOperacao} value={rua} onChange={(e) => setRua(e.target.value)} />
                            </div>
        
                            <div className="flex-numero">    
                                <label>Nº</label>
                                <input type="text" disabled={!podeEditar || carregandoOperacao} value={numero} onChange={(e) => setNumero(e.target.value)} />   
                            </div>

                            <div className="flex-bairro "> 
                                <label>Bairro</label>
                                <input type="text" disabled={!podeEditar || carregandoOperacao} value={bairro} onChange={(e) => setBairro(e.target.value)} />
                            </div>

                            <div className="flex-cidade"> 
                                <label>Cidade</label>
                                <input type="text" disabled={!podeEditar || carregandoOperacao} value={cidade} onChange={(e) => setCidade(e.target.value)} />
                            </div>

                            <div className="flex-estado "> 
                                <label>UF</label>
                                <input type="text" disabled={!podeEditar || carregandoOperacao} value={estado} maxLength="2" onChange={(e) => setEstado(e.target.value.toUpperCase())} />
                            </div>
                        

                       





                        <div className="AreaBotoes">

                            {!podeEditar && !ehNovoCadastro ? (
                                <button 
                                    type="button" 
                                    className="BotaoEditar" 
                                    onClick={() => { 
                                        setPodeEditar(true);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                >
                                    🔓 Editar
                                </button>
                            ) : (
                                <>
                                    <button 
                                        type="button" 
                                        className="BotaoSalvar" 
                                        disabled={carregandoOperacao}
                                        onClick={salvardadosPacienteEndereco}
                                    >
                                        {carregandoOperacao ? '⏳ Salvando...' : '💾 Salvar'}
                                    </button>

                                    {/* O botão cancelar só aparece se não for um cadastro novo */}
                                    {!ehNovoCadastro && !carregandoOperacao && (
                                        <button 
                                            type="button" 
                                            className="BotaoCancelar" 
                                            onClick={() => { 
                                                carregarDadosDoBanco(); 
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                        >
                                            ✖️ Cancelar
                                        </button>
                                    )}
                                </>
                            )}
                        </div>

                


                    </div>

                </div>

            </div>
        </div>
    );
}