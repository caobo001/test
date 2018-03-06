<template>
  <div class="order-list clearfix">

    <!-- 当前位置 开始 -->
    <c-breadcrumb :routers="[
      {
        name: 'home',
        text: '买家中心'
      },{
        name: 'order-list',
        text: '文案标单'
      }
    ]">
    </c-breadcrumb>
    <!-- 当前位置 结束 -->
    <div class="container clearfix">
      <c-menu class="pull-left"></c-menu>
      <div class="content-right pull-right">
        <!-- 搜索区域 开始 -->
        <div class="search-block transition-toggle " :class="{ 'show': toggle }">

          <el-input placeholder="请输入标单名称" v-model="searchKey">
            <el-button slot="append" icon="search" @click="searchKeyword"></el-button>
          </el-input>
          <c-toggle class="more" v-model="toggle"
            :text="['更多搜索条件', '更多搜索条件']">
          </c-toggle>
          <el-row>
            <el-col :span="8">
              <span class="key">订单编号：</span>
              <el-input v-model="orderNo" class="value inline-block" placeholder="请输入订单编号"></el-input>
            </el-col>
            <el-col :span="8">
              <span class="key">标单名称：</span>
              <el-input v-model="orderName" class="value inline-block" placeholder="请输入标单名称"></el-input>
            </el-col>
            <el-col :span="8">
              <span class="key">发布篇数：</span>
              <el-input v-model="articleNumBottom" class="value inline-block width80" placeholder="下限"></el-input>
              ----
              <el-input v-model="articleNumTop" class="value inline-block width80" placeholder="上限"></el-input>
            </el-col>
            <el-col :span="8">
              <span class="key">写作类型：</span>
              <el-select v-model="writeType" class="value">
                <el-option label="不限" value="">不限</el-option>
                <el-option label="微信" value="2">微信</el-option>
                <el-option label="微博" value="1">微博</el-option>
                <el-option label="其他" value="3">其他</el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span class="key">行业类型：</span>
              <el-select v-model="industryType" class="value">
                <el-option value="">不限</el-option>
                <el-option v-for="item in trades" :value="item.text" >{{ item.text }}</el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span class="key">订单状态：</span>
              <el-select v-model="orderStatus" class="value">
                <el-option label="不限" value="">不限</el-option>
                <el-option label="待付款" value="1">待付款</el-option>
                <el-option label="竞标中" value="2">竞标中</el-option>
                <el-option label="选标中" value="3">选标中</el-option>
                <el-option label="执行中" value="4">执行中</el-option>
                <el-option label="待确认" value="5">待确认</el-option>
                <el-option label="已结束" value="9">已结束</el-option>
                <el-option label="已取消" value="10">已取消</el-option>
                <el-option label="已流标" value="11">已流标</el-option>
                <el-option label="已流单" value="12">已流单</el-option>
                <el-option label="未达标" value="13">未达标</el-option>
              </el-select>
            </el-col>
            <el-col :span="8">
              <span class="key">招标类型：</span>
              <el-select v-model="bidType" class="value">
                <el-option label="不限" value="">不限</el-option>
                <el-option label="公募" value="1">公募</el-option>
                <el-option label="私募" value="2">私募</el-option>
              </el-select>
            </el-col>
          </el-row>
          <div class="text-center">
            <el-button type="primary" @click="search()">搜索</el-button>
            <el-button class="el-button-cancel" @click="reset()">重置</el-button>
          </div>
        </div>
        <!-- 搜索区域 结束 -->
        <!-- 标单列表 开始 -->
        <div class="order-list-block mt10 clearfix">
          <ul class="status-list clearfix">
            <li class="pull-left cursor-default text-center" :class="{ 'cur':status==undefined || status=='' }"  @click="changeStatus()">
              <span class="key bold">全部订单</span>
              <span class="value color-primary">{{itemTotal}}</span>
            </li>
            <li class="pull-left cursor-default text-center" :class="{ 'cur':status==stat.waitingPayment }" @click="changeStatus(stat.waitingPayment)">
              <span class="key bold">待付款</span>
              <span class="value color-primary">{{statusList.waitingPayment}}</span>
            </li>
            <li class="pull-left cursor-default text-center" :class="{ 'cur':status==stat.bidding }" @click="changeStatus(stat.bidding)">
              <span class="key bold">竞标中</span>
              <span class="value color-primary">{{statusList.bidding}}</span>
            </li>
            <li class="pull-left cursor-default text-center" :class="{ 'cur':status==stat.bidSelecting }" @click="changeStatus(stat.bidSelecting)">
              <span class="key bold">选标中</span>
              <span class="value color-primary">{{statusList.bidSelecting}}</span>
            </li>
            <li class="pull-left cursor-default text-center" :class="{ 'cur':status==stat.processing }" @click="changeStatus(stat.processing)">
              <span class="key bold">执行中</span>
              <span class="value color-primary">{{statusList.processing}}</span>
            </li>
            <li class="pull-left cursor-default text-center" :class="{ 'cur':status==stat.finish }" @click="changeStatus(stat.finish)">
              <span class="key bold">已结束</span>
              <span class="value color-primary">{{statusList.finish}}</span>
            </li>
            <li class="pull-left cursor-default text-center" :class="{ 'cur':status==stat.cancel }" @click="changeStatus(stat.cancel)">
              <span class="key bold">已取消</span>
              <span class="value color-primary">{{statusList.cancel}}</span>
            </li>
            <li class="pull-left cursor-default" :class="{ 'cur':status==stat.liubiao }" @click="changeStatus(stat.liubiao)">
              <span class="key bold">已流标</span>
              <span class="value color-primary">{{statusList.liubiao}}</span>
            </li>
            <li class="pull-left cursor-default" :class="{ 'cur':status==stat.liudan }" @click="changeStatus(stat.liudan)">
              <span class="key bold">已流单</span>
              <span class="value color-primary">{{statusList.liudan}}</span>
            </li>
            <li class="pull-left cursor-default" :class="{ 'cur':status==stat.unSelected }" @click="changeStatus(stat.unSelected)">
              <span class="key bold">未选标</span>
              <span class="value color-primary">{{statusList.unSelected}}</span>
            </li>
          </ul>
          <table v-loading.body="orderLoading" element-loading-text="拼命加载中" class="order-list-table text-center mt10">
            <thead>
              <tr>
                <th>订单编号</th>
                <th>标单名称</th>
                <th>赏金（元）</th>
                <th>发布篇数</th>
                <th>写作类型</th>
                <th>行业类型</th>
                <th>截标时间</th>
                <th>截稿时间</th>
                <th>订单状态</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in orderList">
                <td>
                  {{ item.fdNo }}
                </td>
                <td>
                    <div class="bid-name-out">
                      <img src="assets/img/appointed.png" class="appointed-img" v-if="item.fdTypeValue=='指定竞标'"/>
                      <span class="bid-name inline-block ellipsis cursor-default">{{ item.fdName }}</span>
                    </div>
                </td>
                <td>{{ item.fdPrice }}</td>
                <td>{{ item.fdArticleCount }}</td>
                <td>{{ item.fdWriterTypeValue }}</td>
                <td>
                  <ul>
                    <li v-for="item in item.fdTrades">{{item}}</li>
                  </ul>
                </td>
                <td>{{ item.fdBidEndTime }}</td>
                <td>{{ item.fdArticleEndTime }}</td>
                <td>{{ item.fdStatusValue }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'order-detail',
                      params: {
                        orderId: item.id
                      }
                    }">
                    <span v-if="item.fdStatus == 3">去选标</span>
                    <div v-else>
                        查看详情
                      <p class="endBit" v-if="item.downcount != 'false'">
                        <i class="iconfont icon-dengdai vertical-middle"></i>
                        截标{{ item.downcount }}
                      </p>
                    </div>
                  </router-link>

                </td>
              </tr>
            </tbody>
          </table>
          <el-pagination
            class="pull-right mt10"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-size="pageSize"
            layout="prev, pager, next, jumper"
            :total="itemTotal"
          >
          </el-pagination>
        </div>
        <!-- 标单列表 结束 -->
      </div>
    </div>

  </div>
