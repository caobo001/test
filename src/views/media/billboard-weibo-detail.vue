<template>
  <div class="page-billboard">
    <div class="container">
      <div class="summary clearfix">
        <div class="avatar pull-left">
          <img :src="detailInfo.fdImage && detailInfo.fdImage.url" width="160" height="160">
        </div>
        <div class="brief pull-left">
          <h2>
            <span class="vertical-middle">{{detailInfo.fdName}}</span>
            <img
              class="vipType vertical-middle"
              :src="getSrc(detailInfo.fdVipType)"
              :title="detailInfo.fdVipType"
              :alt="detailInfo.fdVipType"
              v-if="detailInfo.fdVipType !== '普通'"/>
          </h2>

          <div class="mt15">
            <em>微博认证：</em>
            <span>{{detailInfo.fdVipType}}</span>
          </div>
          <div class="mt15">
            <em>简介：</em>
            <span>{{detailInfo.remarks}}</span>
          </div>

          <div class="mt15"><em>预估活跃粉丝：</em>{{detailInfo.fdFunsCount | numToMyriad}}</div>
          <div class="mt15"><em>分类：</em>
            <a href="javascript:" class="btn" v-for="(item, index) in detailInfo.fdAttr1" :key="index">{{item}}</a>
          </div>
          <div class="mt15">
            <ul class="price weibo-price">
              <li class="inline-block mr20">防屏蔽直发：<em>￥{{detailInfo.fdPrice1 | numToThousands}}</em></li>
              <li class="inline-block mr20">防屏蔽转发：<em>￥{{detailInfo.fdPrice2 | numToThousands}}</em></li>
              <li class="inline-block mr20">直发：<em>￥{{detailInfo.fdPrice3 | numToThousands}}</em></li>
              <li class="inline-block">转发：<em>￥{{detailInfo.fdPrice4 | numToThousands}}</em></li>
            </ul>
          </div>
        </div>
        <div class="pull-right">

          <div class="text-center mt15">
            <i
              class="icon iconfont icon-shopcart"
              @click.prevent="toggleCart()"
              :class="{'active': isInCart}"
              title="加入购物车"
            ></i>
            <i
              class="icon iconfont icon-collect"
              @click.prevent="toggleDetailCollection(detailInfo)"
              :class="{'active': detailInfo.isCollection}"
              title="收藏"
            ></i>

            <a href="javascript:" class="add_good_to_cart_btn addCartGoods"></a>
            <a href="javascript:" class="add_good_to_collect_btn"></a>
          </div>
        </div>
      </div>
      <div class="today-box weibo-today-box" v-if="dataDimension.date">
        <h2><i class="iconfont icon-calendar mr10"></i>{{dataDimension.date}}</h2>
        <div class="clearfix">
          <div class="today inline-block">
            <div class="rank">
              <span>第 </span>{{dataDimension.fdOrder}}名
              <div>排名为</div>
            </div>
            <div class="line"></div>
            <div class="exponent">
              {{dataDimension.fdWeight | toFixed}}
              <div>指数为</div>
            </div>
          </div>
          <div class="detail inline-block">
            <ul class="list text-center">
              <li>
                {{dataDimension.original || 0 }}
                <div>原创微博</div>
              </li>
              <li>
                {{dataDimension.avgLike || 0  | numToMyriad}}
                <div>篇均点赞</div>
              </li>
              <li>
                {{dataDimension.avgForward || 0  | numToMyriad}}
                <div>篇均转发</div>
              </li>
              <li>
                {{dataDimension.avgComment | numToMyriad}}
                <div>篇均评论</div>
              </li>
            </ul>
            <ul class="list text-center">
              <li>
                {{dataDimension.fdArticleTotal || 0}}
                <div>微博总数</div>
              </li>
              <li>
                {{dataDimension.fdLikeTotal || 0  | numToMyriad}}
                <div>点赞总数</div>
              </li>
              <li>
                {{dataDimension.fdForwardTotal || 0  | numToMyriad}}
                <div>转发总数</div>
              </li>
              <li>
                {{dataDimension.fdCommentTotal || 0  | numToMyriad}}
                <div>评论总数</div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="clearfix mt10" v-if="maxFdOrderIn30Days.fdDate">
        <div class="recent pull-left">
          <div class="inner">
            <h2>最近30天最高日排名</h2>
            <p><span>时间：</span>{{maxFdOrderIn30Days.fdDate}}</p>
            <div class="rank">
              <span>第 </span>{{maxFdOrderIn30Days.fdOrder}}名
              <div>排名为</div>
            </div>
            <div class="line"></div>

            <h2>对应指数</h2>
            <p><span>时间：</span>{{maxFdOrderIn30Days.fdDate}}</p>
            <div class="exponent">
              {{maxFdOrderIn30Days.fdWeight | toFixed}}
              <div>指数为</div>
            </div>
          </div>
        </div>
        <div class="chart pull-right">
          <h2>指数变化 <span>近 {{time}} 天</span></h2>
          <chart :options="chartExponent" style="width: 845px; height: 400px"></chart>
        </div>
      </div>

      <div class="clearfix mt10 chart multiline" v-if="variousValues.date">
        <h2>各类数值 <span>近 {{time}} 天</span></h2>
        <ul class="tabs">
          <li v-for="item in tabs" :key="item.key">
            <a href="javascript:" :class="{active: item.isActive}" @click="switchTab(item)">{{item.name}}</a>
          </li>
        </ul>
        <chart :options="currentMultiData" style="width: 1050px; height: 420px"></chart>
      </div>

      <p v-if="!variousValues.date" class="tip">
        该账号已有 <em>7</em> 天未推送图文内容,无趋势图展示
      </p>

      <div class="article mt10 clearfix">
        <div class="section pull-left">
          <h2><i class="iconfont icon-fire"></i>7 天热门</h2>
          <p v-if="article.hotArticles.length === 0">暂无数据</p>
          <ul class="list" v-if="article.hotArticles.length !== 0">
            <li v-for="item in article.hotArticles" :key="item.id">
              <a :href="'http://www.weibo.com/'+item.fdUid+'/'+item.fdArticleId.substring(2)" target="_blank">
                <h3 class="ellipsis">{{item.fdContent}}</h3>
              </a>
              <p class="ellipsis-two">{{item.fdContent}}</p>
              <div class="clearfix">
                <div class="pull-left">
                  <span class="mr20">评论数 {{item.fdCommentNum | numToMyriad}}</span>
                  <span class="mr20">转发数 {{item.fdForwardNum | numToMyriad}}</span>
                  <span><i class="iconfont icon-heart"></i> {{item.fdLikeNum}}</span>
                </div>
                <div class="pull-right date">{{item.fdPubDate}}</div>
              </div>
            </li>
          </ul>
        </div>

        <div class="section pull-right">
          <h2><i class="iconfont icon-naozhong"></i>最新发布</h2>
          <p v-if="article.lastArticles.length === 0">暂无数据</p>
          <ul class="list" v-if="article.lastArticles.length !== 0">
            <li v-for="item in article.lastArticles" :key="item.id">
              <a :href="'http://www.weibo.com/'+item.fdUid+'/'+item.fdArticleId.substring(2)" target="_blank">
                <h3 class="ellipsis">{{item.fdContent}}</h3>
              </a>
              <p class="ellipsis-two">{{item.fdContent}}</p>
              <div class="clearfix">
                <div class="pull-left">
                  <span class="mr20">评论数 {{item.fdCommentNum | numToMyriad}}</span>
                  <span class="mr20">转发数 {{item.fdForwardNum | numToMyriad}}</span>
                  <span><i class="iconfont icon-heart"></i> {{item.fdLikeNum}}</span>
                </div>
                <div class="pull-right date">{{item.fdPubDate}}</div>
              </div>
            </li>
          </ul>

        </div>
      </div>

    </div>
    <c-cart-bar :actionBtn="cartBarActionBtn"></c-cart-bar>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import CCartBar from 'components/media/CCartBar'
