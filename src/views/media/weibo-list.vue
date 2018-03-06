<template>
  <div class="page page-weibo-list">
    <div id="search-fix" class="search-fix" :class="{'active': searchFixActive}">
      <div class="container">
        <a href="/" class="logo inline-block pull-left">
          <img src="../../assets/img/fixed-search-logo.png"/>
        </a>

        <c-search-list
          v-model="inputName"
          :type="weibo"
          v-on:setInputName="setInputName"
          v-on:setSearchName="setSearchName"
          placeholder="支持单个微博昵称(模糊查询)，或者以逗号或空格隔开的多个微博昵称(精确查询)">
        </c-search-list>

        <el-button
          v-show="isLogin"
          size="small"
          type="primary"
          id="export-btn"
          class="export-btn"
          :disabled="disabled">
          <i class="icon iconfont icon-export vertical-middle"></i>导出
        </el-button>
      </div>
    </div>
    <div class="search-box">
      <c-search-list
        class="inline-block"
        v-model="inputName"
        :type="weibo"
        v-on:setInputName="setInputName"
        v-on:setSearchName="setSearchName"
        placeholder="支持单个微博昵称(模糊查询)，或者以逗号或空格隔开的多个微博昵称(精确查询)">
      </c-search-list>
      <el-button
        v-show="isLogin"
        size="small"
        type="primary"
        id="side-export-btn"
        class="export-btn"
        :disabled="disabled">
        <i class="icon iconfont icon-export vertical-middle"></i>导出
      </el-button>
      <div class="hot-search">
        <div class="hot-search-in">
          热门搜索：
          <router-link
            v-for="(item, index) in hotTen"
            :key="item.id"
            :to="{
              name: 'media-billboard-detail',
              params: {id: item.id}}">
              {{item.fdName}}
          </router-link>
        </div>
      </div>
    </div>
    <div class="container">

      <c-weibo-filter ref="filter" :advtypedata="advTypeData"></c-weibo-filter>

      <table class="goods-list mt10" v-loading.body="loading" element-loading-text="拼命加载中">
        <thead>
          <tr>
            <td>商品名称</td>
            <td>
              <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[0]" :cur="sortOpt[0].key === sortObj.key"></c-order-by>
            </td>
            <td>
              <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[1]" :cur="sortOpt[1].key === sortObj.key"></c-order-by>
            </td>
            <td>
              <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[3]" :cur="sortOpt[3].key === sortObj.key"></c-order-by>
            </td>
            <td>
              <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[4]" :cur="sortOpt[4].key === sortObj.key"></c-order-by>
            </td>
            <td>
              <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[5]" :cur="sortOpt[5].key === sortObj.key"></c-order-by>
            </td>
            <td>
              <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[6]" :cur="sortOpt[6].key === sortObj.key"></c-order-by>
            </td>
            <td>
              <el-tooltip
                content="为了更好的服务买家,广而易平台上的商品全部自营,商品价格都由专业媒介咨询博主后确认,以保证价格真实有效"
                placement="top"
                popper-class="max-width15em">
                <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[2]" :cur="sortOpt[2].key === sortObj.key"></c-order-by>
              </el-tooltip>
            </td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody v-if="sortedValue.length !== 0">
          <tr v-for="(item, index) in sortedValue" :key="item.id">
            <td class="brief">
              <div class="media-left">
                <img class="media-object" :src="item.fdImageJson.thumbnailUrl || '/webapp/static/portrait-default.jpg'">
              </div>
              <div class="media-body" v-if="item.id">
                <h4 class="media-heading cursor-default">
                  <a :href="item.fdLink" target="_blank" class="name ellipsis" :title="item.fdName">{{item.fdName}}</a>
                  <img
                    class="vipType"
                    src="../../assets/img/vip-golden.png"
                    title="金V"
                    v-if="item.fdVipType === '金V'">
                  <img
                    class="vipType"
                    src="../../assets/img/vip-yellow.png"
                    title="黄V"
                    v-if="item.fdVipType === '黄V'">
                  <img
                    class="vipType"
                    src="../../assets/img/vip-blue.png"
                    title="蓝V"
                    v-if="item.fdVipType === '蓝V'">
                  <img
                    class="vipType"
                    src="../../assets/img/vip-star.png"
                    title="达人"
                    v-if="item.fdVipType === '达人'">
                </h4>
                <span class="desc color-font-light2 ellipsis vertical-middle" :title="item.remarks">{{item.remarks}}</span>
                <router-link :to="{ name: 'media-billboard-weibo-detail', params: {id: item.id}}">
                  <img src="../../assets/img/icon-detail.png" class="vertical-middle" title="商品详情" alt="商品详情"/>
                </router-link>
              </div>
              <div class="media-body" v-if="!item.id">
                 <h4 class="media-heading">
                  <a  class="ellipsis inline-block max-width8em" href="javascript:;" target="_blank" :title="`${item.fdCode} 微博号`">"<span class="color-primary">{{item.fdCode}}</span>"微博号</a>
                </h4>
                <div>暂不在售</div>
              </div>
            </td>
            <td v-if="item.id">
              {{item.fdFunsCount | numToMyriad}}
            </td>
            <td v-if="!item.id">
              <div v-if="!item.id" class="color-font-light2">—</div>
            </td>
            <td
              v-if="item.id"
              class="price">
              <div
                class="price-in text-left"
                v-if="filter.advType === '防屏蔽直发' || filter.advType === '不限'">
                <span class="text color-font-light2">防屏蔽直发</span>
                <span class="num">
                  <span v-if="item.fdGoodsProducts[0].fdPrice === 0">不接单</span>
                  <span v-else><span class="font12">￥</span>{{item.fdGoodsProducts[0].fdPrice | floatAdapter}}</span>
                </span>
              </div>
              <div
                class="price-in text-left"
                v-if="filter.advType === '直发' || filter.advType === '不限'">
                <span class="text color-font-light2">直发</span>
                <span class="num">
                  <span v-if="item.fdGoodsProducts[2].fdPrice === 0">不接单</span>
                  <span v-else><span class="font12">￥</span>{{item.fdGoodsProducts[2].fdPrice | floatAdapter}}</span>
                </span>
              </div>
              <div
                class="price-in text-left"
                v-if="filter.advType === '防屏蔽转发' || filter.advType === '不限'">
                <span class="text color-font-light2">防屏蔽转发</span>
                <span class="num">
                  <span v-if="item.fdGoodsProducts[1].fdPrice === 0">不接单</span>
                  <span v-else><span class="font12">￥</span>{{item.fdGoodsProducts[1].fdPrice | floatAdapter}}</span>
                </span>
              </div>
              <div
                class="price-in text-left"
                v-if="filter.advType === '转发' || filter.advType === '不限'">
                <span class="text color-font-light2">转发</span>
                <span class="num">
                  <span v-if="item.fdGoodsProducts[3].fdPrice === 0">不接单</span>
                  <span v-else><span class="font12">￥</span>{{item.fdGoodsProducts[3].fdPrice | floatAdapter}}</span>
                </span>
              </div>
            </td>
            <td v-if="!item.id">
              <div v-if="!item.id" class="color-font-light2">—</div>
            </td>
            <td v-if="item.id">
              <span v-if="item.fdWeightWeek">{{item.fdWeightWeek}}</span>
              <span v-if="!item.fdWeightWeek" class="color-font-light2">—</span>
            </td>
            <td v-if="!item.id">
              <div v-if="!item.id" class="color-font-light2">—</div>
            </td>
            <td v-if="item.id">
              {{item.fdForwardCount | numToMyriad}}
            </td>
            <td v-if="!item.id">
              <div v-if="!item.id" class="color-font-light2">—</div>
            </td>
            <td v-if="item.id">
              {{item.fdCommentsCount | numToMyriad}}
            </td>
            <td v-if="!item.id">
              <div v-if="!item.id" class="color-font-light2">—</div>
            </td>
            <td v-if="item.id">
              {{item.fdLikeCount | numToMyriad}}
            </td>
            <td v-if="!item.id">
              <div v-if="!item.id" class="color-font-light2">—</div>
            </td>
            <td v-if="item.id">
              {{item.fdUpdatePriceDate}}
              <div class="color-font-light2 next-update-time">{{item.fdNextUpdatePriceDate}}
                <div class="next-update-time-in">
                  <img src="../../assets/img/next-update-time-arrow.png" class="arrow"/>
                  价格有效截止时间
                </div>
              </div>
            </td>
            <td v-if="!item.id">
              <div v-if="!item.id" class="color-font-light2">—</div>
            </td>
            <td class="action" v-if="item.id">
              <i
                class="icon iconfont icon-shopcart"
                @click="toggleCart(item)"
                :class="{'active': item.isInCart}"
              ></i>
              <i
                class="icon iconfont icon-collect"
                @click="toggleCollection(item)"
                :class="{'active': item.isCollection}"
              ></i>
            </td>
            <td v-if="!item.id">
              <a
                target="_blank"
                :href="`http://wpa.qq.com/msgrd?v=3&uin=${clientInfo.fdQq}&site=qq&menu=yes`"
                class="consult-btn">
                咨询客服
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!sortedValue.length" class="text-center no-data">
        <img src="../../assets/img/no-data-logo.png" class="no-data-logo"/>
        <div>嗷，暂无相关商品信息哦！</div>
        <div>请看看其他商品。</div>
      </div>
      <div v-if="!isPage" style="height: 50px;"></div>
      <div class="pagination" v-if="isPage">
        <el-pagination
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
import {Tooltip} from 'element-ui'
import CWeiboFilter from 'components/media/CWeiboFilter'
import CCartBar from 'components/media/CCartBar'
import COrderBy from 'components/media/COrderBy'
import CSearchList from 'components/media/CSearchList'
/* eslint-disable no-unused-vars */
import qs from 'qs'
import utils from '../../utils'
import { mapState, mapActions } from 'vuex'

