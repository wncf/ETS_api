const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const User = seq.define(
  'User',
  {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      comment: '用户名，唯一',
    },
    password: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      comment: '密码',
    },
    avatarUrl: {
      type: DataTypes.CHAR(64),
      allowNull: false,
      defaultValue: '/user/default_user_avatar.png',
      comment: '用户头像',
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
      comment: '是否为管理员, 0不是(默认),1是',
    },
  },
  {
    timestamps: true,
    tableName: 'user',
  }
)
module.exports = User
