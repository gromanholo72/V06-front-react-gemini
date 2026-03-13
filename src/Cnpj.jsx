

import { useState, useEffect, useRef } from 'react';
import { ref, update, get } from "firebase/database"; 
import { db_realtime } from './firebaseConfig.js';

import { useAuth } from './AutenticacaoContexto';

import './Cnpj.css';



export function Cnpj() {

     const { dadosUsuarioCompleto } = useAuth();

     const cnpjInputRef = useRef(null);

     const [ehNovoCadastro, setEhNovoCadastro] = useState(false);

    // 🧰 Ferramentas de Trabalho (Hooks)
    const [cnpj, setCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [situacao, setSituacao] = useState('');
    const [atividades, setAtividades] = useState('');
    const [socios, setSocios] = useState('');

    // 🔒 Controle de Edição
    const [podeEditar, setPodeEditar] = useState(false);






    useEffect(() => {
        // Se o portão de edição abrir, foca no CNPJ
        if (podeEditar) {
            cnpjInputRef.current?.focus();
        }
    }, [podeEditar]);









    

    /* 🧱 FERRAMENTAS DE TRABALHO (useEffect) - MONITORAMENTO */
useEffect(() => {

    console.log("");
    console.warn("✨ 🛰️ ----------------------------------");
    console.warn("✨ 🛰️ useEffect() - componente - 🏢 Cnpj.jsx");
    console.warn("✨ 🛰️ 🏷️ VARIAVEL MONITORADA QUANTO A MUDANCA");

    if (dadosUsuarioCompleto?.cpef) {

        console.warn("✨ 🛰️ 🧖‍♂️ dadosUsuarioCompleto.cpef = ", dadosUsuarioCompleto.cpef);
        distribuirDadosContexto();

    } else {

        console.warn("✨ 🛰️ ⏳ Aguardando sinal da Antena Central para carregar CNPJ...");

    }

    console.warn("✨ 🛰️ ----------------------------------");

}, [dadosUsuarioCompleto]);



/* 🕵️‍♂️ FUNÇÃO: Distribui os dados de CNPJ para os cards (Memória ou Banco) */
const distribuirDadosContexto = async () => {

    /* 🧱 Primeiro, verificamos se o dado já está na memória (Contexto) */
    const infoCnpjMemoria = dadosUsuarioCompleto?.cnpj_dados;

    /* 🚀 Se o cpef existe mas NÃO tem CNPJ na memória, busca na Antena Central */
    if (!infoCnpjMemoria || Object.keys(infoCnpjMemoria).length === 0) {
        
        console.warn("✨ 🛰️ CNPJ vazio na memória. Buscando na Antena Central...");
        
        const cpfLimpo = dadosUsuarioCompleto.cpef.replace(/\D/g, "");
        const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}/cnpj_dados`);

        try {
            const snapshot = await get(caminhoNoBanco);
            
            if (snapshot.exists()) {

                const dadosCnpj = snapshot.val();
                console.warn("✨ ✅ Dados de CNPJ encontrados no Realtime.");

                popularCamposCnpj(dadosCnpj);
                setEhNovoCadastro(false); // 🎯 Existe no banco, não é novo
                setPodeEditar(false);

            } else {

                console.warn("✨ 📍 Nenhum CNPJ no banco. Liberando edição.");
                
                limparCampos();  
                                 // 🧹 Garante campos vazios
                setEhNovoCadastro(true);  // 🎯 MARCA COMO NOVO (Sumiço do botão Cancelar)
                setPodeEditar(true);      // Libera edição automática

            }
        } catch (error) {

            console.error("❌ Erro ao buscar CNPJ na Antena Central:", error);
            setPodeEditar(true); 

        }

    } else {

        /* Se já tem o CNPJ na memória (Contexto) */
        console.warn("✨ 🛰️ 🏢 Populando cards com dados de CNPJ da memória.");

        popularCamposCnpj(infoCnpjMemoria);
        setEhNovoCadastro(false); // 🎯 Se veio do contexto, já existe
        setPodeEditar(false);

    }
};



/* 🧱 Função Auxiliar para popular os estados dos cards de CNPJ */
const popularCamposCnpj = (dados) => {

    setCnpj(String(dados.num_cnpj || '').trim());
    setRazaoSocial(String(dados.razao || '').trim());
    setNomeFantasia(String(dados.fantasia || '').trim());
    setSituacao(String(dados.situ || '').trim());
    setAtividades(String(dados.ativ || '').trim());
    setSocios(String(dados.soci || '').trim());

};


const limparCampos = () => {
    setCnpj('');
    setRazaoSocial('');
    setNomeFantasia('');
    setSituacao('');
    setAtividades('');
    setSocios('');
};













    // 🔍 BUSCA CNPJ (BrasilAPI)
    useEffect(() => {

        if (!podeEditar) return;

        const apenasNumeros = cnpj.replace(/\D/g, '');

        // Se o usuário apagar o CNPJ ou o tamanho for menor que 14, limpa os campos dependentes
        if (apenasNumeros.length < 14) {
            setRazaoSocial('');
            setNomeFantasia('');
            setSituacao('');
            setAtividades('');
            setSocios('');
            return;
        }

        if (apenasNumeros.length === 14) {
            fetch(`https://brasilapi.com.br/api/cnpj/v1/${apenasNumeros}`)
                .then(res => res.json())
                .then(dados => {
                    if (dados.cnpj) {
                        setRazaoSocial(dados.razao_social || '');
                        setNomeFantasia(dados.nome_fantasia || 'NÃO INFORMADO');
                        setSituacao(dados.descricao_situacao_cadastral || '');
                        const principal = dados.cnae_fiscal_descricao || '';
                        setAtividades(principal);
                        const listaSocios = dados.qsa?.map(s => s.nome_socio).join(', ') || 'NÃO INFORMADO';
                        setSocios(listaSocios);
                    }
                }).catch(() => console.log("Erro na busca do CNPJ"));
        }

    }, [cnpj, podeEditar]);











    // 🛠️ MÁSCARA DE CNPJ
    const mascaraCnpj = (e) => {
        // 🧱 Se a obra estiver travada (não pode editar), não faz nada
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

        // 📐 👔 console.log("📐 🏢 CNPJ Formatado = ", v);
        
        // 🧱 Passo 4: Atualiza a Planta (Estado)
        setCnpj(v);
    };













    
        // 💾 SALVAR NO BANCO DE DADOS
        const salvarCnpjNoBanco = async () => {
    
            console.log("");
            console.log("📐 ----------------------------------");
            console.log("📐 🚀 EVENTO: Clique no botão '💾 Salvar Empresa'");
            console.log("📐 componente - 🧿 Cnpj.jsx");
            console.log("📐 📍 update(ref(db_realtime, `usuarios/...`))");
            console.log("📐 ----------------------------------");

            try {
    
                const cpfLimpo = dadosUsuarioCompleto.cpef.replace(/\D/g, "");
    
                if (!cpfLimpo) {
    
                    console.error("✨ 🛑 Falha crítica: CPF não encontrado para salvar nos cards de CNPJ.");
                    return;
    
                }
    
                const caminhoNoBanco = ref(db_realtime, `usuarios/${cpfLimpo}`);
    
                const dadosCnpj = {
                    num_cnpj: cnpj,
                    razao: razaoSocial,
                    fantasia: nomeFantasia,
                    situ: situacao,
                    ativ: atividades,
                    soci: socios
                };
    
                // 📡 Atualiza o nó cnpj_dados dentro do usuário
                await update(caminhoNoBanco, { cnpj_dados: dadosCnpj });
    
                console.log("📡🗼 ✅ Almoxarifado: Dados de CNPJ atualizados com sucesso!");
    
                alert("✅ CNPJ registrado com sucesso!");
    
                setEhNovoCadastro(false);
    
                // Trava o portão após salvar
                setPodeEditar(false); 
                
            } catch (error) {
    
                console.error("❌ Erro ao salvar CNPJ na Antena Central:", error);
    
                alert("Erro ao conectar com a Antena Central.");
    
            }
        };











