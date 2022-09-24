const jwt = require('jsonwebtoken')
const path = require('path')

const { createUser, getUserInfo, updateById } = require('../service/user.service')
const { userRegisterError, updatePasswordError, uploadImageExtensionError } = require('../static/err.type')
const { JWT_SECRET } = require('../config/config.default')

class UserController {
  async register(ctx, next) {
    const { user_name, password } = ctx.request.body
    try {
      const { id, avatarUrl, is_admin, ...res } = await createUser(user_name, password)
      ctx.body = {
        code: 200,
        message: '注册成功',
        result: {
          id,
          user_name: res.user_name,
          avatarUrl,
          is_admin,
        },
        success: true,
      }
    } catch (err) {
      console.log(err)
      ctx.app.emit('error', userRegisterError, ctx)
    }
  }
  async login(ctx, next) {
    try {
      const { user_name } = ctx.request.body
      const { password, avatarUrl, ...res } = await getUserInfo({ user_name })
      ctx.body = {
        code: 200,
        message: '登录成功',
        success: true,
        result: {
          avatarUrl,
          userId: res.id,
          isAdmin: res.is_admin,
          token: jwt.sign(res, JWT_SECRET, {
            expiresIn: '1d',
          }),
        },
      }
    } catch (err) {
      console.error('登录失败', err)
    }
  }
  async changePassword(ctx, next) {
    const id = ctx.state.user.id
    const { password } = ctx.request.body
    const res = await updateById({ id, password })
    if (res) {
      ctx.body = {
        code: 0,
        message: '修改密码成功',
        success: true,
      }
    } else {
      ctx.body = updatePasswordError
    }
  }
  async changeAvatar(ctx, next) {
    console.log(ctx.request.files.file.mimetype)
    const { filepath, mimetype } = ctx.request.files.file
    const { id } = ctx.state.user
    const whiteList = ['image/jpeg', 'image/png']
    const fileName = '/user_uploads/' + path.basename(filepath)
    if (!mimetype.includes(whiteList)) {
      ctx.app.emit('error', uploadImageExtensionError, ctx)
    }
    const res = await updateById({ id, avatarUrl: fileName })
    if (res) {
      ctx.body = {
        message: '头像修改成功',
        success: true,
      }
    } else {
      ctx.body = {
        message: '头像修改失败',
        success: false,
      }
    }
  }
  async getUser(ctx, next) {
    const { id } = ctx.state.user
    const { password, ...res } = await getUserInfo({ id })
    ctx.body = {
      res,
    }
  }
}

module.exports = new UserController()
