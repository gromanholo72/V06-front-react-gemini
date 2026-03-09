import React, { useState, useEffect } from 'react';
import { ref, update, get } from "firebase/database"; 
// import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto.jsx';

export function UsuarioReferencias () {

    const { dadosPublicos } = useAuth();

    // 🧰 Ferramentas de Trabalho (Hooks)
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [podeEditar, setPodeEditar] = useState(false);

    const ehProgramador = dadosPublicos?.func === 'programador';
    const ehAdmin = dadosPublicos?.func === 'administrador';

    const carregarDadosDoBanco = async () => {
        if (!dadosPublicos?.cpef) return;
        const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}`);
        
        try {
            const snapshot = await get(caminhoNoBanco);
            if (snapshot.exists()) {
                const dados = snapshot.val();
                setNome(dados.nome || '');
                setSenha(dados.senh || '');
                setEmail(dados.mail || '');
                setTelefone(dados.fone || '');
                setPodeEditar(false);
            }
        } catch (error) {
            console.error("❌ Erro ao buscar material na Antena Central:", error);
        }
    };

    useEffect(() => { carregarDadosDoBanco(); }, [dadosPublicos]);

    const salvarPerfilCompleto = async () => {
        // 🛡️ VALIDAÇÃO DE SEGURANÇA (Obrigatório para Admin ter acesso)
        if (ehAdmin && (!nome.trim() || !senha.trim())) {
            alert("⚠️ Atenção: Para ativar seu acesso, você deve informar seu Nome e criar uma Senha!");
            return;
        }

        try {
            const cpfLimpo = dadosPublicos.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, 'usuarios/' + cpfLimpo);
            
            // 📝 Prepara o pacote de atualização para a fundação
            const atualizacao = { 
                nome: nome.toUpperCase().trim(),
                senh: senha.trim(),
                mail: email.trim(), 
                fone: telefone.trim()
            };

            await update(caminhoNoBanco, atualizacao);
            
            // 🧹 Atualiza o LocalStorage (Armário da Casa) para refletir a mudança imediata
            const dadosAtuais = JSON.parse(localStorage.getItem('dadosPublicos')) || {};
            const novosDadosPublicos = { ...dadosAtuais, ...atualizacao };
            localStorage.setItem('dadosPublicos', JSON.stringify(novosDadosPublicos));
            
            alert("✅ Perfil e Acessos ativados com sucesso!");
            setPodeEditar(false);

            // Opcional: Recarregar a página para atualizar o Menu com o novo nome
            // window.location.reload(); 

        } catch (error) {
            alert("❌ Erro na conexão com a fundação.");
        }
    };

    return (




        <div className="PainelPerfil">

            
            <div className="GradeDados">
                








                <div className="CardDados">
                    <div className="CardHeader">📋 Identificação</div>
                    <div className="CardBody">
                        <div className="Campo">
                            <label>Nome Completo {ehAdmin && <span style={{color: 'red'}}>*</span>}</label>
                            <input 
                                className="InputPadrao" 
                                type="text" 
                                disabled={!podeEditar || ehProgramador} 
                                value={ehProgramador ? dadosPublicos?.nome : nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="DIGITE SEU NOME"
                            />
                        </div>

                        {/* 🔐 Campo de Senha: Crucial para o Administrador */}
                        {ehAdmin && (
                            <div className="Campo">
                                <label>Senha de Acesso <span style={{color: 'red'}}>*</span></label>
                                <input 
                                    className="InputPadrao" 
                                    type="text" // Pode mudar para password se preferir esconder
                                    disabled={!podeEditar} 
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    placeholder="Crie uma senha forte"
                                />
                                {!senha && <small style={{color: 'red'}}>⚠️ Você precisa informar seunone e definir uma senha para acesso a todas as permissões.</small>}
                            </div>
                        )}

                        <div className="Campo">
                            <label>CPF</label>
                            <input className="InputPadrao" type="text" disabled value={dadosPublicos?.cpef || ''} />
                        </div>
                        <div className="Campo">
                            <label>Função</label>
                            <input className="InputPadrao" type="text" disabled value={dadosPublicos?.func || ''} style={{textTransform: 'capitalize'}} />
                        </div>
                    </div>
                </div>






            </div>
        </div>
    );
}