module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-hooks'],
  rules: {
    'react/react-in-jsx-scope': 'off', // Não precisa importar React em todo arquivo com Expo/React 17+
    'react/prop-types': 'off', // Desligado, pois usamos TypeScript para tipos
    '@typescript-eslint/no-explicit-any': 'warn', // Avisa sobre o uso de 'any'
    '@typescript-eslint/no-var-requires': 'off', // Permite usar 'require()' para imagens
    'react/display-name': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    node: true,
  },
};