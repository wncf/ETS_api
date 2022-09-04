const { crpytPasswordUtil } = require('../utils/utils')
const { Admin_name, Admin_pwd } = require('../config/config.default')

const initDb = async ({ User }) => {
  const password = crpytPasswordUtil(Admin_pwd)
  const UserRes = await User.create({
    user_name: Admin_name,
    password,
    is_admin: true,
  })
  if (UserRes.length) console.log('初始超级管理员加入成功')
}
module.exports = { initDb }
