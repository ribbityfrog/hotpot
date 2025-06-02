// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

import stylistic from '@stylistic/eslint-plugin'

export default withNuxt(
    {
        plugins: {
            '@stylistic': stylistic,
        },
        rules: {
            'quotes': ['warn', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
            'semi': ['warn', 'never'],
            'indent': ['warn', 4],

            '@stylistic/object-curly-newline': ['warn', {
                'multiline': true,
                'consistent': true
            }],
            '@stylistic/object-curly-spacing': ['warn', 'always'],
            '@stylistic/object-property-newline': ['warn', {
                'allowAllPropertiesOnSameLine': true,
            }],
            '@stylistic/no-multi-spaces': 'warn',

            'vue/html-indent': ['warn', 4],
            'vue/no-multi-spaces': 'warn',

            'vue/object-curly-newline': ['warn', {
                'multiline': true,
                'consistent': true
            }],
            'vue/object-curly-spacing': ['warn', 'always'],
            'vue/object-property-newline': ['warn', {
                'allowAllPropertiesOnSameLine': true,
            }],

            'vue/max-attributes-per-line': ['warn', {
                'singleline': {
                    'max': 4
                }
            }],

            'vue/multi-word-component-names': 'off',

            'eol-last': ['warn', 'always'],
            '@typescript-eslint/no-explicit-any': 'off',

            'vue/no-parsing-error': ['error', {
                'end-tag-with-attributes': false
            }],
        }
    }
)
