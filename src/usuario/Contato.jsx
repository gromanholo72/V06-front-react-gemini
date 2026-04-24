

import { useState, useEffect, useRef, useCallback } from 'react'; 
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from '../firebaseConfig.js';
import { useAuth, URL_SERVIDOR } from '../AutenticacaoContexto.jsx';

import './Contato.css'; 



export function Contato () {

    const [ ehNovoCadastro, setEhNovoCadastro ] = useState(false);

    const { 

        dadosToken, 
        carregandoPermissoesFireBase, 
       
        carregandoOperacao,
        setCarregandoOperacao,

        msg, 
        setMsg,

    } = useAuth();
    



    const [formContato, setFormContato] = useState({

        email: '',
        telefone: ''

    });




    

    // ---------------------------------
    // INICIO - ✏️ Foco Automático ao Editar
    // ---------------------------------

    const [podeEditar, setPodeEditar] = useState(false);
    const emailInputRef = useRef(null);
    useEffect(() => {

        if (podeEditar) {

            emailInputRef.current?.focus();

        }

    }, [podeEditar]);

    // ---------------------------------
    // FIM - ✏️ Foco Automático ao Editar
    // ---------------------------------






    
    // 🛠️ MÁSCARA DE EMAIL
    const mascaraEmail = (e) => {
        // 🧱 Trava de segurança da obra
        if (!podeEditar) return;
        
        // 🧱 Força minúsculas e remove espaços
        let v = e.target.value.toLowerCase().replace(/\s/g, '');
        
        setFormContato(prev => ({ ...prev, email: v }));
    };


    // 🛠️ MÁSCARA DE TELEFONE (Padrão solicitado)
    const mascaraTelefone = (e) => {
        // 🧱 Trava de segurança da obra
        if (!podeEditar) return;

        // 🧱 Passo 1: Limpeza total
        let v = e.target.value.replace(/\D/g, '');
    
        // 🧱 Passo 2: Corte (Máximo 11 números)
        if (v.length > 11) v = v.substring(0, 11);
    
        // 🧱 Passo 3: Assentamento Dinâmico (Aparece o parêntese logo no início)
        if (v.length > 0) {
            // Se tem pelo menos 1 número, já envolve com o parêntese
            v = v.replace(/^(\d{1,2})/, "($1"); 
        }
        if (v.length > 3) {
            // Se passou de 2 números (DDD), fecha o parêntese e dá o espaço
            v = v.replace(/^\((\d{2})(\d)/, "($1) $2");
        }
        if (v.length > 9) {
            // Se chegou no tamanho de celular, coloca o traço no lugar certo
            // Transforma (11) 988887777 em (11) 98888-7777
            v = v.replace(/(\d{5})(\d)/, "$1-$2");
        }

        // 📐 👔 console.log("📐 📱 fone formatado = ", v);
    
        // 🧱 Passo 4: Atualiza o Estado Local
        setFormContato(prev => ({ ...prev, telefone: v }));
    };












    /* ----------------------------------------------------------- */
    /* INICIO - 🕵️‍♂️ FUNÇÃO: Distribui os dados do contato no card */
    /* ----------------------------------------------------------- */
    
    const popularCamposGerais = useCallback((dados) => {
        
        const mailFinal = dados?.mail || '';
        const foneFinal = dados?.fone || '';

        setFormContato({

            email: String(mailFinal).trim(),
            telefone: String(foneFinal).trim()

        });

    }, []);

    const limparCampos = useCallback(() => {

        setFormContato({ 

            email: '', 
            telefone: '' 

        });

    }, []); 

    const carregarDadosDoBanco = useCallback(async () => {

        if (!dadosToken?.cpef) return;

        const cpfLimpo = dadosToken.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/dadosContato`);

        try {

            const snapshot = await get(caminhoNoBanco);
            
            if (snapshot.exists() && Object.values(snapshot.val()).some(v => v)) {

                const dadosContato = snapshot.val();

                popularCamposGerais(dadosContato);
                setEhNovoCadastro(false);
                setPodeEditar(false);

            } else {
              
                limparCampos();
                setEhNovoCadastro(true);
                setPodeEditar(true);

            }

        } catch (error) {

            console.error("❌ Erro ao buscar contato na Antena Central:", error);

            setPodeEditar(true);

        }

    }, [dadosToken?.cpef, popularCamposGerais, limparCampos]); 

    useEffect(() => {

        if (carregandoPermissoesFireBase || !dadosToken?.cpef) {
            console.log("✨ 🛰️ Aguardando carregar ...");
            return;
        }

        carregarDadosDoBanco();

    }, [carregandoPermissoesFireBase, dadosToken?.cpef, carregarDadosDoBanco]); 

    /* ----------------------------------------------------------- */
    /* FIM - 🕵️‍♂️ FUNÇÃO: Distribui os dados do contato no card */
    /* ----------------------------------------------------------- */




















/* -------------------------------------------------------- */
/* INICIO - 💾 SALVAR DIRETO NO FIREBASE (PADRÃO MAESTRO)    */
/* -------------------------------------------------------- */

// ⏳ Função centralizada para limpar mensagens após um tempo
const temporizadorMSG = () => {
    setTimeout(() => {
        setMsg({ tipo: '', texto: '' });
    }, 3000);
};

const salvardadosContato = async () => {
    
    if (carregandoOperacao) return;

    setMsg({ tipo: '', texto: '' });
    setCarregandoOperacao(true);

    try {
        // 🛡️ Validação de campos obrigatórios
        if (!formContato.email.trim() || !formContato.telefone.trim()) {
            console.log("💾 ⚠️ ALERTA: Tentativa de salvar com campos vazios barrada.");
            setMsg({ tipo: 'erro', texto: '⚠️ E-mail e Telefone são obrigatórios!' });
            if (!formContato.email.trim()) emailInputRef.current?.focus();  
            return; 
        }

        // 🆔 Identificação do Usuário (Pegando do seu contexto/token)
        const cpefOriginal = dadosToken?.cpef; 
        const cpfLimpo = cpefOriginal?.replace(/\D/g, "");

        if (!cpfLimpo) {
            console.log("💾 📞 🚨 ERRO: CPF não encontrado para atualização.");
            throw new Error("CPF não identificado.");
        }

        // 📐 Preparando os dados para a Antena Central
        const updates = {};
        updates[`usuarios/${cpfLimpo}/dadosContato`] = {
            mail: formContato.email.trim(),
            fone: formContato.telefone.trim(),
            ultimaAtualizacao: Date.now()
        };

        // ⏳ UX: Garante tempo mínimo de 500ms para o usuário ver o loading
        const tempoMinimo = new Promise(resolve => setTimeout(resolve, 500));

        // 🔥 Transmissão Direta para o Firebase
        const operacaoFirebase = update(ref(db_realtime), updates);

        // Aguarda a conclusão de ambos (Firebase + UX)
        await Promise.all([operacaoFirebase, tempoMinimo]);

        // 🚀 CONSOLE DE INSPEÇÃO MAESTRO
        console.log("");
        console.log("🔍 -----------------------------------------------------------");
        console.log("🔍 ATUALIZAÇÃO DE CONTATO - FIREBASE");
        console.log("🔍 Usuário (CPF)  :", cpfLimpo);
        console.log("🔍 Novo E-mail    :", formContato.email.trim());
        console.log("🔍 Status         : ✅ Sincronizado na Antena Central");
        console.log("🔍 -----------------------------------------------------------");

        setMsg({ 
            tipo: 'sucesso', 
            texto: '✅ Dados de contato atualizados!' 
        });

        // Se você tiver uma função para recarregar os dados na tela, chame aqui
        if (typeof carregarDadosDoBanco === "function") carregarDadosDoBanco();

    } catch (error) {
        console.log("💾 🚨 FALHA CRÍTICA NO PROCESSO FIREBASE:");
        console.error("💾 🚨 Detalhes:", error);
        setMsg({ 
            tipo: 'erro', 
            texto: '❌ Erro ao salvar no banco de dados.' 
        });
    } finally {
        setCarregandoOperacao(false);
        temporizadorMSG();
    }
};

/* -------------------------------------------------------- */
/* FIM - 💾 SALVAR DIRETO NO FIREBASE (PADRÃO MAESTRO)       */
/* -------------------------------------------------------- */




















return (

    <div className="componente-de-pagina">

        <div className="perfil-contato-componente-suporte">

                <div className="perfil-contato-usuario-card">

                    <div className="perfil-contato-card-titulo">📞 CONTATO</div>

                    {msg.texto && <div className={`cad-admin-feedback-endereco ${msg.tipo}`}>{msg.texto}</div>}

                    <div className="perfil-contato-card-corpo">

                        {carregandoOperacao && <div className="loading-overlay-card">⏳ Processando...</div>}

                        <div className="flex-contato-mail">
                            <label>E-mail</label>
                            <input 
                                ref={emailInputRef} 
                                id="campo-email"
                                type="email" 
                                name="email"
                                autoComplete="email"
                                placeholder="exemplo@maestro.com.br"
                                disabled={!podeEditar} 
                                value={formContato.email} 
                                onChange={mascaraEmail}
                                
                                style={{ 
                                    borderColor: (podeEditar && formContato.email.length > 0 && !formContato.email.includes('@')) ? 'red' : '',
                                    transition: 'border-color 0.3s ease' 
                                }} 
                                
                                autoCapitalize="none"
                                autoCorrect="off"

                            />
                        </div>


                        <div className="flex-contato-fone">
                            <label>Telefone / WhatsApp</label>
                            <input 
                                id="campo-telefone" 
                                type="text" 
                                name="tel"
                                autoComplete="tel" 
                                placeholder="(00) 00000-0000"
                                disabled={!podeEditar} 
                                value={formContato.telefone} 
                                onChange={mascaraTelefone} 
                                maxLength="15" 
                                
                                style={{ 
                                    borderColor: (podeEditar && formContato.telefone.length > 0 && formContato.telefone.length < 14) ? 'red' : '',
                                    transition: 'border-color 0.3s ease' 
                                }}
                                
                                inputMode="numeric" 

                            />
                        </div>










                        <div className="AreaBotoes">

                            {!podeEditar ? (
                                <button 
                                    type="button" 
                                    className="BotaoEditar" 
                                    onClick={() => {
                                        console.log("");
                                        console.log("📐 ----------------------------------");
                                        console.log("📐 🚀 EVENTO: Clique no botão '🔓 Editar Contato'");
                                        console.log("📐 componente - 🧿 UsuarioContato.jsx");
                                        console.log("📐 📍 setPodeEditar(true)");
                                        console.log("📐 ----------------------------------");
                                        setPodeEditar(true);
                                    }}
                                >
                                    🔓 Editar
                                </button>
                            ) : (
                                <>
                                    <button 
                                        type="button" 
                                        className="BotaoSalvar" 
                                        onClick={salvardadosContato}
                                    >
                                        💾 Salvar
                                    </button>
                                    
                                    {!ehNovoCadastro && (
                                        <button 
                                            type="button" 
                                            className="BotaoCancelar" 
                                            onClick={() => { 
                                                console.log("📐 ----------------------------------");
                                                console.log("📐 ✖️ CANCELAR: UsuarioContato.jsx");
                                                carregarDadosDoBanco(); 
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