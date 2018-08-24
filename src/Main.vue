<template>
    <Admin :auth="auth" :dataSource="dataSource" :resources="resources"/>
</template>

<script>
import Admin from "./vuetimin/Admin";

export default {
  data() {
    return {
      resources: [
        {
          reference: "hahahaj",
          list: {
            fields: [
              {
                text: "(100g serving)",
                align: "left",
                sortable: true,
                source: "name"
              },
              { text: "NNN", source: "nnn" },
              { text: "Calories", source: "calories" },
              { text: "Fat (g)", source: "fat" },
              { text: "Carbs (g)", source: "carbs" },
              { text: "Protein (g)", source: "protein" },
              { text: "Iron (%)", source: "iron" }
            ]
          }
        },
        {
          reference: "teste",
          list: {
            fields: [
              {
                text: "asdfadsfDessert (100g serving)",
                align: "left",
                sortable: true,
                source: "name"
              },
              { text: "Calories", source: "calories" },
              { text: "Fat (g)", source: "fat" },
              { text: "Carbs (g)", source: "carbs" },
              { text: "Protein (g)", source: "protein" },
              { text: "Iron (%)", source: "iron" }
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

          return [
            {
              value: false,
              name: "Frozen Yogurt",
              calories: 159,
              nnn: 'teste',
              fat: 6.0,
              carbs: 24,
              protein: 4.0,
              iron: "1%"
            },
            {
              value: false,
              name: "Ice cream sandwich",
              calories: 237,
              fat: 9.0,
              carbs: 37,
              protein: 4.3,
              iron: "1%"
            },
            {
              value: false,
              name: "Eclair",
              calories: 262,
              fat: 16.0,
              carbs: 23,
              protein: 6.0,
              iron: "7%"
            },
            {
              value: false,
              name: "Cupcake",
              calories: 305,
              fat: 3.7,
              carbs: 67,
              protein: 4.3,
              iron: "8%"
            },
            {
              value: false,
              name: "Gingerbread",
              calories: 356,
              fat: 16.0,
              carbs: 49,
              protein: 3.9,
              iron: "16%"
            },
            {
              value: false,
              name: "Jelly bean",
              calories: 375,
              fat: 0.0,
              carbs: 94,
              protein: 0.0,
              iron: "0%"
            },
            {
              value: false,
              name: "Lollipop",
              calories: 392,
              fat: 0.2,
              carbs: 98,
              protein: 0,
              iron: "2%"
            },
            {
              value: false,
              name: "Honeycomb",
              calories: 408,
              fat: 3.2,
              carbs: 87,
              protein: 6.5,
              iron: "45%"
            },
            {
              value: false,
              name: "Donut",
              calories: 452,
              fat: 25.0,
              carbs: 51,
              protein: 4.9,
              iron: "22%"
            },
            {
              value: false,
              name: "KitKat",
              calories: 518,
              fat: 26.0,
              carbs: 65,
              protein: 7,
              iron: "6%"
            }
          ];
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