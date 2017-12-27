<template>
  <el-header>
    <div class="colr-red navbar">
      <div class="navbar-left-container">
        <div id="navbar-logo"></div>
      </div>
      <div class="navbar-right-container">
        <a href="javascipt:;" class="navbar-link">Login</a>
        <a href="javascipt:;" class="navbar-link">Logout</a>
        <div class="navbar-cart-container">
          <svg-icon icon-class="cart" class="cart"></svg-icon>
          <span class="cart-number">1</span>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      msg: "NavHeader"
    };
  },
  mounted() {
    // console.log(123);
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
@import '../../styles/NavHeader.scss';
</style>
