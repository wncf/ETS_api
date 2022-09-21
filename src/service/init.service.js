const { PmenuData, menusData, roleMenuData, userData } = require('../static/init_static/admin')

const initDb = async ({ User, Menu, Pmenu, roleMenu }) => {
  await User.create(userData)
  await Pmenu.create(PmenuData)
  await Menu.bulkCreate(menusData)
  await roleMenu.bulkCreate(roleMenuData)
}
module.exports = { initDb }
