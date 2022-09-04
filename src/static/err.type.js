module.exports = {
  // 1099 parameterError 参数校验错误
  parameterError(errors) {
    return {
      code: 1099,
      message: `${errors[0].field} ${errors[0].message}`,
      surplusError: errors.length - 1,
      success: false,
    }
  },
  //100 用户模块
  userFomatError: {
    code: '10001',
    message: '用户名或者密码错误',
    result: '',
    success: false,
  },
  userElearyExtedError: {
    code: '10002',
    message: '用户已经存在',
    result: '',
    success: false,
  },
  userRegisterError: {
    code: '10003',
    message: '用户注册失败',
    result: '',
    success: false,
  },
  userDoesNotExits: {
    code: '10004',
    message: '用户不存在',
    result: '',
    success: false,
  },
  userLoginError: {
    code: '10005',
    message: '用户登录失败',
    result: '',
    success: false,
  },
  invalidePassword: {
    code: '10006',
    message: '用户密码错误',
    result: '',
    success: false,
  },
  updatePasswordError: {
    code: '10007',
    message: '修改密码错误',
    result: '',
    success: false,
  },
  uploadMaxFileSizeError: {
    code: '10008',
    message: '上传文件过大',
    result: '',
    success: false,
  },
  uploadImageExtensionError: {
    code: '10009',
    message: '上传图片的扩展名不是受支持的',
    result: '',
    success: false,
  },
  userParameError: {
    code: '10010',
    message: '用户参数错误',
    result: '',
    success: false,
  },
  //101 授权模块
  tokenExpiredError: {
    code: '10101',
    message: 'token已过期',
    result: '',
    success: false,
  },
  invalidToekn: {
    code: '10102',
    message: '无效的token',
    result: '',
    success: false,
  },
  SyntaxToken: {
    code: '10103',
    message: 'token错误',
    result: '',
    success: false,
  },
  hasNotAdminPermission: {
    code: '10104',
    message: '无管理员权限',
    result: '',
    success: false,
  },
  // 书签模块错误 102
  bookUpdateError: {
    code: '10201',
    message: '书签更新失败',
    result: '',
    success: false,
  },
  bookDeleteError: {
    code: '10202',
    message: '书签删除失败,书签不存在或者已经被删除',
    result: '',
    success: false,
  },
}
