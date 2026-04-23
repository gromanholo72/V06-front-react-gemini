import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";

import { useAuth } from '../AutenticacaoContexto.jsx';


import { DetalhesCuidadora } from './DetalhesCuidadora';
import './AdministradorRelatorioCuidadoras.css';


export function AdministradorRelatorioCuidadoras() {

    const { db_realtime } = useAuth();

    const [carregando, setCarregando] = useState(true);
    const [listaCuidadoras, setListaCuidadoras] = useState([]);
    
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);


    // --------------------------------
    // FIM - 📐 Monitoramento de dados
    // --------------------------------

    useEffect(() => {

        // console.log("");
        // console.log("🔍 ------------------------------");
        // console.log("🔍 MONITOR: Relatório de Cuidadora");
        // console.log("🔍 AdministradorRelatorioCuidadoras.jsx");
        // console.log("🔍 Status Carregamento:", carregando ? "⏳ Pendente" : "✅ Finalizado");
        // console.log("🔍 Total de Cuidadoras:", listaCuidadoras.length);
        // console.log("🔍 ------------------------------");

    }, [carregando, listaCuidadoras]);











    // ---------------------------------
    // INICIO - 🔄 SINCRONIA DE SELEÇÃO VIVA (MAESTRO)
    // ---------------------------------
    useEffect(() => {
        if (!usuarioSelecionado) return;

        // 🔍 Localiza a cuidadora na lista sincronizada
        const usuarioVivo = listaCuidadoras.find(c => c.id_firebase === usuarioSelecionado.id_firebase);

        if (usuarioVivo && JSON.stringify(usuarioVivo) !== JSON.stringify(usuarioSelecionado)) {
            setUsuarioSelecionado(usuarioVivo);
        }
    }, [listaCuidadoras, usuarioSelecionado]);
    // ---------------------------------
    // FIM - 🔄 SINCRONIA DE SELEÇÃO VIVA (MAESTRO)











    // --------------------------------
    // FIM - 📐 Monitoramento de dados
    // --------------------------------







    // ---------------------------------
    // INICIO - 📡 Busca de Dados no Firebase
    // ---------------------------------

    useEffect(() => {

        if (!db_realtime) return;

        const caminho_firebase = ref(db_realtime, 'usuarios');
        
        const unsubscribe = onValue(caminho_firebase, (snapshot) => {

            const dados = snapshot.val();

            // console.log("");
            // console.log("🔍 -----------------------------------------");
            // console.log("🔍 CARREGANDO DADOS NO FIREBASE");
            // console.log("🔍 AdministradorRelatorioCuidadoras.jsx");
            // console.log("🔍 dados:", dados);
            // console.log("🔍 -----------------------------------------");


            if (dados) {

                const listaFormatada = Object.keys(dados).map(id => {

                    const original = dados[id];
                    
                    const funcao = original.dadosBasico?.func || original.func || "";

                    let pesoOrdem = 99;
                    if (funcao === 'administrador') pesoOrdem = 1;
                    if (funcao === 'cuidadora') pesoOrdem = 2;
                    if (funcao === 'cliente') pesoOrdem = 3;

                    // 📐 PROTOCOLO MAESTRO V3: Mapeamento Seguro
                    return {

                        id_firebase: id,
                        dadosBasico: original.dadosBasico || {},
                        dadosContato: original.dadosContato || {}, 
                        dadosEndereco: original.dadosEndereco || {}, 
                        dadosEmpresa: original.dadosEmpresa || {}, 
                        dadosFormacao: original.dadosFormacao || {}, 
                        dadosCadastro: original.dadosCadastro || {},
                        dadosInterno: original.dadosInterno || {},
                        // dadosSeguranca: original.dadosSeguranca || {},
                        ordem_maestro: pesoOrdem

                    };

                })

                // 🎯 Filtro exclusivo para Cuidadoras
                .filter(u => u.ordem_maestro === 2) 
                .sort((a, b) => (a.dadosBasico?.nome || "").localeCompare(b.dadosBasico?.nome || ""));

                // console.log("");
                // console.log("✨ 🛡️ --------------------------------------");
                // console.log("✨ 🛡️ AdministradorRelatorioCuidadoras.jsx - useEffect");
                // console.log("✨ 🛡️ FILTRO: Apenas Cuidadoras Detectados (Ordem 3)");
                // console.log("✨ 🛡️ Lista de Clientes:", listaFormatada);
                // console.log("✨ 🛡️ --------------------------------------");


                setListaCuidadoras(listaFormatada);
                
                // console.log(`✅ SUCESSO: ${listaFormatada.length} cuidadoras carregadas.`);

            } else {

                setListaCuidadoras([]);

            }
            

            setCarregando(false);

        });

        return () => unsubscribe();

    }, [db_realtime]);

    // ---------------------------------
    // FIM - 📡 Busca de Dados no Firebase
    // ---------------------------------










    // ---------------------------------
    // INICIO - 📄 Função de Exportação (PDF)
    // ---------------------------------
    const handleGerarRelatorioPDF = () => {

        console.log("");
        console.log("🚀 ----------------------------------");
        console.log("📐 Componente: AdministradorRelatorioCuidadoras.jsx");
        console.log("📐 Funcao: handleExportarPDF()");
        console.log("🚀 Lote de processamento:", listaCuidadoras.length);
        console.log("🚀 ----------------------------------");

        alert("Iniciando geração do dossiê das cuidadoras...");


    };
    // ---------------------------------
    // FIM - 📄 Função de Exportação (PDF)
    // ---------------------------------








    return (

        
        <div className="relatorio-cuidadora-principal">

            <div className="relatorio-cuidadora-suporte">
                
                <header className="relatorio-cuidadora-header">

                    <h2>👩‍⚕️ Relatório de Cuidadoras</h2>

                    <button className="relatorio-cuidadora-btn-pdf" onClick={handleGerarRelatorioPDF}>
                        Gerar PDF
                    </button>

                </header>

                {carregando ? (


                    <p className="relatorio-cuidadora-loading">
                        ⏳ Sincronizando cuidadoras com o banco de dados...
                    </p>

                    
                ) : (

                    <div className="relatorio-cuidadora-tabela-container">
                        <table className="relatorio-cuidadora-tabela">
                            <thead>
                                <tr>
                                    <th className="adm-relatorio-col-nome">👤 Nome</th>
                                    <th className="adm-relatorio-col-cadastro">🛡️ Cadastro</th>
                                </tr>
                            </thead>               
                            <tbody>

                                {listaCuidadoras.length > 0 ? (

                                    listaCuidadoras.map((cuidadora) => (

                                        <tr 
                                            key={cuidadora.id_firebase} 
                                            onClick={() => {

                                                if (cuidadora.dadosCadastro?.perfilCompleto !== true) {

                                                    console.log("");
                                                    console.log("📐 🛑 -----------------------------------------------------------");
                                                    console.log("📐 🛑 BLOQUEIO: Cadastro Pendente (Cuidadora)");
                                                    console.log("📐 🛑 Motivo: Perfil incompleto no banco de dados.");
                                                    console.log("📐 🛑 -----------------------------------------------------------");
                                                    alert("⏳ Cadastro Pendente!\n\nEsta cuidadora ainda não completou os dados obrigatórios.\n\nÉ necessário aguardar a conclusão do cadastro para liberar a visualização dos detalhes.");
                                                    return;

                                                }

                                                console.log("");
                                                console.log("📐 -----------------------------------------------------------");
                                                console.log("📐 EVENTO: Clique na linha da tabela (Cuidadora)");
                                                console.log("📐 Alvo Selecionado:", cuidadora.dadosBasico?.nome || "N/A");
                                                console.log("📐 ID Firebase:", cuidadora.id_firebase);
                                                console.log("📐 Dossiê Selecionado:", cuidadora);
                                                console.log("📐 -----------------------------------------------------------");

                                                setUsuarioSelecionado(cuidadora);

                                            }} 
                                        >
                                            <td className="nome-destaque">
                                                {cuidadora.dadosBasico?.nome?.toUpperCase() || "N/A"}
                                            </td>

     

                                            <td className="adm-relatorio-col-cadastro">

                                                {cuidadora.dadosCadastro?.autorizadoAdministrador === true ? (

                                                    <span className="relatorio-cuidadora-tag-autorizado">
                                                        <span>✅</span> <span>Confirmado</span>
                                                    </span>

                                                ) : cuidadora.dadosCadastro?.perfilCompleto === true ? (

                                                    <span className="relatorio-cuidadora-tag-confirmar">
                                                        <span>🌌</span> <span>Confirmar</span>
                                                    </span>

                                                ) : (

                                                    <span className="relatorio-cuidadora-tag-pendente">
                                                        <span>⏳</span> <span>Pendente</span>
                                                    </span>

                                                )}

                                            </td>



                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="2" style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                                            🚫 Nenhuma cuidadora cadastrada no momento.
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>


                )}
            </div>


            {/* -------------------------------------------------------- */}
            {/* INICIO - 🚀 MODAL DE DETALHES (PADRÃO MAESTRO V3)        */}
            {/* -------------------------------------------------------- */}

            {usuarioSelecionado && (
                <DetalhesCuidadora 
                    usuario={usuarioSelecionado} 
                    aoFechar={() => setUsuarioSelecionado(null)} 
                />
            )}

            {/* -------------------------------------------------------- */}
            {/* FIM - 🚀 MODAL DE DETALHES (PADRÃO MAESTRO V3)           */}
            {/* -------------------------------------------------------- */}


        </div>
    );



}
