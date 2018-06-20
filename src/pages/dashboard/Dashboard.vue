<template>
  <v-app light>
    <ToolbarNavigation></ToolbarNavigation>
    <v-content>
      <v-container fluid>
        <v-slide-y-transition mode="out-in">
          <v-container fluid grid-list-md>
            <v-data-iterator
              content-tag="v-layout"
              row
              wrap
              :items="transacciones"
              :rows-per-page-items="rowsPerPageItems"
              :pagination.sync="pagination"
            >
              <v-flex
                slot="item"
                slot-scope="props"
                xs12
                sm6
                md4
                lg3
              >
                <v-card>
                  <v-card-title><h4>{{ props.item.simbolo }}</h4></v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-tile>
                      <v-list-tile-content>Apertura:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.precio }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Diferencial:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.dfrncial }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Break Even:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.be }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Target 2%:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.t2 }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Target 5%:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.t5 }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Target 10%:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.t10 }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Stop Loss:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ props.item.sl }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </v-data-iterator>
          </v-container>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script src="./dashboard.js"></script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="./dashboard.scss"></style>
