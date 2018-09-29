export default {
    registerStore: function (name, options) {

        options = options || { }

        return this.$store.registerModule(name, {
            namespaced: true,
            state: {
                ...options.state,
                data: []
            },
            mutations: {
                ...options.mutations,
                SET_DATA(state, data){
                    state.data = data
                }
            },
            getters: {
                ...options.getters
            },
            actions: {
                ...options.actions,
                load({ commit }, { args }){
                    return this.$store.state.vuetimin
                        .CRUD
                        .GET_LIST(name, { ...args });
                }
            }
        })
    
    }
}