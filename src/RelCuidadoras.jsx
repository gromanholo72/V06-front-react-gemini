import React, { useState, useEffect } from 'react';
import { ref, onValue } from "firebase/database"; // Conexão com a Antena
// import { db_realtime } from './firebaseConfig.js'; // Nossa Fundação
import './RelCuidadoras.css'; // O estilo blindado

export function RelCuidadoras() {
    const [listaCuidadoras, setListaCuidadoras] = useState([]); // Gaveta para a lista
    const [carregando, setCarregando] = useState(true);

    // 📡 Ação: Ao carregar a página, busca na Antena Central
    useEffect(() => {
        const caminhoDb = ref(db_realtime, 'usuarios'); // Onde os dados moram
        
        // Escuta em tempo real (onValue)
        onValue(caminhoDb, (snapshot) => {
            const dados = snapshot.val();
            if (dados) {
                // Converte o objeto do Firebase em uma Lista (Array)
                const listaFormatada = Object.keys(dados).map(id => ({
                    id: id,
                    ...dados[id]
                })).filter(user => user.func === 'cuidadora'); // Filtra apenas Cuidadoras!

                setListaCuidadoras(listaFormatada);
            }
            setCarregando(false);
        });
    }, []);

    return (
        <div className="PainelRelatorio">
            <div className="TituloSetor">
                <h2>Relatório de Cuidadoras</h2>
                <p>Lista de profissionais cadastradas no sistema</p>
            </div>

            {carregando ? (
                <p className="StatusProtegido">Buscando informações na Antena Central...</p>
            ) : (
                <div className="TabelaContainer">
                    <table className="TabelaEstilizada">
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>WhatsApp</th>
                                <th>E-mail</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaCuidadoras.length > 0 ? (
                                listaCuidadoras.map((cuidadora) => (
                                    <tr key={cuidadora.id}>
                                        <td>{cuidadora.nome}</td>
                                        <td>{cuidadora.fone}</td>
                                        <td>{cuidadora.mail}</td>
                                        <td><span className="TagSucesso">Ativo</span></td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="StatusProtegido">Nenhuma cuidadora encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
            
            <p className="StatusProtegido">🛡️ Dados protegidos pela fundação Giuliano</p>
        </div>
    );
}