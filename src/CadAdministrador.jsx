

import React, { useState, useEffect } from 'react';
import { ref, set, get, onValue, remove, query, orderByChild } from "firebase/database";

import { useAuth, URL_SERVIDOR } from './AutenticacaoContexto.jsx';

import './CadAdministrador.css'; 




export function CadAdministrador() {

    const { db_realtime } = useAuth();
    const [estaCarregando, setEstaCarregando] = useState(false);

    // 🧰 Ferramentas de Trabalho (Ferramentas de Trabalho)
    const [formValues, setFormValues] = useState({
        cpef: '',
        nome: '',
        func: ''
    });

    const [msg, setMsg] = useState({ tipo: '', texto: '' });

    const [listaAdmins, setListaAdmins] = useState([]);

    // 📡📻 Monitorando a Antena Central (Antena Central) com Lógica de Prioridade
    useEffect(() => {

        if (!db_realtime) return; // 🛡️ Escudo: Só liga se a máquina estiver pronta

        const caminhoUsuarios = ref(db_realtime, 'usuarios');
        
        const unsubscribe = onValue(caminhoUsuarios, (snapshot) => {

        const dados = snapshot.val();

        console.log("");
        console.log("✨ 📡 Monitoramento Ativado: Dados recebidos do Firebase.");
        console.log("✨ 📡 componente: CadastroAdministrador.jsx");
        console.log("✨ 📡 Funcao: useEffect()");
        console.log("✨ 📡 Dados:", dados);
        console.log("✨ 📡 ----------------------------------");

        if (dados) {

                // 🧱 Filtra para incluir administradores e atendentes
                const funcoesElevadas = ['administrador', 'atendente'];
                
                // 📐 Normalização: Garante que o código entenda tanto dados na raiz quanto em dadosBasicos
                const listaNormalizada = Object.values(dados).map(u => {
                    const timestamp = u.timestamp || u.dadosInterno?.timestamp || 0;
                    return {
                        ...u,
                        nomeExibicao: u.nome || u.dadosBasico?.nome || "",
                        cpefExibicao: u.cpef || u.dadosBasico?.cpef || "",
                        funcExibicao: u.func || u.dadosBasico?.func || "",
                        timestampOrdem: timestamp,
                        datcExibicao: timestamp ? new Date(timestamp).toLocaleDateString('pt-BR') : "N/A",
                        horaExibicao: timestamp ? new Date(timestamp).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ""
                    };
                });

                const listaBase = listaNormalizada.filter(u => funcoesElevadas.includes(u.funcExibicao));
                
                // 📐 Ordenação por Data de Cadastro (Mais antigos no topo -> Crescente)
                const listaOrdenada = listaBase.sort((a, b) => a.timestampOrdem - b.timestampOrdem);

                // 📐 Atualiza a lista de administradores com os dados ordenados por data.
                setListaAdmins(listaOrdenada);

            } else {

                setListaAdmins([]);

            }
        });

        return () => unsubscribe();
        
    }, [db_realtime]);











    
    // ✍️ Escriturário do Cadastro para nome e função
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: name === 'nome' ? value.toUpperCase() : value
        }));
    };









    // 🛠️ MÁSCARA DE CPF (DEFINITIVA  = PRODUCAO)

    // const lidarComCpf = (e) => {
    //     let v = e.target.value.replace(/\D/g, '');
    //     if (v.length > 11) v = v.substring(0, 11);
    //     v = v.replace(/(\d{3})(\d)/, '$1.$2');
    //     v = v.replace(/(\d{3})(\d)/, '$1.$2');
    //     v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    //     setFormValues(prev => ({ ...prev, cpf: v }));
    // };



    


    



    // ------------------------------------------------------------------------------------
    // INICIO - PRENCHIMENTO AUTOMATICO POR COMBO (DEIXADO PRA FACILITAR O TESTE - DESENVOLVIMENTO)
    // ------------------------------------------------------------------------------------

    const BANCO_IDENTIDADES = {
        "663.745.531-87": { nome: "ANDRESSA ROSSI ROMANHOLO", func: "administrador" },
        "505.842.550-55": { nome: "JOÃO VICTOR SILVA", func: "administrador" },
        "875.673.130-22": { nome: "FERNANDA SOUZA SANTOS", func: "atendente" },
        "943.757.760-99": { nome: "CARLOS EDUARDO OLIVEIRA", func: "atendente" }
    };

    const lidarComCpf = (e) => {

        const cpfEscolhido = e.target.value;
        
        // 🔍 Busca os dados respectivos (Objeto) ou deixa vazio se não encontrar
        const dadosEncontrados = BANCO_IDENTIDADES[cpfEscolhido] || { nome: "", func: "" };
    
        // ⚡ Atualização Sincronizada Maestro
        setFormValues(prev => ({
            ...prev,
            cpef: cpfEscolhido,
            nome: dadosEncontrados.nome,
            func: dadosEncontrados.func
        }));
    
    };

    // 🕵️‍♂️ Só dispara o log se houver algum valor, para não poluir o console no load inicial
    useEffect(() => {
       
        if (formValues.cpef || formValues.nome) {
            console.log("");
            console.log("✨ 🕵️‍♂️ ----------------------------------");
            console.log("✨ 🕵️‍♂️ Componente - 📝 CadAdministrador.jsx"); // nome do componente atual
            console.log("✨ 🕵️‍♂️ useEffect() - MONITOR DE MUDANCA DO FORM");
            console.log("✨ 🕵️‍♂️ CPF:", formValues.cpef);
            console.log("✨ 🕵️‍♂️ Nome:", formValues.nome);
            console.log("✨ 🕵️‍♂️ Função:", formValues.func);
            console.log("✨ 🕵️‍♂️ ----------------------------------");

        }

    }, [formValues.cpef, formValues.nome, formValues.func]);


    // ------------------------------------------------------------------------------------
    // FIM - PRENCHIMENTO AUTOMATICO POR COMBO (DEIXADO PRA FACILITAR O TESTE - DESENVOLVIMENTO)
    // ------------------------------------------------------------------------------------



















    // ============================================
    // INICIO - 🗑️ REMOVER ACESSO DO ADMINISTRADOR
    // ============================================

    const removerAdmin = async (cpfAdm) => {
        const cpfLimpo = cpfAdm.replace(/\D/g, "");
        if (window.confirm(`⚠️ Confirmar remoção: ${cpfAdm}?`)) {
            try {
                await remove(ref(db_realtime, `usuarios/${cpfLimpo}`));
            } catch (error) {
                alert("❌ Erro na fundação.");
            }
        }
    };

    // ============================================
    // FIM - 🗑️ REMOVER ACESSO DO ADMINISTRADOR
    // ============================================













    

    
    // 💾 REGISTRAR NOVO ADMIN
    // ----------------------------------------------------
    // INICIO DO - Enviar dados de cadastro para o servidor
    // ----------------------------------------------------
    const registrarAdmin = async (e) => {

        if (e) e.preventDefault(); 

        setEstaCarregando(true);
        setMsg({ tipo: '', texto: '' });

        try {

            // 📐 Extraindo valores do estado para uso local
            const { cpef, nome, func } = formValues;


            console.log("");
            console.log("📡 -----------------------------------------------------------");
            console.log("📡 componente: CadastroAdministrador.jsx");
            console.log("📡 Funcao: const registrarAdmin");
            console.log("📡 🕵️‍♂️ CPF:", cpef);
            console.log("📡 🕵️‍♂️ Nome:", nome);
            console.log("📡 🕵️‍♂️ Função:", func);
            console.log("📡 URL_SERVIDOR:", URL_SERVIDOR);


            const cpfLimpo = cpef.replace(/\D/g, "");


            // 📐 Validações Iniciais
            if (cpfLimpo.length !== 11) {

                setEstaCarregando(false);
                setMsg({ tipo: 'erro', texto: 'CPF Inválido!' });

                return;
            }
            if (!nome.trim()) {

                setEstaCarregando(false);
                setMsg({ tipo: 'erro', texto: 'O nome é obrigatório!' });
                
                return;
            }

            // 📐 Preparando pacote para o servidor
            const payload = {

                // 👤 Dados Básicos
                dadosBasico: {
                    cpef: cpef,
                    nome: nome.toUpperCase(),
                    func: func
                },

                // 🔐 Dados Segurança
                dadosSeguranca: {
                    senh: "123"
                },

                // ⚙️ Dados Internos
                dadosInterno: {
                    perm: "total",
                    situ: "ativo",
                    datc: new Date().toLocaleDateString('pt-BR'),
                    timestamp: Date.now()
                }

            };

            console.log("");
            console.log("📐 ----------------------------------");
            console.log("📐 📦 DADOS PREPARADOS PARA ENVIO:");
            console.log("📐 componente - CadAdministrador.jsx");
            console.log("📐 dadosUsuario:", payload);
            console.log("📐 ----------------------------------");

            const resposta = await fetch(`${URL_SERVIDOR}/usuario/cadastrar/dados-bas-seg-int`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const resultado = await resposta.json();

            if (resposta.ok) {

                console.log("✅ FUNDAÇÃO: Administrador registrado com sucesso!");
                console.log("📡 -----------------------------------------------------------");

                setFormValues({ cpef: '', nome: '', func: '' });
                setMsg({ tipo: 'sucesso', texto: '✅ Cadastrado com sucesso!' });

            } else {
                console.log("");
                console.error("❌ -----------------------------------------------------------");
                console.error("❌ PROTOCOLO DE CADASTRO NEGADO");
                console.error("❌ Status da Resposta:", resposta.status);
                console.error("❌ Motivo do Servidor:", resultado.erro);
                console.error("❌ -----------------------------------------------------------");

                setMsg({ tipo: 'erro', texto: resultado.erro });
            }
        } catch (error) {

            console.log("");
            console.error("🚨 -----------------------------------------------------------");
            console.error("🚨 ERRO CRÍTICO NA CONEXÃO:", error.message);
            console.error("🚨 -----------------------------------------------------------");

            setMsg({ tipo: 'erro', texto: "Erro de conexão com o servidor." });

        } finally {
            setEstaCarregando(false);
            // 📐 Mantém a mensagem visível por 4 segundos antes de limpar
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => setMsg({ tipo: '', texto: '' }), 4000);
        }
    };
    // ----------------------------------------------------
    // FIM DO - Enviar dados de cadastro para o servidor
    // ----------------------------------------------------
















   



    return (


        <div className="cad-admin-container-master">

            <div className="cad-admin-grade-flexivel">





                <div className="cad-admin-card-compacto">


                    <div className="cad-admin-header-card"><h3>🔑 Cadastrar Usuário</h3></div>
                    <div className="cad-admin-corpo-card">
                        <form className="cad-admin-formulario" onSubmit={registrarAdmin}>

                            {msg.texto && <div className={`cad-admin-feedback ${msg.tipo}`}>{msg.texto}</div>}

                            <div className="cad-admin-grupo-input">
                                <label>CPF:</label>

                                {/* <input className="cad-admin-input-estilizado" name="cpf" value={formValues.cpf} onChange={lidarComCpf} placeholder="CPF do usuário" /> */}
                         
                                <select 
                                    className="cad-admin-input-estilizado" 
                                    name="cpf" 
                                    value={formValues.cpef} 
                                    onChange={lidarComCpf}
                                >
                                    <option value="">---selecione---</option>
                                    <option value="663.745.531-87">663.745.531-87</option>
                                    <option value="505.842.550-55">505.842.550-55</option>
                                    <option value="875.673.130-22">875.673.130-22</option>
                                    <option value="943.757.760-99">943.757.760-99</option>

                                </select>

                            </div>


                            <div className="cad-admin-grupo-input">
                                <label>Nome:</label>

                                <input 
                                
                                    className="cad-admin-input-estilizado" 
                                    name="nome" 
                                    value={formValues.nome} 
                                    onChange={handleChange} 
                                    placeholder="Nome Completo" 

                                />
                  
                            </div>



                            <div className="cad-admin-grupo-input">
                                <label>Função:</label>
                                <select 
                                    className="cad-admin-input-estilizado" 
                                    name="func" value={formValues.func} 
                                    onChange={handleChange}
                                >
                                    <option value="">---selecione---</option>
                                    <option value="administrador">Administrador</option>
                                    <option value="atendente">Atendente</option>
                                </select>
                            </div>


                            
                            <button 
                                className="cad-admin-botao-registrar" 
                                type="submit" 
                                disabled={estaCarregando}>🏗️ {estaCarregando ? 'Cadastrando...' : 'Cadastrar'}
                            </button>


                        </form>
                    </div>
                </div>


















                <div className="cad-admin-card-expandido">
                    <div className="cad-admin-header-card"><h3>📋 Usuários com Permissão</h3></div>
                    <div className="cad-admin-corpo-card">
                        <div className="cad-admin-tabela-responsiva">

                            <table className="cad-admin-tabela-dados">

                                <thead>
                                    <tr>
                                        <th>CPF</th>
                                        <th>Nome</th>
                                        <th>Função</th>
                                        <th>Data / Hora</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                
                                <tbody>

                                    {listaAdmins.map((adm, index) => (

                                        <tr key={index}>

                                            <td>{adm.cpefExibicao}</td>
                                            <td>{adm.nomeExibicao}</td>
                                            <td>{adm.funcExibicao}</td>
                                            <td>{adm.datcExibicao} 
                                                <small 
                                                    style={{ color: '#888', fontSize: '0.8em' }}
                                                >
                                                    às {adm.horaExibicao}
                                                </small>
                                            </td>
                                    
                                            <td style={{ textAlign: 'center' }}>
                                                <button 
                                                    className="cad-admin-botao-excluir" 
                                                    onClick={() => removerAdmin(adm.cpefExibicao)}
                                                >
                                                    🗑️
                                                </button>
                                            </td>

                                        </tr>

                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>







            </div>

        </div>

    );
    




    
}