import { login } from '../../api/login'
import { getToken, setToken, removeToken } from '../../utils/auth'
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
    // 登录
    Login({ commit  }, userInfo) {
      // console.log(userInfo);
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          let data = response.result
          setToken(data.userId)
          commit('SET_TOKEN', data.userId)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user;
