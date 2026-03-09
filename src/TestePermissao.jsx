
/* 🧱 Importando as Ferramentas de Trabalho necessárias */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getDatabase, ref, get } from "firebase/database";
import { getAuth } from "firebase/auth";

import { useAuth } from './AutenticacaoContexto.jsx';

export function TestePermissao() {




    const navigate = useNavigate();
    



    /* 🛠️ Pegando as ferramentas do nosso Contexto */
    const { 
    
        setCarregandoPermissoesFireBase,
        setDadosUsuarioCompleto,
        dadosUsuarioCompleto 

    } = useAuth();







    



    const authLogado = getAuth();

    // Este representa o auth.uid das Rules
    const meuUid = authLogado.currentUser?.uid;

    // Na Camada 02, o $uid esperado é o seu próprio ID
    // const uidAlvoCamada2 = authLogado.currentUser?.uid;

    const uidAlvoCamada3 = "12114914901";

    const uidAlvoCamada4 = "23360662032";

    const uidAlvoCamada5 = "10364634006"; 

    const uidAlvoCamada6 = "76362677056"; 

    // useEffect(() => {
    //     const renovarERecarregar = async () => {
    //         const auth = getAuth();
    //         if (auth.currentUser) {
    //             await auth.currentUser.getIdToken(true); 
    //             console.log("📐 🎟️ Token Renovado para Segurança!");
    //         }
    //     };
    //     renovarERecarregar();
    // }, []);












   
    const [listaLocal, setListaLocal] = useState( [] );

    /* 🧱 CAMADA 01: TESTE DE RAIZ (Acesso Geral) */
    useEffect(() => {

        const testarRaiz = async () => {

            console.log("");
            console.warn(" ✨ ----------------------------------");
            console.warn(" ✨ 🕵️‍♂️ VISTORIA CAMADA 01: Iniciando teste na Raiz /usuarios");
            
            try {

                const db = getDatabase();

                const snapshotGeral = await get(ref(db, 'usuarios'));
                
                if (snapshotGeral.exists()) {

                    console.log("✨ ✅ SUCESSO RAIZ: Acesso liberado! (Você é Programador)");

                    setListaLocal(Object.values(snapshotGeral.val()));

                }

            } catch (error) {

                console.error("✨ 🚨 BLOQUEIO RAIZ: As Rules barraram a leitura da lista completa.", error.message);
           
            }

        };

        testarRaiz();

    /* 🧱 Executa apenas uma vez ao carregar a obra */
    }, []);














    /* 🔒 CAMADA 02: TESTE INDIVIDUAL (Acesso ao Próprio Card) */
    useEffect(() => {

        const testarIndividual = async () => {

            if (!meuUid) return;

            console.log("");
            console.warn(" ✨ ----------------------------------");
            console.warn(`✨ 🕵️‍♂️ VISTORIA CAMADA 02: Iniciando teste no nó /usuarios/${meuUid}`);

            try {
                const db = getDatabase();
                const snapshotIndividual = await get(ref(db, `usuarios/${meuUid}`));

                if (snapshotIndividual.exists()) {

                    console.log("📐 ✅ SUCESSO INDIVIDUAL: Você acessou seu próprio card!");

                    setDadosUsuarioCompleto(snapshotIndividual.val());

                }
            } catch (error) {

                console.error("✨ 🚨 BLOQUEIO INDIVIDUAL: Erro de permissão no seu próprio ID.", error.message);
           
            } finally {

                setCarregandoPermissoesFireBase(false);

            }
        };

        testarIndividual();

    }, [setDadosUsuarioCompleto, setCarregandoPermissoesFireBase]);












    /* 🕵️‍♂️ CAMADAS 03 a 06: TESTES DE ACESSO CRUZADO */

    /* 📐 3. Estado para a Camada 03 */
    const [cardTerceiroCamada3, setCardTerceiroCamada3] = useState(null);

    /* 🕵️‍♂️ CAMADA 03: TESTE DE ACESSO CRUZADO (Outro Card) */
    useEffect(() => {
        const testarAcessoTerceiroCamada3 = async () => {
            // const idAlvo = "12114914801"; 
            
            console.log("📐 ✨ ----------------------------------");
            console.warn(`✨ 🕵️‍♂️ VISTORIA CAMADA 03: Tentando acessar card alheio: ${uidAlvoCamada3}`);

            try {

                const db = getDatabase();

                const snapshotCamada3 = await get(ref(db, `usuarios/${uidAlvoCamada3}`));

                if (snapshotCamada3.exists()) {

                    setCardTerceiroCamada3(snapshotCamada3.val());

                    console.log("📐 🔵 cardTerceiro = ", snapshotCamada3.val());
                    
                    console.log("📐 ✅ SUCESSO CAMADA 03: Acesso liberado ao card de terceiro!");

                }
            } catch (error) {

                console.error("✨ 🚨 BLOQUEIO CAMADA 03: As Rules impediram você de ver este card.", error.message);
         
            }
        };

        testarAcessoTerceiroCamada3();

    }, []);















const [cardTerceiroCamada4, setCardTerceiroCamada4] = useState(null);


/* 🕵️‍♂️ CAMADA 04: TESTE DE ACESSO CRUZADO (Outro Card) */
useEffect(() => {
    const testarAcessoTerceiroCamada4 = async () => {
        // const uidAlvo = "23360662032"; 
        
        console.log("📐 ✨ ----------------------------------");
        console.warn(`✨ 🕵️‍♂️ VISTORIA CAMADA 04: Tentando acessar card alheio: ${uidAlvoCamada4}`);

        try {
            const db = getDatabase();
            const snapshotCamada4 = await get(ref(db, `usuarios/${uidAlvoCamada4}`));

            if (snapshotCamada4.exists()) {
                console.log("📐 ✅ SUCESSO CAMADA 04: Acesso liberado ao card de terceiro!");
                setCardTerceiroCamada4(snapshotCamada4.val());
            }
        } catch (error) {
            console.error("✨ 🚨 BLOQUEIO CAMADA 04: As Rules impediram você de ver este card.", error.message);
        }
    };

    testarAcessoTerceiroCamada4();
}, []);

















const [cardTerceiroCamada5, setCardTerceiroCamada5] = useState(null);


/* 🕵️‍♂️ CAMADA 05: TESTE DE ACESSO CRUZADO (ID: 10364634006) */
useEffect(() => {
    const testarAcessoTerceiroCamada5 = async () => {
        // const idAlvo = "10364634006"; 
        
        console.log("📐 ✨ ----------------------------------");
        console.warn(`✨ 🕵️‍♂️ VISTORIA CAMADA 05: Tentando acessar card alheio: ${uidAlvoCamada5}`);

        try {
            const db = getDatabase();
            const snapshotCamada5 = await get(ref(db, `usuarios/${uidAlvoCamada5}`));

            if (snapshotCamada5.exists()) {
                console.log("📐 ✅ SUCESSO CAMADA 05: Acesso liberado ao card de terceiro!");
                /* 🧱 Atualizando o estado estratégico da camada 05 */
                setCardTerceiroCamada5(snapshotCamada5.val());
            }
        } catch (error) {
            console.error("✨ 🚨 BLOQUEIO CAMADA 05: As Rules impediram você de ver este card.", error.message);
        }
    };

    testarAcessoTerceiroCamada5();
}, []);

















const [cardTerceiroCamada6, setCardTerceiroCamada6] = useState(null);


/* 🕵️‍♂️ CAMADA 05: TESTE DE ACESSO CRUZADO (ID: 10364634006) */
useEffect(() => {
    const testarAcessoTerceiroCamada6 = async () => {
        // const idAlvo = "76362677056"; 
        
        console.log("📐 ✨ ----------------------------------");
        console.warn(`✨ 🕵️‍♂️ VISTORIA CAMADA 06: Tentando acessar card alheio: ${uidAlvoCamada6}`);

        try {
            const db = getDatabase();
            const snapshotCamada6 = await get(ref(db, `usuarios/${uidAlvoCamada6}`));

            if (snapshotCamada6.exists()) {
                console.log("📐 ✅ SUCESSO CAMADA 06: Acesso liberado ao card de terceiro!");
                /* 🧱 Atualizando o estado estratégico da camada 05 */
                setCardTerceiroCamada6(snapshotCamada6.val());
            }
        } catch (error) {
            console.error("✨ 🚨 BLOQUEIO CAMADA 06: As Rules impediram você de ver este card.", error.message);
        }
    };

    testarAcessoTerceiroCamada6();
}, []);

























return (


    <div className="DivConteudo">







      


        {/* 👑 CAMADA 01: TESTE DE CÚPULA (Raiz /usuarios) */}
        <section className="secao-estudo">

            <h1>👑 Camada 01: Vistoria da Raiz (Programador)</h1>
            <p><i>Regra testada: "auth.token.func === 'programador'"</i></p>
            
            <div className="area-dos-cards">

                {listaLocal.length > 0 ? (

                    listaLocal.map((usuario, index) => (

                        <div key={index} className="card-individual">

                            <p>👤 <strong>Nome:</strong> {usuario?.nome}</p>
                            <p>👔 <strong>CPF:</strong> {usuario?.cpef}</p>
                            <p>💼 <strong>Cargo:</strong> {usuario?.func}</p>
                            <p>🔑 <strong>Permissão:</strong> {usuario?.perm}</p>
                            <hr />

                        </div>

                    ))
                ) : (

                    <div className="card-individual card-erro">

                        <p>🚫 Bloqueio na Camada 01: Apenas o Programador pode listar todos os moradores.</p>
                        <p><small>Verifique o console para o erro de "Permission Denied".</small></p>

                    </div>

                )}

            </div>

        </section>






        <hr className="divisor-obra" />







        {/* 🔒 CAMADA 02: TESTE DE PRIVACIDADE ($uid) */}
        <section className="secao-estudo">

            <h1>🛡️ Camada 02: Acesso ao Próprio Card ($uid)</h1>
            <p><i>Regra testada: "auth.uid === $uid"</i></p>

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
                    <div className="card-individual card-erro">

                        <p>🚨 Bloqueio na Camada 02: O Firebase não entregou seu card individual.</p>

                    </div>
                )}

            </div>

        </section>






        <hr className="divisor-obra" />





