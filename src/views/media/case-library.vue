<template>
  <div class="page page-case-library">
    <!-- banner  -->
    <div class="banner">
      <img src="../../assets/img/case-banner.png" alt="">
    </div>

    <!-- nav -->
    <div  class="nav">
      <div class="container">
        <ul>
          <li><a :class="{ 'active': activeTab === 1 }" href="javascript:;" @click="tabHandle(1)">全部案例</a></li>
          <li><a :class="{ 'active': activeTab === 2 }"  href="javascript:;" @click="tabHandle(2)">金融地产</a></li>
          <li><a :class="{ 'active': activeTab === 3 }"  href="javascript:;" @click="tabHandle(3)">汽车科技</a></li>
          <li><a :class="{ 'active': activeTab === 4 }"  href="javascript:;" @click="tabHandle(4)">家电通讯</a></li>
          <li><a :class="{ 'active': activeTab === 5 }"  href="javascript:;" @click="tabHandle(5)">快消餐饮</a></li>
          <li><a :class="{ 'active': activeTab === 6 }"  href="javascript:;" @click="tabHandle(6)">美妆服饰</a></li>
        </ul>
      </div>
    </div>

    <!-- case-list-block -->
    <div class="case-list">
      <div class="container">

        <router-link class="pic-item" v-for="item in caseList" :key="item.id" :to="{name: 'media-case-detail', params: {id: item.id, fdTab: item.module}}">
          <div class="pic-item-in">
            <div class="front">
              <img :src="item.logo.url" class="case-pic">
            </div>
            <div class="back">
              <div class="back-text">
                {{ item.fdTitle.split('，')[0] }}
              </div>
              <div class="back-text">
                {{ item.fdTitle.split('，')[1] }}
              </div>
            </div>
          </div>
        </router-link>

        <div class="pagination" v-if="isPage">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-size="15"
            layout="prev, pager, next"
            :total="caseTotal">
          </el-pagination>
        </div>

      </div>
    </div>

    <!-- partner -->
    <div class="partner">
      <div class="container">

        <h2 class="title">
          <span class="title-text">合作客户</span>
        </h2>

        <div class="data-list">

          <div class="data-item">
            <span class="data-num">166</span>
            <span class="data-unit">万+</span>
            <p class="data-intro">累计入驻媒体，聚集行业90%知名自媒体红人大V</p>
          </div>

          <div class="data-item">
            <span class="data-num">66</span>
            <span class="data-unit">万</span>
            <p class="data-intro">累计品牌客户，深得市场行业的广泛认可与信赖</p>
          </div>

          <div class="data-item">
            <span class="data-num">166</span>
            <span class="data-unit">万</span>
            <p class="data-intro">超百亿流量覆盖，聚合全球优质平台战略合作</p>
          </div>

        </div>

      </div>
    </div>

    <div class="brand">
      <!-- line -->
      <div class="line"></div>

      <div class="container">

        <h2>品牌客户</h2>

        <el-carousel :interval="3000" arrow="hover" indicator-position="none" height="678px">
          <el-carousel-item>
            <div class="item clearfix">
              <div class="partner-item">
                <img src="../../assets/img/logo-01.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-02.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-03.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-04.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-05.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-06.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-07.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-08.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-09.png">
              </div>
            </div>
          </el-carousel-item>

          <el-carousel-item>
            <div class="item clearfix">
              <div class="partner-item">
                <img src="../../assets/img/logo-01.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-02.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-03.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-04.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-05.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-06.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-07.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-08.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-09.png">
              </div>
            </div>
          </el-carousel-item>

          <el-carousel-item>
            <div class="item clearfix">
              <div class="partner-item">
                <img src="../../assets/img/logo-10.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-11.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-12.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-13.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-14.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-15.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-16.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-17.png">
              </div>
              <div class="partner-item">
                <img src="../../assets/img/logo-18.png">
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <!--  -->
    <div class="last-block"></div>

  </div>
</template>

