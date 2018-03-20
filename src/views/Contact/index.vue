<template>
  <div>
    <nav-header :backColor="'#000'" :textColor="'#fff'" :tabStatus="false"></nav-header>
    <nav-bread>CONTACT</nav-bread>
    <div class="contact">
      <div class="contact-diagram"></div>
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
  .contact {
    margin: 40px 60px;
    .contact-diagram {
      background: url(../../../static/contact-banner.png) no-repeat;
      background-size: contain;
      height: 582px;
    }
  }
</style>
