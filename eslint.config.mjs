import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';
import pluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  { languageOptions: { globals: globals.jest } },
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.node } },
  {
    ...pluginPrettierRecommended,
    files: ['**/*.{js,mjs,cjs}'],
    rules: { 'prettier/prettier': ['error'] },
  },
]);
