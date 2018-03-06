<template>
  <div class="page-invoice page-invoice-info-edit">

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
                <el-radio-group v-model="dataInfo.fdType" :disabled="flag" class="label-con">
                  <el-radio :label="1">普通发票</el-radio>
                  <el-radio :label="2">专用发票</el-radio>
                </el-radio-group>
              </li>
              <div v-if="dataInfo.fdOpenType===2">
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
        <div class="content">
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
                      <i class="iconfont icon-jiahao" style="color:#fff;"></i>
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
                  <a href="javascript:" @click="modifyInfo(item)">修改</a> |
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
import { Radio, RadioGroup } from 'element-ui'
import CUploader from 'components/CUploader'
import CUploadPreview from 'components/CUploadPreview'
import CImageZoom from 'components/CImageZoom/index.vue'
import CTitle from 'components/CTitle'
import utils from '../../utils'

export default {
  mounted () {
    this.$store.dispatch('fetchInvoiceInfoList')
    // 如果路由中的info参数为空，则通过发送请求，通过id重新获取数据
    if (!_.isEmpty(this.$route.params.info)) {
      if (this.$route.params.parseabel === false) {
        this.dataInfo = this.$route.params.info
      } else {
        this.dataInfo = this.parseItem(this.$route.params.info)
      }
    } else {
      if (this.$route.params.id) {
        this.loading = true
        this.dataInfo.id = this.$route.params.id
        this.fetchInvoiceInfo(this.$route.params.id)
      } else {
        this.fetchDefault()
      }
    }

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
    fetchInvoiceInfo (id) {
      this.$http.get(`invoice_info/${id}`).then(resp => {
        this.dataInfo = resp.data
      }).finally(() => {
        this.loading = false
      })
    },
    submit () {
      let info = utils.deepClone(this.dataInfo)
      if (this.$route.params.id && this.infoList.length > 0 && info.id === this.$route.params.id) {
        info.id = this.$route.params.id
      }
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
      if (!_.isEmpty(this.selectedProvince) && !_.isEmpty(this.fetchedCity) && !this.dataInfo.fdCity) {
        this.$message.warning('请补齐所在地区')
      } else if (this.dataInfo.fdTaxNo.length !== 0 && (this.dataInfo.fdTaxNo.length < 15 || this.dataInfo.fdTaxNo.length > 20)) {
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
    },
    fetchDefault () {
      this.$http.get('/invoice_info/default').then((resp) => {
        if (resp.data.code !== 0) {
          this.dataInfo = resp.data
        }
      })
    },
    updateDefault (item) {
      this.$http.put('/invoice_info/updateDefault', item.id).then(resp => {
        if (resp.data.code === 1) {
          this.$message.success('已设为默认信息')
          this.fetchDefault()
          this.$store.dispatch('fetchInvoiceInfoList')
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
              this.$store.dispatch('fetchInvoiceInfoList')
            })
          }
        }
      })
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
    // '$store.state.media.invoiceInfo' (newValue) {
    //   this.dataInfo = utils.deepClone(newValue)
    // },
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
      console.log('test:', newValue)
      if (newValue.length === 0) {
        delete this.dataInfo.id
        // this.$route.params = {}
      }
      const item = _.find(newValue, {id: this.dataInfo.id})
      if (!item) {
        this.fetchDefault()
      }
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
<style lang="less" scoped>
@import '../../assets/styles/invoice.less';
.page-invoice .section {
  padding-top: 0;
}
.left,
.right {
  float: left;
  h2 {
    width: 475px;
  }
  .table {
    width: 475px;
  }
}
.left {
  width: 55%;
  border-right: 1px solid @color-border;
}
.right {
  width: 45%;
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
  width: 355px;
}
.action {
  text-align: center;
  clear: both;
  padding: 15px 0 35px 0;
  border-bottom: 1px solid @color-border;
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
