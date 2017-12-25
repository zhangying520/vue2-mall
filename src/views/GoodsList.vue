<template>
  <el-container>
    <el-header>
      <div class="colr-red navbar">
        <div class="navbar-left-container">
          Logo
        </div>
        <div class="navbar-right-container">
          <a href="javascipt:;" class="navbar-link">Login</a>
          <a href="javascipt:;" class="navbar-link">Logout</a>
          <div class="navbar-cart-container">
            <svg-icon icon-class="cart" class="cart"></svg-icon>
          </div>
        </div>
      </div>
    </el-header>

    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <el-breadcrumb separator="/" class="nav-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>Goods</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <el-main>
      <div>
        <!-- <el-carousel trigger="click">
          <el-carousel-item v-for="item in 1" :key="item">
            <img src="../../static/mt.png" alt="">
          </el-carousel-item>
        </el-carousel> -->
      </div>
      
      <div class="goods-list">
        <el-row>
          <el-col :span="6" v-for="(o, index) in 10" :key="o">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="'../../static/'+(index+1)+'.jpg'" class="goods-list-image">
              <div style="padding: 14px;">
                <span>美图M8定制版手机壳</span>
                <div class="bottom clearfix">
                  <p class="goods-price">{{ currentDate }}</p>
                </div>
              </div>
            </el-card>
          </el-col>
      </el-row>
      </div>
    </el-main>

    <el-footer>
      Copyright © 2017 Denton Inc. DDD 保留所有权利
    </el-footer>
    
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date().toLocaleString()
    }
  }
}
</script>

<style lang="scss">
@import '../styles/base.scss';
@import '../styles/GoodsList.scss';
</style>

