<template>
  <div class="page-media-cart">
    <c-title title="购物车"></c-title>
     <div class="container">
      <ul class="tabs">
        <li
          :class="{active: activeTab === 'all'}"
          @click="changeTabs('all')">全部商品</li>
        <li
          v-if="!!cartGroups.wechat.length"
          :class="{active: activeTab === 'wechat'}"
          @click="changeTabs('wechat')">微信</li>
        <li
          v-if="!!cartGroups.weibo.length"
          :class="{active: activeTab === 'weibo'}"
          @click="changeTabs('weibo')">微博</li>

        <li
          v-if="!!cartGroups.weibo.length"
          :class="{active: activeTab === 'headline'}"
          @click="changeTabs('headline')">头条</li>
      </ul>

      <div class="section" v-show="['all', 'wechat'].indexOf(activeTab) >= 0" v-if="!!cartGroups.wechat.length">
        <div class="operation clearfix">
          <el-checkbox
            class="vertical-middle checkbox mr10"
            @change="wechatToggleAll($event)"
          ></el-checkbox>
          <em>微信</em>
          <div class="price">
            金额：
            <span>￥{{wechatTotalPrice | numToThousands}}</span>
          </div>
          <el-select
            class="pull-right"
            v-model="wechatSelectedValue"
            size="small"
            placeholder="统一选择广告位"
          >
           <el-option
             v-for="item in wechatSpec"
             :key="item.id"
             :label="item.fdName"
             :value="item.id">
           </el-option>
          </el-select>
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
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartGroups.wechat" :key="item.id">
              <td class="brief">
                <el-checkbox v-model="item.checked" class="vertical-middle checkbox mr15"></el-checkbox>

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
                          alt="商品详情"/>
                      </router-link>
                    </div>
                    <div
                      class="qrcode-wrapper"
                      v-on:mouseenter.once="qrEnter(item, index)">
                      <img src="../../assets/img/qrcode.png" class="vertical-middle" title="微信二维码" alt="微信二维码">
                      <img class="img-qrcode" :src="item.qrcode" />
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
                <ul>
                  <li
                    v-for="spec in item.specifications"
                    :key="spec.fdGoodsSpecificationId">
                    <template v-if="spec.fdPrice !== 0">
                      <el-radio
                        class="mr10"
                        v-model="item.checkedSpecId"
                        :label="spec.fdGoodsSpecificationId"
                      >{{spec.fdName}}</el-radio>
                      <span>￥ {{spec.fdPrice | numToThousands}}</span>
                    </template>
                    <template v-else>
                      <span class='label'>{{spec.fdName}}</span>
                      <span>不接单</span>
                    </template>
                  </li>
                </ul>
              </td>
              <td class="action">
                <i
                  @click="removeFromWechat(item)"
                  class="iconfont icon-lajixiang"
                ></i>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <div class="section" v-show="['all', 'weibo'].indexOf(activeTab) >= 0" v-if="!!cartGroups.weibo.length">
        <div class="operation clearfix">
          <el-checkbox
            class="vertical-middle checkbox mr10"
            @change="weiboToggleAll($event)"
          ></el-checkbox>
          <em>微博</em>
          <div class="price">
            金额：
            <span>￥{{weiboTotalPrice | numToThousands}}</span>
          </div>
          <el-select
            class="pull-right"
            v-model="weiboSelectedValue"
            size="small"
            placeholder="统一选择广告位"
          >
           <el-option
             v-for="item in weiboSpec"
             :key="item.id"
             :label="item.fdName"
             :value="item.id">
           </el-option>
          </el-select>
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
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartGroups.weibo" :key="item.id">
              <td class="brief">
                <el-checkbox v-model="item.checked" class="vertical-middle checkbox mr15"></el-checkbox>

                <div class="goods-info inline-block vertical-middle">
                  <div class="media-left">
                    <img  class="media-object" :src="item.fdImageJson.thumbnailUrl? item.fdImageJson.thumbnailUrl: '/webapp/static/portrait-default.jpg'">
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading cursor-default">
                      <span class="name ellipsis" :title="item.fdName">{{item.fdName}}</span>
                      <img
                        class="vipType"
                        v-if="item.fdVipType !== '普通'"
                        :src="getSrc(item.fdVipType)"
                        :title="item.fdVipType"
                        :alt="item.fdVipType"/>
                    </h4>
                    <span class="desc color-font-light2 ellipsis" :title="item.remarks">{{item.remarks}}</span>

                    <router-link class="vertical-top" :to="{ name: 'media-billboard-weibo-detail', params: {id: item.id}}">
                      <img src="../../assets/img/icon-detail.png" class="vertical-top" title="商品详情" alt="商品详情"/>
                    </router-link>
                  </div>
                </div>

              </td>
              <td>{{item.fdFunsCount | numToMyriad}}</td>
              <td>{{item.fdCommentsCount | numToMyriad}}</td>
              <td>{{item.fdUpdatePriceDate}}</td>
              <td>{{item.fdLastPushDate}}</td>
              <td class="specifications">
                <ul>
                  <li
                    v-for="spec in item.specifications"
                    :key="spec.fdGoodsSpecificationId">
                    <template v-if="spec.fdPrice !== 0">
                      <el-radio
                        class="mr10"
                        v-model="item.checkedSpecId"
                        :label="spec.fdGoodsSpecificationId"
                      >{{spec.fdName}}</el-radio>
                      <span>￥ {{spec.fdPrice | numToThousands}}</span>
                    </template>
                    <template v-else>
                      <span class='label'>{{spec.fdName}}</span>
                      <span>不接单</span>
                    </template>
                  </li>
                </ul>
              </td>
              <td class="action">
                <i
                  @click="removeFromWeibo(item)"
                  class="iconfont icon-lajixiang"
                ></i>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <div class="section" v-show="['all', 'headline'].indexOf(activeTab) >= 0" v-if="!!cartGroups.headline.length">
        <div class="operation clearfix">
          <el-checkbox
            class="vertical-middle checkbox mr10"
            @change="headlineToggleAll($event)"
          ></el-checkbox>
          <em>头条</em>
          <div class="price">
            金额：
            <span>￥{{headlineTotalPrice | numToThousands}}</span>
          </div>
          <el-select
            class="pull-right"
            v-model="headlineSelectedValue"
            size="small"
            placeholder="统一选择广告位"
          >
           <el-option
             v-for="item in headlineSpec"
             :key="item.id"
             :label="item.fdName"
             :value="item.id">
           </el-option>
          </el-select>
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
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in cartGroups.headline" :key="item.id">
              <td class="brief">
                <el-checkbox v-model="item.checked" class="vertical-middle checkbox mr15"></el-checkbox>

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

                    <router-link class="vertical-top" :to="{ name: 'media-billboard-headline-detail', params: {id: item.id}}">
                      <img src="../../assets/img/icon-detail.png" class="vertical-top" title="商品详情" alt="商品详情"/>
                    </router-link>
                  </div>
                </div>

              </td>
              <td>{{item.fdFunsCount | numToMyriad}}</td>
              <td>{{item.fdReadCount | numToMyriad}}</td>
              <td>{{item.fdUpdatePriceDate}}</td>
              <td>{{item.fdLastPushDate}}</td>
              <td class="specifications">
                <ul>
                  <li
                    v-for="spec in item.specifications"
                    :key="spec.fdGoodsSpecificationId">
                    <template v-if="spec.fdPrice !== 0">
                      <el-radio
                        class="mr10"
                        v-model="item.checkedSpecId"
                        :label="spec.fdGoodsSpecificationId"
                      >{{spec.fdName}}</el-radio>
                      <span>￥ {{spec.fdPrice | numToThousands}}</span>
                    </template>
                    <template v-else>
                      <span class='label'>{{spec.fdName}}</span>
                      <span>不接单</span>
                    </template>
                  </li>
                </ul>
              </td>
              <td class="action">
                <i
                  @click="removeFromHeadline(item)"
                  class="iconfont icon-lajixiang"
                ></i>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <!-- <div class="empty-cart" v-if="cartList.length === 0">
        <p class="text-center">
          您的购物车空空如也，现在去
          <router-link :to="{ name: 'media-wechat-list' }">选商品</router-link>
        </p>
      </div> -->
      <div  v-if="cartList.length === 0" class="text-center no-data">
        <img src="../../assets/img/no-data-logo.png" class="no-data-logo"/>
        <div>您的购物车空空如也，现在去</div>
        <div><router-link class="link" :to="{ name: 'media-wechat-list' }">选商品</router-link></div>
      </div>
    </div>

    <div class="action-bar">
      <div class="container clearfix">
        <div class="pull-right">
          <span class="vertical-middle mr30">
            已选
            <em>{{selectedItemsNum}}</em>
            个商品
          </span>
          <span class="vertical-middle mr20">
            总计
            <em><i>￥</i> {{wechatTotalPrice + weiboTotalPrice + headlineTotalPrice}}</em>
          </span>
          <el-button
            @click="submit"
            :disabled="selectedItemsNum === 0"
            type="primary"
          >提交</el-button>
        </div>
      </div>
    </div>
    <c-help-info></c-help-info>
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
import { Radio } from 'element-ui'
import CHelpInfo from 'components/media/CHelpInfo'
import { mapState, mapActions } from 'vuex'
import utils from '../../utils'

