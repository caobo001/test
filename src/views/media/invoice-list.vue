<template>
  <div class="page-invoice page-invoice-list">

    <c-title title="我的订单"></c-title>

    <div class="container clearfix" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <c-menu class="pull-left mt10"></c-menu>
      <div class="container-right pull-right mt10">
        <div class="tab-bar">
          <ul class="tab-list clearfix">
            <li>
              <router-link :to="{ name: 'media-invoice-list' }">
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
              <tr v-for="item in dataList" :key="item.id">
                <td class="text-left">
                  <el-checkbox v-model="item.checked" class="vertical-middle checkbox mr15"></el-checkbox>
                  {{item.fdNo}}
                </td>
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
          <div class="clearfix" v-if="!!dataList.length">
            <el-checkbox
              class="vertical-middle checkbox mr10"
              @change="toggleAll($event)"
            > 全选</el-checkbox>
            <div class="pagination">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="itemTotal">
              </el-pagination>
            </div>

          </div>

          <div v-if="!dataList.length" class="text-center no-data">
            <img src="../../assets/img/no-data-logo.png" class="no-data-logo"/>
            <div>嗷，暂无可开票订单哦！</div>
            <div>请看看其他商品。</div>
          </div>

          <el-button
            class="apply"
            v-if="!!dataList.length"
            @click="apply"
            :disabled="selectedItems.length === 0"
            type="primary"
          >提交</el-button>

        </div>

      </div>
    </div>
    <c-modal v-model="showModal" :opts="optModal">
      <c-invoice-apply @applySuccess="applySuccess" :checkedOrders="selectedItems"></c-invoice-apply>
    </c-modal>
  </div>
</template>
<script>
import CModal from 'components/CModal'
import CInvoiceApply from 'components/media/CInvoiceApply'
import CTitle from 'components/CTitle'

export default {
  mounted () {
    this.fetchData()
    // this.fetchDefault()
    this.$store.dispatch('fetchInvoiceInfo')
  },
  title () {
    return '申请发票'
  },
  data () {
    return {
      // invoiceInfo: {
      //   fdType: 2,
      //   fdInvoiceTitle: '',
      //   fdBusinessAddress: '',
      //   fdPhoneNum: '',
      //   fdBankName: '',
      //   fdBankAccount: '',
      //   fdTaxNo: '',
      //   fdReceiverName: '',
      //   fdReceiverMobile: '',
      //   fdOpenType: 1,
      //   fdContent: '',
      //   fdProvince: '',
      //   fdCity: '',
      //   fdAddress: '',
      //   fdCertificateType: 1,
      //   fdAttrKhxk: [],
      //   fdAttrYbnsr: [],
      //   fdAttrYyzz: [],
      //   fdAttrSwdj: [],
      //   fdAttrZzjg: [],
      //   fdBillingInfo: []
      // },
      wechat: this.$store.state.goodsGroups.wechat,
      weibo: this.$store.state.goodsGroups.weibo,
      pageIndex: 1,
      pageSize: 15,
      itemTotal: 0,
      dataList: [],
      loading: false,
      showModal: false,
      optModal: {
        title: '发票申请'
      }
    }
  },
  methods: {
    fetchData () {
      var uri = '/order_item/list'
      this.loading = true
      this.$http.get(uri, {params: {
        s_fdInvoiceId: false,
        s_fdStatusExpectCanceled: 1,
        pageIndex: this.pageIndex
      }}).then((resp) => {
        this.dataList = _.map(resp.data.data, (item) => {
          item.checked = false
          return item
        })
        this.itemTotal = resp.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    handleCurrentChange (page) {
      this.pageIndex = page
    },
    toggleAll (event) {
      let isChecked = event.currentTarget.checked
      _.forEach(this.dataList, (item) => {
        item.checked = isChecked
      })
    },
    apply () {
      if (!this.checkInvoiceInfo()) {
        this.$msgbox.confirm('发票信息不完整，无法开出发票，现在去完善信息', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          this.$http.get('/invoice_info/default').then((resp) => {
            if (!resp.data.id) {
              this.$router.push({name: 'media-invoice-info-add'})
            } else if (resp.data.id) {
              this.$router.push({name: 'media-invoice-info-edit', params: {id: this.invoiceInfo.id}})
            }
          })
          // this.$router.push({name: 'media-invoice-info-edit', params: {id: this.invoiceInfo.id}})
        })
      } else {
        this.showModal = true
      }
    },
    applySuccess () {
      this.showModal = false
      this.$message.success('申请发票成功')
      this.fetchData()
    },
    fetchDefault () {
      this.$http.get('/invoice_info/default').then((resp) => {
        if (resp.data.code !== 0) {
          this.invoiceInfo = resp.data
        }
      })
    },
    checkInvoiceInfo () {
      if (this.invoiceInfo.fdInvoiceTitle === '') {
        return false
      }
      if (this.invoiceInfo.fdReceiverName === '') {
        return false
      }
      if (this.invoiceInfo.fdReceiverMobile === '') {
        return false
      }
      if (this.invoiceInfo.fdContent === '') {
        return false
      }
      if (this.invoiceInfo.fdProvince === '') {
        return false
      }
      if (this.invoiceInfo.fdAddress === '') {
        return false
      }
      if (this.invoiceInfo.fdOpenType !== '' && this.invoiceInfo.fdOpenType === 2) {
        if (this.invoiceInfo.fdTaxNo === '') {
          return false
        }
        if (this.invoiceInfo.fdCertificateType === '') {
          return false
        }
      }
      if (this.invoiceInfo.fdType !== '' && this.invoiceInfo.fdType === 2) {
        // if (this.invoiceInfo.fdTaxNo === '') {
        //   return false
        // }
        if (_.isEmpty(this.invoiceInfo.fdBillingInfo)) {
          return false
        }
        if (this.invoiceInfo.fdBusinessAddress === '') {
          return false
        }
        if (this.invoiceInfo.fdPhoneNum === '') {
          return false
        }
        if (this.invoiceInfo.fdBankAccount === '') {
          return false
        }
        if (this.invoiceInfo.fdBankName === '') {
          return false
        }
      }
      return true
      /*
      if (this.invoiceInfo.fdType === 2) {
        if (_.isEmpty(this.invoiceInfo.fdAttrKhxk)) {
          return false
        }
        if (_.isEmpty(this.invoiceInfo.fdAttrYbnsr)) {
          return false
        }
        if (_.isEmpty(this.invoiceInfo.fdAttrYyzz)) {
          return false
        }
        if (this.invoiceInfo.fdCertificateType === 2) {
          if (_.isEmpty(this.invoiceInfo.fdAttrSwdj)) {
            return false
          }
          if (_.isEmpty(this.invoiceInfo.fdAttrZzjg)) {
            return false
          }
        }
      }
      */
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
    }
  },
  computed: {
    invoiceInfo () {
      return this.$store.state.media.invoiceInfo
    },
    selectedItems () {
      return _.filter(this.dataList, 'checked')
    }
  },
  watch: {
    pageIndex (newValue) {
      this.fetchData()
    }
  },
  components: {
    CModal,
    CInvoiceApply,
    CTitle
  }
}
</script>
<style lang="less">
@import '../../assets/styles/invoice.less';

</style>
<style lang="less" scoped>
@import "../../assets/styles/variables.less";
.page-invoice-list {
  .content {
    padding-top: 15px;
  }
  .apply {
    display: block;
    margin: 25px auto;
    width: 120px;
  }
}
</style>
