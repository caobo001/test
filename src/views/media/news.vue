<template>
  <div class="page page-join-us">

    <div class="news-banner">
      <div class="container">
        <img src="../../assets/img/news-banner.png" alt="">
      </div>
    </div>

    <div class="line"></div>

    <div class="title">
      <div class="container">
        <h2 class="title"><span class="red">近期</span><span>动态</span></h2>
      </div>
    </div>

    <div class="news">
      <div class="container">
        <div class="news-list" v-for="item in newsList" :key="item.id">

          <img :src="item.logo.url" alt="">

          <div class="news-info">
            <router-link :to="{name: 'media-news-detail', params: {id: item.id}}"><h2 class="news-title">{{ item.fdTitle }}</h2></router-link>
            <p class="news-content">{{ item.fdAbstract	 }}</p>
            <p class="news-date">发布时间：{{ item.createdDate }}</p>
          </div>
        </div>

      </div>

      <div class="pagination" v-if="isPage">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-size="15"
          layout="prev, pager, next"
          :total="newsTotal">
        </el-pagination>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  asyncData ({ store, route }) {
    return Promise.all([
      store.dispatch('newsList/fetchNewsList', {
        pageIndex: 1
      })
    ])
  },
  data () {
    return {
      isActive: true,
      isShowNavigation: false,
      params: {
        pageIndex: 1
      }
    }
  },
  computed: {
    isPage () {
      if (this.$store.state.newsList.pageCount > 1) {
        this.isShowNavigation = true
      } else {
        this.isShowNavigation = false
      }
      return this.isShowNavigation
    },
    newsList () {
      return this.$store.state.newsList.newsList
    },
    newsTotal () {
      return this.$store.state.newsList.total
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.params.pageIndex = page
      this.$store.dispatch('newsList/fetchNewsList', this.params)
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 1010px;
  height: 100%;
  margin: 0 auto;
}
.news-banner {
  width: 100%;
  height: 402px;
  margin-top: 15px;
}
.line {
  width: 1010px;
  height: 6px;
  background-color: #ee3a3d;
  margin:30px auto;

}
.title {
  width: 100%;
  height: 60px;
  margin-bottom: 20px;
  h2 {
    height: 60px;
    line-height: 60px;
    font-size: 30px;
  }
  .red {
    color: #ee3a3d;
  }

}
.news-list {
  width: 100%;
  height: 295px;
  border-bottom: 2px solid #f0f2f5;
  padding: 33px 0 28px 0;
  margin-bottom: 10px;
  img {
    width: 226px;
    height: 226px;
    float: left;
  }
  .news-info {
    position: relative;
    float: left;
    width: 781px;
    height: 226px;
    padding: 0 35px;
    overflow: hidden;
    box-sizing: border-box;
    .news-title {
      padding: 15px 0;
      font-size: 20px;
      margin-bottom: 10px;
    }
    .news-content {
      font-size: 14px;
      line-height: 1.8;
    }
    .news-date {
      position: absolute;
      bottom: 0;
      font-size: 14px;
      color: #8b8b8b;
    }
  }
}
.page-navigation {
    text-align: center;
    margin: 80px 0;
    a {
      display: inline-block;
      width: 45px;
      height: 45px;
      line-height: 45px;
      margin: 0 10px;
      text-align: center;
      background-color: #f0f3f5;
      color: #8b8c89;
      font-size: 18px;
    }
    .active {
      width: 63px;
      height: 63px;
      line-height: 63px;
      background-color: #ee3a3c;
      color: #ffffff;
      font-size: 26px;
    }
  }
</style>
