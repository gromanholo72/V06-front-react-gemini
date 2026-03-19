
import { useState, useEffect, useRef } from 'react';

import { ref, update, get } from "firebase/database"; 

import { db_realtime } from './firebaseConfig.js';

import { useAuth, URL_SERVIDOR } from './AutenticacaoContexto';

import './Endereco.css'; 



export function Endereco() {


    const cepInputRef = useRef(null);

    
    const { dadosToken } = useAuth();
    

    // No início do componente, junto aos outros hooks:
    const [ehNovoCadastro, setEhNovoCadastro] = useState(false);
   

    // 🧰 Ferramentas de Trabalho (Hooks)
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [numero, setNumero] = useState('');
    

    const [podeEditar, setPodeEditar] = useState(false);




    useEffect(() => {
        // Se o portão de edição abrir, foca no CEP
        if (podeEditar) {

            cepInputRef.current?.focus();

        }
    }, [podeEditar]);






    




    

    /* 🧱 FERRAMENTAS DE TRABALHO (useEffect) - MONITORAMENTO */
    useEffect(() => {

        // console.log("");
        // console.warn("✨ 🛰️ ----------------------------------");
        // console.warn("✨ 🛰️ useEffect() - componente - 📍 Endereco.jsx");
        // console.warn("✨ 🛰️ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");

        if (dadosToken?.cpef) {

            // console.warn("✨ 🛰️ 🧖‍♂️ dadosToken.cpef = ", dadosToken.cpef);

            carregarDadosDoBanco();

        } else {

            // console.warn("✨ 🛰️ ⏳ Aguardando sinal da Antena Central para carregar Endereço...");

        }

        // console.warn("✨ 🛰️ ----------------------------------");

    }, [dadosToken]);



    /* 🕵️‍♂️ FUNÇÃO: Distribui o endereço para os cards (Memória ou Banco) */
    const carregarDadosDoBanco = async () => {

        /* 🧱 Primeiro, verificamos se o endereço já está na memória (Contexto) */
        const infoEndereco = dadosToken?.ende;

        /* 🚀 Se o cpef existe mas NÃO tem endereço na memória, busca na Antena Central */
        if (!infoEndereco || Object.keys(infoEndereco).length === 0) {
            
            // console.warn("✨ 🛰️ Endereço vazio na memória. Buscando na Antena Central...");
            
            const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/dadosEndereco`);

            try {

                const snapshot = await get(caminhoNoBanco);
                
                if (snapshot.exists()) {

                    const dadosEnde = snapshot.val();



                    console.log("");
                    console.log("✨ --------------------------------------------------");
                    console.log("✨ CARREGANDO DADOS DO ENDERECO DIRETO DO FIREBASE");
                    console.log("✨ useEffect() - Componente - 📍 Endereco.jsx");
                    console.log("✨ ✅ Endereço encontrado no Realtime.");
                    console.log("✨ --------------------------------------------------");

                    popularCamposEndereco(dadosEnde);
                    setEhNovoCadastro(false); // 🎯 Existe no banco, não é novo
                    setPodeEditar(false);

                } else {

                    console.log("");
                    console.log("✨ 🛰️ ----------------------------------");
                    console.log("✨ 🛰️ useEffect() - componente - 📍 Endereco.jsx");
                    console.log("✨ 🛰️ funcao: carregarDadosDoBanco()");
                    console.log("✨ 📍 Nenhum endereço no banco. Liberando edição.");
                    console.log("✨ --------------------------------------------------");
                    
                    limparCampos();  
                    setEhNovoCadastro(true); 
                    setPodeEditar(true);

                }
            } catch (error) {

                console.error("❌ Erro ao buscar endereço na Antena Central:", error);
                setPodeEditar(true); 

            }

        } else {

            console.log("");
            console.log("✨ 🛰️ ----------------------------------");
            console.log("✨ 🛰️ useEffect() - componente - 📍 Endereco.jsx");
            console.log("✨ 🛰️ funcao: carregarDadosDoBanco()");
            console.log("✨ 🛰️ 🏠 Populando cards com endereço da memória.");

            popularCamposEndereco(infoEndereco);
            setEhNovoCadastro(false); 
            setPodeEditar(false);

        }
    };


    /* 🧱 Função Auxiliar para popular os estados dos cards de Endereço */
    const popularCamposEndereco = (dados) => {

        setCep(String(dados.cepe || '').trim());
        setRua(String(dados.ruaa || '').trim());
        setBairro(String(dados.bair || '').trim());
        setCidade(String(dados.cida || '').trim());
        setEstado(String(dados.esta || '').trim());
        setNumero(String(dados.nume || '').trim());

    };


    const limparCampos = () => {
        setCep('');
        setRua('');
        setBairro('');
        setCidade('');
        setEstado('');
        setNumero('');
    };



















    // --------------------------------------------------------------------
    // INICIO - 🔍 BUSCA ViaCEP (Só se estiver em modo edição) - Versão Moderna 2026
    // --------------------------------------------------------------------

    const realizarBuscaCep = async () => {

        if (!podeEditar) return;

        const apenasNumeros = cep.replace(/\D/g, '');


        // Se o usuário apagar o CEP ou o tamanho for menor que 8, limpa os campos dependentes
        if (apenasNumeros.length < 8) {
            setRua('');
            setBairro('');
            setCidade('');
            setEstado('');
            return;
        }


        if (apenasNumeros.length === 8) {
            try {
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

    const [msg, setMsg] = useState({ tipo: '', texto: '' });
    
    // ⏳ Função centralizada para limpar mensagens após um tempo
    const temporizadorMSG = () => {
        setTimeout(() => {
            setMsg({ tipo: '', texto: '' });
        }, 3000);
    };


    const salvardadosEndereco = async () => {


        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log("");
        console.log("💾 📍 ------------------------------");
        console.log("💾 📍 INICIANDO SALVAMENTO:");
        console.log("💾 📍 Componente - 📍 Endereco.jsx");
        console.log("💾 📍 Funcao: salvardadosContato()");
        console.log("💾 📍 -------------------------------");

        setMsg({ tipo: '', texto: '' });

        try {

            const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");

            if (!cpfLimpo) {

                console.error("✨ 🛑 Falha crítica: CPF não encontrado para salvar nos cards.");
                return;

            }

            console.log("");
            console.log("💾 📍 -------------------------------");
            console.log("💾 📍 🔍 EXTRAÇÃO DE IDENTIDADE:");
            console.log("💾 📍 🛰️ Componente - 📍 Endereco.jsx");
            console.log("💾 📍 🆔 cpfLimpo (para URL):", cpfLimpo);
            console.log("💾 📍 🌐 URL_SERVIDOR:", URL_SERVIDOR);
            console.log("💾 📍 -------------------------------");

       

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
            


            console.log("");
            console.log("📐 ----------------------------------");
            console.log("📐 📦 DADOS PREPARADOS PARA ENVIO (CONTATO):");
            console.log("📐 componente - UsuarioContato.jsx");
            console.log("📐 payload:", payload);
            console.log("📐 ----------------------------------");

            // �📡 Transmissão para a VPS
            const resposta = await fetch(`${URL_SERVIDOR}/atualizar-endereco`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const resultado = await resposta.json();

            if (resposta.ok) {

                console.log("");
                console.log("💾 📡 -----------------------------------------------------------");
                console.log("💾 📡 Resposta do Servidor OK");
                console.log("💾 🛰️ Componente - 📞 UsuarioContato.jsx");
                console.log("💾 📡 Status : ✅ Sincronizado");
                console.log("💾 📡 -----------------------------------------------------------");

                setMsg({ tipo: 'sucesso', texto: '✅ Endereco atualizado com sucesso!' });

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

        // Chamamos a função que já sabe ler o Contexto e preencher os inputs
        carregarDadosDoBanco(); 

        // Trava os inputs novamente (Fecha o portão de edição)
        setPodeEditar(false); 
        
        console.log("✨ ✅ Edição cancelada e cards restaurados com sucesso!");
        
    };








    return (
       
        <div className="perfil-endereco-componente-principal">
        
        
            <div className="perfil-endereco-componente-suporte">


                {/* 🧱 O formulário agora vive dentro de um container com título próprio */}
                <div className="perfil-endereco-usuario-card">


                    <div className="perfil-endereco-card-titulo">
                        📍 ENDEREÇO RESIDENCIAL
                    </div>



                    {msg.texto && <div className={`cad-admin-feedback-endereco ${msg.tipo}`}>{msg.texto}</div>}



                    <div className="perfil-endereco-card-corpo">


                                
                        <div className="Campo flex-cep">
                            <label>CEP</label>
                            <input 
                                ref={cepInputRef} // ✨ Conexão da antena de foco
                                type="text" 
                                name="cepe"
                                placeholder="00.000-000"
                                disabled={!podeEditar} 
                                value={cep} 
                                onChange={mascaraCep} 
                                autoComplete="postal-code"
                                maxLength="10" 
                                required
                            />
                        </div>

                        <div className="Campo flex-rua">
                            <label>Rua/Avenida</label>
                            <input type="text" disabled={!podeEditar} value={rua} onChange={(e) => setRua(e.target.value)} />
                        </div>
    
                        <div className="Campo flex-numero">    
                            <label>Nº</label>
                            <input 
                                type="text" 
                                name="nume"
                                // placeholder="S/N"
                                disabled={!podeEditar} 
                                value={numero} 
                                onChange={mascaraNume} 
                                autoComplete="address-line2"
                            />  
                        </div>

                        <div className="Campo flex-bairro "> 
                            <label>Bairro</label>
                            <input type="text" disabled={!podeEditar} value={bairro} onChange={(e) => setBairro(e.target.value)} />
                        </div>

                        <div className="Campo flex-cidade"> 
                            <label>Cidade</label>
                            <input type="text" disabled={!podeEditar} value={cidade} onChange={(e) => setCidade(e.target.value)} />
                        </div>

                        <div className="Campo flex-estado "> 
                            <label>UF</label>
                            <input type="text" disabled={!podeEditar} value={estado} maxLength="2" onChange={(e) => setEstado(e.target.value.toUpperCase())} />
                        </div>
                        







                        <div className="AreaBotoes">

                            {!podeEditar ? (
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
                                        onClick={salvardadosEndereco}
                                    >
                                        💾 Salvar
                                    </button>

                                    {/* O botão cancelar só aparece se não for um cadastro novo */}
                                    {!ehNovoCadastro && (
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