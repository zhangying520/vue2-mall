<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>{{ detailData.title }}</nav-bread>

    <div class="goods-detail">
      <el-row :gutter="60">
        <el-col :span="12">
          <el-carousel trigger="click" height="550px" :autoplay="false" indicator-position="outside">
            <el-carousel-item v-for="(current, o) in detailData.preview_images" :key="o">
              <img :src="current" alt="" class="detail-image">
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="12">
          <div class="property-option" :class="showOption ? 'property-option-show' : ''" >
            <div class="property-option-title" v-for="(item, index) in detailData.sale_attr" :key="index">
              {{item.name}}
              <div class="property-option-value">{{ optionValue }}</div>
              <a href="javascript:;" v-if="detailData.specification.length != 1" class="property-option-change" @click="showOption = !showOption">修改</a>
            </div>
            <div class="property-option-list" >
              <el-row :gutter="20">
                <el-col :span="12" v-for="(item, index) in detailData.specification" :key="index" v-if="index != 0">
                  <el-button class="property-option-btn" :class="{active:active==index}" @click="show($event, item, index)">{{item.name}}</el-button>
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
                <div class="product-price-time">{{ deliveryTime }}</div>
              </div>

              <div class="product-buttons">
                <div class="product-button-line">
                  <el-button plain :disabled="optionValue == ''" :class="optionValue == '' ? '' : 'mt-button--primary'" class="buy-now">立即购买</el-button>
                </div>
                <div class="product-button-line">
                  <a href="javascript:;" class="btn-addcart" @click="addToCart">添加到购物袋</a>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="product-detail">
        <h2 class="product-detail-title">商品详情</h2>
        <div class="product-detail-image-box" v-for="(item, index) in detailData.images" :key="index">
          <img :src="item" alt="">
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
import { getDetail } from '@/api/goods'
import { addCart } from '@/api/cart'
export default {
  data() {
    return {
      detailData: '',
      purQuantity: 0,
      showOption: false,
      optionValue: '',
      unitPrice: '无', // 单价
      totalPrice: null, // 总价
      deliveryTime: '', // 发货时间
      active: 0
    }
  },
  mounted() {
    console.log(this.$route.params)
    this.getGoodsDetail()
  },
  methods: {
    ...mapActions(['CartCount']),
    show(e, data, index) {
      this.showOption = !this.showOption
      this.optionValue = e.target.innerText
      this.unitPrice = data.price
      this.deliveryTime = data.delivery_tip
      this.active = index
    },
    handleChange(value) { // 计算总价
    // console.log(value);
      this.totalPrice = this.unitPrice * value
    },
    addToCart() { // 添加到购物车
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let params = { product_id: this.$route.params.goodsId }
      addCart(params).then(
        response => {
          console.log(response);
          this.CartCount()
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
    getGoodsDetail() { // 获取当前商品详情
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var param = { id: this.$route.params.goodsId }
      getDetail(param).then(
        response => {
          this.loading.close()
          this.detailData = response.result
          if (response.result.specification.length != 0) {
            if (response.result.specification.length == 1) {
              this.optionValue = response.result.specification[0].name
              this.showOption = true
            }
            this.unitPrice = response.result.specification[0].price
          }
          console.log(response)
        },
        error => {
          this.loading.close()
          console.log(error)
        }
      )
    }
  },
  components: { NavHeader, NavFooter, NavBread },
  watch: {
    'unitPrice'(val) {
      this.totalPrice = val
      // console.log(val);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/base.scss';
@import '../../styles/GoodsDetail.scss';
</style>

