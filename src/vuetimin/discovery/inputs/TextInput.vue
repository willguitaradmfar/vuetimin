<template> 
  <v-text-field        
        v-model="data[item.source]"                
        :label="item.text || item.source"
        :disabled="disabled"
        ></v-text-field>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
export default {
  props: ["data", "item", "disabled"]
  
};
</script>
