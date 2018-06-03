'use strict';

var webpack = require('webpack')

var env = process.env.NODE_ENV

var config = {
  entry: './src/main.js',
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: [/node_modules/, `/test/sazerac-v0.2.2.js/`] }
    ]
  },
  output: {
    library: 'Sazerac',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: []
}

if (env === 'prod') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  )
}

module.exports = config
