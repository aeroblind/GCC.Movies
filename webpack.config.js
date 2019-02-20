require('dotenv').config({path: __dirname + '/.env'});
const path = require("path");
const webpack = require("webpack");
const clearWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['./src/App'],
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: "bundle.js", //"bundle.[hash].js",
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
        ],
      },
    ],
  },
  resolve: { extensions: ['*', '.js', '.jsx'] },
  plugins: [
    new clearWebpackPlugin(['dist']),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/templates/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env' : {
        'apiKey': JSON.stringify(process.env.APIKEY),
      }
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    compress: true,
    port: 9000,
    contentBase: 'dist',
    historyApiFallback: true
  },
};