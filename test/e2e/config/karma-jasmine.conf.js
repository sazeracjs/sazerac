module.exports = function(config) {
  config.set({
    basePath: '../../../',
    frameworks: ['jasmine'],
    files: [
      'test/e2e/spec/*.js'
    ],
    preprocessors: {
      'test/e2e/spec/*.js': ['webpack']
    },
    webpack: {
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: [/node_modules/],
            use: {loader: 'babel-loader'}
          }
        ],
      },
      watch: true,
      resolve: {
        alias: {
          'sazerac': '../../../src/main'
        }
      },
      mode: 'production'
    },
    webpackServer: {
      noInfo: true
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
    concurrency: Infinity
  })
}
