import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  // 1. Target all files
  { files: ['**/*.{js,mjs,cjs,ts}'] },

  // 2. Set environment (Browser/Node)
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },

  // 3. Use Recommended Configs
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,

  // 4. Custom Rules
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'prettier/prettier': 'error',
    },
  },
];
