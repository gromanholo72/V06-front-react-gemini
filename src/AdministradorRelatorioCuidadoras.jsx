import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db_realtime } from './firebaseConfig';
import { DetalhesCuidadora } from './DetalhesCuidadora';
import './AdministradorRelatorioCuidadoras.css';






























/* --------------------------------- */
/* INICIO - 👩‍⚕️ COMPONENTE: AdministradorRelatorioCuidadoras */
/* --------------------------------- */
export function AdministradorRelatorioCuidadoras() {



    const [listaCuidadoras, setListaCuidadoras] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);





    // ---------------------------------
    // INICIO - 📡 Busca de Dados na Antena Central (Firebase)
    // ---------------------------------
    useEffect(() => {
        if (!db_realtime) return;

        const caminhoDb = ref(db_realtime, 'usuarios');
        
        const unsubscribe = onValue(caminhoDb, (snapshot) => {

            const dados = snapshot.val();

            console.log("");
            console.log("🔍 -----------------------------------------------------------");
            console.log("🔍 MONITOR: Sincronização de Cuidadoras Iniciada");
            console.log("🔍 -----------------------------------------------------------");

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
                .filter(u => u.ordem_maestro === 2) // 🎯 Filtro exclusivo para Cuidadoras
                .sort((a, b) => (a.dadosBasico?.nome || "").localeCompare(b.dadosBasico?.nome || ""));

                setListaCuidadoras(listaFormatada);
                
                console.log(`✅ SUCESSO: ${listaFormatada.length} cuidadoras carregadas.`);

            } else {
                setListaCuidadoras([]);
            }
            
            setCarregando(false);
        });

        return () => unsubscribe();
    }, []);
    // ---------------------------------
    // FIM - 📡 Busca de Dados na Antena Central (Firebase)
    // ---------------------------------






























    // ---------------------------------
    // INICIO - 📄 Função de Exportação (Placeholder Maestro)
    // ---------------------------------
    const handleGerarRelatorioPDF = () => {
        console.log("🚀 ----------------------------------");
        console.log("🚀 AÇÃO: Exportar PDF Cuidadoras");
        console.log("🚀 Lote de processamento:", listaCuidadoras.length);
        console.log("🚀 ----------------------------------");
        alert("Iniciando geração do dossiê das cuidadoras...");
    };
    // ---------------------------------
    // FIM - 📄 Função de Exportação
    // ---------------------------------






























    // ---------------------------------
    // INICIO - 🧪 Protocolo de Monitoramento Maestro
    // ---------------------------------
    useEffect(() => {
        console.log("");
        console.log("📐 -----------------------------------------------------------");
        console.log("📐 MONITOR: Relatório Administrativo de Cuidadoras");
        console.log("📐 Status Carregamento:", carregando ? "⏳ Pendente" : "✅ Finalizado");
        console.log("📐 Profissionais no Lote:", listaCuidadoras.length);
        console.log("📐 listaCuidadoras:", listaCuidadoras);
        console.log("📐 -----------------------------------------------------------");
    }, [carregando, listaCuidadoras]);
    // ---------------------------------
    // FIM - 🧪 Protocolo de Monitoramento Maestro
    // ---------------------------------






    return (
        <div className="rel-clientes-principal">
            <div className="rel-clientes-suporte">
                
                <header className="rel-clientes-header">
                    <h2>👩‍⚕️ Relatório de Cuidadoras</h2>
                    <p>Gestão de profissionais qualificadas ativas no sistema.</p>
                </header>

                {carregando ? (
                    <p style={{ padding: '60px', textAlign: 'center', fontWeight: 'bold', color: 'rgb(212, 175, 55)' }}>
                        ⏳ Sincronizando equipe com a Antena Central...
                    </p>
                ) : (


                    <div className="rel-clientes-tabela-container">
                        <table className="rel-clientes-tabela">
                            <thead>
                                <tr>
                                    <th className="adm-relatorio-col-id">🆔 ID</th>
                                    <th className="adm-relatorio-col-nome">👤 Nome da Profissional</th>
                                    <th className="adm-relatorio-col-cadastro">🛡️ Cadastro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaCuidadoras.length > 0 ? (
                                    listaCuidadoras.map((cuidadora) => (
                                        <tr 
                                            key={cuidadora.id_firebase} 
                                            onClick={() => {
                                                console.log("");
                                                console.log("📐 -----------------------------------------------------------");
                                                console.log("📐 EVENTO: Clique na linha da tabela (Cuidadora)");
                                                console.log("📐 Alvo Selecionado:", cuidadora.dadosBasico?.nome?.toUpperCase() || "N/A");
                                                console.log("📐 ID Firebase:", cuidadora.id_firebase);
                                                console.log("📐 Dossiê Selecionado:", cuidadora);
                                                console.log("📐 -----------------------------------------------------------");
                                                setUsuarioSelecionado(cuidadora);
                                            }} 
                                        >
                                            <td className="adm-relatorio-celula-id">
                                                #{cuidadora.id_firebase}
                                            </td>

                                            <td className="nome-destaque">
                                                {cuidadora.dadosBasico?.nome?.toUpperCase() || "N/A"}
                                            </td>


                                         
                                            
                                            <td className="adm-relatorio-col-cadastro">
                                                {cuidadora.dadosCadastro?.autorizadoAdministrador === true ? (
                                                    <span className="rel-clientes-tag-autorizado">
                                                        ✅ Confirmado
                                                    </span>
                                                ) : cuidadora.dadosCadastro?.perfilCompleto === true ? (
                                                    <span className="rel-clientes-tag-confirmar">
                                                        🌌 Confirmar
                                                    </span>
                                                ) : (
                                                    <span className="rel-clientes-tag-pendente">
                                                        ⏳ Pendente
                                                    </span>
                                                )}
                                            </td>


                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                                            🚫 Nenhuma cuidadora cadastrada no momento.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>


                )}
            </div>

            {/* 🚀 MODAL DE DETALHES (PADRÃO MAESTRO V3) */}
            {usuarioSelecionado && (
                <DetalhesCuidadora 
                    usuario={usuarioSelecionado} 
                    aoFechar={() => setUsuarioSelecionado(null)} 
                />
            )}
        </div>
    );
}
/* --------------------------------- */
/* FIM - 👩‍⚕️ COMPONENTE: AdministradorRelatorioCuidadoras */
/* --------------------------------- */