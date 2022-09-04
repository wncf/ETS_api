const bcrypt = require('bcryptjs')
function dateFormat(str) {
  var dateee = new Date(str).toJSON()

  var date = new Date(+new Date(dateee) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')

  return date
}
const crpytPasswordUtil = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  return hash
}

module.exports = { dateFormat, crpytPasswordUtil }
