const {
  createPublicBooks,
  updatePublicBooks,
  deletesPublicBook,
  getPublicBooks,
} = require('../service/public_books.service')
const { bookUpdateError } = require('../static/err.type')

class BooksController {
  async createPublicBook(ctx, next) {
    const { book_name, book_url, classify = null } = ctx.request.body
    try {
      const res = await createPublicBooks({ data: { book_name, book_url, classify } })
      ctx.body = {
        code: 1,
        data: {
          message: res ? '添加成功' : '添加失败',
          success: res ? true : false,
        },
      }
    } catch (err) {
      console.log(err)
    }
  }
  async createSPublicBook(ctx, next) {
    const { list } = ctx.request.body
    const res = await createPublicBooks({ list })
    ctx.body = {
      code: 1,
      data: {
        message: res ? '添加成功' : '添加失败',
        success: true,
        length: res ? res.length : false,
      },
    }
  }
  async getPublicBooksInfo(ctx, next) {
    const { pageNum = 1, pageSize = 10 } = ctx.request.body
    const res = await getPublicBooks({ pageNum, pageSize })
    ctx.body = {
      success: true,
      message: '查询成功',
      result: res,
    }
  }
  async putPublicBook(ctx, next) {
    try {
      const Bookid = Number(ctx.request.query.id)
      const list = ctx.request.body
      const { id } = ctx.state.user
      if (isNaN(Bookid)) throw 'Bookid is NaN'
      const { data } = await updatePublicBooks({ id, Bookid, list })
      if (data.length) {
        ctx.body = {
          message: '更新成功',
          success: true,
        }
      }
    } catch (err) {
      console.error(err)
      ctx.app.emit('error', bookUpdateError, ctx)
    }
  }
  async deletePublicBooks(ctx, next) {
    try {
      const { list } = ctx.request.body
      const { id } = ctx.state.user
      const res = await deletesPublicBook({ id, list })
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
