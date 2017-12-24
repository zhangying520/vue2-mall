const user = {
  state: {
    token: 'admin',
    name: 'admin'
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },

  },

  actions: {
    Login({ commit  }, uuserInfo) {
      // TODO
      // return new Promise((resolve, reject) => {})
    }
  }
}

export default user;
