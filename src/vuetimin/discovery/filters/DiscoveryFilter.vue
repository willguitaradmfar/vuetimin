<template> 
    <v-container>
         <DateFilter :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'date'" @enter="$emit('enter')"/>
         <DateTimeFilter :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'datetime'" @enter="$emit('enter')"/>
         <TimeFilter :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'time'" @enter="$emit('enter')"/>
         <TextFilter :data="data" :item="item" :disabled="disabled" v-if="!item.reference || !item.reference.type" @enter="$emit('enter')"/>
    </v-container>
</template>

<script>
import moment from "moment";

import DateFilter from "./DateFilter";
import DateTimeFilter from "./DateTimeFilter";
import TimeFilter from "./TimeFilter";
import TextFilter from "./TextFilter";

export default {
  props: ["data", "item", "disabled"],
  components: {
    DateFilter,
    DateTimeFilter,
    TimeFilter,
    TextFilter
  }
};
</script>
