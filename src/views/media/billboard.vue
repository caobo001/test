<template>
  <div class="page-billboard">
    <div class="search-block text-center clearfix">
      <el-autocomplete
        class="search-box pull-left"
        v-model="keyword"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入公众号、名称"
        icon="search"
        @keyup.native.enter="search"
      ></el-autocomplete>
      <span class="inline-block text-center search-btn pull-left" @click="search">搜索</span>
    </div>

    <div class="container" v-loading.fullscreen="loading" element-loading-text="拼命加载中">

      <div class="category clearfix">
        <ul class="pull-left">
          <li><router-link :to="{name: 'media-billboard'}">微信</router-link></li>
          <li><router-link :to="{name: 'media-billboard-weibo'}">微博</router-link></li>
          <li><router-link :to="{name: 'media-billboard-headline'}">头条</router-link></li>
        </ul>
        <span class="pull-right statistic-date">统计截至：{{countDate | dateFormat}}</span>
      </div>
      <div class="filter-box clearfix">
        <div class="tabs text-center clearfix pull-left">
          <span
            class="inline-block text-center frequency"
            :class="{active: type==='1'}"
            @click="setType('1')">
            日榜
          </span>
          <span
            class="inline-block text-center frequency"
            :class="{active: type==='7'}"
            @click="setType('7')">
            周榜
          </span>
        </div>
        <div class="filter pull-left">
            <span class="inline-block filter-toggle" @click="setTradeToggle">
              {{tradeToggle? '收起':'展开'}}
              <i :class="{'el-icon-arrow-down': !tradeToggle, 'el-icon-arrow-up': tradeToggle}"></i>
            </span>
            <el-checkbox-group v-model="checkedTrades" class="trade-list" :class="{'showAllTrade': tradeToggle}">
              <el-checkbox v-for="trade in trades" :label="trade.text" :key="trade.text" class="trade"></el-checkbox>
            </el-checkbox-group>
        </div>
      </div>
      <div class="table-wrap">
        <table class="table table-hover text-center" v-if="sortedValue.length">
          <thead>
            <tr>
              <th class="text-center">序号</th>
              <th class="text-center">公众号</th>
              <th class="text-center">发布文章</th>
              <th class="text-center">总阅读数</th>
              <th class="text-center">头条</th>
              <th class="text-center">平均</th>
              <th class="text-center">最高</th>
              <th class="text-center">总点赞数</th>
              <th class="text-center">易指数</th>
              <th class="text-center">操作</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in sortedValue" :key="item.fdGoodsId">
              <td class="order">
                <div class="rank">
                  <img src="../../assets/img/billboard-rank01.png" v-if="index === 0" class="crown">
                  <img src="../../assets/img/billboard-rank02.png" v-if="index === 1" class="crown">
                  <img src="../../assets/img/billboard-rank03.png" v-if="index === 2" class="crown">
                  <span class="rank-text">{{index + 1}}</span>
                </div>
              </td>
              <td>
                <div class="layer-fix">
                  <img :src="item.fdImageJson.thumbnailUrl" class="avatar">
                  <div class="inline-block">
                    <router-link class="ellipsis name vertical-middle" :to="{ name: 'media-billboard-detail', params: {id: item.fdGoodsId}}" :title="item.fdName">
                      {{item.fdName}}
                    </router-link>
                    <img
                    src="../../assets/img/icon-commentable.png"
                    v-if="item.fdIsCommentable"
                    title="带评论" alt="带评论"
                    class="vertical-middle icon-comment" />
                    <img
                      src="../../assets/img/icon-original.png"
                      v-if="item.fdIsOriginal"
                      title="原创" alt="原创"
                      class="vertical-middle icon-origin" />
                    <router-link class="ellipsis" :to="{ name: 'media-billboard-detail', params: {id: item.fdGoodsId}}" :title="item.fdCode">
                      {{item.fdCode}}
                    </router-link>
                  </div>

                </div>
              </td>
              <td>{{item.fdArticleCount}}</td>
              <td>{{item.fdTotalReadQty | numToMyriad}}</td>
              <td>{{item. fdTotalHeadLineReadQty | numToMyriad}}</td>
              <td>{{item.fdAvgReadQty | numToMyriad}}</td>
              <td>{{item.fdMaxReadQty | numToMyriad}}</td>
              <td>{{item.fdTotalLikeQty | numToMyriad}}</td>
              <td class="color-primary">{{item.fdWeight | toFixed}}</td>
              <td class="actions">
                <i
                  class="icon iconfont icon-shopcart"
                  @click="toggleCart(item)"
                  :class="{'active': item.isInCart}"
                  title="加入购物车"
                ></i>
                <i
                  class="icon iconfont icon-collect"
                  @click="toggleListCollection(item)"
                  :class="{'active': item.isCollection}"
                  title="收藏"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
        <div  v-if="!sortedValue.length" class="text-center no-data">
          <img src="../../assets/img/no-data-logo.png" class="no-data-logo"/>
          <div>嗷，暂无相关商品信息哦！</div>
          <div>请看看其他商品。</div>
        </div>
      </div>

    </div>
    <c-cart-bar :actionBtn="cartBarActionBtn"></c-cart-bar>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { Autocomplete, CheckboxGroup } from 'element-ui'
