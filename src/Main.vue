<template>
    <Admin :auth="auth" :dataSource="dataSource" :resources="resources"/>
</template>

<script>
import Admin from "./vuetimin/Admin";

export default {
  data() {
    return {
      resources: [{
          reference: "hahahaj",
          list: {
            fields: [{
                text: "asdfadsfDessert (100g serving)",
                align: "left",
                sortable: true,
                source: "name"
              },
              { text: "Calories", source: "calories" },
              { text: "Fat (g)", source: "fat" },
              { text: "Carbs (g)", source: "carbs" },
              { text: "Protein (g)", source: "protein" },
              { text: "Iron (%)", source: "iron" },
              { text: "Iron (%)", source: "iron" },
              { text: "Iron (%)", source: "iron" },
              { text: "Iron (%)", source: "iron" },
              { text: "Iron (%)", source: "ironH" },
            ]
          }
        },
        {
          reference: "teste",
          list: {
            fields: [{
                text: "asdfadsfDessert (100g serving)",
                align: "left",
                sortable: true,
                source: "name"
              },
              { text: "Calories", source: "calories" },
              { text: "Fat (g)", source: "fat" },
              { text: "Carbs (g)", source: "carbs" },
              { text: "Protein (g)", source: "protein" },
              { text: "Iron (%)", source: "iron" },
              { text: "Iron (%)", source: "iron" },
              { text: "Iron (%)", source: "iron" },
              { text: "Iron (%)", source: "iron" },
              { text: "Iron (%)", source: "iron" },
            ]
          }
        }
      ]
    };
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