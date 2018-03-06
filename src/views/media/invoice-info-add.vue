<template>
  <div class="page-invoice page-info-add">

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

        <div class="content">
          <div class="section left">
            <h2>发票信息</h2>
            <ul class="table">
              <li class="row">
                <span class="label-name">开具类型</span>
                <el-radio-group v-model="dataInfo.fdOpenType" class="label-con">
                  <el-radio :label="1">个人</el-radio>
                  <el-radio :label="2">企业</el-radio>
                </el-radio-group>
              </li>
              <li class="row">
                <span class="label-name">发票抬头</span>
                <div class="label-con">
                  <el-input v-model="dataInfo.fdInvoiceTitle" ></el-input>
                </div>
              </li>
              <li class="row">
                <span class="label-name">发票内容</span>
                <div class="label-con">
                  <el-select v-model="dataInfo.fdContent" placeholder="请选择">
                    <el-option
                      v-for="item in invoiceContentList"
                      :key="item.fdResource"
                      :value="item.fdResource">
                    </el-option>
                  </el-select>
                </div>
              </li>
              <li class="row">
                  <span class="label-name">发票类型</span>
                  <el-radio-group v-model="dataInfo.fdType" :disabled="flag">
                    <el-radio :label="1">普通发票</el-radio>
                    <el-radio :label="2">专用发票</el-radio>
                  </el-radio-group>
                </li>

              <div v-if="dataInfo.fdOpenType === 2">
                <li class="row">
                  <span class="label-name">税号</span>
                  <div class="label-con">
                    <el-input v-model="dataInfo.fdTaxNo" ></el-input>
                  </div>
                </li>
                <li class="row" v-show="dataInfo.fdOpenType === 2">
                  <span class="label-name">证件类型</span>
                  <div class="label-con">
                    <el-radio-group v-model="dataInfo.fdCertificateType">
                      <el-radio :label="1">三证合一</el-radio>
                      <el-radio :label="2">单证</el-radio>
                    </el-radio-group>
                  </div>
                </li>
                <li class="row" v-show="dataInfo.fdType === 2">
                  <span class="label-name"></span>
                  <ul class="label-con attachment">
                    <li>
                      <c-uploader
                        :cbData="{field: 'fdAttrKhxk'}"
                        :onComplete="uploadComplete"
                        :onError="uploadError">

                        <div class="img-box">
                        <i class="iconfont icon-jiahao"></i>
                        </div>
                        <div class="preview" v-if="dataInfo.fdAttrKhxk[0]">
                          <c-image-zoom :src="dataInfo.fdAttrKhxk[0].thumbnailUrl" :originSrc="dataInfo.fdAttrKhxk[0].url">
                          </c-image-zoom>
                          <a href="javascript:" class="operate" @click="dataInfo.fdAttrKhxk.splice(0,1)">删除</a>
                        </div>
                      </c-uploader>
                      <p class="mt10">开户许可证</p>
                    </li>
                    <li>
                      <c-uploader
                        :cbData="{field: 'fdAttrYyzz'}"
                        :onComplete="uploadComplete"
                        :onError="uploadError">

                        <div class="img-box">
                        <i class="iconfont icon-jiahao"></i>
                        </div>
                        <div class="preview" v-if="dataInfo.fdAttrYyzz[0]">
                          <c-image-zoom :src="dataInfo.fdAttrYyzz[0].thumbnailUrl" :originSrc="dataInfo.fdAttrYyzz[0].url">
                          </c-image-zoom>
                          <a href="javascript:" class="operate" @click="dataInfo.fdAttrYyzz.splice(0,1)">删除</a>
                        </div>
                      </c-uploader>
                      <p class="mt10">营业执照</p>
                    </li>
                    <li>
                      <c-uploader
                        :cbData="{field: 'fdAttrYbnsr'}"
                        :onComplete="uploadComplete"
                        :onError="uploadError">

                        <div class="img-box">
                        <i class="iconfont icon-jiahao"></i>
                        </div>
                        <div class="preview" v-if="dataInfo.fdAttrYbnsr[0]">
                          <c-image-zoom :src="dataInfo.fdAttrYbnsr[0].thumbnailUrl" :originSrc="dataInfo.fdAttrYbnsr[0].url">
                          </c-image-zoom>
                          <a href="javascript:" class="operate" @click="dataInfo.fdAttrYbnsr.splice(0,1)">删除</a>
                        </div>
                      </c-uploader>
                      <p class="mt10">一般纳税人证</p>
                    </li>
                    <li v-show="dataInfo.fdCertificateType === 2">
                      <c-uploader
                        :cbData="{field: 'fdAttrSwdj'}"
                        :onComplete="uploadComplete"
                        :onError="uploadError">

                        <div class="img-box">
                        <i class="iconfont icon-jiahao"></i>
                        </div>
                        <div class="preview" v-if="dataInfo.fdAttrSwdj[0]">
                          <c-image-zoom :src="dataInfo.fdAttrSwdj[0].thumbnailUrl" :originSrc="dataInfo.fdAttrSwdj[0].url">
                          </c-image-zoom>
                          <a href="javascript:" class="operate" @click="dataInfo.fdAttrSwdj.splice(0,1)">删除</a>
                        </div>
                      </c-uploader>
                      <p class="mt10">税务登记证</p>
                    </li>
                    <li v-show="dataInfo.fdCertificateType === 2">
                      <c-uploader
                        :cbData="{field: 'fdAttrZzjg'}"
                        :onComplete="uploadComplete"
                        :onError="uploadError">

                        <div class="img-box">
                        <i class="iconfont icon-jiahao"></i>
                        </div>
                        <div class="preview" v-if="dataInfo.fdAttrZzjg[0]">
                          <c-image-zoom :src="dataInfo.fdAttrZzjg[0].thumbnailUrl" :originSrc="dataInfo.fdAttrZzjg[0].url">
                          </c-image-zoom>
                          <a href="javascript:" class="operate" @click="dataInfo.fdAttrZzjg.splice(0,1)">删除</a>
                        </div>
                      </c-uploader>
                      <p class="mt10">组织机构代码</p>
                    </li>

                  </ul>
                </li>
                <div v-if="dataInfo.fdType === 2">
                  <li class="row">
                    <span class="label-name">营业地址</span>
                    <div class="label-con">
                      <el-input v-model="dataInfo.fdBusinessAddress" ></el-input>
                    </div>
                  </li>
                  <li class="row">
                    <span class="label-name">公司电话</span>
                    <div class="label-con">
                      <el-input v-model="dataInfo.fdPhoneNum" ></el-input>
                    </div>
                  </li>
                  <li class="row">
                    <span class="label-name">银行账户</span>
                    <div class="label-con">
                      <el-input v-model="dataInfo.fdBankAccount" ></el-input>
                    </div>
                  </li>
                  <li class="row">
                    <span class="label-name">开户行</span>
                    <div class="label-con">
                      <el-input v-model="dataInfo.fdBankName" ></el-input>
                    </div>
                  </li>
                  <li class="row" style="display:flex">
                    <span class="label-name">开票信息</span>
                    <div class="label-con">
                      <c-uploader
                        :multiple="false"
                        accept=""
                        :cbData="{field: 'fdBillingInfo'}"
                        :onComplete="uploadComplete"
                        :onUpload="uploadStart"
                        :action="'/file/uploadLocal2'"
                        :onError="uploadError"
                        :size="1024 * 1024 * 10">
                        <el-button :loading="uploadLoading" class="mr10">上传</el-button>
                        <span>支持多个文件，每个文件最大为10M</span>
                      </c-uploader>
                      <c-upload-preview v-model="dataInfo.fdBillingInfo" model="file"></c-upload-preview>
                    </div>
                  </li>
                </div>
              </div>

            </ul>
          </div>

          <div class="section right">
            <h2>收票地址</h2>
            <ul class="table">
              <li class="row">
                <span class="label-name">收件人姓名</span>
                <div class="label-con">
                  <el-input v-model="dataInfo.fdReceiverName" ></el-input>
                </div>
              </li>
              <li class="row">
                <span class="label-name">电话号码</span>
                <div class="label-con">
                  <el-input v-model="dataInfo.fdReceiverMobile" ></el-input>
                </div>
              </li>
              <li class="row">
                <span class="label-name">所在地区</span>
                <div class="label-con">
                  <el-select v-model="selectedProvince" placeholder="选择省份" class="w100">
                   <el-option
                     v-for="item in optProvince"
                     :label="item.name"
                     :key="item.id"
                     :value="item">
                   </el-option>
                  </el-select>

                  <el-select
                    v-model="dataInfo.fdCity"
                    placeholder="选择城市"
                    v-show="fetchedCity.length != 0"
                    class="w100">
                   <el-option
                     v-for="item in fetchedCity"
                     :key="item.id"
                     :value="item.name">
                   </el-option>
                  </el-select>

                </div>
              </li>
              <li class="row">
                <span class="label-name">详细地址</span>
                <div class="label-con">
                  <el-input v-model="dataInfo.fdAddress" ></el-input>
                </div>
              </li>

              <li class="row">
                <span class="label-name"></span>
                <div class="label-con">
                  <el-checkbox v-model="dataInfo.fdIsDefault">设为默认信息</el-checkbox>
                </div>
              </li>
            </ul>
          </div>
          <div class="action">
            <el-button type="primary" @click="submit" :loading="loading" class="save-btn">保存</el-button>
            <el-button @click="$router.push({name: 'media-invoice-info'})" class="cancel-btn">取消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Radio, RadioGroup } from 'element-ui'
