const { userFomatError, userParameError, parameterError } = require('../static/err.type')
const userValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      user_name: {
        type: 'string',
        min: 1,
        max: 20,
        required: true,
      },
      password: {
        type: 'string',
        min: 1,
        max: 20,
        required: true,
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
const userPasswordValidator = async (ctx, next) => {
  const { password } = ctx.request.body
  if (!password) {
    ctx.app.emit('error', userParameError, ctx)
    return
  }
  await next()
}
module.exports = {
  userValidator,
  userPasswordValidator,
}
