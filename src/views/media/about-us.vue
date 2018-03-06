<template>
  <div class="page page-about-us">
    <!-- banner -->
    <div class="banner">
      <img src="../../assets/img/about-us-banner.png" alt="">
    </div>
    <!-- gey-introduction -->
    <div class="gey-introduction">
      <div class="container">
        <div class="title">
          <span></span>
          <h1>广而易简介</h1>
        </div>
        <p>广而易是属于江西广而易科技有限公司旗下的移动互联网广告精准投放服务平台，集广告需求分析、媒体智投系统、舆情效果追踪三大服务为一体，</p>
        <p>为广告主量身定制一站式移动营销解决方案，连接广告主和媒体主，满足双方的投放需求。</p>
        <p>广而易依靠自身强大的技术力量优化线上平台，打破了传统的广告媒体购买方式，实现了一对多的服务方式，</p>
        <p>广告主可以简单快捷地选择媒体并加入购物车，再多的购买批量也只需一键完成。</p>
        <p>平台旗下拥有<span>小程序客户端</span>和后台端口，<span>即使不在电脑前也可轻松预约广告投放</span>，让广告投放变得休闲随心。</p>
        <div class="line"></div>
        <div class="show-btn-top" v-if="show">
          <a href="javascript:;" v-on:click="show=!show"><img src="../../assets/img/show-btn-bottom.png" alt=""></a>
        </div>
      </div>
    </div>
    <!-- service-process -->
    <div class="service-process">
      <div class="service-img"><img src="../../assets/img/service-img.png" alt=""></div>
      <transition name="fade">
        <div class="introduction-more" v-if="!show">
          <!-- culture -->
          <div class="culture">
            <div  class="sub-title">
              <span></span>
              <h2>平台文化</h2>
            </div>
            <p>【愿景】帮助奋斗者实现梦想</p>
            <p>【使命】让广告简单有效</p>
            <p>【核心价值观】追求卓越，服务至上，善于学习，坚持不懈，结果导向</p>
          </div>
          <!-- history -->
          <div class="history">
            <div  class="sub-title">
              <span></span>
              <h2>发展历程</h2>
            </div>
            <p>2009年，广而易总部成立；</p>
            <p>2009年3月，纸媒事业部成立；</p>
            <p>2012年2月，PC网站事业部成立；</p>
            <p>2015年3月，移动互联网事业部成立；</p>
            <p>2015年8月，建立线上自媒体精准投放平台“广而易”；</p>
            <p>2016年11月，建立榜单、文案内容双板块；</p>
            <p>2017年4月，小程序搭建完成。</p>
          </div>
          <!-- show-btn-bottom -->
          <div class="show-btn-bottom">
            <a href="javascript:;" v-on:click="show=!show" v-if="!show"><img src="../../assets/img/show-btn-top.png" alt=""></a>
          </div>
        </div>
      </transition>
    </div>
    <!-- gey-culture -->
    <div class="gey-culture">
      <div class="container">
        <div class="title">
          <span></span>
          <h1>企业文化</h1>
        </div>
        <div class="img-box" id="img-box">

          <img class="img-1" src="../../assets/img/animation-1.png" alt="">
          <img class="img-2" src="../../assets/img/animation-2.png" alt="">
          <img class="img-3" src="../../assets/img/animation-3.png" alt="">
          <img class="img-4" src="../../assets/img/animation-4.png" alt="">
          <img class="img-5" src="../../assets/img/animation-5.png" alt="">
          <img class="img-6" src="../../assets/img/animation-6.png" alt="">
          <img class="img-7" src="../../assets/img/gey.png" alt="">

        </div>
      </div>
    </div>
    <!-- gey-advantage -->
    <div class="gey-advantage"  id="gey-advantage">
      <div class="container">
        <div class="title">
          <span></span>
          <h1>平台优势</h1>
          <p>广而易所有的努力都致力于让广告投放简单有效</p>
        </div>
        <img src="../../assets/img/gey-advantage.png" alt="">
      </div>
    </div>
    <!-- join-us -->
    <div class="join-us">
      <div class="container">
        <div class="title">
          <img src="../../assets/img/join-us-1.png" alt="">
          <span>加入我们</span>
          <img src="../../assets/img/join-us-2.png" alt="">
        </div>
        <div class="job-list">
          <span class="job-1">信息技术人员</span>
          <span class="job-2">媒介专员</span>
          <span class="job-3">WEB前端开发</span>
          <span class="job-4">Java高级研发</span>
          <span class="job-5">人资专员</span>
        </div>
        <router-link :to="{name: 'join-us'}" class="more-job">更多职位</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import $ from '../../assets/scripts/jquery-ajax.js'
