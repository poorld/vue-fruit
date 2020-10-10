// import { reject, resolve } from "core-js/fn/promise"
import { MessageBox } from 'element-ui'
import { Message } from 'element-ui'

export function confirm(title, content) {
  return MessageBox.confirm(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}

export function success(msg) {
  Message.success(msg)
}

export function info(msg) {
  Message.info(msg)
}

export function dialogInput(title, content, val) {
  return MessageBox.prompt(content, title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputValue: val
    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    // inputErrorMessage: '邮箱格式不正确'
  })
  // .then(({ value }) => {
  //   this.$message({
  //     type: 'success',
  //     message: '你的邮箱是: ' + value
  //   });
  // }).catch(() => {
  //   this.$message({
  //     type: 'info',
  //     message: '取消输入'
  //   });
  // })
}
