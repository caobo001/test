<template>
  <div class="topbar" id="topbar">
    <div class="container">
      <a href="/" class="cn-white">
        <i class="icon iconfont icon-home"></i>
        返回首页
      </a>
      <span class="cn-white ml30">欢迎来到广而易</span>
      <template v-if="isLogin">
        <span class="cn-primary ml30">{{account.fdUsename}}</span>
        <span class="cn-white cursor-default ml30" @click="logout">退出</span>
      </template>

      <template v-if="!isLogin">
        <a href="/userLogin" class="cn-white ml30">请登录</a>
        <a href="/register" class="cn-white ml30">免费注册</a>
      </template>

      <div class="right-item mini-program">
        <i class="icon iconfont icon-tel"></i>
        <span class="item-name">小程序版</span>
        <div class="qrcode-box">
          <img src="../assets/img/qr-code-copy.jpg">
        </div>
      </div>
      <div class="right-item cart-item">
        <i class="icon iconfont icon-shopcart"></i>
        <router-link :to="{name: 'media-cart'}">
          <span class="item-name">购物车 {{cartGroups.wechat.length + cartGroups.weibo.length + cartGroups.headline.length}} 件</span>
        </router-link>
        <div class="cart-box">
          <span class="triangle"></span>

          <div class="cart-con">
            <div class="noempty-cart" v-if="cartGroups.wechat.length || cartGroups.weibo.length || cartGroups.headline.length">
              <div class="cart-title">最近加入的商品</div>

              <ul class="cart-tab clearfix">
                <li
                  v-for="(item, index) in tabList"
                  :class="{'active': item === activeTabName}"
                  :key="item"
                  @click="cartTabChange(item)">
                  {{item}}
                </li>
              </ul>
              <ul class="cart-list">
                <li v-for="(item, index) in curList" v-if="index < 3" :key="item.id" class="clearfix" >

                    <i class="icon iconfont icon-cha del-icon" @click="rmItemInMediaCart(item)"></i>
                    <div class="base-info clearfix">
                      <img :src="item.fdImageJson && item.fdImageJson.url" class="pull-left avatar">
                      <div class="avatar-right">
                        <div class="goods-name">
                          <router-link
                            :to="{
                              name: linkName,
                              params: {id: item.id}
                            }">
                            {{item.fdName}}
                          </router-link>
                        </div>
                        <div class="goods-sub-name" v-if="activeTabName === '微信'">{{item.fdCode}}</div>
                        <div class="goods-sub-name ellipsis" v-if="!(activeTabName === '微信')">{{item.remarks}}</div>
                      </div>
                    </div>
                    <div class="price-info mt10">
                      <div v-for="(priceItem, idx) in item.specifications" :key="priceItem.fdGoodsSpecificationId" class="price-item">
                        <span class="color-font-light2 price-name">{{priceItem.fdName}}</span>
                        <span>￥{{priceItem.fdPrice}}</span>
                      </div>
                    </div>
                </li>
              </ul>

              <div class="empty-cart" v-if="!curList.length">
                <img src="../assets/img/top-empty-shopcart.png" class="vertical-middle">
                <span class="color-font-light2 font14">暂无"{{activeTabName}}"商品，赶紧选购吧！</span>
              </div>
            </div>
          </div>

          <div class="cart-operate" v-if="cartGroups.wechat.length || cartGroups.weibo.length || cartGroups.headline.length">
            <span class="font14 color-font">共{{cartGroups.wechat.length + cartGroups.weibo.length + cartGroups.headline.length}}件商品</span>
            <router-link :to="{name: 'media-cart'}" class="go-cart-btn pull-right">去购物车</router-link>
          </div>

          <div class="empty-cart" v-if="!cartGroups.wechat.length && !cartGroups.weibo.length && !cartGroups.headline.length">
            <img src="../assets/img/top-empty-shopcart.png" class="vertical-middle">
            <span class="color-font-light2 font14">购物车是空的，赶紧选购吧！</span>
          </div>

        </div>
      </div>
      <div class="right-item">
        <i class="icon iconfont icon-order"></i>
        <router-link :to="{name: 'media-order-list'}" class="item-name">我的订单</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'CTopBar',
  data () {
    return {
      activeTabName: '微信',
      tabList: ['微信', '微博', '头条'],
      curList: [],
      linkName: 'media-billboard-detail'
    }
  },
  mounted () {
    if (!this.isLogin) {
      this.$store.dispatch('fetchAccount').then(() => {
        if (this.isLogin) {
          this.$store.dispatch('fetchMediaCart').then((resp) => {
            this.curList = this.cartGroups.wechat
          })
        }
      })
    }
  },
  watch: {
    'cartGroups' () {
      this.setActiveTabName()
    }
  },
  computed: {
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
  methods: {
    ...mapActions(['rmItemInMediaCart']),
    cartTabChange (item) {
      this.activeTabName = item
      this.setActiveTabName()
    },
    setActiveTabName () {
      switch (this.activeTabName) {
        case '微信':
          this.curList = this.cartGroups.wechat
          this.linkName = 'media-billboard-detail'
          break
        case '微博':
          this.curList = this.cartGroups.weibo
          this.linkName = 'media-billboard-weibo-detail'
          break
        case '头条':
          this.curList = this.cartGroups.headline
          this.linkName = 'media-billboard-headline-detail'
      }
    },
    logout () {
      this.$http.get('/loginOut', {}).then((resp) => {
        if (resp.data.code === 1) {
          this.$store.dispatch('clearAccount').then(resp => {
            location.assign('/webapp/media/wechat-list')
          })
        } else {
          this.$message.error(resp.data.content)
        }
      }).catch((err) => {
        this.$message.error(err.response.data.content)
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../assets/styles/variables.less';
.topbar {
  height: 35px;
  background-color: #333333;
}
.container {
  width: @width-page;
  padding: 0 60px;
}
.cn-white, .cn-primary {
  display: inline-block;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}
.cn-white {
  color: #ffffff;
}
.cn-primary {
  color: @color-primary;
}
.icon-home {
  font-size: 18px;
  color: @color-primary;
  vertical-align: middle;
}
.ml30 {
  margin-left: 30px;
}
.right-item {
  float: right;
  height: 35px;
  margin-left: 60px;
  line-height: 35px;
  .icon-tel, .icon-shopcart, .icon-order {
    margin-right: 5px;
    color: @color-primary;
    vertical-align: middle;
  }
  .icon-tel, .icon-shopcart {
    font-size: 16px;
  }
  .icon-order {
    font-size: 14px;
  }
  .item-name {
    color: #ffffff;
    font-size: 14px;
  }
}
.mini-program {
  position: relative;
  cursor: pointer;
  .qrcode-box {
    display: none;
    position: absolute;
    width: 150px;
    background-color: #ffffff;
    z-index: 5;
    left: -20px;
    margin: auto;
    img {
      width: 100%;
    }
  }
  &:hover .qrcode-box {
    display: block;
  }
}
.cart-item {
  position: relative;
  .cart-box {
    display: none;
    position: absolute;
    width: 300px;
    top: 35px;
    left: -100px;
    margin: auto;
    padding: 15px;
    border: 1px solid #e3e6e8;
    box-shadow: 0px 0px 5px #e3e6e8;
    background-color: #ffffff;
    color: @color-font-light2;
    z-index: 5;
    font-size: 14px;
    .triangle {
      position: absolute;
      width: 0;
      height: 0;
      top: -8px;
      left: 135px;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 10px solid #ffffff;
    }
  }
  &:hover .cart-box {
    display: block;
  }
}
.empty-cart {
  padding: 0 3px;
  img {
    margin-right: 18px;
  }
}
.noempty-cart {
  .cart-title {
    color: @color-font;
  }
  .empty-cart {
    padding: 10px 3px;
  }
}
.cart-operate {
  padding-top: 10px;
  .go-cart-btn {
    display: inline-block;
    width: 84px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: @color-primary;
    color: #ffffff;
  }
}
.cart-list {
  li {
    position: relative;
    padding: 10px 0;
    border-bottom: 1px solid #eff4f5;
    font-size: 14px;
    color: @color-font;
    line-height: 1;
    .del-icon {
      position: absolute;
      right: 0;
      top: 2px;
      font-size: 18px;
      padding: 3px;
      cursor: pointer;
    }
    .base-info {
      .avatar {
        width: 52px;
      }
      .avatar-right {
        width: 165px;
        float: left;
        margin-left: 10px;
      }
      .goods-name {
        margin: 10px 0 8px 0;
      }
      .goods-sub-name {
        color: @color-font-light2;
      }
    }
    .price-info {
      .price-item {
        width: 50%;
        float: left;
        height: 24px;
        line-height: 24px;
        .price-name {
          display: inline-block;
          width: 60px;
        }
      }
    }
  }
}
.cart-tab {
  width: 100%;
  li {
    float: left;
    width: 65px;
    cursor: default;
    &.active {
      color: @color-primary;
    }
  }
}
</style>
