// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import './assets/scss/core.scss'
// import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate'

import { store } from './store/index'

import Components from './components/index'

Vue.use(VeeValidate)

Vue.use(Vuetify)

Vue.config.productionTip = false

Object.keys(Components).forEach(key => {
  Vue.component(key, Components[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
