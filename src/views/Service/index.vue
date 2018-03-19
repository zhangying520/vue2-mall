<template>
  <div>
    <nav-header :backColor="'#000'" :textColor="'#fff'"></nav-header>
    <nav-bread>SERVICE</nav-bread>
    <img src="../../../static/service_one.png"/>
    <img src="../../../static/service_two.png"/>
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

<style>

</style>