export default {
  asyncData ({ store, route }) {
    return store.dispatch('fetchAccount')
  },
  mounted () {
    if (_.isEmpty(this.account.loginType)) {
      this.$router.push({name: 'media-wechat-list'})
    } else {
      this.fetchMediaCart()
      if (this.wechatSpec.length === 0) {
        this.fetchWechatSpec()
      }
      if (this.weiboSpec.length === 0) {
        this.fetchWeiboSpec()
      }
      if (this.headlineSpec.length === 0) {
        this.fetchHeadlineSpec()
      }
    }
  },
  title () {
    return '购物车'
  },
  data () {
    return {
      cartGroups: {
        wechat: [],
        weibo: [],
        headline: []
      },
      activeTab: 'all',
      wechatSelectedValue: '',
      weiboSelectedValue: '',
      headlineSelectedValue: ''
    }
  },
  methods: {
    ...mapActions(['fetchMediaCart', 'saveMediaCart', 'fetchWechatSpec', 'fetchWeiboSpec', 'fetchHeadlineSpec']),
    changeTabs (value) {
      this.activeTab = value
    },
    removeFromWechat (item) {
      this.$http.delete(`/goods/cart_item/${item.id}`).then(resp => {
        let index = _.indexOf(this.cartGroups.wechat, item)
        this.cartGroups.wechat.splice(index, 1)
        this.$message.success('成功从购物车中移出')
      })
    },
    removeFromWeibo (item) {
      this.$http.delete(`/goods/cart_item/${item.id}`).then(resp => {
        let index = _.indexOf(this.cartGroups.weibo, item)
        this.cartGroups.weibo.splice(index, 1)
        this.$message.success('成功从购物车中移出')
      })
    },
    removeFromHeadline (item) {
      this.$http.delete(`/goods/cart_item/${item.id}`).then(resp => {
        let index = _.indexOf(this.cartGroups.headline, item)
        this.cartGroups.headline.splice(index, 1)
        this.$message.success('成功从购物车中移出')
      })
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
    submit () {
      if (this.account.nothirdLogin) {
        this.$msgbox.confirm('您还未完善信息，是否前去完善?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({name: 'media-complete-info'})
        })
      } else {
        this.saveMediaCart(this.cartList).then(() => {
          console.log('saveMediaCart')
          this.$router.push({name: 'media-cart-confirm'})
        })
      }
    },
    qrEnter (item, index) {
      item.qrcode = `http://open.weixin.qq.com/qr/code?username=${item.fdCode}`
    }
  },
  watch: {
    '$store.getters.mediaCartGroups' (newValue) {
      newValue.wechat.forEach((item) => {
        item.qrcode = '/webapp/static/timg.gif'
      })
      this.cartGroups = utils.deepClone(newValue)
    },
    'wechatSelectedValue' (newValue) {
      _.forEach(this.cartGroups.wechat, (item) => {
        const spec = _.find(item.specifications, {fdGoodsSpecificationId: newValue})
        if (spec.fdPrice !== 0) {
          item.checkedSpecId = newValue
        }
      })
    },
    'weiboSelectedValue' (newValue) {
      _.forEach(this.cartGroups.weibo, (item) => {
        const spec = _.find(item.specifications, {fdGoodsSpecificationId: newValue})
        if (spec.fdPrice !== 0) {
          item.checkedSpecId = newValue
        }
      })
    },
    'headlineSelectedValue' (newValue) {
      _.forEach(this.cartGroups.headline, (item) => {
        const spec = _.find(item.specifications, {fdGoodsSpecificationId: newValue})
        if (spec.fdPrice !== 0) {
          item.checkedSpecId = newValue
        }
      })
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
      },
      account (state) {
        return state.account
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
    [Radio.name]: Radio,
    CTitle
  }
}

</script>
<style lang="less" scoped>
@import '../../assets/styles/cart.less';
.goods-list td.action {
  width: auto;
}
</style>
<style>
.page-media-cart .el-tabs__item {
  font-size: 16px;
}
</style>
