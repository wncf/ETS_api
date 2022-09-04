const Router = require('koa-router')
const { createBook, getBooks, createsBook, putBook, deleteBooks } = require('../controller/books.controller')
const { BooksCreateValidator, BooksCreateSValidator, BooksDeleteValidator } = require('../Dto/books.vatildator')
const { PagingValidator } = require('../Dto/globa.validator')

const router = new Router({ prefix: '/books' })

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { getBooksIsUser } = require('../middleware/books.middleware')

router.post('/add', auth, BooksCreateValidator, createBook)
router.post('/adds', auth, BooksCreateSValidator, createsBook)

router.post('/', auth, PagingValidator, getBooks)
// 修改（单个）
router.put('/', auth, BooksCreateValidator, putBook)
// 删除
router.delete('/del', auth, BooksDeleteValidator, getBooksIsUser, deleteBooks)
module.exports = router
 