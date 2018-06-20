import Vue from 'vue'
import Router from 'vue-router'
import { requireAuth } from '@/assets/js/auth'

import Login from '@/pages/login_/Login'
import Signup from '@/pages/signup/Signup'
import Dashboard from '@/pages/dashboard/Dashboard'
import Usuarios from '@/pages/usuarios_/Usuarios'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter: requireAuth
    },
    {
      path: '/Usuarios',
      name: 'Usuarios',
      component: Usuarios,
      beforeEnter: requireAuth
    },
    { path: '*', redirect: '/' }
  ]
})
