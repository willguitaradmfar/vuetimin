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
            <v-date-picker v-model="date" no-title scrollable v-if="!disabled">
                <v-btn flat color="primary" @click="setDate(date)">OK</v-btn>
            </v-date-picker>
      </v-menu> 
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import moment from "moment";

export default {
  props: ["data", "item", "disabled"],
  methods:{
    setDate(value){
      this.data[this.item.source] = value
      this.$refs.menu.save(value)
    }
  },
  computed: {
    dateFormatted: {
      get(){
        const date = moment(this.date)

        if(date._d.toString() === 'Invalid date') return

        this.date = date.format("YYYY-MM-DD");

        return date.format(this.hint);
      },
      set(value){

        if(!this.regexHint.test(value)) return
        
        const date = moment(value, this.hint)        

        if(date._d.toString() === 'Invalid date') return

        this.date = date.format("YYYY-MM-DD");
      }
    }
  },
  data(){
    return {
      date: new Date(),
      hint: this.item.reference && this.item.reference.hint ? this.item.reference.hint :  'DD/MM/YYYY',
      regexHint: this.item.reference && this.item.reference.regexHint ? this.item.reference.regexHint :  /^\d{2}\/\d{2}\/\d{4}$/,
      mask: this.item.reference && this.item.reference.mask ? this.item.reference.mask :  '##/##/####'
    }
  }
};
</script>
