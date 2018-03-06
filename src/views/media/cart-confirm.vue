<template>
  <div class="page page-media-cart">
    <c-title title="确认下单"></c-title>
    <div class="container">
      <div class="section" v-if="!!cartGroups.wechat.length">
        <div class="operation clearfix">
          <em>微信</em>
          <div class="price">
            金额：
            <span>￥{{wechatTotalPrice | numToThousands}}</span>
          </div>
          <el-date-picker
            class="pull-right"
            v-model="wechatSelectedValue"
            type="datetime"
            :picker-options="{disabledDate}"
            placeholder="统一发布时间">
          </el-date-picker>
        </div>
        <table class="goods-list">
          <thead>
            <tr>
              <td>商品名称</td>
              <td>粉丝数</td>
              <td>最近阅读量</td>
              <td>价格更新时间</td>
              <td>最近发送时间</td>
              <td>价格</td>
              <td>发布时间</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartGroups.wechat" :key="item.id">
              <td class="brief">
                <div class="goods-info inline-block vertical-middle">
                  <div class="media-left">
                    <img  class="media-object" :src="item.fdImageJson.thumbnailUrl? item.fdImageJson.thumbnailUrl: '/webapp/static/portrait-default.jpg'">
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">
                      {{item.fdName}}
                      <img
                        src="../../assets/img/icon-wechat-identified.png"
                        class="vertical-top"
                        v-if="item.fdIsOfficial"
                        title="微信认证"
                        alt="微信认证"/>
                    </h4>
                    <div class="wechat-id">
                      <span class="ellipsis inline-block color-font-light2" :title="item.fdCode">
                        {{item.fdCode}}
                      </span>
                      <router-link
                          :to="{
                            name: 'media-billboard-detail',
                            params: {id: item.id}
                          }">
                        <img
                          src="../../assets/img/icon-detail.png"
                          class="vertical-top"
                          title="商品详情"
                          alt="商品详情"
                        />
                      </router-link>
                    </div>
                    <div class="qrcode-wrapper">
                      <img src="../../assets/img/qrcode.png" class="vertical-middle" title="微信二维码" alt="微信二维码">
                      <img class="img-qrcode" :src="`http://open.weixin.qq.com/qr/code?username=${item.fdCode}`" />
                    </div>

                    <img
                        src="../../assets/img/icon-commentable.png"
                        v-if="item.fdIsCommentable"
                        title="带评论" alt="带评论"
                        class="vertical-middle" />
                      <img
                        src="../../assets/img/icon-original.png"
                        v-if="item.fdIsOriginal"
                        title="原创" alt="原创"
                        class="vertical-middle" />
                  </div>
                </div>

              </td>
              <td>{{item.fdFunsCount | numToMyriad}}</td>
              <td>{{item.fdLastReadNum | numToMyriad}}</td>
              <td>{{item.fdUpdatePriceDate}}</td>
              <td>{{item.fdLastPushDate}}</td>
              <td class="specifications">
                {{selectedSpecInfo(item)}}
              </td>
              <td class="action">
                <el-date-picker
                  v-model="item.fdProcessDate"
                  type="datetime"
                  :picker-options="{disabledDate}">
                </el-date-picker>
              </td>
            </tr>

          </tbody>
        </table>
        <div class="extra">
          备注信息
          <el-input
            class="inline-block"
            v-model="wechatData.remarks"
            placeholder="填写您需要特别关照的信息，我们客服人员会特别关注"></el-input>
          <div class="pull-right">
            <span v-show="wechatData.doc.name">附件：
              <img
                class="vertical-middle"
                :src="wechatData.doc.thumbnailUrl"
                v-show="wechatData.doc.thumbnailUrl"
                width="20"
                height="20">
              {{wechatData.doc.name}}
            </span>

            <el-tooltip
              content="为了提高发布效率,如果您已有文案请即时上传,广而易平台会提供专业编辑对您的文章进行排版,如果您暂时没有文案,您也可先提交订单,稍后会有专属客服与您取得联系。"
              placement="top"
              popper-class="max-width15em">
              <c-uploader
                class="inline-block vertical-middle ml10"
                accept=""
                :allowedExtensions="['doc', 'docx', 'txt', 'pdf','zip','rar']"
                :onComplete="wechatUploadComplete"
                :onUpload="wechatUploadStart"
                :onError="uploadError"
              >
                <el-button :loading="wechatData.uploadLoading">
                  上传文案
                </el-button>
              </c-uploader>
            </el-tooltip>

          </div>
        </div>
      </div>

      <div class="section" v-if="!!cartGroups.weibo.length">
        <div class="operation clearfix">
          <em>微博</em>
          <div class="price">
            金额：
            <span>￥{{weiboTotalPrice | numToThousands}}</span>
          </div>
          <el-date-picker
            class="pull-right"
            v-model="weiboSelectedValue"
            type="datetime"
            :picker-options="{disabledDate: disabledDate}"
            placeholder="统一发布时间">
          </el-date-picker>
        </div>
        <table class="goods-list">
          <thead>
            <tr>
              <td>商品名称</td>
              <td>粉丝数</td>
              <td>评论数</td>
              <td>价格更新时间</td>
              <td>最近发送时间</td>
              <td>价格</td>
              <td>发布时间</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartGroups.weibo" :key="item.id">
              <td class="brief">
                <div class="goods-info inline-block vertical-middle">
                  <div class="media-left">
                    <img  class="media-object" :src="item.fdImageJson.thumbnailUrl? item.fdImageJson.thumbnailUrl: '/webapp/static/portrait-default.jpg'">
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading cursor-default">
                      <span class="name ellipsis" :title="item.fdName">{{item.fdName}}</span>
                      <img
                        class="vipType"
                        :src="getSrc(item.fdVipType)"
                        :title="item.fdVipType"
                        :alt="item.fdVipType"
                        v-if="item.fdVipType !== '普通'"/>
                    </h4>
                    <span class="desc color-font-light2 ellipsis" :title="item.remarks">{{item.remarks}}</span>
                    <router-link
                      :to="{
                        name: 'media-billboard-weibo-detail',
                        params: {id: item.id}
                      }">
                      <img
                        src="../../assets/img/icon-detail.png"
                        class="vertical-top"
                        title="商品详情"
                        alt="商品详情"/>
                    </router-link>

                  </div>
                </div>

              </td>
              <td>{{item.fdFunsCount | numToMyriad}}</td>
              <td>{{item.fdCommentsCount | numToMyriad}}</td>
              <td>{{item.fdUpdatePriceDate}}</td>
              <td>{{item.fdLastPushDate}}</td>
              <td class="specifications">
                {{selectedSpecInfo(item)}}
              </td>
              <td class="action">
                <el-date-picker
                  v-model="item.fdProcessDate"
                  type="datetime"
                  :picker-options="{disabledDate}">
                </el-date-picker>
              </td>
            </tr>

          </tbody>
        </table>
        <div class="extra">
          备注信息
          <el-input
            class="inline-block"
            v-model="weiboData.remarks"
            placeholder="填写您需要特别关照的信息，我们客服人员会特别关注"></el-input>
          <div class="pull-right">
            <span v-show="weiboData.doc.name">附件：
              <img
                class="vertical-middle"
                :src="weiboData.doc.thumbnailUrl"
                v-show="weiboData.doc.thumbnailUrl"
                width="20"
                height="20">
              {{weiboData.doc.name}}
            </span>
            <el-tooltip
              content="为了提高发布效率,如果您已有文案请即时上传,广而易平台会提供专业编辑对您的文章进行排版,如果您暂时没有文案,您也可先提交订单,稍后会有专属客服与您取得联系。"
              placement="top"
              popper-class="max-width15em">
              <c-uploader
                class="inline-block vertical-middle ml10"
                accept=""
                :allowedExtensions="['doc', 'docx', 'txt', 'pdf','zip','rar']"
                :onComplete="weiboUploadComplete"
                :onUpload="weiboUploadStart"
                :onError="uploadError"
              >
                <el-button :loading="weiboData.uploadLoading">
                  上传文案
                </el-button>
              </c-uploader>
            </el-tooltip>
          </div>
        </div>

      </div>

      <div class="section" v-if="!!cartGroups.headline.length">
        <div class="operation clearfix">
          <em>头条</em>
          <div class="price">
            金额：
            <span>￥{{headlineTotalPrice | numToThousands}}</span>
          </div>
          <el-date-picker
            class="pull-right"
            v-model="headlineSelectedValue"
            type="datetime"
            :picker-options="{disabledDate: disabledDate}"
            placeholder="统一发布时间">
          </el-date-picker>
        </div>
        <table class="goods-list">
          <thead>
            <tr>
              <td>商品名称</td>
              <td>粉丝数</td>
              <td>阅读量</td>
              <td>价格更新时间</td>
              <td>最近发送时间</td>
              <td>价格</td>
              <td>发布时间</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartGroups.headline" :key="item.id">
              <td class="brief">
                <div class="goods-info inline-block vertical-middle">
                  <div class="media-left">
                    <img  class="media-object" :src="item.fdImageJson.thumbnailUrl? item.fdImageJson.thumbnailUrl: '/webapp/static/portrait-default.jpg'">
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading cursor-default">
                      <span class="name ellipsis" :title="item.fdName">{{item.fdName}}</span>

                      <img
                        src="../../assets/img/icon-headline-identified.png"
                        class="vertical-top"
                        v-if="item.fdVipType === '认证'"
                        title="今日头条官方认证"
                        alt="今日头条官方认证"/>
                    </h4>
                    <span class="desc color-font-light2 ellipsis" :title="item.remarks">{{item.remarks}}</span>
                    <router-link
                      :to="{
                        name: 'media-billboard-headline-detail',
                        params: {id: item.id}
                      }">
                      <img
                        src="../../assets/img/icon-detail.png"
                        class="vertical-top"
                        title="商品详情"
                        alt="商品详情"/>
                    </router-link>
                  </div>
                </div>

              </td>
              <td>{{item.fdFunsCount | numToMyriad}}</td>
              <td>{{item.fdReadCount | numToMyriad}}</td>
              <td>{{item.fdUpdatePriceDate}}</td>
              <td>{{item.fdLastPushDate}}</td>
              <td class="specifications">
                {{selectedSpecInfo(item)}}
              </td>
              <td class="action">
                <el-date-picker
                  v-model="item.fdProcessDate"
                  type="datetime"
                  :picker-options="{disabledDate}">
                </el-date-picker>
              </td>
            </tr>

          </tbody>
        </table>
        <div class="extra">
          备注信息
          <el-input
            class="inline-block"
            v-model="headlineData.remarks"
            placeholder="填写您需要特别关照的信息，我们客服人员会特别关注"></el-input>
          <div class="pull-right">
            <span v-show="headlineData.doc.name">附件：
              <img
                class="vertical-middle"
                :src="headlineData.doc.thumbnailUrl"
                v-show="headlineData.doc.thumbnailUrl"
                width="20"
                height="20">
              {{headlineData.doc.name}}
            </span>
            <el-tooltip
              content="为了提高发布效率,如果您已有文案请即时上传,广而易平台会提供专业编辑对您的文章进行排版,如果您暂时没有文案,您也可先提交订单,稍后会有专属客服与您取得联系。"
              placement="top"
              popper-class="max-width15em">
              <c-uploader
                class="inline-block vertical-middle ml10"
                accept=""
                :allowedExtensions="['doc', 'docx', 'txt', 'pdf','zip','rar']"
                :onComplete="headlineUploadComplete"
                :onUpload="headlineUploadStart"
                :onError="uploadError"
              >
                <el-button :loading="headlineData.uploadLoading">
                  上传文案
                </el-button>
              </c-uploader>
            </el-tooltip>
          </div>
        </div>

      </div>
    </div>

    <div class="action-bar">
      <div class="container clearfix">
        <div class="pull-right">
          <span class="vertical-middle mr30">
            共
            <em>{{selectedItemsNum}}</em>
            个商品
          </span>
          <span class="vertical-middle mr20">
            总计
            <em><i>￥</i> {{wechatTotalPrice + weiboTotalPrice + headlineTotalPrice}}</em>
          </span>
          <el-button
            @click="submit"
            :disabled="cartList.length === 0"
            :loading="loading"
            type="danger"
          >确认下单</el-button>
        </div>
      </div>
    </div>

    <c-help-info></c-help-info>
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
import { DatePicker, Tooltip } from 'element-ui'
import CHelpInfo from 'components/media/CHelpInfo'
import CUploader from 'components/CUploader'
import { mapState, mapActions } from 'vuex'
import utils from '../../utils'

