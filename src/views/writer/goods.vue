<template>
  <div class="page page-goods">
    <div class="container">

      <div class="top">
        <div class="search inline-block mr15">
          <input type="text" v-model="inputName">
          <a href="javascript:" @click="searchConfirm">
             <i class="iconfont icon-sousuo"></i>
          </a>
        </div>
        <router-link :to="{ name: 'publish' }" class="publish inline-block">
           <i class="iconfont icon-modify"></i>
          免费发布文案标单
        </router-link>
      </div>

      <c-filter v-model="filter" ref="filter"></c-filter>

      <ul class="tabs">
        <li>
          <router-link :to="{ name: 'goods' }" :class="{active: pageModel == 'goods'}">全部资源</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'goods', params: {model: 'collection'} }" :class="{active: pageModel != 'goods'}">我的收藏</router-link>
        </li>
      </ul>

      <div class="content" v-loading="loading" element-loading-text="拼命加载中">
        <div class="filters mt5 clearfix">
          <div class="filter-group pull-left clearfix">
            <div class="item pull-left" v-for="item in sortOpts">
              {{item.name}}
              <span
                class="caret-wrapper"
                @click="sortBy(item)"
                :class="{ascending: sortTypes[item.index] === 'ascending', descending: sortTypes[item.index] === 'descending'}"
              >
                <i class="sort-caret ascending"></i>
                <i class="sort-caret descending"></i>
              </span>
            </div>
          </div>
          <div class="total pull-right mt5">
            共 <em>{{itemTotal}}</em> 个写手
          </div>
        </div>

        <table class="goods-list">
          <thead>
            <tr>
              <td>写手信息</td>
              <td>价格</td>
              <td>评分</td>
              <td>写作类型</td>
              <td>行业类型</td>
              <td>中标次数</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in sortedValue" :key="item.id">
              <td class="brief">
                <router-link :to=" { name: 'goods-detail', params: {id:item.id} } " class="media">
                  <div class="media-left">
                    <img :src="item.fdImage.thumbnailUrl" class="media-object">
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading">{{item.fdName}}</h4>
                    <p>{{item.fdAbstract}}</p>
                  </div>
                </router-link>
              </td>
              <td>￥{{item.fdPriceDown}} - ￥{{item.fdPriceUp}}</td>
              <td>{{item.fdStar}} 分</td>
              <td>{{item.fdWriterTypeValue}}</td>
              <td class="trades">
                <ul>
                  <li v-for="trade in item.fdTrades" class="inline-block ml10">{{trade}}</li>
                </ul>
              </td>
              <td>{{item.fdWinBitCount}}</td>
              <td class="action">
                <i
                  @click="toggleCart(item)"
                  :class="[(item.isInCart) ? 'icon-shouyegouwuchedianji' : 'icon-shouyedeyangsheng', 'iconfont']"
                ></i>
                <i
                  class="iconfont"
                  v-if="pageModel === 'goods'"
                  @click="toggleCollection(item)"
                  :class="[item.isCollected ? 'icon-xingxing' : 'icon-xingxing1']"
                ></i>
              </td>
            </tr>

          </tbody>
        </table>

        <el-pagination
          class="pagination text-right"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="itemTotal">
        </el-pagination>

      </div>

    </div>
    <c-cart-bar :actionBtn="cartBarActionBtn"></c-cart-bar>
  </div>
</template>

<script>
import CFilter from 'components/writer/CFilter'
import CCartBar from 'components/writer/CCartBar'
import { mapState, mapActions } from 'vuex'

