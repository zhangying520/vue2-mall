import requect from '../utils/requect'

// 登录
export function login(username, password) {
  return requect({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 登出
export function logout(param) {
  return requect({
    url: '/user/logout',
    method: 'post',

  })
}

// 查询用户信息
export function checkLogin(param) {
  return requect({
    url: '/user/checkLogin',
    method: 'get'
  })
}

