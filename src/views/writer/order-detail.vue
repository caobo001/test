<template>
  <div class="page page-order-detail">
    <!-- 当前位置 开始 -->
    <c-breadcrumb :routers="[
      {
        name: 'home',
        text: '买家中心'
      }, {
        name: 'order-list',
        text: '文案标单'
      }, {
        name: 'order-detail',
        text: '标单详情'
      }
    ]">
    </c-breadcrumb>
    <!-- 当前位置 结束 -->
    <div class="container">
      <div class="message text-center" v-if="order.fdStatus === stat.liubiao">
        <h2 class="font18">订单已结束</h2>
        <p class="color-primary">截标时间已过，没有卖家参与竞标</p>
        <p>赏金根据广而易规则退回本账户，请 <a href="javascript:;">查收</a></p>
      </div>

      <div class="message text-center" v-if="order.fdStatus === stat.liudan">
        <h2 class="font18">订单已结束</h2>
        <p class="color-primary">选标时间已过，买家未选标</p>
        <p>赏金根据广而易规则分给参与竞标的卖家</p>
      </div>

      <c-steps
        v-if="stepsVisible"
        :text="['买家选标', '卖家执行', '交易完成']"
        :cur="stepIndex"
      ></c-steps>

      <c-order-info :order="order" @cancelOrder="refresh"></c-order-info>

      <c-od-items-suc class="mt20" v-if="odItemsSucVisible"></c-od-items-suc>

      <c-od-items-join
        class="mt20"
        v-if="odItemsJoinVisible"
        @chooseCompleted="refresh"
        :readOnly="(order.fdStatus != stat.bidding) && (order.fdStatus != stat.bidSelecting)"
        :orderArticleCount="order.fdArticleCount"
      ></c-od-items-join>

      <c-od-items-spec class="mt20" v-if="odItemsSpecVisible"></c-od-items-spec>

    </div>
  </div>
</template>

<script>
import COrderInfo from 'components/writer/COrderInfo'
import COdItemsSuc from 'components/writer/COdItemsSuc'
import COdItemsJoin from 'components/writer/COdItemsJoin'
import COdItemsSpec from 'components/writer/COdItemsSpec'
import { orderStatus } from 'assets/scripts/status-config.js'

export default {
  created () {
    this.fetchData()
  },
  data () {
    return {
      order: {},
      stat: orderStatus
    }
  },
  methods: {
    fetchData () {
      this.$http.get(`/writerOrder/wrorder/${this.$route.params.orderId}`).then(resp => {
        this.order = resp.data
      })
    },
    checkStatus (status, targetStatus) {
      if (status) {
        return _.indexOf(targetStatus, status) >= 0
      } else {
        return false
      }
    },
    refresh () {
      this.fetchData()
    }
  },
  computed: {
    stepIndex () {
      switch (this.order.fdStatus) {
        case this.stat.bidSelecting:
          return 1
        case this.stat.processing:
          return 2
        case this.stat.finish:
          return 3
        default:
          return 1
      }
    },
    odItemsSucVisible () {
      return this.checkStatus(this.order.fdStatus, [
        this.stat.processing,
        this.stat.finish
      ])
    },
    odItemsJoinVisible () {
      return this.checkStatus(this.order.fdStatus, [
        this.stat.bidding,
        this.stat.bidSelecting,
        this.stat.processing,
        this.stat.finish,
        this.stat.liudan,
        this.stat.miss
      ])
    },
    odItemsSpecVisible () {
      return this.checkStatus(this.order.fdStatus, [
        this.stat.bidding,
        this.stat.bidSelecting,
        this.stat.liudan
      ])
    },
    stepsVisible () {
      return this.checkStatus(this.order.fdStatus, [
        this.stat.bidding,
        this.stat.bidSelecting,
        this.stat.processing,
        this.stat.finish
      ])
    }
  },
  components: {
    COrderInfo,
    COdItemsSuc,
    COdItemsJoin,
    COdItemsSpec
  }

}

</script>

<style lang="less" scoped>
@import "../../assets/styles/variables.less";
.page-order-detail {
  padding-top: 0;
}
.message {
  padding: 60px 0 30px 0;
  p {
    margin: 15px 0;
  }
  a {
    color: @color-link;
  }
}

</style>
