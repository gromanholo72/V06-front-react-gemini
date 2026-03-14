

import { useState, useEffect, useRef } from 'react'; 
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto';

import './UsuarioContato.css'; 



export function UsuarioContato () {

    const emailInputRef = useRef(null);

    const [ehNovoCadastro, setEhNovoCadastro] = useState(false);

    const { dadosToken, dadosUsuarioCompleto } = useAuth();
    

    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const [podeEditar, setPodeEditar] = useState(false);

    const ehProgramador = dadosToken?.func === 'programador';
    // const ehAdmin = dadosPublicos?.func === 'administrador';



    useEffect(() => {
        // Se o portão de edição abrir, foca no Email
        if (podeEditar) {
            emailInputRef.current?.focus();
        }
    }, [podeEditar]);






    // 🛠️ MÁSCARA DE EMAIL
    const mascaraEmail = (e) => {
        // 🧱 Trava de segurança da obra
        if (!podeEditar) return;
        
        // 🧱 Força minúsculas e remove espaços
        let v = e.target.value.toLowerCase().replace(/\s/g, '');
        
        setEmail(v);
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
        setTelefone(v);
    };







    



    useEffect(() => {

        console.log("");
        console.warn("✨ 🛰️ ----------------------------------");
        console.warn("✨ 🛰️ useEffect() - componente - 📋 UsuarioContato.jsx");
        console.warn("✨ 🛰️ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");
    
        if (dadosUsuarioCompleto?.cpef) {
    
            console.warn("✨ 🛰️ 🧖‍♂️ dadosUsuarioCompleto.cpef = ", dadosUsuarioCompleto.cpef);
            distribuirDadosGerais();
    
        } else {
    
            console.warn("✨ 🛰️ ⏳ Aguardando sinal da Antena Central para carregar Dados Base...");
    
        }
    
        console.warn("✨ 🛰️ ----------------------------------");
    
    }, [dadosUsuarioCompleto]);





    /* 🕵️‍♂️ FUNÇÃO: Distribui os dados gerais para os cards */
    const distribuirDadosGerais = async () => {

        /* 🧱 Primeiro, verificamos se o dado já está na memória (Contexto) */
        const emailMemoria = dadosUsuarioCompleto?.mail;
        const foneMemoria = dadosUsuarioCompleto?.fone;

        /* 🚀 NOVO: Se o cpef existe mas NÃO tem mail ou fone na memória, habilitamos edição */
        if (!emailMemoria && !foneMemoria) {
            
            console.warn("✨ 🛰️ Dados vazios na memória. Buscando na Antena Central...");
            
            const cpfLimpo = dadosUsuarioCompleto.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}`);

            try {
                const snapshot = await get(caminhoNoBanco);
                
                if (snapshot.exists()) {
                    const dados = snapshot.val();
                    
                    /* Se achou no banco, mas os campos estão vazios, habilita edição */
                    if (!dados.mail && !dados.fone) {
                        console.warn("✨ 📋 Banco existe mas campos vazios. Liberando edição.");
                        setEhNovoCadastro(true);
                        setPodeEditar(true);
                    } else {
                        console.warn("✨ ✅ Dados base encontrados no Realtime.");
                        popularCamposGerais(dados);
                        setEhNovoCadastro(false);
                        setPodeEditar(false);
                    }
                } else {
                    /* Se nem o registro do usuário existe no banco */
                    console.warn("✨ 📋 Usuário não encontrado no banco. Liberando edição.");
                    setEhNovoCadastro(true);
                    setPodeEditar(true);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar na Antena Central:", error);
                setEhNovoCadastro(true);
                setPodeEditar(true); // Na dúvida, libera para o usuário preencher
            }

        } else {
            /* Se já tem os dados na memória (Contexto) */
            console.warn("✨ 🛰️ 📋 Populando cards com dados existentes na memória.");
            popularCamposGerais({ mail: emailMemoria, fone: foneMemoria });
            setEhNovoCadastro(false);
            setPodeEditar(false);
        }
    };





/* 🧱 Função Auxiliar para popular os estados dos cards de Identificação */
const popularCamposGerais = (dados) => {
    /* 📐 Forçamos a limpeza de espaços para garantir que o input reconheça o valor */
    setEmail(String(dados.mail || '').trim());
    setTelefone(String(dados.fone || '').trim());
};




















/* 💾 SALVAR NO FIREBASE (PADRÃO QUE DEU CERTO) */
const salvarPerfilCompleto = async () => {
    
    // 🧱 Validação de Segurança: O E-mail precisa ter arroba (@)
    if (email.length > 0 && !email.includes('@')) {
        alert("⚠️ E-mail inválido! O endereço precisa conter o caractere '@'.");
        emailInputRef.current?.focus();
        return;
    }

    try {
        /* 🧱 Importante: Use dadosUsuarioCompleto para pegar o CPF, como na Formação */
        const cpfLimpo = dadosUsuarioCompleto.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, 'usuarios/' + cpfLimpo);

        /* 📝 Pacote de atualização direto na raiz do usuário */
        const atualizacao = { 
            mail: email.trim(), 
            fone: telefone.trim()
        };

        /* 📡 Atualiza a Antena Central */
        await update(caminhoNoBanco, atualizacao);
        
        /* 💡 Remova a atualização manual do localStorage aqui. 
           O AutenticacaoContexto deve cuidar disso ao detectar a mudança no Firebase. */
        
        alert("✅ Perfil atualizado com sucesso!");
        setEhNovoCadastro(false);
        setPodeEditar(false);

    } catch (error) {
        console.error("❌ Erro ao salvar:", error);
        alert("❌ Erro na conexão com a fundação.");
    }
};



















return (
    <div className="perfil-contato-componente-principal">
        <div className="perfil-contato-componente-suporte">


            {/* {!ehProgramador && ( */}


                <div className="perfil-contato-usuario-card">


                    <div className="perfil-contato-card-titulo">📞 CONTATO</div>


                    <div className="perfil-contato-card-corpo">



                        <div className="flex-contato-mail">
                            <label>E-mail</label>
                            <input 
                                ref={emailInputRef} 
                                id="campo-email" // ⬅️ ID para vínculo com a label e âncora CSS
                                type="email" 
                                name="email"
                                autocomplete="email" // ⬅️ Sugere e-mails salvos
                                placeholder="exemplo@maestro.com.br" // 🔦 Guia visual
                                disabled={!podeEditar} 
                                value={email} 
                                onChange={mascaraEmail}
                                
                                style={{ 
                                    borderColor: (podeEditar && email.length > 0 && !email.includes('@')) ? 'red' : '',
                                    transition: 'border-color 0.3s ease' // ✨ Suaviza a troca para o vermelho
                                }} 
                                
                                /* 🛡️ Dica extra: evita que o corretor do celular mude o e-mail */
                                autoCapitalize="none"
                                autoCorrect="off"

                            />
                        </div>


                        <div className="flex-contato-fone">
                            <label>Telefone / WhatsApp</label>
                            <input 
                                id="campo-telefone" 
                                type="text" 
                                name="tel" // 📱 'tel' é o padrão para integração com discadores
                                autoComplete="tel" // ⬅️ Sugere números do histórico do usuário
                                placeholder="(00) 00000-0000" // 🔦 Guia visual de máscara
                                disabled={!podeEditar} 
                                value={telefone} 
                                onChange={mascaraTelefone} 
                                maxLength="15" 
                                
                                /* 🎨 Feedback visual: borda vermelha se estiver incompleto (ex: menos de 14 caracteres) */
                                style={{ 
                                    borderColor: (podeEditar && telefone.length > 0 && telefone.length < 14) ? 'red' : '',
                                    transition: 'border-color 0.3s ease' 
                                }}
                                
                                /* 🛡️ Garante que o teclado numérico abra no celular */
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
                                    🔓 Completar/Editar Cadastro
                                </button>
                            ) : (
                                <>
                                    <button 
                                        type="button" 
                                        className="BotaoSalvar" 
                                        onClick={salvarPerfilCompleto}
                                    >
                                        💾 Salvar
                                    </button>

                                    {/* 🎯 Lógica Final: Só exibe cancelar se NÃO for cadastro novo */}
                                    {!ehNovoCadastro && (
                                        <button 
                                            type="button" 
                                            className="BotaoCancelar" 
                                            onClick={() => { 
                                                console.log("");
                                                console.log("📐 ----------------------------------");
                                                console.log("📐 🚀 EVENTO: Clique no botão '✖️ Cancelar'");
                                                console.log("📐 componente - 🧿 UsuarioContato.jsx");
                                                console.log("📐 📍 distribuirDadosGerais() & setPodeEditar(false)");
                                                console.log("📐 ----------------------------------");
                                                distribuirDadosGerais(); 
                                                setPodeEditar(false); 
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


             {/* )} */}


        </div>
    </div>
);




}