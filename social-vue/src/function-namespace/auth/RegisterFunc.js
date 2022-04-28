import router from '@/router'
import auth from '@/api/auth'
import Vue from 'vue'
// 注册表单数据信息
const registerForm = {
 user_account: '',
  user_pwd: '',
  auth: true,
 email: '',
  phone: ''
}
// 自定义验证码校验规则
// const validatephone = (rule, value, callback) => {
//   // 验证码不区分大小写
//   if (value.toString().toLocaleLowerCase() !== phone.toString().toLocaleLowerCase()) {
//     callback(new Error('验证码输入错误'))
//   } else {
//     callback()
//   }
// }
// 自定义用户名校验规则
// const validateUsername = (rule, value, callback) => {
//   auth.checkUsername(registerForm.username)
//     .then(resp => {
//       if (resp.data) {
//         callback()
//       } else {
//         callback(new Error('用户名已存在'))
//       }
//     })
// }
// 登录表单的校验规则
const registerFormRules = {
 user_account: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      // validator: validateUsername,
      trigger: 'blur'
    }
  ],
 email: [
    {
      required: true,
      message: '请输入您的邮箱地址',
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
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      // validator: validatephone,
      trigger: 'blur'
    }
  ],
}

const toLoginPage = () => {
  router.push('/')
}


// 表单信息提交
const register = () => {
  auth.register(registerForm).then(resp => {
    switch(resp.data.code)
    {
      case 500:
        Vue.prototype.$notify({
          title: 'Tips',
          message: resp.data.message,
          type: 'error',
          duration: 2000
        })
        router.push('/register')
        break;
      case 666:
        Vue.prototype.$notify({
          title: 'Tips',
          message: resp.data.message,
          type: 'success',
          duration: 2000
        })
        router.push('/')
        break;

    }
      })
}

export default {

  registerForm,
  registerFormRules,

  toLoginPage,
  register
}
