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

// 获取省份信息 [腾讯 WebService API]
export function getProvinces(params) {
  return requect({
    url: 'http://apis.map.qq.com/ws/district/v1/list',
    method: 'get',
    params: {
      key: 'WE6BZ-GIQKR-552WN-WNJT7-2GXEQ-SVFKT'
    }
  })
}
