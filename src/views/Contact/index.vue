<template>
  <div>
    <nav-header :backColor="'#000'" :textColor="'#fff'"></nav-header>
    <h1>Contact</h1>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  export default {
    components: {
      NavHeader, NavFooter
    }
  }
</script>

<style>

</style>
