const { Admin_name, Admin_pwd } = require('../../config/config.default')
const { crpytPasswordUtil } = require('../../utils/utils')
const password = crpytPasswordUtil(Admin_pwd)
module.exports = {
  userData: {
    user_name: Admin_name,
    password,
    is_admin: true,
  },
  PmenuData: {
    menu_name: '系统管理',
    menu_url: '/system',
    menu_icon: 'system',
  },
  menusData: [
    { menu_name: '用户管理', menu_url: '/user', menu_icon: 'system', pid: 1 },
    {
      menu_name: '菜单管理',
      menu_url: '/menus',
      menu_icon: 'menu',
      pid: 1,
    },
  ],
  roleMenuData: [
    { uid: 1, pmid: 1, mid: 1 },
    { uid: 1, pmid: 1, mid: 2 },
  ],
}
