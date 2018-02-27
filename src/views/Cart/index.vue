<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>购物袋内的商品</nav-bread>
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
          总计：<span>RMB {{ orderAmount }}</span>
        </p>
        <div class="cart-footer-handler">
          <router-link to="/address">
            <el-button plain class="mt-button--large">结账</el-button>
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
  methods: {
    ...mapActions(['CartCount']),
    edit (val, itemId) { // 增加 or 减少
      const params = {
        'product_number': val,
        'product_id': itemId
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
      getCartList().then(response => {
        this.cartList = response.result
        console.log(response)
      }, error => {
        console.log(error)
      })
    },
    deletes (productId) { // 删除商品
      // const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: '你确定要删除此件商品吗？',
        showCancelButton: true,
        lockScroll: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '执行中...'

              // 删除商品
            const param = { 'product_id': productId }
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
  mounted () {
    this.iconHost = process.env.ICON_API
    this.init()
    // console.log(getToken());
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
.cart-content {
  padding: 15px 25px;
  margin-top: 10px;
  box-sizing: border-box;
  @include init();
  .cart-list {
    @include init();
  }
  .order-goods-item {
    padding: 25px 40px 25px 160px;
    margin: 0;
    box-sizing: border-box;
    height: 170px;
    line-height: 120px;
    @include rel;
    border-bottom: 1px solid #eaeaea;
  }
  .lazy-box {
    @include db;
  }
  .order-goods-image {
    @include abs;
    width: 120px;
    height: auto;
    line-height: 1;
    top: 30px;
    left: 0;
    img {
      width: 100%;
    }
  }
  .order-goods-info {
    float: left;
    padding-bottom: 0;
    padding-right: 0;
    width: 60%;
    position: relative;
    height: 120px;
    @include clear;
    // @include cur;
  }
  .order-goods-name {
    @include fl;
    @include f(18, px);
    vertical-align: middle;
    width: 68%;
    box-sizing: border-box;
    padding-right: 10px;
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    margin-bottom: 0;
    line-height: 20px;
    &:hover {
      color: $checkedColor;
    }
  }
  .order-goods-price {
    @include fr;
    width: 20%;
    box-sizing: border-box;
    @include tar;
    padding-right: 0;
    font-size: 16px;
    margin-top: 0;
    color: #999;
  }
  .order-goods-count {
    @include fl;
    @include f(16,px);
    @include clear;
    padding-top: 0;
    width: 40%;
  }
  .order-goods-number {
    width: 50%;
    box-sizing: border-box;
    height: 120px;
    @include tar;
    @include rel;
    @include fl;
  }
  .order-goods-total {
    @include fr;
    @include tar;
    color: #333;
    white-space: nowrap;
    width: 50%;
    box-sizing: border-box;
  }
  .order-goods-btn-delete {
    top: 50%;
    -webkit-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
    right: 0;
    // top: 30px;
    @include abs;
    @include f(20, px);
  }

  .cart-footer {
    @include rel;
    @include tar;
    @include clear;
    margin: 45px auto 35px;
    padding-right: 0;
    .cart-footer-total {
      @include f(20,px);
      @include tar;
      font-weight: 300;
      box-sizing: border-box;
      padding: 0;
      span {
        @include f(30, px);
        color: $checkedColor;
      }
    }
  }
  .mt-button--large {
    margin-top: 25px;
    width: 250px;
    @include f(20,px);
    height: 48px;
    line-height: 48px;
    padding: 0 80px;
    color: #fff;
    background-color: $checkedColor;
    border-color: $checkedColor;
  }
}
</style>

