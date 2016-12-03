const webpack = require('webpack');
const path = require('path');

const config = {
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/dist/',
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
};

if (process.env.NODE_ENV === 'production') {
  console.log('PRODUCTION BUILD');

  config.devtool = 'cheap-module-source-map';

  config.entry = path.resolve('src/index.tsx');

  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ];
} else {
  console.log('DEVELOPMENT BUILD');

  config.devtool = 'eval';

  config.entry = [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.resolve('src/index.tsx'),
  ];

  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ];
}


module.exports = config;
