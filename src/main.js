const app = require('./app')
const { APP_PORT } = require('./config/config.default')

app.listen(APP_PORT, () => {
  console.log(`服务器启动在   http://127.0.0.1:${APP_PORT}`)
})
