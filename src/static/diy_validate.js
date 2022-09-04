const Parameter = require('parameter')
const BooksCreateListValidate = new Parameter({
  translate: function () {
    var args = Array.prototype.slice.call(arguments)
    // Assume there have I18n.t method for convert language.
    return I18n.t.apply(I18n, args)
  },
  validateRoot: true, // restrict the being validate value must be a object
})

module.exports = { BooksCreateListValidate }