import CUploader from 'components/CUploader'
import CUploadPreview from 'components/CUploadPreview'
import CImageZoom from 'components/CImageZoom/index.vue'
import CTitle from 'components/CTitle'
import utils from '../../utils'

export default {
  mounted () {
    if (this.optProvince.length === 0) {
      this.$store.dispatch('fetchProvinceList')
    }

    this.$http.get('/invoice/invoiceContent').then(resp => {
      this.invoiceContentList = resp.data
    })
  },
  title () {
    return '发票信息及收票地址'
  },
  data () {
    return {
      dataInfo: {
        fdType: 1,
        fdInvoiceTitle: '',
        fdBusinessAddress: '',
        fdPhoneNum: '',
        fdBankName: '',
        fdBankAccount: '',
        fdTaxNo: '',
        fdReceiverName: '',
        fdReceiverMobile: '',
        fdOpenType: 2,
        fdContent: '',
        fdProvince: '',
        fdCity: '',
        fdAddress: '',
        fdCertificateType: '',
        fdAttrKhxk: [],
        fdAttrYbnsr: [],
        fdAttrYyzz: [],
        fdAttrSwdj: [],
        fdAttrZzjg: [],
        fdBillingInfo: []
      },
      infoList: this.$store.state.media.invoiceInfoList,
      invoiceContentList: [],
      fetchedCity: [],
      selectedProvince: {},
      uploadLoading: false,
      // isDefault: false,
      flag: false,
      loading: false
    }
  },
  methods: {
    uploadStart (id, fileName) {
      this.uploadLoading = true
    },
    uploadComplete (resp, cbData) {
      if (resp.success) {
        this.dataInfo[cbData.field].push(resp.files[0])
      }
      this.uploadLoading = false
    },
    uploadError (id, fileName, reason, xhr) {
      this.$message.error('附件上传失败...')
    },
    // 解析图片文件字段
    parseItem (item) {
      let obj = utils.deepClone(item)
      obj.fdAttrKhxk = obj.fdAttrKhxk ? JSON.parse(obj.fdAttrKhxk) : []
      obj.fdAttrSwdj = obj.fdAttrSwdj ? JSON.parse(obj.fdAttrSwdj) : []
      obj.fdAttrYyzz = obj.fdAttrYyzz ? JSON.parse(obj.fdAttrYyzz) : []
      obj.fdAttrYbnsr = obj.fdAttrYbnsr ? JSON.parse(obj.fdAttrYbnsr) : []
      obj.fdAttrZzjg = obj.fdAttrZzjg ? JSON.parse(obj.fdAttrZzjg) : []
      obj.fdBillingInfo = obj.fdBillingInfo ? JSON.parse(obj.fdBillingInfo) : []
      return obj
    },
    modifyInfo (obj) {
      this.dataInfo = utils.deepClone(this.parseItem(obj))
    },
    /* fetchInvoiceInfo (id) {
      this.$http.get(`invoice_info/${id}`).then(resp => {
        this.dataInfo = resp.data
      }).finally(() => {
        this.loading = false
      })
    }, */
    submit () {
      let info = utils.deepClone(this.dataInfo)
      if (info.fdAttrKhxk) {
        info.fdAttrKhxk = JSON.stringify(info.fdAttrKhxk)
      }
      if (info.fdAttrYyzz) {
        info.fdAttrYyzz = JSON.stringify(info.fdAttrYyzz)
      }
      if (info.fdAttrYbnsr) {
        info.fdAttrYbnsr = JSON.stringify(info.fdAttrYbnsr)
      }
      if (info.fdAttrSwdj) {
        info.fdAttrSwdj = JSON.stringify(info.fdAttrSwdj)
      }
      if (info.fdAttrZzjg) {
        info.fdAttrZzjg = JSON.stringify(info.fdAttrZzjg)
      }
      if (info.fdBillingInfo) {
        info.fdBillingInfo = JSON.stringify(info.fdBillingInfo)
      }
      if (!_.isEmpty(this.selectedProvince) && !_.isEmpty(this.fetchedCity) && !info.fdCity) {
        this.$message.warning('请补齐所在地区')
      } else if (info.fdTaxNo.length !== 0 && (info.fdTaxNo.length < 15 || info.fdTaxNo.length > 20)) {
        this.$message.warning('请填写正确的税号')
      } else {
        this.loading = true
        this.$http.post('/invoice_info', info).then(resp => {
          if (resp.data.code === 1) {
            this.$message.success('保存成功')
            this.$router.push({name: 'media-invoice-info'})
          } else {
            this.$message.error(resp.data.content)
          }
        }).finally(() => {
          this.loading = false
        })
      }
    }
  },
  computed: {
    optProvince () {
      this.selectedProvince = _.find(this.$store.state.provinceList,
      {'name': this.dataInfo.fdProvince})
      console.log('province', this.selectedProvince)
      return this.$store.state.provinceList
    }
  },
  watch: {
    selectedProvince (newValue, oldValue) {
      // this.dataInfo.fdCity = this.dataInfo.fdCity
      if (newValue) {
        this.dataInfo.fdProvince = newValue.name
      }
      if (oldValue && oldValue.name) {
        this.dataInfo.fdCity = ''
      }
      if (newValue && newValue.name) {
        this.$http.get(
          '/common/area',
          {params: {
            parentId: newValue.id
          }}
        ).then((resp) => {
          this.fetchedCity = resp.data
        })
      }
    },
    'dataInfo.fdOpenType' (newValue) {
      // 如果选择开具类型为个人，将不需要的参数清空
      if (newValue === 1) {
        this.flag = true
        this.dataInfo.fdType = 1
        this.dataInfo.fdBusinessAddress = ''
        this.dataInfo.fdPhoneNum = ''
        this.dataInfo.fdBankName = ''
        this.dataInfo.fdBankAccount = ''
        this.dataInfo.fdTaxNo = ''
        this.dataInfo.fdCertificateType = ''
        this.dataInfo.fdAttrKhxk = []
        this.dataInfo.fdAttrYbnsr = []
        this.dataInfo.fdAttrYyzz = []
        this.dataInfo.fdAttrSwdj = []
        this.dataInfo.fdAttrZzjg = []
        this.dataInfo.fdBillingInfo = []
      } else if (newValue === 2) {
        this.flag = false
      }
    },
    'dataInfo.fdType' (newValue) {
      // 如果选择类型为普通发票，将不需要的参数清空
      if (newValue === 1) {
        this.dataInfo.fdBusinessAddress = ''
        this.dataInfo.fdPhoneNum = ''
        this.dataInfo.fdBankName = ''
        this.dataInfo.fdBankAccount = ''
        this.dataInfo.fdBillingInfo = []
      }
    },
    '$store.state.media.invoiceInfoList' (newValue) {
      this.infoList = newValue
    }
  },
  components: {
    CUploader,
    CUploadPreview,
    CImageZoom,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    CTitle
  }
}
</script>
<style lang="less">
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
  padding: 25px 0 35px 0;
  .save-btn,
  .cancel-btn {
    width: 170px;
    height: 45px;
  }
}
.order-list-table {
  border: 1px solid @color-border;
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
<style lang="less" scoped>
@import "../../assets/styles/variables.less";
// .page-info-add {
//   .el-input {
//     width: 200px;
//   }
//   .action {
//     clear: both;
//     // padding: 50px 0;
//     text-align: center;
//     .el-button {
//       width: 160px;
//       height: 46px;
//       font-size: 18px;
//       margin-right: 40px;
//     }
//   }
//   .link {
//     a {
//       color: #ff4f00;
//     }
//   }
//   .content {
//     margin-bottom: 50px;
//     .section {
//       &.left {
//         width: 60%;
//       }
//       &.right {
//         width: 40%;
//       }
//       .table {
//         width: 100%;
//       }
//     }
//     .pull-left {
//       width: 60%;
//       h2 {
//         border: none;
//         width: 360px;
//         height: 30px;
//         line-height: 30px;
//         background-color: #f3f8fe;
//         padding-left: 40px;
//         margin-left: -40px;
//         font-size: 15px;
//       }
//     }
//     .pull-right {
//       width: 40%;
//     }
//     .img-box, .preview{
//       width: 75px;
//       height:75px;
//     }
//   }
// }
// .w100 {
//   width: 100px;
// }
// .default-btn {
//   color: #ff4f00;
//   background-color: white;
// }
</style>
