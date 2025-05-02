/* eslint-env node */
const eslint = require('@eslint/js');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tseslintParser = require('@typescript-eslint/parser');
const importPlugin = require('eslint-plugin-import');

module.exports = [
  eslint.configs.recommended,
  {
    files: ['apps/**/*.{js,ts}', 'libs/**/*.{js,ts}'],
    plugins: {
      '@typescript-eslint': tseslint,
      import: importPlugin,
    },
    languageOptions: {
      parser: tseslintParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        process: 'readonly',
      },
      env: { node: true },
    },
    rules: {
      // TypeScript 관련 규칙
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',

      // NestJS 관련 규칙
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/no-namespace': 'off',

      // Import 관련 규칙
      'import/no-extraneous-dependencies': 'off',
      'import/prefer-default-export': 'off',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
          pathGroups: [
            {
              pattern: '@nestjs/**',
              group: 'external',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          allowSeparatedGroups: true,
        },
      ],
    },
  },
];