export default {
  asyncData ({ store, route }) {
    return store.dispatch('fetchAccount')
  },
  mounted () {
    const groups = utils.deepClone(this.$store.getters.mediaCartGroups)
    this.cartGroups = {
      wechat: _.filter(groups.wechat, 'checked'),
      weibo: _.filter(groups.weibo, 'checked'),
      headline: _.filter(groups.headline, 'checked')
    }
    if (_.isEmpty([...this.cartGroups.wechat, ...this.cartGroups.weibo, ...this.cartGroups.headline])) {
      this.$router.replace({ name: 'media-cart' })
    }
  },
  title () {
    return '购物车确认'
  },
  data () {
    return {
      cartGroups: {
        wechat: [],
        weibo: [],
        headline: []
      },
      wechatData: {
        remarks: '',
        doc: {},
        uploadLoading: false
      },
      weiboData: {
        remarks: '',
        doc: {},
        uploadLoading: false
      },
      headlineData: {
        remarks: '',
        doc: {},
        uploadLoading: false
      },
      wechatSelectedValue: '',
      weiboSelectedValue: '',
      headlineSelectedValue: '',
      loading: false
    }
  },
  methods: {
    ...mapActions(['saveMediaCart', 'fetchWechatSpec', 'fetchWeiboSpec', 'fetchHeadlineSpec', 'batchRmItemInMediaCart']),
    disabledDate (time) {
      return time.getTime() < Date.now() - (1000 * 60 * 60 * 24)
    },
    selectedSpecInfo (item) {
      const selected = _.find(item.specifications, {fdGoodsSpecificationId: item.checkedSpecId})
      return `${selected.fdName}  ${utils.numToThousands(selected.fdPrice)}`
    },
    wechatToggleAll (event) {
      let isChecked = event.currentTarget.checked
      _.forEach(this.cartGroups.wechat, (item) => {
        item.checked = isChecked
      })
    },
    weiboToggleAll (event) {
      let isChecked = event.currentTarget.checked
      _.forEach(this.cartGroups.weibo, (item) => {
        item.checked = isChecked
      })
    },
    headlineToggleAll (event) {
      let isChecked = event.currentTarget.checked
      _.forEach(this.cartGroups.headline, (item) => {
        item.checked = isChecked
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
    wechatUploadComplete (resp) {
      if (resp.success) {
        this.wechatData.doc = resp.files[0]
      }
      this.wechatData.uploadLoading = false
    },
    wechatUploadStart (id, fileName) {
      this.wechatData.uploadLoading = true
    },
    weiboUploadComplete (resp) {
      if (resp.success) {
        this.weiboData.doc = resp.files[0]
      }
      this.weiboData.uploadLoading = false
    },
    weiboUploadStart (id, fileName) {
      this.weiboData.uploadLoading = true
    },
    headlineUploadComplete (resp) {
      if (resp.success) {
        this.headlineData.doc = resp.files[0]
      }
      this.headlineData.uploadLoading = false
    },
    headlineUploadStart (id, fileName) {
      this.headlineData.uploadLoading = true
    },
    uploadError (id, fileName, reason, xhr) {
      this.$message.error(reason)
    },

    submit () {
      this.loading = true
      const wechatList = _.map(this.cartGroups.wechat, (item) => {
        return {
          fdGoodsId: item.id,
          fdGoodsSpecificationId: item.checkedSpecId,
          fdProcessDate: utils.formatTime(item.fdProcessDate)
        }
      })
      const weiboList = _.map(this.cartGroups.weibo, (item) => {
        return {
          fdGoodsId: item.id,
          fdGoodsSpecificationId: item.checkedSpecId,
          fdProcessDate: utils.formatTime(item.fdProcessDate)
        }
      })
      const headlineList = _.map(this.cartGroups.headline, (item) => {
        return {
          fdGoodsId: item.id,
          fdGoodsSpecificationId: item.checkedSpecId,
          fdProcessDate: utils.formatTime(item.fdProcessDate)
        }
      })
      const ids = _.map([
        ...this.cartGroups.wechat,
        ...this.cartGroups.weibo,
        ...this.cartGroups.headline
      ], (item) => {
        return item.id
      })

      this.$http.post('/order_item', {
        wechat: {
          fdBuyerRemarks: this.wechatData.remarks,
          fdDocAtt: this.wechatData.doc,
          goodsList: wechatList
        },
        weibo: {
          fdBuyerRemarks: this.weiboData.remarks,
          fdDocAtt: this.weiboData.doc,
          goodsList: weiboList
        },
        headline: {
          fdBuyerRemarks: this.headlineData.remarks,
          fdDocAtt: this.headlineData.doc,
          goodsList: headlineList
        }
      }).then(resp => {
        // 提交成功后清除购物车
        this.batchRmItemInMediaCart(ids)
        this.$router.replace({
          name: 'media-purchased',
          query: {
            createdDate: resp.data.createdDate,
            priceTotal: resp.data.fdPriceTotal
          }
        })
      }).finally(() => {
        this.loading = false
      })
    },
    getStrlength (str) {
      var len = 0
      if (str.match(/[^ -~]/g) == null) {
        len = str.length
      } else {
        len = str.length + str.match(/[^ -~]/g).length
      }
      return len
    }
  },
  watch: {
    'wechatSelectedValue' (newValue) {
      _.forEach(this.cartGroups.wechat, (item) => {
        item.fdProcessDate = newValue
      })
    },
    'weiboSelectedValue' (newValue) {
      _.forEach(this.cartGroups.weibo, (item) => {
        item.fdProcessDate = newValue
      })
    },
    'headlineSelectedValue' (newValue) {
      _.forEach(this.cartGroups.headline, (item) => {
        item.fdProcessDate = newValue
      })
    },
    'wechatData.remarks' (newValue, oldValue) {
      if (this.getStrlength(newValue) > 400) {
        console.log(this.getStrlength(newValue))
        this.$message.warning('最多输入200个汉字或400个英文字母。')
        this.wechatData.remarks = newValue.substring(0, 199)
      }
    },
    'weiboData.remarks' (newValue) {
      if (this.getStrlength(newValue) > 400) {
        this.$message.warning('最多输入200个汉字或400个英文字母。')
        this.weiboData.remarks = newValue.substring(0, 199)
      }
    },
    'headlineData.remarks' (newValue) {
      if (this.getStrlength(newValue) > 400) {
        this.$message.warning('最多输入200个汉字或400个英文字母。')
        this.headlineData.remarks = newValue.substring(0, 199)
      }
    }
  },
  computed: {
    ...mapState({
      wechatSpec (state) {
        return state.media.wechatSpec
      },
      weiboSpec (state) {
        return state.media.weiboSpec
      },
      headlineSpec (state) {
        return state.media.headlineSpec
      }
    }),
    wechatTotalPrice () {
      let total = 0
      _.forEach(this.cartGroups.wechat, (item) => {
        if (item.checked && !!item.checkedSpecId) {
          let checkedSpec = _.find(item.specifications, {fdGoodsSpecificationId: item.checkedSpecId})
          total += checkedSpec.fdPrice
        }
      })
      return total
    },
    weiboTotalPrice () {
      let total = 0
      _.forEach(this.cartGroups.weibo, (item) => {
        if (item.checked && !!item.checkedSpecId) {
          let checkedSpec = _.find(item.specifications, {fdGoodsSpecificationId: item.checkedSpecId})
          total += checkedSpec.fdPrice
        }
      })
      return total
    },
    headlineTotalPrice () {
      let total = 0
      _.forEach(this.cartGroups.headline, (item) => {
        if (item.checked && !!item.checkedSpecId) {
          let checkedSpec = _.find(item.specifications, {fdGoodsSpecificationId: item.checkedSpecId})
          total += checkedSpec.fdPrice
        }
      })
      return total
    },
    cartList () {
      return [...this.cartGroups.wechat, ...this.cartGroups.weibo, ...this.cartGroups.headline]
    },
    selectedItemsNum () {
      const list = _.filter(this.cartList, 'checked')
      return list.length
    }
  },
  components: {
    CHelpInfo,
    CUploader,
    [DatePicker.name]: DatePicker,
    [Tooltip.name]: Tooltip,
    CTitle
  }
}

</script>
<style lang="less" scoped>
@import '../../assets/styles/cart.less';
</style>
