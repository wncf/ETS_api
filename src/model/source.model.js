const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const u_source = seq.define(
  'u_source',
  {
    primary_color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'default',
      comment: '用户主题色',
    },
  },
  {
    timestamps: true,
    tableName: 'u_source',
  }
)
module.exports = u_source
