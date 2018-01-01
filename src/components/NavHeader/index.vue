<template>
  <el-header>
    <div class="colr-red navbar">
      <div class="navbar-left-container">
        <div id="navbar-logo"></div>
      </div>
      <!-- <div class="navbar-right-container">
        <router-link to="/login" class="navbar-link">Login</router-link>
        <a href="javascipt:;" class="navbar-link">Logout</a>
        <div class="navbar-cart-container">
          <svg-icon icon-class="cart" class="cart"></svg-icon>
          <span class="cart-number">1</span>
        </div>
      </div> -->
      <el-dropdown class="avatar-container navbar-right-container" trigger="click" :show-timeout="10">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="iconUrl + avatar"> -->
          <span style="cursor: pointer;">{{ name }}</span>
          <router-link to="/login">
            <div style="cursor: pointer; padding: 0 10px;" v-if="!name">登录</div>
          </router-link>
          <i class="el-icon-caret-bottom" v-if="name"></i>

          <router-link to="/cart">
            <div class="navbar-cart-container">
              <svg-icon icon-class="cart" class="cart"></svg-icon>
              <span class="cart-number" v-if="cartCount > 0">{{ cartCount }}</span>
            </div>
          </router-link>

        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link class="inlineBlock" to="/goods">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="logout" style="display:block;">LogOut</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['name', 'cartCount']),
    // cartCoun() {
    //   return 10
    // }
  },
  data() {
    return {
      msg: "NavHeader",
    };
  },
  updated() {
    console.log(this.cartCount);
  },
  methods: {
    ...mapActions(['LogOut', 'CartCount', 'GetInfo']),
    logout() {
      this.LogOut().then(response => { // 登出
        console.log(response)
        sessionStorage.removeItem('User-Name')
        location.reload() // 为了重新实例化vue-router对象 避免bug
      }, error => {
        console.log(error)
      })
    },
    getCartCount() { // 获取购物车数量
      this.CartCount().then(response => {
        console.log(response)
      })
    }
  },
  mounted() {
    this.GetInfo().then(response => {
      // code == 100 == 未登录
      if (response.code != 100) {
        this.getCartCount()
      }
      console.log(response)
    }, error => {
      console.log(error)
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
@import '../../styles/NavHeader.scss';
</style>
