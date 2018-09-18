<template>
  <a :href="data[item.source]" target="_blank">{{ data[item.source] }}</a>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  props: ["data", "item", "disabled"]  
};
</script>
