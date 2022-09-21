const { parameterError } = require('../static/err.type')
const MenuCreateValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      menu_name: {
        type: 'string',
      },
      menu_url: {
        type: 'string',
      },
      menu_icon: {
        type: 'string',
      },
      pid: {
        type: 'number',
        required: false,
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
const MenuUpdateValidator = async ({ ctx, nextF }) => {
  try {
    ctx.verifyParams({
      mid: {
        type: 'number',
      },
      menu_name: {
        type: 'string',
      },
      menu_url: {
        type: 'string',
      },
      menu_icon: {
        type: 'string',
      },
      pid: {
        type: 'number',
        required: false,
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
module.exports = {
  MenuCreateValidator,
  MenuUpdateValidator,
}
