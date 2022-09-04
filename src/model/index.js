const fs = require('fs')
const seq = require('../db/seq')

const Books = require('./books.model')
const User = require('./user.model')
const { initDb } = require('../service/init.service')

// 创建一对多对应关系
User.hasMany(Books, {
  foreignKey: 'UserId',
  sourceKey: 'id',
})
Books.belongsTo(User)
const resetDb = async () => {
  // await seq.sync({ force: true }) //重置清空数据库
  // await initDb({ User }) //初始化管理员数据
  // await seq.sync({ alter: true }) //必要的更新与模型匹配
}
resetDb()
module.exports = { User, Books }
