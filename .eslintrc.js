module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'settings': {
    'import/resolver': {
      'babel-module': {}
    }
  },
  'env': {
    'jest': true,
  },
  "plugins": [
    "react-hooks"
  ],
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'object-curly-newline': 'off',
    'no-mixed-operators': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/static-property-placement': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'max-len': ['error', { 'code': 200, "ignorePattern": "^\\s*const\\s.+=\\s*\\(\\{\\s.+\\}\\)\\s.+>", "ignoreComments": true }],
    'arrow-parens': ["error", "always"],
    'no-unused-expressions': ['error', { 'allowShortCircuit': true, 'allowTernary': true }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  'globals': {
    'fetch': false,
    'window': false,
    'global': false,
    't': false
  }
}
