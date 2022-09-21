const { parameterError } = require('../static/err.type')
const Diyvalidator = (rules) => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (err) {
      return ctx.app.emit('error', parameterError(err.errors), ctx)
    }
    await next()
  }
}
module.exports = {
  Diyvalidator,
}
