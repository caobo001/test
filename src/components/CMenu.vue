<template>
  <div class="left-menu">
    <div class="logo-box">
      <img src="../assets/img/menu-logo.png">
    </div>
    <ul>
      <li>
        <router-link
          class="router-link"
          :to="{ name: 'media-order-list' }">
          <i class="icon iconfont icon-order"></i>
          <span class="triangle"></span>
          我的订单
        </router-link>
      </li>
      <li>
        <router-link
          class="router-link"
          :to="{ name: 'charge' }">
          <i class="icon iconfont icon-chong"></i>
          <span class="triangle"></span>
          我要充值
        </router-link>
      </li>
      <li>
        <router-link
          class="router-link"
          :to="{ name: 'media-bill-list' }">
          <i class="icon iconfont icon-bill"></i>
          <span class="triangle"></span>
          账单记录
        </router-link>
      </li>
      <li>
        <router-link
          class="router-link"
          :to="{ name: 'media-invoice-list' }">
          <i class="icon iconfont icon-invoice"></i>
          <span class="triangle"></span>
          发票管理
        </router-link>
      </li>
      <li>
        <router-link
          class="router-link"
          :to="{ name: 'media-reward-list' }">
          <i class="icon iconfont icon-present"></i>
          <span class="triangle"></span>
          积分兑换
        </router-link>
      </li>
      <li>
        <router-link
          class="router-link"
          :to="{ name: 'media-collect-list' }">
          <i class="icon iconfont icon-collect"></i>
          <span class="triangle"></span>
          我的收藏
        </router-link>
      </li>
      <li>
        <router-link
          class="router-link"
          :to="{ name: 'media-safe-center' }">
          <i class="icon iconfont icon-safe"></i>
          <span class="triangle"></span>
          安全中心
        </router-link>
      </li>
      <li>
        <router-link
          class="router-link"
          :to="{ name: 'media-empty' }">
          <i class="icon iconfont icon-msg"></i>
          <span class="triangle"></span>
          消息中心
        </router-link>
      </li>
      <li>
        <router-link
          class="router-link"
          :to="{ name: 'media-empty' }">
          <i class="icon iconfont icon-help"></i>
          <span class="triangle"></span>
          帮助中心
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
@import '../assets/styles/variables.less';
.left-menu {
  width: 150px;
  background-color: @color-white;
  padding: 0 0 18px 0;
  .logo-box {
    margin-bottom: 15px;
    text-align: center;
  }
  li {
    .router-link {
      position: relative;
      display: block;
      padding: 13px 0 13px 30px;
      font-size: 14px;
      &.router-link-active  {
        color: @color-primary;
        .triangle {
          display: inline-block;
        }
      }
      .triangle {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: 0;
        height: 0;
        border-top: 5px solid transparent;
        border-left: 6px solid @color-primary;
        border-bottom: 5px solid transparent;

      }
    }
    .iconfont {
      vertical-align: top;
      font-size: 18px;
      margin-right: 12px;
    }
  }
}
</style>
