<template>
<Admin :auth="auth" :dataSource="api" :resources="resources" />
</template>

<script>
import Admin from "./vuetimin/Admin"

import Testeresource from "./vuetimin-datasource"

export default {
  data() {
    return {    
      resources: [{
          reference: "user",
          list: {
            fields: [
              {
                text: "id",
                sortable: true,
                source: "id",
                filter: true
              },{
                text: "firstName",
                sortable: true,
                source: "firstName",
                filter: true
              },
              {
                text: "email",
                sortable: true,
                source: "email",
                filter: true
              },
              {
                text: "createdAt",
                sortable: true,
                source: "createdAt",
                filter: true
              }
            ]
          }
      },
        {
          reference: "order",
          list: {
            fields: [
              {
                text: "id",
                sortable: true,
                source: "id",
                filter: true
              },{
                text: "order_number",
                sortable: true,
                source: "order_number",
                filter: true
              },
              {
                text: "status",
                sortable: true,
                source: "status",
                filter: true
              },
              {
                text: "createdAt",
                sortable: true,
                source: "createdAt",
                filter: true
              }
            ]
          }
        },
        {
          reference: "alert",
          list: {
            fields: [
              {
                text: "id",
                sortable: true,
                source: "id",
                filter: true
              },{
                text: "queue",
                sortable: true,
                source: "queue",
                filter: true
              },
              {
                text: "Level",
                sortable: true,
                source: "level",
                filter: true
              },
              {
                text: "createdAt",
                sortable: true,
                source: "createdAt",
                filter: true
              }
            ]
          },
          show: {
            expand: true,
            fields: [
              {
                text: "Message",
                source: "message"
              }
            ]
          },
          edit: {
            fields: [
              {
                text: "name",
                source: "name"
              }
            ]
          },
          new: {
            fields: [
              {
                text: "name",
                source: "name"
              }
            ]
          }
        },
        {
          reference: "hahahaj",
          list: {
            fields: [
              {
                text: "(100g serving)",
                sortable: true,
                source: "name"
              },
              {
                text: "NNN",
                source: "nnn",
                filter: true
              },
              {
                text: "Calories",
                source: "calories"
              },
              {
                text: "Fat (g)",
                source: "fat",
                filter: true
              },
              {
                text: "Carbs (g)",
                source: "carbs"
              },
              {
                text: "Protein (g)",
                source: "protein",
                filter: true
              },
              {
                text: "Iron (%)",
                source: "iron"
              },
              {
                text: "Exists",
                source: "exists",
                filter: true
              }
            ]
          }
        }
      ]
    }
  },

  methods: {
    api(){
      return Testeresource.api()      
    },
    
    auth({ username, password }) {
      if (localStorage.getItem("token") == "true") {
        return true
      }

      if (username === "will" && password === "123") {
        localStorage.setItem("token", "true")

        return true
      }

      return false
    }
  },

  computed: {
    
    Homee() {
      return this.Home
    }
  },
  components: {
    Admin
  }
}
</script>
