<template>
  <span>
    <DateField :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'date'"/>
    <DateTimeField :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'datetime'"/>
    <TimeField :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'time'"/>
    <LinkField :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'link'"/>
    <EmailField :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'email'"/>
    <CurrencyField :data="data" :item="item" :disabled="disabled" v-if="item.reference && item.reference.type === 'currency'"/>
    <TextField :data="data" :item="item" :disabled="disabled" v-if="!item.reference || !item.reference.type"/>
  </span>
</template>

<script>
import moment from "moment";

import DateField from "./DateField";
import DateTimeField from "./DateTimeField";
import TimeField from "./TimeField";
import TextField from "./TextField";
import LinkField from "./LinkField";
import EmailField from "./EmailField";
import CurrencyField from "./CurrencyField";

export default {
  props: ["data", "item", "disabled"],
  components: {
    DateField,
    DateTimeField,
    TimeField,
    TextField,
    LinkField,
    EmailField,
    CurrencyField
  }
};
</script>
