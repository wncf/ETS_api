const { Books, User } = require('../model/index')
const { Op } = require('sequelize')
const dateFormat = require('../utils/utils')
class BooksService {
  async createBooks({ id, data, list = [] }) {
    try {
      let res = []
      if (list.length > 0) {
        list = list.map((item) => ({ ...item, UserId: id }))
        res = await Books.bulkCreate(list, { fields: ['book_name', 'book_url', 'UserId'] })
      } else {
        const { book_name, book_url } = data
        res = await Books.create({ book_name, book_url, UserId: id })
      }
      return res ? res : false
    } catch (err) {
      console.error(err)
    }
  }
  async getBooksByUid({ id, pageNum, pageSize }) {
    try {
      const offset = (pageNum - 1) * pageSize
      const { count, rows } = await Books.findAndCountAll({
        attributes: { exclude: ['UserId', 'deleted_at'] },
        where: { UserId: id },
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
  async updateBooksByid({ id, Bookid, list }) {
    try {
      const res = await Books.update(list, {
        where: { UserId: id, id: Bookid },
      })
      return {
        data: res,
      }
    } catch (err) {
      console.error(err)
    }
  }
  // 书签id检测
  async hasBooksByuid({ id, list }) {
    try {
      const res = await Books.findAll({
        where: { UserId: id, id: list },
      })
      return res
    } catch (err) {
      console.error(err)
    }
  }
  async deletesBook({ id, list }) {
    try {
      return await Books.destroy({
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
