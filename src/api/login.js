import requect from '../utils/requect'

export function login (username, password) {
  return requect({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

