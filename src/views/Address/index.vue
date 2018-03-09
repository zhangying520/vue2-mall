<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>收货地址</nav-bread>

    <div class="address">
      <h3 class="address-title" @click="openAdd">{{$t('default.el.global.deliveryAddress')}}</h3>
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
                <div class="remove-btn" @click="removeAddress(item.address_id, item.is_default)">
                  <i class="el-icon-delete"></i>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6" :offset="18">
          <el-button plain class="commitOrder" @click="commitOrder">
            {{$t('default.el.global.submitOrder')}}
          </el-button>
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
  data () {
    return {
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
        delivery: false
      },
      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      allProvince: [],
      allCity: [],
      allArea: []
    }
  },
  created () {
    this.getAddress()
  },
  methods: {
    getAddress () { // 获取所有地址
      const userId = sessionStorage.getItem('User-Id')
      address({ userId }).then(response => {
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
    setDefaultAddress (addressId) { // 设置默认地址
      const userId = sessionStorage.getItem('User-Id')
      const param = { 'address_id': addressId, 'userId': userId }
      setDefault(param).then(response => {
        console.log(response)
      }, error => {
        console.error(error)
      })
      // console.log(val);
    },
    removeAddress (addressId, isDefault) { // 删除地址
      // const h = this.$createElement
      this.$msgbox({
        title: '消息',
        message: '你确定要删除这个地址吗？',
        showCancelButton: true,
        lockScroll: false,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '删除中...'

              // 删除地址
            const userId = sessionStorage.getItem('User-Id')
            const param = { 'addressId': addressId, 'is_default': isDefault, 'userId': userId }
            deleteAddress(param).then(response => {
              console.log(response)
              done() // 关闭 MsgBox
              setTimeout(() => {
                instance.confirmButtonLoading = false
              }, 300)
              this.getAddress() // 重新获取地址
                // location.reload()
            }, error => {
              done()
              this.$message({
                type: 'error',
                message: 'Error: ' + error.message
              })
            })
          } else {
            done()
          }
        }
      }).then(action => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功'
          // });
      }).catch(error => {
        console.log(error)
          // TODO
          // 点击了cancel
      })
    },
    // 打开新增收货地址
    openAdd () {
      this.dialogFormVisible = true
      this.provinces()
    },
    selectedPro (val) {
      this.city(val)
      // console.log(val)
    },
    selectedCity (val) {
      this.area(val)
      // console.log(val)
    },
    selectedArea (val) {
      console.log(val)
    },
    // 获取所有省
    provinces (val) {
      getProvinces().then(response => {
        this.allProvince = response.result
        console.log(response)
      }, error => {
        console.log(error)
      })
    },
    // 获取所有市
    city (provincesId) {
      const id = { provincesId: provincesId }
      getCity(id).then(response => {
        this.allCity = response.result
        // console.log(response);
      }, error => {
        console.log(error)
      })
    },
    // 获取所有区
    area (cityId) {
      const id = { cityId: cityId }
      getArea(id).then(response => {
        this.allArea = response.result
        console.log(response)
      }, error => {
        console.log(error)
      })
    },
    // 添加收货地址
    commitAddress () {
      const userId = sessionStorage.getItem('User-Id')
      const params = {
        'consigneeName': this.addressForm.name, // 收货人姓名
        'provincesId': this.addressForm.provinces, // 省份id
        'cityId': this.addressForm.city, // 城市id
        'areaId': this.addressForm.area, // 区域id
        'streetAddress': '暂时不填', // 地址详细信息
        'phone': this.addressForm.phone, // 手机
        'isDefault': this.addressForm.isDefault, // 是否默认
        'userId': userId
      }

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
    commitOrder () {
      // this.$message({
      //   showClose: true,
      //   message: '功能尚未开放，请耐心等待!'
      // });
      const userId = sessionStorage.getItem('User-Id')
      const params = { 'order_total': 999, 'address_id': 1, 'userId': userId }
      payMent(params).then(response => {
        console.log(response)
        this.$message({
          showClose: true,
          type: 'success',
          message: response.msg
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
    background-color: $checkedColor;
    border-color: $checkedColor;
  }
}
</style>
<style>
.el-radio__label {
  font-size: 12px;
}
</style>

