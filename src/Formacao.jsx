

import { useState, useEffect, useRef } from 'react';
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto';

import './Formacao.css';



export function Formacao() {

    const { dadosToken, dadosUsuarioCompleto } = useAuth();

    const formacaoInputRef = useRef(null);

    // 📦 Buscando o crachá no Armário (localStorage)
    // const dadosArmario = JSON.parse(localStorage.getItem('dadosPublicos')) || {};
    // const dadosUsuarioCompleto = {
    //     cpef: dadosArmario.cpef || "",
    //     nome: dadosArmario.nome || "Usuário"
    // };

    // 🧰 Ferramentas de Trabalho (Hooks)
    const [formacao, setFormacao] = useState('');
    const [especificacao, setEspecificacao] = useState('');
    const [registroProfissional, setRegistroProfissional] = useState('');
    const [instituicao, setInstituicao] = useState('');

    // 🔒 Controle de Edição
    const [ehNovoCadastro, setEhNovoCadastro] = useState(false);
    const [podeEditar, setPodeEditar] = useState(false);


    useEffect(() => {
        // Se o portão de edição abrir, foca no primeiro campo
        if (podeEditar) {
            formacaoInputRef.current?.focus();
        }
    }, [podeEditar]);
    













    
    useEffect(() => {
        // 🚀 CONSOLE DE INSPEÇÃO MAESTRO
        console.log("");
        console.log("🔍 -----------------------------------------------------------");
        console.log("🔍 INSPEÇÃO DE GATILHO - 🎓 Formacao.jsx");
        console.log("🔍 dadosUsuarioCompleto está:", dadosUsuarioCompleto);
        console.log("🔍 Possui CPEF?:", dadosUsuarioCompleto?.cpef ? "✅ Sim" : "❌ Não");
        console.log("🔍 -----------------------------------------------------------");
    
        if (dadosUsuarioCompleto?.cpef) {
            distribuirDadosEspecialidades();
        } else {
            console.warn("✨ ⏳ Aguardando sinal da Antena Central para carregar Formação...");
        }
    }, [dadosUsuarioCompleto]);
    
    


    /* 🕵️‍♂️ FUNÇÃO: Distribui os dados da Antena Central para os cards de Formação */
    const distribuirDadosEspecialidades = async () => {
        if (!dadosUsuarioCompleto?.cpef) {
            console.warn("✨ ⏳ CPF não encontrado, aguardando sinal da Antena Central...");
            return;
        }
    
        const infoFormacaoMemoria = dadosUsuarioCompleto?.formacao_dados;
    
        // Verifica se o objeto de formação na memória está vazio ou não existe
        if (!infoFormacaoMemoria || Object.values(infoFormacaoMemoria).every(v => !v)) {
            console.warn("✨ 🎓 Formação vazia na memória. Buscando na Antena Central...");
            
            const cpfLimpo = dadosUsuarioCompleto.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/formacao_dados`);
    
            try {
                const snapshot = await get(caminhoNoBanco);
                
                if (snapshot.exists() && Object.values(snapshot.val()).some(v => v)) {
                    const dadosFormacao = snapshot.val();
                    console.warn("✨ ✅ Formação encontrada no Realtime.");
                    popularCamposFormacao(dadosFormacao);
                    setEhNovoCadastro(false);
                    setPodeEditar(false);
                } else {
                    console.warn("✨ 🎓 Nenhuma formação no banco. Liberando edição para novo cadastro.");
                    limparCampos();
                    setEhNovoCadastro(true);
                    setPodeEditar(true);
                }
            } catch (error) {
                console.error("❌ Erro ao buscar formação na Antena Central:", error);
                setPodeEditar(true); // Libera edição em caso de erro
            }
        } else {
            console.warn("✨ 🛰️ 🎓 Populando cards com formação da memória.");
            popularCamposFormacao(infoFormacaoMemoria);
            setEhNovoCadastro(false);
            setPodeEditar(false);
        }
    };
    
    const limparCampos = () => {
        setFormacao('');
        setEspecificacao('');
        setRegistroProfissional('');
        setInstituicao('');
    };





    /* 🧱 Função Auxiliar para popular os estados dos cards */
    const popularCamposFormacao = (dados) => {
        // Se 'dados' for nulo ou vazio, o '||' garante que o campo fique limpo
        setFormacao(dados?.nivel || '');
        setEspecificacao(dados?.espec || '');
        setRegistroProfissional(dados?.reg || '');
        setInstituicao(dados?.inst || '');
    };










    // 💾 SALVAR NO FIREBASE
    const salvarEspecialidadeNoBanco = async () => {

        // 🧱 VALIDAÇÃO DE SEGURANÇA
        if (!formacao.trim()) {
            alert("⚠️ Por favor, selecione o Nível de Formação antes de salvar.");
            formacaoInputRef.current?.focus();
            return;
        }

        console.log("");
        console.log("📐 ----------------------------------");
        console.log("📐 🚀 EVENTO: Clique no botão '💾 Salvar Formação'");
        console.log("📐 componente - 🧿 Formacao.jsx");
        console.log("📐 📍 update(ref(db_realtime, `usuarios/...`))");
        console.log("📐 ----------------------------------");

        try {

            const cpfLimpo = dadosUsuarioCompleto.cpef.replace(/\D/g, "");
            const caminhoNoBanco = ref(db_realtime, 'usuarios/' + cpfLimpo);

            const dadosFormacao = {
                nivel: formacao,
                espec: especificacao,
                reg: registroProfissional,
                inst: instituicao
            };

            await update(caminhoNoBanco, { formacao_dados: dadosFormacao });

            alert("✅ Formação atualizada com sucesso!");
            setEhNovoCadastro(false);

            setPodeEditar(false);

        } catch (error) {

            alert("Erro ao conectar com a Antena Central.");

        }
    };















    return (
        <div className="perfil-formacao-componente-principal">
            {/* ❌ Cabeçalho antigo removido para manter a limpeza da planta */}

            <div className="perfil-formacao-componente-suporte">

                {/* 🏗️ Início do Card de Formação */}
                <div className="perfil-formacao-usuario-card">
                    <div className="perfil-formacao-card-titulo">🎓 FORMAÇÃO PROFISSIONAL</div>
                                        
                    <div className="perfil-formacao-card-corpo">
                      
                      
                            
                            <div className="flex-nivel">
                                <label>Nível de Formação <span className="asterisco-obrigatorio">*</span></label>
                                <select
                                    ref={formacaoInputRef} 
                                    disabled={!podeEditar} 
                                    value={formacao} 
                                    onChange={(e) => setFormacao(e.target.value)}
                                    className="SelectFormatado"
                                >
                                    <option value="">Selecione uma opção...</option>
                                    <option value="Cuidador">Cuidador(a) de Idosos</option>
                                    <option value="Auxiliar">Auxiliar de Enfermagem</option>
                                    <option value="Tecnico">Técnico(a) de Enfermagem</option>
                                    <option value="Enfermeira">Enfermeiro(a)</option>
                                    
                                </select>
                            </div>

                            <div className="flex-curso">
                                <label>Curso / Especialidade</label>
                                <input 
                                    type="text" 
                                    disabled={!podeEditar} 
                                    value={especificacao} 
                                    onChange={(e) => setEspecificacao(e.target.value)} 
                                    placeholder="Ex: Geriatria, Instrumentação, etc."
                                />
                            </div>

                           
                            <div className="flex-registro">
                                <label>Registro Profissional</label>
                                <input 
                                    type="text" 
                                    disabled={!podeEditar} 
                                    value={registroProfissional} 
                                    onChange={(e) => setRegistroProfissional(e.target.value)} 
                                />
                            </div>

                            <div className="flex-instituicao">
                                <label>Instituição de Ensino</label>
                                <input 
                                    type="text" 
                                    disabled={!podeEditar} 
                                    value={instituicao} 
                                    onChange={(e) => setInstituicao(e.target.value)} 
                                />
                            </div>


                            <small className="observacao-obrigatorio">
                                Apenas o campo com <span className="asterisco-obrigatorio">*</span> é de preenchimento obrigatório.
                            </small>



                            <div className="AreaBotoes">

                                {!podeEditar ? (

                                    <button 
                                        type="button" 
                                        className="BotaoEditar" 
                                        onClick={() => {
                                            console.log("");
                                            console.log("📐 ----------------------------------");
                                            console.log("📐 🚀 EVENTO: Clique no botão '🔓 Editar Formação'");
                                            console.log("📐 componente - 🧿 Formacao.jsx");
                                            console.log("📐 📍 setPodeEditar(true)");
                                            console.log("📐 ----------------------------------");
                                            setPodeEditar(true)
                                        }}>
                                        🔓 Editar Formação
                                    </button>

                                ) : (
                                    <>
                                        <button type="button" className="BotaoSalvar" onClick={salvarEspecialidadeNoBanco}>💾 Salvar Formação</button>
                                        
                                        {!ehNovoCadastro && (
                                            <button type="button" className="BotaoCancelar" onClick={() => { 
                                                console.log("");
                                                console.log("📐 ----------------------------------");
                                                console.log("📐 🚀 EVENTO: Clique no botão '✖️ Cancelar'");
                                                console.log("📐 componente - 🧿 Formacao.jsx");
                                                console.log("📐 📍 distribuirDadosEspecialidades() & setPodeEditar(false)");
                                                console.log("📐 ----------------------------------");
                                                distribuirDadosEspecialidades(); setPodeEditar(false); 
                                            }}>✖️ Cancelar</button>
                                        )}
                                        
                                    </>
                                )}
                            </div>


                            
                      
                    </div>
                </div>
                {/* 🏗️ Fim do Card */}

            </div>
        </div>
    );
}