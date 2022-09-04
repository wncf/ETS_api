const { hasBooksByuid } = require('../service/books.service')
const { bookDeleteError } = require('../static/err.type')

const getBooksIsUser = async (ctx, next) => {
  const { list } = ctx.request.body
  const { id } = ctx.state.user
  const res = await hasBooksByuid({ id, list })
  if (res.length) {
    ctx.request.body.list = res.map((item) => item.id)
    await next()
  } else {
    return ctx.app.emit('error', bookDeleteError, ctx)
  }
}
module.exports = {
  getBooksIsUser,
}
