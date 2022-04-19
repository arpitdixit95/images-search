const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const isEnvProduction = process.env.NODE_ENV == 'production';
require('dotenv').config({
  path: '.env',
});

const plugins = [
  new HtmlWebpackPlugin({
    PUBLIC_URL: process.env.PUBLIC_URL,
    template: path.join(__dirname, "src", "index.html")
  }),
  new Dotenv(),
];
if(isEnvProduction){
  plugins.push(new WorkboxWebpackPlugin.InjectManifest({
    swSrc: path.join(__dirname, "src", "service-worker"),
    dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
    exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
    // Bump up the default maximum size (2mb) that's precached,
    // to make lazy-loading failure scenarios less likely.
    // See https://github.com/cra-template/pwa/issues/13#issuecomment-722667270
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
  }))
}

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
          presets: ['@babel/preset-env', ['@babel/preset-react', {"runtime": "automatic"}]],
          plugins: ["@babel/transform-runtime"]
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
  plugins,
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxSize: 200000
    },
  },
}
module.exports = webpackConfig;