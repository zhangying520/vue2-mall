<template>
  <div class="about-root">
    <nav-header :backColor="'#000'" :textColor="'#fff'" :tabStatus="false"></nav-header>
    <nav-bread>ABOUT US</nav-bread>
    <div class="about">
      <div class="about-top">
        <div class="about-one"></div>
      </div>
      <div class="about-company"></div>
    </div>
    <div class="about-two"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/Breadcrumb'
  export default {
    components: {
      NavHeader, NavFooter, NavBread
    }
  }
</script>

<style lang="scss" scoped>
  .about-root {
    height: 100%;
  }
  .about {
    margin: 40px 30px;
    @include rel;
    .about-top {
      background: url(../../../static/about_profile.png) no-repeat;
      background-size: contain;
      height: -webkit-fill-available;
      @include tac;
    }
    .about-one {
      background: url(../../../static/about_one.png) no-repeat center center;
      background-size: contain;
      height: -webkit-fill-available;
      width: 50%;
      margin-top: 148px;
      display: inline-block;
      // @include abs;
      // top: 148px;
      // margin: 0 auto;
      // left: 50%;
      // margin-left: -325px;
    }
    .about-company {
      background: url(../../../static/about_company.png) no-repeat center center;
      background-size: contain;
      height: -webkit-fill-available;
      @include px2rem(margin-top, 200px);
    }
  }
  .about-two {
    background: url(../../../static/about_company_two.png) no-repeat center center;
    background-size: contain;
    height: -webkit-fill-available;
    // @include px2rem(margin-top, 100px);
  }
</style>
