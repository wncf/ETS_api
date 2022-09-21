const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const Pmenu = seq.define(
  'pmenu',
  {
    menu_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '父级菜单名称',
    },
    menu_url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '父级菜单所在的前端路径前缀',
    },
    menu_icon: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '父级菜单图标',
    },
  },
  {
    timestamps: true,
  }
)
module.exports = Pmenu
