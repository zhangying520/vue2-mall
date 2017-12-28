<template>
  <div>
    <nav-header></nav-header>

    <nav class="global-sub-nav-line">
      <div :span="24" class="global-sub-nav-inner">
        <h5 class="global-sub-nav-title">M8定制版手机壳</h5>
      </div>
    </nav>

    <div class="goods-detail">
      <el-row :gutter="60">
        <el-col :span="12">
          <el-carousel trigger="click" height="550px" :autoplay="false" indicator-position="outside">
            <el-carousel-item v-for="item in 3" :key="item">
              <img src="../../static/1.jpg" alt="" class="detail-image">
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="12">
          <div class="property-option" :class="showOption ? 'property-option-show' : ''">
            <div class="property-option-title">
              颜色
              <div class="property-option-value">{{ optionValue }}</div>
              <a href="javascript:;" class="property-option-change" @click="showOption = !showOption">修改</a>
            </div>
            <div class="property-option-list" >
              <el-row :gutter="20">
                <el-col :span="12" >
                  <el-button class="property-option-btn" @click="show($event)">哈哈哈哈</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button class="property-option-btn" @click="show($event)">朴素按钮</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button class="property-option-btn">朴素按钮</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button class="property-option-btn">朴素按钮</el-button>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-button class="property-option-btn">朴素按钮</el-button>
                </el-col>
                <el-col :span="12">
                  <el-button class="property-option-btn">朴素按钮</el-button>
                </el-col>
              </el-row>
            </div>

            <div class="product-number">
              <div class="product-number-label">购买数量</div>
              <div class="product-number-value">
                <el-input-number size="small" :min="1" v-model="purQuantity" @change="handleChange"></el-input-number>
              </div>
            </div>

            <div class="product-buy">
              <div class="product-price">
                <div class="product-price-value">
                  RMB　
                  <span>{{ totalPrice }}</span>
                </div>
                <div class="product-price-time"></div>
              </div>

              <div class="product-buttons">
                <div class="product-button-line">
                  <el-button plain :disabled="optionValue == ''" :class="optionValue == '' ? '' : 'mt-button--primary'" class="buy-now">立即购买</el-button>
                </div>
                <div class="product-button-line">
                  <a href="javascript:;" class="btn-addcart" @click="addCart">添加到购物袋</a>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="product-detail">
        <h2 class="product-detail-title">商品详情</h2>
        <div class="product-detail-image-box"><img src="../../static/59795.jpg" alt=""></div>
        <div class="product-detail-image-box"><img src="../../static/59795.jpg" alt=""></div>
        <div class="product-detail-image-box"><img src="../../static/59795.jpg" alt=""></div>
        <div class="product-detail-image-box"><img src="../../static/59795.jpg" alt=""></div>
      </div>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '../components/NavHeader'
import NavFooter from '../components/NavFooter'
import { getDetail, addCart } from '@/api/goods.js'
export default {
  data() {
    return {
      msg: '这是里商品详情页',
      purQuantity: 0,
      showOption: false,
      optionValue: '',
      price: 80, // 单价
      totalPrice: 80, // 总价
    }
  },
  mounted() {
    console.log(this.$route.params)
    // this.getGoodsDetail()
  },
  updated() {
    // console.log(this.showOption)
  },
  methods: {
    show(e) {
      this.showOption = !this.showOption
      this.optionValue = e.target.innerText
    },
    handleChange(value) { // 计算总价
      this.totalPrice = this.price * value
    },
    addCart() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let params = { product_id: this.$route.params.goodsId }
      addCart(params).then(
        response => {
          console.log(response);
          this.loading.close()
          this.$message({
            showClose: true,
            message: response.msg,
            type: 'success'
          })
        },
        error => {
          console.log(error);
          this.loading.close()
        }
      )
    },
    getGoodsDetail() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var param = { id: this.$route.params.goodsId }
      getDetail(param).then(
        response => {
          this.loading.close()
          console.log(response)
        },
        error => {
          this.loading.close()
          console.log(error)
        }
      )
    }
  },
  components: { NavHeader, NavFooter }
}
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';
@import '../styles/GoodsDetail.scss';
</style>

