const dotenv = require('dotenv')
const path = require('path')
const currentEnv = process.env.npm_lifecycle_event
const res = dotenv.config({
  // 从根目录加载环境变量
  path: path.join(`.env.${currentEnv}`),
})
if (res.error) {
  console.log(res.error)
}
module.exports = process.env
