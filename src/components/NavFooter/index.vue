<template>
    <el-footer style="text-align: center;font-size: 12px;line-height: 60px;">
        {{ Copyright }}
    </el-footer>
</template>

<script>
export default {
  data () {
    return {
      Copyright: 'Copyright © 2017 - 2018. DDD 保留所有权利 粤ICP备17158394号-1'
    }
  }
}
</script>

<style lang="scss" scoped>
.el-footer {
  @include abs;
  width: 100%;
  // bottom: 0;
}
</style>
