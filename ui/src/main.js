import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from '../Store/index.js'
import login from './Components/Login.vue'
import mypage from './Components/MyPage.vue'

var VueAuth = require('vue-auth')
 
Vue.use(VueAuth, {
  storagePrefix: '_prefix.',
  redirectType: 'router',
  authPath : '/login'
})

Vue.use(VueRouter)


var router = new VueRouter({
  routes:[
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      name: 'mypage',
      meta: {
        requiresAuth: true
      },
      component: mypage
    }
    // {
    //   path: '/mypage',
    //   name: 'mypage',
    //   meta: {
    //     requiresAuth: true
    //   },
    //   component: mypage
    // }
  ]
})

// При отсутсвии авторизации пользователя будет перенаправлять на страницу mypage
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('token') !== null) {
      next()
    } else {
      router.push('/mypage')
    }
  } else {
    next()
  }
})

const app = new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h =>h(App)
})
