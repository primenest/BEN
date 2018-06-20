<template>
  <div id="ToolbarNavigation">
    <v-navigation-drawer
      fixed
      :mini-variant="miniVariant"
      clipped
      v-model="drawer"
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in menuAcciones"
          :key="i"
          exact
          :to="item.to"
        >
          <v-list-tile-action>
            <v-icon light v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app clipped-left>
      <v-toolbar-title v-text="title" class="mr-3"></v-toolbar-title>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" light></v-toolbar-side-icon>
      <v-btn
        icon
        light
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        icon
        light
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer
      temporary
      right
      v-model="rightDrawer"
      fixed
    >
       <v-list>
          <v-subheader>Top 100</v-subheader>
          <template v-for="(item, index) in markets">
            <v-list-tile
              avatar
              ripple
              @click="apertura(index)"
              :key="item.symbol"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ item.name }} ({{ item.symbol }})</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.price_usd }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text :class="[item.percent_change_24h > 0 ? 'green--text' : 'red--text']"
                >{{ item.percent_change_24h }}</v-list-tile-action-text>
                <v-icon
                  color="grey lighten-1"
                  v-if="selected.indexOf(index) < 0"
                  >star_border</v-icon>
                  <v-icon
                  color="yellow darken-2"
                  v-else
                  >star</v-icon>
              </v-list-tile-action>

            </v-list-tile>
          </template>
        </v-list>

        <v-dialog v-model="dialogEntrada.status" persistent max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Crear Entrada</span>
            </v-card-title>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-select
                      required
                      label="Market "
                      :items="markets"
                      item-text = "name"
                      item-value = "symbol"
                      v-model = "dialogEntrada.SimboloMoneda"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      required
                      autofocus
                      prefix="$"
                      type="text"
                      tabindex = "1"
                      data-vv-name = "pEntrada"
                      label="Precio de Entrada "
                      data-vv-as = "precio de entrada"
                      v-validate="'required|decimal:8'"
                      v-model = "dialogEntrada.PrecioEntrada"
                      :error-messages="errors.collect('pEntrada')"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>* indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialogEntrada.status = false">Cerrar</v-btn>
              <v-btn color="blue darken-1" flat @click.native="submit">Crear</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    </v-navigation-drawer>
  </div>
</template>

<script>
  export default {
    name: 'toolbar',

    data () {
      return {
        drawer: true,
        menuAcciones: [
          { icon: 'dashboard', title: 'Dashborad', to: '/Dashboard' },
          { icon: 'swap_horiz', title: 'Pares', to: '/Nimda/Markets' },
          { icon: 'account_box', title: 'Usuarios', to: '/Usuarios' }
        ],

        selected: [],

        dialogEntrada: {
          status: false,
          txt: '',
          SimboloMoneda: '',
          PrecioEntrada: ''
        },

        miniVariant: true,
        rightDrawer: false,
        title: 'UCTBS'
      }
    },

    created: function () {
      this.traerMarkets()
    },

    computed: {
      markets: function () {
        return this.$store.state.markets.marketsStore
      }
    },

    methods: {
      traerMarkets: async function () {
        await this.$store.dispatch('listMarkets')
      },

      apertura (index) {
        this.dialogEntrada.status = true
        this.dialogEntrada.SimboloMoneda = this.markets[index].symbol
        this.dialogEntrada.PrecioEntrada = this.markets[index].price_usd
      },

      submit: async function () {
        await this.$validator.validateAll().then((result) => {
          if (result) {
            this.dialogEntrada.status = false
            this.$store.dispatch('guardarMarkets', this.dialogEntrada).then((response) => {
              this.traerMarkets()
              // this.$store.commit('toogleSnackbar', response.data)
            })
          }
        })
      }
    }

  }
</script>