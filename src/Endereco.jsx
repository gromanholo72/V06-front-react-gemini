
import { useState, useEffect, useRef, useCallback } from 'react';
import { ref, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';
import { useAuth, URL_SERVIDOR } from './AutenticacaoContexto';
import './Endereco.css'; 

export function Endereco() {

    const cepInputRef = useRef(null);

    const { 

        dadosToken,

        carregandoOperacao,
        setCarregandoOperacao,
        carregandoPermissoesFireBase,

        msg, 
        setMsg
    
    } = useAuth();
    
    const [ehNovoCadastro, setEhNovoCadastro] = useState(false);
   
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    
    






    // ---------------------------------
    // INICIO - ✏️ Foco Automático ao Editar
    // ---------------------------------

    const [podeEditar, setPodeEditar] = useState(false);
    const podeEditarRef = useRef(podeEditar);
    useEffect(() => {

        podeEditarRef.current = podeEditar;

    }, [podeEditar]);

    useEffect(() => {
        if (podeEditar) {

            cepInputRef.current?.focus();

        }
    }, [podeEditar]);

    // ---------------------------------
    // FIM - ✏️ Foco Automático ao Editar
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

        if (!dadosToken?.cpef) return;
   
        const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/dadosEndereco`);

        try {

            const snapshot = await get(caminhoNoBanco);
            
            if (snapshot.exists()) {

                const dadosEnde = snapshot.val();

                popularCamposEndereco(dadosEnde);
                setEhNovoCadastro(false);
                setPodeEditar(false);

            } else {
                
                limparCampos();  
                setEhNovoCadastro(true); 
                setPodeEditar(true);

            }

        } catch (error) {

            console.error("❌ Erro ao buscar endereço na Antena Central:", error);

            setPodeEditar(true); 

        }

        

    }, [dadosToken?.cpef, popularCamposEndereco, limparCampos]);

    useEffect(() => {

        if (carregandoPermissoesFireBase || !dadosToken?.cpef) {
            console.log("✨ 🛰️ Aguardando carregar ...");
            return;
        }

        carregarDadosDoBanco();

    }, [carregandoPermissoesFireBase, dadosToken, carregarDadosDoBanco]);

    // ---------------------------------
    // FIM - 🕵️‍♂️ Distribui o endereço para os cards
    // ---------------------------------













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










    // ------------------
    // INICIO - 🛠️ MÁSCARA DE CEP
    // ------------------

    const mascaraCep = (e) => {
        // 🧱 Se a obra estiver travada (podeEditar = false), não faz nada
        if (!podeEditar) return;
    
        // 🧱 Passo 1: Captura o valor e limpa tudo o que não é número
        let v = e.target.value.replace(/\D/g, '');
    
        // 🧱 Passo 2: Limita a 8 números (o tamanho real do CEP)
        if (v.length > 8) v = v.substring(0, 8);
    
        // 🧱 Passo 3: Aplica o ponto e o traço (Padrão: 00.000-000)
        // Primeiro o ponto: 00.000
        v = v.replace(/^(\d{2})(\d)/, '$1.$2');
        // Depois o traço: 00.000-000
        v = v.replace(/(\d{3})(\d)/, '$1-$2');
    
        // 📐 👔 console.log("📐 📍 cep = ", v);
    
        // 🧱 Passo 4: Atualiza o Estado (Sua variável 'cep')
        setCep(v);
    };

    // ------------------
    // FIM - 🛠️ MÁSCARA DE CEP
    // ------------------




    // ------------------------------
    // INICIO - 🛠️ MÁSCARA DE NUMERO
    // ------------------------------

    const mascaraNume = (e) => {
        // 🧱 Trava de segurança da obra
        if (!podeEditar) return;
    
        // 🧱 Limpeza: Aceita apenas números (evita que digitem letras no Nº)
        let v = e.target.value.replace(/\D/g, '');
    
        // 📐 👔 console.log("📐 🏠 numero = ", v);
    
        // 💾 Salva na prancheta (Estado)
        setNumero(v);
    };

    // ------------------------------
    // INICIO - 🛠️ MÁSCARA DE NUMERO
    // ------------------------------











    /* -------------------------------------------------------- */
    /* INICIO - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API) */
    /* -------------------------------------------------------- */

    // ⏳ Função centralizada para limpar mensagens após um tempo
    const temporizadorMSG = () => {
        setTimeout(() => {
            setMsg({ tipo: '', texto: '' });
        }, 3000);
    };

    const salvardadosEndereco = async () => {

        if (carregandoOperacao) return;

        window.scrollTo({ top: 0, behavior: 'smooth' });

        setMsg({ 
            tipo: '', 
            texto: '' 
        });
        setCarregandoOperacao(true);

        try {

            const cpfLimpo = dadosToken?.cpef ? dadosToken.cpef.replace(/\D/g, "") : "";
            
            if (!cpfLimpo) {

                console.error("✨ 🛑 Falha crítica: CPF não encontrado para salvar nos cards.");
                return;

            }

            const payload = {
                cpef: cpfLimpo,
                dadosEndereco: {
                    cepe: cep,
                    ruaa: rua,
                    nume: numero,
                    bair: bairro,
                    cida: cidade,
                    esta: estado
                }
            };
            

            // console.log("");
            // console.log("💾 -------------------------------");
            // console.log("💾 salvardadosEndereco");
            // console.log("💾 📍 Endereco.jsx");
            // console.log("💾 cpfLimpo: ", cpfLimpo);
            // console.log("💾 URL_SERVIDOR: ", URL_SERVIDOR);
            // console.log("💾 payload: ", payload);
            // console.log("💾 ----------------------------------");


            // ⏳ UX: Garante tempo mínimo de 500 ms segundo de loading
            const tempoMinimo = new Promise(resolve => setTimeout(resolve, 500));

            // �📡 Transmissão para a VPS
            const requisicao = fetch(`${URL_SERVIDOR}/atualizar-endereco`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const [resposta] = await Promise.all([requisicao, tempoMinimo]);

            const resultado = await resposta.json();

            if (resposta.ok) {

                // console.log("");
                // console.log("💾 -----------------------------------------------------------");
                // console.log("💾 Resposta do Servidor OK");
                // console.log("💾 📍 Endereco.jsx");
                // console.log("💾 resultado: ", resultado);
                // console.log("💾  -----------------------------------------------------------");

                setMsg({ 

                    tipo: 'sucesso', 
                    texto: '✅ Endereco atualizado com sucesso!'

                });
                carregarDadosDoBanco();

            } else {

                console.log("💾 ⚠️ SERVIDOR REJEITOU:", resultado.erro);
                setMsg({ 
                    tipo: 'erro', 
                    texto: resultado.erro 
                });

            }

        } catch (error) {

            console.log("💾 🚨 FALHA CRÍTICA NO PROCESSO:");
            console.error("💾 🚨 Detalhes:", error);
            alert("❌ Erro de conexão com o servidor VPS.");

        } finally {

            setCarregandoOperacao(false); 
            temporizadorMSG();

        }
    };

    /* -------------------------------------------------------- */
    /* FIM - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API) */
    /* -------------------------------------------------------- */











    
    

    // ✖️ CANCELAR EDIÇÃO: Descarta as mudanças locais e restaura o que está no Contexto
    const cancelarEdicao = () => {

        console.log("");
        console.log("📐 ----------------------------------");
        console.log("📐 🚀 EVENTO: Clique no botão '✖️ Cancelar Edição'");
        console.log("📐 componente - 🧿 Endereco.jsx");
        console.log("📐 📍 carregarDadosDoBanco() & setPodeEditar(false)");
        console.log("📐 ----------------------------------");

        console.log("✨ 🔄 Cancelando edição. Restaurando dados do Contexto...");

        carregarDadosDoBanco(); 

        setPodeEditar(false); 
        
        console.log("✨ ✅ Edição cancelada e cards restaurados com sucesso!");
        
    };








    return (
       
        <div className="componente-de-pagina">
        
        
            <div className="perfil-endereco-componente-suporte">


                <div className="perfil-endereco-usuario-card">

                    <div className="perfil-endereco-card-titulo">📍 ENDEREÇO RESIDENCIAL</div>

                    {msg.texto && <div className={`cad-admin-feedback-endereco ${msg.tipo}`}>{msg.texto}</div>}

                    <div className="perfil-endereco-card-corpo">

                        {carregandoOperacao && <div className="loading-overlay-card">⏳ Processando...</div>}
                  
                        <div className="Campo flex-cep">
                            <label>CEP</label>
                            <input 
                                ref={cepInputRef} // ✨ Conexão da antena de foco
                                type="text" 
                                name="cepe"
                                placeholder="00.000-000"
                                disabled={!podeEditar || carregandoOperacao} 
                                value={cep} 
                                onChange={mascaraCep} 
                                autoComplete="postal-code"
                                maxLength="10" 
                                required
                            />
                        </div>



                        <div className="Campo flex-rua">
                            <label>Rua/Avenida</label>
                            <input type="text" disabled={!podeEditar || carregandoOperacao} value={rua} onChange={(e) => setRua(e.target.value)} />
                        </div>
    


                        <div className="Campo flex-numero">    
                            <label>Nº</label>
                            <input 
                                type="text" 
                                name="nume"
                                disabled={!podeEditar || carregandoOperacao} 
                                value={numero} 
                                onChange={mascaraNume} 
                                autoComplete="address-line2"
                            />  
                        </div>


                        <div className="Campo flex-bairro "> 
                            <label>Bairro</label>
                            <input type="text" disabled={!podeEditar || carregandoOperacao} value={bairro} onChange={(e) => setBairro(e.target.value)} />
                        </div>


                        <div className="Campo flex-cidade"> 
                            <label>Cidade</label>
                            <input type="text" disabled={!podeEditar || carregandoOperacao} value={cidade} onChange={(e) => setCidade(e.target.value)} />
                        </div>


                        <div className="Campo flex-estado "> 
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
                                        onClick={salvardadosEndereco}
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