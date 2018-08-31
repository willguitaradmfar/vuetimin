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
          new: {
            fields: [
              {
                text: "First Name",
                source: "firstName"
              },
              {
                text: "email",
                source: "email"
              },
              {
                text: "Mac",
                source: "mac"
              }
            ]
          },
          edit: {
            fields: [
              {
                text: "First Name",
                source: "firstName"
              },
              {
                text: "email",
                source: "email"
              },
              {
                text: "Mac",
                source: "mac"
              }
            ]
          },
          show: {
            fields: [
              {
                text: "First Name",
                source: "firstName"
              },
              {
                text: "email",
                source: "email"
              },
              {
                text: "IP",
                source: "ip"
              },
              {
                text: "price",
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
                text: "Mac",
                sortable: true,
                source: "mac"
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
