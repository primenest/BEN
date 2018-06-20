var cmdTransaccion = {
  cls: 'transacciones'
}

export default {
  state: {
    transaccionesStore: []
  },

  mutations: {
    limpiarArrTransacciones (state) {
      state.transaccionesStore = []
    },

    cargarTransacciones (state, transaccion) {
      state.transaccionesStore.push(transaccion)
    }
    /*
,
    eliminarTransacciones (state, transaccion) {
      state.transaccionesStore.splice(transaccion.index, 1)
    }
    */
  },

  actions: {
    listTransacciones (context) {
      cmdTransaccion.acc = 'listado'
      context.commit('limpiarArrTransacciones')
      context.dispatch('gotoBackEnd', cmdTransaccion).then((response) => {
        response.data.forEach((e) => {
          let montoCompra = (e.precio * e.cant)
          let comision = (montoCompra * 0.2) / 100
          let totalCompra = (montoCompra + comision)
          e.be = Math.round(parseFloat(((totalCompra + ((totalCompra * 1) / 100)) / e.cant)) * 1000) / 1000
          e.t2 = Math.round(parseFloat(((totalCompra + ((totalCompra * 2) / 100)) / e.cant)) * 1000) / 1000
          e.t5 = Math.round(parseFloat(((totalCompra + ((totalCompra * 5) / 100)) / e.cant)) * 1000) / 1000
          e.t10 = Math.round(parseFloat(((totalCompra + ((totalCompra * 10) / 100)) / e.cant)) * 1000) / 1000
          e.sl = Math.round(parseFloat(((totalCompra - ((totalCompra * 2) / 100)) / e.cant)) * 1000) / 1000
          context.commit('cargarTransacciones', e)
        })
      })
    }

    /*
    guardarTransacciones (context, data) {
      cmdTransaccion.data = data
      cmdTransaccion.acc = 'guardar'
      return context.dispatch('gotoBackEnd', cmdTransaccion)
    }
    */
  }
}
