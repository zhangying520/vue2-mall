<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>{{$t('default.el.global.cartBread')}}</nav-bread>
    <div class="cart-content">
      <div class="cart-list">
        <div class="order-list-item">
          <div class="order-goods-item" v-for="(item, index) in cartList" :key="index">
            <router-link class="order-goods-image lazy-box" :to="{path: '/goods/detail/' + item.product_id}">
              <img :src="item.specification.image" alt="">
            </router-link>
            <div class="order-goods-info">
              <p class="order-goods-name">
                <!-- 美图M8定制版手机壳 - 海洋传说 -->
                {{ item.product_name }} ({{ item.specification.name }})
              </p>
              <div class="order-goods-price">
                RMB {{ item.sale_price }}
              </div>
            </div>

            <div class="order-goods-count top-line-lighter">
              <div class="order-goods-number">
                <el-input-number size="small" :min="1"
                :max="item.specification.stock" :value="item.product_id"
                v-model="item.product_number" @change="(value) => edit(value, item.product_id)"></el-input-number>
              </div>
              <div class="order-goods-total">
                RMB {{ item.product_number * item.specification.price }}
              </div>
              <a href="javascript:;" class="order-goods-btn-delete" @click="deletes(item.product_id)">
                <svg-icon icon-class="delete" class="delete"></svg-icon>
              </a>
            </div>

          </div>
        </div>
      </div>
      <div class="cart-footer">
        <p class="cart-footer-total">
          {{$t('default.el.global.totla')}}：<span>RMB {{ orderAmount }}</span>
        </p>
        <div class="cart-footer-handler">
          <router-link to="/address">
            <el-button plain class="mt-button--large">{{$t('default.el.global.settleAccounts')}}</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/Breadcrumb'
import { mapActions } from 'vuex'
import { getCartList, deleteCart, editCart } from '@/api/cart'

export default {
  components: { NavHeader, NavFooter, NavBread },
  data () {
    return {
      iconHost: '',
      maxQuantity: '',
      // cartQuantity: 10,
      cartList: []
    }
  },
  created () {
    this.iconHost = process.env.ICON_API
    this.init()
  },
  methods: {
    ...mapActions(['CartCount']),
    edit (val, itemId) { // 增加 or 减少
      const userId = sessionStorage.getItem('User-Id')
      const params = {
        'product_number': val,
        'product_id': itemId,
        'userId': userId
      }
      editCart(params).then(response => {
        console.log(response)
        this.CartCount()
      }, error => {
        console.log(error)
        this.$message({
          type: 'error',
          message: 'Error: 操作失败!'
        })
      })
    },
    init () { // 购物车商品列表
      const userId = sessionStorage.getItem('User-Id')
      getCartList({ userId }).then(response => {
        this.cartList = response.result
        console.log(response)
      }, error => {
        console.log(error)
      })
    },
    deletes (productId) { // 删除商品
      // const h = this.$createElement
      this.$msgbox({
        title: this.$t('default.el.messagebox.title'),
        message: this.$t('default.el.messagebox.message'),
        showCancelButton: true,
        lockScroll: false,
        confirmButtonText: this.$t('default.el.messagebox.confirm'),
        cancelButtonText: this.$t('default.el.messagebox.cancel'),
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'

              // 删除商品
            const userId = sessionStorage.getItem('User-Id')
            const param = { 'product_id': productId, 'userId': userId }
            deleteCart(param).then(response => {
              console.log(response)
              this.CartCount()
              done() // 关闭 MsgBox
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
              this.init()
            }, error => {
              console.error(error)
              done()
              this.$message({
                type: 'error',
                message: 'Error: ' + error.message
              })
            })
          } else {
            done()
          }
        }
      }).then(action => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功'
          // });
      }).catch(error => {
        console.log(error)
          // TODO
          // 点击了cancel
      })
    }
  },
  computed: { // 计算属性计算总金额
    'orderAmount': function (param) {
      var amount = 0
      this.cartList.map((item, index) => {
        amount = parseInt(amount) + parseInt(item.product_number) * parseInt(item.specification.price)
      })
      // console.log(amount);
      return amount
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/Cart.scss';
</style>

