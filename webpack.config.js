/* eslint-disable no-unused-vars */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // specify current mode to NODE_ENV var defined in package.json
  // This variable assignment allows us to switch between development and production modes
  mode: process.env.NODE_ENV,
  // where we want our bundle to run
  entry: './client/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      // letsgooooo it was this right?
      title: 'Development',
      template: './client/index.html',
    }),
  ],
  // specify where to build bundle.js
  output: {
    path: path.join(__dirname, './build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  devServer: {
    // enable HMR on the devServer
    hot: true,
    static: {
      // match the output path
      directory: path.resolve(__dirname, './'),
      // match the output 'publicPath'
      publicPath: '/',
    },
    proxy: { '/tasks': 'http://localhost:3000/' },
  },
  module: {
    rules: [
      // rule for loading JSX
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
          // plugins: [
          // '@babel/plugin-transform-runtime',
          // '@babel/transform-async-to-generator',
          // ]
        },
      },
      // rule for loading SCSS
      {
        test: /scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
