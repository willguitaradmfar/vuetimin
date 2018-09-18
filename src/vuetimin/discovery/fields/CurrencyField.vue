<template>
  <span>{{ currency }}</span>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  props: ["data", "item", "disabled"],
  computed: {
    currency() {
      const formatado = "R$ " + parseFloat(this.data[this.item.source]).toFixed(2).replace(".", ",");
      return formatado;
    }
  }
};
</script>
