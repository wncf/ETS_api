const { parameterError } = require('../static/err.type')
const classifyValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      book_classify_name: {
        type: 'string',
        min: 1,
        max: 20,
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
const delClassifyListValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      list: {
        type: 'array',
        itemType: 'number',
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
module.exports = {
  classifyValidator,
  delClassifyListValidator,
}
