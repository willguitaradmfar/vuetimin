<template> 
    <v-container>
         <DateInput :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'date'"/>
         <DateTimeInput :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'datetime'"/>
         <TimeInput :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'time'"/>
         <TextInput :data="data" :item="item" :disabled="disabled" v-if="!item.reference || !item.reference.type"/>
    </v-container>
</template>

<script>
import moment from "moment";

import DateInput from "./DateInput";
import DateTimeInput from "./DateTimeInput";
import TimeInput from "./TimeInput";
import TextInput from "./TextInput";

export default {
  props: ["data", "item", "disabled"],
  components: {
    DateInput,
    DateTimeInput,
    TimeInput,
    TextInput
  }
};
</script>