<script>
import { Carousel, CarouselItem } from 'element-ui'
export default {
  asyncData ({ store, route }) {
    return Promise.all([
      store.dispatch('caseList/fetchCaseList', {
        fdTab: 1,
        pageIndex: 1
      })
    ])
  },
  data: function () {
    return {
      activeTab: 1,
      params: {
        fdTab: 1,
        pageIndex: 1
      }
    }
  },
  computed: {
    isPage () {
      if (this.$store.state.caseList.pageCount > 1) {
        this.isShowNavigation = true
      } else {
        this.isShowNavigation = false
      }
      return this.isShowNavigation
    },
    caseList () {
      return this.$store.state.caseList.caseList
    },
    caseTotal () {
      return this.$store.state.caseList.total
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.params.pageIndex = page
      this.$store.dispatch('caseList/fetchCaseList', this.params)
      // console.log('00000000', this.params)
    },
    tabHandle (tab) {
      this.activeTab = tab
      this.params.fdTab = tab
      this.$store.dispatch('caseList/fetchCaseList', this.params)
    }
  },
  components: {
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem
  }
}
</script>
<style lang="less" scoped>
@import "../../assets/styles/common.less";
.container {
  width: 988px;
  height: 100%;
  margin: 0 auto;
}
.banner {
  width: 100%;
  height: 96px;
  background: url(../../assets/img/case-banner-bg.png) no-repeat center center;
  background-size: cover;
  text-align: center;
}
.nav {
  width: 100%;
  height: 38px;
  background-color: #ee3a3d;
  ul {
    width: 988px;
    height: 38px;
    li {
      float: left;
      width: 100px;
      height: 38px;
      font-size: 20px;
      line-height: 38px;
      text-align: center;
    }
    li + li {
      margin-left: 77px;
    }
    a {
      display: inline-block;
      width: 100px;
      height: 38px;
      color: #fff;
    }
  }
  .active {
    background-color: #fff;
    color: #ee3a3d;
  }
}
.case-list {
  width: 100%;
  padding: 38px 0 120px 0;
  .pic-item {
    margin: 40px 50px;
    display: inline-block;
    width: 226px;
    height: 226px;
    overflow: hidden;
    .pic-item-in {
      position: relative;
      width: 226px;
      transition: 0.6s;
      front {
        position: relative;
        width: 226px;
        height: 226px;
        box-sizing: border-box;
        transition: 0.6s;
        z-index: 2;
        .case-pic {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          top: 0;
          margin: auto;
          max-width: 226px;
          max-height: 226px;
        }
      }
      .back {
        padding-top: 33px;
        text-align: center;
        border-bottom: 5px solid #ff4e00;
        position: relative;
        width: 226px;
        height: 226px;
        box-sizing: border-box;
        transition: 0.6s;
        .back-text {
          font-size: 27px;
          color: #ff4e00;
          padding: 20px 0;
          cursor: pointer;
        }
      }
    }
    .pic-item-in:hover {
      transform: translateY(-226px);
    }
  }
}
.partner {
  width: 100%;
  height: 360px;
  background-color: #f4f6f8;
  text-align: center;
  padding-top: 64px;
  .title {
    height: 95px;
    .title-text {
      padding: 24px 0;
      font-size: 45px;
      border-bottom: 2px solid #ff4e00;

    }
  }
  .data-list {
    height:208px;
    .data-item {
      display: inline-block;
      width: 324px;
      padding-top: 50px;
      height:208px;
      .data-num {
        font-size: 34px;
        color: #ee3a3d;
      }
      .data-unit {
        font-size: 20px;
        color: #333;
      }
      .data-intro {
        height: 60px;
        line-height: 60px;
        font-size: 12px;
        color: #333;
      }
    }
  }
}
.brand {
  width: 100%;
  height: 886px;
  background-color: #f4f6f8;
  .line {
    width: 1400px;
    height: 2px;
    background-color: #e4e6e8;
    margin: 0 auto;
  }
  h2 {
    width: 160px;
    height: 160px;
    line-height: 160px;
    font-size: 34px;
    color: #8c8c8c;
    margin: 0 auto;
  }
  .item {
    padding-left: 60px;
    .partner-item {
      float: left;
      width: 200px;
      height: 126px;
      margin: 40px;
      img {
        width: 218px;
        height: 126px;
      }
    }
  }
}
.last-block {
  width: 100%;
  height: 1134px;
  background: url(../../assets/img/last-bg.png) no-repeat center center;
}
</style>
<style lang="less">
.el-carousel__arrow {
  width:44px;
  height: 77px;
  font-size: 0;
  border-radius: 0;
}
.el-carousel__arrow:hover {
  background-color: transparent;
}
.el-carousel__arrow--left {
  background: url(../../assets/img/arrow-left.png) no-repeat center center;
}
.el-carousel__arrow--right {
  background: url(../../assets/img/arrow-right.png) no-repeat center center;
}
</style>

