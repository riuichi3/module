const webpack = require('webpack');
const path = require('path');
module.exports = {
  // モード値を production に設定すると最適化された状態で、
  // development に設定するとソースマップ有効でJSファイルが出力される
  mode: "production",

  // メインのJS
  entry: {
    'common/js/main':'./_src/common/js/main',
    'youtubeIframeApi/js/youtube':'./_src/youtubeIframeApi/js/youtube',
    'scrollaction/js/function':'./_src/scrollaction/js/function',
    'wave/js/function':'./_src/wave/js/function',
    'roll/js/function':'./_src/roll/js/function'
  },
  // 出力ファイル
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '_dist/templatesite/'),
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.es'],
  }
}