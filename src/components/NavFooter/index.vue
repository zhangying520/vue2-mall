<template>
    <el-footer style="text-align: center;font-size: 12px;line-height: 60px;">
        {{ Copyright }}
    </el-footer>
</template>

<script>
export default {
  data () {
    return {
      Copyright: 'Copyright © 2017 Denton Inc. DDD 保留所有权利'
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
