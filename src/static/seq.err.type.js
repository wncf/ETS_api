class SeqErrorType {
  success = false
  constructor(type) {
    this.message = SeqMessage[`${type}`]
  }
}
const SeqMessage = {
  ER_DUP_ENTRY: '唯一值被重复创建',
}
module.exports = SeqErrorType
