const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');
const ROOT_PATH = path.resolve(__dirname, '../');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const config = require('../config');
// dev import dll to faster build

module.exports = merge(base, {
  mode: 'development',
  entry: [ROOT_PATH + '/src/index.js', 'webpack-hot-middleware/client?path=http://localhost:' + config.port + '/__webpack_hmr&timeout=20000'],
  devtool: '#source-map',
  output: {
    path: path.join(ROOT_PATH, '../public'),
    publicPath: config.assetsPublicPath,
    filename: '[name].js',
  },
  module: {
    rules: [
      // dev 环境不需要抽离 css。for 加快编译速度，以及 css 热更新
      {
        test: /\.less$/,
        use: [{
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'quick-start',
      template: './App/index.html',
      filename: 'index.html'
    }),
    new HtmlIncludeAssetsPlugin({
      assets: [`dll/dev/${require('../dll/dev/vendor-manifest.json').name}.js`],
      append: false //append vendor.js to html
    }),
    new webpack.DllReferencePlugin({
      context: ROOT_PATH,
      manifest: require('../dll/dev/vendor-manifest.json'),
      sourceType: 'var',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin({
      test: /\.(swig|html|png|jpe?g)$/
    }),
  ],
});