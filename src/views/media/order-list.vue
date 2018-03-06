<template>
  <div class="page-media-order-list">
    <c-title title="我的订单"></c-title>
    <div class="container clearfix" v-loading.fullscreen="loading" element-loading-text="拼命加载中">

      <c-menu class="pull-left mt10"></c-menu>

      <div class="container-right pull-right mt10">
        <div class="tab-bar clearfix">
          <ul class="tab-list">
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === '所有订单'}"
                @click="setCurStatus('所有订单')">
                所有订单
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === '待响应'}"
                @click="setCurStatus('待响应')">
                待响应
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === '执行中'}"
                @click="setCurStatus('执行中')">
                执行中
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === '待确认'}"
                @click="setCurStatus('待确认')">
                待确认
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === '已结束'}"
                @click="setCurStatus('已结束')">
                已结束
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === '已取消'}"
                @click="setCurStatus('已取消')">
                已取消
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === '未销账'}"
                @click="setCurStatus('未销账')">
                未销账
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === '已销账'}"
                @click="setCurStatus('已销账')">
                已销账
              </a>
            </li>
          </ul>
        </div>
        <div class="statistics-bar mt10">
          <el-row :gutter="10">
            <el-col :span="8">
              <div class="item text-center">
                <div class="num font16" v-if="statistic.fdPriceTotal">￥{{statistic.fdPriceTotal}}</div>
                <div class="num font16" v-if="!statistic.fdPriceTotal">0.00</div>
                <div class="name color-font-light2 font14">订单总金额</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="item text-center">
                <div class="num green font16" v-if="statistic.fdBottomTotal">￥{{statistic.fdBottomTotal}}</div>
                <div class="num green font16" v-if="!statistic.fdBottomTotal">0.00</div>
                <div class="name color-font-light2 font14">已付金额</div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="item text-center">
                <div class="num dark-red font16" v-if="statistic.fdDebtTotal">￥{{statistic.fdDebtTotal}}</div>
                <div class="num dark-red font16" v-if="!statistic.fdDebtTotal">0.00</div>
                <div class="name color-font-light2 font14">欠款金额</div>
              </div>
            </el-col>
          </el-row>
        </div>

        <div class="filter-panel mt10">
          <div class="clearfix">
            <div class="search-bar pull-left">
              <input
                placeholder="输入商品标题"
                @keydown="enterSearch($event)"
                v-model="inputSearch" />
              <el-button slot="append" @click="setSearchName" class="pull-left">搜索</el-button>
            </div>
            <span
              class="more font14 cursor-default"
              @click="toggleCondition">
              更多筛选条件
              <i
                class="icon iconfont icon-xiangxiajiantou"
                :class="{'up': showMore}">
              </i>
            </span>
          </div>
          <div class="more-condition clearfix" :class="{'show': showMore}">
            <ul class="condition-list clearfix">
              <li>
                <span class="name font14 color-font-light2">商品类型</span>
                  <el-select v-model="proType" placeholder="请选择">
                    <el-option
                      v-for="item in optProType"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </li>
              <li>
                <span class="name font14 color-font-light2">发票状态</span>
                  <el-select v-model="isInvoice" placeholder="请选择">
                    <el-option
                      v-for="item in optInvoice"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
              </li>
              <li>
                <span class="name font14 color-font-light2">查询链接</span>
                <el-input v-model="searchUrl" placeholder="请输入内容" class="search-url inline-block"></el-input>
              </li>
              <li>
                <span class="name font14 color-font-light2">发布时间</span>
                <el-date-picker
                  v-model="gtPublish"
                  type="datetime"
                  class="datetime"
                  format="yyyy-MM-dd HH-mm"
                  placeholder="选择日期">
                </el-date-picker>
                至&nbsp;
                <el-date-picker
                  v-model="ltPublish"
                  type="datetime"
                  class="datetime"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
              <li>
                <span class="name font14 color-font-light2">销账时间</span>
                <el-date-picker
                  v-model="gtChargeOff"
                  type="datetime"
                  class="datetime"
                  placeholder="选择日期">
                </el-date-picker>
                至&nbsp;
                <el-date-picker
                  v-model="ltChargeOff"
                  type="datetime"
                  class="datetime"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
              <li>
                <span class="name font14 color-font-light2">商品价格</span>
                <el-input-number v-model="gtPrice" :min="0" :controls="false"></el-input-number>
                至&nbsp;
                <el-input-number v-model="ltPrice" :min="0" :controls="false"></el-input-number>
              </li>
            </ul>
            <el-button class="confirm-btn" @click="setParams">确定</el-button>
          </div>
        </div>
        <div class="order-list-block mt10">
          <table class="order-list-table text-center">
            <thead>
              <tr>
                <th>订单编号</th>
                <th>商品名称</th>
                <th>发布文案信息</th>
                <th>金额</th>
                <th>订单状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody v-if="dataList.length !== 0">
              <tr v-for="(item, index) in dataList" :key="item.id">
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
                        <a
                          class="inline-block ellipsis name vertical-middle"
                          :href="`http://weixin.sogou.com/weixin?type=1&query=${item.goodsInfo.fdGoodsCode}&ie=utf8&_sug_=n&_sug_type_=`"
                          :title="item.goodsInfo.fdGoodsName"
                          target="_blank">
                          {{item.goodsInfo.fdGoodsName}}
                        </a>
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
                        <router-link :to="{name: 'media-billboard-detail', params: {id: item.goodsInfo.fdGoodsId}}">
                          <img
                            src="../../assets/img/icon-detail.png"
                            class="vertical-top"
                            title="商品详情"
                            alt="商品详情"/>
                        </router-link>
                      </div>
                      <div
                        class="qrcode-wrapper inline-block"
                        v-on:mouseenter.once="qrEnter(item, index)">
                        <img src="../../assets/img/qrcode.png" class="vertical-middle" title="微信二维码" alt="微信二维码">
                        <img class="img-qrcode" :src="item.qrcode" />
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
                        <a
                          :href="item.fdLink"
                          target="_blank"
                          class="name ellipsis"
                          :title="item.goodsInfo.fdGoodsName">
                          {{item.goodsInfo.fdGoodsName}}
                        </a>
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
                          <img src="../../assets/img/icon-detail.png" class="vertical-top" title="商品详情" alt="商品详情"/>
                        </router-link>
                      </div>
                    </div>
                  </div>
                  <div
                    class="media"
                    v-if="item.fdGoodsGroupId === headline"
                    :class="{'weibo': item.fdGoodsGroupId === headline}">
                    <div class="media-left">
                      <img :src="item.goodsInfo.fdImageJson.thumbnailUrl || '/webapp/static/portrait-default.jpg'"/>
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading">
                        <a
                          :href="item.fdLink"
                          target="_blank"
                          class="name ellipsis"
                          :title="item.goodsInfo.fdGoodsName">
                          {{item.goodsInfo.fdGoodsName}}
                        </a>
                        <img
                          src="../../assets/img/icon-headline-identified.png"
                          class="vertical-top"
                          v-if="item.goodsInfo.fdVipType === '认证'"
                          title="今日头条官方认证"
                          alt="今日头条官方认证"/>
                      </h4>
                      <div>
                        <span
                          class="desc cursor-default color-font-light2 inline-block ellipsis"
                          :title="item.goodsInfo.remarks">
                          {{item.goodsInfo.remarks}}
                        </span>
                        <router-link
                          :to="{
                            name: 'media-billboard-headline-detail',
                            params: {id: item.goodsInfo.fdGoodsId}
                          }">
                          <img src="../../assets/img/icon-detail.png" class="vertical-top" title="商品详情" alt="商品详情"/>
                        </router-link>
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {{item.fdProcessDate}}
                </td>
                <td class="price">
                  <div class="price-in text-left">
                    <span class="text color-font-light2">{{item.fdGoodsSpecificationName}}</span>
                    <span class="num">￥ {{item.fdPrice}}</span>
                    <i class="icon iconfont icon-invoice" v-if="item.fdInvoiceId && item.fdInvoiceDate"></i>
                    <div class="payed-time" v-if="item.fdChargeOffId && item.fdChargeOffDate">
                      <span class="charge-off">已销</span>
                      <span class="color-font-light2">
                        {{item.fdChargeOffDate}}
                      </span>
                    </div>
                  </div>
                </td>
                <td class="status">
                  <span>{{item.fdStatusValue}}</span>
                  <el-tooltip class="item" effect="dark" :content="item.fdCancelReason" placement="top" v-if="item.fdStatus === 10 && item.fdCancelReason">
                    <i class="icon iconfont icon-warn vertical-middle"></i>
                  </el-tooltip>
                </td>
                <td class="operate">
                  <el-button
                    type="text"
                    @click="setDetail(item.id)"
                    :loading="item.id === detailId? detailLoading : false">详情</el-button>
                  <el-button
                    type="text"
                    @click="cancelOrder(index)"
                    v-if="item.fdStatusValue === '待响应'"
                    class="cancel-order-btn">取消</el-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div  v-if="dataList.length === 0" class="text-center no-data">
            <img src="../../assets/img/no-data-logo.png" class="no-data-logo"/>
            <div>嗷，您还没有任何订单哦！</div>
            <div><router-link class="link" :to="{ name: 'media-wechat-list' }">快去下单吧！</router-link></div>
          </div>
          <div class="pagination" v-if="dataList.length !== 0">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="itemTotal">
            </el-pagination>
          </div>

        </div>
      </div>
    </div>
    <c-modal v-model="modal" :opts="optModal">
      <c-order-detail
        :order="order">
      </c-order-detail>
    </c-modal>
    <el-dialog title="取消订单" v-model="dReasonVisible" size="tiny" @close="cancelReason">
      <div class="reason-list">
        <el-radio
          class="radio"
          v-for="item in reasonList"
          v-model="reason"
          :label="item.fdResource"
          :key="item.id">
          {{item.fdResource}}
        </el-radio>
      </div>
      <div class="footer text-center">
        <el-button class="confirm" @click="confirmReason">确定</el-button>
        <el-button class="cancel" @click="cancelReason">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
