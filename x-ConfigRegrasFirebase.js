{
	"rules": {

		// 🚫 Ninguém lê a raiz global (Segurança Total)
		".read": false,

		// 🚫 Ninguém escreve na raiz global (Segurança Total)
		".write": false,

		"usuarios": {

			// 👑 ACESSO DE CÚPULA (TESTADO NA CAMADA 01):
			// 🚀 Apenas o Programador lista a raiz (vê todos os IDs).
			// Se o Admin precisa listar, ele deve ser incluído aqui, mas ele leria você.
			// Para sua segurança total, mantive apenas o Programador na raiz.
			// 🚀 Bloqueio de Raiz: Apenas o Programador pode dar um "get" em /usuarios.
			// Isso impede que qualquer outro cargo liste todos os IDs de uma vez.

			// 👑 Chave de leitura da Cúpula (Camada 01)
			".read": "auth.token.func === 'programador'",

			// 👑 Chave de escrita da Cúpula (Camada 01)
			".write": "auth.token.func === 'programador'",

			"$uid": {

				// 🔒 PRIVACIDADE DO CARD (CAMADAS 02 ATÉ 06):
				// 1. O usuário logado ($uid) lê/escreve no seu próprio card.
				// 2. Programador herda acesso total de cima (Leitura/Escrita).
				// 3. Admin só entra aqui se o 'func' do card NÃO for 'programador'.

				".read": "
        
					// 1. O usuário logado ($uid) lê no seu próprio card.
					// 🔑 Identifica se você é o dono do card ($uid)
					auth.uid === $uid || 

					// 2. Programador herda acesso total de cima (Leitura).
					// 🔑 Identifica se você é o Programador (Chave Mestra)
					auth.token.func === 'programador' ||

					// 3. Admin só entra aqui se o 'func' do card NÃO for 'programador'.
					// 🔑 Identifica se quem está lendo é o Administrador
					(auth.token.func === 'administrador' && 
					// 🛡️ Bloqueia o Admin de ler cards de Programadores
					data.child('func').val() !== 'programador')",

				".write": "
        
					// 1. O usuário logado ($uid) escreve no seu próprio card.
					// 🖋️ Permite que o dono do card altere seus dados
					auth.uid === $uid || 

					// 2. Programador herda acesso total de cima (Escrita).
					// 🖋️ Permite que o Programador altere qualquer card
					auth.token.func === 'programador' || 

					// 3. Admin só entra aqui se o 'func' do card NÃO for 'programador'.
					// 🖋️ Identifica se quem está escrevendo é o Administrador
					(auth.token.func === 'administrador' && 
					// 🛡️ Bloqueia Admin de mexer em quem JÁ É Programador
					data.child('func').val() !== 'programador' && 
					// 🛡️ Bloqueia Admin de TRANSFORMAR alguém em Programador
					newData.child('func').val() !== 'programador')"
        
			}

		},

		"configuracoes_sistema": {

			// 🧱 O Programador acessa aqui também, mas o Admin não 
			".read": "auth.token.func === 'programador'",
			".write": "auth.token.func === 'programador'"

		}

	}
}