import { login, logout, checkLogin } from '../../api/login'
import { getCartCount } from '@/api/cart'
import { getToken, setToken, removeToken } from '../../utils/auth'

const user = {
  state: {
    token: getToken(), // [目前暂时还不需要设置] 2018-1-1 16:14:12
    name: sessionStorage.getItem('User-Name'),
    cartCount: 0
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_CART_COUNT: (state, count) => {
      state.cartCount = count
    }
  },

  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      // console.log(userInfo);
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.result
          setToken(data.userId)
          sessionStorage.setItem('User-Name', data.userName)
          commit('SET_TOKEN', data.userId)
          commit('SET_NAME', data.userName)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut ({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_NAME', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询用户信息
    GetInfo ({ commit, state }) {
      return new Promise((resolve, reject) => {
        checkLogin().then(response => {
          resolve(response)
        }, error => {
          reject(error)
        })
      })
    },
    // 获取购物车数量
    CartCount ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getCartCount().then(response => {
          if (response.result) {
            commit('SET_CART_COUNT', response.result.cartCount)
          }
          resolve(response)
        })
      })
    }
  }
}

export default user
