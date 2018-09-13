<template>
<Admin :auth="auth" :dataSource="dataSource" :resources="resources" v-if="resources.length" />
</template>
<script>
import Admin from "./vuetimin/Admin";

import Testeresource from "./vuetimin-datasource";

import data from "./util";

export default {
  data() {
    return {
      resources: []
    };
  },

  async created() {
    const res = await data.get()
    this.$data.resources = res.data.resources
  },

  methods: {
    dataSource() {
      return Testeresource.mock();
    },

    auth({ username, password }) {
      if (localStorage.getItem("token") == "true") {
        return true;
      }

      if (username === "will" && password === "123") {
        localStorage.setItem("token", "true");

        return true;
      }

      return false;
    }
  },

  computed: {
    Homee() {
      return this.Home;
    }
  },
  components: {
    Admin
  }
};
</script>