</template>
<script>
import { Tooltip } from 'element-ui'
import { orderStatus } from 'assets/scripts/status-config.js'

export default {
  created () {
    this.status = this.$route.params.status
    this.trades = this.$store.state.trades
    this.fectchOrderData()
  },
  destroyed () {
    _.forEach(this.intervalList, (item, index) => {
      clearInterval(item)
    })
  },
  data () {
    return {
      stat: orderStatus,
      trades: [],
      statusList: {
        waitingPayment: 0,
        bidding: 0,
        bidSelecting: 0,
        processing: 0,
        finish: 0,
        cancel: 0,
        liubiao: 0,
        liudan: 0,
        unSelected: 0
      },
      downcountList: [],
      status: undefined,
      intervalList: [],
      pageIndex: 1,
      pageSize: 15,
      itemTotal: 0,
      toggle: false,
      orderLoading: true,
      orderList: {},
      orderStatus: '',
      searchKey: '',
      orderNo: '',
      orderName: '',
      articleNumTop: '',
      articleNumBottom: '',
      writeType: '',
      industryType: '',
      bidType: ''
    }
  },
  methods: {
    fectchOrderData (params) {
      this.orderLoading = true
      this.$http.get('/writerOrder/wrorder/list', {params}).then((resp) => {
        this.itemTotal = resp.data.total
        this.orderList = resp.data.data
        this.statusList = resp.data.wrorderStatus
        _.forEach(this.orderList, (item, key) => {
          item.downcount = this.updateDowncount(item.fdBidEndTime)
          this.intervalList[key] = setInterval(() => {
            item.downcount = this.updateDowncount(item.fdBidEndTime)
          }, 1000)
        })
      }).finally(() => {
        this.orderLoading = false
      })
    },
    changeStatus (params) {
      this.status = params
      params = {
        s_fdStatus: this.status
      }
      this.fectchOrderData(this.condition)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageIndex = val
    },
    updateDowncount (value) {
      var delta = Math.floor((new Date(value) - new Date()) / 1000)
      var newStr = ''
      if (delta >= 0) {
        var day = Math.floor(delta / (24 * 3600))// 天
        var hour = Math.floor((delta - day * 24 * 3600) / 3600)
        var min = Math.floor((delta - day * 24 * 3600 - hour * 3600) / 60)
        var sec = delta - day * 24 * 3600 - hour * 3600 - min * 60
        newStr = `${day}天${hour}时${min}分${sec}秒`
      } else {
        newStr = 'false'
      }
      return newStr
    },
    search () {
      this.status = this.orderStatus
      this.fectchOrderData(this.condition)
    },
    searchKeyword () {
      var params = {
        s_fdName: this.searchKey
      }
      this.fectchOrderData(params)
    },
    reset () {
      this.orderStatus = ''
      this.bidType = ''
      this.writeType = ''
      this.orderName = ''
      this.orderNo = ''
      this.bidType = ''
      this.industryType = ''
      this.articleNumBottom = ''
      this.articleNumTop = ''
    }
  },
  computed: {
    condition () {
      var searchCondition = {
        s_fdStatus: this.status,
        s_fdType: this.bidType,
        s_fdWriterType: this.writeType,
        s_fdName: this.orderName,
        s_fdNo: this.orderNo,
        s_fdTrades: this.industryType,
        s_gt_fdArticleCount: this.articleNumBottom,
        s_lt_fdArticleCount: this.articleNumTop
      }
      return searchCondition
    }
  },
  watch: {
    pageIndex (newValue, oldValue) {
      var params = {
        pageIndex: newValue,
        s_fdStatus: this.status,
        s_fdType: this.bidType,
        s_fdWriterType: this.writeType,
        s_fdName: this.orderName,
        s_fdNo: this.orderNo,
        s_fdTrades: this.industryType
      }
      this.fectchOrderData(params)
    }
  },
  filters: {
    numPlus (value) {
      if (value >= 99) {
        return '99+'
      } else {
        return value
      }
    }
  },
  components: {
    [Tooltip.name]: Tooltip
  }
}

</script>
<style lang="less" scoped>
@import "../../assets/styles/order-list.less";

</style>
<style lang="less">
@import '../../assets/styles/variables.less';
//覆盖 eleme 的样式
.search-block {
  .el-input-group--append {
    border: 1px solid darken(@color-border, 10%);
    width: 434px;
    height: 38px;
    border-radius: 19px;
    overflow: hidden;
    background-color: @color-white;
    .el-input__inner {
      position: relative;
      width: 350px;
      margin:3px 35px;
      border: none;
    }
    .el-input-group__append {
      background: none;
      border: none;
      .el-icon-search {
        color: #58595b;
        font-size: 16px;
      }
    }
  }
}
.search-block .el-input__inner {
  height: 30px !important;
}
.width80 {
  width: 90px !important;
}
</style>
