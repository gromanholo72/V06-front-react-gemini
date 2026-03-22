import { useState, useEffect, useRef, useCallback } from 'react'; // 🏆 Importado useCallback
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';
import { useAuth, URL_SERVIDOR } from './AutenticacaoContexto';

import './Cnpj.css';



export function Cnpj() {

    const cnpjInputRef = useRef(null);

    const { dadosToken } = useAuth();

    const [ehNovoCadastro, setEhNovoCadastro] = useState(false);

    // Estados de Dados
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [situacao, setSituacao] = useState('');
    const [atividades, setAtividades] = useState('');
    const [socios, setSocios] = useState('');

    // Estados de Controle
    const [carregandoOperacao, setCarregandoOperacao] = useState(false);
    const [podeEditar, setPodeEditar] = useState(false);

    // 🏆 PONTO SÊNIOR 1: Trava de fluxo com Ref (Bloqueia buscas desnecessárias da BrasilAPI)
    const podeEditarRef = useRef(podeEditar);
    useEffect(() => {
        podeEditarRef.current = podeEditar;
    }, [podeEditar]);

    /* -------------------------------------------------------- */
    /* INICIO - 📨 SISTEMA DE MENSAGENS E FEEDBACK VISUAL */
    /* -------------------------------------------------------- */
    const [msg, setMsg] = useState({ tipo: '', texto: '' });

    // ⏳ Função centralizada para limpar mensagens após um tempo
    // 🏆 Envolvida em useCallback (v1 estável)
    const temporizadorMSG = useCallback(() => {
        setTimeout(() => {
            setMsg({ tipo: '', texto: '' });
        }, 4000);
    }, []);
    /* -------------------------------------------------------- */
    /* FIM - 📨 SISTEMA DE MENSAGENS E FEEDBACK VISUAL */
    /* -------------------------------------------------------- */




    // ---------------------------------
    // INICIO - ✏️ Foco Automático ao Editar
    // ---------------------------------

    useEffect(() => {
        if (podeEditar) {
            cnpjInputRef.current?.focus();
        }
    }, [podeEditar]);

    // ---------------------------------
    // FIM - ✏️ Foco Automático ao Editar
    // ---------------------------------









    


    // ---------------------------------
    // INICIO - 🕵️‍♂️ Distribui os dados para os cards
    // ---------------------------------

    // 🏆 Envolvida em useCallback (v1 estável)
    const popularCamposCnpj = useCallback((dados) => {
        setCnpj(String(dados.num_cnpj || dados.cnpj || '').trim());
        setRazaoSocial(String(dados.raza || dados.razao || '').trim());
        setNomeFantasia(String(dados.Fant || dados.fantasia || 'NÃO INFORMADO').trim());
        setSituacao(String(dados.situ || '').trim());
        setAtividades(String(dados.ativ || '').trim());
        setSocios(String(dados.soci || 'NÃO INFORMADO').trim());
    }, []);

    // 🏆 Envolvida em useCallback (v1 estável)
    const limparCampos = useCallback(() => {
        setCnpj('');
        setRazaoSocial('');
        setNomeFantasia('');
        setSituacao('');
        setAtividades('');
        setSocios('');
    }, []);
        
    // 🏆 Envolvida em useCallback (dependente de popular... e limpar...)
    const carregarDadosDoBanco = useCallback(async () => {

        const cpfAtivo = dadosToken?.cpef;

        if (cpfAtivo) {
            
            console.warn("✨ 🛰️ CNPJ vazio na memória. Buscando na Antena Central...");
            
            const cpfLimpo = cpfAtivo.replace(/\D/g, "");
            // 📐 Ajuste Ouro: Usar nó sagrado 'dadosEmpresa' (conforme payload VPS)
            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/dadosEmpresa`);

            try {
                setCarregandoOperacao(true); // Ativa loading

                const snapshot = await get(caminhoNoBanco);
                
                if (snapshot.exists()) {

                    const dadosCnpj = snapshot.val();

                    console.log("");
                    console.log("✨ --------------------------------------------------");
                    console.log("✨ CARREGANDO DADOS DO CNPJ DIRETO DO FIREBASE");
                    console.log("✨ useEffect() - Componente - 🏢 Cnpj.jsx");
                    console.log("✨ ✅ CNPJ encontrado no Realtime - dadosEmpresa.");
                    console.log("✨ --------------------------------------------------");

                    popularCamposCnpj(dadosCnpj); // Usa referência v1 estável
                    setEhNovoCadastro(false);
                    setPodeEditar(false);

                } else {

                    console.log("");
                    console.log("✨ 🛰️ ----------------------------------");
                    console.log("✨ 🛰️ useEffect() - componente - 🏢 Cnpj.jsx");
                    console.log("✨ 🛰️ funcao: carregarDadosDoBanco()");
                    console.log("✨ 📍 Nenhum CNPJ no banco. Liberando edição.");
                    console.log("✨ --------------------------------------------------");
                    
                    limparCampos();  // Usa referência v1 estável
                    setEhNovoCadastro(true); 
                    setPodeEditar(true);

                }
            } catch (error) {

                console.error("❌ Erro ao buscar CNPJ na Antena Central:", error);
                setPodeEditar(true); 

            } finally {
                setCarregandoOperacao(false); // Desativa loading
            }

        }

    }, [dadosToken?.cpef, popularCamposCnpj, limparCampos]); // 📐 Dependências sagradas

    // 🏆 Gatilho Seguro do useEffect (v1 estável)
    useEffect(() => {
        if (dadosToken?.cpef) {
            carregarDadosDoBanco();
        } else {
            console.warn("✨ 🛰️ ⏳ Aguardando sinal da Antena Central para carregar CNPJ...");
        }
    }, [dadosToken, carregarDadosDoBanco]); // 📐 Vigia apenas o token e a função v1 estável

    // ---------------------------------
    // FIM - 🕵️‍♂️ Distribui os dados para os cards
    // ---------------------------------














    // --------------------------------------------------------------------
    // INICIO - 🔍 BUSCA CNPJ (BrasilAPI) - Versão Moderna Controlada
    // --------------------------------------------------------------------

    // 🏆 Envolvida em useCallback (v1 estável, dependente de limpar...)
    const realizarBuscaCnpj = useCallback(async () => {

        // 🏆 PONTO SÊNIOR 2: Bloqueio via Ref Estável (Só roda se for edição ATIVA)
        if (!podeEditarRef.current) return;

        const cnpjLimpo = cnpj.replace(/\D/g, '');

        // Se o usuário apagar o CNPJ ou o tamanho for menor que 14, limpa os campos dependentes
        if (cnpjLimpo.length < 14) {
            limparCampos(); // Usa referência estável
            return;
        }

        if (cnpjLimpo.length === 14) {
            try {
                setCarregandoOperacao(true); // UX: Ativa loading

                // Tempo mínimo para UX
                const tempoMinimo = new Promise(resolve => setTimeout(resolve, 500));

                const requisicao = fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpjLimpo}`);

                const [resposta] = await Promise.all([requisicao, tempoMinimo]);
                const dados = await resposta.json();

                if (dados.cnpj) {
                    setRazaoSocial(dados.razao_social || '');
                    setNomeFantasia(dados.nome_fantasia || 'NÃO INFORMADO');
                    setSituacao(dados.descricao_situacao_cadastral || '');
                    setAtividades(dados.cnae_fiscal_descricao || '');
                    const listaSocios = dados.qsa?.map(s => s.nome_socio).join(', ') || 'NÃO INFORMADO';
                    setSocios(listaSocios);
                } else {
                    alert("⚠️ CNPJ não encontrado na base de dados (BrasilAPI).");
                    limparCampos();
                }

            } catch (error) {
                console.error("❌ Falha na comunicação com a BrasilAPI:", error);
                alert("❌ Erro ao buscar CNPJ. Verifique sua conexão.");
            } finally {
                setCarregandoOperacao(false); // UX: Finaliza loading
            }
        }
    }, [cnpj, limparCampos]); // 📐 Dependências sagradas

    // 🏆 useEffect vigilante da BrasilAPI (v1 estável)
    useEffect(() => {
        realizarBuscaCnpj();
    }, [realizarBuscaCnpj]); // Vigia a referência estável

    // ----------------------------------
    // FIM - 🔍 BUSCA CNPJ (BrasilAPI) - Versão Moderna Controlada
    // ----------------------------------








    // ------------------
    // INICIO - 🛠️ MÁSCARA DE CNPJ
    // ------------------

    const mascaraCnpj = (e) => {
       
        if (!podeEditar) return;
        
        // 🧱 Passo 1: Limpeza (Remove tudo o que não é número)
        let v = e.target.value.replace(/\D/g, '');

        // 🧱 Passo 2: Corte (Limita aos 14 números do CNPJ)
        if (v.length > 14) v = v.substring(0, 14);

        // 🧱 Passo 3: Assentamento (Aplica a pontuação progressiva)
        v = v.replace(/^(\d{2})(\d)/, '$1.$2');             // 00.
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); // 00.000.
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');           // 00.000.000/
        v = v.replace(/(\d{4})(\d)/, '$1-$2');              // 00.000.000/0000-00

        // 🧱 Passo 4: Atualiza a Planta (Estado)
        setCnpj(v);
    };

    // ------------------
    // INICIO - 🛠️ MÁSCARA DE CNPJ
    // ------------------











    // /* -------------------------------------------------------- */
    // /* INICIO - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API) */
    // /* -------------------------------------------------------- */

    const salvardadosEmpresa = async () => {

        if (carregandoOperacao) return; 

        window.scrollTo({ top: 0, behavior: 'smooth' });

        console.log("");
        console.log("💾 🏢 ------------------------------");
        console.log("💾 🏢 INICIANDO SALVAMENTO:");
        console.log("💾 🏢 Componente - 🏢 Cnpj.jsx");
        console.log("💾 🏢 Funcao: salvardadosEmpresa()");
        console.log("💾 🏢 -------------------------------");

        setMsg({ tipo: '', texto: '' });
        setCarregandoOperacao(true); 

        try {

            // 🛡️ VALIDAÇÃO DE SEGURANÇA: Bloqueia salvamento de campos vazios (Sênior)
            if (!cnpj.trim() || !razaoSocial.trim() || !atividades.trim()) {
                console.log("💾 ⚠️ ALERTA: Tentativa de salvar com campos vazios (CNPJ barrada.");
                setMsg({ tipo: 'erro', texto: '⚠️ CNPJ, Razão Social e Atividade Principal são obrigatórios!' });
                if (!cnpj.trim()) cnpjInputRef.current?.focus();
                return; 
            }

            const cpfLimpo = dadosToken?.cpef ? dadosToken.cpef.replace(/\D/g, "") : "";
            
            if (!cpfLimpo) {
                console.error("✨ 🏢 🛑 Falha crítica: CPF não encontrado para salvar nos cards.");
                return;
            }


            console.log("");
            console.log("💾 🏢 -------------------------------");
            console.log("💾 🏢 🔍 EXTRAÇÃO DE IDENTIDADE:");
            console.log("💾 🏢 🛰️ Componente - 🏢 Cnpj.jsx");
            console.log("💾 🏢 🆔 cpfLimpo (para URL):", cpfLimpo);
            console.log("💾 🏢 🌐 URL_SERVIDOR:", URL_SERVIDOR);
            console.log("💾 🏢 -------------------------------");

       
            // Payload Sagrado (Conforme rota VPS)
            const payload = {
                cpef: cpfLimpo,
                dadosEmpresa: {
                    cnpj: cnpj,
                    raza: razaoSocial,
                    Fant: nomeFantasia,
                    situ: situacao,
                    ativ: atividades,
                    soci: socios
                }
            };


            console.log("");
            console.log("📐 ----------------------------------");
            console.log("📐 📦 DADOS PREPARADOS PARA ENVIO (CNPJ):");
            console.log("📐 componente - Cnpj.jsx");
            console.log("📐 payload:", payload);
            console.log("📐 ----------------------------------");

            // ⏳ UX: Tempo mínimo de loading
            const tempoMinimo = new Promise(resolve => setTimeout(resolve, 500));

            // �📡 Transmissão para a VPS (Rota sagrada /atualizar-empresa)
            const requisicao = fetch(`${URL_SERVIDOR}/atualizar-empresa`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const [resposta] = await Promise.all([requisicao, tempoMinimo]);
            
            const resultado = await resposta.json();

            if (resposta.ok) {

                console.log("");
                console.log("💾 📡 -----------------------------------------------------------");
                console.log("💾 📡 Resposta do Servidor OK");
                console.log("💾 🏢 Componente - 🏢 Cnpj.jsx");
                console.log("💾 📡 Status : ✅ Sincronizado");
                console.log("💾 📡 -----------------------------------------------------------");

                setMsg({ tipo: 'sucesso', texto: '✅ Dados da Empresa atualizados com sucesso!' });

                carregarDadosDoBanco(); // Recarrega os dados do RTDB

            } else {

                console.warn("💾 ⚠️ SERVIDOR REJEITOU:", resultado.erro);
                setMsg({ tipo: 'erro', texto: resultado.erro });

            }

        } catch (error) {

            console.error("💾 🚨 FALHA CRÍTICA NO PROCESSO:");
            console.error("💾 🚨 Detalhes:", error);
            setMsg({ tipo: 'erro', texto: '❌ Erro de conexão com o servidor VPS.' });

        } finally {

            setCarregandoOperacao(false); // UX: Finaliza loading
            temporizadorMSG();

        }
    };
    // /* -------------------------------------------------------- */
    // /* FIM - 💾 SALVAR VIA SERVIDOR VPS (PADRÃO MAESTRO API) */
    // /* -------------------------------------------------------- */







    
    
    return (

        
        <div className="componente-de-pagina">
        
            {/* 🧱 2. COMPONENTE-SUPORTE (VIGA ESTRUTURAL) */}
            <div className="perfil-cnpj-componente-suporte">


                {/* 📋 3. CARD-DADOS (O CARTÃO DE CONTATO) */}
                <div className="perfil-cnpj-usuario-card">
                    
                    {/* 🏷️ 4. CARD-HEADER (TOPO DO CARTÃO) */}
                    <div className="perfil-cnpj-card-titulo">🏢 DADOS EMPRESARIAIS</div>

                    {/* 📨 Feedback Visual Sagrado */}
                    {msg.texto && <div className={`cad-admin-feedback-cnpj ${msg.tipo}`}>{msg.texto}</div>}

                    {/* 📄 5. CARD-BODY (ÁREA DE CONTEÚDO FLEX) */}
                    <div className="perfil-cnpj-card-corpo">

                        {/* ⏳ OVERLAY DE CARREGAMENTO NO CARD (Bloqueio Visual) */}
                        {carregandoOperacao && <div className="loading-overlay-card">⏳ Processando...</div>}


                     

                        {/* 🔍 6. CAMPOS & INPUTS */}
                        {/* 🧱 CLASSES DE LAYOUT SAGRADAS: flex-cnpj */}
                        <div className="Campo flex-cnpj">
                            <label>CNPJ (via BrasilAPI)</label>
                            <input 
                                ref={cnpjInputRef} // ✨ Conexão da antena de foco
                                type="text" 
                                name="cnpj"
                                placeholder="00.000.000/0000-00"
                                disabled={!podeEditar || carregandoOperacao} // Estado de Edição
                                value={cnpj} 
                                onChange={mascaraCnpj} // Máscara de CNPJ
                                autoComplete="organization" 
                                required
                            />
                        </div>

                        {/* Campos Desabilitados (Modo Leitura via BrasilAPI) */}
                        <div className="Campo flex-razao">
                            <label>Razão Social</label>
                            <input type="text" disabled={true} value={razaoSocial} className="input-travado" />
                        </div>

                        <div className="Campo flex-fantasia">
                            <label>Nome Fantasia</label>
                            <input type="text" disabled={true} value={nomeFantasia} />
                        </div>

                        <div className="Campo flex-situacao">
                            <label>Situação</label>
                            <input type="text" disabled={true} value={situacao} />
                        </div>
                        
                        <div className="Campo flex-atividade">
                            <label>Atividade Principal</label>
                            <input type="text" disabled={true} value={atividades} />
                        </div>

                        <div className="Campo flex-socio">
                            <label>Sócios / Proprietários</label>
                            <input type="text" disabled={true} value={socios} />
                        </div>






                        {/* 🕹️ 7. ÁREA DE BOTÕES (COMANDO DOS CARDS) */}
                        <div className="AreaBotoes">

                            {!podeEditar ? (
                                // Modo Leitura: Botão Editar
                                <button 
                                    type="button" 
                                    className="BotaoEditar" 
                                    onClick={() => { setPodeEditar(true); }}
                                >
                                    🔓 Editar
                                </button>
                            ) : (
                                // Modo Edição: Botões Salvar e Cancelar
                                <>
                                    <button 
                                        type="button" 
                                        className="BotaoSalvar" 
                                        disabled={carregandoOperacao}
                                        onClick={salvardadosEmpresa} // Função VPS
                                    >
                                        💾 Salvar
                                    </button>
                                    
                                    {/* O botão cancelar só aparece se NÃO for um cadastro novo */}
                                    {!ehNovoCadastro && !carregandoOperacao && (
                                        <button 
                                            type="button" 
                                            className="BotaoCancelar" 
                                            onClick={() => { 
                                                carregarDadosDoBanco(); // Função RTDB
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