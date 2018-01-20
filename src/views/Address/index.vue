<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>收货地址</nav-bread>

    <div class="address">
      <h3 class="address-title" @click="openAdd">送货地址</h3>
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
          <el-button plain class="commitOrder" @click="commitOrder">提交订单</el-button>
        </el-col>
      </el-row>

      <div class="product-button-line"></div>

      <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
        <el-form :model="addressForm">
          <el-form-item label="收货人姓名" :label-width="formLabelWidth">
            <el-input v-model="addressForm.name" auto-complete="off" style="width:208px;"></el-input>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-select v-model="addressForm.provinces" placeholder="请选择省份" @change="selectedPro">
              <el-option :label="item.fullname" :value="item.provinces_id" v-for="(item, index) in allProvince" :key="index"></el-option>
            </el-select>
            <el-select v-model="addressForm.city" placeholder="请选择城市" @change="selectedCity">
              <el-option :label="cityItem.name" :value="cityItem.city_id" v-for="(cityItem, index) in allCity.fullname" :key="index"></el-option>
            </el-select>
            <el-select v-model="addressForm.area" placeholder="请选择区域">
              <el-option :label="areaItem.name" :value="areaItem.area_id" v-for="(areaItem, index) in allArea.fullname" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收货人电话" :label-width="formLabelWidth">
            <el-input v-model="addressForm.phone" auto-complete="off" style="width:208px;"></el-input>
          </el-form-item>
          <el-form-item label="是否设为默认" :label-width="formLabelWidth">
            <el-checkbox v-model="addressForm.isDefault">默认</el-checkbox>
            <!-- <el-input v-model="" auto-complete="off" style="width:208px;"></el-input> -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="commitAddress">确 定</el-button>
        </div>
      </el-dialog>

    </div>

    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from '@/components/NavHeader'
import NavFooter from '@/components/NavFooter'
import NavBread from '@/components/Breadcrumb'
import { address, setDefault, deleteAddress, addAddress, getProvinces, getCity, getArea } from '@/api/address'
import { payMent } from '@/api/payMent'

export default {
  components: { NavHeader, NavFooter, NavBread },
  data() {
    return {
      msg: '这里是地址组件',
      radio: 0,
      addressList: [],
      addressForm: {
        name: '',
        region: '',
        phone: '',
        isDefault: false,
        provinces: '',
        city: '',
        area: '',
        delivery: false,
      },
      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      allProvince: [],
      allCity: [],
      allArea: []
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
    },
    // 打开新增收货地址
    openAdd() {
      this.dialogFormVisible = true
      this.provinces()
    },
    selectedPro(val) {
      this.city(val)
      // console.log(val)
    },
    selectedCity(val) {
      this.area(val)
      // console.log(val)
    },
    selectedArea(val) {
      console.log(val)

    },
    // 获取所有省
    provinces(val) {
      getProvinces().then(response => {
        this.allProvince = response.result
        console.log(response)
      }, error => {
        console.log(error)
      })
    },
    // 获取所有市
    city(provincesId) {
      let id = { provincesId: provincesId }
      getCity(id).then(response => {
        this.allCity = response.result
        // console.log(response);
      }, error => {
        console.log(error)
      })
    },
    // 获取所有区
    area(cityId) {
      let id = { cityId: cityId }
      getArea(id).then(response => {
        this.allArea = response.result
        console.log(response)
      }, error => {
        console.log(error)
      })
    },
    commitAddress() { // 添加收货地址
      let params = {
        consigneeName: this.addressForm.name,
        streetAddress: this.addressForm.provinces,
        phone: this.addressForm.phone,
        isDefault: this.addressForm.isDefault
      }
      // console.log(params)
      addAddress(params).then(response => {
        console.log(response)
        this.dialogFormVisible = false
        this.$message({
          message: '添加成功!',
          type: 'success'
        })
        this.getAddress()
      }, error => {
        console.error(error)
      })
    },
    // 生成订单
    commitOrder() {
      // this.$message({
      //   showClose: true,
      //   message: '功能尚未开放，请耐心等待!'
      // });
      let params = {order_total: 999, address_id: 1}
      payMent(params).then(response => {
        console.log(response);
      })
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


