<template>
<div>
    <Login v-if="hasLogin" :authHandler="authHandler"/>
    <App v-if="!hasLogin" :resources="$attrs.resources"/>
</div>
</template>

<script>
import App from "./App";
import Login from "./Login";

export default {
  name: "Admin",
  created() {
    this.$data.dataSource = this.$attrs.dataSource;

    if (this.$attrs.auth) {
      if (typeof this.$attrs.auth !== "function")
        throw new Error("auth need be a function");

      this.$data.authHandler = args => {
        this.hasLogin = !this.$attrs.auth(args);
      };

      this.$data.authHandler({});
    }   
  },
  data() {
    return {
      dataSource: "",
      authHandler: () => {
        console.log("Login not implemented")
      },
      hasLogin: true
    };
  },
  components: {
    App,
    Login
  }
};
</script>