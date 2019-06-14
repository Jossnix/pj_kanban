import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from '../Store/index.js'
import login from './Components/Login.vue'
import lMenu from './Components/Menu.vue'
import pj from './Components/Project.vue'

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
      name: 'pj',
      meta: {
        requiresAuth: true
      },
      component: pj
    }
  ]
})

// При отсутсвии авторизации пользователя будет перенаправлять на страницу login
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('token') !== null) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})

const app = new Vue({
  el: '#app',
  store: store,
  router: router,
})

const cMenu = new Vue({
  el: '#cMenu',
  store: store,
  router: router,
  render: h =>h(lMenu)
})