import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import store from './store'
import router from './router'
import Main from './vuetimin/Main.vue'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(Main)
}).$mount('#app')