export default {
  data () {
    return {
      show: true,
      date: ''
    }
  },
  mounted () {
    $(window).scroll(function () {
      if ($(window).height() + $(document).scrollTop() > $('#img-box').offset().top && $(window).height() + $(document).scrollTop() < $('#gey-advantage').offset().top) {
        $('#img-box').addClass('img-box-in')
      } else if ($(window).height() + $(document).scrollTop() < $('#img-box').offset().top) {
        $('#img-box').removeClass('img-box-in')
      }
    })
  },
  beforeDestroy () {
    $(window).unbind('scroll')
  },
  created () {
    var preDate = new Date()
    this.date = preDate
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/styles/variables.less";
.container {
  width: 1050px;
  height: 100%;
  margin: 0 auto;
}
.banner {
  width: 100%;
  height: 703px;
  position: relative;
  img {
    width: 1266px;
    height: 703px;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
}
.gey-introduction {
  height: 500px;
  background-color: #3a3f48;
  text-align: center;
  .title {
    font-size: 40px;
    color: #ffffff;
    span {
      display: inline-block;
      width: 38px;
      height: 3px;
      background-color: #fff;
    }
  }
  p {
    font-size: 14px;
    height: 48px;
    line-height: 48px;
    color: #e1e2e3;
    span {
      color: #ee3a3d;
    }
  }
  .line {
    width: 100%;
    height: 1px;
    background-color: #e1e2e3;
    margin-top: 50px;
  }
  .show-btn-top {
    height: 37px;
    line-height: 37px;
    margin: 16px 0;
    a {
      display: inline-block;
    }
  }
}
.service-process {
  position: relative;
  width: 100%;
  height: 500px;
  background: url(../../assets/img/service-bg.png) no-repeat;
  background-size:cover;
  text-align: center;
  .service-img {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 1200px;
    height: 365px;
    z-index: 1;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .introduction-more {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #3a3f48;
    z-index: 2;
    .sub-title {
      font-size: 20px;
      color: #ffffff;
      margin: 8px 0;
       span {
         display: inline-block;
         width: 20px;
         height: 2px;
         background-color: #fff;
       }
    }
    p {
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      color: #e1e2e3;
    }
    .show-btn-bottom {
      height: 37px;
      line-height: 37px;
      margin: 16px 0;
      a {
        display: inline-block;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
.gey-culture {
  width: 100%;
  height: 1162px;
  text-align: center;
  overflow: hidden;
  .title {
    font-size: 40px;
    color: #000;
    span {
      display: inline-block;
      width: 38px;
      height: 3px;
      background-color: #000;
    }
  }
  .img-box{
    position: relative;
    width: 951px;
    height: 850px;
    margin: 40px auto 0;
    img {
      transition: 1.6s linear;
    }
    .img-1{
      position: absolute;
      left: 0;
      top: 0;
    }
    .img-2{
      position: absolute;
      top: 1px;
      right: 0;
    }
    .img-3{
      position: absolute;
      bottom: 1px;
      right: 0;
    }
    .img-4{
      position: absolute;
      bottom: 144px;
      right: -64px;
    }
    .img-5{
      position: absolute;
      bottom: 260px;
      left: -64px;
    }
    .img-6{
      position: absolute;
      bottom: 0;
      left: -124px;
    }
    .img-7{
      position: absolute;
      top: 106px;
      left: 236px;
    }
  }
  @keyframes fadeInLeft {
    0% {
      opacity: 0;
      transform: translateX(-100%);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fadeInLeft-Bottom {
    0% {
      opacity: 0;
      transform: translate(-100%,50%);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fadeInRight {
    from {
      opacity: 0;
      transform: translateX(100%);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fadeInRight-Bottom {
    0% {
      opacity: 0;
      transform: translate(100%,50%);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(100%);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(2)
    }
    to {
      opacity: 1;
      transform: scale(1)
    }
  }

  .img-box-in {
    .img-1 {
      animation: fadeInLeft 2s ease-in-out;
    }
    .img-2 {
      animation: fadeInRight-Bottom 2s ease-in-out;
    }
    .img-3 {
      animation: fadeInLeft-Bottom 2s ease-in-out;
    }
    .img-4 {
      animation: fadeInRight 2s ease-in-out;
    }
    .img-5 {
      animation: fadeInLeft 2s ease-in-out;
    }
    .img-6 {
      animation: fadeInUp 2s ease-in-out;
    }
    .img-7 {
      animation: fadeIn 2s ease-in-out;
    }
  }
}
.gey-advantage {
  width: 100%;
  height: 720px;
  background-color: #ffffff;
  text-align: center;
  .title {
    font-size: 40px;
    color: #000;
    span {
      display: inline-block;
      width: 38px;
      height: 3px;
      background-color: #000;
    }
    p {
      font-size: 14px;
      color: #333333;
      margin-top: 20px;
    }
  }
  img {
    margin: 90px 0;
  }
}
.join-us {
  width: 100%;
  height: 720px;
  background-color: #f4f5f8;
  padding-top: 180px;
  text-align: center;
  .title {
    width: 100%;
    height: 216px;
    img {
      float: left;
    }
    span {
      float: left;
      width: 582px;
      height: 140px;
      color: #ee3a3d;
      background: url(../../assets/img/join-us-bg.png) no-repeat;
      background-size: contain;
      line-height: 120px;
      text-align: center;
      font-size: 50px;
      margin: 2px 20px 0;
    }
  }
  .job-list {
    width: 100%;
    height: 176px;
    line-height: 176px;
    font-size: 20px;
    color: #333333;
    span {
      display: inline-block;
      width: 168px;
      height: 33px;
      line-height: 33px;
      background:url(../../assets/img/job-list-bg.png) no-repeat;
      padding-left: 40px;
    }
    span+span {
      margin-left: 45px;
    }
    .job-1 {
      background-position: 0 0;
    }
    .job-2 {
      background-position: 0 -33px;
    }
    .job-3 {
      background-position: 0 -66px;
    }
    .job-4 {
      background-position: 0 -99px;
    }
    .job-5 {
      background-position: 0 0;
    }
  }
  .more-job {
    display: inline-block;
    font-size: 20px;
    color: #fff;
    width: 154px;
    height: 46px;
    line-height: 46px;
    background-color: #ee3a3d;
  }
}
</style>

