<template>
  <div class="page-invoice page-invoice-info">

    <c-title title="我的订单"></c-title>

    <div class="container clearfix" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <c-menu class="pull-left mt10"></c-menu>
      <div class="container-right pull-right mt10">
        <div class="tab-bar">
          <ul class="tab-list clearfix">
            <li>
              <router-link :to="{ name: 'media-invoice-list' }" exact>
                申请发票
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'media-invoice-history' }">
                申请记录
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'media-invoice-info' }">
                发票信息及收票地址
              </router-link>
            </li>
          </ul>
        </div>
        <div class="content" v-if="infoList.length>0">
          <div class="section left">
            <h2>发票信息</h2>
            <ul class="table">
              <li class="row">
                <span class="label-name">开具类型</span>
                <div class="label-con">
                  {{invoiceInfo.fdOpenTypeValue}}
                </div>
              </li>
              <li class="row">
                <span class="label-name">发票抬头</span>
                <div class="label-con">
                  {{invoiceInfo.fdInvoiceTitle}}
                </div>
              </li>
              <li class="row" v-if="invoiceInfo.fdTaxNo">
                <span class="label-name">税号</span>
                <div class="label-con">
                  {{invoiceInfo.fdTaxNo}}
                </div>
              </li>
              <li class="row">
                <span class="label-name">发票内容</span>
                <div class="label-con">
                  {{invoiceInfo.fdContent}}
                </div>
              </li>
              <li class="row">
                <span class="label-name">发票类型</span>
                <div class="label-con">
                  {{invoiceInfo.fdTypeValue}}
                </div>
              </li>
              <li class="row" v-if="invoiceInfo.fdOpenType === 2">
                <span class="label-name">证件类型</span>
                <div class="label-con">
                  {{invoiceInfo.fdCertificateTypeValue}}
                </div>
              </li>

              <li class="row" v-if="invoiceInfo.fdType === 2 && invoiceInfo.fdAttrKhxk[0]">
                <span class="label-name"></span>
                <ul class="inline-block attachment">
                  <li v-if="invoiceInfo.fdAttrKhxk[0]">
                    <div class="img-box">
                     <i class="iconfont icon-jiahao"></i>
                    </div>
                    <div class="preview" v-if="invoiceInfo.fdAttrKhxk[0]">
                      <c-image-zoom
                      ref="fdAttrKhxk"
                      :src="invoiceInfo.fdAttrKhxk[0].thumbnailUrl"
                      :originSrc="invoiceInfo.fdAttrKhxk[0].url">
                      </c-image-zoom>
                      <a href="javascript:" @click="imageZoom('fdAttrKhxk')" class="operate">
                        <i class="iconfont icon-fangda"></i>
                      </a>
                    </div>
                    <p class="mt10">开户许可证</p>
                  </li>

                  <li v-if="invoiceInfo.fdAttrYyzz[0]">
                    <div class="img-box">
                     <i class="iconfont icon-jiahao"></i>
                    </div>
                    <div class="preview" v-if="invoiceInfo.fdAttrYyzz[0]">
                      <c-image-zoom
                      ref="fdAttrYyzz"
                      :src="invoiceInfo.fdAttrYyzz[0].thumbnailUrl"
                      :originSrc="invoiceInfo.fdAttrYyzz[0].url">
                      </c-image-zoom>
                      <a href="javascript:" @click="imageZoom('fdAttrYyzz')" class="operate">
                        <i class="iconfont icon-fangda"></i>
                      </a>
                    </div>
                    <p class="mt10">营业执照</p>
                  </li>
                  <li v-if="invoiceInfo.fdAttrYbnsr[0]">
                    <div class="img-box">
                     <i class="iconfont icon-jiahao"></i>
                    </div>
                    <div class="preview" v-if="invoiceInfo.fdAttrYbnsr[0]">
                      <c-image-zoom
                      ref="fdAttrYbnsr"
                      :src="invoiceInfo.fdAttrYbnsr[0].thumbnailUrl"
                      :originSrc="invoiceInfo.fdAttrYbnsr[0].url">
                      </c-image-zoom>
                      <a href="javascript:" @click="imageZoom('fdAttrYbnsr')" class="operate">
                        <i class="iconfont icon-fangda"></i>
                      </a>
                    </div>
                    <p class="mt10">一般纳税人证</p>
                  </li>
                  <li v-show="invoiceInfo.fdCertificateType === 2">
                    <div class="img-box">
                     <i class="iconfont icon-jiahao"></i>
                    </div>
                    <div class="preview" v-if="invoiceInfo.fdAttrSwdj[0]">
                      <c-image-zoom
                      ref="fdAttrSwdj"
                      :src="invoiceInfo.fdAttrSwdj[0].thumbnailUrl"
                      :originSrc="invoiceInfo.fdAttrSwdj[0].url">
                      </c-image-zoom>
                      <a href="javascript:" @click="imageZoom('fdAttrSwdj')" class="operate">
                        <i class="iconfont icon-fangda"></i>
                      </a>
                    </div>
                    <p class="mt10">税务登记证</p>
                  </li>
                  <li v-show="invoiceInfo.fdCertificateType === 2">
                    <div class="img-box">
                     <i class="iconfont icon-jiahao"></i>
                    </div>
                    <div class="preview" v-if="invoiceInfo.fdAttrZzjg[0]">
                      <c-image-zoom
                      ref="fdAttrZzjg"
                      :src="invoiceInfo.fdAttrZzjg[0].thumbnailUrl"
                      :originSrc="invoiceInfo.fdAttrZzjg[0].url">
                      </c-image-zoom>
                      <a href="javascript:" @click="imageZoom('fdAttrZzjg')" class="operate">
                        <i class="iconfont icon-fangda"></i>
                      </a>
                    </div>
                    <p class="mt10">组织机构代码</p>
                  </li>

                </ul>
              </li>

              <li class="row" v-if="invoiceInfo.fdBusinessAddress">
                <span class="label-name">营业地址</span>
                <div class="label-con">
                  {{invoiceInfo.fdBusinessAddress}}
                </div>
              </li>
              <li class="row" v-if="invoiceInfo.fdPhoneNum">
                <span class="label-name">公司电话</span>
                <div class="label-con">
                  {{invoiceInfo.fdPhoneNum}}
                </div>
              </li>
              <li class="row" v-if="invoiceInfo.fdBankAccount">
                <span class="label-name">银行账户</span>
                <div class="label-con">
                  {{invoiceInfo.fdBankAccount}}
                </div>
              </li>
              <li class="row" v-if="invoiceInfo.fdBankName">
                <span class="label-name">开户行</span>
                <div class="label-con">
                  {{invoiceInfo.fdBankName}}
                </div>
              </li>

              <li class="row" style="display:flex" v-if="invoiceInfo.fdBillingInfo.length>0">
                <span class="label-name">开票信息</span>
                <ul class="label-con attachment" style="margin-left:4px">
                  <c-upload-preview v-model="invoiceInfo.fdBillingInfo" model="file"></c-upload-preview>
                  <!-- <li v-for="(item, index) in invoiceInfo.fdBillingInfo" class="in-li" :key="index">
                    <div class="preview">
                      <c-image-zoom
                      ref="fdBillingInfo"
                      :src="item.thumbnailUrl"
                      :originSrc="item.url">
                      </c-image-zoom>
                      <a :href="item.url" target="_blank" class="operate">
                        点击下载
                      </a>
                    </div>
                  </li> -->
                </ul>
              </li>

            </ul>
          </div>

          <div class="section right">
            <h2>收票地址</h2>
            <ul class="table">
              <li class="row">
                <span class="label-name">收件人姓名</span>
                <div class="label-con">
                  {{invoiceInfo.fdReceiverName}}
                </div>
              </li>
              <li class="row">
                <span class="label-name">电话号码</span>
                <div class="label-con">
                  {{invoiceInfo.fdReceiverMobile}}
                </div>
              </li>
              <li class="row">
                <span class="label-name">所在区域</span>
                <div class="label-con">
                  {{invoiceInfo.fdProvince + invoiceInfo.fdCity}}
                </div>
              </li>
              <li class="row">
                <span class="label-name">详细地址</span>
                <div class="label-con">
                  {{invoiceInfo.fdAddress}}
                </div>
              </li>
            </ul>
          </div>

          <div class="action">
            <el-button type="primary" class="btn-edit">
              <router-link :to="{ name: 'media-invoice-info-edit', params: {info: invoiceInfo, parseabel: false} }">
                编辑
              </router-link>
            </el-button>
          </div>
        </div>

        <div class="content" v-if="infoList.length>0">
          <table class="order-list-table text-center">
            <thead>
              <tr>
                <th>收件人</th>
                <th>发票抬头</th>
                <th>详细地址</th>
                <th>收件人号码</th>
                <th>操作</th>
                <th>
                  <el-button type="primary" size="mini">
                    <router-link :to="{ name: 'media-invoice-info-add' }">
                      <i class="iconfont icon-jiahao" style="color: #fff;"></i>
                    </router-link>
                  </el-button>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in infoList" :key="item.id">
                <td class="">
                  {{item.fdReceiverName}}
                </td>
                <td class="">
                  {{item.fdInvoiceTitle}}
                </td>
                <td>
                  {{item.fdAddress}}
                </td>
                <td class="">
                  {{item.fdReceiverMobile}}
                </td>
                <td class="link">
                  <router-link :to="{ name: 'media-invoice-info-edit',
                   params: {id: item.id, info: item} }">
                    修改
                  </router-link> |
                  <a href="javascript:" @click="deleteInfo(item)">删除</a>
                </td>
                <td>
                  <el-button type="primary" size="small" class="default-btn"
                   v-if="item.fdIsDefault">默认信息</el-button>
                  <el-button type="primary" size="small" @click="updateDefault(item)" v-else>
                    设为默认</el-button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import CImageZoom from 'components/CImageZoom/index.vue'
