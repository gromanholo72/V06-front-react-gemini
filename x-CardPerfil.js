


{/* 👤 Card de Perfil Moderno */}
<div className="AreaPerfil">
    <button 
        className="BotaoAvatar" 
        onClick={() => setSecaoAberta(secaoAberta === 'menuPerfil' ? null : 'menuPerfil')}
    >
        Meu Perfil
    </button>

    {secaoAberta === 'menuPerfil' && (
        <div className="CardFlutuantePerfil">
            {/* Aqui dentro você coloca os botões de Básico, Endereço, etc. */}
            <button onClick={() => navegarERecolher('/Perfil')}>Básico</button>
            <button onClick={() => navegarERecolher('/Sair')}>Sair</button>
        </div>
    )}
</div>