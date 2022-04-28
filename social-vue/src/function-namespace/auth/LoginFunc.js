import auth from '@/api/auth'

import router from '../../router/index'
import store  from "../../store";

// 登录表单数据信息
const loginForm = {
 user_account: '',
 user_pwd: '',

}
// 自定义验证码校验规则
// const validateCode = (rule, value, callback) => {
//   // 验证码不区分大小写
//   if (value.toString().toLocaleLowerCase() !== code.toString().toLocaleLowerCase()) {
//     callback(new Error('验证码输入错误'))
//   } else {
//     callback()
//   }
// }
// 登录表单的校验规则
const loginFormRules = {
 user_account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
  ],
 user_pwd: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    },
    {
      min: 6,
      message: '密码不能小于6个字符',
      trigger: 'blur'
    }
  ],

}

const toRegisterPage = () => {
  router.push('/register')
}
// 登录
const login = () => {
  store.dispatch("user/login", loginForm)
    .then(() => {

      ;})
}
export default {
  loginForm,
  loginFormRules,

  toRegisterPage,
  login
}