// ✖️ CANCELAR EDIÇÃO: Descarta as mudanças locais e restaura o que está no Contexto
const cancelarEdicao = () => {

    console.log("");
    console.log("📐 ----------------------------------");
    console.log("📐 🚀 EVENTO: Clique no botão '✖️ Cancelar Edição'");
    console.log("📐 componente - 🧿 Cnpj.jsx");
    console.log("📐 📍 distribuirDadosContexto() & setPodeEditar(false)");
    console.log("📐 ----------------------------------");

    console.log("✨ 🔄 Cancelando edição. Restaurando dados do Contexto...");

    // Chamamos a função que já sabe ler o Contexto e preencher os inputs
    distribuirDadosContexto(); 

    // Trava os inputs novamente (Fecha o portão de edição)
    setPodeEditar(false); 
    
    console.log("✨ ✅ Edição cancelada e cards restaurados com sucesso!");
    
};










    
    return (
        <div className="perfil-cnpj-componente-principal">
        

            <div className="perfil-cnpj-componente-suporte">


                <div className="perfil-cnpj-usuario-card">
                    
                    <div className="perfil-cnpj-card-titulo">🏢 DADOS EMPRESARIAIS</div>

                    <div className="perfil-cnpj-card-corpo">

                     

                        <div className="flex-cnpj">
                            <label>CNPJ (via BrasilAPI)</label>
                            <input 
                                ref={cnpjInputRef}
                                type="text" 
                                name="cnpj"
                                placeholder="00.000.000/0000-00"
                                disabled={!podeEditar} 
                                value={cnpj} 
                                onChange={mascaraCnpj} 
                                autoComplete="organization" /* ✨ Sinal para o celular sugerir dados de empresas */
                                required
                            />
                        </div>

                        <div className="flex-razao">
                            <label>Razão Social</label>
                            <input type="text" disabled={true} value={razaoSocial} className="input-travado" />
                        </div>

                        <div className="flex-fantasia">
                            <label>Nome Fantasia</label>
                            <input type="text" disabled={true} value={nomeFantasia} />
                        </div>

                        <div className="flex-situacao">
                            <label>Situação</label>
                            <input type="text" disabled={true} value={situacao} />
                        </div>
                        
                        <div className="flex-atividade">
                            <label>Atividade Principal</label>
                            <input type="text" disabled={true} value={atividades} />
                        </div>

                        <div className="flex-socio">
                            <label>Sócios / Proprietários</label>
                            <input type="text" disabled={true} value={socios} />
                        </div>






                        <div className="AreaBotoes">

                            {!podeEditar ? (
                                <button 
                                    type="button" 
                                    className="BotaoEditar" 
                                    onClick={() => {
                                        console.log("");
                                        console.log("📐 ----------------------------------");
                                        console.log("📐 🚀 EVENTO: Clique no botão '🔓 Editar CNPJ'");
                                        console.log("📐 componente - 🧿 Cnpj.jsx");
                                        console.log("📐 📍 setPodeEditar(true)");
                                        console.log("📐 ----------------------------------");
                                        setPodeEditar(true);
                                    }}
                                >
                                    🔓 Editar CNPJ
                                </button>
                            ) : (
                                <>
                                    <button 
                                        type="button" 
                                        className="BotaoSalvar" 
                                        onClick={salvarCnpjNoBanco}
                                    >
                                        💾 Salvar Empresa
                                    </button>

                                    {/* O botão cancelar só aparece se não for um cadastro novo */}
                                    {!ehNovoCadastro && (
                                        <button 
                                            type="button" 
                                            className="BotaoCancelar" 
                                            onClick={cancelarEdicao}
                                        >
                                            ✖️ Cancelar Edição
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