import {DatePicker, InputNumber, MessageBox, Dialog, Radio, Tooltip} from 'element-ui'
import COrderDetail from 'components/media/COrderDetail'
import CModal from 'components/CModal'
import {mediaOrderStatus} from '../../assets/scripts/status-config.js'
import utils from '../../utils'

export default {
  mounted () {
    this.fetchData()
  },
  title () {
    return '订单列表'
  },
  data () {
    return {
      pageIndex: 1,
      pageSize: 15,
      itemTotal: 0,
      inputSearch: '',
      searchName: '',
      optProType: [
        {
          label: '不限',
          value: ''
        }, {
          label: '微信',
          value: this.$store.state.goodsGroups.wechat
        }, {
          label: '微博',
          value: this.$store.state.goodsGroups.weibo
        }, {
          label: '头条',
          value: this.$store.state.goodsGroups.headline
        }
      ],
      proType: '',
      optInvoice: [
        {
          label: '不限',
          value: ''
        },
        {
          label: '未开票',
          value: 0
        }, {
          label: '正在开票',
          value: 1
        }, {
          label: '已开票',
          value: 2
        }
      ],
      isInvoice: '',
      invoiceId: '',
      invoiceDate: '',
      searchUrl: '', // 查询链接
      gtPublish: '', // 发布时间 开始
      ltPublish: '', // 发布时间 结束
      gtChargeOff: '', // 销账时间 开始
      ltChargeOff: '', // 销账时间 结束
      gtPrice: '', // 价格区间 开始
      ltPrice: '', // 价格区间 结束
      dataList: [],
      loading: false,
      statistic: {},
      showMore: false,
      curStatus: '', // 订单状态
      statusList: mediaOrderStatus,
      params: {
        chargeOffId: '',
        chargeOffDate: '',
        invoiceId: '',
        invoiceDate: '',
        canceled: ''
      },
      detailId: '',
      order: {
        goodsInfo: {
          fdGoodsCode: '',
          fdGoodsName: '',
          fdImage: {
            name: '',
            thumbnailUrl: '',
            url: ''
          },
          fdIsCommentable: false,
          fdIsOfficial: false,
          fdIsOriginal: false,
          fdVipType: '',
          remarks: ''
        }
      },
      detailLoading: false,
      activeTab: '所有订单',
      wechat: this.$store.state.goodsGroups.wechat, // groupId 商品类型
      weibo: this.$store.state.goodsGroups.weibo, // groupId  商品类型
      headline: this.$store.state.goodsGroups.headline,
      modal: false,
      optModal: {
        title: '订单详情'
      },
      dReasonVisible: false,
      reasonList: [],
      reason: '',
      cIndex: ''
    }
  },
  computed: {
    fetchParams () {
      var params = _.extend({
        pageIndex: this.pageIndex
      },
        this.params,
        {
          searchName: this.searchName,
          curStatus: this.curStatus
        })
      return params
    },
    cgtPrice () {
      var cgtPrice = this.gtPrice
      if (this.gtPrice === 0) {
        cgtPrice = ''
      }
      return cgtPrice
    },
    cltPrice () {
      var cltPrice = this.ltPrice
      if (this.ltPrice === 0) {
        cltPrice = ''
      }
      return cltPrice
    },
    cgtPublish () {
      this.gtPublish = utils.formatTime(this.gtPublish)
      if (this.gtPublish === 'NaN-NaN-NaN NaN:NaN:NaN') {
        this.gtPublish = ''
      }
      return this.gtPublish
    },
    cltPublish () {
      this.ltPublish = utils.formatTime(this.ltPublish)
      if (this.ltPublish === 'NaN-NaN-NaN NaN:NaN:NaN') {
        this.ltPublish = ''
      }
      return this.ltPublish
    },
    cgtChargeOff () {
      this.gtChargeOff = utils.formatTime(this.gtChargeOff)
      if (this.gtChargeOff === 'NaN-NaN-NaN NaN:NaN:NaN') {
        this.gtChargeOff = ''
      }
      return this.gtChargeOff
    },
    cltChargeOff () {
      this.ltChargeOff = utils.formatTime(this.ltChargeOff)
      if (this.ltChargeOff === 'NaN-NaN-NaN NaN:NaN:NaN') {
        this.ltChargeOff = ''
      }
      return this.ltChargeOff
    }
  },
  watch: {
    fetchParams (newValue) {
      var params = {
        s_fdName: newValue.searchName,
        s_fdGoodsGroupId: newValue.proType,
        s_fdProcessUri: newValue.searchUrl,
        s_fdProcessDateStart: newValue.gtPublish,
        s_fdProcessDateEnd: newValue.ltPublish,
        s_fdChargeOffDateStart: newValue.gtChargeOff,
        s_fdChargeOffDateEnd: newValue.ltChargeOff,
        s_fdPriceStart: newValue.gtPrice,
        s_fdPriceEnd: newValue.ltPrice,
        s_fdStatus: newValue.curStatus,
        s_fdChargeOffId: newValue.chargeOffId,
        s_fdChargeOffDate: newValue.chargeOffDate,
        s_fdInvoiceId: newValue.invoiceId,
        s_fdInvoiceDate: newValue.invoiceDate,
        pageIndex: newValue.pageIndex,
        s_fdStatusExpectCanceled: newValue.canceled
      }
      this.fetchData(params)
    },
    isInvoice () {
      switch (this.isInvoice) {
        case '':
          this.invoiceId = ''
          this.invoiceDate = ''
          break
        case 0:
          this.invoiceId = 'false'
          this.invoiceDate = 'false'
          break
        case 1:
          this.invoiceId = 'true'
          this.invoiceDate = 'false'
          break
        case 2:
          this.invoiceId = 'true'
          this.invoiceDate = 'true'
      }
    }
  },
  methods: {
    fetchData (params) {
      var uri = '/order_item/list'
      this.loading = true
      this.$http.get(uri, {params}).then((resp) => {
        resp.data.data.forEach((item) => {
          item.qrcode = 'static/timg.gif'
        })
        this.dataList = resp.data.data
        this.statistic = resp.data.statistic
        this.itemTotal = resp.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    fetchOrderDetail (params) {
      this.detailLoading = true
      this.$http.get(`/order_item/${this.detailId}`, {params}).then((resp) => {
        this.order = resp.data
      }).finally(() => {
        this.detailLoading = false
      })
    },
    fetchReason (params) {
      this.$http.get('/order_item/appResource/list', {params}).then((resp) => {
        this.reasonList = resp.data
        this.dReasonVisible = true
      })
    },
    deleteOrder (params) {
      this.$http.delete(`/order_item/${this.detailId}`, {params}).then((resp) => {
        if (resp.data.code === 1) {
          this.$message.success(resp.data.content)
        }
      })
    },
    qrEnter (item, index) {
      item.qrcode = `http://open.weixin.qq.com/qr/code?username=${item.goodsInfo.fdGoodsCode}`
    },
    cancelOrder (index) {
      this.cIndex = index
      this.fetchReason()
    },
    cancelReason () {
      this.dReasonVisible = false
      this.reason = ''
    },
    confirmReason () {
      if (this.reason === '') {
        this.$message.error('请选择取消原因。')
      } else {
        var params = {
          fdCancelReason: this.reason
        }
        this.$http.delete(`/order_item/${this.dataList[this.cIndex].id}`, {params}).then((resp) => {
          if (resp.data.code === 1) {
            this.cancelReason()
            this.$message.success('成功取消订单')
            this.dataList[this.cIndex].fdStatusValue = '已取消'
          }
        })
      }
    },
    handleCurrentChange (page) {
      this.pageIndex = page
    },
    toggleCondition () {
      this.showMore = !this.showMore
    },
    showModal () {
      this.modal = true
    },
    closeModal () {
      this.modal = false
    },
    setCurStatus (status) {
      this.resetCondition()
      this.pageIndex = 1
      switch (status) {
        case '所有订单':
          this.params.chargeOffId = ''
          this.params.chargeOffDate = ''
          this.curStatus = ''
          this.activeTab = '所有订单'
          break
        case '待响应':
          this.params.chargeOffId = ''
          this.params.chargeOffDate = ''
          this.curStatus = this.statusList.waitingRespond // 1
          this.activeTab = '待响应'
          break
        case '执行中':
          this.params.chargeOffId = ''
          this.params.chargeOffDate = ''
          this.curStatus = this.statusList.processing // 2
          this.activeTab = '执行中'
          break
        case '待确认':
          this.params.chargeOffId = ''
          this.params.chargeOffDate = ''
          this.curStatus = this.statusList.waitingConfirm // 3
          this.activeTab = '待确认'
          break
        case '已结束':
          this.params.chargeOffId = ''
          this.params.chargeOffDate = ''
          this.curStatus = 9 // 100
          this.activeTab = '已结束'
          break
        case '已取消':
          this.params.chargeOffId = ''
          this.params.chargeOffDate = ''
          this.curStatus = 10 // 100
          this.activeTab = '已取消'
          break
        case '未销账':
          this.params.chargeOffId = 'false'
          this.params.chargeOffDate = 'false'
          this.activeTab = '未销账'
          this.curStatus = ''
          this.params.canceled = 1
          break
        case '已销账':
          this.params.chargeOffId = 'true'
          this.params.chargeOffDate = 'true'
          this.activeTab = '已销账'
          this.curStatus = ''
      }
    },
    resetCondition () {
      this.params = {}
      this.isInvoice = ''
      this.params.searchName = ''
      this.params.proType = ''
      this.params.searchUrl = '' // 查询链接
      this.params.cgtPublish = '' // 发布时间 开始
      this.params.cltPublish = '' // 发布时间 结束
      this.params.cgtChargeOff = '' // 销账时间 开始
      this.params.cltChargeOff = '' // 销账时间 结束
      this.params.cgtPrice = '' // 价格区间 开始
      this.params.cltPrice = ''// 价格区间 结束

      this.searchName = ''
      this.inputSearch = ''
      this.proType = ''
      this.searchUrl = '' // 查询链接
      this.gtPublish = '' // 发布时间 开始
      this.ltPublish = '' // 发布时间 结束
      this.gtChargeOff = '' // 销账时间 开始
      this.ltChargeOff = '' // 销账时间 结束
      this.gtPrice = '' // 价格区间 开始
      this.ltPrice = ''// 价格区间 结束
    },
    setSearchName () {
      this.searchName = this.inputSearch
    },
    enterSearch (event) {
      if (event.keyCode === 13) {
        this.searchName = this.inputSearch
      }
    },
    setParams () {
      this.pageIndex = 1
      if (this.inputSearch === '') {
        this.searchName = ''
      }
      var params = {
        searchName: this.searchName,
        proType: this.proType,
        searchUrl: this.searchUrl,
        gtPublish: this.cgtPublish,
        ltPublish: this.cltPublish,
        gtChargeOff: this.cgtChargeOff,
        ltChargeOff: this.cltChargeOff,
        gtPrice: this.cgtPrice,
        ltPrice: this.cltPrice,
        chargeOffId: this.params.chargeOffId,
        chargeOffDate: this.params.chargeOffDate,
        invoiceId: this.invoiceId,
        invoiceDate: this.invoiceDate
      }
      this.params = params
    },
    setDetail (id) {
      // this.detailShow = true
      this.modal = true
      this.detailId = id
      this.fetchOrderDetail()
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
  components: {
    [DatePicker.name]: DatePicker,
    [InputNumber.name]: InputNumber,
    [MessageBox.name]: MessageBox,
    [Dialog.name]: Dialog,
    [Radio.name]: Radio,
    [Tooltip.name]: Tooltip,
    COrderDetail,
    CModal,
    CTitle
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/media-order-list.less';
.el-button--text {
  padding: 0 30px;
}
.cancel-order-btn {
  margin: 0;
}
.icon-warn {
  position: relative;
  color: #ffb200;
  margin-left: 5px;
  &:before {
    position: absolute;
    top: -4px;
  }
}
</style>
<style lang="less">
.page-media-order-list .el-input__inner {
  .el-input__inner {
    padding-right: 0px !important;
  }
  .el-input__icon {
    display: none !important;
  }
}
.page-media-order-list .el-date-editor{
  .el-input__icon {
    display: none !important;
  }
  .el-input__inner {
    padding: 0 10px;
  }
}
.page-media-order-list {
  .el-radio__input {
    width: 18px;
    float: left;
    margin-top: 5px;
  }
  .el-radio__label {
    width: 295px;
    display: inline-block;
    white-space: normal;
    word-break: break-all;
    word-wrap: normal;
  }
}
</style>
