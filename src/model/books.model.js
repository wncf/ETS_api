const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const Books = seq.define(
  'Books',
  {
    book_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '书签名称',
    },
    book_url: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '书签url',
    },
  },
  {
    timestamps: true,
    tableName: 'books',
  }
)
module.exports = Books
