import requect from '../utils/requect'

// 收货地址
export function address(param) {
  return requect({
    url: '/user/address',
    method: 'get'
  })
}

// 设置默认地址
export function setDefault(param) {
  return requect({
    url: '/user/setDefault',
    method: 'post',
    data: param
  })
}

// 删除地址
export function deleteAddress(param) {
  return requect({
    url: '/user/removeAddress',
    method: 'post',
    data: param
  })
}
