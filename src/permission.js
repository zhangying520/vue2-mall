import router from './router'
// import NProgress from 'nprogress' // Progress 进度条
// import 'nprogress/nprogress.css'// Progress 进度条样式
// import store from './store'
// import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// console.log(loading);

// token 为空时，可以访问的白名单页面
const whiteList = ['/login', '/goods'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  // NProgress.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }

  if (getToken()) {
    // 登录后不能跳转登录页面
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // if (store.getters.roles.length === 0) {
      //   // console.log('没有token');
      //   store.dispatch('GetInfo').then(res => { // 拉取用户信息
      //     next()
      //   }).catch(() => {
      //     store.dispatch('FedLogOut').then(() => {
      //       Message.error('验证失败,请重新登录')
      //       next({ path: '/login' })
      //     })
      //   })
      // } else {
      next()
      // }
    }
  } else {
    // 判断是否跳转不需要token的白名单组件
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      // NProgress.done()
    }
  }
})

// router.afterEach(() => {
  // NProgress.done() // 结束Progress
// })
