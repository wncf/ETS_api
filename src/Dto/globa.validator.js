const { parameterError } = require('../static/err.type')
const PagingValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      pageNum: {
        //当前第几页 1 2 3...
        type: 'number',
        required: false,
      },
      pageSize: {
        //显示数量 10
        type: 'number',
        required: false,
      },
      // 排序
      sortBy: {
        type: 'object',
        required: false,
      },
    })
  } catch (err) {
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
const DeleteArry = async (ctx, next) => {
  try {
    ctx.verifyParams({
      list: {
        type: 'array',
        itemType: 'number',
      },
      isPmenu: {
        type: 'boolean',
        required: false,
      },
    })
  } catch (err) {
    console.log(err)
    return ctx.app.emit('error', parameterError(err.errors), ctx)
  }
  await next()
}
module.exports = {
  PagingValidator,
  DeleteArry,
}
