const fs = require('fs')
const seq = require('../db/seq')

const Books = require('./books.model')
const User = require('./user.model')

const { initDb } = require('../service/init.service')
const Menu = require('./menu.model')
const roleMenu = require('./roleMenu.model')
const Pmenu = require('./menuParent.model')

User.hasMany(Books, {
  foreignKey: 'UserId',
  sourceKey: 'id',
})
Books.belongsTo(User)

Pmenu.hasMany(Menu, {
  foreignKey: 'pid',
  sourceKey: 'id',
})
Menu.belongsTo(Pmenu)
roleMenu.belongsTo(Menu, {
  foreignKey: 'mid',
  sourceKey: 'id',
})
roleMenu.belongsTo(Pmenu, {
  foreignKey: 'pmid',
  sourceKey: 'id',
})
roleMenu.belongsTo(User, {
  foreignKey: 'uid',
  sourceKey: 'id',
})

const resetDb = async () => {
  // await seq.sync({ force: true }) //初始化数据库
  // await initDb({ User, Menu, Pmenu, roleMenu }) //初始化管理员数据
  // await seq.sync({ alter: true }) //必要的更新与模型匹配
}
resetDb()
module.exports = { User, Books, Menu, Pmenu, roleMenu }