import generateOpts from '../../assets/scripts/eChartsOption.js'
// import ECharts from 'vue-echarts/components/ECharts.vue'
import CECharts from 'components/CECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/lines'
import 'echarts/lib/component/tooltip'

export default {
  asyncData ({ store, route }) {
    return Promise.all([
      store.dispatch('billboard/fetchWeiboDetail', route.params),
      store.dispatch('billboard/fetchWeiboArticle', route.params),
      store.dispatch('billboard/fetchWeiboMeidaData', route.params)
    ])
  },
  title () {
    return this.detailInfo.fdName
  },
  mounted () {
    this.chartExponent = generateOpts.lineOptions(this.variousValues.date, this.variousValues.dailyWeight)

    this.multilineData = {
      dailyForward: generateOpts.multiLineOptions(this.variousValues.date, this.variousValues.dailyForward),
      dailyLike: generateOpts.multiLineOptions(this.variousValues.date, this.variousValues.dailyLike),
      dailyComment: generateOpts.multiLineOptions(this.variousValues.date, this.variousValues.dailyComment)
    }

    this.time = this.variousValues.date.length
    this.currentMultiData = this.multilineData.dailyForward
  },
  data () {
    return {
      tabs: [{
        name: '日转发',
        key: 'dailyForward',
        isActive: true
      }, {
        name: '日点赞',
        key: 'dailyLike',
        isActive: false
      }, {
        name: '日评论',
        key: 'dailyComment',
        isActive: false
      }],
      chartExponent: {},
      multilineData: {},
      currentMultiData: {},
      time: 7,
      cartBarActionBtn: {
        text: '立即投放',
        routerName: 'media-cart'
      }
    }
  },
  filters: {
    last (value) {
      value = _.last(value) || 0
      return value
    },
    toFixed: function (value) {
      value = value ? Number(value) : 0
      return value.toFixed(2)
    }
  },
  computed: {
    ...mapState('billboard', {
      detailInfo: state => state.detailInfo,
      article: state => state.article,
      weiboMediaData: state => state.weiboMediaData,
      dataDimension: state => state.weiboMediaData.dataDimension,
      maxFdOrderIn30Days: state => state.weiboMediaData.maxFdOrderIn30Days,
      variousValues: state => state.weiboMediaData.variousValues
    }),
    cartIdList () {
      return _.map(this.$store.state.media.cartList, (item) => {
        return item.id
      })
    },
    isInCart () {
      return _.indexOf(this.cartIdList, this.detailInfo.id) >= 0
    }
  },
  methods: {
    ...mapActions(['rmItemInMediaCart', 'addItemInMediaCart']),
    ...mapActions({
      fetchWeiboDetail: 'billboard/fetchWeiboDetail',
      toggleDetailCollection: 'billboard/toggleDetailCollection'
    }),
    switchTab (tab) {
      _.forEach(this.tabs, (item) => {
        item.isActive = false
      })
      tab.isActive = true
      this.currentMultiData = this.multilineData[tab.key]
    },
    toggleCart () {
      if (this.isInCart) {
        this.rmItemInMediaCart({id: this.detailInfo.id}).then((resp) => {
          this.$message.success('成功从购物车中移出')
        })
      } else {
        this.addItemInMediaCart({id: this.detailInfo.id}).then((resp) => {
          this.$message.success('成功添加到购物车')
        })
      }
    },
    getSrc (type) {
      var src = ''
      switch (type) {
        case '金V':
          src = '/webapp/static/vip-golden.png'
          break
        case '黄V':
          src = '/webapp/static/vip-yellow.png'
          break
        case '蓝V':
          src = '/webapp/static/vip-blue.png'
          break
        case '达人':
          src = '/webapp/static/vip-star.png'
          break
      }
      return src
    }
  },
  components: {
    CCartBar,
    chart: CECharts
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/billboard.less';
@import '../../assets/styles/billboard-detail.less';
</style>
