import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GoodsList from '../views/GoodsList'

Vue.use(Router)

export default new Router({
  // mode: 'history', // 后端支持可开
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/goods',
      name: 'GoodsList',
      component: GoodsList
    }
  ]
})
