import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database"; /* Conexão com a Antena */
import { db_realtime } from './firebaseConfig.js'; /* Nossa Fundação */
import './RelClientes.css'; 

export function RelClientes() {
    const [listaClientes, setListaClientes] = useState([]); /* 🗄️ Gaveta da Lista */
    const [carregando, setCarregando] = useState(true);


    /* --------------------------------- */
    /* INICIO - 📡 CARREGAMENTO DE DADOS */
    /* --------------------------------- */
    useEffect(() => {
        const caminhoDb = ref(db_realtime, 'usuarios'); /* Onde os dados moram */
        
        console.log("");
        console.log("📡 -----------------------------------------------------------");
        console.log("📡 componente: RelClientes.jsx");
        console.log("📡 Funcao: useEffect()");
        console.log("📡 Buscando dados de Clientes direto no Firebase");

        onValue(caminhoDb, async (snapshot) => {
            // ⏳ UX: Garante tempo mínimo de 500ms para o feedback visual (Evita flicker)
            const tempoMinimo = new Promise(resolve => setTimeout(resolve, 500));

            const dados = snapshot.val();

            console.log("📐 ----------------------------------");
            console.log("📐 DADOS RECEBIDOS DA ANTENA CENTRAL");
            console.log("📐 snapshot:", dados ? "✅ Sucesso" : "❌ Vazio");

            if (dados) {
                /* 🧱 Normalização Maestro: Mapeia os dados tratando a estrutura de sub-objetos */
                const listaFormatada = Object.keys(dados).map(id => ({
                    id,
                    /* 👤 Identificação */
                    nome: dados[id].nome || dados[id].dadosBasico?.nome || "Não Informado",
                    func: dados[id].func || dados[id].dadosBasico?.func || "",
                    
                    /* 📱 Contato */
                    fone: dados[id].fone || dados[id].dadosContato?.fone || "---",
                    mail: dados[id].mail || dados[id].dadosContato?.mail || "---"
                })).filter(user => user.func === 'cliente'); /* 🎯 Filtra apenas Clientes! */

                console.log("📊 Clientes identificados e filtrados:", listaFormatada.length);
                setListaClientes(listaFormatada);
            }
            
            // 🏁 Sincronia Maestro: Aguarda o tempo de cortesia antes de liberar a tela
            await tempoMinimo;

            setCarregando(false);
            console.log("📡 -----------------------------------------------------------");
        });
    }, []);
    /* --------------------------------- */
    /* FIM - 📡 CARREGAMENTO DE DADOS    */
    /* --------------------------------- */





    return (
        <div className="rel-clientes-principal">
            <div className="rel-clientes-suporte">
                <div className="rel-clientes-header">
                    <h2>📊 Relatório de Clientes</h2>
                    <p>Gestão técnica de contratantes cadastrados na fundação</p>
                </div>

                {carregando ? (
                    <div className="rel-clientes-tabela-container">
                        <p style={{ padding: '40px', textAlign: 'center', fontWeight: 'bold', color: '#306396' }}>
                            ⏳ Sincronizando com a Antena Central...
                        </p>
                    </div>
                ) : (
                    <div className="rel-clientes-tabela-container">
                        <table className="rel-clientes-tabela">
                            <thead>
                                <tr>
                                    <th>👤 Contratante</th>
                                    <th>📞 Contato</th>
                                    <th>📧 E-mail</th>
                                    <th>🛡️ Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaClientes.length > 0 ? (
                                    listaClientes.map((cliente) => (
                                        <tr key={cliente.id}>
                                            <td>{cliente.nome}</td>
                                            <td>{cliente.fone}</td>
                                            <td>{cliente.mail}</td>
                                            <td><span className="rel-clientes-tag-ativo">Ativo</span></td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#777' }}>
                                            🚫 Nenhum cliente identificado no almoxarifado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
                
                <p className="StatusProtegido">🛡️ Dados criptografados e protegidos pela fundação Giuliano</p>
            </div>
        </div>
    );
}