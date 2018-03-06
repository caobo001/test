<template>
  <div class="ctitle">
    <div class="container clearfix">
      <span class="pull-left">{{title}}</span>
      <router-link :to="{name: 'media-billboard'}" class="billboard pull-right">榜单</router-link>
      <div class="media-box pull-right">
        媒体 <i class="icon iconfont icon-xiangshangjiantou arrow-icon"></i>
        <ul class="media-list">
          <li v-for="item in mediaList" :key="item.text">
            <router-link :to="{name: item.routeName}">{{item.text}}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'CTitle',
    data () {
      return {
        mediaList: [{
          routeName: 'media-wechat-list',
          text: '微信'
        }, {
          routeName: 'media-weibo-list',
          text: '微博'
        }, {
          routeName: 'media-headline-list',
          text: '头条'
        }]
      }
    },
    props: {
      title: {
        type: String
      }
    }
  }
</script>
<style lang="less" scoped>
@import '../assets/styles/variables.less';
.ctitle {
  background-color: #f0f3f5;
  clear: both;
  font-size: 14px;
  color: @color-font-light2;
}
.container {
  height: 40px;
  line-height: 40px;
}
.media-box,
.billboard {
  width: 80px;
  text-align: center;
  color: @color-font-light2;
}
.media-box:hover,
.billboard:hover {
  background-color: #ffffff;
}
.media-box {
  position: relative;
  .arrow-icon {
    position: absolute;
    right: 5px;
    transition: all 0.4s;
    font-size: 14px;
  }
  .media-list {
    position: absolute;
    width: 100%;
    top: 40px;
    left: 0;
    display: none;
    border: 1px solid #f0f3f5;
    border-top: none;
    background-color: #ffffff;
    z-index: 5;
    li {
      a {
        display: inline-block;
        width: 100%;
        height: 45px;
        line-height: 45px;
        text-align: center;
        color: @color-font-light2;
      }
      &:hover a {
        background-color: @color-primary;
        color: #ffffff;
      }
    }

  }
  &:hover {
    .arrow-icon {
      transform: rotate(180deg)
    }
    .media-list {
      display: block;
    }
  }
}

</style>
