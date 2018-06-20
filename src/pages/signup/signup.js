export default {
  name: 'Signup',

  $_veeValidate: true,

  data () {
    return {
      acc: 'guardarUsuarios',
      inputs: {
        CorreoPersona: '',
        clave: '',
        reclave: '',
        checkbox: null
      },
      toogleClave: true,
      tooglereClave: true
    }
  },

  methods: {
    submit: async function () {
      await this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch(this.acc, this.inputs).then((response) => {
            if (response.data.acc === 'ok') {
              this.$router.push({ name: 'Usuarios.Listado' })
            }
            this.$store.commit('toogleSnackbar', response.data)
          })
        }
      })
    },

    clear () {
      this.inputs.correo = ''
      this.inputs.clave = ''
      this.inputs.reclave = ''
      this.inputs.checkbox = null
      this.$validator.reset()
    }
  }

}
