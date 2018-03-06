<template>
  <div class="media-collect-list">
    <c-title title="我的收藏"></c-title>
    <div class="container clearfix" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <c-menu class="pull-left mt10"></c-menu>
      <div class="container-right pull-right mt10">
        <div class="tab-bar clearfix">
          <ul class="tab-list">
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === 'wechat'}"
                @click="setActiveTab('wechat')">
                微信
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === 'weibo'}"
                @click="setActiveTab('weibo')">
                微博
              </a>
            </li>
            <li>
              <a
                href="javascript:;"
                :class="{'active': activeTab === 'headline'}"
                @click="setActiveTab('headline')">
                头条
              </a>
            </li>
          </ul>
        </div>
        <div class="already-collect-num">
          已收藏
          <span class="color-primary">{{itemTotal}}</span>个商品
        </div>
        <div class="collect-operations">
          <el-checkbox v-model="chooseAll" class="choose-all" @change="toggleAllChecked">全选</el-checkbox>
          <el-button
            type="primary"
            size="medium"
            class="export-collect-btn"
            @click="exportCollect">
            <i class="icon iconfont icon-export vertical-middle"></i>
            导出
          </el-button>
          <el-button
            type="primary"
            plain
            size="medium"
            :disabled="cancelAllDisabled"
            class="cancel-collect-btn"
            @click="cancelAllCollect">
            取消收藏
          </el-button>
        </div>
        <div class="content">
          <table class="goods-list" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
            <thead>
              <tr>
                <th>商品名称</th>
                <th>
                  <!--粉丝数-->
                  <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[0]" :cur="sortOpt[0].key === sortObj.key"></c-order-by>
                </th>
                <th>
                  <!--价格-->
                  <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[1]" :cur="sortOpt[1].key === sortObj.key"></c-order-by>
                </th>
                <th>
                  <el-tooltip
                    content="为了更好的服务买家,广而易平台上的商品全部自营,商品价格都由专业媒介咨询博主后确认,以保证价格真实有效"
                    placement="top"
                    popper-class="max-width15em">
                    <!--价格更新时间-->
                  <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[2]" :cur="sortOpt[2].key === sortObj.key"></c-order-by>
                  </el-tooltip>
                </th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody v-if="sortedValue.length !== 0">
              <tr
                v-for="(item, index) in sortedValue"
                :key="item.id"
                class="tr"
                :class="{'wechat': item.fdGoodsGroupId === wechat, 'weibo': item.fdGoodsGroupId === weibo}"
                v-if="item.isCollection">
                <td class="brief">
                  <el-checkbox v-model="item.isChecked" class="is-checked"></el-checkbox>
                  <div class="goods-info" v-if="item.fdGoodsGroupId === wechat">
                    <div class="media-left">
                      <img  class="media-object" :src="item.fdImageJson.thumbnailUrl || '/webapp/static/portrait-default.jpg'">
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading">
                        <a
                          class="inline-block ellipsis name vertical-middle"
                          :href="`http://weixin.sogou.com/weixin?type=1&query=${item.fdCode}&ie=utf8&_sug_=n&_sug_type_=`"
                          target="_blank">
                          {{item.fdName}}
                        </a>
                        <img
                          src="../../assets/img/icon-wechat-identified.png"
                          class="vertical-top"
                          v-if="item.fdVipType === '认证'"
                          title="微信官方认证"
                          alt="微信官方认证"/>
                      </h4>
                      <div class="wechat-id">
                        <span class="ellipsis inline-block color-font-light2" :title="item.fdCode">{{item.fdCode}}</span>
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
                        v-on:mouseenter.once="qrEnter(item, index)"
                        class="qrcode-wrapper vertical-middle">
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
                  <div class="goods-info" v-if="item.fdGoodsGroupId === weibo">
                    <div class="media-left">
                      <img  class="media-object" :src="item.fdImageJson.thumbnailUrl || '/webapp/static/portrait-default.jpg'">
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading">
                        <a
                          class="inline-block ellipsis name vertical-middle"
                          :href="item.fdLink"
                          target="_blank">
                          {{item.fdName}}
                        </a>
                        <img
                          src="../../assets/img/vip-golden.png"
                          title="金V"
                          alt="金V"
                          v-if="item.fdVipType === '金V'"
                          class="vipType vertical-middle">
                        <img
                          src="../../assets/img/vip-yellow.png"
                          title="黄V"
                          alt="黄V"
                          v-if="item.fdVipType === '黄V'"
                          class="vipType vertical-middle">
                        <img
                          src="../../assets/img/vip-blue.png"
                          title="蓝V"
                          alt="蓝V"
                          v-if="item.fdVipType === '蓝V'"
                          class="vipType vertical-middle">
                        <img
                          src="../../assets/img/vip-star.png"
                          title="达人"
                          alt="达人"
                          v-if="item.fdVipType === '达人'"
                          class="vipType vertical-middle">
                      </h4>
                      <div class="wechat-id">
                        <span class="ellipsis inline-block color-font-light2" :title="item.fdCode">{{item.remarks}}</span>

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
                  </div>
                  <div class="goods-info" v-if="item.fdGoodsGroupId === headline">
                    <div class="media-left">
                      <img  class="media-object" :src="item.fdImageJson.thumbnailUrl || '/webapp/static/portrait-default.jpg'">
                    </div>
                    <div class="media-body">
                      <h4 class="media-heading">
                        <a
                          class="inline-block ellipsis name vertical-middle"
                          :href="item.fdLink"
                          target="_blank">
                          {{item.fdName}}
                        </a>
                        <img
                          src="../../assets/img/icon-headline-identified.png"
                          class="vertical-top"
                          v-if="item.fdVipType === '认证'"
                          title="今日头条官方认证"
                          alt="今日头条官方认证"/>
                      </h4>
                      <div class="wechat-id">
                        <span class="ellipsis inline-block color-font-light2" :title="item.remarks">{{item.remarks}}</span>

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
                  </div>
                </td>
                <td>{{item.fdFunsCount | numToMyriad}}</td>
                <td class="price">
                  <div
                    class="price-in text-left"
                    v-for="price in item.fdGoodsProducts"
                    :key="price.key"
                  >
                    <span class="text color-font-light2">{{price.fdGoodsSpecification.fdName}} </span>
                    <span class="num">￥ {{price.fdPrice}}</span>
                  </div>
                </td>
                <td class="update-time">
                  {{item.fdUpdatePriceDate}}
                  <div class="color-font-light2 next-update-time cursor-default">{{item.fdNextUpdatePriceDate}}
                    <div class="next-update-time-in">
                      <img src="../../assets/img/next-update-time-arrow.png" class="arrow"/>
                      下次价格更新时间
                    </div>
                  </div>
                </td>
                <td class="action">
                  <i
                    class="icon iconfont icon-collect vertical-middle"
                    @click="toggleCollection(item, index)"
                    :class="{'active': item.isCollection}"
                  ></i>
                  <i
                    v-if="item.fdStatus === 1"
                    class="icon iconfont icon-shopcart vertical-middle"
                    @click="toggleCart(item)"
                    :class="{'active': item.isInCart}"
                  ></i>
                  <span v-if="item.fdStatus !== 1" class="vertical-middle">已下架</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div  v-if="!sortedValue.length" class="text-center no-data">
            <img src="../../assets/img/no-data-logo.png" class="no-data-logo"/>
            <div>嗷，您还没有收藏任何商品哦！</div>
            <div v-if="groupId === wechat">
              请看看
              <router-link class="link" :to="{ name: 'media-wechat-list' }">更多商品</router-link>。
            </div>
            <div v-if="groupId === weibo">
              请看看
              <router-link class="link" :to="{ name: 'media-weibo-list' }">更多商品</router-link>。
            </div>
          </div>
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
      </div>
    </div>
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
import {Tooltip} from 'element-ui'
import COrderBy from 'components/media/COrderBy'
import { mapState, mapActions } from 'vuex'
/* eslint-disable no-unused-vars */
import filters from '../../filters.js'

