import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const _import = require('./_import_' + process.env.NODE_ENV)
// example: _import('login/index')
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
// 在开发环境中，不要使用延迟加载，因为延迟加载太多页面会导致webpack热更新太慢。所以只有在生产中使用延迟加载
// 修改组件内容后，热更新只会在打开当前组件的页面才会更新

// import GoodsList from '@/views/GoodsList/'
// import GoodsDetail from '@/views/GoodsDetail/'
// import Login from '@/views/Login/index'
// import ErrorHtml from '@/views/404'
// import Cart from '@/views/Cart/'
// import Address from '@/views/Address/'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 后端支持可开
  routes: [
    { path: '/404', component: _import('404'), hidden: true },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/goods',
      name: 'GoodsList',
      component: _import('GoodsList/index'),
      meta: {
        title: '商品列表'
      }
    },
    {
      path: '/goods/detail/:goodsId',
      name: 'GoodsDetail',
      component: _import('GoodsDetail/index'),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: _import('Login/index'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: _import('Cart/index'),
      meta: {
        title: '购物车'
      }
    },
    {
      path: '/address',
      name: 'Address',
      component: _import('Address/index'),
      meta: {
        title: '地址'
      }
    },

    { path: '*', redirect: '/404', hidden: true }
  ]
})
