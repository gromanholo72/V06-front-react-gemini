

import { useState, useEffect } from 'react';
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto';

import './EstiloForm.css';



export function Formacao() {

    const { dadosToken, dadosUsuarioCompleto } = useAuth();

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
    const [podeEditar, setPodeEditar] = useState(false);
















    
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
    
    



    const [temDadosGravados, setTemDadosGravados] = useState(false);
    
    
    /* 🕵️‍♂️ FUNÇÃO: Distribui os dados da Antena Central para os cards de Formação */
    const distribuirDadosEspecialidades = async () => {
    


        /* 🧱 Verificamos se o objeto de usuário já existe */
        if (!dadosUsuarioCompleto) {
            console.warn("✨ ⏳ Usuário ainda não carregado na memória.");
            return;
        }



        const info = dadosUsuarioCompleto?.formacao_dados;

        /* 🧱 REGRA: Verifica se o objeto existe e se pelo menos um campo tem valor */
        const temConteudoReal = info && Object.values(info).some(valor => valor !== '' && valor !== null);
    
        if (temConteudoReal) {
    
            console.log("");
            console.log("✨ 🎓 ------------------------------------------------------");
            console.log("✨ 🎓 Populando cards com dados existentes na memória.");
            console.log("✨ 🎓 dadosUsuarioCompleto?.formacao_dados", temConteudoReal);
            console.log("✨ 🎓 ------------------------------------------------------");

            popularCamposFormacao(info);
            setPodeEditar(false);
            setTemDadosGravados(true);
    
        } else {
    
            console.log("");
            console.log("✨ 🎓 ------------------------------------------------------");
            console.warn("✨ 🎓 Nenhuma formação detectada na memória. Liberando para novo cadastro.");
            console.log("✨ 🎓 ------------------------------------------------------");

            popularCamposFormacao({}); 
            setPodeEditar(true);
            setTemDadosGravados(false);


        }
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

            setPodeEditar(false);

        } catch (error) {

            alert("Erro ao conectar com a Antena Central.");

        }
    };















    return (
        <div className="componente-principal-padrao">
            {/* ❌ Cabeçalho antigo removido para manter a limpeza da planta */}

            <div className="componente-suporte-padrao">

                {/* 🏗️ Início do Card de Formação */}
                <div className="card-padrao">
                    <div className="card-padrao-titulo">🎓 FORMAÇÃO PROFISSIONAL</div>
                    
                    <div className="card-padrao-corpo">
                      
                      
                            
                            <div className="flex-nivel">
                                <label>Nível de Formação</label>
                                <select 
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
                           



                            <div className="AreaBotoes">

                                {!podeEditar ? (

                                    <button type="button" className="BotaoEditar" onClick={() => setPodeEditar(true)}>
                                        🔓 Editar Formação
                                    </button>

                                ) : (
                                    <>
                                        <button type="button" className="BotaoSalvar" onClick={salvarEspecialidadeNoBanco}>💾 Salvar Formação</button>
                                 
                                        {temDadosGravados && (
                                            <button type="button" className="BotaoCancelar" onClick={() => { distribuirDadosEspecialidades(); setPodeEditar(false); }}>✖️ Cancelar</button>
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