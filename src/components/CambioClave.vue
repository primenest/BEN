<template>
  <v-dialog v-model="cambioClave.status" persistent max-width="500px">
    <v-card>
        <v-card-title>
          <span class="headline">Cambiar Clave</span>
        </v-card-title>
        <form>
          <v-card-text>
            <v-text-field
              autofocus
              name="claveField"
              v-model="cambioClave.ClaveUsuarios"
              label="Clave del Usuario "
              min="6"
              max="15"
              :error-messages="errors.collect('claveField')"
              v-validate="'required|min:6'"
              data-vv-name="claveField"
              type="password"
              required
            ></v-text-field>

            <v-text-field
              name="confirmField"
              v-model="cambioClave.ConfirmClave"
              label="Confirmar Clave "
              min="6"
              max="15"
              :error-messages="errors.collect('confirm')"
              v-validate="{required: true, is: cambioClave.ClaveUsuarios}"
              data-vv-name="confirm"
              required
              type="password"
            ></v-text-field>
          </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat color="blue darken-1" @click.native="cambioClave.status = false">Close</v-btn>
          <v-btn class="blue--text darken-1" flat @click.native="submitCambioClave">Save</v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'cambioClave',

  computed: {
    cambioClave: {
      get: function () {
        return this.$store.state.cambioClave.dataCambioClave
      }
    }
  },

  methods: {
    submitCambioClave: async function () {
      await this.$validator.validateAll().then((result) => {
        if (result) {
          this.$store.dispatch('cambioClaveUsuarios', this.cambioClave).then((response) => {
            this.cambioClave.status = false
            this.$store.commit('toogleSnackbar', response.data)
          })
        }
      })
    }
  }
}
</script>
