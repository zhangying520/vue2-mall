import requect from '../utils/requect'

// 获取商品列表
export function getGoods(params) {
    return requect({
        url: '/goods',
        method: 'get',
        params
    })
}

// 获取商品详情
export function getDetail(params) {
  return requect({
    url: '/goods/detail',
    method: 'get',
    params
  })
}

// 加入购物车
export function addCart(params) {
  return requect({
    url: '/goods/addCart',
    method: 'post',
    data: params
  })
}
