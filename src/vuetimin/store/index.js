import data from "./util";

import Testeresource from "../../vuetimin-datasource";

export default {
  state: {
    needAuth: true,
    metadata: [],
    CRUD: null
  },
  mutations: {
    NEED_AUTH(state){
      state.needAuth = true
    },
    NOT_NEED_AUTH(state){
      state.needAuth = false
    },
    SET_METADATA(state, metadata) {
      state.metadata = metadata
    },
    SET_CRUD(state, CRUD) {
      state.CRUD = CRUD
    }
  },
  actions: {
    async getResources({ commit }){
      const metadata = await data.get()
      commit('SET_METADATA', metadata.data.resources)
    },
    makeCRUD({ commit }) {
      commit('SET_CRUD', Testeresource.mock())
    }, 
    auth({ commit }, { username, password }) {
      if (localStorage.getItem("token") == "true") {
        return commit('NOT_NEED_AUTH')
      }

      if (username === "will" && password === "123") {
        localStorage.setItem("token", "true");

        return commit('NOT_NEED_AUTH')
      }

      return commit('NEED_AUTH')
    }
  }
}
