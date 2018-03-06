<template>
  <div class="header" id="header">
    <div class="container">
      <a href="/" class="logo inline-block pull-left">
        <img src="../assets/img/logo-header.png"/>
      </a>
      <div
        class="inline-block pull-left nav"
        mode="horizontal">
        <router-link :to="{name: 'media-wechat-list'}" class="item-in inline-block">微信</router-link>
        <router-link :to="{name: 'media-weibo-list'}" class="item-in inline-block">微博</router-link>
        <router-link :to="{name: 'media-headline-list'}" class="item-in inline-block">头条</router-link>
        <router-link :to="{name: 'media-billboard'}" class="item-in inline-block">榜单</router-link>
        <router-link :to="{name: 'case-library'}" class="item-in inline-block">精选案例</router-link>
        <router-link :to="{name: 'news'}" class="item-in inline-block">公告中心</router-link>
        <router-link :to="{name: 'about-us'}" class="item-in inline-block">关于我们</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { Menu, MenuItem } from 'element-ui'

export default {
  name: 'CHeader',
  mounted () {
    if (!this.isLogin) {
      this.$store.dispatch('fetchAccount')
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    isLogin () {
      return !_.isEmpty(this.$store.state.account.loginType)
    }
  },
  methods: {
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
  },
  components: {
    [Menu.name]: Menu,
    [MenuItem.name]: MenuItem
  }
}
</script>

<style lang="less" scoped>
@import '../assets/styles/variables.less';
#header {
  width: 100%;
  background-color: @color-white;
  border-bottom: 1px solid @color-border;
  .container {
    height: 75px;
    .logo {
      margin: 0px 45px auto 60px;
      height: 75px;
      overflow: hidden;
      img {
        width: 138px;
      }
    }
  }
}
.nav {
  height: 100%;
  margin-left: 45px;
  .item-in {
    height: 100%;
    line-height: 75px;
    font-size: 16px;
    padding: 0 20px;
    margin: 0 15px;
    &.router-link-active {
      color: @color-primary;
    }
  }
}
.account-item {
  padding: 25px 0;
  .account-in {
    position: relative;
    display: inline-block;
    width: auto;
    padding: 15px 18px;
    span.username.ellipsis {
      display: inline-block;
      max-width: 140px;
      vertical-align: middle;
    }
    .username {
      font-size: 14px;
      color: @color-font;
      margin: 0 10px;
    }
    .arrow {
      transition: all 0.4s;
    }
    &:hover .arrow {
      transform: rotate(180deg);
    }
    .sub-menu {
      position: absolute;
      width: 100%;
      right: 0px;
      top: 53px;
      border: 1px solid @color-border;
      border-radius: 4px;
      background-color: @color-white;
      display: none;
      z-index: 10;
      li {
        padding: 10px 0px;
        text-align: center;
        a {
          font-size: 14px;
        }
        &.logout, &:hover {
          background-color: @color-bg2;
          a {
            color: @color-primary;
          }
        }
      }
    }
    &:hover .sub-menu {
      display: block;
    }
  }
}
</style>
