<template>
  <div class="page page-home">
    <div class="container">
      <c-menu class="pull-left"></c-menu>
      <div class="pull-right content-right">
        <div class="home-content">
          <!-- 三列 开始 -->
          <el-row class="account-block" :gutter="10">
            <el-col :span="8">
              <div class="grid-content">
                <div class="media text-center">
                  <a class="media-left inline-block" href="javascript:;">
                    <img :src="result.avatar" class="img-circle">
                    <p class="username ellipsis text-center">{{result.username}}</p>
                  </a>
                  <div class="media-body inline-block">
                    <p class="text-left">账户安全</p>
                    <el-progress :show-text="false" :stroke-width="12" :percentage="80" status="success"></el-progress>
                    <el-button type="primary">我要充值</el-button>
                    <a href="javascript:;">我要提现</a>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content second">
                <div class="wrapper">
                  <div class="item amount"><i class="icon iconfont icon-qian"></i>
                    账户余额
                    <p class="num font18">{{result.amount}}</p>
                  </div>
                  <hr>
                  <div class="item freeze"><i class="icon iconfont icon-qian"></i>
                    冻结资金
                    <p class="num font18">{{result.freezingAmount}}</p>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content third text-center">
                <div class="binding bank">
                  <i class="icon iconfont icon-bankcard vertical-middle"></i>
                  622222222222222222222
                </div>
               <!-- 支付宝
               <div class="binding alipay">
                <i class="icon iconfont icon-zhifubao vertical-middle"></i>
                525555555555555
               </div> -->
              </div>
            </el-col>
          </el-row>
          <!-- 三列 结束 -->
          <!-- todolist 开始 -->
          <div class="todo-list mt10" id="todo-list">
            <div class="wrapper">
              <div class="title-line">
                <span class="title font16 bold">
                  待办事项
                </span>
              </div>
              <ul class="to-list-in mt10">
                <li v-for="item in result.todos">
                  <span class="title font16 inline-block">{{item.name | enToCn }}</span>
                  <div class="item inline-block text-left"
                    v-for="status in item.status"
                    :class="{
                      'to-be-paid': status.name == 'waitingPayment',
                      'to-be-choosen': status.name == 'waitingBidSelection',
                      'to-be-confirmed': status.name == 'waitingConfirm',
                      'to-be-performed': status.name == 'processing',
                      'to-be-add': status.name == 'waitingAddDoc',
                      'to-be-commented': status.name == 'waitingComment'
                    }">
                    <router-link
                      :to="{
                        name: 'order-list',
                        params: {
                          status: status.fdStatus
                        }
                      }"
                      v-if="item.name=='waOrder'"
                    >
                    <i class="vertical-middle icon iconfont"
                      :class="{
                        'icon-hongjiuchengicondaifukuan': status.name == 'waitingPayment',
                        'icon-dengdai': status.name == 'waitingBidSelection',
                        'icon-dengdaiqueren': status.name == 'waitingConfirm',
                        'icon-zhihangzhong': status.name == 'processing',
                        'icon-iconfontwendang': status.name == 'waitingAddDoc',
                        'icon-pinglun': status.name == 'waitingComment'
                      }"></i>
                      <span class="key">{{ status.name | enToCn }}</span>
                      <span class="value font18">{{status.num}}</span>
                    </router-link>
                    <div v-else>
                      <i class="vertical-middle icon iconfont"
                        :class="{
                          'icon-hongjiuchengicondaifukuan': status.name == 'waitingPayment',
                          'icon-dengdai': status.name == 'waitingBidSelection',
                          'icon-dengdaiqueren': status.name == 'waitingConfirm',
                          'icon-zhihangzhong': status.name == 'processing',
                          'icon-iconfontwendang': status.name == 'waitingAddDoc',
                          'icon-pinglun': status.name == 'waitingComment'
                        }"></i>
                        <span class="key">{{ status.name | enToCn }}</span>
                        <span class="value font18">{{status.num}}</span>
                    </div>
                  </div>
                </li>
              <ul>
            </div>
          </div>
          <!-- todolist 结束 -->
          <!-- 最近订单 开始 -->
          <div class="latest-order-block mt10" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
            <div class="wrapper">
              <div class="title-line">
                <span class="title font16 bold">
                  最近订单
                </span>
                <span class="order-type pull-right cursor-default">文案标单</span>
                <span class="order-type pull-right cursor-default">预约类订单</span>
                <span class="order-type pull-right cursor-default">派单类订单</span>
              </div>
              <div class="order-list">
                <table class="thead-table text-center">
                  <tr>
                    <td class="no">订单编号</td>
                    <td class="name">名称</td>
                    <td class="price">价格</td>
                    <td class="status">状态</td>
                    <td class="operation">操作</td>
                  </tr>
                </table>
                <!-- 微信派单类订单 开始 -->
                <table class="order-table text-center mt10">
                  <thead>
                    <tr>
                      <th colspan="5">
                        <img src="">
                        <div class="item inline-block">
                          <span class="key">订单编号</span>
                          <span class="value">dd001155216</span>
                        </div>
                        <div class="item inline-block">
                          <span class="key">
                            <i class="wechat-icon icon iconfont icon-weixin1"></i>
                            活动名称:
                          </span>
                          <a href="javascript:;" class="value color-primary">周末出游</a>
                        </div>
                        <div class="item inline-block">
                          <span class="key">执行时间</span>
                          <span class="value">2015-12-12 09:20</span>
                          <el-tooltip class="item" effect="light" content="Bottom Center 提示文字" placement="bottom">
                            <button class="other-time">其他可接受执行时间</button>
                          </el-tooltip>
                        </div>
                        <div class="item inline-block">
                          <span class="key">订单金额:</span>
                          <span class="value">￥9500</span>
                        </div>
                        <a href="javascript:;" class="pay-btn pull-right">去付款</a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="no">dd001155216-v1</td>
                      <td class="name">
                        <div class="media">
                          <a href="javascript:;" class="media-left">
                            <img src="../assets/img/example/portrait.jpg"/>
                            <!-- <span class="opacity inline-block"></span>
                            <span class="cn inline-block text-center">预约类</span> -->
                          </a>
                          <div class="media-body text-left">
                            <div>
                              <i class="wechat-icon icon iconfont icon-weixin1"></i>
                              <span class="pro-name ellipsis inline-block vertical-middle">美丽女编辑</span>
                              <img src="../assets/img/detail.png" class="detail-img vertical-middle">
                            <div>
                            <div>
                              <el-popover ref="qrcode1" placement="right" trigger="hover">
                                <img src="../assets/img/example/qrcode.jpg" class="qrcode-img">
                              </el-popover>
                              <i class="icon iconfont icon-erweima" v-popover:qrcode1></i>
                              <span class="wechat-name ellipsis inline-block vertical-middle">hufumaster</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="price">
                        <p>
                          <span class="key">硬广多图1条:</span>
                          <span class="value">￥10000</span>
                        <p>
                      </td>
                      <td class="status">待付款</td>
                      <td class="operation">
                        <!--
                        <button class="operation-btn">投诉</button>
                        <button class="operation-btn">查看投诉详情</button>
                         -->
                      </td>
                    </tr>
                    <tr>
                      <td class="no">dd001155216-v1</td>
                      <td class="name">
                        <div class="media clearfix">
                          <a href="javascript:;" class="media-left">
                            <img src="../assets/img/example/portrait.jpg"/>
                          </a>
                          <div class="media-body text-left">
                            <div>
                              <i class="wechat-icon icon iconfont icon-weixin1"></i>
                              <span class="pro-name ellipsis inline-block vertical-middle">美丽女编辑</span>
                              <img src="../assets/img/detail.png" class="detail-img vertical-middle">
                            <div>
                            <div>
                              <el-popover ref="qrcode2" placement="right" trigger="hover">
                                <img src="../assets/img/example/qrcode.jpg" class="qrcode-img">
                              </el-popover>
                              <i class="icon iconfont icon-erweima" v-popover:qrcode2></i>
                              <span class="wechat-name ellipsis inline-block vertical-middle">hufumaster</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="price">
                        <p>
                          <span class="key">硬广多图1条:</span>
                          <span class="value">￥10000</span>
                        <p>
                      </td>
                      <td class="status">待付款</td>
                      <td class="operation">
                        <!--
                        <button class="operation-btn">投诉</button>
                        <button class="operation-btn">查看投诉详情</button>
                         -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 微信派单类订单 结束 -->
                <!-- 微博派单类订单 开始 -->
                <table class="order-table text-center mt10">
                  <thead>
                    <tr>
                      <th colspan="5">
                        <img src="">
                        <div class="item inline-block">
                          <span class="key">订单编号</span>
                          <span class="value">dd001155216</span>
                        </div>
                        <div class="item inline-block">
                          <span class="key">
                            <i class="weibo-icon icon iconfont icon-weibo"></i>活动名称:
                          </span>
                          <a href="javascript:;" class="value color-primary">周末出游</a>
                        </div>
                        <div class="item inline-block">
                          <span class="key">执行时间</span>
                          <span class="value">2015-12-12 09:20</span>
                        </div>
                        <div class="item inline-block">
                          <span class="key">订单金额:</span>
                          <span class="value">￥9500</span>
                        </div>
                        <a href="javascript:;" class="pay-btn pull-right">去付款</a>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="no">dd001155216-v1</td>
                      <td class="name">
                        <div class="media">
                          <a href="javascript:;" class="media-left">
                            <img src="../assets/img/example/portrait.jpg"/>
                            <!--
                            <span class="opacity inline-block"></span>
                            <span class="cn inline-block text-center">预约类</span>
                             -->
                          </a>
                          <div class="media-body text-left">
                            <div>
                              <i class="weibo-icon icon iconfont icon-weibo"></i>
                              <span class="pro-name ellipsis inline-block vertical-middle">美丽女编辑</span>
                              <img src="../assets/img/detail.png" class="detail-img vertical-middle">
                            <div>
                          </div>
                        </div>
                      </td>
                      <td class="price">
                        <p><span class="key">硬广直发:</span><span class="value">￥10000</span><p>
                      </td>
                      <td class="status">待付款</td>
                      <td class="operation">
                        <!--
                        <button class="operation-btn">投诉</button>
                        <button class="operation-btn">查看投诉详情</button>
                         -->
                      </td>
                    </tr>
                    <tr>
                      <td class="no">dd001155216-v1</td>
                      <td class="name">
                        <div class="media">
                          <a href="javascript:;" class="media-left">
                            <img src="../assets/img/example/portrait.jpg"/>
                          </a>
                          <div class="media-body text-left">
                            <div>
                              <i class="weibo-icon icon iconfont icon-weibo"></i>
                              <span class="pro-name ellipsis inline-block vertical-middle">美丽女编辑</span>
                              <img src="../assets/img/detail.png" class="detail-img vertical-middle">
                            <div>
                          </div>
                        </div>
                      </td>
                      <td class="price">
                        <p><span class="key">硬广直发:</span><span class="value">￥10000</span><p>
                      </td>
                      <td class="status">待付款</td>
                      <td class="operation">
                        <!--
                        <button class="operation-btn">投诉</button>
                        <button class="operation-btn">查看投诉详情</button>
                         -->
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 微博派单类订单 结束 -->
                <!-- 文案标单 开始 -->
                <table class="order-table text-center mt10">
                  <tr>
                    <td class="no">dd001155216-v1</td>
                    <td class="name">
                      <el-tooltip class="appointed-tip" effect="light" content="指" placement="right-start">
                        <span class="bid-name ellipsis inline-block">想起你的时候</span>
                      </el-tooltip>
                    </td>
                    <td class="price">￥6000</td>
                    <td class="status">竞标中</td>
                    <td class="operation">查看详情
                      <p class="text-center deadline">
                        <i class="icon iconfont icon-dengdai vertical-middle"></i>
                        截标 01:03:01
                      </p>
                    </td>
                  </tr>
                </table>
                <!-- 文案标单 结束 -->
              </div>
            </div>
          </div>
          <!-- 最近订单 结束 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Progress, Tooltip, Popover } from 'element-ui'
