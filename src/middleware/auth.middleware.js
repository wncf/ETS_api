const jwt = require('jsonwebtoken')
const { tokenExpiredError, invalidToekn, SyntaxToken, hasNotAdminPermission } = require('../static/err.type')
const { JWT_SECRET } = require('../config/config.default')
const auth = async (ctx, next) => {
  try {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token过期', err)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', invalidToekn, ctx)
      case 'SyntaxError':
        console.error('token错误', err)
        return ctx.app.emit('error', SyntaxToken, ctx)
    }
  }
  await next()
}
const hadAdminPermission = async (ctx, next) => {
  const { is_admin } = ctx.state.user
  if (!is_admin) {
    console.error('该用户无管理员权限', ctx.state.user)
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }
  await next()
}
module.exports = {
  auth, hadAdminPermission
}