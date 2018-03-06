<template>
<div class="order-info" v-loading="!order.id">
  <table>
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
        <th v-if="cancelBtnVisible">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{{order.fdNo}}</td>
        <td>
          <p class="ellipsis">{{order.fdName}}</p>
        </td>
        <td>{{order.fdPrice}}</td>
        <td>{{order.fdArticleCount}}</td>
        <td>{{order.fdWriterTypeValue}}</td>
        <td>
          <ul>
            <li v-for="item in order.fdTrades">{{item}}</li>
          </ul>
        </td>
        <td>{{order.fdBidEndTime}}</td>
        <td>{{order.fdArticleEndTime}}</td>
        <td>{{order.fdStatusValue}}</td>
        <td v-if="cancelBtnVisible">
          <a href="javascript:" @click="dialogVisible = true">取消</a>
        </td>
      </tr>
    </tbody>
  </table>
  <ul class="info">
    <li class="clearfix">
      <span class="pull-left">创建时间</span>
      <div class="pull-left">{{order.createdDate}}</div>
    </li>
    <li class="clearfix">
      <span class="pull-left">招标类型</span>
      <div class="pull-left">{{order.fdType === 1 ? '公开招标' : '指定招标'}}</div>
    </li>
    <li class="clearfix">
      <span class="pull-left">字数要求</span>
      <div class="pull-left">{{order.fdWordCount}}</div>
    </li>
    <li class="clearfix">
      <span class="pull-left">详细要求</span>
      <div class="pull-left">{{order.fdDesc}}</div>
    </li>
    <li class="clearfix">
      <span class="pull-left">附件下载</span>
      <ul class="pull-left">
        <li v-for="item in order.fdAtt">
          <a :href="item.url" target="_blank">{{item.name}}</a>
        </li>
      </ul>
    </li>
  </ul>
  <el-dialog v-model="dialogVisible" class="dialog" title="取消订单" size="tiny">
    <div class="text-center">
      <h4 class="font18">
        <i class="iconfont icon-warn font18"></i>
        确认要取消当前订单吗？
      </h4>
      <p class="mt10">取消订单次数过多会影响后期订单</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="cancelOrder"
        :disabled="loading"
        :loading="loading"
      >确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>

<script>
import { orderStatus } from 'assets/scripts/status-config.js'

export default {
  name: 'COrderInfo',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      stat: orderStatus,
      dialogVisible: false,
      loading: false
    }
  },
  computed: {
    cancelBtnVisible () {
      return !!this.order.fdStatus && this.order.fdStatus <= this.stat.bidSelecting
    }
  },
  methods: {
    cancelOrder () {
      this.loading = true
      this.$http.post(
        `/writerOrder/wrorder/${this.$route.params.orderId}/cancel`
      ).then(resp => {
        if (resp.data.code === 1) {
          this.$emit('cancelOrder')
          this.dialogVisible = false
          this.$message.success('成功取消当前订单')
        }
      }).finally(() => {
        this.loading = false
      })
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../assets/styles/variables.less";

.order-info {
  margin-top: 10px;
  padding: 30px 20px;
  font-size: 13px;
  background: white;
  table {
    width: 100%;
    border: 1px solid @color-border;
    p {
      width: 200px;
    }
  }

  th, td {
    padding: 30px 10px;
    text-align: center;
  }

  th {
    padding: 10px;
    border-bottom: 1px solid @color-border;
  }

}
.info {
  padding: 30px 60px;
  border: 1px solid @color-border;
  border-top: 0;
  li.clearfix {
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  span.pull-left {
    width: 80px;
    padding-right: 20px;
    text-align: right;
    color: @color-font-light;
  }
  a {
    color: @color-link;
  }
}

.dialog {
  .iconfont {
    vertical-align: middle;
    font-size: 22px;
    color: #ffb400;
  }
}

</style>
