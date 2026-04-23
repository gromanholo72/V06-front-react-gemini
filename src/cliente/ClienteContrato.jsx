import { useState, useEffect, useRef, useCallback } from 'react';

import { ref, get, set, push, serverTimestamp, onValue, update } from 'firebase/database';
import { useAuth } from '../AutenticacaoContexto'; 

import './ClienteContrato.css';


export function ClienteContrato({ ehComputador }) {

    const { 

        db_realtime,
        dadosToken,
        dadosUsuarioBanco
       
    } = useAuth();





    // No topo do seu componente, certifique-se de ter esse estado:
    const [dadosCadastro, setDadosCadastro] = useState({});
    const [modalidadeAtendimento, setModalidadeAtendimento] = useState('');




    // ---------------------------------
    // INICIO - 📐 MONITOR DE SUPRIMENTOS (CONDIÇÃO INICIAL)
    // ---------------------------------

    // console.log("");
    // console.log("📐 -----------------------------------------------------------");
    // console.log("📐 MONITOR: Suprimentos do Contexto e Estado");
    // console.log("📐 Componente: ClienteContrato.jsx");
    // console.log("📐 db_realtime:", db_realtime ? "✅ Conectado" : "❌ Ausente");
    // console.log("📐 dadosToken:", dadosToken);
    // console.log("📐 dadosCadastro:", dadosCadastro);
    // console.log("📐 -----------------------------------------------------------");

    // ---------------------------------
    // FIM - 📐 MONITOR DE SUPRIMENTOS (CONDIÇÃO INICIAL)










    // 1. Identificação
    const cpfLimpo = dadosToken?.cpef ? dadosToken.cpef.replace(/\D/g, "") : null;

    // console.log("");
    // console.log("🔍 -----------------------------------------------------------");
    // console.log("🔍 INSPEÇÃO: Identificação do Cliente");
    // console.log("🔍 cpfLimpo:", cpfLimpo);
    // console.log("🔍 -----------------------------------------------------------");










    // ---------------------------------
    // INICIO - 📡 Busca de Dados no Firebase
    // ---------------------------------

    // useEffect(() => {
        
    //     // 2. Segurança: Só executa se tiver o Banco e o CPF
    //     if (!db_realtime || !cpfLimpo) return;

    //     // 3. Caminho específico: Estamos olhando apenas para os dados de cadastro deste CPF
    //     const caminho_firebase = ref(db_realtime, `usuarios/${cpfLimpo}/dadosContrato`);
        
    //     // console.log("");
    //     // console.log("📡 -----------------------------------------------------------");
    //     // console.log("📡 VIGILÂNCIA: Caminho Firebase Ativo");
    //     // console.log("📡 caminho_firebase:", caminho_firebase.toString());
    //     // console.log("📡 -----------------------------------------------------------");

    //     const unsubscribe = onValue(caminho_firebase, (snapshot) => {

    //         const dados_firebase = snapshot.val();

    //         console.log("");
    //         console.log("🔥 -----------------------------------------");
    //         console.log("🔥 SINCRONIA EM TEMPO REAL: dadosCadastro");
    //         console.log("🔥 Componente: ClienteContrato.jsx");
    //         console.log("🔥 dados_firebase:", dados_firebase);
    //         console.log("🔥 -----------------------------------------");

    //         // 4. ALIMENTANDO O ESTADO: 
    //         // Agora 'dadosCadastro' deixará de ser undefined e passará a existir no componente!
    //         if (dados_firebase) {
    //             setDadosCadastro(dados_firebase);
    //         } else {
    //             setDadosCadastro({}); // Garante objeto vazio se não houver dados no banco
    //         }
    //     });

    //     return () => unsubscribe();

    // }, [db_realtime, cpfLimpo]); // Monitora mudança de banco ou de usuário

    // ---------------------------------
    // FIM - 📡 Busca de Dados no Firebase 
    // ---------------------------------











    
    


   


  
    // ---------------------------------
    // INICIO - 🖋️ AÇÃO: ASSINATURA DIGITAL (CLIENTE)
    // ---------------------------------

    const lidarComAssinatura = async () => {

        // 2. Segurança: Só executa se tiver o Banco e o CPF
        if (!db_realtime || !cpfLimpo) return;
     
        const jaEstaAssinado = dadosUsuarioBanco?.dadosContrato?.contratoAssinado === true;

        console.log("");
        console.log("🖋️ --------------------------");
        console.log("🖋️ VALIDAÇÃO PRÉ-ASSINATURA");
        console.log("🖋️ jaEstaAssinado:", jaEstaAssinado);
        console.log("🖋️ --------------------------");


           // 🔐 VALIDAÇÃO MAESTRO: Verifica se a modalidade foi escolhida
           if (!modalidadeAtendimento) {
            console.log("🖋️ ⚠️ ALERTA: Tentativa de assinatura sem modalidade definida.");
            alert("⚠️ Por favor, selecione a Modalidade de Atendimento (Clínica ou Lar) antes de realizar a assinatura.");
            return;
        }

        if (jaEstaAssinado) {
            console.log("🖋️ 🛡️ BLOQUEIO: O contrato já está assinado. Ação cancelada.");
            alert("✅ Este contrato já consta como assinado digitalmente. Para alterações, entre em contato com a administração.");
            return;
        }


        // Se chegou aqui, é porque NÃO está assinado. A única ação possível é ASSINAR (true).
        const novaAcaoAssinar = true;

        // 4. Logs de Inspeção Maestro
        console.log("");
        console.log("🖋️ -----------------------------------------------------------");
        console.log("🖋️ PROTOCOLO DE ASSINATURA DIGITAL - ASSISTÊNCIA SÊNIOR");
        console.log("🖋️ dadosToken?.nome:", dadosToken?.nome?.toUpperCase() || "NOME NO TOKEN");
        console.log("🖋️ cpfLimpo:", cpfLimpo);
        console.log("🖋️ novaAcaoAssinar:", novaAcaoAssinar);
        console.log("🖋️ -----------------------------------------------------------");

        try {



            // 5. Definição do Alvo (Onde o Admin enxergará a assinatura)
            const caminhoContrato = ref(db_realtime, `usuarios/${cpfLimpo}/dadosContrato`);

            // 6. Execução do Protocolo
            await update(caminhoContrato, {
                // Chaves de controle de contrato
                modalidadeAtendimento: modalidadeAtendimento,
                contratoAssinado: novaAcaoAssinar,
                contratoAssinadoData: novaAcaoAssinar ? new Date().toISOString() : "",
                
                // Registro de Auditoria (Protocolo Único)
                contratoAssinadoProtocolo: novaAcaoAssinar ? `ASS-${Date.now()}-${cpfLimpo.substring(0,3)}` : ""
            });
            console.log(`✅ 🖋️ SUCESSO: Registro do contratoAssinado atualizado no Firebase.`);
            







            // 5. Liberando Prontuario
            const caminhoProntuario = ref(db_realtime, `usuarios/${cpfLimpo}/dadosProntuario`);
            await update(caminhoProntuario, {

                prontuarioLiberado: novaAcaoAssinar,
                prontuarioLiberadoData: novaAcaoAssinar ? new Date().toISOString() : "",
    
            });
            console.log(`✅ 🖋️ SUCESSO: contratoAssinado e prontuarioLiberado registrado no firebase.`);

            alert("✅ 🖋️ SUCESSO: contratoAssinado e prontuarioLiberado registrado no firebase.");


        } catch (error) {
            console.error("❌ 🚨 Erro no protocolo Maestro:", error.message);
            alert("❌ Falha na comunicação com o servidor. Verifique sua internet.");
        }
    };

    // ---------------------------------
    // FIM - 🖋️ AÇÃO: ASSINATURA DIGITAL (CLIENTE)
    // ---------------------------------







    // useEffect(() => {
    //     console.log("");
    //     console.log("📐 -----------------------------------------------------------");
    //     console.log("📐 MONITOR: Visualização de Contrato Institucional");
    //     console.log("📐 Componente: ClienteContrato.jsx");
    //     console.log("📐 Status: Documento pronto para leitura");
    //     console.log("📐 -----------------------------------------------------------");
    // }, []);


    return (


        <div className="cliente-contrato-principal">




            <div className="cliente-contrato-suporte">





                <div className="contrato-usuario-card">
                    


               

                    <header className={`contrato-card-header ${!ehComputador ? 'celular' : ''}`}>
                        <h2 style={{ fontSize: '1.3rem' }}>Termos de Prestação de Serviço</h2>
                        
                        <button 
                            className={`btn-contrato-pdf ${!ehComputador ? 'celular' : ''}`} 
                            style={{ fontSize: '12px', padding: '8px 15px' }}
                            onClick={() => alert("Gerando PDF do Contrato...")}
                        >
                            Baixar PDF
                        </button>
                    </header>





                    <div className="contrato-card-corpo">





                        {/* --- SEÇÃO 1: OBJETO --- */}
                        <section className="contrato-secao">
                            <h3 style={{ fontSize: '18px' }}>⚖️ 1. Objeto do Contrato</h3>
                            <p style={{ fontSize: '14px' }}>
                                O presente instrumento tem como objetivo a prestação de serviços de cuidado e assistência ao idoso, 
                                abrangendo monitoramento 24h, auxílio em atividades de vida diária e suporte operacional especializado.
                            </p>
                        </section>


                        {/* --- SEÇÃO 2: SERVIÇOS INCLUSOS --- */}
                        <section className="contrato-secao">
                            <h3 style={{ fontSize: '18px' }}>🩺 2. Serviços e Assistência</h3>
                            <ul className="contrato-lista" style={{ fontSize: '14px' }}>
                                <li>Acompanhamento por cuidadoras qualificadas em regime de escala.</li>
                                <li>Monitoramento da administração de medicamentos via sistema.</li>
                                <li>Suporte à higiene pessoal e mobilidade assistida.</li>
                                <li>Elaboração de cardápios adaptados por equipe de nutrição.</li>
                            </ul>
                        </section>


                        {/* --- SEÇÃO 3: OBRIGAÇÕES DO CONTRATANTE --- */}
                        <section className="contrato-secao">
                            <h3 style={{ fontSize: '18px' }}>🤝 3. Responsabilidades do Cliente</h3>
                            <p style={{ fontSize: '14px' }}>
                                O contratante compromete-se a fornecer todas as informações clínicas necessárias, 
                                manter o estoque de medicamentos atualizado e respeitar as diretrizes de visitação 
                                vigentes na instituição.
                            </p>
                        </section>


                        {/* --- SEÇÃO 4: MODALIDADE DE ATENDIMENTO --- */}
                        <section className="contrato-secao">
                            <h3 style={{ fontSize: '16px' }}>🏠 4. Modalidade de Atendimento</h3>
                            <p style={{ fontSize: '13px' }}>
                                Defina abaixo o local principal para a prestação dos serviços de assistência:
                            </p>
                            
                            <select 
                                className="contrato-select-maestro"
                                value={dadosUsuarioBanco?.dadosContrato?.modalidadeAtendimento}
                                onChange={(e) => setModalidadeAtendimento(e.target.value)}
                                disabled={!!dadosUsuarioBanco?.dadosContrato?.contratoAssinado}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    borderRadius: '8px',
                                    border: '1px solid #306396',
                                    backgroundColor: !!dadosCadastro?.contratoAssinado ? '#f0f0f0' : '#ffffff',
                                    fontWeight: 'bold',
                                    marginTop: '10px',
                                    fontSize: '14px',
                                    cursor: !!dadosCadastro?.contratoAssinado ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <option value="">--- Selecione a Modalidade ---</option>
                                <option value="Atendimento na clinica">Atendimento na Clínica 🏥</option>
                                <option value="Atendimento no Lar">Atendimento Home Care 🏡</option>
                            </select>
                        </section>

                        {/* --- SEÇÃO 5: RESCISÃO --- */}
                        <section className="contrato-secao">
                            <h3 style={{ fontSize: '16px' }}>🚫 5. Cancelamento e Prazos</h3>
                            <p style={{ fontSize: '13px' }}>
                                A rescisão deste contrato pode ser solicitada por ambas as partes mediante aviso prévio 
                                de 30 (trinta) dias, garantindo a transição segura dos cuidados do paciente.
                            </p>
                        </section>








                        <footer className="contrato-footer">




                            <div className="alerta-contrato">
                                <strong style={{ fontSize: '12px' }}>⚠️ Nota:</strong> <span style={{ fontSize: '12px' }}>Este documento é uma visualização digital dos termos aceitos no momento do cadastro.</span>
                            </div>






                            {/* --------------------------------- */}
                            {/* INICIO - 🔘 BOTÃO DE ASSINATURA   */}
                            {/* --------------------------------- */}

                            <div className="area-botao-assinar">
                                
                                <button 
                                    // 1. Aplica classe CSS diferente se estiver assinado
                                    className={`btn-assinar-contrato ${dadosUsuarioBanco?.dadosContrato?.contratoAssinado ? 'btn-travado' : ''}`} 
                                    
                                    // 2. Chama a função apenas se NÃO estiver assinado
                                    onClick={lidarComAssinatura}
                                    
                                    // 3. Atributo nativo para impedir o clique
                                    disabled={!!dadosUsuarioBanco?.dadosContrato?.contratoAssinado} 
                                    style={{ fontSize: '16px' }}
                                >
                                    {dadosUsuarioBanco?.dadosContrato?.contratoAssinado ? (
                                        <>Contrato Assinado ✅</>
                                    ) : (
                                        <>Assinar Contrato 🖋️</>
                                    )}
                                </button>
                                
                                {dadosUsuarioBanco?.dadosContrato?.contratoAssinado && (
                                    <p className="legenda-assinatura" style={{ fontSize: '11px' }}>
                                        Registrado em: {new Date(dadosUsuarioBanco?.dadosContrato?.contratoAssinadoData).toLocaleDateString('pt-BR')}
                                    </p>
                                )}
                            </div>

                            {/* --------------------------------- */}
                            {/* FIM - 🔘 BOTÃO DE ASSINATURA      */}
                            {/* --------------------------------- */}





                        </footer>





                    </div>


                </div>


            </div>

        </div>


    );
}
