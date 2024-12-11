import { fileURLToPath } from 'url';
import path from 'path';

import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config({
  ignores: ['dist', 'tailwind.config.js'], // Ignore non-TS files
  extends: [
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
  ],
  files: ['src/**/*.ts', 'src/**/*.tsx'], 
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      project: [
        path.resolve(__dirname, './tsconfig.app.json'),
        path.resolve(__dirname, './tsconfig.node.json')
      ],
      tsconfigRootDir: __dirname,
    },
  },
  plugins: {
    react,
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  settings: {
    react: { version: 'detect' },
  },
  rules: {    
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
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
