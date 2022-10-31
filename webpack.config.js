/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { HOST = '0.0.0.0', PORT = '8000' } = process.env;

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  devtool: 'source-map',

  entry: './src/index.ts',

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ],

  devServer: {
    host: HOST,
    port: Number(PORT),
    hot: true,
    static: './public',
  },
};
