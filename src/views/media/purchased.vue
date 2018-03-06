<template>
  <div class="purchased">
    <c-title title="下单成功"></c-title>
    <div class="purchased-info">
      <div class="media">
        <i class="iconfont icon-success color-success pull-left"></i>
        <div class="media-body">
          <h1 class="color-success">提交成功</h1>
          <p>
            您的专属客服将第一时间与您联系<br>
            您也可以直接联系专属客服
          </p>
        </div>
      </div>

      <div class="info clearfix">
        <ul class="pull-left">
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
        <div class="qrcode pull-right">
          <img :src="clientInfo.fdImageJson ? clientInfo.fdImageJson.url : ''" alt="二维码">
          <p>扫一扫 即可与客服沟通</p>
        </div>
      </div>

      <div class="p">
        <span>订单金额：</span>
        {{priceTotal}}元
      </div>
      <div class="p">
        <span>提交时间：</span>
        {{createdDate}}
      </div>

      <router-link class="next-step inline-block" :to="{ name: 'media-order-list' }">查看订单</router-link>
      <router-link class="next-step inline-block" :to="{ name: 'media-wechat-list' }">继续选号</router-link>

    </div>
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
import { mapState, mapActions } from 'vuex'

export default {
  mounted () {
    if (_.isEmpty(this.clientInfo)) {
      this.fetchClientInfo()
    }
  },
  title () {
    return '提交成功'
  },
  data () {
    return {
      createdDate: this.$route.query.createdDate,
      priceTotal: this.$route.query.priceTotal
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
  },
  components: {
    CTitle
  }
}

</script>
<style lang="less" scoped>
@import "../../assets/styles/variables.less";
.purchased {
  font-size: 14px;
}
.purchased-info {
  margin: 0 auto;
  padding: 90px 0px;
  width: 470px;
  .media {
    .iconfont {
      margin-right: 15px;
      font-size: 66px;
    }
    h1 {
      padding-top: 10px;
      font-size: 20px;
      font-weight: bold;
    }
  }
  .info {
    padding: 30px 45px;
    margin-top: 25px;
    border: 1px solid #ebebeb;
    border-radius: 4px;
    ul {
      li {
        margin-bottom: 5px;
      }
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
    .qrcode {
      text-align: center;
      img {
        width: 85px;
        height: 85px;
      }
    }
  }
  .p {
    margin: 20px 0;
    span {
      color: @color-font-light;
    }
  }
  .next-step {
    margin-right: 30px;
    padding: 10px 40px;
    border: 1px solid @color-border;
    border-radius: 4px;
    &:hover {
      color: @color-primary;
      border: 1px solid @color-primary;
    }
  }
}

</style>
