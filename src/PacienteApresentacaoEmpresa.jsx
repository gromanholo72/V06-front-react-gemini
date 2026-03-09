import React, { useState } from 'react';

import './PacienteApresentacaoEmpresa.css';

export const PacienteApresentacaoEmpresa = () => {
  /* Ferramenta de Trabalho para gerenciar o menu ou seções */
  const [secaoAberta, setSecaoAberta] = useState(null);

  return (

    <section className="container-apresentacao">

      <h1 className="titulo"> 🏨 Bem-vindo à Nossa Instituição</h1>

      <p className="descricao">📄 Dedicados a oferecer o melhor suporte para quem você ama.</p>

      <div className="container-cards">
        
        <div className="card-servico">
          <h3>🩺 Cuidados Médicos</h3>
          <p>Acompanhamento 24h com equipe especializada.</p>
        </div>

        
        <div className="card-servico">
          <h3>🎨 Atividades Cognitivas</h3>
          <p>Estímulos diários para manter a mente ativa e saudável.</p>
        </div>

        
        <div className="card-servico">
          <h3>🍎 Nutrição Balanceada</h3>
          <p>Cardápios personalizados para cada necessidade dietética.</p>
        </div>
        
      </div>


    </section>
  );
};