<template>
  <Admin v-if='metadata.length' />
</template>
<script>
import Admin from "./Admin";

import { mapActions } from "vuex";

import store from "./store";

export default {
  beforeCreate() {
    this.$store.registerModule("vuetimin", {
      namespaced: true,
      ...store
    });
  },

  async created() {
    this.makeCRUD();
    await this.getResources();
  },

  methods: {
    ...mapActions("vuetimin", ["makeCRUD", "getResources"])
  },

  computed: {
    metadata() {
      return this.$store.state.vuetimin.metadata;
    }
  },
  components: {
    Admin
  }
};
</script>
