<template>
  <v-container>
    <v-layout>
      <v-flex sm12 md6 offset-md3>
        <v-card>
          <v-card-media >
            <v-flex
              md12
              text-md-center
              layout
              align-center
              justify-center
              class="mt-4"
            >
              <v-avatar
                size="150"
              >
                  <img src="/static/img/logo.png" alt="avatar">
              </v-avatar>
            </v-flex>
          </v-card-media>

          <v-card-text>
            <form>
              <v-text-field
                name="correo"
                v-model="inputs.CorreoPersona"
                label="E-mail "
                min="6"
                :error-messages="errors.collect('e-mail')"
                v-validate="'required|email'"
                data-vv-name="e-mail"
                prepend-icon="mail"
                required
              ></v-text-field>

              <v-text-field
                name="clave"
                v-model="inputs.clave"
                label="Password "
                min="6"
                max="15"
                :error-messages="errors.collect('password')"
                v-validate="'required|min:6'"
                data-vv-name="password"
                prepend-icon="lock"
                required
                :type = "toogleClave ? 'password' : 'text'"
                :append-icon = "toogleClave ? 'visibility' : 'visibility_off'"
                :append-icon-cb = "() => (toogleClave = !toogleClave)"
              ></v-text-field>

              <v-text-field
                name="reclave"
                v-model="inputs.reclave"
                label="Confirm  Password "
                min="6"
                max="15"
                :error-messages="errors.collect('confirm password')"
                v-validate="'required|min:6|confirmed:clave'"
                data-vv-name="confirm password"
                prepend-icon="lock"
                required
                :type = "tooglereClave ? 'password' : 'text'"
                :append-icon = "tooglereClave ? 'visibility' : 'visibility_off'"
                :append-icon-cb = "() => (tooglereClave = !tooglereClave)"
              ></v-text-field>

              <v-checkbox
                v-validate="'required'"
                v-model="inputs.checkbox"
                :error-messages="errors.collect('checkbox')"
                value="1"
                label="I accept the User Agreement and Privacy Policy. "
                data-vv-name="checkbox"
                type="checkbox"
                required
              ></v-checkbox>
            </form>
          </v-card-text>

          <v-card-actions class="pa-3">
            <v-spacer></v-spacer>
            <v-btn flat @click="clear">CLEAR</v-btn>
            <v-btn color="primary" block @click="submit">SIGN UP</v-btn>
          </v-card-actions>
      </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script src="./signup.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./signup.scss"></style>
