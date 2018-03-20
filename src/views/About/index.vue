<template>
  <div>
    <nav-header :backColor="'#000'" :textColor="'#fff'" :tabStatus="false"></nav-header>
    <nav-bread>ABOUT US</nav-bread>
    <h1>About</h1>
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
