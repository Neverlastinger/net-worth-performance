const { resolve } = require;
const { TEST_BUILD } = process.env;

module.exports = {
  presets: [
    resolve('metro-react-native-babel-preset')
  ],
  plugins: [
    resolve('babel-plugin-macros'),
    [resolve('babel-plugin-module-resolver'), {
      root: [ './src' ],
      alias: {
        '~': './src',
        config: (TEST_BUILD
          ? `./config.${TEST_BUILD}-build.js`
          : './config.json'
        )
      }
    }]
  ]
};
