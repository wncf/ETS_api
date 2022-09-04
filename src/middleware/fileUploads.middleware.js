const koaBody = require('koa-body')
const path = require('path')
const { uploadMaxFileSizeError } = require('../static/err.type')
const koaUploadBody = koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname + '../../../public/user_uploads'),
    // maxFileSize: 2 * 1024 * 1024, 上传的文件大小
    keepExtensions: true, //保留扩展
  },

  jsonLimit: '10mb',
  formLimit: '10mb',
  textLimit: '10mb',
  onError(error, ctx) {
    console.log(error)
    console.error('文件上传超过限制', error.code)
    ctx.throw(403, JSON.stringify(uploadMaxFileSizeError))
  },
})
module.exports = koaUploadBody
