import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// import usuarios from './modules/back/_usuarios'
import snackbar from './global/snackbar'
import cambioClave from './global/cambioClave'

import usuarios from './back/_usuarios'
import markets from './back/markets'
import transacciones from './back/transacciones'

const qs = require('qs')

Vue.use(Vuex)

export function store () {
  return new Vuex.Store({
    modules: {
      cambioClave,
      snackbar,
      usuarios,
      transacciones,
      markets
    },

    state: {},

    actions: {
      async gotoBackEnd (context, c) {
        return axios.post('/nmd/index.php', qs.stringify({
          cls: c.cls,
          acc: c.acc,
          data: c.data
        }))
      }
    },

    mutations: {},

    getters: {}
  })
}
