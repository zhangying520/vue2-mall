<template>
  <div class="hello">
    <h1>这里是一级页面（未完成）</h1>
    <h2>{{ msg }}</h2>
    <router-link to="goods">
      <el-button type="primary">商品列表</el-button>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapGetters(['token'])
  },
  mounted () {
    console.log(this.token)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
