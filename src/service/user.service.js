const { User } = require('../model/index')
class userService {
  async createUser(user_name, password) {
    const salt = Math.round(Math.random() * 100000)
    const res = await User.create({ salt, user_name, password })
    return res.dataValues
  }
  async getUserInfo({ id, user_name, password, is_admin }) {
    const whereObj = {}
    id && Object.assign(whereObj, { id })
    user_name && Object.assign(whereObj, { user_name })
    password && Object.assign(whereObj, { password })
    is_admin && Object.assign(whereObj, { is_admin })
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin', 'avatarUrl'],
      where: whereObj,
    })
    return res ? res.dataValues : false
  }
  async updateById({ id, user_name, password, is_admin, avatarUrl }) {
    try {
      const whereOpt = { id }
      const newUser = {}
      user_name && Object.assign(newUser, { user_name })
      password && Object.assign(newUser, { password })
      is_admin && Object.assign(newUser, { is_admin })
      avatarUrl && Object.assign(newUser, { avatarUrl })
      const res = await User.update(newUser, {
        where: whereOpt,
      })
      return res[0] > 0 ? true : false
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = new userService()
