<template>
  <div class="page-media-reward">

    <c-title title="提交订单"></c-title>

    <div class="container clearfix" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <c-menu class="pull-left mt10"></c-menu>

      <div class="container-right pull-right">
        <div class="top-title">填写收货地址 选择收货地址</div>
        <div class="sub-title">配送地址</div>

        <div class="address-list-panel" v-if="addressList.length">
          <div class="address-list" :style="{'height': showAll ? (autoHeight + 'px') : '155px'}">
            <div
              @click="setCurAddress(index)"
              class="address-item"
              :class="{'active': item.cur}"
              v-for="(item, index) in addressList"
              :key="item.id">
              <div class="address-top">
                <span class="">收件人: {{item.fdReceiver}}</span>
                <span class="pull-right">{{item.fdMobile}}</span>
              </div>
              <div class="address-detail">
                {{item.fdProvice}}{{item.fdCity}}{{item.fdCountry}}{{item.fdStreet}}
              </div>
              <el-button type="text" class="modify-btn" @click.stop="modifyAddress(item)">修改</el-button>
              <span class="default-text" v-if="item.fdIsDefault">默认地址</span>
              <i class="icon iconfont icon-choosen" v-if="item.cur"></i>
            </div>
          </div>
          <div class="address-operate-line">
            <el-button v-if="addressList.length > 3" type="text" @click="toggleAllAddress">显示全部地址</el-button>
            <div
              @click="addAddress"
              class="add-address-btn pull-right">
              <i class="icon iconfont icon-add"></i>
              新增收货地址
            </div>
          </div>
        </div>

        <div class="form-panel" v-if="!!formType && finished === 'no'">
          <div class="form-tips">
            <span v-if="formType === 'modify'">修改地址</span>
            <span v-if="formType === 'add' || formType === 'first' ">添加新地址</span>
            <div class="note">
              (<span class="color-primary">*</span>为必填项)
            </div>
          </div>

          <el-form class="form" ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="收件人" prop="receiver">
              <el-input v-model="form.receiver" class="w145"></el-input>
            </el-form-item>

            <el-form-item label="所在地区" required>
              <el-col :span="4">
                <el-form-item prop="province" class="w145">
                  <el-select
                    clearable
                    v-model="form.province"
                    placeholder="请选择"
                    @change="changeProvince()">
                    <el-option
                      v-for="item in areaList"
                      :key="item.id"
                      :label="item.fdName"
                      :value="item.fdName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="4" v-if="(cityList && cityList.length) || form.city">
                <el-form-item prop="city" class="w145">
                  <el-select
                    clearable
                    v-model="form.city"
                    placeholder="请选择"
                    @change="changeCity()">
                    <el-option
                      v-for="item in cityList"
                      :key="item.id"
                      :label="item.fdName"
                      :value="item.fdName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="4" v-if="(districtList && districtList.length) || form.district">
                <el-form-item prop="district" class="w145">
                  <el-select
                    clearable
                    v-model="form.district"
                    placeholder="请选择">
                    <el-option
                      v-for="item in districtList"
                      :key="item.id"
                      :label="item.fdName"
                      :value="item.fdName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-form-item>

            <el-form-item label="街道地址" prop="street">
              <el-input v-model="form.street" class="w480"></el-input>
            </el-form-item>

            <el-form-item label="邮政编码" prop="postcode">
              <el-input v-model="form.postcode" class="w145"></el-input>
            </el-form-item>

            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="form.mobile" class="w145"></el-input>
            </el-form-item>

            <el-form-item label="">
              <el-checkbox v-model="form.isDefault">设置为默认信息</el-checkbox>
            </el-form-item>

            <el-form-item label="">
              <el-button :disabled="savingAddress" type="primary" @click="onSubmit('form')">保存</el-button>
              <el-button @click="clearAll('form')">清空</el-button>
            </el-form-item>

          </el-form>

          <div class="separate-line"></div>
        </div>

        <div class="reward-panel">
          <div class="reward-title">确认兑换信息</div>
          <table class="reward-table">
            <thead>
              <tr>
                <th>商品名称</th>
                <th>兑换积分</th>
                <th>数量</th>
                <th>小计</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in tempCartList"
                :key="item.id">
                <td class="goods-info-td">
                  <div class="goods-info">
                    <div class="goods-img-box">
                      <img :src="item.fdImage" class="goods-img">
                    </div>

                    <div class="goods-info-in">
                      <div class="goods-name ellipsis" :title="item.fdName" :alt="item.fdName">{{item.fdName}}</div>
                      <div class="goods-description ellipsis" :title="item.fdDesp" :alt="item.fdDesp">{{item.fdDesp}}</div>
                      <div class="goods-price">市场参考价：{{item.fdPrice}}元</div>
                    </div>
                  </div>
                </td>
                <td>{{item.fdPoints | numToThousandsRound}}  积分</td>
                <td>{{item.fdGoodsNum}}</td>
                <td>
                  <span class="color-primary">{{(item.fdPoints * item.fdGoodsNum) | numToThousandsRound}}</span> 积分
                </td>
              </tr>
            </tbody>
          </table>
          <div class="font14 text-right">
            兑换总计：<span class="color-primary">{{totalPoints | numToThousandsRound}}</span> 积分
          </div>
          <el-button :disabled="submittingOrder" size="medium " type="primary" class="order-submit-btn" @click="submitOrder">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
