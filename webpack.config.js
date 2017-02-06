'use strict';

var webpack = require('webpack')

var env = process.env.NODE_ENV

var config = {
  entry: './src/main.js',
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'Sazerac',
    libraryTarget: 'umd'
  },
  plugins: []
}

if (env === 'prod') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config
