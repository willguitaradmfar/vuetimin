<template>
 <v-flex xs12>
        <v-slider
          v-model="data[item.source]"
          thumb-label="always"
          :label="item.text || item.source"
          :disabled="disabled"
          :max="item.reference.max || 100"
          :min="item.reference.min || 0"
          ></v-slider>
      </v-flex>
  
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  props: ["data", "item", "disabled"]
  
};
</script>
