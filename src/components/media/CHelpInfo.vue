<template>
  <div>
    <div class="fixed" v-show="isSpreaded">
      <img class="kf" src="../../assets/img/kf.gif" alt="客服">
      <i class="iconfont icon-quxiao close" @click="isSpreaded = false"></i>
      <p class="text-center">如您有任何问题<br>可直接联系您的专属客服</p>
      <div class="info">
        <ul>
          <li>
            <span>客服：</span>
            <em>{{clientInfo.fdNickName}}</em>
          </li>
          <li>
            <span>电话：</span>
            <em>{{clientInfo.fdMobile}}</em>
          </li>
          <li>
            <span>QQ：</span>
            <em>{{clientInfo.fdQq}}</em>
          </li>
          <li v-if="clientInfo.fdWechat">
            <span>微信：</span>
            <em>{{clientInfo.fdWechat}}</em>
          </li>
        </ul>
        <div class="qrcode">
          <img :src="clientInfo.fdImageJson ? clientInfo.fdImageJson.url : ''" alt="二维码">
          <p>扫一扫 即可与客服沟通</p>
        </div>
      </div>
    </div>
    <img
      src="../../assets/img/kf-closed.gif"
      class="closed"
      v-show="!isSpreaded"
      @click="isSpreaded = true"
      alt="客服">
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'CHelpInfo',
  mounted () {
    if (_.isEmpty(this.clientInfo)) {
      this.fetchClientInfo()
    }
  },
  data () {
    return {
      isSpreaded: true
    }
  },
  methods: {
    ...mapActions(['fetchClientInfo'])
  },
  computed: {
    ...mapState({
      clientInfo (state) {
        return state.media.clientInfo
      }
    })

  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
.closed {
  position: fixed;
  right: 0;
  top: 300px;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.fixed {
  position: fixed;
  top: 265px;
  right: 10px;
  padding: 30px 20px;
  width: 210px;
  border: 1px solid #ebebeb;
  font-size: 14px;
  background-color: #fff;
  z-index: 99;
}

i.close {
  position: absolute;
  right: 0px;
  top: -45px;
  font-size: 28px;
  color: #9a9a9a;
  cursor: pointer;
}

.kf {
  position: absolute;
  top: -41px;
  left: 50%;
  margin-left: -38px;
  width: 76px;
  height: 62px;
}
.info {
  padding-top: 15px;
  margin-top: 15px;
  border-top: 1px solid #ebebeb;
  ul {
    padding-bottom: 15px;
    span {
      display: inline-block;
      margin-right: 10px;
      width: 50px;
      text-align: right;
      color: @color-font-light;
    }
    em {
      color: @color-primary;
    }
  }
}
.qrcode {
  text-align: center;
  img {
    width: 85px;
    height: 85px;
  }
}
</style>
