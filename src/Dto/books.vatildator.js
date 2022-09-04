const { parameterError } = require('../static/err.type')
const BooksCreateValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      book_name: {
        type: 'string',
        min: 1,
        max: 20,
        required: true,
      },
      book_url: {
        type: 'string',
        min: 1,
        max: 64,
        required: true,
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
const BooksCreateSValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      list: {
        type: 'array',
        required: true,
        itemType: 'object',
        rule: {
          book_name: {
            type: 'string',
            min: 1,
            max: 20,
            required: true,
          },
          book_url: {
            type: 'string',
            min: 1,
            max: 64,
            required: true,
          },
        },
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
const BooksDeleteValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      list: {
        type: 'array',
        required: true,
        itemType: 'number',
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
module.exports = {
  BooksCreateValidator,
  BooksCreateSValidator,
  BooksDeleteValidator,
}
