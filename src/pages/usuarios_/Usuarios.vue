<template>
  <v-app light>
    <ToolbarNavigation></ToolbarNavigation>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-container fluid grid-list-md>

            <v-card>
              <v-card-title>
                <v-flex xs2>
                  <v-select
                    v-bind:items="tipoEstatus"
                    v-model="estatus"
                    label="Listar estatus:"
                    single-line
                    bottom
                  ></v-select>
                </v-flex>

                <v-spacer></v-spacer>

                <v-flex xs4>
                  <v-text-field
                    append-icon="search"
                    label="Search"
                    single-line
                    hide-details
                    v-model="search"
                  ></v-text-field>
                </v-flex>
              </v-card-title>

              <v-data-table
                :headers="headers"
                :items="usuarios"
                :search="search"
                :rows-per-page-items="rowsPerPageItems"
                :rows-per-page-text="rowsPerPageText"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-center">
                    <v-speed-dial
                      direction="right"
                      open-on-hover
                      transition="slide-y-reverse-transition"
                    >

                      <v-btn
                        slot="activator"
                        class="blue elevation-0"
                        dark
                        small
                        fab
                      >
                        <v-icon>add</v-icon>
                      </v-btn>

                      <v-tooltip top>
                        <v-btn
                          fab
                          dark
                          small
                          class="green"
                          slot="activator"
                          @click.native.stop="llamarDialogEditar(props)"
                        >
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <span>Editar usuario</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <v-btn
                          fab
                          dark
                          small
                          class="indigo"
                          slot="activator"
                          @click.native.stop="llamarDialogCambioClave(props)"
                        >
                          <v-icon>vpn_key</v-icon>
                        </v-btn>
                        <span>Cambiar clave</span>
                      </v-tooltip>

                      <v-tooltip top>
                        <v-btn
                          fab
                          dark
                          small
                          class="red"
                          slot="activator"
                          @click.native.stop="llamarDialogStatus(props, 'elimnd')"
                        >
                          <v-icon>delete</v-icon>
                        </v-btn>
                        <span>Eliminar usuario</span>
                      </v-tooltip>

                    </v-speed-dial>
                  </td>
                  <td> {{ props.item.correo }} </td>
                  <td>{{ props.item.nombre }}</td>
                  <td>{{ props.item.apellido }}</td>
                  <td class="text-xs-center">
                    <v-btn dark v-if="props.item.estatus === 'act'"
                      class="elevation-0 light-green px-2"
                      @click.native.stop="llamarDialogStatus(props, 'desact')"
                    >
                      ACTIVO
                    </v-btn>
                    <v-btn blue dark  v-else-if="props.item.estatus === 'desact'"
                      class="elevation-0 red"
                      @click.native.stop="llamarDialogStatus(props, 'act')"
                    >
                      INACTIVO
                    </v-btn>
                  </td>
                </template>
                <template slot="pageText" slot-scope="{ pageStart, pageStop }">
                  del  {{ pageStart }} al {{ pageStop }}
                </template>
              </v-data-table>
            </v-card>

            <!-- DIALOGO PARA SOLICITAR LA CONFIRMACION DE QUE DESEA ELIMINAR EL USUARIO -->
            <v-dialog v-model="dialogStatus.status" max-width="500px">
              <v-card>
                <v-card-title class="headline">CONFIRMACION</v-card-title>
                <v-card-text>{{ dialogStatus.txt }}</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn :class="[this.dialogStatus.clorBtn, 'darken-1']" flat @click.native="accCambiarEstatus">{{ dialogStatus.txtBtn  }}</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-dialog v-model="dialogEditar.status" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Editar Usuario</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6>
                          <v-text-field
                            required
                            label="Nombre "
                            data-vv-name="nombre"
                            v-validate="'required'"
                            v-model="dialogEditar.nombrePersona"
                            :error-messages="errors.collect('nombre')"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6>
                          <v-text-field
                            required
                            label="Apellido "
                            data-vv-name="apellido"
                            v-validate="'required'"
                            v-model="dialogEditar.apellidoPersona"
                            :error-messages="errors.collect('apellido')"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            min="6"
                            required
                            name="email"
                            label="E-mail "
                            data-vv-name="e-mail"
                            v-validate="'required|email'"
                            v-model="dialogEditar.correoPersona"
                            :error-messages="errors.collect('e-mail')"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            required
                            label="Phone Number "
                            data-vv-name="tlf"
                            v-validate="'required'"
                            v-model="dialogEditar.tlfPersona"
                            :error-messages="errors.collect('tlf')"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                    <small>* indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="dialogEditar.status = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click.native.stop="accDialogEditar()">Save</v-btn>
                  </v-card-actions>
                </v-card>
            </v-dialog>

          </v-container>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script src="./usuarios.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./usuarios.scss"></style>