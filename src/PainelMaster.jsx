import React, { useState, useEffect } from 'react';
/* 🛠️ Ferramentas de Trabalho do Firebase */
import { getDatabase, ref, onValue } from "firebase/database";
import './PainelMaster.css';

export function PainelMaster() {
    /* 📐 Ferramentas de Trabalho (States) */
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    // Usado para gerenciar qual card de edição está aberto
    const [secaoAberta, setSecaoAberta] = useState(null); 

    useEffect(() => {
        const db = getDatabase();
        const usuariosRef = ref(db, 'usuarios');

        console.log("🧐 [Vistoria] Iniciando escuta em tempo real da fundação...");

        /* 🤝 Conexão ativa com o banco de dados */
        const unsubscribe = onValue(usuariosRef, (snapshot) => {
            const dados = snapshot.val();
            
            if (dados) {
                /* 🧱 Transformando o objeto do Firebase em uma lista de cards (Array) */
                const listaFormatada = Object.keys(dados).map(id => ({
                    id,
                    ...dados[id]
                }));
                
                setUsuarios(listaFormatada);
                console.log("✅ [Vistoria] Cards de usuários atualizados com sucesso.");
            } else {
                setUsuarios([]);
                console.warn("⚠️ [Vistoria] Nenhum usuário encontrado no armário central.");
            }
            
            setCarregando(false);
        }, (error) => {
            console.error("🚨 Erro crítico na leitura da fundação:", error);
            setCarregando(false);
        });

        /* 🧹 Limpeza da Obra: Desconecta ao sair da página */
        return () => {
            console.log("🧹 [Limpeza] Encerrando escuta do PainelMaster.");
            unsubscribe();
        };
    }, []);






    const testarConexaoComServidor = async () => {
        try {
            console.log("📡 -----------------------------------------------------------");
            console.log("📡 TESTE DE CONEXÃO: Chamando Portaria Principal...");
            
            // Usa a URL do seu servidor definida no .env
            const url = import.meta.env.VITE_URL_SERVIDOR_DADOS; 
            const resposta = await fetch(url); 
            
            if (resposta.ok) {
                const texto = await resposta.text();
                console.log("✅ RESPOSTA DO SERVIDOR (ver resultado no servidor):", texto);
                alert("Conexão com o Servidor: ✅ SUCESSO!");
            } else {
                console.log("❌ ERRO NO SERVIDOR: Status", resposta.status);
            }
            console.log("📡 -----------------------------------------------------------");
        } catch (error) {
            console.error("❌ FALHA DE REDE: O servidor está offline ou o IP está errado.");
            console.error("Erro detalhado:", error.message);
            alert("Erro: Não foi possível alcançar o servidor.");
        }
    };








    return (
        <div className="painel-master-container">



            <button 
                onClick={testarConexaoComServidor}
                style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                ⚡ Testar Conexão com Portaria
            </button>



            <header className="cabecalho-painel">
                <h2>🛠️ Gerenciamento de Usuários (Cards)</h2>
                <p>Total de perfis na obra: <strong>{usuarios.length}</strong></p>
            </header>
            

            <hr />

            {carregando ? (
                <div className="carregamento-obra">
                    <p>⏳ Consultando fundação e organizando cards...</p>
                </div>
            ) : (
                <div className="grade-usuarios">
                    {usuarios.length > 0 ? (
                        usuarios.map(user => (
                            /* 🧱 Cada div abaixo representa um Card de Usuário */
                            <div key={user.id} className="card-usuario-admin">
                                <div className="card-header">
                                    <h4>{user.nome || "Usuário Sem Nome"}</h4>
                                    <span>{user.situ === 'ativo' ? '🟢' : '🔴'}</span>
                                </div>
                                
                                <div className="card-body">
                                    <p>Cargo: <strong>{user.func}</strong></p>
                                    <p>E-mail: {user.mail}</p>
                                </div>

                                <div className="card-footer">
                                    <button 
                                        className="botao-editar-permissoes" 
                                        onClick={() => setSecaoAberta(user.id)}
                                    >
                                        ⚙️ Editar Permissões
                                    </button>
                                </div>

                                { /* 🛠️ Exemplo de Seção Aberta para Edição */
                                  secaoAberta === user.id && (
                                    <div className="painel-edicao-rapida">
                                        <p>Editando acesso de: {user.nome}</p>
                                        <button onClick={() => setSecaoAberta(null)}>❌ Fechar</button>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p>Nenhum card disponível para exibição.</p>
                    )}
                </div>
            )}
        </div>
    );
}