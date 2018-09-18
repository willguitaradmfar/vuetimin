<template>
  <a :href="email">{{ data[item.source] }}</a>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  props: ["data", "item", "disabled"],
  computed:{
    email(){
      return 'mailto:' + this.data[this.item.source]
    }
  }
};
</script>
