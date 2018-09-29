<template>
<div>
    <Login v-if="needAuth" :authHandler="auth"/>
    <App v-if="!needAuth"/>
</div>
</template>

<script>
import App from "./App";
import Login from "./Login";

import { mapActions } from 'vuex';

export default {
  name: "Admin",
  created() {
    this.$data.metadata = this.$attrs.metadata;

    if (this.auth) {
      if (typeof this.auth !== "function")
        throw new Error("auth need be a function");

      this.auth({});
    }   
  },
  methods: {
    ...mapActions('vuetimin', ['auth'])
  },
  computed: {
    needAuth() {
      return this.$store.state.vuetimin.needAuth
    }
  },
  data() {
    return {
      dataSource: "",
      authHandler: () => {
        console.log("Login not implemented")
      }
    };
  },
  components: {
    App,
    Login
  }
};
</script>