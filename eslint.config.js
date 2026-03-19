import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // 1. 🚫 Configuração Global: Ignorar pastas de build e dependências
  {
    ignores: ['dist/', 'node_modules/', '.vite/'],
  },

  // 2. 📚 Configuração Base: Regras recomendadas do ESLint
  js.configs.recommended,

  // 3. ⚛️ Configuração Específica para React (arquivos .js e .jsx)
  {
    files: ['**/*.{js,jsx}'],

    // 🌍 Configurações de ambiente e linguagem
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    // 🔌 Plugins que serão usados neste bloco de configuração
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    // 📐 Regras específicas
    rules: {
      // ... Importa as regras recomendadas do plugin de hooks
      ...reactHooks.configs.recommended.rules,

      // Regra do plugin de refresh para Vite/HMR
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // 🟡 Variáveis não usadas: Avisa (amarelo), mas não trava o Build
      'no-unused-vars': ['warn', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_' 
      }],

      // 🟢 Regras de Ouro do Maestro (Personalizadas)
      'no-console': 'off', // Mestre, nós AMAMOS logs, então deixamos liberado!
      'react/prop-types': 'off', // Evita avisos em projetos sem prop-types
    },
  },
];