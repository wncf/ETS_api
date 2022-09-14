const bcrypt = require('bcryptjs')

const { getUserInfo } = require('../service/user.service')
const {
  userElearyExtedError,
  userRegisterError,
  userDoesNotExits,
  userLoginError,
  invalidePassword,
} = require('../static/err.type')
const { crpytPasswordUtil } = require('../utils/utils')
const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  try {
    const res = await getUserInfo({ user_name })
    if (res) {
      console.error('用户名已经存在', { user_name })
      ctx.app.emit('error', userElearyExtedError, ctx)
      return
    }
  } catch (err) {
    ctx.app.emit('error', userRegisterError, ctx)
  }
  await next()
}

const crpytPassword = async (ctx, next) => {
  const { password } = ctx.request.body

  const hash = crpytPasswordUtil(password)

  ctx.request.body.password = hash
  await next()
}

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  try {
    const res = await getUserInfo({ user_name })
    if (!res) {
      console.error('用户不存在', user_name)
      ctx.app.emit('error', userDoesNotExits, ctx)
      return
    }
    if (!bcrypt.compareSync(password, res.password)) {
      console.error('用户密码输入错误', user_name)
      ctx.app.emit('error', invalidePassword, ctx)
      return
    }
  } catch (err) {
    console.error(err)
    ctx.app.emit('error', userLoginError, ctx)
  }
  await next()
}
module.exports = {
  verifyUser,
  crpytPassword,
  verifyLogin,
}
