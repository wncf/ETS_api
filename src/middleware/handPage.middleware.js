const { handSortBy, handPageOptions } = require('../utils/utils')

const handPage = async (ctx, next) => {
  const { pageNum, pageSize, sortBy } = ctx.request.body
  ctx.state.pageOptions = handPageOptions({ pageNum, pageSize, sortBy })
  await next()
}

module.exports = {
  handPage,
}
