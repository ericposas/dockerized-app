const mainStateModule = {
   state: () => ({
    someVar: 'a default var',
    msg: '',
    inputVal: '',
    // subState: {} as SomeSubState
  }),
  mutations: {
    ['changeText'](state, payload) {
      state.someVar = payload.text
    },
    ['changeErrMsg'](state, payload) {
      state.msg = payload.msg
      console.log(
        payload.msg
      )
    },
    ['changeInputVal']: (state, payload) => {
      state.inputVal = payload.value
    }
  },
  getters: {
    ['inputVal']: (state) => state.inputVal,
    ['someVar']: (state) => state.someVar,
    ['msg']: (state) => state.msg
  },
  actions: {
    ['action1']({ commit, state }, payload) {
      console.log(
        payload
      )
      return new Promise((resolve, reject) => {
        try {
          commit('changeText', payload)
          resolve('text has been changed')
        } catch(err) {
          reject(err)
        }
      })
    },
    ['actionFetch']({ commit }, payload) {
      fetch('http://localhost:8080', {
        method: 'GET'
      })
      .then(response => response.json())
      .then(json => {
        console.log(json.toString())
      })
      .catch(err => {
        console.log(err)
        commit({ type: 'changeErrMsg', msg: err.toString() })
      })
    },
    ['action:changeInputVal']({ commit }, payload) {
      commit('changeInputVal', payload)
    }
  }
}

export default mainStateModule
