

import { useState, useEffect } from 'react'; 
import { ref, update, get } from "firebase/database"; 
// import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto';

import './UsuarioContato.css'; 



export function UsuarioContato () {


    const { dadosToken, dadosUsuarioCompleto } = useAuth();
    

    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');

    const [podeEditar, setPodeEditar] = useState(false);

    const ehProgramador = dadosToken?.func === 'programador';
    // const ehAdmin = dadosPublicos?.func === 'administrador';
















    



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
                    setPodeEditar(true);
                } else {
                    console.warn("✨ ✅ Dados base encontrados no Realtime.");
                    popularCamposGerais(dados);
                    setPodeEditar(false);
                }
            } else {
                /* Se nem o registro do usuário existe no banco */
                console.warn("✨ 📋 Usuário não encontrado no banco. Liberando edição.");
                setPodeEditar(true);
            }
        } catch (error) {
            console.error("❌ Erro ao buscar na Antena Central:", error);
            setPodeEditar(true); // Na dúvida, libera para o usuário preencher
        }

    } else {
        /* Se já tem os dados na memória (Contexto) */
        console.warn("✨ 🛰️ 📋 Populando cards com dados existentes na memória.");
        popularCamposGerais({ mail: emailMemoria, fone: foneMemoria });
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
        setPodeEditar(false);

    } catch (error) {
        console.error("❌ Erro ao salvar:", error);
        alert("❌ Erro na conexão com a fundação.");
    }
};





















    return (


        <div className="perfil-contato-componente-principal">

            
            <div className="perfil-contato-componente-suporte">
                








                {!ehProgramador && (

                    <div className="perfil-contato-usuario-card">

                        <div className="perfil-contato-card-titulo">📞 CONTATO</div>

                        <div className="perfil-contato-card-corpo">

                            <div className="flex-contato-mail">
                                <label>E-mail</label>
                                <input type="email" disabled={!podeEditar} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>

                            <div className="flex-contato-fone">
                                <label>Telefone / WhatsApp</label>
                                <input type="text" disabled={!podeEditar} value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                            </div>


                            <div className="AreaBotoes">
                                {!podeEditar ? (
                                    <button type="button" className="BotaoEditar" onClick={() => setPodeEditar(true)}>
                                        🔓 Completar/Editar Cadastro
                                    </button>
                                ) : (
                                    <>
                                        <button type="button" className="BotaoSalvar" onClick={salvarPerfilCompleto}>
                                            💾 Salvar
                                        </button>
                                        <button type="button" className="BotaoCancelar" onClick={() => { distribuirDadosGerais(); setPodeEditar(false); }}>
                                            ✖️ Cancelar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                )}











            </div>
        </div>
    );
}