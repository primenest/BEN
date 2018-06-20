export default {
  state: {
    dataCambioClave: {
      status: false,
      ClaveUsuarios: '',
      ConfirmClave: '',
      idRegistro: ''
    }
  },

  mutations: {
    dialogCambioClave: function (state, registro) {
      state.dataCambioClave.ClaveUsuarios = ''
      state.dataCambioClave.ConfirmClave = ''
      state.dataCambioClave.status = true
      state.dataCambioClave.idRegistro = registro
    }
  }
}
