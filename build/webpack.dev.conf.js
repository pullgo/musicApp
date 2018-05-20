'use strict'
const utils = require('./utils')
const merge = require('webpack-merge')//合并配置文件
const baseWebpackConfig = require('./webpack.base.conf')//开发时候的配置文件和运行的的配置文件共享
const HtmlWebpackPlugin = require('html-webpack-plugin')//webpack提供操作html插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
//检查node和npm的版本
require('./check-versions')()

//*获取config/index.js中的默认配置，config后面没有配置项会自动找index.js
const config = require('../config')

//如果Node环境无法判断是dev还是product环境则使用config.dev.env.NODE_ENV作为当前执行环境
//if (!process.env.NOOE_ENV) {
//  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
//}
//一个可以强制打开浏览器并跳转到指定url的插件
const opn = require('opn')

//使用Node自带的文件路径工具
const path = require('path')
const express = require('express')
const webpack = require('webpack')

//http-proxy-middleware 单线程node.js代理中间件，用于连接，快速和浏览器同步
const proxyMiddleware = require('http-proxy-middleware')

const webpackConfig = require('./webpack.dev.conf')
const axios = require('axios')

const port = process.env.PORT || config.dev.port

const autoOpenBrowser = !!config.dev.autoOpenBrowser

const proxyTable = config.dev.proxyTable

const app = express()

const apiRoutes = express.Router()//apiRoutes不是apiRouters

apiRoutes.get('/getDiscList', function (req, res) {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.xcom/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('api', apiRoutes)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },//
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,//调试

  // these devServer options should be customized in /config/index.js
  devServer: {
    inline:true,
    port: 8001,
    clientLogLevel: 'warning',
    historyApiFallback: true,
    hot: true,
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')//将源码中的process.env替换为../config/dev.env
    }),
    new webpack.HotModuleReplacementPlugin(),//热加载插件
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({//通过filename指定编译后生成文件名 最终输出的文件与打包之前的文件同名
      filename: 'index.html',
      template: 'index.html',//指定处理的模板
      inject: true//打包后的文件添加到到HTML里面 比如HTML--body css- header里面
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))
      resolve(devWebpackConfig)
    }
  })
})
