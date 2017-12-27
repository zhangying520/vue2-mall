<template>
    <el-footer style="text-align: center;font-size: 12px;">
        {{ Copyright }}
    </el-footer>
</template>

<script>
export default {
  data() {
    return {
      Copyright: "Copyright © 2017 Denton Inc. DDD 保留所有权利"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../styles/base.scss";
@import "../../styles/GoodsList.scss";
</style>
