const { parameterError } = require('../static/err.type')
const PublicBooksCreate_dto = async (ctx, next) => {
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
      classify: {
        type: 'number',
        required: false,
        min: 1,
        max: 64,
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
const PublicBooksCreateS_dto = async (ctx, next) => {
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
          },
          book_url: {
            type: 'string',
            min: 1,
            max: 64,
          },
          classify: {
            required: false,
            type: 'number',
            min: 1,
            max: 64,
          },
        },
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
module.exports = {
  PublicBooksCreate_dto,
  PublicBooksCreateS_dto,
}
