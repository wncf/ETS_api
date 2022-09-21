const { Sequelize } = require('sequelize')

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PWD, MYSQL_DB, MODE } = require('../config/config.default')
// console.log(
//   MYSQL_HOST,
//   MYSQL_PORT,
//   MYSQL_USER,
//   MYSQL_PWD,
//   MYSQL_DB);
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
  host: MYSQL_HOST,
  dialect: 'mysql',
  logging: false,
  pool: {
    max: 15,
    min: 0,
    idle: 10000,
  },
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true, //是否开启假删除；默认 是
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    underscored: true,
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
  hooks: {
    afterValidate: (record, options) => {
      // console.log('hellow', options)
    },
  },
})
const hasSqlSuccess = async () => {
  try {
    await seq.authenticate()
    console.log('数据库连接成功')
  } catch (error) {
    console.error('数据库连接失败', error)
  }
}
if (MODE === 'dev') {
  hasSqlSuccess()
}
module.exports = seq
