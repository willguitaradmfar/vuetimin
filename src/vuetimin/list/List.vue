<template>
  <div>
    <v-data-table
      :headers="list.fields"
      :items="desserts"
      :search="search"
      class="elevation-1"
    >   
      <template slot="headerCell" slot-scope="props">
        <v-tooltip bottom>
          <span slot="activator">
            {{ props.header.text }}
          </span>
          <span>
            {{ props.header.text }}
          </span>
        </v-tooltip>
      </template>
      <template slot="items" slot-scope="props">
        <td  v-for="item in list.fields" v-bind:key="item.source">{{ props.item[item.source] }}</td>
      </template>
    </v-data-table>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->


<script>
export default {
  created() {
    this.list.fields = this.list.fields.map(field => ({
      ...field,
      value: field.source
    }))
    this.$data.desserts = this.dataSource().GET_LIST(this.reference)
  },
  props: ['list', 'dataSource', 'reference'],
  data() {
    return {
      search: "",
      desserts: []
    };
  }
};
</script>