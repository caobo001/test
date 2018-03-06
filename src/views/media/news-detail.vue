<template>
  <div class="page page-news-detial">

    <div class="top">
      <div class="container">
        <h2 class="title">{{ newsDetail.fdTitle }}</h2>
        <div class="data">发布时间 ：{{ newsDetail.createdDate }}</div>
      </div>
    </div>

    <div class="content">
      <div class="container">
        <div v-html="newsDetail.fdContent"></div>
      </div>
    </div>

    <div class="bottom" v-if="nextNews">
      <div class="container">

        <div class="line"></div>

        <div class="next-news clearfix">
          <img :src="nextNews.logo.url" alt="">

          <div class="next-news-info">
            <div class="title-line"></div>
            <h2 class="next-news-title ellipsis">{{ nextNews.fdTitle }}</h2>
            <p>{{ nextNews.fdAbstract }}</p>
            <span class="show-detail" @click="nextNewsHandle(nextNews.id)">查看详情</span>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  asyncData ({ store, route }) {
    return Promise.all([
      store.dispatch('newsList/fetchNewsDetail', route.params)
    ])
  },
  data () {
    return {
      params: {
        id: ''
      }
    }
  },
  computed: {
    newsDetail () {
      return this.$store.state.newsList.newsDetail
    },
    nextNews () {
      return this.$store.state.newsList.nextNews
    }
  },
  methods: {
    nextNewsHandle (id) {
      this.params.id = id
      this.$store.dispatch('newsList/fetchNewsDetail', this.params)
      // behavior: 'smooth'使回到顶部速度变慢,平滑回到顶部
      window.scroll({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

}
</script>
<style lang="less" scoped>
@import "../../assets/styles/common.less";
.container {
  width: 900px;
  height: 100%;
  margin: 0 auto;
}
.top {
  width: 100%;
  height: 142px;
  margin: 60px 0 40px 0;
  .title {
    font-size: 24px;
    color: #333;
  }
  .data {
    height: 106px;
    line-height: 106px;
    font-size: 16px;
    color: #cecece;
    border-bottom: 1px solid #cecece;
  }
}
.content {
  width: 100%;
  text-align: center;
}
.bottom {
  width: 100%;
  height: 400px;
  margin-top: 40px;
  .line {
    width: 100%;
    height: 1px;
    background-color: #cecece;
    margin-bottom:40px;
  }
  .next-news {
    img {
      width: 226px;
      height: 226px;
      float: left;
    }
    .next-news-info {
      position: relative;
      float: left;
      width: 500px;
      height: 240px;
      margin-left: 150px;
      .title-line {
        width: 42px;
        height: 6px;
        background-color: #dd3b52;
      }
      .next-news-title {
        height: 60px;
        line-height: 60px;
        font-size: 25px;
        color: #dd3b52;
      }
      p {
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        color: #777777;
      }
      .show-detail {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 90px;
        height: 36px;
        font-size: 18px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        background-color: #dd3b52;
        cursor: pointer;
      }
    }

  }


}
</style>
