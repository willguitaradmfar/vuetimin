<template> 
    <v-container>
         <DateDiscovery :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'date'"/>
         <TextDiscovery :data="data" :item="item" :disabled="disabled" v-else/>
    </v-container>
</template>

<script>
import moment from "moment";

import DateDiscovery from "./DateDiscovery";
import TextDiscovery from "./TextDiscovery";

export default {
  props: ["data", "item", "disabled"],
  components: {
    DateDiscovery,
    TextDiscovery
  }
};
</script>
