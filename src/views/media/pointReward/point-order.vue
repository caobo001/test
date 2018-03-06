<template>
  <div class="page-media-reward">

    <c-title title="积分兑换"></c-title>

    <div class="container clearfix" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <c-menu class="pull-left mt10"></c-menu>

      <div class="container-right pull-right">
        <ul class="tab-list clearfix">
          <li>
             <router-link :to="{ name: 'media-reward-list' }" >积分兑换</router-link>
          </li>
          <li>
             <router-link :to="{ name: 'media-point-record' }" >积分明细</router-link>
          </li>
          <li class="active">
             <router-link :to="{ name: 'media-point-order' }" >兑换订单</router-link>
          </li>
        </ul>

        <div class="point-in-tab-list">
          <span
            v-for="item in typeList"
            :key="item"
            :class="{'active': item === curType}"
            @click="setCurType(item)">
            {{item}}
          </span>
        </div>

        <table class="point-order-table" v-if="dataList.length">
          <thead>
            <tr>
              <th>订单编号</th>
              <th>兑换商品</th>
              <th>数量</th>
              <th>小计</th>
              <th>收货地址</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in dataList" :key="item.id">
              <td class="no-td">{{item.fdNo}}</td>
              <td class="goods-td">
                <div class="goods-info">
                  <div class="goods-img-box">
                    <img :src="item.fdImage || '/webapp/static/portrait-default.jpg'" class="goods-img">
                  </div>
                  <div class="goods-info-in">
                    <div class="goods-name ellipsis" :title="item.fdPmGoodsName" :alt="item.fdPmGoodsName">{{item.fdPmGoodsName}}</div>
                    <div class="goods-description ellipsis" :title="item.fdDesp" :alt="item.fdDesp" >{{item.fdDesp || '暂无商品描述'}}</div>
                    <div class="goods-point">
                      <span class="font16 color-primary">{{item.fdPmGoodsPoints | numToThousandsRound}} </span>积分
                    </div>
                    <div class="goods-price">市场参考价：{{item.fdPrice}}元</div>
                  </div>
                </div>
              </td>
              <td class="num-td">{{item.fdExchangeNum}}</td>
              <td class="total-points-td"><span class="color-primary">{{item.fdPoints | numToThousandsRound}}</span></td>
              <td class="address-td">
                <div class="address-info">
                  <div class="address">地址：{{item.fdAddress}}</div>
                  <div class="receiver">收货人：{{item.fdReceiver}}</div>
                  <div class="express-info" v-if="item.fdStatus === 9">
                    <span class="express-name">{{item.fdLogistics}}</span>
                    <span class="express-no">运单编号：{{item.fdLogisticsNum}}</span>
                  </div>
                </div>
              </td>
              <td>
                <span v-if="item.fdStatus === 9">已发货</span>
                <span class="color-primary" v-if="item.fdStatus === 0">待发货</span>
                <span v-if="item.fdStatus === 10">已取消</span>
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
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
import CNoData from 'components/CNoData'
export default {
  data () {
    return {
      loading: false,
      curType: '全部',
      typeList: ['全部', '待发货', '已发货'],
      params: {
        pageIndex: 1,
        s_IN_fdStatus: '',
        sortName: 'createdDate',
        sortOrder: 'desc'
      },
      pageSize: 15,
      itemTotal: 0,
      dataList: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$http.get('/pm/order/list', {params: this.params}).then(resp => {
        this.dataList = resp.data.data
        this.itemTotal = resp.data.total
        console.log(resp)
        this.loading = false
      })
    },
    handlePageChange (page) {
      this.params.pageIndex = page
      this.fetchData()
    },
    setCurType (item) {
      this.curType = item
      switch (item) {
        case '全部':
          this.params.s_IN_fdStatus = ''
          break
        case '待发货':
          this.params.s_IN_fdStatus = 0
          break
        case '已发货':
          this.params.s_IN_fdStatus = 9
      }
      this.params.pageIndex = 1
      this.fetchData()
    }
  },
  components: {
    CTitle,
    CNoData
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/styles/point-common.less';
.point-order-table {
  width: 100%;
  margin-top: 60px;
  font-size: 14px;
  thead {
    border-bottom: 1px solid @color-border;
    th {
      padding: 20px 0;
      text-align: center;
    }
  }
  tbody {
    tr {
      td {
        padding: 25px 0;
        vertical-align: middle;
        text-align: center;
        &.address-td {
          width: 325px;
        }
        &.no-td {
          width: 95px;
        }
        &.goods-td {
          width: 380px;
          padding: 25px 20px;
          text-align: left;
        }
        &.num-td, &.total-points-td {
          width: 90px;
        }
      }
    }
  }
}
.goods-info {
  .goods-img-box {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
    vertical-align: middle;
    border: 1px solid @color-border;
    img {
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
    margin-left: 10px;
    vertical-align: middle;
    text-align: left;
    .goods-description, .goods-point {
      margin: 6px 0;
    }
    .goods-description, .goods-name {
      max-width: 16em;
    }
    .goods-point, .goods-price {
      color: @color-font-light2;
    }
  }
}

.address-info {
  width: 280px;
  margin: auto;
  text-align: left;
  .address, .receiver, .express-name {
    color: @color-font-light2;
  }
  .receiver {
    margin: 5px 0;
  }
  .express-no {
    float: right;
  }
}
</style>
