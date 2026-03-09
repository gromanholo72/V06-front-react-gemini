
// 🧠 React (Gerente/Cérebro)
import React from 'react';

import { useState, useEffect } from 'react'; 

// 👷 O Mestre de Obras (React 18+) - Empreitera toda 
import ReactDOM from 'react-dom/client';

// 🛣️ React Router (Rotas Virtuais) - asfalto que permite o navigate('/') funcionar
import { BrowserRouter, useLocation} from 'react-router-dom';

// 🏠 Casa (react) - planta da sua Casa
import './index.css'

// 🎨 O acabamento (Pintura/CSS)
import App from './App.jsx' // Aqui ele traz o 🧠 React (O Gerente/Cérebro)

import { AutenticacaoProvider } from './AutenticacaoContexto'; // O Gerente










// 🚀 O ELEVADOR (ScrollToTop)
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 🏗️ Toda vez que o cômodo mudar, suba para o zero absoluto!
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};











// 📍 Terreno/Fundação (<div id="root">):
ReactDOM.createRoot(document.getElementById('root')).render(
  /* 🧱 Removi as tags <React.StrictMode> daqui */
  <AutenticacaoProvider>
    <BrowserRouter>
      <ScrollToTop /> 
      <App />
    </BrowserRouter>
  </AutenticacaoProvider>
);