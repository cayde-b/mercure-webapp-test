import eslintPluginVue from 'eslint-plugin-vue';

export default [
    ...eslintPluginVue.configs['flat/recommended'],
    {
        languageOptions: {
            parserOptions: { ecmaVersion: 2020 },
        },
        ignores: [],
        rules: {
            'no-console': 'warn',
            'no-trailing-spaces': 'error',
            'no-multi-spaces': 'error',
            'block-spacing': 'error',
            'comma-spacing': 'error',
            'indent': ['error', 2, { SwitchCase: 1 }],
            'no-multiple-empty-lines': ['error', {
                max: 1,
            }],
            'quotes': ['error', 'single'],
            'spaced-comment': 'error',
            'arrow-spacing': 'error',
            'no-var': 'error',
            'no-undef-init': 'error',
            'key-spacing': 'error',
            'vue/no-v-html': 'off',
            'space-before-function-paren': ['error', {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            }],
            'comma-dangle': ['error', 'always-multiline'],
            'semi': ['error', 'always'],
            'no-unused-vars': 'error',
            'object-curly-spacing': ['error', 'always'],
            'eol-last': 1,
            // 'import/no-cycle': 2,
            'keyword-spacing': 'error',
            'vue/no-multiple-template-root': 0,
        },
    },
];
