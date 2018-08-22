<template>
<div>
    <Login v-if="hasLogin" :authHandler="authHandler"/>
    <App v-if="!hasLogin"/>
</div>
</template>

<script>
import App from "./App";

import Login from "./Login";

export default {
  name: "Admin",

  mounted() {
    console.log(this.$attrs);

    for (let i of this.$slots.default) {
      console.log(i);
    }

    // pass reference and args
    this.$data.dataSource = this.$attrs.dataSource;

    if (this.$attrs.auth) {
      if (typeof this.$attrs.auth !== "function")
        throw new Error("auth need be a function");

      this.$data.authHandler = args => {
        this.hasLogin = !this.$attrs.auth(args);
      };

      this.$data.authHandler({})
    }
  },

  computed: {},

  data() {
    return {
      dataSource: "",
      authHandler: () => console.log("Login not implemented"),
      hasLogin: true
    };
  },

  components: {
    App,
    Login
  }
};
</script>