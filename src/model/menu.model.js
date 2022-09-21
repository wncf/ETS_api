const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const Menu = seq.define(
  'menu',
  {
    menu_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '菜单名称',
    },
    menu_url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '菜单所在的前端路径',
    },
    menu_icon: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '菜单图标',
    },
  },
  {
    timestamps: true,
  }
)
module.exports = Menu
