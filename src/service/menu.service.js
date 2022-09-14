const { Menu, Pmenu, roleMenu } = require('../model/index')
const { Op } = require('sequelize')
class MenuService {
  async createMenu({ menu_name, menu_url, menu_icon, pid = null }) {
    let res = null
    if (pid) {
      res = await Menu.create({ menu_name, menu_url, menu_icon, pid })
    } else {
      res = await Pmenu.create({ menu_name, menu_url, menu_icon })
    }
    return res || {}
  }
  async UpdateMenuServe({ mid, menu_name, menu_url, menu_icon, pid = null }) {
    try {
      let res = null
      if (pid) {
        res = await Menu.update(
          { menu_name, menu_url, menu_icon, pid },
          {
            where: {
              id: mid,
              pid,
            },
          }
        )
      } else {
        res = await Pmenu.update(
          { menu_name, menu_url, menu_icon },
          {
            where: {
              id: mid,
            },
          }
        )
      }
      return res || {}
    } catch (err) {
      console.error(err)
    }
  }
  async UpdateRoleMenuServe({ id, role = [] }) {
    try {
      const list = role.map((item) => {
        return { ...item, uid: id }
      })
      const res = await roleMenu.bulkCreate(list)
      return res || {}
    } catch (err) {
      console.log(err)
    }
  }
  // 批量删除
  async deleteMenuServe({ isPmenu = false, list }) {
    try {
      let res = null
      if (isPmenu) {
        res = await Pmenu.destroy({
          where: {
            id: {
              [Op.in]: list,
            },
          },
        })
      } else {
        res = Menu.destroy({
          where: {
            id: {
              [Op.in]: list,
            },
          },
        })
      }
      return res || {}
    } catch (err) {
      console.error(err)
    }
  }
  async getMenu({ options }) {
    try {
      const { count, rows } = await Pmenu.findAndCountAll({
        ...options.data,
        attributes: {
          exclude: ['pmenuId', 'deleted_at'],
        },
        include: [
          {
            model: Menu,
            attributes: {
              exclude: ['pmenuId', 'deleted_at'],
            },
          },
        ],
      })
      return {
        ...options.label,
        total: count,
        data: rows,
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = new MenuService()
