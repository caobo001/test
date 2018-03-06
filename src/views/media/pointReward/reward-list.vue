<template>
  <div class="page-media-reward">

    <c-title title="积分兑换"></c-title>

    <div class="container clearfix" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <c-menu class="pull-left mt10"></c-menu>

      <div class="container-right pull-right">
        <ul class="tab-list clearfix">
          <li class="active">
             <router-link :to="{ name: 'media-reward-list' }" >积分兑换</router-link>
          </li>
          <li>
             <router-link :to="{ name: 'media-point-record' }" >积分明细</router-link>
          </li>
          <li>
             <router-link :to="{ name: 'media-point-order' }" >兑换订单</router-link>
          </li>
        </ul>

        <div class="point-tips font14">你当前可用积分: <span class="color-primary font14">{{availablePoint | numToThousandsRound}} 积分</span></div>

        <div class="filter">
          <div class="filter-row clearfix">
            <span class="filter-name pull-left">商品分类：</span>
            <div class="filter-value-box pull-left">
              <ul class="filter-value-list">
                <li
                  v-for="item in goodsTypes"
                  :key="item.id"
                  @click="setCurGoods(item)"
                  :class="{'active': curGoodsId === item.id}"
                  class="cursor-pointer">
                  {{item.fdName}}
                </li>
              </ul>
            </div>
          </div>

          <div class="filter-row clearfix">
            <span class="filter-name pull-left">积分范围：</span>
            <div class="filter-value-box pull-left">
              <ul class="filter-value-list">
                <li
                  v-for="item in pointList"
                  :key="item.id"
                  @click="setPointRangeAuto(item)"
                  :class="{'active': item.text === curPointRangeText}"
                  class="cursor-pointer">
                  {{item.text}}
                </li>
              </ul>
              <el-input-number v-model="gtPoint" :min="0"></el-input-number>-
              <el-input-number v-model="ltPoint" :min="0"></el-input-number>
              万
              <span class="filter-confirm-btn" @click="setPointRange">确定</span>
            </div>
          </div>
        </div>

        <div class="title">
          全部礼品
        </div>

        <div class="point-info">
          <span>共需积分: <span class="color-primary">{{cartTotalPoints | numToThousandsRound}} 积分</span></span>
          <el-checkbox label="仅查看我能兑换的礼品" v-model="myAvailable" class="pull-right" @change="searchMyAvailable"></el-checkbox>
        </div>

        <table class="presents-table" v-if="dataList.length">
          <thead>
            <tr>
              <th class="goods-info-th">礼品名称</th>
              <th>
                <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[0]" :cur="sortOpt[0].key === sortObj.key"></c-order-by>
              </th>
              <th>
                <c-order-by v-on:newcurrent="getNewCurrent" :current="sortOpt[1]" :cur="sortOpt[1].key === sortObj.key"></c-order-by>
              </th>
              <th>数量</th>
              <th>小计</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in dataList"
              :key="item.id"
              @mouseenter="setCurIndex(index)">
              <td class="goods-info-td">
                <div class="goods-info">
                  <el-checkbox
                    v-model="item.choosen"
                    @change="toggleCart(item)"
                    class="vertical-middle check-box">
                  </el-checkbox>
                  <div class="goods-img-box">
                    <img :src="item.fdImage || '/webapp/static/portrait-default.jpg'" class="goods-img">
                  </div>

                  <div class="goods-info-in">
                    <div :title="item.fdName" :alt="item.fdName"class="goods-name ellipsis">{{item.fdName}}</div>
                    <div class="goods-description ellipsis" :title="item.fdDesp" :alt="item.fdDesp">{{item.fdDesp}}</div>
                    <div class="goods-price">市场参考价：{{item.fdPrice}}元</div>
                  </div>
                </div>
              </td>
              <td>
                {{item.fdNo}}
              </td>
              <td>
                <div class="original-point" v-if="item.fdPointsOrigin && item.fdPointsOrigin !== item.fdPoints">{{item.fdPointsOrigin | numToThousandsRound}}</div>
                <div class="point">{{item.fdPoints | numToThousandsRound}}</div>
              </td>
              <td>
                <el-input-number
                  v-model="item.num"
                  @change="changeNum"
                  :min="1">
                </el-input-number>
              </td>
              <td>
                {{item.totalPoint | numToThousandsRound}}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="pagination" v-if="dataList.length">
          <el-pagination
            @current-change="handlePageChange"
            :current-page="params.pageIndex"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="itemTotal">
          </el-pagination>
        </div>

        <c-no-data v-if="!dataList.length">
          <div slot="tips">换换筛选条件更好哦！</div>
        </c-no-data>
      </div>
    </div>

    <div :class="bottomClass" :style="bottomStyle">
      <span>可用积分：</span>
      <span class="color-primary font18">{{(availablePoint - cartTotalPoints) | numToThousandsRound}}积分</span>
      <div class="bottom-fixed-right">
        <div class="total-presents inline-block" @click="toggleCartList">
          已选择
          <span class="color-primary font18">{{cartList.length}}</span>
          件礼品
          <i class="icon iconfont icon-doubleup" :class="{'icon-doubleup-active': showCartList}"></i>

        </div>
        <div class="total-points inline-block">
          总计：<span class="color-primary font18">{{cartTotalPoints | numToThousandsRound}}</span>
        </div>
        <el-button type="primary" size="small" class="submit-btn inline-block" @click="submit()" :disabled="(!cartList.length || availablePoint < cartTotalPoints)">提交</el-button>
      </div>

      <div class="choosen-list-box" v-if="showCartList">
        <div class="triangle"></div>
        <div class="empty-cart" v-if="!cartList.length">
          <img src="../../../assets/img/top-empty-shopcart.png" class="vertical-middle mr10">
          <span>购物车中是空的，赶紧选购吧！</span>
        </div>
        <carousel
          :perPage="8"
          :navigationEnabled="true"
          class="swiper-wrapper">
          <slide
            v-for="(item, index) in cartList"
            :key="item.id">
            <div
              class="swiper-slide">
              <img :src="item.fdImage" class="img"/>
              <el-button
                type="text"
                class="cancel-btn"
                @click="delFromCart(item.id)">
                取消选择
              </el-button>
              <span class="num">x{{item.fdGoodsNum}}</span>
            </div>
          </slide>
        </carousel>
      </div>
    </div>


  </div>
