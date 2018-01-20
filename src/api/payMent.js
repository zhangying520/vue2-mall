import requect from '../utils/requect'

// 生成订单
export function payMent(params) {
  return requect({
    url: '/user/payMent',
    method: 'post',
    data: params
  })
}
