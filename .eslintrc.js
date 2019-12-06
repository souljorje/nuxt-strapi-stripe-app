module.exports = {
  root: true,
  extends: ['airbnb-base'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: [],
  env: {
    node: true,
  },
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'import/prefer-default-export': 'off',
  },
};
