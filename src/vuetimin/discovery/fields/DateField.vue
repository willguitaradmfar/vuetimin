<template>
  <span>{{ dateFormatted }}</span>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import moment from "moment";

export default {
  props: ["data", "item"],  
  computed: {
    dateFormatted: {
      get(){

        const date = moment(this.data[this.item.source])

        if(date._d.toString() === 'Invalid date') return

        this.date = date.format("YYYY-MM-DD");

        return date.format(this.hint);
      }
    }
  },
  data(){
    return {
      hint: this.item.reference && this.item.reference.hint ? this.item.reference.hint :  'DD/MM/YYYY'
    }
  }
};
</script>