{/* 🕵️‍♂️ CAMADA 03: CARD DE TERCEIRO */}
<section className="secao-estudo">
    <h1>🛡️ Camada 03: Acesso ao ID {uidAlvoCamada3}</h1>
    <p><i>Regra testada: "auth.uid === $uid || auth.token.func === 'programador'"</i></p>

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
            <div className="card-individual card-erro">
                <p>🚫 Bloqueio de Segurança: Você não tem permissão para espiar este morador.</p>
            </div>
        )}
    </div>
</section>

<hr className="divisor-obra" />

{/* 🛡️ CAMADA 04: ACESSO CRUZADO */}
<section className="secao-estudo">
    <h1>🛡️ Camada 04: Acesso ao ID {uidAlvoCamada4}</h1>
    <p><i>Regra testada: "auth.uid === $uid || auth.token.func === 'programador'"</i></p>

    <div className="painel-auditoria">
        <p><strong>🔑 auth.uid (Quem sou eu):</strong> <code>{meuUid}</code></p>
        <p><strong>📂 $uid (Alvo da Espiada):</strong> <code>{uidAlvoCamada4}</code></p>
    </div>

    <div className="area-dos-cards">
        {cardTerceiroCamada4 ? (
            <div className="card-individual card-sucesso">
                <p>👤 <strong>Nome:</strong> {cardTerceiroCamada4?.nome}</p>
                <p>💼 <strong>Cargo:</strong> {cardTerceiroCamada4?.func}</p>
                <span className="sticker-sucesso">✅ Camada 04: Acesso Autorizado!</span>
            </div>
        ) : (
            <div className="card-individual card-erro">
                <p>🚨 Camada 04: Bloqueado pelas Rules.</p>
            </div>
        )}
    </div>
