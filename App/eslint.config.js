// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      'quotes': ['error', 'single'], // Força o uso de aspas simples
      'semi': ['error', 'always'], // Exige ponto e vírgula
      'comma-dangle': ['error', 'always-multiline'], // Vírgula no final de objetos/matrizes
      'no-unused-vars': ['warn'], // Aviso para variáveis não utilizadas
      'react/jsx-indent': ['error', 2], // Indentação de 2 espaços em JSX
    },
  },
]);
