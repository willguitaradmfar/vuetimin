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
              <DiscoveryInput :loading="loading" :data="form" :item="item" />            
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
  props: ["new", "reference"],
  watch: {},
  data: () => ({
    snackbarText: "",
    snackbar: false,
    loading: false,
    localList: {
      fields: []
    }
  }),
  computed: {
    form() {
      return this.$store.state[this.reference].form;
    }
  },
  created() {
    this.load();
  },
  components: {
    DiscoveryInput
  },
  methods: {
    load() {
      /**
       * INICIALIZAÇÃO DOS DADOS
       */
      for (let field of this.new.fields) {
        this.form[field.source] = undefined;
      }

      this.$data.localList.fields = this.new.fields.map(field => ({
        ...field,
        value: field.source
      }));
    },
    save() {
      this.$data.loading = true;

      const args = {
        data: this.localList.fields.reduce((acc, item) => {
          acc[item.source] = this.form[item.source];
          return acc;
        }, {})
      };

      this.$store
        .dispatch(`${this.reference}/create`, args)
        .then(response => {
          this.$router.push(`/${this.reference}/${response.id}/show`);
        })
        .catch(err => {
          this.$data.snackbarText = err.message;
          this.$data.loading = false;
          this.$data.snackbar = true;
        });
    }
  }
};
</script>
