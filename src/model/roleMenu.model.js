const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const uhasMenu = seq.define(
  'uhasMenu',
  {
    enable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      comment: '是否禁用',
    },
  },
  {
    timestamps: true,
  }
)
module.exports = uhasMenu