</template>
<script>
import CTitle from 'components/CTitle'
import { CheckboxGroup, InputNumber } from 'element-ui'
import COrderBy from 'components/media/COrderBy'
import CNoData from 'components/CNoData'
import { Carousel, Slide } from 'vue-carousel'
import $ from '../../../assets/scripts/jquery-ajax.js'
export default {
  name: 'reward-list',
  data () {
    return {
      loading: false,
      availablePoint: this.$store.state.account.fdPmpoint,
      myAvailable: false,
      costPoint: 0,
      goodsTypes: [],
      pointList: [{
        gt: '',
        lt: '',
        text: '不限'
      }, {
        gt: 0,
        lt: 50000,
        text: '5万以下'
      }, {
        gt: 50000,
        lt: 200000,
        text: '5-20万'
      }, {
        gt: 200000,
        lt: 500000,
        text: '20-50万'
      }, {
        gt: 500000,
        lt: 1000000,
        text: '50-100万'
      }, {
        gt: 1000000,
        lt: '',
        text: '100万以上'
      }],
      params: {
        pageIndex: 1,
        s_EQ_fdCategoryId: '',
        s_GT_fdPoints: '',
        s_LT_fdPoints: '',
        sortName: '',
        sortOrder: ''
      },
      gtPoint: '',
      ltPoint: '',
      pageSize: 15,
      itemTotal: 0,
      dataList: [],
      cartList: [],
      showCartList: false,
      right: 0,
      curIndex: '',
      curPointRangeText: '不限',
      curGoodsId: '',
      sortOpt: [{
        text: '礼品编号',
        key: 'fdNo',
        direction: 'default',
        disabled: false
      }, {
        text: '兑换积分',
        key: 'fdPoints',
        direction: 'default',
        disabled: false
      }],
      sortObj: {},
      swiperOption: {
        slidesPerView: 8,
        spaceBetween: 24
      },
      bottomClass: 'bottom-fixed',
      bottomStyle: {}
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    cartTotalPoints () {
      let points = 0
      this.cartList.forEach((item, index) => {
        points = points + item.fdPoints * item.fdGoodsNum
      })
      return points
    }
  },
  mounted () {
    console.log($('#footer'))
    let footer = $('#footer')
    $(window).scroll(() => {
      if (($(window).scrollTop() > (footer.offset().top + footer.outerHeight())) ||
        (($(window).scrollTop() + $(window).height()) < footer.offset().top)) {
        console.log('不在可视区域内')
        this.isBottomFixed = true
        this.bottomClass = 'bottom-fixed'
        this.bottomStyle = {'right': this.right + 'px'}
      } else {
        console.log('在可视区域内')
        this.bottomClass = 'bottom-static'
        this.bottomStyle = {'margin-right': this.right + 'px'}
      }
    })

    this.right = (document.body.clientWidth - 1200) / 2
    this.$store.dispatch('fetchAccount').then(() => {
      this.availablePoint = this.$store.state.account.fdPmpoint
    })
    this.fetchCartList().then(() => {
      console.log('this.cartList: ', this.cartList)
      this.fetchData()
    })
    this.fetchCategory()
  },
  methods: {
    fetchData () {
      this.loading = true
      return this.$http.get('/pm/goods/list', { params: this.params }).then(resp => {
        resp.data.data.forEach((item, index) => {
          item.choosen = false
          item.num = 1
          item.totalPoint = item.fdPoints * 1
          this.cartList.forEach((itm, idx) => {
            if (itm.fdGoodsId === item.id) {
              item.choosen = true
              item.num = itm.fdGoodsNum
              item.totalPoint = item.fdPoints * itm.fdGoodsNum
              item.cartId = itm.id
            }
          })
        })
        this.itemTotal = resp.data.total
        this.dataList = resp.data.data
        this.loading = false
      })
    },
    fetchCategory () {
      return this.$http.get('/pm/category/list').then((resp) => {
        resp.data.data.unshift({
          fdName: '不限',
          id: ''
        })
        this.goodsTypes = resp.data.data
      })
    },
    fetchCartList () {
      return this.$http.get('/pm/cart/list').then((resp) => {
        this.cartList = resp.data.data
      })
    },
    toggleCart (item) {
      if (item.choosen) {
        this.addToCart(item)
      } else {
        this.delFromCart(item.cartId)
      }
    },
    addToCart (item) {
      let count = 0
      this.cartList.forEach((itm, index) => {
        if (item.id === itm.fdGoodsId) {
          this.editCartNum(item)
        } else {
          count++
        }
      })
      if (count === this.cartList.length) {
        this.postToCart(item)
      }
    },
    editCartNum (item) {
      let params = {
        id: item.cartId,
        fdGoodsId: item.id,
        fdGoodsNum: item.num
      }
      this.$http.put('/pm/cart/edit', params).then((resp) => {
        if (resp.data.code === 1) {
          this.$message.success('成功添加到购物车')
          this.fetchCartList().then(() => {
            this.fetchData()
          })
        }
      })
    },
    postToCart (item) {
      let params = {
        fdCustomerId: this.account.id,
        fdGoodsId: item.id,
        fdGoodsNum: item.num
      }
      this.$http.post('/pm/cart/add', params).then((resp) => {
        if (resp.data.code === 1) {
          this.$message.success('成功添加到购物车')
          this.fetchCartList().then(() => {
            this.fetchData()
          })
        }
      })
    },
    delFromCart (id) {
      this.$http.delete(`/pm/cart/delete/${id}`).then(resp => {
        if (resp.data.code === 1) {
          this.$message.success('成功从购物车中删除')
          this.fetchCartList().then(() => {
            this.fetchData()
          })
        }
      })
    },
    changeNum (value) {
      let curItem = this.dataList[this.curIndex]
      curItem.totalPoint = value * curItem.fdPoints
      this.dataList[this.curIndex].num = value
      if (curItem.choosen) {
        this.addToCart(curItem)
      }
    },
    setCurIndex (index) {
      this.curIndex = index
    },
    setPointRangeAuto (item) {
      if (this.curPointRangeText === item.text) {
        this.curPointRangeText = '不限'
        this.gtPoint = ''
        this.ltPoint = ''
      } else {
        this.gtPoint = item.gt / 10000
        this.ltPoint = item.lt / 10000
        this.curPointRangeText = item.text
      }
      this.params.s_GT_fdPoints = this.gtPoint ? this.gtPoint * 10000 : ''
      this.params.s_LT_fdPoints = this.ltPoint ? this.ltPoint * 10000 : ''
      this.fetchData()
    },
    setPointRange () {
      this.curPointRangeText = ''
      this.pointList.forEach((item) => {
        if (item.gt === this.gtPoint && item.lt === this.ltPoint) {
          this.curPointRangeText = item.text
        }
      })
      this.params.s_GT_fdPoints = this.gtPoint ? this.gtPoint * 10000 : ''
      this.params.s_LT_fdPoints = this.ltPoint ? this.ltPoint * 10000 : ''
      this.fetchData()
    },
    setCurGoods (item) {
      if (this.curGoodsId === item.id) {
        this.curGoodsId = ''
        this.params.s_EQ_fdCategoryId = ''
      } else {
        this.curGoodsId = item.id
        this.params.s_EQ_fdCategoryId = item.id
      }
      this.fetchData()
    },
    getNewCurrent (obj) {
      this.sortObj = obj
      this.params.sortName = this.sortObj.key
      this.params.sortOrder = this.sortObj.direction
      this.fetchData()
    },
    handlePageChange (page) {
      this.params.pageIndex = page
      this.fetchData()
    },
    submit () {
      if (this.cartList.length === 0) {
        this.$message.warning('当前购物车中没有商品。')
      } else {
        localStorage.tempCartList = JSON.stringify(this.cartList)
        this.$router.push({name: 'media-point-address'})
      }
    },
    toggleCartList () {
      this.showCartList = !this.showCartList
    },
    searchMyAvailable () {
      if (this.myAvailable) {
        this.gtPoint = 0
        this.ltPoint = this.availablePoint
        this.params.s_GT_fdPoints = 0
        this.params.s_LT_fdPoints = this.availablePoint
        this.fetchCartList().then(() => {
          this.fetchData()
        })
      } else {
        this.gtPoint = ''
        this.ltPoint = ''
        this.params.s_GT_fdPoints = ''
        this.params.s_LT_fdPoints = ''
        this.fetchCartList().then(() => {
          this.fetchData()
        })
      }
    }
  },
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [InputNumber.name]: InputNumber,
    CTitle,
    COrderBy,
    CNoData,
    Carousel,
    Slide
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/styles/point-common.less';
.page-media-reward {
  padding-bottom: 95px;
}
.point-tips {
  margin-top: 35px;
  .color-primary {
    font-weight: bold;
  }
}
.filter {
  padding: 0 13px;
  margin-top: 40px;
  background-color: #f2f9fe;
  font-size: 14px;
  .filter-row {
    padding: 13px 0;
  }
  .filter-name {
    display: inline-block;
    height: 25px;
    line-height: 25px;
  }
  .filter-value-box {
    width: 930px;
  }
  .filter-value-list {
    li {
      float: left;
      height: 25px;
      line-height: 25px;
      margin: 0 15px;
      &.active {
        color: @color-primary;
      }
    }
  }
  .filter-confirm-btn {
    display: inline-block;
    width: 60px;
    margin-left: 15px;
    text-align: center;
    height: 25px;
    line-height: 25px;
    border: 1px solid @color-primary;
    color: @color-primary;
    background-color: #ffffff;
    cursor: default;
    vertical-align: middle;
  }
}
.title {
  padding-bottom: 10px;
  margin-top: 40px;
  font-size: 14px;
  color: @color-primary;
  border-bottom: 1px solid #8c8c8c;
}
.point-info {
  margin: 30px 0;
  font-size: 14px;
}
.presents-table {
  width: 100%;
  font-size: 14px;
  // color: @color-font-light2;
  thead {
    border-bottom: 1px solid #f0f3f5;
    th {
      text-align: center;
      padding: 20px 0;
      &.goods-info-th {
        text-align: left;
        text-indent: 75px;
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid #f0f3f5;
      td {
        padding: 20px 0;
        text-align: center;
        vertical-align: middle;
        &.goods-info-td {
          text-align: left;
          width: 410px;
        }
      }
      &:hover {
        background-color: @color-bg2;
      }
    }
  }
}
.goods-info {
  .check-box {
    margin-left: 15px;
  }
  .goods-img-box {
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    margin: 0 25px 0 10px;
    vertical-align: middle;
    border: 1px solid #f0f3f5;
    background-color: #ffffff;
    .goods-img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      max-width: 100px;
      max-height: 100px;
    }
  }
  .goods-info-in {
    display: inline-block;
    vertical-align: middle;
    .goods-name {
      max-width: 16em;
    }
    .goods-description {
      margin: 20px 0 20px 0;
      max-width: 16em;
    }
    .goods-price {
      color: @color-font-light2;
    }
  }
}
.original-point {
  text-decoration: line-through;
  color: @color-font-light2;
}
.bottom-fixed,
.bottom-static {
  width: @width-content-right;
  height: 95px;
  line-height: 95px;
  padding: 0 40px 0 45px;
  font-size: 14px;
  background-color: @color-bg2;
  .bottom-fixed-right {
    float: right;
    width: 490px;
    text-align: right;
    .total-presents, .total-points, .submit-btn {
      margin-left: 40px;
    }
    .total-presents {
      cursor: pointer;
      .icon-doubleup {
        vertical-align: middle;
        font-size: 18px;
        transition: all 0.4s;
        display: inline-block;
      }
      .icon-doubleup-active {
        transform: rotate(180deg);
      }
    }
    .submit-btn {
      border-radius: 0;
      font-size: 14px;
    }
  }
}
.bottom-fixed {
  position: fixed;
  bottom: 0;
  z-index: 5;
}
.bottom-static {
  float: right;
}
.choosen-list-box {
  position: absolute;
  width: 100%;
  height: 150px;
  top: -150px;
  left: 0;
  border: 1px solid @color-primary;
  background-color: #ffffff;
  z-index: 0;
  .choosen-list {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    .item {
      position: relative;
      width: 102px;
      height: 102px;
      border: 1px solid @color-border;
      margin: 0 10px;
      img {
        max-width: 102px;
      }
      .cancel-btn {
        position: absolute;
        right: 0px;
        top: 0px;
        width: 50px;
        height: 20px;
        padding: 0;
        text-align: center;
        color: #ffffff;
        font-size: 11px;
        background-color: rgba(0, 0, 0, 0.6);
      }
      .num {
        position: absolute;
        line-height: 1;
        right: 0;
        bottom: 0;
        color:  #ffffff;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
  }
  .triangle {
    position: absolute;
    right: 55px;
    bottom: -10px;
    width: 20px;
    height: 20px;
    border: 1px solid @color-primary;
    background-color: #ffffff;
    transform: rotate(45deg);
    z-index: -1;
  }
}
.swiper-box {
  overflow: hidden;
}
.swiper-wrapper {
  white-space:nowrap;
  padding: 24px 10px;
  height: 148px;
  background-color: #ffffff;
  .swiper-slide {
    display: inline-block;
    position: relative;
    height: 102px;
    border: 1px solid @color-border;
    text-align: center;
    .img {
      max-width: 100px;
    }
    .cancel-btn {
      display: none;
      position: absolute;
      right: 0px;
      top: 0px;
      width: 50px;
      height: 20px;
      padding: 0;
      text-align: center;
      color: #ffffff;
      font-size: 11px;
      background-color: rgba(0, 0, 0, 0.6);
    }
    &:hover .cancel-btn {
      display: inline-block;
    }
    .num {
      position: absolute;
      line-height: 1;
      right: 0;
      bottom: 0;
      color:  #ffffff;
      background-color: rgba(0, 0, 0, 0.6);
    }
  }
}
.empty-cart {
  width: 100%;
  height: 148px;
  line-height: 148px;
  background-color: #ffffff;
  text-align: center;
  font-size: 24px;
  color: @color-font-light2;
}
</style>
<style lang="less">
@import '../../../assets/styles/variables.less';
.page-media-reward {
  .filter {
    .el-input-number {
      margin: 0 5px;
      display: inline-block;
      width: 80px !important;
      vertical-align: middle;;
      .el-input__inner {
        height: 25px;
        line-height: 25px;
        border-radius: 0;
        padding: 0 3px 0 3px !important;
        border: 1px solid #8c8c8c;
      }
      .el-input-number__increase,
      .el-input-number__decrease {
        display: none;
      }
    }
  }
  table {
    .el-input-number {
      width: 140px;
      .el-input-number__decrease {
        left: 0;
        border-left: none;
        border-right: 1px solid #dcdcdc;
      }
      .el-input {
        .el-input__inner {
          padding: 3px 40px;
        }
      }
    }
  }
}
</style>
<style lang="less">
.page-media-reward {
  .VueCarousel-pagination,
  .VueCarousel-navigation {
    display: none;
  }
  .VueCarousel:hover .VueCarousel-navigation {
    display: block;
  }
  .VueCarousel-navigation-prev,
  .VueCarousel-navigation-next {
    width: 48px;
    height: 148px;
    font-size: 0;
  }
  .VueCarousel-navigation-prev {
    background: url('../../../assets/img/left-arrow.png') no-repeat center center;
  }
  .VueCarousel-navigation-next {
    background: url('../../../assets/img/right-arrow.png') no-repeat center center;
  }
}

</style>
