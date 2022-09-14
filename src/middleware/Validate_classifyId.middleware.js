const { GetBooksClassAll } = require('../service/public_classify.service')
const { booksAddError } = require('../static/err.type')

const ValidateClassify = async (ctx, next) => {
  try {
    const { classify = null } = ctx.request.body
    const res = await GetBooksClassAll({ list: [] })
    if (classify == null) {
      await next()
    } else if (res.includes(+classify)) {
      await next()
    } else {
      return ctx.app.emit('error', booksAddError(''), ctx)
    }
  } catch (err) {
    console.log(err)
  }
}
const ValidatesClassify = async (ctx, next) => {
  const { list } = ctx.request.body

  // 获取存在的分类id
  const res = await GetBooksClassAll({
    list: list.map((item) => {
      return item.classify
    }),
  })
  // 取出存在的分类id下的内容 无字段或者错误字段id会转为null=>不挟带分类字段
  const whileList = list.map((item) => {
    return {
      ...item,
      bid: res.includes(item.classify) ? +item.classify : null,
    }
  })
  if (whileList.length) {
    ctx.request.body.list = whileList
    await next()
  } else {
    return ctx.app.emit(
      'error',
      booksAddError(list.filter((item) => !res.includes(item.classify)).map((i) => i.classify)),
      ctx
    )
  }
}
module.exports = {
  ValidateClassify,
  ValidatesClassify,
}
