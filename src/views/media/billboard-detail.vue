<template>
  <div class="page-billboard">
    <div class="container">
      <div class="summary clearfix">
        <div class="avatar pull-left">
          <img :src="detailInfo.goodsInfo.fdImageJson &&detailInfo.goodsInfo.fdImageJson.url" width="160" height="160">
        </div>
        <div class="brief pull-left">
          <h2>{{detailInfo.goodsInfo.fdName}}
            <img
              src="../../assets/img/icon-commentable.png"
              v-if="detailInfo.goodsInfo.fdIsCommentable"
              title="带评论" alt="带评论"
              class="vertical-middle icon-comment" />
            <img
              src="../../assets/img/icon-original.png"
              v-if="detailInfo.goodsInfo.fdIsOriginal"
              title="原创" alt="原创"
              class="vertical-middle icon-origin" />
          </h2>
          <div class="mt15">
            <em>微信号：</em>
            <span>{{detailInfo.goodsInfo.fdCode}}</span>
          </div>

          <div class="mt15">
            <em>微信认证：</em>
            <span>{{detailInfo.goodsInfo.fdVipType}}</span>
          </div>
          <div class="mt15">
            <em>简介：</em>
            <span>{{detailInfo.goodsInfo.remarks}}</span>
          </div>

          <div class="mt15"><em>粉丝数：</em>{{detailInfo.goodsInfo.fdFunsCount | numToMyriad}}</div>
          <div class="mt15"><em>分类：</em>
            <a href="javascript:" class="btn" v-for="(item, index) in detailInfo.goodsInfo.fdAttr1Array" :key="index">{{item}}</a>
          </div>
          <div class="mt15">
            <ul class="price">
              <li class="inline-block mr20">头条：<em>￥{{detailInfo.goodsInfo.fdPrice1 | numToThousands}}</em></li>
              <li class="inline-block">二条：<em>￥{{detailInfo.goodsInfo.fdPrice2 | numToThousands}}</em></li>
            </ul>
          </div>
        </div>
        <div class="pull-right">
          <img class="qrcode" :src="`http://open.weixin.qq.com/qr/code?username=${detailInfo.goodsInfo.fdCode}`" width="90" height="90" alt="二维码">
          <div class="text-center mt15">
            <i
              class="icon iconfont icon-shopcart"
              @click.prevent="toggleCart()"
              :class="{'active': isInCart}"
              title="加入购物车"
            ></i>
            <i
              class="icon iconfont icon-collect"
              @click.prevent="toggleDetailCollection(detailInfo.goodsInfo)"
              :class="{'active': detailInfo.goodsInfo.isCollection}"
              title="收藏"
            ></i>

            <a href="javascript:" class="add_good_to_cart_btn addCartGoods"></a>
            <a href="javascript:" class="add_good_to_collect_btn"></a>
          </div>
        </div>
      </div>
      <div class="today-box" v-if="detailInfo.fdDateEnd">
        <h2><i class="iconfont icon-calendar mr10"></i>{{detailInfo.dateEnd}}</h2>
        <div class="clearfix">
          <div class="today pull-left">
            <div class="rank">
              <span>第 </span>{{detailInfo.fdOrder | last}}名
              <div>排名为</div>
            </div>
            <div class="line"></div>
            <div class="exponent">
              {{detailInfo.fdWeight | last | toFixed}}
              <div>指数为</div>
            </div>
          </div>
          <div class="detail pull-right">
            <ul class="list">
              <li>
                {{detailInfo.fdPushCount || 0}}
                <div>发布次数</div>
              </li>
              <li>
                {{detailInfo.fdArticleCount | last}}
                <div>发布篇数</div>
              </li>
              <li>
                {{detailInfo.fdOhtQty || 0}}
                <div>10w + 发布篇数</div>
              </li>
              <li>
                {{detailInfo.fdMaxReadQty | last | numToMyriad}}
                <div>最高阅读数</div>
              </li>
              <li>
                {{detailInfo.fdTotalHeadLineReadQty | last | numToMyriad}}
                <div>头条阅读数</div>
              </li>
            </ul>
            <div class="nums clearfix">
              <div class="viewed-num pull-left section">
                <h3>阅读数</h3>
                <ul>
                  <li class="total">
                    {{detailInfo.fdTotalReadQty | last | numToMyriad}}
                    <div>总计阅读数</div>
                  </li>
                  <li class="average">
                    {{detailInfo.fdAvgReadQty | last | numToMyriad}}
                    <div>平均阅读数</div>
                  </li>
                </ul>
              </div>
              <div class="liked-num pull-right section">
                <h3>点赞数</h3>
                <ul>
                  <li class="total">
                    {{detailInfo.fdTotalLikeQty | last | numToMyriad}}
                    <div>总计点赞数</div>
                  </li>
                  <li class="average">
                    {{detailInfo.fdAvgLikeQty | numToMyriad}}
                    <div>平均点赞数</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="clearfix mt10" v-if="detailInfo.fdDateEnd">
        <div class="recent pull-left">
          <div class="inner">
            <h2>最近30天最高日排名</h2>
            <p><span>时间：</span>{{detailInfo.fdOrderByMonthDayDate}}</p>
            <div class="rank">
              <span>第 </span>{{detailInfo.fdOrderByMonthDay}}名
              <div>排名为</div>
            </div>
            <div class="line"></div>

            <h2>近30天的最高指数</h2>
            <p><span>时间：</span>{{detailInfo.fdWeightByMonthDayDate}}</p>
            <div class="exponent">
              {{detailInfo.fdWeightByMonthDay | toFixed}}
              <div>指数为</div>
            </div>
          </div>
        </div>
        <div class="chart pull-right">
          <h2>指数变化 <span>近 {{time}} 天</span></h2>
          <chart :options="chartExponent" style="width: 845px; height: 400px"></chart>
        </div>
      </div>

      <div class="clearfix mt10" v-if="detailInfo.fdDateEnd">
        <div class="chart pull-left">
          <h2>排名变化 <span>近 {{time}} 天</span></h2>
          <chart :options="chartRank" style="width: 475px; height: 360px"></chart>
        </div>
        <div class="chart pull-right">
          <h2>发布篇数 <span>近 {{time}} 天</span></h2>
          <chart :options="chartRelease" style="width: 475px; height: 360px"></chart>
        </div>
      </div>

      <div class="clearfix mt10 chart multiline" v-if="detailInfo.fdDateEnd">
        <h2>各类数值 <span>近 {{time}} 天</span></h2>
        <ul class="tabs">
          <li v-for="item in tabs" :key="item.key">
            <a href="javascript:" :class="{active: item.isActive}" @click="switchTab(item)">{{item.name}}</a>
          </li>
        </ul>
        <chart :options="currentMultiData" style="width: 1050px; height: 420px"></chart>
      </div>

      <p v-if="!detailInfo.fdDateEnd" class="tip">
        该账号已有 <em>7</em> 天未推送图文内容,无趋势图展示
      </p>

      <div class="article mt10 clearfix">
        <div class="section pull-left">
          <h2><i class="iconfont icon-fire"></i>7 天热门</h2>
          <p v-if="article.hotest.length === 0">暂无数据</p>
          <ul class="list" v-if="article.hotest.length !== 0">
            <li v-for="item in article.hotest" :key="item.id">
              <a :href="item.content_url" target="_blank">
                <h3 class="ellipsis">{{item.title}}</h3>
              </a>
              <p class="ellipsis-two">{{item.digest}}</p>
              <div class="clearfix">
                <div class="pull-left">
                  <span class="mr20">头条</span>
                  <span class="mr20">阅读 {{item.readQty | numToMyriad}}</span>
                  <span><i class="iconfont icon-heart"></i> {{item.likeQty}}</span>
                </div>
                <div class="pull-right date">{{item.articleCreatedDate}}</div>
              </div>
            </li>
          </ul>
        </div>

        <div class="section pull-right">
          <h2><i class="iconfont icon-naozhong"></i>最新发布</h2>
          <p v-if="article.hotest.length === 0">暂无数据</p>
          <ul class="list" v-if="article.latest.length !== 0">
            <li v-for="item in article.latest" :key="item.id">
              <a :href="item.content_url" target="_blank">
                <h3 class="ellipsis">{{item.title}}</h3>
              </a>
              <p class="ellipsis-two">{{item.digest}}</p>
              <div class="clearfix">
                <div class="pull-left">
                  <span class="mr20">{{item.header ? "头条":"二条"}}</span>
                  <span class="mr20">阅读 {{item.readQty | numToMyriad}}</span>
                  <span><i class="iconfont icon-heart"></i> {{item.likeQty}}</span>
                </div>
                <div class="pull-right date">{{item.articleCreatedDate}}</div>
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
      store.dispatch('billboard/fetchDetail', route.params), store.dispatch('billboard/fetchArticle', route.params)
    ])
  },
  title () {
    return this.detailInfo.goodsInfo.fdName
  },
  mounted () {
    this.chartExponent = generateOpts.lineOptions(this.detailInfo.fdDateEnd, this.detailInfo.fdWeight)

    this.chartRank = generateOpts.barOptions(this.detailInfo.fdDateEnd, this.detailInfo.fdOrder, '排名')

    this.chartRelease = generateOpts.barOptions(this.detailInfo.fdDateEnd, this.detailInfo.fdArticleCount, '篇数')

    this.multilineData = {
      total: generateOpts.multiLineOptions(this.detailInfo.fdDateEnd, this.detailInfo.fdTotalReadQty),
      headline: generateOpts.multiLineOptions(this.detailInfo.fdDateEnd, this.detailInfo.fdTotalHeadLineReadQty),
      average: generateOpts.multiLineOptions(this.detailInfo.fdDateEnd, this.detailInfo.fdAvgReadQty),
      max: generateOpts.multiLineOptions(this.detailInfo.fdDateEnd, this.detailInfo.fdMaxReadQty),
      like: generateOpts.multiLineOptions(this.detailInfo.fdDateEnd, this.detailInfo.fdTotalLikeQty)
    }

    this.time = this.detailInfo.fdDateEnd.length
    this.currentMultiData = this.multilineData.total
  },
  data () {
    return {
      tabs: [{
        name: '总阅读数',
        key: 'total',
        isActive: true
      }, {
        name: '头条阅读数',
        key: 'headline',
        isActive: false
      }, {
        name: '平均阅读数',
        key: 'average',
        isActive: false
      }, {
        name: '最高阅读数',
        key: 'max',
        isActive: false
      }, {
        name: '点赞数',
        key: 'like',
        isActive: false
      }],
      chartExponent: {},
      chartRank: {},
      chartRelease: {},
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
      article: state => state.article
    }),
    cartIdList () {
      return _.map(this.$store.state.media.cartList, (item) => {
        return item.id
      })
    },
    isInCart () {
      return _.indexOf(this.cartIdList, this.detailInfo.goodsInfo.id) >= 0
    }
  },
  methods: {
    ...mapActions(['rmItemInMediaCart', 'addItemInMediaCart']),
    ...mapActions({
      fetchDetail: 'billboard/fetchDetail',
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
        this.rmItemInMediaCart({id: this.detailInfo.goodsInfo.id}).then((resp) => {
          this.$message.success('成功从购物车中移出')
        })
      } else {
        this.addItemInMediaCart({id: this.detailInfo.goodsInfo.id}).then((resp) => {
          this.$message.success('成功添加到购物车')
        })
      }
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
