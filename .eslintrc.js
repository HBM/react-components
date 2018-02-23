
module.exports = {
  // use babel as parser to use ES6 syntax like fat arrow functions
  parser: 'babel-eslint',
  // prevent error messages about React being defined but not used
  plugins: [
    'react',
    'flowtype'
  ],
  // make sure `window`, `setTimeout`, etc. is defined
  env: {
    'browser': true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:flowtype/recommended'
  ],
  rules: {
    // '...' is missing in props validation
    'react/prop-types': 0,
    // Using this.refs is deprecated
    'react/no-string-refs': 0
  }
}
