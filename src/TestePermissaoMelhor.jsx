import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { useAuth } from './AutenticacaoContexto.jsx';

export function TestePermissaoMelhor() {
    const navigate = useNavigate();
    const { 
        setCarregandoPermissoesFireBase,
        setDadosUsuarioCompleto,
        dadosUsuarioCompleto 
    } = useAuth();

    const authLogado = getAuth();
    const meuUid = authLogado.currentUser?.uid;

    // Alvo é 0 programador
    const uidAlvoCamada3 = "12114914801";

    // Alvo e o administrador
    const uidAlvoCamada4 = "23360662032";

    // Alvo e a cuidadora
    const uidAlvoCamada5 = "10364634006"; 

    // Alvo e o cliente
    const uidAlvoCamada6 = "76362677056"; 

    const [listaLocal, setListaLocal] = useState( [] );
    const [cardTerceiroCamada3, setCardTerceiroCamada3] = useState(null);
    const [cardTerceiroCamada4, setCardTerceiroCamada4] = useState(null);
    const [cardTerceiroCamada5, setCardTerceiroCamada5] = useState(null);
    const [cardTerceiroCamada6, setCardTerceiroCamada6] = useState(null);

    useEffect(() => {
        const testarTudo = async () => {
            const db = getDatabase();

            try {
                const snap01 = await get(ref(db, 'usuarios'));
                if (snap01.exists()) setListaLocal(Object.values(snap01.val()));
            } catch (e) { }

            try {
                const snap02 = await get(ref(db, `usuarios/${meuUid}`));
                if (snap02.exists()) setDadosUsuarioCompleto(snap02.val());
            } catch (e) { }

            try {
                const snap03 = await get(ref(db, `usuarios/${uidAlvoCamada3}`));
                if (snap03.exists()) setCardTerceiroCamada3(snap03.val());
            } catch (e) { }

            try {
                const snap04 = await get(ref(db, `usuarios/${uidAlvoCamada4}`));
                if (snap04.exists()) setCardTerceiroCamada4(snap04.val());
            } catch (e) { }

            try {
                const snap05 = await get(ref(db, `usuarios/${uidAlvoCamada5}`));
                if (snap05.exists()) setCardTerceiroCamada5(snap05.val());
            } catch (e) { }

            try {
                const snap06 = await get(ref(db, `usuarios/${uidAlvoCamada6}`));
                if (snap06.exists()) setCardTerceiroCamada6(snap06.val());
            } catch (e) { }

            setCarregandoPermissoesFireBase(false);
        };

        testarTudo();
        
    }, [meuUid]);




    
    return (


        
        <div className="DivConteudo">

            <section className="secao-estudo">
                <h1>👑 Camada 01: Vistoria da Raiz</h1>
                <p><i>Regra testada: ".read": "auth.token.func === 'programador'"</i></p>
                <div className="area-dos-cards">
                    {listaLocal.length > 0 ? (
                        listaLocal.map((u, i) => (
                            <div key={i} className="card-individual">
                                <p>👤 <strong>Nome:</strong> {u.nome}</p>
                                <p>💼 <strong>Cargo:</strong> {u.func}</p>
                            </div>
                        ))
                    ) : (
                        <div className="card-individual card-erro">🚫 Bloqueio: Apenas Programador lista a raiz.</div>
                    )}
                </div>
            </section>

            <hr className="divisor-obra" />

            <section className="secao-estudo">
                <h1>🛡️ Camada 02: Privacidade Individual</h1>
                <p><i>Regra testada: "auth.uid === $uid"</i></p>
                {/* 🧱 IMPLEMENTAÇÃO: Painel de Auditoria de Identidade */}
                <div className="painel-auditoria">
                    <p><strong>🔑 auth.uid (Quem sou eu):</strong> <code>{meuUid}</code></p>
                    <p><strong>📂 $uid (Alvo da Espiada):</strong> <code>{meuUid}</code></p>
                </div>
                <div className="area-dos-cards">
                    {dadosUsuarioCompleto ? (
                        <div className="card-individual card-sucesso">
                            <p>👤 <strong>Nome:</strong> {dadosUsuarioCompleto?.nome}</p>
                            <p>💼 <strong>Cargo:</strong> {dadosUsuarioCompleto?.func}</p>
                            <span className="sticker-sucesso">✅ Acesso à Camada 02 Liberado!</span>
                        </div>
                    ) : (
                        <div className="card-individual card-erro">🚨 Bloqueio: Firebase barrou seu próprio card.</div>
                    )}
                </div>
            </section>

            <hr className="divisor-obra" />

            <section className="secao-estudo">
                <h1>🛡️ Camada 03: Acesso de Cúpula</h1>
                <p><i>Regra testada: "auth.token.func === 'programador'"</i></p>
                {/* 🧱 IMPLEMENTAÇÃO: Painel de Auditoria de Cúpula */}
                <div className="painel-auditoria">
                    <p><strong>🔑 auth.uid (Quem sou eu):</strong> <code>{meuUid}</code></p>
                    <p><strong>📂 $uid (Alvo da Espiada):</strong> <code>{uidAlvoCamada3}</code></p>
                </div>
                <div className="area-dos-cards">
                    {cardTerceiroCamada3 ? (
                        <div className="card-individual card-alerta">
                            <p>👤 <strong>Nome:</strong> {cardTerceiroCamada3?.nome}</p>
                            <p>💼 <strong>Cargo:</strong> {cardTerceiroCamada3?.func}</p>
                            <span className="sticker-sucesso">✅ Acesso à Camada 03 Liberado!</span>
                        </div>
                    ) : (
                        <div className="card-individual card-erro">🚫 Bloqueio: Requer Chave Mestra.</div>
                    )}
                </div>
            </section>

            <hr className="divisor-obra" />

            {[
                { n: "04", id: uidAlvoCamada4, data: cardTerceiroCamada4 },
                { n: "05", id: uidAlvoCamada5, data: cardTerceiroCamada5 },
                { n: "06", id: uidAlvoCamada6, data: cardTerceiroCamada6 }
            ].map((camada) => (
                <section key={camada.n} className="secao-estudo">
                    <h1>🛡️ Camada {camada.n}: Acesso Cruzado Admin</h1>
                    <p><i>Regra testada: "(auth.token.func === 'administrador' && data.child('func').val() !== 'programador')"</i></p>
                    {/* 🧱 IMPLEMENTAÇÃO: Painel de Auditoria Cruzada */}
                    <div className="painel-auditoria">
                        <p><strong>🔑 auth.uid (Quem sou eu):</strong> <code>{meuUid}</code></p>
                        <p><strong>📂 $uid (Alvo da Espiada):</strong> <code>{camada.id}</code></p>
                    </div>
                    <div className="area-dos-cards">
                        {camada.data ? (
                            <div className="card-individual card-sucesso">
                                <p>👤 <strong>Nome:</strong> {camada.data?.nome}</p>
                                <p>💼 <strong>Cargo:</strong> {camada.data?.func}</p>
                                <span className="sticker-sucesso">✅ Camada {camada.n}: Acesso Autorizado!</span>
                            </div>
                        ) : (
                            <div className="card-individual card-erro">
                                <p>🚨 <strong>BLOQUEIO DE HIERARQUIA:</strong></p>
                                <p>Apenas <b>Administradores</b> podem ver cards de terceiros (desde que o alvo não seja Programador).</p>
                                <p><small>Seu cargo atual não possui este privilégio de acesso cruzado.</small></p>
                            </div>
                        )}
                    </div>
                </section>
            ))}

            <button className="botao-voltar" onClick={() => navigate(-1)}>🔙 Voltar para a Obra</button>
        </div> 
    );





}