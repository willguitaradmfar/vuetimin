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
        <v-container>
            <v-text-field :disabled="loading" v-for="item in localList.fields" v-bind:key="item.source" v-model="data[item.source]" :counter="10" :label="item.text" required></v-text-field>
        </v-container>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loading" color="success" @click="save">
            Save
        </v-btn>
    </v-card-actions>
</v-card>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import axios from "axios";

export default {
  props: ["new", "dataSource", "reference"],
  watch: {},
  data: () => ({
    data: {},
    loading: false,
    datasource: null,
    localList: {
      fields: []
    }
  }),
  created() {
    this.load();
  },
  methods: {
    load() {

      this.$data.datasource = this.dataSource();

      this.$data.localList.fields = this.new.fields.map(field => ({
        ...field,
        value: field.source
      }));

    },
    save() {
      this.$data.loading = true;
      this.datasource.CREATE(
        this.reference,
        {
          data: this.localList.fields.reduce((acc, item) => {
            acc[item.source] = this.data[item.source];
            return acc;
          }, {})
        },
        response => {
          this.$router.push(`/${this.reference}/${response.id}/show`);
        }
      );
    }
  }
};
</script>
