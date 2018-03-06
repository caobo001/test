<template>
  <div class="page page-case-detial">

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

        <div class="pic-item" v-for="item in caseList" :key="item.id" @click="detailShowHandle({id:item.id, tab:item.module})">
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
        </div>

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


    <div class="content" ref="content" id="content">
      <div class="container">
        <div v-html="caseDetail.fdContent"></div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from '../../assets/scripts/jquery-ajax.js'
export default {
  asyncData ({ store, route }) {
    return Promise.all([
      store.dispatch('caseList/fetchCaseList', route.params),
      store.dispatch('caseList/fetchCaseDetail', route.params)
    ])
  },
  data: function () {
    return {
      activeTab: 1,
      params: {
        fdTab: 1,
        pageIndex: 1,
        id: ''
      }
    }
  },
  mounted () {
    this.activeTab = this.$route.params.fdTab || 1
    // behavior: 'smooth'页面平滑过渡
    window.scroll({ top: ($('#content').offset().top), left: 0, behavior: 'smooth' })
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
    },
    caseDetail () {
      return this.$store.state.caseList.caseDetail
    }
  },
  methods: {
    handleCurrentChange (page) {
      this.params.pageIndex = page
      this.$store.dispatch('caseList/fetchCaseList', this.params)
    },
    tabHandle (tab) {
      this.activeTab = tab
      this.params.fdTab = tab
      this.$store.dispatch('caseList/fetchCaseList', this.params)
    },
    detailShowHandle (obj) {
      if (this.activeTab !== obj.tab) {
        this.activeTab = obj.tab
        this.params.fdTab = obj.tab
        this.$store.dispatch('caseList/fetchCaseList', this.params)
      }

      this.params.id = obj.id
      this.$store.dispatch('caseList/fetchCaseDetail', this.params).then((resp) => {
        // behavior: 'smooth'页面平滑过渡
        window.scroll({ top: ($('#content').offset().top), left: 0, behavior: 'smooth' })
      })
    }
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
.content {
  width: 100%;
  margin-bottom: 70px;
}
</style>
