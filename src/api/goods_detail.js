import requect from '../utils/requect'

// 获取商品详情
export function getDetail (params) {
  return requect({
    url: '/goods/detail',
    method: 'get',
    params
  })
}
