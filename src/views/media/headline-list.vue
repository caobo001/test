<template>
  <div class="page page-headline-list">
    <div id="search-fix" class="search-fix" :class="{'active': searchFixActive}">
      <div class="container">
        <a href="/" class="logo inline-block pull-left">
          <img src="../../assets/img/fixed-search-logo.png"/>
        </a>

        <c-search-list
          v-model="inputName"
          :type="headline"
          v-on:setInputName="setInputName"
          v-on:setSearchName="setSearchName"
          placeholder="支持单个头条昵称(模糊查询)，或者以逗号或空格隔开的多个头条昵称(精确查询)">
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
        v-model="inputName"
        :type="headline"
        class="inline-block"
        v-on:setInputName="setInputName"
        v-on:setSearchName="setSearchName"
        placeholder="支持单个头条昵称(模糊查询)，或者以逗号或空格隔开的多个头条昵称(精确查询)">
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
    <div class="container" id="container">
      <c-headline-filter ref="filter" :advtypedata="advTypeData"></c-headline-filter>

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
              <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[2]" :cur="sortOpt[2].key === sortObj.key"></c-order-by>
            </td>

            <td>
              <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[3]" :cur="sortOpt[3].key === sortObj.key"></c-order-by>
            </td>
            <td>
              <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[4]" :cur="sortOpt[4].key === sortObj.key"></c-order-by>
            </td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody v-if="sortedValue.length !== 0">
          <tr v-for="(item, index) in sortedValue" :key="item.id">
            <td class="brief">
              <div class="media-left">
                <img  class="media-object" :src="item.fdImageJson.thumbnailUrl || '/webapp/static/portrait-default.jpg'">
              </div>
              <div class="media-body" v-if="item.id">
                <h4 class="media-heading">
                  <a :href="item.fdLink" target="_blank">{{item.fdName}}</a>
                  <img
                    src="../../assets/img/icon-headline-identified.png"
                    class="vertical-top"
                    v-if="item.fdVipType === '认证'"
                    title="今日头条官方认证"
                    alt="今日头条官方认证"/>
                </h4>
                <div class="wechat-id">
                  <span class="ellipsis inline-block color-font-light2" :title="item.remarks">{{item.remarks}}</span>
                  <router-link :to="{name: 'media-billboard-headline-detail', params: {id: item.id}}"><img src="../../assets/img/icon-detail.png" class="vertical-top" title="商品详情" alt="商品详情"/></router-link>
                </div>
              </div>
              <div class="media-body" v-if="!item.id">
                 <h4 class="media-heading">
                  <a  class="ellipsis inline-block max-width8em" href="javascript:;" target="_blank" :title="`${item.remarks} 今日头条`">"<span class="color-primary">{{item.remarks}}</span>"今日头条</a>
                </h4>
                <div>暂不在售</div>
              </div>
            </td>
            <td v-if="item.id">
              {{item.fdFunsCount | numToMyriad}}
            </td>
            <td v-if="!item.id">
              <span v-if="!item.id" class="color-font-light2">—</span>
            </td>
            <td class="price" v-if="item.id">

              <div
                class="price-in text-left"
                v-for="price in item.fdGoodsProducts"
                :key="price.id"
                v-show="filter.advType === '不限' || (filter.advType + '价') === price.fdGoodsSpecification.fdName">
                <span class="text color-font-light2">{{price.fdGoodsSpecification.fdName}} </span>
                <span class="num">
                  <span v-if="price.fdPrice === 0">不接单</span>
                  <span v-else><span class="font12">￥</span>{{price.fdPrice | floatAdapter}}</span>
                </span>
              </div>
            </td>
            <td v-if="!item.id">
              <div class="color-font-light2">—</div>
            </td>
            <td v-if="item.id">
              <span v-if="item.fdWeightWeek">{{item.fdWeightWeek}}</span>
              <span class="color-font-light2" v-else>—</span>
            </td>
            <td v-if="!item.id">
              <div class="color-font-light2">—</div>
            </td>
            <td>
              <div v-if="item.id">{{item.fdReadCount}}</div>
              <div v-if="!item.id" class="color-font-light2">—</div>
            </td>
            <td>
              <div v-if="item.id">
                {{item.fdUpdatePriceDate}}
                <div class="color-font-light2 next-update-time cursor-default">{{item.fdNextUpdatePriceDate}}
                  <div class="next-update-time-in">
                    <img src="../../assets/img/next-update-time-arrow.png" class="arrow"/>
                    价格有效截止时间
                  </div>
                </div>
              </div>
              <div v-if="!item.id" class="color-font-light2">—</div>
            </td>
            <td class="action">
              <div v-if="item.id">
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
              </div>
              <div v-if="!item.id">
                <a
                  target="_blank"
                  :href="`http://wpa.qq.com/msgrd?v=3&uin=${clientInfo.fdQq}&site=qq&menu=yes`"
                  class="consult-btn">
                  咨询客服
                </a>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div  v-if="!sortedValue.length" class="text-center no-data">
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
import CHeadlineFilter from 'components/media/CHeadlineFilter'
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
      store.dispatch('goodsList/fetchHeadlineList', {
        pageIndex: 1,
        s_fdGoodsSpecificationId: '15d398d8fd721eb6f62070742299a0d6'
      }),
      store.dispatch('fetchAccount'),
      store.dispatch('goodsList/fetchHotTen', 'headline')
    ])
  },
  title () {
    return '头条列表'
  },
  mounted () {
    this.searchFix()
    if (_.isEmpty(this.clientInfo)) {
      this.fetchClientInfo()
    }
    this.exportListener('export-btn')
    this.exportListener('side-export-btn')
  },
  data () {
    return {
      advTypeData: [
        {
          name: '不限',
          specId: '',
          defaultSpecId: '15d398d8fd721eb6f62070742299a0d6'
        }, {
          name: '推荐',
          specId: '15d398d8fd721eb6f62070742299a0d6',
          defaultSpecId: '15d398d8fd721eb6f62070742299a0d6'
        }, {
          name: '普发',
          specId: '15d398df2d83c5c390e0a9b4737926bd',
          defaultSpecId: '15d398d8fd721eb6f62070742299a0d6'
        }
      ],
      defaultSpecId: '',
      pageIndex: 1,
      pageSize: 15,
      loading: false,
      cartBarActionBtn: {
        text: '立即投放',
        routerName: 'media-cart'
      },
      pageModel: 'headline',
      dataList: [],
      inputName: '',
      searchName: '',
      sortOpt: [
        {
          text: '粉丝数',
          key: 'g.fdFunsCount',
          direction: 'default',
          disabled: false
        }, {
          text: '价格',
          key: 'gp.fdPrice',
          direction: 'default',
          disabled: false
        }, {
          text: '易指数',
          key: 'g.fdWeightWeek',
          direction: 'default',
          disabled: false
        }, {
          text: '阅读量',
          key: 'g.fdReadCount',
          direction: 'default',
          disabled: false
        }, {
          text: '价格有效区间',
          key: 'g.fdUpdatePriceDate',
          direction: 'default',
          disabled: false
        }
      ],
      sortName: '',
      sortOrder: '',
      sortObj: {},
      headline: this.$store.state.goodsGroups.headline,
      exportParams: {},
      batSearchFlag: false,
      preciseFlag: false,
      searchFixActive: false,
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
      fetchHeadlineList: 'goodsList/fetchHeadlineList',
      toggleCollection: 'goodsList/toggleCollection'
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
    fetchData (params) {
      this.loading = true
      this.fetchHeadlineList(params).then((resp) => {
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
    searchConfirm () {
      this.searchName = this.inputName
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
      this.$http.post(`/goods/export/${this.headline}`, qs.stringify(this.exportParams), {
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
        value = this.list
      }
      return value
    }
  },
  computed: {
    ...mapState('goodsList', {
      list: state => state.headlineList,
      itemTotal: state => state.headlineItemTotal,
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
            item.fdReadCount = 0
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
          case 'g.fdWeightWeek':
            value = _.sortBy(value, (item) => {
              return item.fdWeightWeek
            })
            value = this.sortData(value)
            break
          case 'g.fdReadCount':
            value = _.sortBy(value, (item) => {
              return item.fdReadCount
            })
            value = this.sortData(value)
            break
          case 'g.fdUpdatePriceDate':
            value = _.sortBy(value, (item) => {
              return item.fdUpdatePriceDate
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
      }, this.filter)
      return params
    }
  },
  watch: {
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
        s_fdReadCountStart: newValue.gtReadCount,
        s_fdReadCountEnd: newValue.ltReadCount,
        s_place: newValue.local,
        s_fdWeightWeekStart: newValue.gtWeight,
        s_fdWeightWeekEnd: newValue.ltWeight
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
    CHeadlineFilter,
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
.price {
  max-width: 175px;
  width: 175px;
}
.price-in {
  padding-left: 30px;
  margin-bottom: 6px;
}
.action {
  width: 130px;
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
.max-width8em {
  max-width: 8em;
}
</style>
<style>
body {
  background-color: #ffffff;
}
</style>
