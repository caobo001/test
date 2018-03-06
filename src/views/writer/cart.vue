<template>
  <div class="page page-cart">
    <div class="container">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane :label="'写手 '+ waLength" name="writer">

          <c-steps :text="['添加需求', '选择写手', '确认购买', '购买成功']" :cur="1"></c-steps>

          <h2>写手 <span class="font12 normal"> 共有 {{waLength}} 个</span></h2>
          <div class="content clearfix">

            <table class="googs-list">
              <thead>
                <tr>
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
                <tr v-for="(item, index) in cart.goodsListWa" :key="item.id">
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
            <el-button class="pull-right mt30" @click="goNext" type="danger" size="large">添加需求</el-button>

          </div>
          <div class="empty-cart" v-if="waLength === 0">
            <p class="text-center">
              您的购物车空空如也，现在去
              <router-link :to="{ name: 'goods' }">选商品</router-link>
            </p>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'派单类 ' + pdLength" name="pd">
          <c-steps :text="['添加文案', '选择商品', '确认购买', '购买成功']" :cur="1"></c-steps>

          <h2>派单类 <span class="font12 normal"> 共有 {{pdLength}} 个</span></h2>

          <div class="empty-cart" v-if="pdLength === 0">
            <p class="text-center">
              您的购物车空空如也，现在去
              <router-link :to="{ name: 'goods' }">选商品</router-link>
            </p>
          </div>

        </el-tab-pane>
        <el-tab-pane :label="'预约类 ' + yyLength" name="yy">
          <c-steps :text="['添加文案', '选择商品', '确认购买', '购买成功']" :cur="1"></c-steps>

          <h2>预约类 <span class="font12 normal"> 共有 {{yyLength}} 个</span></h2>

          <div class="empty-cart" v-if="yyLength === 0">
            <p class="text-center">
              您的购物车空空如也，现在去
              <router-link :to="{ name: 'goods' }">选商品</router-link>
            </p>
          </div>

        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  created () {
    this.$store.dispatch('fetchCart')
  },
  data () {
    return {
    }
  },
  methods: {
    handleClick (tab, event) {
    },
    remove (item) {
      this.$store.dispatch('removeGoodsInCart', item).then((resp) => {
        this.$message.success('成功从购物车中移出')
      })
    },
    goNext () {
      this.$router.push({name: 'publish'})
    }
  },
  computed: {
    ...mapState({
      cart (state) { return state.writer.cart },
      waLength (state) {
        return state.writer.cart.goodsListWa.length
      },
      pdLength (state) {
        return state.writer.cart.goodsListPd.length
      },
      yyLength (state) {
        return state.writer.cart.goodsListYy.length
      }
    })
  }
}

</script>
<style lang="less" scoped>
@import '../../assets/styles/cart.less';

</style>
