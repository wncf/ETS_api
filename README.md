### Ets_api(Efficiency tool station)

- 使用 dotenv 进行环境变量的加载注入
- 使用 nodemon 开发检测文件改变时自动重启服务器
- 使用 bcryptjs 进行密码加密
- 使用 jsonwebtoken 进行 token 生成与解析
- 使用 koa-parameter 进行参数校验，接口响应前端参数错误信息
- 基于 sequelize 进行`mysql`数据库操作
  遵循中间件原则进行开发，注重逻辑分离，减少代码耦合性

现有接口:

- 用户注册登录并颁发 token
- 用户头像默认头像修改
- 修改密码
- 书签的 crud 以及批量新增，删除
- 静态资源输出
  默认导出 public 下所有资源
  例如默认图片可通过http://127.0.0.1:8000/user/default_user_avatar.png 访问
- 菜单系统 crud`router/menu`
- 菜单权限系统 crud `router/menu`
  如何部署？
  克隆本仓库
  安装依赖
  > npm i or yarn install
  > 复制.env.examples 文件，修改为.env 文件，按自身需求进行修改  
  > 在建表完成后默认通过 src/model/index.js 下的`initDb()`添加默认管理员等数据
  > npm run dev or yarn dev 启动服务
  > 后续可能更新内容：邮件服务，权限系统
