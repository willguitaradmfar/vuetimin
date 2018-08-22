import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import Main from './Main.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(Main)
}).$mount('#app')
