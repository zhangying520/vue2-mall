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

// 添加新收货地址
export function addAddress(params) {
  return requect({
    url: '/user/addAddress',
    method: 'post',
    data: params
  })
}

// 获取省份信息
export function getProvinces(params) {
  return requect({
    url: '/district/list',
    method: 'get',
  })
}

// 获取城市
export function getCity(params) {
  return requect({
    url: '/district/city',
    method: 'get',
    params: params
  })
}

// 获取区域
export function getArea(params) {
  return requect({
    url: '/district/area',
    method: 'get',
    params: params
  })
}
