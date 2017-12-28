<template>
  <el-container>

    <nav-header></nav-header>

    <div class="nav-breadcrumb-wrap">
      <div class="container">
        <el-row>
          <el-col :span="20">
            <el-breadcrumb separator="/" class="nav-breadcrumb">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>Goods</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="4">
            <div class="nav-breadcrumb">
              <span @click="sortFlag = true">升序</span>
              <span @click="sortFlag = false">降序</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <el-main>
      <!-- <div>
        <el-carousel trigger="click">
          <el-carousel-item v-for="item in 1" :key="item">
            <img src="../../static/banner.png" alt="">
          </el-carousel-item>
        </el-carousel>
      </div> -->

      <div class="goods-list">
        <el-row>
          <el-col :span="6" v-for="(o, index) in goodsList" :key="index">
            <router-link :to="{path: 'goods/detail/' + o.productId}">
              <el-card :body-style="{ padding: '0px' }">
                <img :src="iconHost + o.productImage" class="goods-list-image">
                <div style="padding: 14px;">
                  <span class="product-name">{{ o.productName }}</span>
                  <div class="bottom clearfix">
                    <p class="goods-price">RMB {{ o.salePrice }}</p>
                  </div>
                </div>
              </el-card>
            </router-link>
          </el-col>
      </el-row>
      </div>
    </el-main>

    <!-- <nav-footer></nav-footer> -->
    <el-footer style="text-align: center;font-size: 12px;">
      Copyright © 2017 Denton Inc. DDD 保留所有权利
    </el-footer>

  </el-container>
</template>

<script>
import NavHeader from "../components/NavHeader";
import NavFooter from "../components/NavFooter";
import { getGoods } from "../api/goods";
export default {
  data() {
    return {
      currentDate: new Date().toLocaleString(),
      goodsList: [],
      iconHost: "",
      sortFlag: true, // 升序还是降序
      page: 1,
      pageSize: "",
      loading: ""
    };
  },
  mounted() {
    this.iconHost = process.env.ICON_API;
    this.getGoodsList();
    // console.log(this.$loading());
  },
  methods: {
    getGoodsList() {
      this.loading = this.$loading({
        lock: true,
        text: "Loading",
        // spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      var params = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1
      };
      getGoods(params).then(
        response => {
          this.loading.close();
          this.goodsList = response.result.list;
          console.log(response);
        },
        error => {
          console.error(error);
          this.loading.close();
        }
      );
    }
  },
  components: {
    NavHeader,
    NavFooter
  },
  watch: {
    sortFlag: function (val) {
      this.getGoodsList();
      console.log(val);
    },
    // deep: true
  }
};
</script>

<style lang="scss">
@import "../styles/base.scss";
@import "../styles/GoodsList.scss";
</style>