export default {
  data () {
    return {
      loading: false,
      formType: '', // first 第一次新增， add 新增，modify 修改
      id: '', // 地址 id，修改时有地址 id，新增则没有
      form: {
        receiver: '',
        province: '',
        city: '',
        district: '',
        street: '',
        postcode: '',
        mobile: '',
        isDefault: false
      },
      rules: {
        receiver: [{
          required: true, message: '请输入收件人名称', trigger: 'blur'
        }],
        province: [{
          required: true, message: '请选择省', trigger: 'blur'
        }],
        city: [{
          required: true, message: '请选择市', trigger: 'blur'
        }],
        district: [{ required: true, message: '请选择区', trigger: 'blur' }],
        street: [{required: true, message: '请填写街道', trigger: 'blur'}],
        postcode: [{required: true, message: '请填写邮政编码', trigger: 'blur'}],
        mobile: [{required: true, message: '请填写手机号码', trigger: 'blur'}]
      },
      cityList: [],
      districtList: [],
      params: {},
      addressList: [],
      showAll: false,
      autoHeight: 0,
      tempCartList: [],
      savingAddress: false,
      submittingOrder: false,
      finished: '',
      curIndex: ''
    }
  },
  mounted () {
    this.$store.dispatch('fetchAccount').then(() => {
      this.fetchAddressList('first').then(() => {
        let length = this.addressList.length
        if (length % 3 === 0) {
          this.autoHeight = 156 * Math.floor(length / 3)
        } else {
          this.autoHeight = 156 * Math.floor(length / 3 + 1) + 10
        }
      })
    })

    this.$store.dispatch('fetchAreaList')
    this.tempCartList = JSON.parse(localStorage.tempCartList)
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    areaList () {
      return this.$store.state.areaList
    },
    totalPoints () {
      let points = 0
      this.tempCartList.forEach((item) => {
        points = points + item.fdPoints * item.fdGoodsNum
      })
      return points
    }
  },
  methods: {
    fetchAddressList (type) {
      this.loading = true
      return this.$http.get('/pm/address/list', {s_IN_fdCustomerId: this.account.id}).then((resp) => {
        console.log('地址列表: ', resp)
        resp.data.data.forEach((item, index) => {
          if (type === 'first') {
            if (item.fdIsDefault) {
              this.curIndex = index
              item.cur = true
            } else {
              item.cur = false
            }
          }
        })
        resp.data.data[this.curIndex].cur = true
        this.addressList = resp.data.data
        if (resp.data.data.length === 0) {
          this.formType = 'first'
          this.finished = 'no'
        } else {
          this.formType = ''
        }
        this.loading = false
      })
    },
    postAddress () {
      return this.$http.post('/pm/address/add', this.params).then((resp) => {
        if (resp.data.code === 1) {
          this.$message.success('添加地址成功！')
        }
      })
    },
    addAddress () {
      this.formType = 'add'
      this.finished = 'no'
      this.form = {
        receiver: '',
        province: '',
        city: '',
        district: '',
        street: '',
        postcode: '',
        mobile: '',
        isDefault: false
      }
    },
    editAddress () {
      return this.$http.put('/pm/address/edit', this.params).then((resp) => {
        if (resp.data.code === 1) {
          this.$message.success('修改地址成功！')
        }
      })
    },
    modifyAddress (item) {
      this.formType = 'modify'
      this.finished = 'no'
      this.form = {
        receiver: item.fdReceiver,
        province: item.fdProvice,
        city: item.fdCity,
        district: item.fdCountry,
        street: item.fdStreet,
        postcode: item.fdPostCode,
        mobile: item.fdMobile,
        isDefault: item.fdIsDefault
      }
      this.id = item.id
    },
    toggleAllAddress () {
      this.showAll = !this.showAll
    },
    setCurAddress (index) {
      this.curIndex = index
      this.addressList.forEach((item, idx) => {
        if (idx === index) {
          item.cur = true
        } else {
          item.cur = false
        }
      })
    },
    onSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formType === 'modify') {
            this.params = {
              fdReceiver: this.form.receiver,
              fdProvice: this.form.province,
              fdCity: this.form.city,
              fdCountry: this.form.district,
              fdStreet: this.form.street,
              fdPostCode: this.form.postcode,
              fdMobile: this.form.mobile,
              fdIsDefault: this.form.isDefault,
              fdCustomerId: this.account.id,
              id: this.id
            }
            this.savingAddress = true
            this.editAddress(this.params).then(() => {
              this.savingAddress = false
              this.finished = 'yes'
              this.fetchAddressList()
            })
          } else {
            if (this.addressList.length === 0) {
              this.form.isDefault = true
            }
            this.params = {
              fdReceiver: this.form.receiver,
              fdProvice: this.form.province,
              fdCity: this.form.city,
              fdCountry: this.form.district,
              fdStreet: this.form.street,
              fdPostCode: this.form.postcode,
              fdMobile: this.form.mobile,
              fdIsDefault: this.form.isDefault,
              fdCustomerId: this.account.id
            }
            this.savingAddress = true
            this.postAddress().then(() => {
              this.savingAddress = false
              this.finished = 'yes'
              this.fetchAddressList()
            })
          }
        } else {
          this.finished = 'no'
          console.log('error submit!!')
          return false
        }
      })
    },
    clearAll (formName) {
      this.$refs[formName].resetFields()
    },
    submitOrder () {
      this.submittingOrder = true
      let addressId = this.addressList[this.curIndex].id
      let itemList = []
      let idList = []
      this.tempCartList.forEach((item, index) => {
        itemList.push({
          fdAddressId: addressId,
          fdBuyerId: this.account.id,
          fdPmGoodsId: item.fdGoodsId,
          fdExchangeNum: item.fdGoodsNum
        })
        idList.push(item.id)
      })
      let params = {
        itemList: itemList
      }
      console.log(idList)
      this.$http.post('/pm/order/customer/order', params).then((resp) => {
        console.log('提交订单: ', resp)
        if (resp.data.code === 1) {
          this.submittingOrder = false
          this.delAllTempCart(idList)
        }
      })
    },
    delAllTempCart (idList) {
      let params = idList.join(',')
      return this.$http.delete(`/pm/cart/deletes/${params}`).then((resp) => {
        console.log('删除购物车: ', resp)
        if (resp.data.code === 1) {
          this.$router.push({ name: 'media-point-success' })
        }
      })
    },
    changeProvince () {
      console.log('form.province: ', this.form.province)
      this.areaList.forEach((item, index) => {
        if (item.fdName === this.form.province) {
          console.log('item: ', item)
          this.cityList = item.secondList
        }
      })
    },
    changeCity () {
      this.cityList.forEach((item, index) => {
        if (item.fdName === this.form.city) {
          this.districtList = item.thirdList
        }
      })
    }
  },
  components: {
    CTitle
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/styles/point-common.less';
.top-title {
  font-size: 24px;
  color: @color-primary;
}
.sub-title {
  padding: 15px;
  margin-top: 30px;
  font-size: 18px;
  background-color: @color-bg2;
}
.form-panel {
  position: relative;
  font-size: 14px;
  clear: both;
  .form-tips {
    margin: 20px 0;
    .note {
      display: inline-block;
      color: @color-font-light2;
    }
  }
  .form {
    padding-bottom: 15px;
  }
  .separate-line {
    width: 810px;
    height: 1px;
    margin: auto;
    background-color: @color-border;
  }
}
.w145 {
  width: 145px;
}
.w480 {
  width: 480px;
}
.reward-panel {
  padding: 35px 0;
  .reward-title {
    font-size: 18px;
  }
  .order-submit-btn {
    display: block;
    width: 135px;
    margin: 35px auto;
  }
}
.reward-table {
  width: 100%;
  margin: 20px 0;
  font-size: 14px;
  thead {
    th {
      padding: 8px 0;
      text-align: center;
    }
    border-bottom: 6px solid #f2f9fe;
  }
  tbody {
    tr {
      border-bottom: 1px solid @color-border;
      td {
        padding: 20px 0;
        text-align: center;
        &.goods-info-td {
          width: 365px;
          text-align: left;
        }
      }
    }
  }
}
.goods-info {
  .goods-img-box {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 25px 0 10px;
    vertical-align: middle;
    border: 1px solid #f0f3f5;
    .goods-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      max-width: 100px;
      max-height: 100px;
    }
  }
  .goods-info-in {
    display: inline-block;
    vertical-align: middle;
    .goods-name {
      max-width: 16em;
    }
    .goods-description {
      margin: 20px 0 20px 0;
      max-width: 16em;
    }
    .goods-price {
      color: @color-font-light2;
    }
  }
}
.address-list-panel {
  width: 100%;
  .address-list {
    margin: 15px 0;
    height: 155px;
    overflow: hidden;
    transition: all 0.4s;
    .address-item {
      position: relative;
      display: inline-block;
      width: 310px;
      height: 145px;
      padding: 9px;
      margin: 5px 16px;
      font-size: 14px;
      overflow: hidden;
      border: 1px solid #cccccc;
      &.active {
        border: 2px solid @color-primary;
      }
      .address-top {
        padding-bottom: 5px;
        border-bottom: 1px solid #f2f2f5;
      }
      .default-text {
        float: right;
        color: @color-font-light;
        margin: 5px;
      }
      .address-detail {
        padding: 5px 0;
        min-height: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
        display:-webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        word-break: break-all;
      }
      .modify-btn {
        color: #3086fc;
      }
      .icon-choosen {
        position: absolute;
        right: 0;
        bottom: -7px;
        font-size: 24px;
        color: @color-primary;
      }
    }
  }
}
.address-operate-line {
  padding: 0 16px;
  font-size: 14px;
  .add-address-btn {
    cursor: default;
    .icon-add {
      margin-right: 5px;
      font-size: 25px;
      color: @color-primary;
      vertical-align: middle;
    }
  }
}
</style>
