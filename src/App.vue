<template>
  <v-app light toolbar>
    <router-view></router-view>
    <cambioClave></cambioClave>
    <v-snackbar
      :bottom="true"
      :success="snackbar.context === 'success'"
      :info="snackbar.context === 'info'"
      :warning="snackbar.context === 'warning'"
      :error="snackbar.context === 'error'"
      :primary="snackbar.context === 'primary'"
      :secondary="snackbar.context === 'secondary'"
      v-model="snackbar.status"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.status = false">Close</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
  export default {
    name: 'app',

    computed: {
      snackbar: {
        get: function () {
          return this.$store.state.snackbar.snackbarStore
        }
      }
    }
  }
</script>