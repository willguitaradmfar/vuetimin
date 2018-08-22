import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    endpoint: ''
  },
  mutations: {
    setEndpoint(state, endpoint) {
      state.endpoint = endpoint
    }
  },
  actions: {

  }
})
