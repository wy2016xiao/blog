module.exports = {
  parser: 'babel-eslint',
  // extends: ['plugin:react/recommended'],
  plugins: ['react'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  globals: {
    setHtmlTitle: 'readonly',
    getPar: 'readonly',
    isMobile: 'readonly',
    wgoo: 'readonly',
    appShare: 'readonly',
    ajaxFnExt: 'readonly',
    wx: 'readonly',
    _wx: 'readonly',
    SaveDataToApp: 'readonly',
    motify: 'readonly',
    $: 'readonly',
  },
  rules: {
    'no-dupe-args': 'error',
    'no-dupe-keys': 'error',
    'no-duplicate-case': 'error',
    'no-unreachable': 'warn',
    eqeqeq: 'warn',
    'no-redeclare': 'error',
    'require-await': 'warn',
    'no-shadow': 'warn',
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    'no-use-before-define': 'warn',
    'no-const-assign': 'error',
    'no-dupe-class-members': 'error',
    'no-duplicate-imports': 'warn',
    'prefer-const': 'warn',

    // https://github.com/jsx-eslint/eslint-plugin-react
    'react/jsx-no-undef': [1, { allowGlobals: true }],
    'react/default-props-match-prop-types': [1, { allowRequiredDefaults: false }],
    'react/no-direct-mutation-state': 1,
    'react/no-unescaped-entities': 1,
    'react/no-unused-prop-types': 1,
    'react/no-unused-state': 1,
    'react/jsx-uses-vars': 1,
    'react/void-dom-elements-no-children': 2,
    'react/jsx-key': 2,
    'react/jsx-no-duplicate-props': 2,
    'react/jsx-pascal-case': 2
  }
};
