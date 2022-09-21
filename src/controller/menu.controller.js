const {
  getMenu,
  createMenu,
  UpdateMenuServe,
  deleteMenuServe,
  UpdateRoleMenuServe,
} = require('../service/menu.service')

class MenuController {
  async getMenus(ctx, next) {
    const options = ctx.state.pageOptions
    const res = await getMenu({ options })
    ctx.body = res
  }
  async addMenus(ctx, next) {
    const { menu_name, menu_url, menu_icon, pid } = ctx.request.body
    const res = await createMenu({ menu_name, menu_url, menu_icon, pid })
    if (res.id) {
      ctx.body = {
        success: true,
        res,
      }
    }
  }
  async updateMenu(ctx, next) {
    const { mid, menu_name, menu_url, menu_icon, pid } = ctx.request.body
    const res = await UpdateMenuServe({ mid, menu_name, menu_url, menu_icon, pid })
    ctx.body = {
      success: true,
      message: '修改成功',
      result: res.length,
    }
  }
  async updateRoleMenu(ctx, next) {
    const { id } = ctx.state.user
    const { role } = ctx.request.body
    const res = await UpdateRoleMenuServe({ id, role })
    ctx.body = {
      success: true,
      message: '修改成功',
      result: res.length,
    }
  }
  async deleteMenu(ctx, next) {
    const { list, isPmenu } = ctx.request.body
    const res = await deleteMenuServe({ isPmenu, list })
    ctx.body = {
      success: true,
      message: '删除成功',
      result: res.length,
    }
  }
}

module.exports = new MenuController()
