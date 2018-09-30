<template>
  <v-card>
      <v-toolbar card>
          <v-btn color="info" fab small :to="'/' + reference" v-if="list">
              <v-icon>reply</v-icon>
          </v-btn>
          <v-toolbar-title>{{reference}} #{{ $route.params.id || params.id }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="white" :to="'/' + reference + '/' + $route.params.id + '/show'" fab small  v-if="show && !closeFn">
              <v-icon>close</v-icon>
          </v-btn>
          <v-btn color="white" @click="closeFn()" fab small  v-if="show && closeFn">
              <v-icon>close</v-icon>
          </v-btn>
      </v-toolbar>
      <v-card-text>      
        <v-layout row wrap>
            <v-flex v-for="item in localList.fields" v-bind:key="item.source"> 
                <DiscoveryInput :data="data" :item="item" :disabled="loading || lock" />
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
  props: ["list", "edit", "show", "params", "reference", "closeFn", "showFn"],
  components: {
    DiscoveryInput
  },
  data: () => ({
    snackbarText: "",
    snackbar: false,
    data: {},
    loading: true,
    lock: false,
    localList: {
      fields: []
    }
  }),
  created() {
    this.load();
  },
  methods: {
    load() {
      this.$data.localList.fields = this.edit.fields.map(field => ({
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
            this.$data.lock = true;
            this.$data.data = {};
            this.$data.snackbar = true
        });
    },
    save() {
      this.$data.loading = true;

      const args = {
        data: this.localList.fields.reduce((acc, item) => {
          acc[item.source] = this.data[item.source];
          return acc;
        }, {}),
        id: this.$route.params.id || this.params.id
      };

      this.$store
        .dispatch(`${this.reference}/update`, args)
        .then(response => {
          if (this.showFn) {
            this.showFn();
          } else {
            this.$router.push(
              `/${this.reference}/${this.$route.params.id}/show`
            );
          }
        })
        .catch(err => {
            this.$data.snackbarText = err.message;
            this.$data.loading = false;
            this.$data.snackbar = true
        });
    }
  }
};
</script>
