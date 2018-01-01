import requect from '../utils/requect'

// 购物车列表
export function getCartList(userId) {
  return requect({
    url: '/user/cartList',
    method: 'post',
    data: userId
  })
}

// 加入购物车
export function addCart(params) {
  return requect({
    url: '/user/addCart',
    method: 'post',
    data: params
  })
}

// 编辑购物车
export function editCart(params) {
  return requect({
    url: '/user/cartEdit',
    method: 'post',
    data: params
  })
}

// 删除购物车商品
export function deleteCart(productId) {
  return requect({
    url: '/user/cartDelete',
    method: 'post',
    data: productId
  })
}

// 获取购物车数量
export function getCartCount(param) {
  return requect({
    url: '/user/getCartCount',
    method: 'get',
    param
  })
}
