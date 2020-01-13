const webpack = require('webpack');
const minimist = require('minimist');

const envOption = {
  string: 'env',
  default: { env: process.env.NODE_ENV || 'development' } // NODE_ENVに指定がなければ開発モードをデフォルトにする
};
const options = minimist(process.argv.slice(2), envOption);
const isProduction = (options.env === 'production') ? true : false;

module.exports = {
  mode: options.env,
  entry: {
    'js/main': './src/js/main.js'
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ]
};