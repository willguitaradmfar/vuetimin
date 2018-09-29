import data from "./util";

import Testeresource from "../../vuetimin-datasource";

export default {
  state: {
    endpoint: '',
    needAuth: true,
    metadata: [],
    CRUD: null
  },
  mutations: {
    setEndpoint(state, endpoint) {
      state.endpoint = endpoint
    },
    needAuth(state){
      state.needAuth = true
    },
    notNeedAuth(state){
      state.needAuth = false
    },
    setMetadata(state, metadata) {
      state.metadata = metadata
    },
    setCRUD(state, CRUD) {
      state.CRUD = CRUD
    }
  },
  actions: {
    async getResources({ commit }){
      const metadata = await data.get()
      commit('setMetadata', metadata.data.resources)
    },
    makeCRUD({ commit }) {
      commit('setCRUD', Testeresource.mock())
    }, 
    auth({ commit }, { username, password }) {
      if (localStorage.getItem("token") == "true") {
        return commit('notNeedAuth')
      }

      if (username === "will" && password === "123") {
        localStorage.setItem("token", "true");

        return commit('notNeedAuth')
      }

      return commit('needAuth')
    }
  }
}
