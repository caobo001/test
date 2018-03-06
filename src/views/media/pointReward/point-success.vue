<template>
  <div class="page-media-reward">
    <c-title title="订单提交成功"></c-title>
    <div class="success-con">
      <i class="icon iconfont icon-chenggong2 success-icon" v-if="countdown === 6"></i>
      <span class="countdown" v-if="countdown !== 6">{{countdown}}</span>
      <div class="font24 one">订单已提交成功！</div>
      <div class="font24 two">我们会尽快安排发货</div>
      <div class="font14 three">*您的订单已生成</div>
      <router-link class="font14 four" :to="{ name: 'media-point-order' }" >*您可以在"我的积分"中的"兑换订单"查看订单进度</router-link>
    </div>
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
export default {
  data () {
    return {
      countdown: 6,
      interval: {}
    }
  },
  mounted () {
    setTimeout(this.countdownFn, 3000)
  },
  methods: {
    countdownFn () {
      this.interval = setInterval(() => {
        this.countdown--
        if (this.countdown === 0) {
          clearInterval(this.interval)
          this.$router.push({ name: 'media-point-order' })
        }
      }, 1000)
    }
  },
  components: {
    CTitle
  }
}
</script>
<style lang="less" scoped>

.success-con {
  padding: 180px 75px;
  text-align: center;
}
.success-icon {
  font-size: 100px;
  color: #49cf8b;
}
.font24 {
  font-size: 24px;
}
.two {
  margin: 30px 0 50px 0;
}
.four {
  margin-top: 20px;
  color: #526efe;
}
.countdown {
  font-size: 100px;
  color: #49cf8b;
}
</style>
