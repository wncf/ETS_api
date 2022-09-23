const fs = require('fs')
const { PREFIX } = require('../config/config.default')
const Router = require('koa-router')
const router = new Router({
  prefix: PREFIX,
})
fs.readdirSync(__dirname).forEach((file) => {
  if (file != 'index.js') {
    let r = require('./' + file)
    router.use(r.routes())
  }
})

module.exports = router
