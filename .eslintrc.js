module.exports = {
  root: true,
  extends: 'airbnb-base',
  env: {
    browser: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    requireConfigFile: false,
  },
  rules: {
    'import/extensions': ['error', { js: 'always' }], // require js file extensions in imports
    'linebreak-style': 'off', // enforce unix linebreaks
    'no-param-reassign': [2, { props: false }], // allow modifying properties of param
    'comma-spacing' : 'off',
    'indent' : 'off',
    'eol-last' : 'off',
    'no-trailing-spaces' : 'off',
    'object-curly-newline' : 'off',
    'space-infix-ops' : 'off',
    'keyword-spacing' : 'off',
    'padded-blocks' : 'off',
    'spaced-comment' : 'off',
    'no-multiple-empty-lines' : 'off',
    'space-before-blocks' : 'off',
    'arrow-parens' : 'off',
    'comma-dangle' : 'off',
    'no-multiple-empty-lines' : 'off',
    'no-inner-declarations' : 'off',
    'brace-style' : 'off',
    'no-undef' : 'off',
    'prefer-const' : 'off',
    'no-shadow' : 'off',
    'semi' : 'off',
    'eqeqeq' : 'off',
    'operator-linebreak' : 'off',
    'key-spacing' : 'off',
    'quote-props' : 'off',
    'no-plusplus' : 'off',
    'no-dupe-keys' : 'off',
    'no-console' : 'off',
    'quotes' : 'off',
  },
};
