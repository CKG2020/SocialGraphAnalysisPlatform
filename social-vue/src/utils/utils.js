// import auth from '@/api/auth'
// import Vue from 'vue'
// import router from '../router/index'

// valid el form and invoke target method
// const validFormAndInvoke = (formEl, success, message = '信息有误', fail = function () {
// }) => {
//   if (!formEl) {
//     return
//   }
//   formEl.validate(valid => {
//     if (valid) {// form valid succeed
//       // do success function
//       success()
//       // reset fields
//       formEl.resetFields()
//     } else {// form valid fail
//       Vue.prototype.$notify({
//         title: 'Tips',
//         message: message,
//         type: 'error',
//         duration: 2000
//       })
//       // do something when fail
//       fail()
//       return false
//     }
//   })
// }
// check token and router link
// const checkToken = (to) => {
//   if (localStorage.getItem('authorization') !== null) {
//     auth.checkToken()
//       .then(resp => {
//         if (resp.code === 200) {
//           router.push(to)
//         }
//       })
//       .catch(error => {
//         localStorage.removeItem('authorization')
//       })
//   }
// }

// export default {
  // validFormAndInvoke,
  // checkToken
// }
import Cookies from 'js-cookie'

const uToken = 'u_token'
const darkMode = 'dark_mode';

// 获取Token
export function getToken() {
  return Cookies.get(uToken);
}

// 设置Token，1天,与后端同步
export function setToken(token) {
  return Cookies.set(uToken, token, {expires: 1})
}

// 删除Token
export function removeToken() {
  return Cookies.remove(uToken)
}

export function removeAll() {
  return Cookies.Cookies.removeAll()
}

export function setDarkMode(mode) {
  return Cookies.set(darkMode, mode, {expires: 365})
}

export function getDarkMode() {
  return !(undefined === Cookies.get(darkMode) || 'false' === Cookies.get(darkMode));
}
