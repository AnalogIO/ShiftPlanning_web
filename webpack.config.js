const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.resolve('src/index.tsx'),
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/assets/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: [path.resolve('src'), path.resolve('node_modules')],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
