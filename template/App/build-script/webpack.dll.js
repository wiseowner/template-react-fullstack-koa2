const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ROOT_PATH = path.resolve(__dirname, '../');
const isProd = process.env.NODE_ENV === 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const publicPath = isProd ? path.join(ROOT_PATH, 'dll/pro') : path.join(ROOT_PATH, 'dll/dev');
const dllName = isProd ? '[name].[chunkhash]' : '[name]';
const dllFileName = isProd ? '[name].[chunkhash]' : '[name]';

const plugins = [
  new webpack.DllPlugin({
    path: path.join(publicPath, '[name]-manifest.json'),
    name: dllName,
  }),
  new ExtractTextPlugin(dllFileName + '.css'),
];

const webpackConfig = {
  mode: 'development',
  entry: {
    vendor: [
      'react',
      'react-dom',
    ],
  },
  output: {
    filename: dllFileName + '.js',
    path: publicPath,
    library: '[name]',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        use: [{
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ],
      }),
    }, ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins,
};

if (isProd) {
  webpackConfig.optimization = {
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
  }
  webpackConfig.mode = 'production';
}

module.exports = webpackConfig;