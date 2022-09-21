const SeqErrorType = require('../static/seq.err.type')
// 全局异常错误处理
const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    if (error.parent && error.parent.code) {
      return (ctx.body = new SeqErrorType(error.parent.code))
    }
    if (error) {
      console.log(error)
    }
  }
}
module.exports = catchError
