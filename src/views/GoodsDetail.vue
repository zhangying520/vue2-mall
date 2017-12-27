<template>
  <div>
    <nav-header></nav-header>

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
          <div class="property-option">
            <div class="property-option-title">
              颜色
              <div class="property-option-value">环游世界</div>
              <a href="javascript:;" class="property-option-change">修改</a>
            </div>
            <div class="property-option-list">
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
                <el-input-number size="small" :min="1" v-model="purQuantity"></el-input-number>
              </div>
            </div>

            <div class="product-buy">
              <div class="product-price">
                <div class="product-price-value">
                  RMB　
                  <span>80</span>
                </div>
                <div class="product-price-time"></div>
              </div>

              <div class="product-buttons">
                <div class="product-button-line">
                  <el-button plain disabled class="buy-now">立即购买</el-button>
                </div>
                <div class="product-button-line">
                  <!-- <el-button type="text"></el-button> -->
                  <a href="javascript:;" class="btn-addcart">添加到购物袋</a>
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
import NavHeader from "../components/NavHeader";
import NavFooter from "../components/NavFooter";
export default {
  data() {
    return {
      msg: "这是里商品详情页",
      purQuantity: 0
    };
  },
  mounted() {
    console.log(this.$route.params);
  },
  components: { NavHeader, NavFooter }
};
</script>

<style lang="scss" scoped>
@import '../styles/base.scss';
@import '../styles/GoodsDetail.scss';
</style>

