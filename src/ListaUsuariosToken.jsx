import { useState, useEffect } from 'react'; 

import { useAuth } from './AutenticacaoContexto'; 

import { getDatabase, ref, onValue, get, set } from "firebase/database";
// import { auth, db_firestore, db_realtime } from './firebaseConfig.js';

// import { BASE_URL_SERVIDOR } from './config/api.js';

import './ListaUsuariosToken.css'; 




export function ListaUsuariosToken() {

    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);


    const { carregandoPermissoesFireBase } = useAuth();

   











    useEffect(() => {
        if (carregandoPermissoesFireBase) return;
    
        const buscarCardsDiretoNoFirebase = async () => {
            try {
                setCarregando(true);
                const db = getDatabase();
                
                // 🚀 O Programador pode ler a raiz 'usuarios' por causa daquela regra que criamos!
                const usuariosRef = ref(db, 'usuarios');
                const snapshot = await get(usuariosRef);
    
                if (snapshot.exists()) {
                    const dados = snapshot.val();
                    // Transformando o objeto do Firebase em Array para seus cards
                    const listaFormatada = Object.keys(dados).map(key => ({
                        uid: key,
                        ...dados[key]
                    }));
                    
                    setUsuarios(listaFormatada);
                    console.warn("✨ 🕵️‍♂️ Cards carregados diretamente da fundação Firebase.");
                }
    
            } catch (err) {
                console.error("✨ 🚨 Erro ao acessar o almoxarifado:", err.message);
            } finally {
                setCarregando(false);
            }
        };
    
        buscarCardsDiretoNoFirebase();
    }, [carregandoPermissoesFireBase]);






    return (
        <div className="PaginaUsuariosTokenGeral">
            <header className="CabecalhoCards">
                <h2>👤 Galeria de Acesso Restrito</h2>
                <p>Apenas moradores com crachá ativo aparecem aqui.</p>
            </header>

            {carregando ? (
                <div className="AvisoCarregamento">⏳ Consultando o Almoxarifado...</div>
            ) : (
                <div className="GradeDosCardsAutorizados">
                    {usuarios && usuarios.length > 0 ? (
                        usuarios.map((morador) => (
                            <div key={morador.cpef} className="CardIndividualMorador">
                                <div className="AvatarCard">🆔</div>
                                <h3>{morador.nome}</h3>
                                <div className="InfoMorador">
                                    <p><strong>🛠️ Função:</strong> {morador.func}</p>
                                    <p><strong>📡 Status:</strong> 
                                        <span className={`TagSituacao ${morador.situ}`}>
                                            {morador.situ === 'ativo' ? ' On-line' : ' Off-line'}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="AvisoErro">🚫 Nenhum dado disponível. Verifique seu crachá.</p>
                    )}
                </div>
            )}
        </div>
    );
}