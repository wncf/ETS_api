const { create_pbc, delete_pbc } = require('../service/public_classify.service')
const { bookUpdateError, SqlError } = require('../static/err.type')

class PublicBooksClassifyController {
  async createPublicBookclassify(ctx, next) {
    const { book_classify_name } = ctx.request.body
    try {
      const res = await create_pbc({ data: { book_classify_name } })
      ctx.body = {
        code: 1,
        data: {
          message: res ? '添加成功' : '添加失败',
          success: res ? true : false,
        },
      }
    } catch (err) {
      ctx.app.emit('error', SqlError(err, '分类名重复'), ctx)
    }
  }
  async createSPublicBook(ctx, next) {
    const { list } = ctx.request.body
    console.log(list)
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
  async deletePublicBooksClassify(ctx, next) {
    try {
      const { list } = ctx.request.body
      const res = await delete_pbc({ list })
      ctx.body = {
        message: '删除成功',
        success: true,
        res,
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new PublicBooksClassifyController()
