<template> 
  <v-text-field        
        v-model="data.search"
        :label="item.text || item.source"
        :disabled="disabled"
        @keyup.enter="$emit('enter')"
        prepend-icon="filter_list"
        ></v-text-field>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  props: ["data", "item", "disabled"]
};
</script>
