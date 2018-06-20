export default {
  state: {
    snackbarStore: {
      status: false,
      context: '',
      text: ''
    }
  },

  mutations: {
    toogleSnackbar (state, dt) {
      state.snackbarStore.status = true
      state.snackbarStore.context = dt.context || 'error'
      state.snackbarStore.text = dt.text || 'Lo sentimos, usuario o contraseña incorrectos.'
    }
  }
}
