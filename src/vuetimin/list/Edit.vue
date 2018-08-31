<template>
<v-card>
    <v-toolbar card>
        <v-btn color="info" fab small :to="'/' + reference">
            <v-icon>reply</v-icon>
        </v-btn>
        <v-toolbar-title>{{reference}}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="white" :to="'/' + reference + '/' + id + '/show'" fab small>
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
  props: ["edit", "dataSource", "reference"],
  watch: {},
  data: () => ({
    id: 0,
    data: {},
    loading: true,
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
      this.$data.id = this.$route.params.id;

      this.$data.datasource = this.dataSource();

      this.$data.localList.fields = this.edit.fields.map(field => ({
        ...field,
        value: field.source
      }));

      this.$data.loading = true;

      this.datasource.GET_ONE(
        this.reference,
        {
          ...this.$route.params
        },
        response => {
          this.$data.data = response;
          this.$data.loading = false;
        }
      );
    },
    save() {
      this.$data.loading = true;
      this.datasource.UPDATE(
        this.reference,
        {
          data: this.localList.fields.reduce((acc, item) => {
            acc[item.source] = this.data[item.source];
            return acc;
          }, {}),
          id: this.id
        },
        response => {
          this.$router.push(`/${this.reference}/${this.id}/show`);
        }
      );
    }
  }
};
</script>
