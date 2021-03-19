const plugins = require('./plugins')
const presets = require('./presets')

module.exports = {
  name: 'webpack-middleware-app',
  target: 'web',
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr_webpack-middleware-app',
    './src/app.js'
  ],
  output: {
    filename: '[name]-[chunkhash].js',
    publicPath: '/',
    path: '/'
  },
  devtool: 'eval-source-map',
  module: {
    rules: [
      presets.styles.css,
      presets.js
    ]
  },
  plugins: [
    ...plugins.html,
    ...plugins.reload
  ],
  resolve: {
    extensions: ['.js']
  },
  stats: {
    builtAt: false,
    children: false,
    modules: false,
    colors: {
      green: '\u001b[34;1m'
    }
  }
}
