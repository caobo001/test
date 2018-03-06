<template>
  <div class="page page-cart">
    <!-- 当前位置 开始 -->
    <c-breadcrumb
      :routers="[
        {
          name: 'home',
          text: '买家中心'
        },{
          name: 'cart',
          text: '购物车'
        }
      ]"
      backgroundColor="#eeeeee"
    >
    </c-breadcrumb>
    <!-- 当前位置 结束 -->
    <div class="container">
      <c-steps :text="['添加需求', '选择写手', '确认购买', '购买成功']" :cur="2"></c-steps>

      <h2>写手 <span class="font12 normal"> 共有 {{waLength}} 个</span></h2>
      <div class="content">

        <table class="googs-list">
          <thead>
            <tr>
              <td>
                <el-checkbox @change="toggleCheckedAll($event)"></el-checkbox>
              </td>
              <td>写手信息</td>
              <td>价格</td>
              <td>评分</td>
              <td>写作类型</td>
              <td>行业类型</td>
              <td>中标次数</td>
              <td>操作</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in goodsListWa" :key="item.id">
              <td>
                <el-checkbox v-model="goodsListWaShadow[index].checked" @change="setChecked(item)"></el-checkbox>
              </td>
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
              <td class="action">
                <i
                  @click="remove(item)"
                  class="iconfont icon-lajixiang"
                ></i>
              </td>
            </tr>

          </tbody>
        </table>
      </div>
      <div class="empty-cart" v-if="waLength === 0">
        <p class="text-center">
          您的购物车空空如也，现在去
          <router-link :to="{ name: 'goods' }">选商品</router-link>
        </p>
      </div>

    </div>

    <div class="action-bar">
      <div class="container clearfix">
        <div class="pull-left">
          <el-checkbox class="ml10 mr15" @change="toggleCheckedAll($event)">全选</el-checkbox>
          <span>已选择 {{checkedNum}} 个写手</span>
        </div>
        <div class="pull-right">
          <span class="vertical-middle">赏金 </span>
          <el-input-number class="vertical-middle" v-model="price" :min="minPrice" size="small" :controls="false" ></el-input-number>
          <span class="vertical-middle"> 元</span>
          <el-tooltip class="item" effect="dark" content="赏金不低于写手最低报价" placement="top-end">
            <i class="iconfont icon-wenhao vertical-middle mr30 ml10"></i>
          </el-tooltip>

          <el-button @click="continueToAdd" size="large">继续添加写手</el-button>
          <el-button
            @click="submit"
            :disabled="checkedNum === 0"
            type="danger"
            size="large"
          >提交订单</el-button>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { InputNumber, Tooltip } from 'element-ui'
import { mapActions } from 'vuex'

export default {
  created () {
    if (!this.$store.state.writer.privateOrder.id) {
      this.$router.replace({name: 'publish'})
    } else {
      this.$store.dispatch('fetchCart').catch((e) => {
        console.log(e)
        this.$message.error('服务器忙，请稍候再试')
      })
    }
  },
  data () {
    return {
      price: 0,
      goodsListWaShadow: []
    }
  },
  methods: {
    ...mapActions([
      'removeGoodsInCart',
      'setChecked',
      'setCheckedAll',
      'savePrivateOrder'
    ]),
    toggleCheckedAll (event) {
      this.setCheckedAll(event.currentTarget.checked).then((bool) => {
        _.forEach(this.goodsListWaShadow, (item) => {
          item.checked = bool
        })
      })
    },
    remove (item) {
      this.removeGoodsInCart(item).then((resp) => {
        this.$message.success('成功从购物车中移出')
      })
    },
    continueToAdd () {
      this.$router.push({name: 'goods', query: {fromCartPick: true}})
    },
    submit () {
      this.savePrivateOrder({price: this.price})
      this.$router.push({name: 'cart-confirm'})
    }
  },
  computed: {
    goodsListWa () {
      this.goodsListWaShadow = []
      _.forEach(this.$store.state.writer.cart.goodsListWa, (item) => {
        this.goodsListWaShadow.push({
          checked: item.checked
        })
      })
      return this.$store.state.writer.cart.goodsListWa
    },
    waLength () {
      return this.$store.state.writer.cart.goodsListWa.length
    },
    checkedNum () {
      return this.$store.getters.getCheckedWa.length
    },
    minPrice () {
      let sortedList = _.sortBy(this.$store.getters.getCheckedWa, 'fdPriceDown')
      if (sortedList.length === 0) {
        return 0
      } else {
        let min = _.last(sortedList).fdPriceDown
        this.price = this.price > min ? this.price : min
        return min
      }
    }
  },

  components: {
    [InputNumber.name]: InputNumber,
    [Tooltip.name]: Tooltip
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

.action-bar {
  .pull-right {
    .el-input-number {
      width: 70px;
    }
    .iconfont {
      color: @color-primary;
    }
  }
}

</style>
