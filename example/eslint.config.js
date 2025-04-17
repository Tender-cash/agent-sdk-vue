import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist'] },

  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.node },
    rules: js.configs.recommended.rules,
  },

  {
    files: ['**/*.{ts,tsx}'],
    extends: [...tseslint.configs.recommended],
    languageOptions: {
      parserOptions: { project: ['./tsconfig.app.json'] },
    },
  },

  {
    files: ['**/*.vue'],
    extends: [
      'plugin:vue/vue3-essential',
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        project: ['./tsconfig.app.json'],
        extraFileExtensions: ['.vue'],
      },
      globals: globals.browser,
    },
    rules: {
      // Add any specific Vue rules here
    },
  },
)
