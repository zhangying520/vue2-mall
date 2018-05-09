<template>
  <div class="home-box">
    <nav-header :backColor="'#000'" :textColor="'#fff'" :tabStatus="false"></nav-header>

    <div>
      <el-carousel trigger="click" height="900px">
        <el-carousel-item v-for="item in 1" :key="item">
          <div class="bg"></div>
          <!-- <img src="../../../static/home_banner.png" alt=""> -->
        </el-carousel-item>
      </el-carousel>

      <el-row class="multiple" :gutter="10">
        <el-col :span="6" class="fixation">
          <img src="../../../static/small_banner_one.jpg" alt="">
          <div class="masking">
            <p class="masking-title">Offine Store</p>
            <div class="masking-content">
              Different types of offline stores can bring different experiences to the customers
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="fixation">
          <img src="../../../static/small_banner_two.jpg" alt="">
          <div class="masking">
            <p class="masking-title">Offine Store</p>
            <div class="masking-content">
              Different types of offline stores can bring different experiences to the customers
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="fixation">
          <img src="../../../static/small_banner_four.jpg" alt="">
          <div class="masking">
            <p class="masking-title">Offine Store</p>
            <div class="masking-content">
              Different types of offline stores can bring different experiences to the customers
            </div>
          </div>
        </el-col>
        <el-col :span="6" class="fixation">
          <img src="../../../static/small_banner_three.jpg" alt="">
          <div class="masking">
            <p class="masking-title">Offine Store</p>
            <div class="masking-content">
              Different types of offline stores can bring different experiences to the customers
            </div>
          </div>
        </el-col>
      </el-row>

      <div class="home-img1"></div>
      <div class="home-img2"></div>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'

export default {
  created () {
  },
  components: {
    NavHeader, NavFooter
  }
}
</script>

<style scoped lang="scss">
  .home-box {overflow-x: hidden;}
  .multiple {
    overflow: hidden;
    max-height: 250px;
    @include px2rem(margin-bottom, 10px);

    .fixation {
      @include rel;
      height: 250px;
      position: relative;
      overflow: hidden;
      &:hover .masking {
        top:0px;
        z-index: 10;
      }
    }

    img {
      height: 250px;
    }
    .masking {
      height: 250px;
      width: 98%;
      position: absolute;
      top: 250px;
      transition: all 0.3s;
      // background: linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,0.6));
      background: rgba(0 ,0 ,0 , .5);
      @include cur;

      .masking-title {
        @include px2rem(margin-top, 44px);
        @include px2rem(margin-bottom, 26px);
        @include tac;
        color: #e22377;
        @include px2rem(font-size, 20px);
        font-style: italic;
        // font-weight: 600;
      }
      .masking-content {
        padding: 0 36px;
        color: #fff;
        @include px2rem(font-size, 14px);
        @include px2rem(line-height, 35px);
        // font-weight: 600;
      }
    }
  }
  .home-img1 {
    background: url(../../../static/home-one.png) no-repeat;
    background-size: cover;
    height: 750px;
  }
  .home-img2 {
    background: url(../../../static/home-two.png) no-repeat;
    background-size: contain;
    @include px2rem(margin-top, 20px);
    @include px2rem(margin-left, 53px);
    @include px2rem(height, 750px);
  }

  .el-carousel {
    margin-bottom: 10px;
  }
  .el-carousel__container {
    height: 900px;
  }
  .bg {
    background: url('../../../static/home_banner.png') no-repeat;
    background-size: contain;
    background-position: center;
    height: 900px;
  }
</style>

