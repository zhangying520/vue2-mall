<template>
  <nav class="global-sub-nav-line">
    <div :span="24" class="global-sub-nav-inner">
      <h5 class="global-sub-nav-title">
        <slot></slot>
      </h5>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
  .global-sub-nav-line {
  border-bottom: 1px solid #e1e1e1;
  .global-sub-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
  }
  .global-sub-nav-title {
    font-size: 18px;
    font-weight: 400;
    height: 50px;
    line-height: 50px;
  }
}
</style>
