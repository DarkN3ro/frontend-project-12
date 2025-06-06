import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import importPlugin from 'eslint-plugin-import'
import reactPlugin from 'eslint-plugin-react'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import globals from 'globals'

export default [
  {
    ignores: [
      'dist/**',
      '**/node_modules/**',
    ],
  },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'import': importPlugin,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      'react/prop-types': 'off',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      '@stylistic/indent': ['error', 2],
      '@stylistic/jsx-indent': ['error', 2],
      '@stylistic/semi': ['error', 'never'],
      '@stylistic/jsx-quotes': ['error', 'prefer-double'],
      '@stylistic/arrow-parens': ['error', 'as-needed', {
        requireForBlockBody: true,
      }],
      '@stylistic/brace-style': ['error', 'stroustrup', {
        allowSingleLine: false,
      }],

      'eol-last': ['error', 'always'],
      'no-unused-vars': ['warn', { varsIgnorePattern: '^[A-Z_]' }],
      'no-console': 'warn',
    },
  },
]
