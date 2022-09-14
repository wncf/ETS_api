const { public_books_classlfy } = require('../model/index')
const { Op } = require('sequelize')
class pubick_books_classlfy_service {
  async create_pbc({ data, list = [] }) {
    let res = []
    if (list.length > 0) {
      list = list.map((item) => ({ ...item }))
      res = await public_books_classlfy.bulkCreate(list, { fields: ['book_name', 'book_url', 'bid'] })
    } else {
      const { book_classify_name } = data
      res = await public_books_classlfy.create({ book_classify_name })
    }
    return res ? res : false
  }
  async GetBooksClassAll({ list = [] }) {
    let res = []
    if (list.length > 1) {
      res = await public_books_classlfy.findAll({
        attributes: ['id'],
        where: {
          id: {
            [Op.in]: list,
          },
        },
      })
    } else {
      res = await public_books_classlfy.findAll({
        attributes: ['id'],
      })
    }
    return res ? res.map((item) => item.id) : []
  }
  async update_pbc({ id, Bookid, list }) {
    try {
      const res = await public_books_classlfy.update(list, {
        where: { UserId: id, id: Bookid },
      })
      return {
        data: res,
      }
    } catch (err) {
      console.error(err)
    }
  }
  async delete_pbc({ list }) {
    try {
      return await public_books_classlfy.destroy({
        where: {
          id: {
            [Op.in]: list,
          },
        },
      })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new pubick_books_classlfy_service()