export default {
  mounted () {
    // 区别普通列表和收藏列表
    if (this.$route.params.model === 'collection') {
      this.pageModel = 'collection'
    }

    // 处理从私募流程中前来选取商品时的情况
    if (this.fromCartPick) {
      this.$refs.filter.pickTrade(this.orderTrade)
      this.$refs.filter.pickWriterType(this.orderWriterType)
      this.cartBarActionBtn = {
        text: '提交订单',
        routerName: 'cart-pick'
      }
    } else {
      this.fetchData()
    }
  },
  data () {
    return {
      fromCartPick: this.$route.query.fromCartPick,
      cartBarActionBtn: {
        text: '立即投放',
        routerName: 'cart'
      },
      pageModel: 'goods',
      inputName: '',
      searchName: '',
      pageIndex: 1,
      filter: {},
      dataList: [],
      pageSize: 15,
      itemTotal: 0,
      loading: false,
      sortTypes: ['', 'ascending', 'descending'],
      sortOpts: [{
        name: '人气',
        key: 'fdCollectionCount',
        index: 0
      }, {
        name: '中标量',
        key: 'fdWinBitCount',
        index: 0
      }, {
        name: '好评率',
        key: 'fdStar',
        index: 0
      }],
      currentSortOpt: {}
    }
  },
  methods: {
    ...mapActions(['removeGoodsInCart', 'addGoodsInCart']),
    fetchData (params) {
      var uri = this.pageModel === 'goods' ? '/writer/list' : '/writer/collection/writer/list'
      this.loading = true
      this.$http.get(uri, {params}).then((resp) => {
        this.dataList = resp.data.data
        this.itemTotal = resp.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    sortBy (obj) {
      _.forEach(this.sortOpts, (item) => {
        if (item.key !== obj.key) {
          item.index = 0
        }
      })
      obj.index = ++obj.index % 3
      this.currentSortOpt = obj
    },
    handleCurrentChange (page) {
      this.pageIndex = page
    },
    searchConfirm () {
      this.searchName = this.inputName
    },
    toggleCart (obj) {
      if (obj.isInCart) {
        this.removeGoodsInCart(obj).then((resp) => {
          obj.isInCart = false
          this.$message.success('成功从购物车中移出')
        })
      } else {
        this.addGoodsInCart(obj).then((resp) => {
          obj.isInCart = true
          this.$message.success('成功添加到购物车')
        })
      }
    },
    toggleCollection (obj) {
      if (obj.isCollected) {
        this.$http.delete(`/writer/collection/writer/${obj.id}`).then((resp) => {
          if (resp.data.code === 1) {
            obj.isCollected = false
            this.$message.success('取消收藏成功')
          }
        })
      } else {
        this.$http.post('/writer/collection/writer', [obj.id]).then((resp) => {
          if (resp.data.code === 1) {
            obj.isCollected = true
            this.$message.success('添加收藏成功')
          }
        })
      }
    }
  },
  computed: {
    ...mapState({
      cartIdList (state) {
        return _.map(state.writer.cart.goodsListWa, (item) => {
          return item.id
        })
      },
      orderTrade (state) {
        return state.writer.privateOrder.trade
      },
      orderWriterType (state) {
        return state.writer.privateOrder.writerType
      }
    }),
    sortedValue () {
      var value = this.dataList
      _.forEach(value, (item) => {
        item.isInCart = _.indexOf(this.cartIdList, item.id) >= 0
      })
      if (this.currentSortOpt.key) {
        value = _.sortBy(this.dataList, this.currentSortOpt.key)
        if (this.sortTypes[this.currentSortOpt.index] === 'descending') {
          value.reverse()
        }
      }
      return value
    },
    fetchParams () {
      var params = _.extend({
        pageIndex: this.pageIndex,
        searchName: this.searchName
      }, this.filter)
      return params
    }
  },

  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应
      this.pageModel = to.params.model === 'collection' ? 'collection' : 'goods'
      this.$refs.filter.resetAll()
    },
    fetchParams (newValue, oldValue) {
      var params = {
        pageIndex: newValue.pageIndex,
        s_fdName: newValue.searchName,
        s_fdWriterType: newValue.writerType,
        s_fdTrades: newValue.trades,
        s_fdArea: newValue.area,
        s_lt_fdPrice: newValue.ltPrice,
        s_gt_fdPrice: newValue.gtPrice
      }
      this.fetchData(params)
    }
  },

  components: {
    CFilter,
    CCartBar
  }

}

</script>

<style lang="less" scoped>
@import '../../assets/styles/goods.less';
.goods-list {
  margin-top: 18px;
}
.brief {
  padding-left: 25px;
  width: 240px;
  text-align: left;
  .media-object {
    width: 55px;
  }
  .media-body {
    .media-heading, p {
      width: 130px;
    }
  }
  p {
    font-size: 13px;
    color: @color-font-light;
  }
}
.trades {
  max-width: 400px;
}
.action {
  .iconfont {
    cursor: pointer;
    color: @color-primary;
    font-size: 30px;
  }
}
</style>
