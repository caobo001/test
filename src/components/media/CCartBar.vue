<template>
  <div class="cart-bar" :class="{'unfold': unfoldCart}">
    <div class="cart-tool pull-left">
      <ul class="text-center">
        <li>
          <a href="javascript:" @click="unfoldCart = !unfoldCart">
            <i class="iconfont icon-gouwuche"></i>
            购物车
            <em>{{animatedNumber}}</em>
          </a>
        </li>
        <li class="qq">
          <!-- 登录后 放 客服的 qq -->
          <a v-if="isLogin" target="_blank" :href="`http://wpa.qq.com/msgrd?v=3&uin=${clientInfo.fdQq}&site=qq&menu=yes`">
            <i class="icon iconfont icon-qq"></i>
          </a>
          <!-- 登录前 放 尧明的 qq -->
          <a v-if="!isLogin" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3002706540&site=qq&menu=yes">
            <i class="icon iconfont icon-qq"></i>
          </a>
        </li>
        <li class="tel" v-if="isLogin">
          <a href="javascript:">
            <i class="iconfont icon-dianhua"></i>
          </a>
          <div class="tel-show">
            <img src="../../assets/img/arrow-right.png" class="arrow-right" />
            <div class="tel-show-in">
              <div class="title font14">专属客服</div>
              <div class="content font16">{{clientInfo.fdNickName}}</div>
              <div class="title font14">客服热线</div>
              <div class="content font16">{{clientInfo.fdMobile}}</div>
              <div class="title font14">客服二维码</div>
              <div class="content text-center">
                <img :src="clientInfo.fdImageJson? clientInfo.fdImageJson.url: ''" class="qrcode-img"/>
              </div>
            </div>
          </div>
        </li>
        <li>
          <router-link :to="{ name: 'media-collect-list' }">
            <i class="iconfont icon-shoucang1"></i>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'charge' }">
            <i class="iconfont icon-chongzhi"></i>
          </router-link>
        </li>
        <li>
          <a href="javascript:" @click.prevent="goToTop">
            <i class="iconfont icon-top"></i>
          </a>
        </li>
      </ul>
    </div>
    <div class="cart-content pull-right">
      <div class="info clearfix">
        <div class="pull-left">
          全部（共 <span>{{cartList.length}}</span>  个）
          <a href="javascript:" v-if="cartList.length !== 0" @click="clearCart">清空</a>
        </div>
        <router-link class="pull-right" :to="{ name: 'media-cart' }">查看全部</router-link>
      </div>

      <div class="wrap">

        <div class="section" v-show="!!cartGroups.wechat.length">
          <h2>微信</h2>
          <ul>
            <li class="media" v-for="item in cartGroups.wechat" :key="item.id">
              <div class="media-left">
                <img :src="item.fdImageJson.thumbnailUrl? item.fdImageJson.thumbnailUrl: '/webapp/static/portrait-default.jpg'" class="media-object img-circle">
              </div>
              <div class="media-body media-middle">
                <h4 class="media-heading ellipsis">
                  {{item.fdName}}
                  <img
                    src="../../assets/img/icon-wechat-identified.png"
                    class="vertical-top"
                    v-show="item.fdIsOfficial"/>
                </h4>
                <p class="ellipsis">{{item.fdCode}}</p>
                <a href="javascript:" @click="rmItemInMediaCart(item)"><i class="iconfont icon-quxiao"></i></a>
              </div>
            </li>
          </ul>
        </div>

        <div class="section" v-show="!!cartGroups.weibo.length">
          <h2>微博</h2>
          <ul>
            <li class="media" v-for="item in cartGroups.weibo" :key="item.id">
              <div class="media-left">
                <img :src="item.fdImageJson.thumbnailUrl? item.fdImageJson.thumbnailUrl: '/webapp/static/portrait-default.jpg'" class="media-object img-circle">
              </div>
              <div class="media-body media-middle">
                <h4 class="media-heading ellipsis">{{item.fdName}}</h4>
                <p class="ellipsis">{{item.remarks}}</p>
                <a href="javascript:" @click="rmItemInMediaCart(item)"><i class="iconfont icon-quxiao"></i></a>
              </div>
            </li>
          </ul>
        </div>

        <div class="section" v-show="!!cartGroups.headline.length">
          <h2>头条</h2>
          <ul>
            <li class="media" v-for="item in cartGroups.headline" :key="item.id">
              <div class="media-left">
                <img :src="item.fdImageJson.thumbnailUrl? item.fdImageJson.thumbnailUrl: '/webapp/static/portrait-default.jpg'" class="media-object img-circle">
              </div>
              <div class="media-body media-middle">
                <h4 class="media-heading ellipsis">{{item.fdName}}</h4>
                <p class="ellipsis">{{item.remarks}}</p>
                <a href="javascript:" @click="rmItemInMediaCart(item)"><i class="iconfont icon-quxiao"></i></a>
              </div>
            </li>
          </ul>
        </div>

        <p class="text-center" v-if="cartList.length == 0">购物车空空如也</p>

      </div>

      <div class="action">
        <ul class="tabs">
          <li>
            <div>{{cartGroups.wechat.length}}</div>
            <i class="iconfont icon-weixin1" style="color: #9dcb3d;"></i>
          </li>
          <li>
            <div>{{cartGroups.weibo.length}}</div>
            <i class="iconfont icon-weibo" style="color: #f8433d;"></i>
          </li>
          <li>
            <div>{{cartGroups.headline.length}}</div>
            <i class="iconfont icon-headline" style="color: #f8433d;"></i>
          </li>
        </ul>
        <p class="text-center">共 <em>{{cartList.length}}</em> 个商品</p>
        <div class="action-btn-box text-center">
          <el-button
            :disabled="cartList.length === 0 || exportLoading"
            @click="cartExport"
            type="primary"
            id="cart-export-btn">
            导出
          </el-button>
          <el-button
            id="cart-submit-btn"
            type="danger"
            @click="action"
            :disabled="cartList.length === 0">
            {{actionBtn.text}}
          </el-button>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TWEEN from 'tween.js'

