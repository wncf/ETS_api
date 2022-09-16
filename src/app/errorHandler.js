module.exports = (err, ctx) => {
  let status = 500
  const code = err.code ? err.code + ''.substring(0, 3) : 100
  switch (code) {
    case '101':
      status = 401
      break
    case '102':
      status = 409
      break
    case 1099:
      status = 404
      break
    default:
      status = 500
  }
  ctx.status = status
  ctx.body = err
}
