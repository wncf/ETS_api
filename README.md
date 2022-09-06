### koa2-Api基础脚手架
- 使用 dotenv 进行环境变量的加载注入
- 使用 nodemon 开发检测文件改变时自动重启服务器 
- 使用 bcryptjs 进行密码加密
- 使用jsonwebtoken 进行token生成与解析
- 使用koa-parameter 进行参数校验，接口响应前端参数错误信息
- 基于sequelize 进行`mysql`数据库操作
遵循中间件原则进行开发，注重逻辑分离，减少代码耦合性



现有接口:
- 用户注册
- 用户登录并颁发token
- 用户头像默认头像修改
- 修改密码
- 书签的crud以及批量新增，删除
- 静态资源输出
  默认导出public下所有资源
  例如默认图片可通过http://127.0.0.1:8000/user/default_user_avatar.png 访问


如何部署？
克隆本仓库
安装依赖
> npm i or yarn install
复制.env.examples文件，修改为.env文件，按自身需求进行修改  
需要`src/model/index.js`下取消注释`初始化数据库`代码在运行即可自动完成建表
> npm run dev or yarn dev 启动服务
后续可能更新内容：邮件服务，权限系统以及菜单系统