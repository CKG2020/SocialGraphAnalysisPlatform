import {  login   } from "@/api/auth";
import {getBoardInfo} from  "@/api/exam";
import { getToken, setToken, removeToken } from "@/utils/utils";
import Vue from 'vue'
import router from "../../router";
import da from "element-ui/src/locale/lang/da";

const state = {
  token: getToken(), // token
  user: "", // 用户对象
};

const mutations = {
  SET_TOKEN_STATE: (state, token) => {
    state.token = token;
  },
  SET_USER_STATE: (state, user) => {
    state.user = user;
  },
};

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { user_account, user_pwd } = userInfo;
    return new Promise((resolve, reject) => {
      login({ user_account: user_account, user_pwd: user_pwd })
        .then((response) => {

          const { data } = response;
          switch(data.code)
          {
            case 666:
              Vue.prototype.$notify({
                title: 'Tips',
                message: '用户登陆成功^_^',
                type: 'success',
                duration: 2000
              })
              commit("SET_TOKEN_STATE", data.obj.token);
              commit("SET_USER_STATE",user_account);
              setToken(data.obj.token);
              router.push('/userIndex')
              break;
            case 111:
              Vue.prototype.$notify({
                title: 'Tips',
                message: '管理员登陆成功^_^',
                type: 'success',
                duration: 2000
              })
              router.push('/adminIndex')
              break;
            default:
              Vue.prototype.$notify({
                title: 'Tips',
                message: '用户名或者密码错误',
                type: 'error',
                duration: 2000
              })
              router.push('/')
          }
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  // 获取用户信息
  // getBoardInfo({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getBoardInfo()
  //       .then((response) => {
  //         // const [ data ] = response;
  //         // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"+response.data.obj)
  //         // console.log("第一次"+ response.)
  //         // if (!data) {
  //         //   commit("SET_TOKEN_STATE", "");
  //         //   commit("SET_USER_STATE", "");
  //         //   removeToken();
  //         //   resolve();
  //         //   reject("Verification failed, please Login again.");
  //         // }
  //         // // commit("SET_USER_STATE", data.obj);
  //         // resolve(data);
  //         Vue.prototype.$notify({
  //           title: 'Tips',
  //           message: '用户登陆成功^_^',
  //           type: 'success',
  //           duration: 2000
  //         })
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
  // 注销
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token)
  //       .then((response) => {
  //         console.log(response);
  //         commit("SET_TOKEN_STATE", "");
  //         commit("SET_USER_STATE", "");
  //         removeToken();
  //         resolve();
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
