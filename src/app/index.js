const koa = require('koa')
const koaBody = require('koa-body')
const koaStatic = require('koa-static')
const path = require('path')
const koaParameter = require('koa-parameter')

const app = new koa()
const ErrorRoutes = require('../static/error.router')
const errorHandler = require('./errorHandler')
const router = require('../router/index')
const { MODE, HTTP_server_host } = require('../config/config.default') // Current mode

app.use((ctx, next) => {
  if (ctx.request.header.host.split(':')[0] === 'localhost' || ctx.request.header.host.split(':')[0] === '127.0.0.1') {
    ctx.set('Access-Control-Allow-Origin', '*')
  } else {
    ctx.set('Access-Control-Allow-Origin', HTTP_server_host)
  }
  ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Credentials', true) // 允许带上 cookie
  return next()
})
// logger
if (MODE === 'dev') {
  app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
  })
}
app.use(
  koaBody({
    multipart: true,
    parsedMethods: ['POST', 'PUT','PATCH','DELETE'],
  })
)
app.use(koaStatic(path.join(__dirname + '../../../public')))
// logger
if (MODE === 'dev') {
  app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - 耗时[${ms}]ms`)
  })
}
app.use(koaParameter(app))
app.use(router.routes()) //添加router目录下所有路由
app.use(router.allowedMethods())
app.use(ErrorRoutes())
app.on('error', errorHandler)
module.exports = app
