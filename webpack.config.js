const webpack = require('webpack');
module.exports = {
  mode: 'development',
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