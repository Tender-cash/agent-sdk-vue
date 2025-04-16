const { resolve } = require('node:path');

const dir =  __dirname
const cwd = process.cwd()

const project_dir = cwd.endsWith(dir) ? process.cwd() : `${dir}`
const project = resolve(project_dir, 'tsconfig.json')

module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'prettier',
    ],
    parserOptions: {
        ecmaVersion: 2021,
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'vue'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/no-unused-components': 'warn',
        'vue/no-unused-vars': 'warn',
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
    settings: {
        react: {
            version: "detect",
        },
        "import/resolver": {
            node: {
                extensions: [".js", ".ts", ".tsx"],
            },
        },
    },
    ignorePatterns: ["**/*.scss"],
};
