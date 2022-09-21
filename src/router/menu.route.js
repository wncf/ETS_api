const Router = require('koa-router')
const { getMenus, addMenus, updateMenu, deleteMenu, updateRoleMenu } = require('../controller/menu.controller')

const { PagingValidator, DeleteArry } = require('../Dto/globa.validator')
const { MenuCreateValidator, MenuUpdateValidator, Validator } = require('../Dto/menu.validator')

const router = new Router({ prefix: '/sysmenus' })

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { getBooksIsUser } = require('../middleware/books.middleware')
const { handPage } = require('../middleware/handPage.middleware')
const { Diyvalidator } = require('../middleware/validator.middleware')
// 获取全部菜单
router.post('/pages', auth, hadAdminPermission, PagingValidator, handPage, getMenus)
// 新增菜单(父/子)
router.post('/add', auth, hadAdminPermission, MenuCreateValidator, addMenus)

// 删除菜单(父/子)
router.delete('/', auth, hadAdminPermission, DeleteArry, deleteMenu)

// 修改菜单(父/子)
router.put('/', auth, hadAdminPermission, MenuUpdateValidator, updateMenu)
// 修改个人菜单权限
router.post(
  '/Role',
  auth,
  Diyvalidator({
    role: {
      type: 'array',
      itemType: 'object',
      rule: {
        mid: {
          type: 'number',
        },
        pmid: {
          type: 'number',
          required: false,
        },
      },
    },
  }),
  updateRoleMenu
)

module.exports = router