</section>

<hr className="divisor-obra" />

{/* 🕵️‍♂️ CAMADA 05: ACESSO CRUZADO */}
<section className="secao-estudo">
    <h1>🛡️ Camada 05: Acesso ao ID {uidAlvoCamada5}</h1>
    <p><i>Regra testada: "auth.uid === $uid || auth.token.func === 'programador'"</i></p>

    <div className="painel-auditoria">
        <p><strong>🔑 auth.uid (Quem sou eu):</strong> <code>{meuUid}</code></p>
        <p><strong>📂 $uid (Alvo da Espiada):</strong> <code>{uidAlvoCamada5}</code></p>
    </div>

    <div className="area-dos-cards">
        {cardTerceiroCamada5 ? (
            <div className="card-individual card-sucesso">
                <p>👤 <strong>Nome:</strong> {cardTerceiroCamada5?.nome}</p>
                <p>💼 <strong>Cargo:</strong> {cardTerceiroCamada5?.func}</p>
                <span className="sticker-sucesso">✅ Camada 05: Card Identificado!</span>
            </div>
        ) : (
            <div className="card-individual card-erro">
                <p>🚨 Camada 05: Acesso Negado.</p>
            </div>
        )}
    </div>
</section>

<hr className="divisor-obra" />

{/* 🕵️‍♂️ CAMADA 06: ACESSO CRUZADO */}
<section className="secao-estudo">
    <h1>🛡️ Camada 06: Acesso ao ID {uidAlvoCamada6}</h1>
    <p><i>Regra testada: "auth.uid === $uid || auth.token.func === 'programador'"</i></p>

    <div className="painel-auditoria">
        <p><strong>🔑 auth.uid (Quem sou eu):</strong> <code>{meuUid}</code></p>
        <p><strong>📂 $uid (Alvo da Espiada):</strong> <code>{uidAlvoCamada6}</code></p>
    </div>

    <div className="area-dos-cards">
        {cardTerceiroCamada6 ? (
            <div className="card-individual card-sucesso">
                <p>👤 <strong>Nome:</strong> {cardTerceiroCamada6?.nome}</p>
                <p>💼 <strong>Cargo:</strong> {cardTerceiroCamada6?.func}</p>
                <span className="sticker-sucesso">✅ Camada 06: Card Identificado!</span>
            </div>
        ) : (
            <div className="card-individual card-erro">
                <p>🚨 Camada 06: Acesso Negado.</p>
            </div>
        )}
    </div>
</section>






        <button className="botao-voltar" onClick={() => navigate(-1)}>
            🔙 Voltar para a Obra
        </button>

    </div> 
);



}