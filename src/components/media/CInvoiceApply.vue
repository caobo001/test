<template>
  <div class='container'>
    <div class="invoice-info clearfix">
      <div class="section left">
        <h2>
          发票信息
          <!-- <router-link class="btn-edit" :to="{ name: 'media-invoice-info-edit' }">
            修改
          </router-link> -->
        </h2>
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
          <li class="row" v-if="invoiceInfo.fdType === 2">
            <span class="label-name">证件类型</span>
            <div class="label-con">
              {{invoiceInfo.fdCertificateTypeValue}}
            </div>
          </li>

          <!-- <li class="row" v-if="invoiceInfo.fdType === 2">
            <span></span>
            <ul class="inline-block attachment">
              <li>
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

              <li>
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
              <li>
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
          </li> -->

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
        <h2>
          收票地址
          <!-- <router-link class="btn-edit" :to="{ name: 'media-invoice-info-edit' }">
            修改
          </router-link> -->
        </h2>
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
        <el-button type="primary" class="edit-btn"
         @click="$router.push({name: 'media-invoice-info-edit', params: {id: invoiceInfo.id}})">
          修改信息
        </el-button>
        <el-button class="cancel-btn" @click="close">取消</el-button>
      </div>
    </div>
    <div class="order-info">
      <div class="heading">
        <h2>订单信息</h2>
      </div>
      <table class="order-list-table text-center">
        <thead>
          <tr>
            <th>订单编号</th>
            <th>商品名称</th>
            <th>发布文案信息</th>
            <th>金额</th>
            <th>订单状态</th>
            <th>创建时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in checkedOrders" :key="item.id">
            <td>{{item.fdNo}}</td>
            <td class="brief">
              <div
                :class="{'wechat': item.fdGoodsGroupId === wechat}"
                class="media"
                v-if="item.fdGoodsGroupId === wechat">
                <div class="media-left">
                  <img :src="item.goodsInfo.fdImageJson.thumbnailUrl || '/webapp/static/portrait-default.jpg'"/>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">
                    <span
                      class="cursor-default ellipsis inline-block vertical-middle"
                      :title="item.goodsInfo.fdGoodsName">
                      {{item.goodsInfo.fdGoodsName}}
                    </span>
                    <img
                      src="../../assets/img/icon-wechat-identified.png"
                      class="vertical-middle"
                      v-if="item.goodsInfo.fdVipType === '认证'"
                      title="微信官方认证"/>
                  </h4>
                  <div>
                    <span
                      class="desc cursor-default color-font-light2 inline-block ellipsis"
                      :title="item.goodsInfo.fdGoodsCode">
                      {{item.goodsInfo.fdGoodsCode}}
                    </span>
                    <router-link
                      :to="{
                        name: 'media-billboard-detail',
                        params: {id: item.goodsInfo.fdGoodsId}
                      }">
                      <img
                        src="../../assets/img/icon-detail.png"
                        class="vertical-top"
                        title="商品详情"
                        alt="商品详情"/>
                    </router-link>

                  </div>
                  <div class="qrcode-wrapper inline-block">
                    <img src="../../assets/img/qrcode.png" class="vertical-middle" title="微信二维码" alt="微信二维码">
                    <img class="img-qrcode" :src="`http://open.weixin.qq.com/qr/code?username=${item.goodsInfo.fdGoodsCode}`" />
                  </div>
                  <img
                    src="../../assets/img/icon-commentable.png"
                    v-if="item.goodsInfo.fdIsCommentable"
                    title="带评论" alt="带评论"
                    class="vertical-middle" />
                  <img
                    src="../../assets/img/icon-original.png"
                    v-if="item.goodsInfo.fdIsOriginal"
                    title="原创" alt="原创"
                    class="vertical-middle" />
                </div>
              </div>
              <div
                class="media"
                v-if="item.fdGoodsGroupId === weibo"
                :class="{'weibo': item.fdGoodsGroupId === weibo}">
                <div class="media-left">
                  <img :src="item.goodsInfo.fdImageJson.thumbnailUrl || '/webapp/static/portrait-default.jpg'"/>
                </div>
                <div class="media-body">
                  <h4 class="media-heading">
                    <span
                      class="cursor-default ellipsis inline-block vertical-middle"
                      :title="item.goodsInfo.fdGoodsName">
                      {{item.goodsInfo.fdGoodsName}}
                    </span>
                    <img
                      class="vipType vertical-middle"
                      :src="getSrc(item.goodsInfo.fdVipType)"
                      :title="item.goodsInfo.fdVipType"
                      :alt="item.goodsInfo.fdVipType"
                      v-if="item.goodsInfo.fdVipType !== '普通'"/>
                  </h4>
                  <div>
                    <span
                      class="desc cursor-default color-font-light2 inline-block ellipsis"
                      :title="item.goodsInfo.remarks">
                      {{item.goodsInfo.remarks}}
                    </span>
                    <router-link
                      :to="{
                        name: 'media-billboard-weibo-detail',
                        params: {id: item.goodsInfo.fdGoodsId}
                      }">
                      <img
                      src="../../assets/img/icon-detail.png"
                      class="vertical-top"
                      title="商品详情"
                      alt="商品详情"/>
                    </router-link>
                  </div>
                </div>
              </div>
            </td>
            <td>
              {{item.fdProcessDate}}
            </td>
            <td class="price">
              <div class="price-in">
                <span class="text color-font-light2">{{item.fdGoodsSpecificationName}}</span>
                <span class="num">￥ {{item.fdPrice | numToThousands}}</span>
                <i class="icon iconfont icon-invoice" v-show="item.fdInvoiceId"></i>
                <div class="payed-time" v-if="item.fdChargeOffId && item.fdChargeOffDate">
                  <span class="charge-off">已销</span>
                  <span class="color-font-light2">
                    {{item.fdChargeOffDate}}
                  </span>
                </div>
              </div>
            </td>
            <td class="status">
              {{item.fdStatusValue}}
            </td>
            <td>{{item.createdDate}}</td>
          </tr>
        </tbody>
      </table>
      <div class="extra">
        备注：
        <el-input
          class="inline-block"
          v-model="remarks"
          placeholder="填写您需要特别关照的信息，我们客服人员会特别关注"></el-input>
      </div>
    </div>

    <div class="action-bar">
      <div class="container clearfix">
        <div class="pull-right">
          <span class="vertical-middle">
            开票总金额：
          </span>
          <span class="vertical-middle mr20">
            <em><i>￥</i> {{totalPrice | numToThousands}}</em>
          </span>
          <el-button
            @click="submit"
            :loading="loading"
            type="primary"
          >确认开票</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CImageZoom from 'components/CImageZoom/index.vue'
