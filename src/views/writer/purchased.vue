<template>
  <div class="purchased">
    <!-- 当前位置 开始 -->
    <c-breadcrumb :routers="[
      {
        name: 'home',
        text: '买家中心'
      },{
        name: 'order-list',
        text: '文案标单'
      },{
        name: 'purchased',
        text: '购买成功'
      }
    ]">
    </c-breadcrumb>
    <!-- 当前位置 结束 -->
    <c-steps :text="['添加需求', '选择写手', '确认购买', '购买成功']" :cur="4"></c-steps>
    <div class="purchased-info-block clearfix">
      <div class="wrapper">
        <i class="iconfont icon-chenggong2 color-success pull-left success-icon"></i>
        <div class="main-content inline-block pull-right">
          <h1 class="color-success">需求发布成功</h1>
          <div class="p">请耐心等待卖家投标，{{paidOrder.fromDeadline}}天后截止选标</div>
          <hr/>
          <div class="p">
            付款金额：<span class="color-red">{{ paidOrder.fdPrice }}</span>元
          </div>
          <div class="p">
            账户余额：<span class="color-red">{{ paidOrder.fdPrice }}</span>元
          </div>
          <div class="p">
            交易日期：{{ paidOrder.date }}
          </div>
          <hr/>
          <router-link class="next-step inline-block" :to="{ name: 'order-detail', params: {orderId: paidOrder.fdWriterOrderId} }">查看订单</router-link>
          <router-link class="next-step inline-block" :to="{ name: 'goods' }">继续购买</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created () {
    this.paidOrder = this.$store.state.writer.paidOrder
    if (_.isEmpty(this.paidOrder)) {
      this.$router.replace({name: 'home'})
    }
  },
  data () {
    return {
      paidOrder: {}
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../assets/styles/variables.less";
//购买成功信息
.purchased-info-block {
  background-color: @color-white;
  padding: 90px 0px;
}
.purchased-info-block .wrapper {
  width: 385px;
  margin: auto;
}
.purchased .main-content {
  width: 300px;
  font-size: 14px;
}
.success-icon {
  font-size: 45px;
  margin-top: 13px;
}
h1 {
  font-size: 36px;
}
hr {
  border: 1px solid lighten(@color-border, 5%);
  margin: 20px auto;
}
.p {
  margin: 8px auto;
}
.color-red {
  color: #c40000;
}
.next-step {
  border: 1px solid darken(@color-border, 5%);
  padding: 12px 30px;
  margin: 10px 24px auto 5px;
}
</style>
<style lang="less">
</style>
