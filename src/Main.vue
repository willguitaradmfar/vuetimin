<template>
<Admin :auth="auth" :dataSource="dataSource" :resources="resources" />
</template>
<script>
import Admin from "./vuetimin/Admin";

import Testeresource from "./vuetimin-datasource";

export default {
  data() {
    return {
      resources: [
        {
          reference: "customer",
          show: {
            fields: [
              {
                text: "First Name",
                sortable: true,
                source: "firstName"
              },
              {
                text: "email",
                sortable: true,
                source: "email"
              },
              {
                text: "IP",
                sortable: true,
                source: "ip"
              },
              {
                text: "price",
                sortable: true,
                source: "price"
              }
            ]
          },
          list: {
            fields: [
              {
                text: "First Name",
                sortable: true,
                source: "firstName"
              },
              {
                text: "email",
                sortable: true,
                source: "email"
              },
              {
                text: "IP",
                sortable: true,
                source: "ip"
              },
              {
                text: "price",
                sortable: true,
                source: "price"
              }
            ]
          }
        }
      ]
    };
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
