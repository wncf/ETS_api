const Router = require('koa-router')

const { createPublicBook, createSPublicBook, getPublicBooksInfo } = require('../controller/public_books.controller')
const { PagingValidator } = require('../Dto/globa.validator')
const { PublicBooksCreate_dto, PublicBooksCreateS_dto } = require('../Dto/public_books.vatildator')

const router = new Router({ prefix: '/pbooks' })

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
const { ValidateClassify, ValidatesClassify } = require('../middleware/Validate_classifyId.middleware')
//获取所有公共书签
router.post('/', PagingValidator, getPublicBooksInfo)

//设置公共书签，需要管理员权限
router.post('/add', auth, hadAdminPermission, PublicBooksCreate_dto, ValidateClassify, createPublicBook)
router.post('/adds', auth, hadAdminPermission, PublicBooksCreateS_dto, ValidatesClassify, createSPublicBook)
// router.post('/', auth, PagingValidator, getBooks)

// // 修改（单个）
// router.put('/', auth, BooksCreateValidator, putBook)
// // 删除
// router.delete('/del', auth, BooksDeleteValidator, deleteBooks)
module.exports = router
