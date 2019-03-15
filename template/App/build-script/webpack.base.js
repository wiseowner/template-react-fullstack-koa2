
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('../config');
const ROOT_PATH = path.resolve(__dirname, '../');

module.exports = {
  entry: ['./App/src/index.js'],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /(\.css$)/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif|jpeg|woff|eot|ttf|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'static/[name].[hash].[ext]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
  ],
};
