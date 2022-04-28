import Vue from 'vue'

import router from './router'
import './plugins/element.js'
import axios from 'axios'
import api from './api/api'
import store from './store'
// 引入echarts
import echarts from 'echarts'

import axiosService from '@/utils/request'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
Vue.prototype.$request = axiosService
Vue.prototype.$echarts = echarts


//接口地址统一管理
Vue.prototype.API = api.API.api
//配置请求根路径
axios.defaults.baseURL = 'http://localhost:8889/'
//axios拦截器拦截每一个请求,有token就配置头信息的token
// axios.interceptors.request.use(config => {
//   let token = window.localStorage.getItem('authorization')
//   if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
//     config.headers.authorization = token
//   }
//   return config
// }, error => {
//   return Promise.reject(error)
// })
Vue.prototype.$http = axios
Vue.config.productionTip = false

//全局过滤器(秒数转化为分钟)
Vue.filter('timeFormat',function (time) {
  //分钟
  var minute = time / 60;
  var minutes = parseInt(minute);

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  //秒
  var second = time % 60;
  var seconds = Math.round(second);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
})

//解决路径跳转的报错
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


new Vue({
  router,
  store,
  data: function(){
    return {
      online: 0,
    }
  },
  render: h => h(App)
}).$mount('#app')