export default {
  name: 'CCartBar',
  mounted () {
    if (!this.isLogin) {
      this.$store.dispatch('fetchAccount')
    }
    this.$store.dispatch('fetchMediaCart')
    if (_.isEmpty(this.clientInfo)) {
      this.fetchClientInfo()
    }
    this.curRoute = this.$route.path
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
      curRoute: '',
      unfoldCart: true,
      animatedNumber: this.$store.state.media.cartList.length,
      idList: [],
      exportLoading: false
    }
  },
  methods: {
    ...mapActions(['rmItemInMediaCart', 'batchRmItemInMediaCart', 'fetchClientInfo']),
    goToTop: function () {
      // behavior: 'smooth'使回到顶部速度变慢,平滑回到顶部
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    },
    clearCart () {
      this.$msgbox.confirm('是否确定清空购物车所有商品？', '提示', {
        cancelButtonText: '取消',
        confirmButtonText: '确定',
        type: 'warning'
      }).then(() => {
        const ids = _.map(this.cartList, (item) => {
          return item.id
        })
        this.batchRmItemInMediaCart(ids)
      })
    },
    action () {
      this.$router.push({name: this.actionBtn.routerName})
    },
    cartExport () {
      this.exportLoading = true
      let idList = []
      this.cartList.forEach(item => {
        idList.push(item.id)
      })
      this.idList = idList

      return this.$http.post('/goods/ids/export', this.idList).then(resp => {
        window.location.href = resp.data.content
      }).finally(() => {
        this.exportLoading = false
      })
    }
  },
  computed: {
    ...mapState({
      clientInfo (state) {
        return state.media.clientInfo
      },
      cartList (state) {
        return state.media.cartList
      }
    }),
    account () {
      return this.$store.state.account
    },
    isLogin () {
      return !_.isEmpty(this.$store.state.account.loginType)
    },
    cartGroups () {
      return this.$store.getters.mediaCartGroups
    }
  },
  watch: {
    'cartList.length' (newValue, oldValue) {
      var vm = this
      function animate (time) {
        window.requestAnimationFrame(animate)
        TWEEN.update(time)
      }
      new TWEEN.Tween({ tweeningNumber: 0 })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ tweeningNumber: newValue }, 500)
        .onUpdate(function () {
          vm.animatedNumber = this.tweeningNumber.toFixed(0)
        })
        .start()
      animate()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/cart-bar.less';
</style>
