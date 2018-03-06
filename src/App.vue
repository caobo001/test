<template>
  <div id="app">
    <c-top-bar></c-top-bar>
    <c-header v-show="showHeader"></c-header>
    <router-view class="page" :style="{'min-height': minHeight + 'px'}"></router-view>
    <c-footer v-show="showFooter"></c-footer>
  </div>
</template>

<script>
import CTopBar from 'components/CTopBar'
import CHeader from 'components/CHeader'
import CFooter from 'components/CFooter'
export default {
  name: 'app',
  data () {
    return {
      minHeight: ''
    }
  },
  mounted () {
    console.log(document.documentElement.clientHeight, document.body.clientHeight)
    this.minHeight = parseInt(document.documentElement.clientHeight) - 35 - 124
    console.log(this.minHeight)
    if (this.$store.state.account.nothirdLogin && !this.$store.state.account.fdMobile && this.isLogin) {
      window.location.assign('/webapp/media/forcetocomplete')
    }
  },
  computed: {
    showFooter () {
      return !this.$route.meta.hideFooter
    },
    showHeader () {
      return !this.$route.meta.hideHeader
    },
    isLogin () {
      return !_.isEmpty(this.$store.state.account.loginType)
    }
  },
  components: {
    CTopBar,
    CHeader,
    CFooter
  }
}

</script>

<style lang="less">
@import 'assets/styles/common.less';
@import 'assets/iconfont/iconfont.css';
</style>
