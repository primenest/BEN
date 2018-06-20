<template>
  <v-container id="login">
  <v-layout>
    <v-flex sm12 md6 offset-md3>
      <v-card>
        <v-card-media height="200px" class="pa-2">
        <v-flex
            md12
            text-md-center
            layout
            align-center
            justify-center
          >
          <v-avatar
            :tile="true"
            size="150"
            class="lighten-4"
          >
              <img src="/static/img/logo.png" alt="avatar">
          </v-avatar>
          </v-flex>
        </v-card-media>

        <v-card-text>
          <form>
            <v-text-field
              name="correo"
              v-model="correo"
              label="Correo "
              min="6"
              :error-messages="errors.collect('correo')"
              v-validate="'required|email'"
              data-vv-name="correo"
              prepend-icon="perm_identity"
              required
            ></v-text-field>

            <v-text-field
              name="clave"
              v-model="clave"
              label="Clave "
              min="6"
              max="15"
              hint="Al menos 6 carácteres"
              :error-messages="errors.collect('clave')"
              v-validate="'required|min:6'"
              data-vv-name="clave"
              prepend-icon="lock"
              required
              :type = "toogleClave ? 'password' : 'text'"
              :append-icon = "toogleClave ? 'visibility' : 'visibility_off'"
              :append-icon-cb = "() => (toogleClave = !toogleClave)"
            ></v-text-field>
          </form>
        </v-card-text>

        <v-card-actions class="pa-3">
          <v-spacer></v-spacer>
          <v-btn flat @click="clear">LIMPIAR</v-btn>
          <v-btn color="primary" block @click="submit">INICIAR</v-btn>
        </v-card-actions>
      </v-card>
      <p class="text-xs-right pt-4">¿Recuperar Contraseña?</p class="text-xs-right">
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script src="./login.js"></script>

<style scoped src="./login.scss"></style>