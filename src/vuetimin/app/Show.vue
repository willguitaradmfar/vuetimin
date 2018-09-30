<template>
  <v-card>
      <v-dialog v-model="dialog" max-width="550">
          <v-card>
              <v-card-title class="headline">Remover ?</v-card-title>

              <v-card-text>Deseja remover esse registro ?</v-card-text>

              <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn color="secondary darken-1" flat="flat" @click="dialog = false">
                      Cancelar
                  </v-btn>

                  <v-btn color="primary darken-1" flat="flat" @click="remove">
                      Sim
                  </v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>
      <v-toolbar card>
          <v-btn color="info" fab small :to="'/' + reference" v-if="list">
              <v-icon>reply</v-icon>
          </v-btn>
          <v-toolbar-title>{{reference}} #{{ $route.params.id || params.id }}</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn :loading="loading" color="info" fab small @click="load">
              <v-icon>refresh</v-icon>
          </v-btn>
          <v-btn color="warning" :to="'/' + reference + '/' + $route.params.id + '/edit'" fab small v-if="edit && !editFn">
              <v-icon>create</v-icon>
          </v-btn>
          <v-btn color="warning" @click="editFn()" fab small v-if="edit && editFn">
              <v-icon>create</v-icon>
          </v-btn>
          <v-btn color="error" fab small @click="dialog = true" :loading="removing">
              <v-icon>delete</v-icon>
          </v-btn>
      </v-toolbar>
      <v-card-text>        
        <v-layout row wrap>
          <v-flex v-for="item in localList.fields" v-bind:key="item.source">          
              <DiscoveryInput :data="data" :item="item" :disabled="true" />
          </v-flex>
        </v-layout>        
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="true" color="success">
              Save
          </v-btn>
      </v-card-actions>
      <v-snackbar v-model="snackbar" color="error" :bottom="true" :multi-line="true" :timeout="7000">
          {{ snackbarText }}
          <v-btn color="white" flat @click="snackbar = false">
              Close
          </v-btn>
      </v-snackbar>
  </v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import DiscoveryInput from "../discovery/inputs/DiscoveryInput";

export default {
  props: ["show", "list", "edit", "reference", "params", "closeFn", "editFn"],
  data: () => ({
    snackbarText: "",
    snackbar: false,
    data: {},
    loading: true,
    removing: false,
    dialog: false,
    localList: {
      fields: []
    }
  }),
  components: {
    DiscoveryInput
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$data.localList.fields = this.show.fields.map(field => ({
        ...field,
        value: field.source
      }));

      this.$data.loading = true;

      const args = {
        ...(this.params || this.$route.params)
      };

      this.$store
        .dispatch(`${this.reference}/getOne`, args)
        .then(response => {
          this.$data.data = response;
          this.$data.loading = false;
        })
        .catch(err => {
          this.$data.snackbarText = err.message;
          this.$data.loading = false;
          this.$data.data = {};
          this.$data.snackbar = true;
        });
    },
    remove() {
      this.$data.removing = true;
      this.$data.dialog = false;

      const args = this.params || this.$route.params;

      this.$store
        .dispatch(`${this.reference}/delete`, args)
        .then(response => {
          this.$data.removing = false;

          if (this.closeFn) {
            this.closeFn();
          } else {
            this.$router.push(`/${this.reference}`);
          }
        })
        .catch(err => {
          this.$data.snackbarText = err.message;
          this.$data.loading = false;
          this.$data.removing = false;
          this.$data.snackbar = true;
        });
    }
  }
};
</script>
