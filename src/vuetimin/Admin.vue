<template>
  <div>
      <Login v-if="needAuth"/>
      <App v-if="!needAuth"/>
  </div>
</template>

<script>
import App from "./app/Main";
import Login from "./login/Login";

import { mapActions } from 'vuex';

export default {
  name: "Admin",
  created() {

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
  components: {
    App,
    Login
  }
};
</script>