<template>
  <v-card>
      <v-toolbar card>
          <v-btn color="info" fab small :to="'/' + reference">
              <v-icon>reply</v-icon>
          </v-btn>
          <v-toolbar-title>{{reference}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" :to="'/' + reference" fab small>
              <v-icon>close</v-icon>
          </v-btn>
      </v-toolbar>
      <v-card-text>
          <v-layout row wrap>
            <v-flex v-for="item in localList.fields" v-bind:key="item.source">            
                  <DiscoveryInput :loading="loading" :data="data" :item="item" />            
            </v-flex>
          </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="loading" color="success" @click="save">
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
  props: ["new", "dataSource", "reference"],
  watch: {},
  data: () => ({
    snackbarText: "",
    snackbar: false,
    data: {},
    loading: false,
    localList: {
      fields: []
    }
  }),
  created() {
    this.load();
  },
  computed:{
    CRUD() {
      return this.$store.state.CRUD;
    }
  },
  components: {
    DiscoveryInput
  },
  methods: {
    load() {

      /**
       * INICIALIZAÇÃO DOS DADOS
       */
      for(let field of this.new.fields){
          this.$data.data[field.source] = undefined
      }

      this.$data.localList.fields = this.new.fields.map(field => ({
        ...field,
        value: field.source
      }));
    },
    save() {
      this.$data.loading = true;
      this.CRUD.CREATE(
        this.reference,
        {
          data: this.localList.fields.reduce((acc, item) => {
            acc[item.source] = this.data[item.source];
            return acc;
          }, {})
        },
        (err, response) => {
          if (err) {
            this.$data.snackbarText = err.message;
            this.$data.loading = false;
            return (this.$data.snackbar = true);
          }
          this.$router.push(`/${this.reference}/${response.id}/show`);
        }
      );
    }
  }
};
</script>
