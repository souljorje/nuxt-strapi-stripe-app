module.exports = {
  extends: ['plugin:vue/recommended'],
  settings: {
    'import/resolver': {
      webpack: 'webpack.config.js',
    },
  },
  rules: {
    // 'vue/max-len': ["error", {

    // }],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e', // for e.returnvalue
          'ctx', // for nuxt context extending
          'config',
        ],
      },
    ],
    'no-shadow': [
      'error',
      {
        allow: ['state', 'getters'],
      },
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ],
    'import/no-extraneous-dependencies': 0,
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        // 'max-len': 'off',
        'max-len': [
          'error',
          100,
          2,
          {
            ignoreUrls: true,
            ignoreComments: false,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
          },
        ],
      },
    },
  ],
};
