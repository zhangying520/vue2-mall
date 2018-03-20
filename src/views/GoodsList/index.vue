<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>商品列表</nav-bread>

    <el-main>
      <div>
        <el-carousel trigger="click">
          <el-carousel-item v-for="item in 1" :key="item">
            <div class="banner-img" style="background: url(../../../static/banner.png)"></div>
          </el-carousel-item>
        </el-carousel>
      </div>
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
            <div class="nav-breadcrumb" id="sort">
              <span @click="sortFlag = true">价格从低到高</span>
              <span @click="sortFlag = false">价格从高到低</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

      <div class="goods-list">
        <el-row>
          <el-col :span="6" v-for="(o, index) in goodsList" :key="index">
            <router-link :to="{path: 'goods/detail/' + o.product_id}">
              <el-card :body-style="{ padding: '0px' }">
                <img v-lazy="iconHost + o.product_image" class="goods-list-image">
                <div style="padding: 14px;">
                  <span class="product-name">{{ o.product_name }}</span>
                  <div class="bottom clearfix">
                    <p class="goods-price">RMB {{ o.sale_price }}</p>
                  </div>
                </div>
              </el-card>
            </router-link>
          </el-col>
      </el-row>
      </div>
    </el-main>

    <nav-footer></nav-footer>

  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/Breadcrumb'
import { getGoods } from '@/api/goods'

export default {
  data () {
    return {
      currentDate: new Date().toLocaleString(),
      goodsList: [],
      iconHost: '',
      sortFlag: true, // true升序 false降序
      page: 1,
      pageSize: '',
      loading: ''
    }
  },
  created () {
    this.iconHost = process.env.ICON_API
    this.getGoodsList()
  },
  mounted () {
    this.$nextTick(() => {
      // console.log(process.env.ICON_API)
    })
  },
  methods: {
    getGoodsList () {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        // spinner: "el-icon-loading",
        background: 'rgba(0, 0, 0, 0.7)'
      })
      var params = {
        page: this.page,
        pageSize: this.pageSize,
        sort: this.sortFlag ? 1 : -1
      }
      getGoods(params).then(
        response => {
          this.loading.close()
          this.goodsList = response.result.list
          console.log(response)
        },
        error => {
          console.error(error)
          this.loading.close()
        }
      )
    }
  },
  components: {
    NavHeader,
    NavFooter,
    NavBread
  },
  watch: {
    sortFlag: function (val) {
      this.getGoodsList()
    }
    // deep: true
  }
}
</script>

<style lang="scss">
@import "../../styles/GoodsList.scss";
</style>

