export default {
    registerStore: function (name, options) {

        options = options || { }

        const _vuetiminState = this.$store.state.vuetimin

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
                load({ commit }, args){
                    return _vuetiminState
                        .CRUD
                        .GET_LIST(name, { ...args });
                },
                getOne({ commit }, args){
                    return _vuetiminState
                        .CRUD
                        .GET_ONE(name, { ...args });
                },
                update({ commit }, args){
                    return _vuetiminState
                        .CRUD
                        .UPDATE(name, { ...args });
                },
                delete({ commit }, args){
                    return _vuetiminState
                        .CRUD
                        .DELETE(name, { ...args });
                },
                create({ commit }, args){
                    return _vuetiminState
                        .CRUD
                        .CREATE(name, { ...args });
                }
            }
        })
    
    }
}