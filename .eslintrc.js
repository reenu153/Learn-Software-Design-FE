module.exports = {
   env: {
      browser: true,
      es2021: true,
      node: true,
   },
   extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:storybook/recommended',
   ],
   settings: {
      'import/resolver': {
         node: {
            paths: ['.'],
            extensions: ['.js', '.jsx'],
         },
      },
      react: {
         version: 'detect',
      },
   },
   overrides: [
      {
         env: {
            node: true,
         },
         files: ['.eslintrc.{js,cjs,jsx}'],
         parserOptions: {
            sourceType: 'script',
         },
      },
   ],
   parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
   },
   plugins: ['react', 'import'],
   rules: {
      'no-unused-vars': 'warn',
      'react/prop-types': 'off',
      'no-undef': 'error',
   },
}
