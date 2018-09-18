<template>
  <span>{{ data[item.source] }}</span>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  props: ["data", "item", "disabled"]
  
};
</script>
