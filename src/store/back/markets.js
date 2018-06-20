var cmdMarkets = {
  cls: 'markets'
}

export default {
  state: {
    marketsStore: []
  },

  mutations: {
    limpiarArrMarkets (state) {
      state.marketsStore = []
    },

    cargarMarkets (state, Markets) {
      state.marketsStore.push(Markets)
    },

    eliminarMarkets (state, usuario) {
      state.marketsStore.splice(usuario.index, 1)
    }
  },

  actions: {
    listMarkets (context) {
      cmdMarkets.acc = 'listado'
      context.commit('limpiarArrMarkets')
      context.dispatch('gotoBackEnd', cmdMarkets).then((response) => {
        response.data.forEach((e) => {
          context.commit('cargarMarkets', e)
        })
      })
    },

    guardarMarkets (context, data) {
      cmdMarkets.data = data
      cmdMarkets.acc = 'guardar'
      return context.dispatch('gotoBackEnd', cmdMarkets)
    }
  }
}
