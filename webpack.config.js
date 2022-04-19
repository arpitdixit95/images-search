const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
require('dotenv').config({
  path: '.env',
});
const webpackConfig = {
  entry: {
    app: path.join(__dirname, "src", "app", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    chunkFilename: '[name]-[chunkhash].chunk.js',
    filename: '[name]-bundle.js',
  },
  module: {
    rules: [{
      test: /\.?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]]
        }
      }
    },{
      test: /\.(scss|css)$/i,
      use: ["style-loader", "css-loader", "sass-loader"]
    },{
      test: /\.(png|jp(e*)g|svg|gif)$/,
      use: ['file-loader'],
    },],
  },
  resolve: {
    alias:{
      '~': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html")
    }),
    new Dotenv(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 200000
    },
  },
}
module.exports = webpackConfig;