import CCartBar from 'components/media/CCartBar'
import utils from '../../utils'

export default {
  asyncData ({ store, route }) {
    return Promise.all([
      store.dispatch('billboard/setTrades', []),
      store.dispatch('billboard/fetchList'),
      store.dispatch('billboard/fetchTrades')
    ])
  },
  title () {
    return '榜单'
  },
  data () {
    return {
      keyword: '',
      loading: false,
      cartBarActionBtn: {
        text: '立即投放',
        routerName: 'media-cart'
      },
      checkedTrades: [],
      tradeToggle: false
    }
  },
  computed: {
    ...mapState('billboard', {
      list: state => state.list,
      countDate: state => state.listCountDate,
      type: state => state.type,
      trades: state => state.trades
    }),
    cartIdList () {
      return _.map(this.$store.state.media.cartList, (item) => {
        return item.id
      })
    },
    sortedValue () {
      var value = utils.deepClone(this.list)
      _.forEach(value, (item) => {
        item.isInCart = _.indexOf(this.cartIdList, item.fdGoodsId) >= 0
      })
      return value
    }
  },
  methods: {
    ...mapActions(['rmItemInMediaCart', 'addItemInMediaCart']),
    ...mapActions({
      fetchList: 'billboard/fetchList',
      setType: 'billboard/setType',
      toggleListCollection: 'billboard/toggleListCollection',
      fetchTrades: 'billboard/fetchTrades',
      setTrades: 'billboard/setTrades'
    }),
    search () {
      this.keyword = this.keyword.trim()
      if (!this.keyword) return
      if (this.keyword.length > 20) {
        return this.$message.warning('最大搜索长度为 20 字')
      }
      this.$router.push({name: 'media-billboard-search', params: { keyword: this.keyword }})
    },
    toggleCart (obj) {
      obj.id = obj.fdGoodsId
      if (obj.isInCart) {
        this.rmItemInMediaCart(obj).then((resp) => {
          obj.isInCart = false
          this.$message.success('成功从购物车中移出')
        })
      } else {
        this.addItemInMediaCart(obj).then((resp) => {
          obj.isInCart = true
          this.$message.success('成功添加到购物车')
        })
      }
    },
    querySearchAsync (queryString, cb) {
      if (!queryString || queryString.length > 20) {
        cb([])
        return
      }
      this.$http.get(
      '/goods/search', {
        params: {
          fdName: queryString,
          fdGoodsGroupId: this.$store.state.goodsGroups.wechat
        }
      }).then((resp) => {
        cb(_.map(resp.data, (item) => {
          return {
            value: item
          }
        }))
      })
    },
    setTradeToggle () {
      this.tradeToggle = !this.tradeToggle
    }
  },
  watch: {
    type (newValue) {
      this.loading = true
      this.fetchList().finally(() => {
        this.loading = false
      })
    },
    checkedTrades (newValue) {
      this.loading = true
      this.setTrades(this.checkedTrades)
      this.$store.dispatch('billboard/fetchList').finally(() => {
        this.loading = false
      })
    }
  },
  filters: {
    toFixed: function (value) {
      value = Number(value)
      return value.toFixed(2)
    },
    dateFormat: function (value) {
      if (!value) return ''
      let dataObj = new Date(value)
      function formatNumber (n) {
        n = n.toString()
        return n[1] ? n : '0' + n
      }

      var year = dataObj.getFullYear()
      var month = dataObj.getMonth() + 1
      var day = dataObj.getDate()

      return [year, month, day].map(formatNumber).join('-')
    }
  },
  components: {
    CCartBar,
    [Autocomplete.name]: Autocomplete,
    [CheckboxGroup.name]: CheckboxGroup
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
@import '../../assets/styles/billboard.less';
@import '../../assets/styles/billboard-list.less';


</style>
<style lang="less">
@import '../../assets/styles/variables.less';
.page-billboard .search-block .el-input__icon {
  right: initial;
  left: 0;
}
.page-billboard .search-block .el-input__icon + .el-input__inner {
  padding-right: 10px;
  padding-left: 35px;
}
.page-billboard .search-box .el-input__inner {
  height: 48px;
  border-radius: 0;
  box-sizing: border-box;
}

</style>
