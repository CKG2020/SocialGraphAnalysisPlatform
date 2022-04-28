import request from '@/utils/request'

export default {
  // login (loginUser) {
  //   return request({
  //     url: '/doLogin',
  //     method: 'post',
  //     data: loginUser,
  //
  //   })
  // },
  register (registerUser) {
    return request({
      url: '/stu/doRegistry',
      method: 'post',
      data: registerUser
    })
  },









  checkToken () {
    return request({
      url: '/common/checkToken',
      method: 'get'
    })
  },
  getCode () {
    return request({
      url: '/util/getCode',
      method: 'get'
    })
  },

  checkUsername (username) {
    return request({
      url: `/common/check/${username}`,
      method: 'get'
    })
  }
}











export function login(data) {
  return request({
    url: '/doLogin',
    method: 'post',
    data
  })
}
