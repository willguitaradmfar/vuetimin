<template> 
         <v-menu
            ref="menu"
            :close-on-content-click="false"            
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
            >
            <v-text-field
                slot="activator"
                v-model="dateFormatted"                
                :label="item.text || item.source"
                prepend-icon="event"
                :hint="hint"
                :mask="mask"
                :return-masked-value="true"
                :disabled="disabled"
                ></v-text-field>
            <v-date-picker v-model="date" :landscape="false" scrollable v-if="!disabled">
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-date-picker>

            <v-time-picker v-model="time" :landscape="false" v-if="!disabled" format="24hr">
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-time-picker>

      </v-menu> 
</template>

<style>
  .v-date-picker-title__date {
    font-size: 48px
  }
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import moment from "moment";

export default {
  props: ["data", "item", "disabled"],
  computed: {
    date: {
      get() {
        console.log("get", `${this.dateSelected} ${this.timeSelected}`);

        return moment(this.data[this.item.source]).format('YYYY-MM-DD')
      },
      set(value) {

        if(!/^\d{4}-\d{2}-\d{2}/.test(value)) return 
          
        this.$data.dateSelected = value
        
        console.log("set", value, `${this.dateSelected} ${this.timeSelected}`);  

        this.data[this.item.source] = moment(`${this.dateSelected} ${this.timeSelected}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
      }
    },
    time: {
      get() {
        console.log("get", `${this.dateSelected} ${this.timeSelected}`);

        return moment(this.data[this.item.source]).format('HH:mm')
      },
      set(value) {      

        if(!/^\d{1,2}:\d{1,2}/.test(value)) return
          
        this.$data.timeSelected = value
        
        console.log("set", value, `${this.dateSelected} ${this.timeSelected}`);  

        this.data[this.item.source] = moment(`${this.dateSelected} ${this.timeSelected}`, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
      }
    },
    dateFormatted: {
      get() {
        const date = moment(`${this.date} ${this.time}`)

        if (date._d.toString() === "Invalid date") return;

        this.date = date.format("YYYY-MM-DD");
        this.time = date.format("HH:mm");

        return date.format(this.hint);
      },
      set(value) {
        if (!this.regexHint.test(value)) return;

        const date = moment(value, this.hint);

        if (date._d.toString() === "Invalid date") return;

        this.date = date.format("YYYY-MM-DD");
        this.time = date.format("HH:mm");
      }
    }
  },
  data() {
    return {
      dateSelected: null,
      timeSelected: null,
      hint:
        this.item.reference && this.item.reference.hint
          ? this.item.reference.hint
          : "DD/MM/YYYY HH:mm",
      regexHint:
        this.item.reference && this.item.reference.regexHint
          ? this.item.reference.regexHint
          : /^\d{2}\/\d{2}\/\d{4} \d{1,2}:\d{2}$/,
      mask:
        this.item.reference && this.item.reference.mask
          ? this.item.reference.mask
          : "##/##/#### ##:##"
    };
  }
};
</script>
