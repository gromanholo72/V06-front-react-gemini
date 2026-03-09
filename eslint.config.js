import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // 🚫 Ignora pastas de build e dependências para não perder performance
  globalIgnores(['dist', 'node_modules', '.vite']),

  {
    // 📂 Alvo: Todos os seus arquivos de lógica e componentes
    files: ['**/*.{js,jsx}'],
    
    // 📚 Extensões de regras recomendadas pela comunidade
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],

    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node, // Adicionado para ele entender o 'process' se necessário
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },

    // 🏎️ Plugins ativos para o ecossistema React/Vite
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    // 🧱 Regras de Ouro do Maestro (Personalizadas)
    rules: {
      ...reactHooks.configs.recommended.rules,

      // 🟡 Variáveis não usadas: Avisa (amarelo), mas não trava o Build.
      // Permite que variáveis que começam com Maiúscula ou _ passem batido.
      'no-unused-vars': ['warn', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_' 
      }],

      // 🟡 React Refresh: Garante que o HMR (Hot Module Replacement) funcione.
      // Ele vai te avisar se você tentar exportar algo que não seja um componente no mesmo arquivo.
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // 🟢 Outras regras de boa vizinhança:
      'no-console': 'off', // Mestre, nós AMAMOS logs, então deixamos liberado!
      'react/prop-types': 'off', // Se não estiver usando TypeScript, isso evita avisos chatos
    },
  },
])