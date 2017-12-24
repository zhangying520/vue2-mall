<template>
  <el-container>
    <el-header>
      <div class="colr-red navbar">
        <div class="navbar-left-container">
          Logo
        </div>
        <div class="navbar-right-container">
          <a href="javascipt:;" class="navbar-link">Login</a>
          <a href="javascipt:;" class="navbar-link">Header</a>
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
      <div>Main</div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="scss">
@import '../styles/base.scss';
@import '../styles/GoodsList.scss';
</style>

