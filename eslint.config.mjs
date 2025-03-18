import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    languageOptions: {
      parser: tsparser,
      sourceType: 'module',
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    },
    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettierPlugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...prettierConfig.rules,
      '@typescript-eslint/ban-types': 'off',
    },
    ignores: ['dist/**/*', 'node_modules/**/*', 'local/**/*'],
  },
];
