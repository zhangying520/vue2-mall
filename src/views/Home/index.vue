<template>
  <div>
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
          <div class="masking">123</div>
        </el-col>
        <el-col :span="6" class="fixation">
          <img src="../../../static/small_banner_two.jpg" alt="">
          <div class="masking">123</div>
        </el-col>
        <el-col :span="6" class="fixation">
          <img src="../../../static/small_banner_four.jpg" alt="">
          <div class="masking">123</div>
        </el-col>
        <el-col :span="6" class="fixation">
          <img src="../../../static/small_banner_four.jpg" alt="">
          <div class="masking">123</div>
        </el-col>
      </el-row>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'

export default {
  created () {
    console.log(122)
  },
  components: {
    NavHeader, NavFooter
  }
}
</script>

<style scoped lang="scss">
  .multiple {
    overflow: hidden;
    max-height: 250px;
    .fixation {
      @include rel;
    }

    img {
      height: 250px;
      &:hover + .masking {
        @include css3(transform, translateY(-250px));
      }
    }
    .masking {
      background: rgba(0, 0, 0, .5);
      transition: transform .2s ease;
      width: 375px;
      height: 250px;
      @include css3(transform, translateY(0px));
    }
  }

  .el-carousel {
    margin-bottom: 10px;
  }
  .el-carousel__container {
    height: 900px;
  }
  .bg {
    background: url('../../../static/home_banner.png') no-repeat;
    background-size: cover;
    background-position: center;
    height: 900px;
  }
</style>

