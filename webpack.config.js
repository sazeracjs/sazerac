'use strict';

var webpack = require('webpack')

var env = process.env.NODE_ENV

var config = {
  entry: './src/main.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, '/test/sazerac-v0.2.2.js/'],
        use: {loader: 'babel-loader'}
      }
    ],
  },
  output: {
    library: 'Sazerac',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [],
  mode: env === 'prod' ? 'production': 'development',
}

module.exports = config
