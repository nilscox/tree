/* eslint-disable */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { HOST = '0.0.0.0', PORT = '8000' } = process.env;

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
        test: /\.[jt]?$/,
        loader: 'esbuild-loader',
      },
    ],
  },

  plugins: [new HtmlWebpackPlugin()],

  devServer: {
    host: HOST,
    port: Number(PORT),
    hot: true,
  },
};
