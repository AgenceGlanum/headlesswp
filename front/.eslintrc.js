module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: ['react', 'prettier', 'unused-imports', 'simple-import-sort'],
    rules: {
        'object-shorthand': 0,
        'space-before-function-paren': 'off',
        'comma-dangle': ['error', 'only-multiline'],
        'generator-star-spacing': ['error', { before: false, after: true }],
        'unused-imports/no-unused-imports': 'warn',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'no-console': 'warn',
        'operator-linebreak': ['error', 'before'],
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': 'off',
        'react/prop-types': 'off',
        'react/require-default-props': 'off',
        'react/jsx-props-no-spreading': 'off',
        'array-element-newline': [
            'error',
            {
                ArrayExpression: 'consistent',
                ArrayPattern: { minItems: 3 }
            }
        ]
    }
}
