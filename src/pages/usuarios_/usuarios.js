export default {
  name: 'usuarios',

  data: () => ({
    rowsPerPageText: 'Cant. de registros:',
    rowsPerPageItems: [10, 15, 20, { text: 'All', value: -1 }],
    search: '',
    headers: [
      { text: '', sortable: false, class: 'acc' },
      { text: 'Correo', align: 'center', value: 'correo' },
      { text: 'Nombre', align: 'center', value: 'nombre' },
      { text: 'Apellido', align: 'center', value: 'apellido' },
      { text: 'Estatus', align: 'center', value: 'estatus' }
    ],
    dialogEditar: {
      status: false,
      IdPersona: '',
      nombrePersona: '',
      apellidoPersona: '',
      correoPersona: '',
      tlfPersona: ''
    },
    dialogStatus: {
      status: false,
      txt: '',
      RIdPersona: '',
      EstatusUsuarios: ''
    },
    estatus: '',
    tipoEstatus: [
      { text: 'Activo', cod: 'act' },
      { text: 'Inactivo', cod: 'desact' },
      { text: 'Todos' }
    ]
  }),

  created: function () {
    this.traerUsuarios()
  },

  computed: {
    usuarios: function () {
      return this.$store.state.usuarios.usuariosStore.filter((e) => {
        return !this.estatus.cod || (e.estatus === this.estatus.cod)
      })
    }
  },

  methods: {
    traerUsuarios: async function () {
      await this.$store.dispatch('listUsuarios')
    },

    llamarDialogStatus: function (registro, status) {
      if (status === 'elimnd') {
        this.dialogStatus.txt = 'Esta seguro de querer ELIMINAR esté registro?'
        this.dialogStatus.txtBtn = 'ELIMINAR'
        this.dialogStatus.clorBtn = 'red--text'
      } else if (status === 'act') {
        this.dialogStatus.txt = 'Esta seguro de querer ACTIVAR esté registro?'
        this.dialogStatus.txtBtn = 'ACTIVAR'
        this.dialogStatus.clorBtn = 'green--text'
      } else {
        this.dialogStatus.txt = 'Esta seguro de querer DESACTIVAR esté registro?'
        this.dialogStatus.txtBtn = 'DESACTIVAR'
        this.dialogStatus.clorBtn = 'orange--text'
      }
      this.dialogStatus.status = true
      this.dialogStatus.RIdPersona = registro.item.id
      this.dialogStatus.EstatusUsuarios = status
    },

    accCambiarEstatus: function () {
      this.dialogStatus.status = false
      const index = this.usuarios.map(item => item.id).indexOf(this.dialogStatus.RIdPersona)
      this.usuarios[index].estatus = this.dialogStatus.EstatusUsuarios
      this.dialogStatus['index'] = index
      this.$store.dispatch('cambiarEstatusUsuarios', this.dialogStatus)
    },

    llamarDialogCambioClave: function (registro) {
      this.$validator.reset()
      this.$store.commit('dialogCambioClave', registro.item.id)
    },

    llamarDialogEditar: function (registro) {
      this.$validator.reset()
      this.dialogEditar.IdPersona = registro.item.id
      this.dialogEditar.nombrePersona = registro.item.nombre
      this.dialogEditar.apellidoPersona = registro.item.apellido
      this.dialogEditar.correoPersona = registro.item.correo
      this.dialogEditar.tlfPersona = registro.item.tlf
      this.dialogEditar.status = true
    },

    accDialogEditar: async function () {
      await this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('actualizarUsuarios', this.dialogEditar).then((response) => {
            if (response.data.acc === 'ok') {
              this.$router.push({ name: 'Usuarios.Listado' })
            }
            this.dialogEditar.status = false
            this.$store.commit('toogleSnackbar', response.data)
          })
        }
      })
    }
  }
}
