const { createBooks, getBooksByUid, updateBooksByid, deletesBook } = require('../service/books.service')
const { bookUpdateError } = require('../static/err.type')

class BooksController {
  async createBook(ctx, next) {
    const id = ctx.state.user.id
    const { book_name, book_url } = ctx.request.body
    const res = await createBooks({ id, data: { book_name, book_url } })
    ctx.body = {
      code: 1,
      data: {
        message: res ? '添加成功' : '添加失败',
        success: res ? true : false,
      },
    }
  }
  async createsBook(ctx, next) {
    const id = ctx.state.user.id
    const { list } = ctx.request.body
    const res = await createBooks({ id, list })
    ctx.body = {
      code: 1,
      data: {
        message: res ? '添加成功' : '添加失败',
        success: true,
        length: res ? res.length : false,
      },
    }
  }
  async getBooks(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.body
    const { id } = ctx.state.user
    const res = await getBooksByUid({ id, pageNum, pageSize })
    ctx.body = {
      success: true,
      message: '查询成功',
      result: res,
    }
  }
  async putBook(ctx, next) {
    try {
      const Bookid = Number(ctx.request.query.id)
      const list = ctx.request.body
      const { id } = ctx.state.user
      if (isNaN(Bookid)) throw 'Bookid is NaN'
      const { data } = await updateBooksByid({ id, Bookid, list })
      if (data.length) {
        ctx.body = {
          message: '更新成功',
          success: true,
        }
      }
    } catch (err) {
      ctx.app.emit('error', bookUpdateError, ctx)
    }
  }
  async deleteBooks(ctx, next) {
    try {
      const { list } = ctx.request.body
      const { id } = ctx.state.user
      const res = await deletesBook({ id, list })
      ctx.body = {
        message: '删除成功',
        success: true,
        result: res,
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new BooksController()
