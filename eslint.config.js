// eslint.config.js
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  ignores: ['dist'], // Ignore build folder
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended, // Base TypeScript rules
    ...tseslint.configs.recommendedTypeChecked, // Type-aware rules
    ...tseslint.configs.stylisticTypeChecked, // Optional stylistic rules
  ],
  files: ['**/*.{ts,tsx}'], // Lint only TypeScript files
  languageOptions: {
    ecmaVersion: 2020, // Set ECMAScript version
    globals: globals.browser, // Browser globals
    parserOptions: {
      project: ['./tsconfig.json'], // Path to your tsconfig
      tsconfigRootDir: import.meta.dirname, // Resolve tsconfig directory
    },
  },
  plugins: {
    react, // React rules
    'react-hooks': reactHooks, 
    'react-refresh': reactRefresh, 
  },
  settings: {
    react: { version: 'detect' }, 
  },
  rules: {    
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,

    // React Hooks rules
    ...reactHooks.configs.recommended.rules,

    // React Refresh rule
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Custom TypeScript rules
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

    // Example stylistic rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
    ],
  },
});
