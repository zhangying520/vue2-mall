import Vue from 'vue'
import Router from 'vue-router'
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
