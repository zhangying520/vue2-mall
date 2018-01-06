import requect from '../utils/requect'

// 获取商品列表
export function getGoods(params) {
    return requect({
        url: '/goods',
        method: 'get',
        params
    })
}