export default {
  mounted () {
    this.fetchWechatSpec().then(() => {
      this.fetchData({
        pageIndex: 1,
        s_fdGoodsSpecificationId: this.defaultSpecId,
        s_fdGoodsGroupId: this.groupId})
    })
    this.fetchWeiboSpec()
  },
  title () {
    return '我的收藏'
  },
  data () {
    return {
      pageIndex: 1,
      pageSize: 15,
      itemTotal: 0,
      loading: false,
      activeTab: 'wechat',
      dataList: [],
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
          text: '价格更新时间',
          key: 'g.fdUpdatePriceDate',
          direction: 'default',
          disabled: false
        }
      ],
      sortObj: {},
      sortName: '',
      sortOrder: '',
      groupId: this.$store.state.goodsGroups.wechat,
      wechat: this.$store.state.goodsGroups.wechat, // groupId 商品类型
      weibo: this.$store.state.goodsGroups.weibo, // groupId  商品类型
      headline: this.$store.state.goodsGroups.headline,
      defaultSpecId: '',
      wechatSpecId: '',
      weiboSpecId: '',
      headlineSpecId: '',
      chooseAll: false,
      cancelAllDisabled: false,
      checkedList: [],
      exportLoading: false,
      collectLoading: false,
      cartLoading: false
    }
  },
  computed: {
    ...mapState({
      cartIdList (state) {
        return _.map(state.media.cartList, (item) => {
          return item.id
        })
      }
    }),
    sortedValue () {
      var value = this.dataList
      _.forEach(value, (item) => {
        item.isInCart = _.indexOf(this.cartIdList, item.id) >= 0
      })
      return value
    },
    fetchParams () {
      var params = {
        pageIndex: this.pageIndex,
        sortName: this.sortName,
        sortOrder: this.sortOrder,
        groupId: this.groupId,
        defaultSpecId: this.defaultSpecId
      }
      return params
    }
  },
  watch: {
    fetchParams (newValue, oldValue) {
      var params = {
        pageIndex: newValue.pageIndex,
        sortName: newValue.sortName,
        sortOrder: newValue.sortOrder,
        s_fdGoodsGroupId: newValue.groupId,
        s_fdGoodsSpecificationId: newValue.defaultSpecId
      }
      this.fetchData(params)
    }
  },
  methods: {
    ...mapActions(['rmItemInMediaCart', 'addItemInMediaCart']),
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
    toggleCollection (obj, index) {
      if (!this.collectLoading) {
        this.collectLoading = true
        if (obj.isCollection) {
          this.$http.delete(`/goods/collection/${obj.id}`).then((resp) => {
            if (resp.data.code === 1) {
              this.dataList.splice(index, 1)
              this.collectLoading = false
              this.itemTotal --
              this.$message.success('取消收藏成功')
            }
          })
        }
      }
    },
    handleCurrentChange (page) {
      this.pageIndex = page
      this.chooseAll = false
    },
    setActiveTab (type) {
      this.chooseAll = false
      switch (type) {
        case 'wechat':
          this.activeTab = 'wechat'
          this.groupId = this.wechat
          this.defaultSpecId = this.wechatSpecId
          break
        case 'weibo':
          this.activeTab = 'weibo'
          this.groupId = this.weibo
          this.defaultSpecId = this.weiboSpecId
          break
        case 'headline':
          this.activeTab = 'headline'
          this.groupId = this.headline
          this.defaultSpecId = this.headlineSpecId
      }
    },
    fetchData (params) {
      this.loading = true
      this.$http.post('/goods/collection/list', params).then((resp) => {
        resp.data.data.forEach((item) => {
          item.qrcode = '/webapp/static/timg.gif'
          item.isChecked = false
        })
        this.dataList = resp.data.data
        this.itemTotal = resp.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    fetchWechatSpec () {
      return this.$http.get(`/goods_spec/${this.wechat}`).then((resp) => {
        resp.data.forEach((item, index) => {
          if (item.fdName === '头条') {
            this.wechatSpecId = item.id
            this.defaultSpecId = this.wechatSpecId
          }
        })
      })
    },
    fetchWeiboSpec () {
      this.$http.get(`/goods_spec/${this.weibo}`).then((resp) => {
        resp.data.forEach((item, index) => {
          if (item.fdName === '防屏直发') {
            this.weiboSpecId = item.id
          }
        })
      })
    },
    fetchHeadlineSpec () {
      this.$http.get(`/goods_spec/${this.headline}`).then((resp) => {
        resp.data.forEach((item, index) => {
          if (item.fdName === '推荐') {
            this.headlineSpecId = item.id
          }
        })
      })
    },
    getNewCurrent (obj) {
      this.sortObj = obj
      this.sortName = this.sortObj.key
      this.sortOrder = this.sortObj.direction
    },
    qrEnter (item, index) {
      item.qrcode = `http://open.weixin.qq.com/qr/code?username=${item.fdCode}`
    },
    toggleAllChecked () {
      if (this.chooseAll) {
        this.dataList.forEach((item) => {
          item.isChecked = true
        })
      } else {
        this.dataList.forEach((item) => {
          item.isChecked = false
        })
      }
    },
    cancelAllCollect () {
      this.getCheckedGoodsList()
      if (this.checkedList.length === 0) {
        this.$message.warning('请选择要取消收藏的商品。')
        return
      }
      this.cancelAllDisabled = true
      this.$http.post('/goods/collection/delete', this.checkedList).then((resp) => {
        if (resp.data.code === 1) {
          this.cancelAllDisabled = false
          this.checkedList.forEach((item) => {
            this.dataList.forEach((itm, index) => {
              if (item === itm.id) {
                this.dataList.splice(index, 1)
              }
            })
          })
          this.$message.success('取消收藏成功')
        }
      }).finally(() => {
        this.cancelAllDisabled = false
      })
    },
    exportCollect () {
      this.exportLoading = true
      this.getCheckedGoodsList()
      if (this.checkedList.length === 0) {
        this.$message.warning('请选择要导出的商品。')
        return
      }
      return this.$http.post('/goods/ids/export', this.checkedList).then(resp => {
        window.location.href = resp.data.content
      }).finally(() => {
        this.exportLoading = false
      })
    },
    getCheckedGoodsList () {
      this.checkedList = []
      this.dataList.forEach((item) => {
        if (item.isChecked) {
          this.checkedList.push(item.id)
        }
      })
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
    COrderBy,
    CTitle
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
.media-collect-list {
  background-color: @color-bg;
}
.container {
  padding-bottom: 50px;
  .container-right {
    width: 1030px;
    .content {
      padding: 15px 0;
      min-height: 700px;
      background-color: @color-bg;
    }
  }
}
.goods-list .brief .media-left img {
  width: 52px;
  height: 52px;
}
.tab-bar .tab-list li {
  margin: 0 30px 0 0;
}
.goods-list {
  width: 100%;
  margin: auto;
  thead {
    th {
      padding: 10px 0;
      font-size: 14px;
      text-align: center;
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid #ededed;
      td {
        border: none;
        padding-top: 20px;
        padding-bottom: 20px;
      }
    }
  }
}
.price {
  width: 200px;
  .price-in {
    display: block;
    width: 150px;
    margin: 0 auto 10px auto;
    text-align: left;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.wechat .price .price-in {
  width: 140px;
}
.icon-shopcart, .icon-collect {
  margin: 0 2px;
  font-size: 28px;
  &.active {
    color: @color-primary;
  }
}
.ellipsis.name {
  max-width: 8em;
}
.already-collect-num {
  margin: 30px 0px 30px 0;
  font-size: 16px;
}
.brief {
  position: relative;
  padding-left: 30px;
  width: 265px;
  .is-checked {
    position: absolute;
    left: 0;
    top: 52px;
  }
  .wechat-id {
    margin-top: 5px;
  }
}
.collect-operations {
  text-align: right;
  .choose-all {
    float: left;
    margin-top: 10px;
  }
  .export-collect-btn,
  .cancel-collect-btn {
    width: 80px;
    padding: 10px 0;
  }
  .cancel-collect-btn {
    color: @color-primary;
    border: 2px solid @color-primary;
  }
}
</style>
<style lang="less">
.choose-all .el-checkbox__label {
  vertical-align: middle;
}
</style>
