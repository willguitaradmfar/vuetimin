<template>
    <v-text-field :disabled="loading" v-model="data[item.source]" :counter="10" :label="item.text" required="true"></v-text-field>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  props: ["loading", "data", "item"]
};
</script>
