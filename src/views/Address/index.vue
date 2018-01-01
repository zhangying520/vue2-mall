<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>收货地址</nav-bread>

    <div class="address">
      <h3 class="address-title">送货地址</h3>
      <el-row :gutter="20">
        <el-col :span="6" v-for="(item, index) in addressList" :key="index" class="address-item">
          <el-card class="box-card">
            <div class="text item">
              <p>{{ item.consignee_name }}</p>
              <p class="detailed-address">{{ item.street_address }}</p>
              <p class="phone">{{ item.phone }}</p>
              <div class="set-default">
                <div class="set-btn">
                  <el-radio :label="index" v-model="radio" size="mini" @change="setDefaultAddress(item.address_id)">设为默认</el-radio>
                </div>
                <div class="remove-btn" @click="removeAddress(item.address_id)">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="18">
          <el-button plain class="commitOrder">提交订单</el-button>
        </el-col>
      </el-row>
      <div class="product-button-line">

      </div>
    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/Breadcrumb'
import { address, setDefault, deleteAddress } from '@/api/address'

export default {
  components: { NavHeader, NavFooter, NavBread },
  data() {
    return {
      msg: '这里是地址组件',
      radio: 0,
      addressList: []
    }
  },
  mounted() {
    this.getAddress()
  },
  methods: {
    getAddress() { // 获取所有地址
      address().then(response => {
        this.addressList = response.result
        this.addressList.map((item, index) => {
          if (item.is_default) {
            this.radio = index
          }
        })
        console.log(response)
      }, error => {
        console.error(error)
      })
    },
    setDefaultAddress(addressId) { // 设置默认地址
      let param = { address_id: addressId }
      setDefault(param).then(response => {
        console.log(response)
      }, error => {
        console.error(error);
      })
      // console.log(val);
    },
    removeAddress(addressId) { // 删除地址
      const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          message: '你确定要删除这个地址吗？',
          showCancelButton: true,
          lockScroll: false,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';

              // 删除地址
              let param = { addressId: addressId }
              deleteAddress(param).then(response => {
                console.log(response)
                done() // 关闭 MsgBox
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
                this.getAddress() // 重新获取地址
                // location.reload()

              }, error => {
                console.error(error)
                done()
                this.$message({
                  type: 'error',
                  message: 'Error: ' + error.message
                });
              })

            } else {
              done();
            }
          }
        }).then(action => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功'
          // });
        }).catch(error => {
          // TODO
          // 点击了cancel
        });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/base.scss';

.address {
  @include init();
  padding: 15px 0;

  .address-title {
    @include f(24, px);
    margin: 20px 0;
  }
  .detailed-address {
    margin-top: 5px;
    @include f(14, px);
  }
  .address-item {
    margin-bottom: 20px;
  }
  .phone {
    margin-top: 20px;
    @include f(14, px);
  }
  .set-default {
    margin-top: 10px;
    @include clear;
    line-height: 28px;
  }
  .set-btn {
    @include fl;
    @include f(12, px);
    // line-height:
  }
  .remove-btn {
    @include fr;
    @include f(20,px);
    @include cur;
  }
  .commitOrder {
    margin-top: 25px;
    width: 250px;
    font-size: 20px;
    height: 48px;
    line-height: 48px;
    padding: 0 80px;
    color: #fff;
    background-color: #e62878;
    border-color: #e62878;
  }
}
</style>
<style>
.el-radio__label {
  font-size: 12px;
}
</style>


