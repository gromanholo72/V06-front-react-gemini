import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database";
import { db_realtime } from './firebaseConfig.js';
import { DetalhesUsuario } from './DetalhesUsuario'; // Importando o novo componente
import './RelClientes.css'; 

export function RelClientes() {
    const [listaClientes, setListaClientes] = useState([]);
    const [carregando, setCarregando] = useState(true);
    // 💡 Estado para controlar qual usuário o programador quer ver
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    useEffect(() => {
        const caminhoDb = ref(db_realtime, 'usuarios');
        
        onValue(caminhoDb, (snapshot) => {
            const dados = snapshot.val();

            if (dados) {
                const listaFormatada = Object.keys(dados).map(id => {
                    const original = dados[id];
                    
                    // 📐 Extração de metadados para ordenação e filtro sem sujar a raiz
                    const funcao = original.dadosBasico?.func || original.func || "";

                    let pesoOrdem = 99;
                    if (funcao === 'administrador') pesoOrdem = 1;
                    if (funcao === 'cuidadora') pesoOrdem = 2;
                    if (funcao === 'cliente') pesoOrdem = 3;

                    // 📐 RETORNO MAESTRO: Mantemos a estrutura original + ID + Peso
                    return {
                        ...original,
                        id_firebase: id,
                        ordem_maestro: pesoOrdem
                    };
                })
                .filter(u => [1, 2, 3].includes(u.ordem_maestro))
                .sort((a, b) => a.ordem_maestro - b.ordem_maestro);

                setListaClientes(listaFormatada);
            }















            setCarregando(false);
        });
    }, []);

    return (
        <div className="rel-clientes-principal">
            <div className="rel-clientes-suporte">
                <div className="rel-clientes-header">
                    <h2>📊 Relatório Geral de Usuários</h2>
                    <small style={{color: '#666'}}>Dica: Clique em uma linha para ver detalhes técnicos</small>
                </div>

                {carregando ? (
                    <div className="rel-clientes-tabela-container">
                        <p style={{ padding: '60px', textAlign: 'center', fontWeight: 'bold', color: 'rgb(212, 175, 55)' }}>
                            ⏳ Sincronizando com a Antena Central...
                        </p>
                    </div>
                ) : (
                    <div className="rel-clientes-tabela-container">
                        <table className="rel-clientes-tabela" style={{ borderCollapse: 'collapse', width: '100%' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f2f2f2' }}>
                                    <th style={{ textAlign: 'left', border: '1px solid black', padding: '12px' }}>👤 Nome</th>
                                    <th style={{ textAlign: 'center', border: '1px solid black', padding: '12px' }}>🛠️ Função</th>
                                    <th style={{ textAlign: 'center', border: '1px solid black', padding: '12px' }}>🛡️ Cadastro</th>
                                    <th style={{ textAlign: 'center', border: '1px solid black', padding: '12px' }}>🔓 Liberar Prontuário</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaClientes.length > 0 ? (
                                    listaClientes.map((usuario) => (
                                        <tr 
                                            key={usuario.id_firebase} 
                                            onClick={() => setUsuarioSelecionado(usuario)} 
                                            style={{ cursor: 'pointer', transition: '0.2s' }}
                                            className="linha-tabela-hover"
                                        >
                                            <td style={{ border: '1px solid black', padding: '10px', fontWeight: usuario.dadosBasico?.func === 'administrador' ? 'bold' : 'normal' }}>
                                                {usuario.dadosBasico?.nome || "N/A"}
                                            </td>

                                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center', textTransform: 'capitalize' }}>
                                                <span style={{ color: usuario.dadosBasico?.func === 'administrador' ? '#d4af37' : usuario.dadosBasico?.func === 'cuidadora' ? '#2ecc71' : '#3498db' }}>
                                                    {usuario.dadosBasico?.func}
                                                </span>
                                            </td>

                                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                                                {usuario.dadosInterno?.dadosUsuarioCompleto === true ? (
                                                    <span title="Confirmar cadastro">🌌 confirmar cadastro preenchido</span>
                                                ) : (
                                                    <span style={{ backgroundColor: '#ffc107', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                                                        ⏳ Pendente de preenchimento
                                                    </span>
                                                )}
                                            </td>

                                            <td style={{ border: '1px solid black', padding: '10px', textAlign: 'center' }}>
                                                {usuario.dadosInterno?.usuarioLiberadoPeloAdministrador ? (
                                                    <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>🟢 Liberado</span>
                                                ) : (
                                                    <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>🔴 Bloqueado</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#777', border: '1px solid black' }}>
                                            🚫 Nenhum registro identificado.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* 🚀 MODAL DE DETALHES TÉCNICOS */}
            {usuarioSelecionado && (
                <DetalhesUsuario 
                    usuario={usuarioSelecionado} 
                    aoFechar={() => setUsuarioSelecionado(null)} 
                />
            )}
        </div>
    );
}