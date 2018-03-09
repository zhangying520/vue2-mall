<template>
  <div class="hello">
    <h1>这里是一级页面（未完成）</h1>
    <h2>{{ msg }} {{$t('default.el.global.settleAccounts')}}</h2>
    <router-link to="goods">
      <el-button type="primary">商品列表</el-button>
    </router-link>
    <el-dropdown trigger="click" @command="switchover">
      <el-button type="primary">
        切换语言
        <i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="zh-cn">中文</el-dropdown-item>
        <el-dropdown-item command="en-us">English</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Me Vue Mall App'
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  mounted () {
    console.log(this)
  },
  methods: {
    switchover (type) {
      this.$msgbox({
        title: '提示',
        message: '确定切换语言吗?',
        showCancelButton: true,
        lockScroll: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(action => {
        console.log(this)
        if (this.lang === 'zh-cn') {
          this.lang = 'en-us'
          this.$i18n.locale = this.lang // 关键语句
        } else {
          this.lang = 'zh-cn'
          this.$i18n.locale = this.lang // 关键语句
        }
        console.log(type)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.hello {
  text-align: center;
  line-height: 50px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu__item {
  line-height: 36px;
}
</style>
