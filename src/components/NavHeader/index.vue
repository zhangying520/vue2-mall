<template>
  <el-header :style="{background: backColor}">
    <div class="colr-red navbar">
      <router-link :to="{ path: '/' }">
        <h1 class="navbar-left-container">
          <a id="navbar-logo">KITTY网</a>
        </h1>
      </router-link>

      <el-dropdown v-if="this.$router.currentRoute.path == '/goods'" class="avatar-container navbar-right-container" trigger="click" :show-timeout="10">
        <div class="avatar-wrapper">
          <!-- <img class="user-avatar" :src="iconUrl + avatar"> -->
          <img class="user-avatar" src="../../assets/head_portrait.jpg">
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

      <el-menu :router="true" v-else :active-text-color="activeColor" :text-color="textColor"
       :background-color="backColor" :default-active="this.$router.currentRoute.path"
        class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="/">HOME</el-menu-item>
        <el-menu-item index="/about" disabled>ABOUT</el-menu-item>
        <el-menu-item index="/goods" disabled>SHOP</el-menu-item>
        <el-menu-item index="/service" disabled>SERVICE</el-menu-item>
        <el-menu-item index="/contact" disabled>CONTACT</el-menu-item>
        <el-menu-item index="6" disabled>
          <svg-icon icon-class="search" class="search"></svg-icon>
        </el-menu-item>
      </el-menu>
    </div>
  </el-header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: {
    backColor: {
      type: String,
      default: '#fff'
    },
    textColor: {
      type: String,
      default: '#909399'
    },
    activeColor: {
      type: String,
      default: '#e22377'
    }
  },
  computed: {
    ...mapGetters(['name', 'cartCount'])
  },
  data () {
    return {
      msg: 'NavHeader',
      activeIndex: '/'
    }
  },
  updated () {
    console.log('购物车数量 === ' + this.cartCount)
  },
  created () {
    console.log(this.$router.currentRoute.path)
    this.GetInfo().then(response => {
      // code == 100 == 未登录
      if (response.code !== 100) {
        this.getCartCount()
      }
      console.log(response)
    }, error => {
      console.log(error)
    })
  },
  methods: {
    ...mapActions(['LogOut', 'CartCount', 'GetInfo']),
    logout () {
      this.LogOut().then(response => { // 登出
        console.log(response)
        sessionStorage.removeItem('User-Name')
        location.reload() // 为了重新实例化vue-router对象 避免bug
      }, error => {
        console.log(error)
      })
    },
    getCartCount () { // 获取购物车数量
      this.CartCount().then(response => {
        console.log(response)
      })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/base.scss';
@import '../../styles/NavHeader.scss';
</style>