import CUploadPreview from 'components/CUploadPreview'
import utils from '../../utils'
import CTitle from 'components/CTitle'

export default {
  mounted () {
    // this.$store.dispatch('fetchInvoiceInfo').then(resp => {
    //   if (resp && resp.data.code === 0) {
    //     this.$router.push({name: 'media-invoice-info-edit'})
    //   }
    // }).finally(() => {
    //   this.loading = false
    // })
    this.fetchInvoiceInfo()
    this.$store.dispatch('fetchInvoiceInfoList').then(resp => {
      if (resp.data.length === 0) {
        this.$msgbox.confirm('您还没有发票信息,去新建', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$router.push({name: 'media-invoice-info-add'})
        })
      }
      this.loading = false
    })
  },
  title () {
    return '发票信息及收票地址'
  },
  data () {
    return {
      invoiceInfo: {
        id: '',
        fdType: 1,
        fdInvoiceTitle: '',
        fdBusinessAddress: '',
        fdPhoneNum: '',
        fdBankName: '',
        fdBankAccount: '',
        fdTaxNo: '',
        fdReceiverName: '',
        fdReceiverMobile: '',
        fdOpenType: 1,
        fdContent: '',
        fdProvince: '',
        fdCity: '',
        fdAddress: '',
        fdCertificateType: 1,
        fdAttrKhxk: [],
        fdAttrYbnsr: [],
        fdAttrYyzz: [],
        fdAttrSwdj: [],
        fdAttrZzjg: [],
        fdBillingInfo: []
      },
      loading: true
    }
  },
  methods: {
    imageZoom (ref, index) {
      this.$refs[ref][index].zoom()
    },
    updateDefault (item) {
      this.$http.put('/invoice_info/updateDefault', item.id).then(resp => {
        if (resp.data.code === 1) {
          this.$message.success('已设为默认信息')
          this.fetchInvoiceInfo()
          this.$store.dispatch('fetchInvoiceInfoList')
        }
      })
    },
    parseItem (item) {
      let obj = utils.deepClone(item)
      obj.fdAttrKhxk = obj.fdAttrKhxk ? JSON.parse(obj.fdAttrKhxk) : []
      obj.fdAttrSwdj = obj.fdAttrSwdj ? JSON.parse(obj.fdAttrSwdj) : []
      obj.fdAttrYyzz = obj.fdAttrYyzz ? JSON.parse(obj.fdAttrYyzz) : []
      obj.fdAttrYbnsr = obj.fdAttrYbnsr ? JSON.parse(obj.fdAttrYbnsr) : []
      obj.fdAttrZzjg = obj.fdAttrZzjg ? JSON.parse(obj.fdAttrZzjg) : []
      obj.fdBillingInfo = obj.fdBillingInfo ? JSON.parse(obj.fdBillingInfo) : []
      console.log(obj)
      return obj
    },
    fetchInvoiceInfo () {
      this.$http.get('/invoice_info/default').then((resp) => {
        if (resp.data.code !== 0) {
          this.invoiceInfo = resp.data
          console.log('info:', this.invoiceInfo)
        }
      })
    },
    deleteInfo (item) {
      this.$msgbox.confirm(`确定要删除吗？`, '提醒', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            this.$http.delete(
              `/invoice_info/${item.id}`,
            ).then(() => {
              this.$message.success('删除成功')
              // const deleted = _.find(this.infoList, {id: item.id})
              // const index = _.indexOf(this.infoList, deleted)
              // this.infoList.splice(index, 1)
              this.$store.dispatch('fetchInvoiceInfoList')
            })
          }
        }
      })
    }
  },
  watch: {
    invoiceInfo (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$store.dispatch('fetchInvoiceInfo')
      }
    },
    '$store.state.media.invoiceInfoList' (newValue) {
      this.fetchInvoiceInfo()
    }
  },
  computed: {
    infoList () {
      return this.$store.state.media.invoiceInfoList
    }
  },
  components: {
    CImageZoom,
    CUploadPreview,
    CTitle
  }

}
</script>
<style lang="less" scoped>
@import '../../assets/styles/invoice.less';
.page-invoice .section {
  padding-top: 0;
}
.left,
.right {
  width: 50%;
  float: left;
  h2 {
    width: 400px;
  }
  .table {
    width: 400px;
  }
}
.left {
  border-right: 1px solid @color-border;
}
.page-invoice .right {
  h2, .table {
    margin-left: 60px;
  }
}
.label-name {
  display: inline-block;
  width: 120px;
  padding-left: 30px;
}
.label-con {
  display: inline-block;
  width: 280px;
}
.action {
  text-align: center;
  clear: both;
  padding: 15px 0 35px 0;
  .btn-edit {
    width: 170px;
    height: 45px;
    a {
      color: #ffffff;
    }
  }
}
.order-list-table {
  thead {
    background-color: @color-bg2;
    th {
      color: @color-font;
      font-weight: bold;
    }
  }
}
.link a {
  color: @color-primary;
}
</style>
