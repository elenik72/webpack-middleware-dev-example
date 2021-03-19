const path = require('path')
const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('./config')

const app = express()
const PORT = process.env.PORT || 8080

const registerMiddleware = async (compiler, publicPath) => {
  app.use(webpackDevMiddleware(compiler, { publicPath }))
  app.use(webpackHotMiddleware(compiler, { path: '/__webpack_hmr_' + webpackConfig.name}))
}

const registerRequest = async (html, outputFile) => {
  app.get('*', (_, res, next) => {
    outputFile.readFile(html, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
}

const {
  publicPath,
  path: outputPath
} = webpackConfig.output
const compilerWebpack = webpack(webpackConfig)
const html = path.join(outputPath, 'index.html')

registerMiddleware(compilerWebpack, publicPath)
registerRequest(html, compilerWebpack.outputFileSystem)

app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`)
  console.log('Press Ctrl+C to quit.')
})
