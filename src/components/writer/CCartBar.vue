<template>
  <div class="cart-bar" :class="{'unfold': unfoldCart}">
    <div class="cart-tool pull-left">
      <ul class="text-center">
        <li>
          <a href="javascript:">
            <i class="iconfont icon-edit-1-copy"></i>
          </a>
        </li>
        <li>
          <a href="javascript:" @click="unfoldCart = !unfoldCart">
            <i class="iconfont icon-gouwuche"></i>
            购物车
            <em>{{cartLength}}</em>
          </a>
        </li>
        <li>
          <router-link :to="{ name: 'goods', params: {model: 'collection'} }">
            <i class="iconfont icon-shoucang1"></i>
          </router-link>
        </li>
        <li>
          <a href="javascript:" @click.prevent="goToTop">
            <i class="iconfont icon-top"></i>
          </a>
        </li>
        <li>
          <a href="javascript:">
            <i class="iconfont icon-chongzhi"></i>
          </a>
        </li>
        <li>
          <a href="javascript:">
            <i class="iconfont icon-dianhua"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="cart-content pull-right">
      <div class="info clearfix">
        <div class="pull-left">
          全部（共 <span>{{cartLength}}</span>  个）
          <em>清空</em>
        </div>
        <router-link class="pull-right" :to="{ name: 'cart' }">查看全部</router-link>
      </div>

      <div class="wrap">

        <div class="section">
          <h2>写手</h2>
          <ul>
            <li class="media" v-for="item in cart.goodsListWa" :key="item.id">
              <div class="media-left">
                <img :src="item.fdImage.thumbnailUrl" class="media-object">
              </div>
              <div class="media-body">
                <h4 class="media-heading">{{item.fdName}}</h4>
                <p>{{item.fdAbstract}}</p>
                <a href="javascript:" @click="removeGoodsInCart(item)">删除</a>
              </div>
            </li>
          </ul>
          <p class="text-center" v-if="cart.goodsListWa.length == 0">购物车空空如也</p>
        </div>

      </div>

      <div class="action">
        <ul class="tabs">
          <li>
            <div>{{cart.goodsListWa.length}}</div>
            <i class="iconfont icon-tb09" style="color: #1598d7;"></i>
          </li>
          <li>
            <div>0</div>
            <i class="iconfont icon-weixin1" style="color: #9dcb3d;"></i>
          </li>
          <li>
            <div>0</div>
            <i class="iconfont icon-weibo" style="color: #f8433d;"></i>
          </li>
        </ul>
        <p>共 <em>{{cartLength}}</em> 个</p>
        <el-button
          type="danger"
          @click="action"
          :disabled="cart.goodsListWa.length === 0">
          {{actionBtn.text}}
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
require('smoothscroll-polyfill').polyfill()

export default {
  name: 'CCartBar',
  created () {
    this.$store.dispatch('fetchCart')
  },

  props: {
    actionBtn: {
      type: Object,
      default: () => {
        return {
          text: '立即投放',
          routerName: 'cart'
        }
      }
    }
  },

  data () {
    return {
      unfoldCart: true
    }
  },
  methods: {
    ...mapActions(['removeGoodsInCart']),
    goToTop: function () {
      // behavior: 'smooth'使回到顶部速度变慢,平滑回到顶部
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    },
    action () {
      this.$router.push({name: this.actionBtn.routerName})
    }
  },
  computed: {
    ...mapState({
      cart (state) { return state.writer.cart },
      cartLength (state) {
        return state.writer.cart.goodsListWa.length
      }
    })
  }

}

</script>

<style lang="less" scoped>
@import '../../assets/styles/cart-bar.less';
</style>
