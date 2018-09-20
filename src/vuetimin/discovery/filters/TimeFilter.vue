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
                prepend-icon="access_time"
                :hint="hint"
                :mask="mask"
                :return-masked-value="true"
                :disabled="disabled"
                ></v-text-field>
            <v-time-picker v-model="date" v-if="!disabled" format="24hr">
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
            </v-time-picker>
      </v-menu> 
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
import moment from "moment";

export default {
  props: ["data", "item", "disabled"],  
  computed: {
    date: {
      get(){
        console.log('get', this.data, this.item.source);
        
        return this.data.search
      },
      set(value){
        console.log('set', value);
        
        this.data.search = moment(value, 'HH:mm')._d
      }
    },
    dateFormatted: {
      get(){

        const date = moment(this.date)

        if(date._d.toString() === 'Invalid date') return

        this.date = date.format("HH:mm");

        return date.format(this.hint);
      },
      set(value){

        if(!this.regexHint.test(value)) return
        
        const date = moment(value, 'HH:mm')        

        if(date._d.toString() === 'Invalid date') return

        this.date = date.format("HH:mm");
      }
    }
  },
  data(){
    return {
      hint: this.item.reference && this.item.reference.hint ? this.item.reference.hint :  'HH:mm',
      regexHint: this.item.reference && this.item.reference.regexHint ? this.item.reference.regexHint :  /^\d{1,2}:\d{2}$/,
      mask: this.item.reference && this.item.reference.mask ? this.item.reference.mask :  '##:##'
    }
  }
};
</script>
