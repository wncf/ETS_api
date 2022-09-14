const seq = require('../db/seq')
const { DataTypes } = require('sequelize')

const public_books_classlfy = seq.define(
  'public_books_classlfy',
  {
    book_classify_name: {
      type: DataTypes.STRING,
      unique: true,
      min: 1,
      max: 10,
      allowNull: true,
      comment: '公共书签分类名称',
    },
  },
  {
    timestamps: true,
    tableName: 'public_books_classlfy',
  }
)
module.exports = public_books_classlfy
