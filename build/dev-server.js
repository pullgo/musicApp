//检查node和npm的版本
require('./check-versions')()

//*获取config/index.js中的默认配置，config后面没有配置项会自动找index.js
var config = require('../config')

//如果Node环境无法判断是dev还是product环境则使用config.dev.env.NODE_ENV作为当前执行环境
if (!process.env.NOOE_ENV) {
  process.env.NOOE_ENV = JSON.parse(config.dev.env.NOOE_ENV)
}
//一个可以强制打开浏览器并跳转到指定url的插件
var opn = require('opn')

//使用Node自带的文件路径工具
var path = require('path')
var express = require('express')
var webpack = require('webpack')

//http-proxy-middleware 单线程node.js代理中间件，用于连接，快速和浏览器同步
var proxyMiddleware = require('http-proxy-middleware')

var webpackConfig = require('./webpack.dev.conf')
var axios = require('axios')

var port = process.env.PORT || config.dev.port

var autoOpenBrowser = !!config.dev.autoOpenBrowser

var proxyTable = config.dev.proxyTable

var app = express()

var apiRoutes = express.Router()//apiRoutes不是apiRouters

apiRoutes.get('/getDiscList', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
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