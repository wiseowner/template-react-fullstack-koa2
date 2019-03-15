const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('../config');
const ROOT_PATH = path.resolve(__dirname, '../');

// production 环境看情况使用 dll，dll 存在一个问题：dll 预先把不常改变的包，提前编译打包，但是对于按需加载的，比如 antd 可能只用到了几个组件，使用 dll 就会全部打入，不过 react 这样可以使用。
module.exports = merge(base, {
  mode: 'development',
  devtool: false,
  output: {
    // 输出到根目录下的 public
    path: path.join(ROOT_PATH, '../public'),
    publicPath: config.assetsPublicPath,
    filename: 'js/[name].[chunkhash].js',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true,
              },
            },
          ],
        }),
      },
    ],
  },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        }
      })
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].[md5:contenthash:hex:20].css'
    }),
    // production cp 到 js 目录下
    new CopyWebpackPlugin([
      {
        from: './App/dll/pro',
        to: 'js',
      },
    ]),
    new HtmlWebpackPlugin({
      title: 'quick-start',
      template: './App/index.html',
    }),
    // 生成的 html 引入 dll
    new HtmlIncludeAssetsPlugin({
      assets: [`js/${require('../dll/pro/vendor-manifest.json').name}.js`],
      append: false,
    }),
    new webpack.DllReferencePlugin({
      context: ROOT_PATH,
      manifest: require(ROOT_PATH + '/dll/pro/vendor-manifest.json'),
      sourceType: 'var',
    }),
  ],
});
