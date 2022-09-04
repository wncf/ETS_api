const Router = require('koa-router')

const router = new Router({ prefix: '/user' })
const { register, login, changePassword, changeAvatar, getUser } = require('../controller/user.controller')
const { verifyUser, crpytPassword, verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
const koaUploadBody = require('../middleware/fileuploads.middleware')
const { userValidator, userPasswordValidator } = require('../Dto/user.validator')

router.post('/register', userValidator, verifyUser, crpytPassword, register)

router.post('/login', userValidator, verifyLogin, login)
router.patch('/', auth, userPasswordValidator, crpytPassword, changePassword)
router.post('/avatar', auth, koaUploadBody, changeAvatar)
router.get('/', auth, getUser)

module.exports = router
