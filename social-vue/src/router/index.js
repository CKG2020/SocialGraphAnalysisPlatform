import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
// 进度条配置项
// NProgress.configure({
//   showSpinner: false
// })

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/auth/Login')
  },
  {
    path: '/register',
    component: () => import('../views/auth/Register')
  },

  {
    path: '/adminIndex',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/AdminInterface.vue'),
    // redirect: '/dashboard',
    children: [

      //Admin的界面
      {
        path: '/userManage',
        name: 'Board',
        component: () => import('../components/admin/BasicInformation'),
      },

      {
        path: '/analysis',
        name: 'Face',
        component: () => import('../components/admin/Analysis'),
      },
      {
        path: '/updateQuestion',
        name: 'Face',
        component: () => import('../components/admin/UpdateQuestion'),
      },
      {
        path: '/addQuestionnaire',
        name: 'Face',
        component: () => import('../components/admin/AddQuestionnaire'),
      },
      {
        path: '/watchChat',
        name: 'Face',
        component: () => import('../components/admin/WatchChat'),
      },
      {
        path: '/chatLog',
        name: 'Face',
        component: () => import('../components/admin/ChatLog'),
      },
      {
        path: '/graphAnalysis',
        name: 'Face',
        component: () => import('../components/admin/GraphAnalysis'),
      }
    ]
  },
  {
    path: '/userIndex',
    name: 'About',

    component: () => import(/* webpackChunkName: "about" */ '../views/UserInterface.vue'),

    children: [
      //User的界面
      {
        path: '/mesboard',
        name: 'Board',
        component: () => import('../components/user/MesBoard'),
      },
      {
        path: '/information',
        name: 'Image',
        component: () => import('../components/user/Information'),
      },
      {
        path: '/questions',
        name: 'Face',
        component: () => import('../components/user/Question'),
      },
      {
        path: '/questions',
        name: 'Face',
        component: () => import('../components/user/Question'),
      },
      {
        path: '/chat',
        name: 'Face',
        component: () => import('../components/user/Chat'),
      },
      {
        path: '/result',
        name: 'Face',
        component: () => import('../components/user/Result'),
      },
      {
        path: '/myFri',
        name: 'Face',
        component: () => import('../components/user/MyFri'),
      },
      {
        path: '/applyFri',
        name: 'Face',
        component: () => import('../components/user/ApplyFri'),
      },
      {
        path: '/unknown',
        name: 'Face',
        component: () => import('../components/user/Unkown'),
      },
      {
        path: '/settings',
        name: 'Face',
        component: () => import('../components/user/Settings'),
      },
      {
        path: '/myFriendDetail/:friend_account',
        name: 'friendDetail',
        component: () => import('../components/user/FriendDetail')
      }


    ]
  },


]

const router = new VueRouter({
  routes
})

export default router
