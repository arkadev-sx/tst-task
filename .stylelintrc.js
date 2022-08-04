module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-stylus',
    'stylelint-config-prettier',
  ],
  plugins: ['stylelint-order'],
  ignoreFiles: ['node_modules/**', 'src/assets/fonts/**', 'src/assets/styles/normalize.css', 'src/assets/styles/constants.css'],
  overrides: [{
    files: ['*.vue', '**/*.vue'],
    customSyntax: 'postcss-html',
  }, ],
  rules: {
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['extends', 'ignores', 'include', 'mixin', 'if', 'else', 'media', 'for']
      },
    ],
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': ['width', 'height'],
  },
}
