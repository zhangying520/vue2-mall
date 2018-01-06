import Vue from 'vue'
import Router from 'vue-router'
// const _import = require('./_import_' + process.env.NODE_ENV)
// _import('login/index')
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
// 在开发环境中，不要使用延迟加载，因为延迟加载太多页面会导致webpack热更新太慢。所以只有在生产中使用延迟加载
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '@/views/GoodsList/'
import GoodsDetail from '@/views/GoodsDetail/'
import Login from '@/views/Login/index'
import ErrorHtml from '@/views/404'
import Cart from '@/views/Cart/'
import Address from '@/views/Address/'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 后端支持可开
  routes: [
    { path: '/404', component: ErrorHtml, hidden: true },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/goods',
      name: 'GoodsList',
      component: GoodsList
    },
    {
      path: '/goods/detail/:goodsId',
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },

    { path: '*', redirect: '/404', hidden: true }
  ]
})
