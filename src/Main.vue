<template>
    <Admin :auth="auth" :dataSource="dataSource">
        <Resource/>
    </Admin>
</template>

<script>
import Admin from "./vuetimin/Admin";
import Resource from "./vuetimin/Resource";

export default {
  data() {
    return {};
  },

  methods: {
    dataSource() {
      const endpoint = "http://localhost:3000/api";
      return {
        GET_LIST(reference, args) {
          console.log(`GET_LIST ${endpoint}/${reference}`);
        },
        GET_ONE(reference, args) {
          console.log(`GET_ONE ${endpoint}/${reference}`);
        },
        CREATE(reference, args) {
          console.log(`CREATE ${endpoint}/${reference}`);
        },
        UPDATE(reference, args) {
          console.log(`UPDATE ${endpoint}/${reference}`);
        },
        DELETE(reference, args) {
          console.log(`DELETE ${endpoint}/${reference}`);
        }
      };
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

  components: {
    Admin,
    Resource
  }
};
</script>