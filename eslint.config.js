import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';

export default [
  js.configs.recommended,
  {
    files: [ '**/*.{js,jsx,ts,tsx}' ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tsParser,
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        HTMLElement: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly'
      }
    },
    plugins: {
      react: reactPlugin,
      '@typescript-eslint': tsPlugin,
      import: importPlugin
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [ 'error', { argsIgnorePattern: '^_' } ],

      'import/no-unresolved': 'error',
      'import/no-named-as-default': 'error',

      'no-console': [ 'error', { allow: [ 'warn', 'error' ] } ],
      'array-bracket-spacing': [ 'error', 'always' ],
      'object-curly-spacing': [ 'error', 'always' ],
      'no-trailing-spaces': 'error',
      semi: [ 'error', 'always' ],
      indent: [ 'error', 2, { SwitchCase: 1 } ],
      quotes: [ 'error', 'single', { avoidEscape: true } ],
      'no-unexpected-multiline': 'error',
      'no-extra-semi': 'error',
      'comma-dangle': [ 'error', 'never' ],
      'no-empty': 'error',
      'import/order': [ 'error', { alphabetize: { order: 'asc' } } ],
      'import/first': 'error',
      'space-infix-ops': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {}
      }
    }
  },
  {
    ignores: [ 'node_modules', 'dist/**', 'vite.config.ts' ]
  }
];
