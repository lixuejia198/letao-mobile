// 表单校验
export const verify = {
  // 验证用户名 长度大于2位 小于20位
  username(username) {
    if (!username) {
      return '用户名不能为空，请重新输入'
    }
    if (!/^[a-zA-Z0-9]{2,20}$/.test(username.trim())) {
      return '用户名长度必须是大于2位或者小于20位或者用户名格式不对'
    }
  },
  // 验证密码 
  password(password, repeatPassword) {
    if (!password) {
      return '密码不能为空，请重新输入'
    }
    if (!/^[a-zA-Z0-9]{6,20}$/.test(password.trim())) {
      return '密码长度在6-20位'
    }
    if (password !== repeatPassword && repeatPassword) {
      return '两次输入的密码不一致，请重新输入'
    }
  },
  // 验证手机号
  mobile(mobile) {
    if (!mobile) {
      return '手机号不能为空，请重新输入'
    }
    if (!/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(mobile)) {
      return '手机号格式不正确，请重新输入手机号'
    }
  }
}