const { p_books, public_books_classlfy } = require('../model/index')
const { Op } = require('sequelize')
class BooksService {
  async createPublicBooks({ data, list = [] }) {
    try {
      let res = []
      if (list.length > 0) {
        res = await p_books.bulkCreate(list, { fields: ['book_name', 'book_url', 'bid'] })
      } else {
        const { book_name, book_url, classify } = data
        res = await p_books.create({ book_name, book_url, bid: classify })
      }
      return res ? res : false
    } catch (err) {
      console.error(err)
    }
  }
  async getPublicBooks({ pageNum, pageSize }) {
    try {
      const offset = (pageNum - 1) * pageSize
      const { count, rows } = await p_books.findAndCountAll({
        // attributes: [需要返回的字段] / { exclude:[ 排除的字段]}
        attributes: { exclude: ['deleted_at', 'bid'] },
        include: {
          model: public_books_classlfy,
          attributes: ['book_classify_name', 'id'],
          as: 'claasify',
        },
        offset,
        limit: pageSize * 1,
      })
      return {
        pageNum,
        pageSize,
        total: count,
        data: rows,
      }
    } catch (err) {
      console.error(err)
    }
  }
  async updatePublicBooks({ id, Bookid, list }) {
    try {
      const res = await p_books.update(list, {
        where: { UserId: id, id: Bookid },
      })
      return {
        data: res,
      }
    } catch (err) {
      console.error(err)
    }
  }
  async deletesPublicBook({ id, list }) {
    try {
      return await p_books.destroy({
        where: {
          UserId: id,
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

module.exports = new BooksService()
