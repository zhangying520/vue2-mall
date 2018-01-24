<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>{{ detailData.title }}</nav-bread>

    <div class="goods-detail">
      <el-row :gutter="60">
        <el-col :span="12">
          <el-carousel trigger="click" height="550px" :autoplay="false" indicator-position="outside">
            <el-carousel-item v-for="(current, o) in detailData.preview_images" :key="o">
              <img v-lazy="current" alt="" class="detail-image">
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
                  <el-button class="property-option-btn" :class="{active:active==index}" @click="show(item, index)">{{item.name}}</el-button>
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
                  <el-button plain :disabled="optionValue == ''" :class="optionValue == '' ? '' : 'mt-button--primary'" class="buy-now" @click="buyNow">立即购买</el-button>
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
          <img v-lazy="item" alt="">
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
import { getDetail } from '@/api/goods_detail'
import { addCart } from '@/api/cart'
export default {
  data() {
    return {
      detailData: [],
      purQuantity: 1, // 数量
      showOption: false,
      optionValue: '',
      unitPrice: '无', // 单价
      totalPrice: null, // 总价
      deliveryTime: '', // 发货时间
      active: 0,
      checkedId: ''
    }
  },
  mounted() {
    console.log(this.$route.params)
    this.getGoodsDetail()
  },
  methods: {
    ...mapActions(['CartCount']),
    show(data, index) {
      // 选中商品的id
      this.checkedId = data.id
      this.showOption = !this.showOption
      // 选中商品的名字
      this.optionValue = data.name
      // 选中商品的价钱
      this.unitPrice = data.price
      // 发货时间
      this.deliveryTime = data.delivery_tip
      // 当前高亮
      this.active = index
    },
    handleChange(value) { // 计算总价
    // console.log(value);
      this.totalPrice = this.unitPrice * value
    },
    addToCart() { // 添加到购物车
      // 商品规格大于1时先选择规格才能提交
      if(this.detailData.specification.length > 1) {
        if (!this.checkedId) {
          this.$message({
            message: '请先选择规格',
            type: 'warning'
          });
          return;
        }
        console.log(this.checkedId)
      }

      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      let goodsNum = this.purQuantity
      let specification = this.checkedId
      // 只有一个选择时不用提交商品类型id
      let params = {
        product_id: this.$route.params.goodsId,
        specification_id: specification,
        pur_quantity: goodsNum
      }
      addCart(params).then(
        response => {
          console.log(response)
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
    buyNow() { // 立即购买
      this.$message({
        showClose: true,
        message: '功能尚未开放，请耐心等待!'
      })
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