export default {
  created () {
    this.fetchData()
  },
  data () {
    return {
      result: {},
      loading: false
    }
  },
  methods: {
    fetchData (params) {
      this.loading = true
      this.$http.get('/ucenter', {params}).then((response) => {
        this.result = response.data
        _.forEach(response.data.todos, (item, index) => {
          _.forEach(item.status, (inItem, inIndex) => {
            if (inItem.name === 'waitingPayment') {
              this.result.todos[index].status[inIndex].fdStatus = 1
              this.result.todos[index].status[inIndex].fdStatusValue = 'waitingPayment'
            } else if (inItem.name === 'waitingBidSelection') {
              this.result.todos[index].status[inIndex].fdStatus = 3
              this.result.todos[index].status[inIndex].fdStatusValue = 'bidSelecting'
            } else if (inItem.name === 'waitingConfirm') {
              this.result.todos[index].status[inIndex].fdStatus = 5
              this.result.todos[index].status[inIndex].fdStatusValue = 'waitingConfirm'
            } else if (inItem.name === 'waitingComment') {
              this.result.todos[index].status[inIndex].fdStatus = 9
              this.result.todos[index].status[inIndex].fdStatusValue = 'finish'
            }
          })
        })
      }).finally(() => {
        this.loading = false
      })
    }
  },
  filters: {
    enToCn: function (name) {
      var orderType = {
        'pdOrder': '派单类订单',
        'yyOrder': '预约类订单',
        'waOrder': '文案标单'
      }
      var status = {
        'waitingPayment': '待付款',
        'waitingBidSelection': '选标中',
        'waitingAddDoc': '待添加文案',
        'processing': '执行中',
        'waitingConfirm': '待确认',
        'waitingComment': '待评论'
      }
      if (name === 'pdOrder' || name === 'yyOrder' || name === 'waOrder') {
        return orderType[name]
      } else if (
        name === 'waitingPayment' ||
        name === 'waitingBidSelection' ||
        name === 'processing' ||
        name === 'waitingConfirm' ||
        name === 'waitingComment' ||
        name === 'waitingAddDoc') {
        return status[name]
      }
    }
  },
  components: {
    [Progress.name]: Progress,
    [Tooltip.name]: Tooltip,
    [Popover.name]: Popover
  }
}

</script>
<style lang="less" scoped>
@import '../assets/styles/home.less';
</style>
