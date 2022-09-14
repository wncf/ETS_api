const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const p_books = seq.define(
  'p_books',
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
    tableName: 'p_books',
  }
)
module.exports = p_books
