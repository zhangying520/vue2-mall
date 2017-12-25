// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store';
import './icons'

Vue.config.productionTip = false

import {
  Button, Select, Container, Header, Main, Footer, Row,
  Col, Card, Breadcrumb, BreadcrumbItem, Carousel, CarouselItem,
} from 'element-ui'
Vue.prototype.$ELEMENT = { size: 'small' } // 用于改变组件的默认尺寸，默认small
Vue.component(Button.name, Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
