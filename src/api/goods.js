import requect from '../utils/requect'

export function getGoods(params) {
    return requect({
        url: '/goods',
        method: 'get',
        params
    })
}