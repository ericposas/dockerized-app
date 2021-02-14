const bModule = {
    namespaced: true,
    state: () => ({
      bVar: 'a variable in module b'
    }),
    actions: {
      ['updateBVar']: ({ commit, dispatch, state }, payload) => {
        commit('changeBVar', payload)
      }
    },
    mutations: {
      ['changeBVar']: (state, payload) => {
        state.bVar = payload.value
      }
    },
    getters: {
      bVar: (state) => state.bVar
    },
}

export default bModule
