import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  pluginJs.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.node },
    rules: {
      semi: 'warn',
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error'
    },
  },
];