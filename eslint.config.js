import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', '.bun'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      // Usamos el spread syntax si el plugin lo soporta
      prettier, // Desactiva reglas de formato de ESLint conflictivas
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
      'jsx-a11y': jsxA11y,
      react,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Reglas de React (Runtime)
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/prop-types': 'off', // No necesario con TypeScript

      // Accesibilidad (Obligatorio)
      ...jsxA11y.configs.recommended.rules,

      // Orden automático de imports
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',

      // Type-Safety extra
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // Buenas prácticas generales
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Permite warn y error, avisa en logs

      'padding-line-between-statements': [
        'error',
        // 1. Línea vacía obligatoria DESPUÉS de los imports
        { blankLine: 'always', prev: 'import', next: '*' },
        { blankLine: 'any', prev: 'import', next: 'import' }, // Entre imports da igual

        // 2. Línea vacía obligatoria ANTES de un export
        { blankLine: 'always', prev: '*', next: 'export' },

        // 3. Línea vacía obligatoria ANTES de un return
        { blankLine: 'always', prev: '*', next: 'return' },

        // 4. Línea vacía obligatoria ANTES de declarar variables (const/let)
        // si lo anterior no era otra variable (separa lógica de declaración)
        { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },

        // 5. Línea vacía ANTES de bloques lógicos (if, try, while)
        {
          blankLine: 'always',
          prev: '*',
          next: ['if', 'try', 'for', 'while', 'switch'],
        },
      ],
    },
    settings: {
      react: { version: 'detect' },
    },
  }
);
