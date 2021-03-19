module.exports = {
  test: /\.js$/,
  include: '/src',
  exclude: /(node_modules)/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    }
  }
}