import CUploadPreview from 'components/CUploadPreview'
import utils from '../../utils'

export default {
  name: 'CInvoiceApply',
  props: {
    checkedOrders: {
      type: Array
    }
  },
  data () {
    return {
      wechat: this.$store.state.goodsGroups.wechat,
      weibo: this.$store.state.goodsGroups.weibo,
      remarks: '',
      loading: false
    }
  },
  methods: {
    submit () {
      this.loading = true
      const orderItemIds = []
      _.forEach(this.checkedOrders, (item) => {
        orderItemIds.push(item.id)
      })
      let invoice = {
        remarks: '',
        orderItemIds: []
      }
      invoice.remarks = this.remarks
      invoice.orderItemIds = orderItemIds
      invoice = _.extend(invoice, utils.deepClone(this.invoiceInfo))
      delete invoice.id
      if (invoice.fdAttrKhxk) {
        invoice.fdAttrKhxk = JSON.stringify(invoice.fdAttrKhxk)
      }
      if (invoice.fdAttrYyzz) {
        invoice.fdAttrYyzz = JSON.stringify(invoice.fdAttrYyzz)
      }
      if (invoice.fdAttrYbnsr) {
        invoice.fdAttrYbnsr = JSON.stringify(invoice.fdAttrYbnsr)
      }
      if (invoice.fdAttrSwdj) {
        invoice.fdAttrSwdj = JSON.stringify(invoice.fdAttrSwdj)
      }
      if (invoice.fdAttrZzjg) {
        invoice.fdAttrZzjg = JSON.stringify(invoice.fdAttrZzjg)
      }
      if (invoice.fdBillingInfo) {
        invoice.fdBillingInfo = JSON.stringify(invoice.fdBillingInfo)
      }
      console.log('aaa', invoice)
      this.$http.post('/invoice', invoice).then(resp => {
        this.$emit('applySuccess')
      }).finally(() => {
        this.loading = false
      })
    },
    getSrc (type) {
      var src = ''
      switch (type) {
        case '金V':
          src = '/webapp/static/vip-golden.png'
          break
        case '黄V':
          src = '/webapp/static/vip-yellow.png'
          break
        case '蓝V':
          src = '/webapp/static/vip-blue.png'
          break
        case '达人':
          src = '/webapp/static/vip-star.png'
          break
      }
      return src
    },
    imageZoom (ref, a) {
      this.$refs[ref][a].zoom()
    },
    close () {
      this.$parent.close()
    }
  },
  computed: {
    invoiceInfo () {
      return this.$store.state.media.invoiceInfo
    },
    totalPrice () {
      let totalPrice = 0
      _.forEach(this.checkedOrders, (item) => {
        totalPrice += item.fdBottom || item.fdPrice
      })
      return totalPrice * 1.06
    }
  },
  components: {
    CImageZoom,
    CUploadPreview
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
.invoice-info {
  width: 925px;
  margin: auto;
}
.left, .right {
  width: 50%;
  h2 {
    width: 400px;
  }
}
.left {
  float: left;
  border-right: 1px solid @color-border;
}
.right {
  float: right;
  h2, .table {
    margin-left: 62px;
  }
}
.label-name,
.label-con {
  display: inline-block;
}
.page-invoice .section .row .label-name {
  width: 150px;
  padding-left: 35px;
}
.action {
  clear: both;
  padding: 45px 0 55px 0;
  text-align: center;
  border-bottom: 1px solid @color-border;
  .edit-btn,
  .cancel-btn {
    width: 170px;
    height: 45px;
  }
}
.order-info {
  padding-bottom: 100px;
  .heading {
    padding: 15px 0 15px 15px;
    background-color: #f8f8f8;
  }
  h2 {
    padding-left: 10px;
    line-height: 1;
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }
  .extra {
    .inline-block {
      width: 500px;
    }
  }
}
.order-list-table {
  th {
    padding: 15px 0px;
  }
}
.action-bar {
  position: fixed;
  bottom: 0px;
  padding: 15px 20px;
  background-color: #ddd;
  z-index: 1000;
  em {
    font-size: 16px;
    color: @color-primary;
    i {
      font-size: 12px;
    }
  }
}
</style>
