<template>
<Admin v-if="metadata.length" />
</template>
<script>
import Admin from "./Admin";

import { mapActions } from 'vuex';

export default {

  async created() {
    this.makeCRUD()
    await this.$store.dispatch('getResources')
  },

  methods: {
    ...mapActions(['makeCRUD'])    
  },

  computed: {
    metadata(){
      return this.$store.state.metadata
    },
    Homee() {
      return this.Home;
    }
  },
  components: {
    Admin
  }
};
</script>