export default {
  asyncData ({ store, route }) {
    return Promise.all([
      store.dispatch('goodsList/setFilter', {
        advType: '不限'
      }),
      store.dispatch('goodsList/fetchWeiboList', {
        pageIndex: 1,
        s_fdGoodsSpecificationId: '153eebf33024969dc6fddc84a04925f3'
      }),
      store.dispatch('fetchAccount'),
      store.dispatch('goodsList/fetchHotTen', 'weibo')
    ])
  },
  title () {
    return '微博列表'
  },
  mounted () {
    // this.fetchSpec()
    this.searchFix()
    if (_.isEmpty(this.clientInfo)) {
      this.fetchClientInfo()
    }
    this.exportListener('export-btn')
    this.exportListener('side-export-btn')
  },
  data () {
    return {
      pageIndex: 1,
      pageSize: 15,
      dataList: [],
      inputName: '',
      searchName: '',
      loading: false,
      cartBarActionBtn: {
        text: '立即投放',
        routerName: 'media-cart'
      },
      advTypeData: [
        {
          name: '不限',
          specId: '',
          defaultSpecId: '153eebf33024969dc6fddc84a04925f3'
        }, {
          name: '直发',
          specId: '153eebfc6dd075a24c41ba94dbab2ef4',
          defaultSpecId: '153eebf33024969dc6fddc84a04925f3'
        }, {
          name: '转发',
          specId: '',
          defaultSpecId: '153eec0efb589233d4699924620a20b2'
        }, {
          name: '防屏蔽直发',
          specId: '153eebf33024969dc6fddc84a04925f3',
          defaultSpecId: '153eebf33024969dc6fddc84a04925f3'
        }, {
          name: '防屏蔽转发',
          specId: '153eec00e657bd0f7146de6435da3d09',
          defaultSpecId: '153eebf33024969dc6fddc84a04925f3'
        }
      ],
      sortOpt: [
        {
          text: '粉丝数',
          key: 'g.fdFunsCount',
          direction: 'no'
        }, {
          text: '价格',
          key: 'gp.fdPrice',
          direction: 'no'
        }, {
          text: '价格有效区间',
          key: 'g.fdUpdatePriceDate',
          direction: 'no'
        }, {
          text: '易指数',
          key: 'g.fdWeightWeek',
          direction: 'no'
        }, {
          text: '转发',
          key: 'g.fdForwardCount',
          direction: 'no'
        }, {
          text: '评论',
          key: 'g.fdCommentsCount',
          direction: 'no'
        }, {
          text: '点赞',
          key: 'g.fdLikeCount',
          direction: 'no'
        }
      ],
      sortObj: {},
      sortName: '',
      sortOrder: '',
      weibo: this.$store.state.goodsGroups.weibo,
      batSearchFlag: false,
      preciseFlag: false,
      searchFixActive: false,
      exportParams: {},
      newWin: {},
      disabled: false,
      collectLoading: false,
      cartLoading: false
    }
  },
  methods: {
    ...mapActions(['rmItemInMediaCart', 'addItemInMediaCart', 'fetchClientInfo']),
    ...mapActions({
      setFilter: 'goodsList/setFilter',
      fetchWeiboList: 'goodsList/fetchWeiboList'
    }),
    toggleCollection (item) {
      if (!this.collectLoading) {
        this.collectLoading = true
        this.$store.dispatch('goodsList/toggleCollection', item).then(() => {
          this.collectLoading = false
        })
      }
    },
    setSearchName (searchName, batSearchFlag, preciseFlag) {
      this.searchName = searchName
      this.batSearchFlag = batSearchFlag
      this.preciseFlag = preciseFlag
    },
    setInputName (newInputName) {
      this.inputName = newInputName
    },
    fetchSpec () {
      this.$http.get(`/goods_spec/${this.$store.state.goodsGroups.weibo}`).then((resp) => {
        resp.data.forEach((item, index) => {
          if (item.fdName === '防屏直发') {
            this.advTypeData[3].specId = item.id
            this.advTypeData.forEach((itemin) => {
              itemin.defaultSpecId = item.id
            })
          } else if (item.fdName === '转发') {
            this.advTypeData[2].specId = item.id
          } else if (item.fdName === '直发') {
            this.advTypeData[1].specId = item.id
          } else if (item.fdName === '防屏转发') {
            this.advTypeData[4].specId = item.id
          }
        })
      })
    },
    fetchData (params) {
      this.loading = true
      this.fetchWeiboList(params).then((resp) => {
        window.scroll({ top: 0, left: 0 })
        // 清除首页带来的参数
        if (!_.isEmpty(this.$route.query)) {
          if (window.history && history.pushState) {
            history.pushState(null, null, window.location.pathname)
          }
        }
      }).finally(() => {
        this.loading = false
      })
    },
    toggleCart (obj) {
      if (!this.cartLoading) {
        this.cartLoading = true
        if (obj.isInCart) {
          this.rmItemInMediaCart(obj).then((resp) => {
            obj.isInCart = false
            this.cartLoading = false
            this.$message.success('成功从购物车中移出')
          })
        } else {
          this.addItemInMediaCart(obj).then((resp) => {
            obj.isInCart = true
            this.cartLoading = false
            this.$message.success('成功添加到购物车')
          })
        }
      }
    },
    handleCurrentChange (page) {
      this.pageIndex = page
    },
    getNewCurrent (obj) {
      this.sortObj = obj
      this.sortName = this.sortObj.key
      this.sortOrder = this.sortObj.direction
    },
    searchFix () {
      document.onscroll = () => {
        var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
        this.searchFixActive = (scrollTop > 260)
      }
    },
    exportListener (id) {
      let thisId = id
      document.getElementById(id).addEventListener('click', () => {
        if (!this.preciseFlag || !this.searchName || !this.batSearchFlag) {
          if (!this.searchName) {
            this.$message.warning('请搜索商品')
          } else {
            if (!this.batSearchFlag) {
              this.$message.warning('导出商品数量必须大于1个')
            }
          }
        } else {
          if (thisId === 'side-export-btn' && this.disabled) {
            this.$message.warning('正在导出，请稍后再试')
          } else {
            this.exportList()
          }
        }
      })
    },
    exportList () {
      this.disabled = true
      this.$http.post(`/goods/export/${this.weibo}`, qs.stringify(this.exportParams), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-Requested-With': '',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
        }
      }).then((resp) => {
        if (resp.data.code === 1) {
          window.location.href = resp.data.content
        } else if (resp.data.code === 0) {
          this.$message.warning(resp.data.content)
        }
      }).finally(() => {
        this.disabled = false
      })
    },
    sortData (value) {
      if (this.sortObj.direction === 'desc') {
        let tmpValue = []
        for (let i = (value.length - 1); i >= 0; i--) {
          tmpValue.push(value[i])
        }
        value = tmpValue
      } else if (this.sortObj.direction === 'default') {
        value = this.dataList
      }
      return value
    }
  },
  computed: {
    ...mapState('goodsList', {
      list: state => state.weiboList,
      itemTotal: state => state.weiboItemTotal,
      isPage: state => state.isPage,
      filter: state => state.filter,
      hotTen: state => state.hotTen
    }),
    ...mapState({
      clientInfo (state) {
        return state.media.clientInfo
      },
      cartIdList (state) {
        return _.map(state.media.cartList, (item) => {
          return item.id
        })
      },
      orderTrade (state) {
        return state.writer.privateOrder.trade
      },
      orderWriterType (state) {
        return state.writer.privateOrder.writerType
      },
      isLogin (state) {
        return !_.isEmpty(state.account.loginType)
      }
    }),
    sortedValue () {
      var advTypeData = this.advTypeData.slice(1)
      var value = utils.deepClone(this.list)
      if (this.batSearchFlag && this.sortObj.key) {
        _.each(value, (item) => {
          if (!item.id) {
            item.fdFunsCount = 0
            item.fdUpdatePriceDate = '2000-01-01 00:00'
            item.fdNextUpdatePriceDate = '2000-01-01 00:00'
            item.fdWeightWeek = 0
            item.fdForwardCount = 0
            item.fdCommentsCount = 0
            item.fdLikeCount = 0
            _.each(advTypeData, (type, index) => {
              item.fdGoodsProducts[index] = {
                fdPrice: 0,
                fdGoodsSpecificationId: type.specId
              }
            })
          }
        })
        switch (this.sortObj.key) {
          case 'g.fdFunsCount':
            value = _.sortBy(value, (item) => {
              return item.fdFunsCount
            })
            value = this.sortData(value)
            break
          case 'gp.fdPrice':
            let indexOut = 0
            _.each(value, (item) => {
              if (item.id) {
                _.each(item.fdGoodsProducts, (itemin, index) => {
                  if (itemin.fdGoodsSpecificationId === this.filter.goodSpecId) {
                    indexOut = index
                  }
                })
              }
            })
            value.sort((x, y) => {
              if (this.sortObj.direction === 'asc') {
                return x.fdGoodsProducts[indexOut].fdPrice > y.fdGoodsProducts[indexOut].fdPrice ? 1 : -1
              } else if (this.sortObj.direction === 'desc') {
                return x.fdGoodsProducts[indexOut].fdPrice < y.fdGoodsProducts[indexOut].fdPrice ? 1 : -1
              }
            })
            if (this.sortObj.direction === 'default') {
              value = utils.deepClone(this.list)
            }
            break
          case 'g.fdUpdatePriceDate':
            value = _.sortBy(value, (item) => {
              return item.fdUpdatePriceDate
            })
            value = this.sortData(value)
            break
          case 'g.fdWeightWeek':
            value = _.sortBy(value, (item) => {
              return item.fdWeightWeek
            })
            value = this.sortData(value)
            break
          case 'g.fdForwardCount':
            value = _.sortBy(value, (item) => {
              return item.fdForwardCount
            })
            value = this.sortData(value)
            break
          case 'g.fdCommentsCount':
            value = _.sortBy(value, (item) => {
              return item.fdCommentsCount
            })
            value = this.sortData(value)
            break
          case 'g.fdLikeCount':
            value = _.sortBy(value, (item) => {
              return item.fdLikeCount
            })
            value = this.sortData(value)
        }
      }
      _.forEach(value, (item) => {
        item.isInCart = _.indexOf(this.cartIdList, item.id) >= 0
      })
      return value
    },
    fetchParams () {
      if (this.searchName && !this.preciseFlag) {
        this.pageIndex = 1
      }
      var params = _.extend({
        pageIndex: this.pageIndex,
        searchName: this.searchName,
        sortName: this.sortName,
        sortOrder: this.sortOrder,
        goodSpecId: this.advTypeData[0].defaultSpecId
      }, this.filter, {sortObj: this.sortObj})
      return params
    }
  },
  watch: {
    sortOpt () {
      this.sortOpt.forEach((item) => {
        if (item.key !== this.sortObj.key) {
          item.direction = 'no'
        }
      })
    },
    fetchParams (newValue, oldValue) {
      var gtFanCount = ''
      var ltFanCount = ''
      if (newValue.gtFanCount) {
        gtFanCount = newValue.gtFanCount * 10000
      }
      if (newValue.ltFanCount) {
        ltFanCount = newValue.ltFanCount * 10000
      }
      var params = {
        pageIndex: newValue.pageIndex,
        s_fdName: newValue.searchName,
        s_fdAttr1: newValue.trades,
        s_fdAttr2: newValue.area,
        s_priceStart: newValue.gtPrice,
        s_priceEnd: newValue.ltPrice,
        s_fdFunsCountStart: gtFanCount,
        s_fdFunsCountEnd: ltFanCount,
        s_fdGoodsSpecificationId: newValue.goodSpecId,
        s_fdVipType: newValue.vipType ? newValue.vipType.value : null,
        s_fdWeightWeekStart: newValue.gtWeight,
        s_fdWeightWeekEnd: newValue.ltWeight,
        s_fdForwardCountStart: newValue.gtForward,
        s_fdForwardCountEnd: newValue.ltForward,
        s_fdCommentsCountStart: newValue.gtComment,
        s_fdCommentsCountEnd: newValue.ltComment,
        s_fdLikeCountStart: newValue.gtLike,
        s_fdLikeCountEnd: newValue.ltLike
      }
      if (newValue.sortName !== '') {
        params = _.extend({
          sortName: newValue.sortName,
          sortOrder: newValue.sortOrder
        }, params)
      }
      this.exportParams = params
      this.fetchData(params)
    }
  },
  filters: {
    floatAdapter (value) {
      var newValue = value + ''
      if (newValue.indexOf('.') <= 0) {
        newValue = newValue + '.00'
      }
      return newValue
    }
  },
  components: {
    [Tooltip.name]: Tooltip,
    CWeiboFilter,
    CCartBar,
    COrderBy,
    CSearchList
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/goods.less';
.top {
  margin: 50px auto 45px auto;
  text-align: center;
  .search {
    width: 490px;
    box-shadow: none;
  }
}
.media-heading {
  margin: 5px 0 8px 0 !important;
  .name {
    display: inline-block;
    max-width: 9em;
    vertical-align: top;
  }
}
.desc {
  display: inline-block;
  max-width: 8em;
  height: 22px;
  line-height: 24px;
}
.vipType {
  vertical-align: middle;
}
.price {
  width: 220px;
  .price-in {
    margin-bottom: 6px;
    padding: 0 30px;
  }
}
.next-update-time {
  position: relative;
  margin-top: 6px;
  .next-update-time-in {
    position: absolute;
    top: 28px;
    left: 0px;
    right: 0px;
    margin: auto;
    width: 138px;
    height: 30px;
    line-height: 1.3;
    padding: 5px;
    border-radius: 15px;
    border: 1px solid #ddd;
    display: none;
    .arrow {
      position: absolute;
      top: -9px;
      left: 0px;
      right: 0px;
      margin: auto;
    }
  }
  &:hover .next-update-time-in {
    display: block;
  }
}
</style>
<style>
body {
  background-color: #ffffff;
}
</style>
