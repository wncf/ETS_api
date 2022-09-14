const Router = require('koa-router')
const {
  createPublicBookclassify,
  deletePublicBooksClassify,
} = require('../controller/public_books_classify.controller')

const { classifyValidator, delClassifyListValidator } = require('../Dto/public_books_classify')

const router = new Router({ prefix: '/pbclassify' })

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')
//获取所有公共分类
// router.post('/', getPublicBooksInfo)

//添加一个分类，需要管理员权限
router.post('/add', auth, hadAdminPermission, classifyValidator, createPublicBookclassify)
// router.post('/adds', auth, hadAdminPermission, PublicBooksCreateS_dto, createSPublicBook)
// router.post('/', auth, PagingValidator, getBooks)

// // 修改分类名（单个）
// router.put('/', auth, BooksCreateValidator, putBook)
// // 删除分类
router.delete('/del', auth, hadAdminPermission, delClassifyListValidator, deletePublicBooksClassify)
module.exports = router
