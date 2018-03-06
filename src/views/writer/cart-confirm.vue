<template>
  <div class="page page-cart">
    <!-- 当前位置 开始 -->
    <c-breadcrumb
      :routers="[
        {
          name: 'home',
          text: '买家中心'
        },{
          name: 'cart-pick',
          text: '选择写手'
        },{
          name: 'cart-confirm',
          text: '订单确认'
        }
      ]"
      backgroundColor="#eeeeee"
    >
    </c-breadcrumb>
    <!-- 当前位置 结束 -->
    <div class="container">
      <c-steps :text="['添加需求', '选择写手', '确认购买', '购买成功']" :cur="3"></c-steps>

      <h2>写手 <span class="font12 normal"> 共有 {{checkedListWa.length}} 个</span></h2>
      <div class="content clearfix">

        <table class="googs-list">
          <thead>
            <tr>
              <td>序号</td>
              <td>写手信息</td>
              <td>价格</td>
              <td>评分</td>
              <td>写作类型</td>
              <td>行业类型</td>
              <td>中标次数</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in checkedListWa" :key="item.id">
              <td>{{index+1}}</td>
              <td class="brief">
                <router-link :to=" { name: 'goods-detail', params: {id:item.id} } " class="media">
                  <div class="media-left">
                    <img :src="item.fdImage.thumbnailUrl" class="media-object">
                  </div>
                  <div class="media-body">
                    <h4 class="media-heading ellipsis">{{item.fdName}}</h4>
                    <p class="ellipsis-two">{{item.fdAbstract}}</p>
                  </div>
                </router-link>
              </td>
              <td>￥{{item.fdPriceDown}} - ￥{{item.fdPriceUp}}</td>
              <td>{{item.fdStar}} 分</td>
              <td>{{item.fdWriterTypeValue}}</td>
              <td class="trades">
                <ul>
                  <li v-for="trade in item.fdTrades" class="inline-block ml10">{{trade}}</li>
                </ul>
              </td>
              <td>{{item.fdWinBitCount}}</td>
            </tr>

          </tbody>
        </table>
      </div>

    </div>

    <div class="action-bar">
      <div class="container text-right font14">
        <span class="vertical-middle">共 {{checkedListWa.length}} 个写手</span>
        <span class="vertical-middle mr30 ml10">
          赏金
          <em class="color-primary font18"> {{price}} </em>
          元
        </span>
        <el-button @click="dialogVisible = true" type="danger" size="large">立即付款</el-button>
      </div>
    </div>
    <c-payment v-model="dialogVisible" :action="submit"></c-payment>
  </div>
</template>
<script>
import CPayment from 'components/writer/CPayment'

export default {
  created () {
    if (!this.$store.state.writer.privateOrder.id) {
      this.$router.replace({name: 'publish'})
    }
  },
  data () {
    return {
      price: this.$store.state.writer.privateOrder.price,
      dialogVisible: false
    }
  },
  methods: {
    submit (passwd) {
      let params = {
        fdPayPassword: passwd,
        fdPrice: this.price,
        fdWriterIds: _.map(this.checkedListWa, (item) => {
          return item.id
        })
      }
      return this.$http.post(
        `/writerOrder/wrorder/${this.$store.state.writer.privateOrder.id}/payment/private`,
        params
      ).then((resp) => {
        this.$store.dispatch('clearPrivateOrder')
        return this.$store.dispatch('savePaidOrder', resp.data)
      }).then(() => {
        this.$router.push({name: 'purchased'})
      })
    }
  },
  computed: {
    checkedListWa () {
      return this.$store.getters.getCheckedWa
    }
  },

  components: {
    CPayment
  }
}

</script>
<style lang="less" scoped>
@import "../../assets/styles/variables.less";
@import '../../assets/styles/cart.less';
.page-cart {
  padding-bottom: 100px;
}
.googs-list {
  tbody td:first-child {
    padding: 0 10px;
  }
}

</style>
