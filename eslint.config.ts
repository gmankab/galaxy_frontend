import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },

  react: true,
  typescript: true,
  formatters: true,

  ignores: [
    'package.json',
    'pnpm-lock.yaml',
    '.vscode/**/*.json',
  ],
}, {
  rules: {
    'jsx-quotes': ['error', 'prefer-single'],
    'style/jsx-quotes': ['error', 'prefer-single'],
    'prefer-template': 'off',
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'no-type-imports' }],
    'no-alert': 'off',
    'no-console': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'curly': ['error', 'all'],
    'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
    '@typescript-eslint/ban-types': ['error', { types: { '{}': false } }],
  },
});
