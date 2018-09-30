export default {
    registerStore: function (name, options) {

        options = options || {}

        const _vuetiminState = this.$store.state.vuetimin

        return this.$store.registerModule(name, {
            namespaced: true,
            state: {
                ...options.state,
                data: [],
                total: 0
            },
            mutations: {
                ...options.mutations,
                SET_DATA(state, data) {
                    state.data = data
                },
                SET_TOTAL(state, total) {
                    state.total = total
                }
            },
            getters: {
                ...options.getters
            },
            actions: {
                ...options.actions,
                async load({ commit }, args) {
                    try {
                        const response = await _vuetiminState.CRUD.GET_LIST(name, { ...args })

                        commit('SET_DATA', response.data)
                        commit('SET_TOTAL', parseInt(response.total || "0"))

                        return response
                    } catch (err) {
                        commit('SET_DATA', [])
                        commit('SET_TOTAL', 0)
                        throw err
                    }
                },
                async getOne({ commit }, args) {
                    try {
                        const response = await _vuetiminState.CRUD.GET_ONE(name, { ...args })
                        return response
                    } catch (err) {
                        throw err
                    }
                },
                async update({ commit }, args) {
                    try {
                        const response = await _vuetiminState.CRUD.UPDATE(name, { ...args })
                        return response
                    } catch (err) {
                        throw err
                    }
                },
                async delete({ commit }, args) {
                    try {
                        const response = await _vuetiminState.CRUD.DELETE(name, { ...args })
                        return response
                    } catch (err) {
                        throw err
                    }
                },
                async create({ commit }, args) {
                    try {
                        const response = await _vuetiminState.CRUD.CREATE(name, { ...args })
                        return response
                    } catch (err) {
                        throw err
                    }
                }
            }
        })

    }
}