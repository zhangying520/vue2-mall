<template>
  <div>
    <nav-header :backColor="'#000'" :textColor="'#fff'" :tabStatus="false"></nav-header>
    <nav-bread>SERVICE</nav-bread>
    <div class="service">
      <div class="service-top"></div>
      <div class="service-bottom"></div>
    </div>
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
  .service {
    margin: 0 30px;
    .service-top {
      background: url(../../../static/service_one.png) no-repeat;
      background-size: contain;
      height: 580px;
    }
    .service-bottom {
      background: url(../../../static/service_two.png) no-repeat;
      background-size: contain;
      height: 400px;
    }
  }

</style>
