<template>
  <div class="page page-detail" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
    <!-- 商品介绍 开始 -->
    <div class="pro-intro-block container mt10">
      <div class="media">
        <div class="media-left pull-left">
          <img :src="productData.fdImage ? productData.fdImage.url : ''" alt="写手头像">
        </div>
        <div class="media-body">
          <h4 class="media-heading bold">{{productData.fdName}}</h4>
          <div class="line">
            <span class="key inline-block pull-left">摘要：</span>
            <div class="value inline-block">{{productData.fdAbstract}}</div>
          </div>
          <div class="line">
            <span class="key inline-block pull-left">价格：</span>
            <div class="value inline-block">￥{{productData.fdPriceDown}}-￥{{productData.fdPriceUp}}</div>
          </div>
          <div class="line">
            <span class="key inline-block pull-left">写作类型：</span>
            <div class="value inline-block" v-if="productData.fdWriterType=='wechat'">微信</div>
            <div class="value inline-block" v-else>微博</div>
          </div>
          <div class="line">
            <span class="key inline-block pull-left">行业类型：</span>
            <ul class="value inline-block industry-type-list">
              <li class="pull-left" v-for="item in productData.fdTrades">{{item}}</li>
            </ul>
          </div>
          <div class="line">
            <span class="key inline-block pull-left">所在地：</span>
            <div class="value inline-block">江西南昌</div>
          </div>
          <div class="line">
            <span class="key inline-block pull-left">详细地址：</span>
            <div class="value inline-block">江西南昌青云谱区红盾安大道222号</div>
          </div>
          <div class="line">
            <span class="key inline-block pull-left">月成交量：</span>
            <div class="value inline-block">{{productData.fdSales}}次</div>
          </div>
          <div class="line">
            <span class="key inline-block pull-left">评分：</span>
            <div class="value inline-block">
              <el-rate
                class="inline-block"
                v-model="productData.fdStar"
                disabled>
              </el-rate>
              <span class="color-primary bold vertical-middle">{{productData.fdStar}}分</span>
            </div>
          </div>
          <div class="line">
            <span class="key inline-block pull-left">商品介绍：</span>
            <div
              id="sellerRemark"
              class="value inline-block brief-intro"
              :class="{
                'show-more': toggle==true
              }"
            >
              {{productData.fdSellerRemarks}}
            </div>
             <c-toggle
                class="more pull-right"
                v-model="toggle"
                :text="['收起', '展开']"
                color="#008aff"
                :icon="['icon-xiangshang', 'icon-xiangxia']"
              ></c-toggle>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品介绍 结束 -->
    <!-- 案例 评论 开始 -->
    <div class="case-comment-block container mt10">
      <el-tabs @tab-click="handleClick">
        <el-tab-pane label="查看案例" name="case" class="case" >
          <div class="wrapper" v-for="(item, index) in caseData">
            <div class="title-line"><span class="title font18">案例
              {{ index+1 | numToCn}}</span></div>
            <div class="content-line">
              <div class="line">
                <span class="key inline-block pull-left">案例名称：</span>
                <div class="value inline-block">{{item.fdName}}</div>
              </div>
              <div class="line">
                <span class="key inline-block pull-left">链接地址：</span>
                <div class="value inline-block">{{item.fdLink}}</div>
              </div>
              <div class="line">
                <span class="key inline-block pull-left">案例介绍：</span>
                <div class="value inline-block">{{item.fdDesc}}</div>
              </div>
              <div class="line">
                <span class="key inline-block pull-left">案例图片：</span>
                <div class="value inline-block">
                  <img :src="img.url" alt="案例图片" v-for="img in item.fdAtt" class="case-img"/>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="查看评论" name="comment" class="comment">
          <div class="wrapper">
            <div class="title-line">
              <span class="font18">评论</span>
            </div>
            <div class="rate-panel clearfix">
              <div class="first inline-block pull-left">
                <p class="bold color-primary">{{abstractData.star}}分</p>
                <el-rate
                  v-model="abstractData.star"
                  disabled>
                </el-rate>
              </div>
              <div class="second inline-block pull-left text-center">
                <div>
                  <span class="key">服务态度：</span>
                  <el-rate
                    v-model="abstractData.serverStar"
                    disabled class="inline-block">
                  </el-rate>{{abstractData.serverStar}}分
                </div>
                <div>
                  <span class="key">工作速度：</span>
                  <el-rate
                    v-model="abstractData.workStar"
                    disabled class="inline-block">
                  </el-rate>{{abstractData.workStar}}分
                </div>
                <div>
                  <span class="key">完成质量：</span>
                  <el-rate
                    v-model="abstractData.finishStar"
                    disabled class="inline-block">
                  </el-rate>{{abstractData.fdFinishStar}}分
                </div>
              </div>
              <div class="third inline-block pull-left ">
                <div class="wrapper">
                  <p class="color-primary">对他的印象</p>
                  <div class="inline-block label" v-for="item in abstractData.express">{{item.text}}<span class="num color-primary">{{item.num}}</span></div>
                </div>
              </div>
            </div>

            <ul class="comment-list" v-loading.body="commentLoading" element-loading-text="拼命加载中">
              <li v-for="item in commentData.list">
                <div class="item inline-block">
                  <el-rate
                    v-model="item.fdStar"
                    disabled class="inline-block vertical-middle">
                  </el-rate>
                  好评
                </div>
                <div class="item inline-block date pull-right">
                  <span>{{item.fdName}}</span>
                  <span class="time pull-right">{{item.createdDate | dateToTime}}前</span>
                </div>
                <div class="item inline-block amount pull-right">
                  <span class="key">交易金额：</span>
                  <span class="value">￥400</span>
                </div>
                <div>
                  <p>{{item.fdContent}}</p>
                </div>
              </li>
            </ul>
            <el-pagination
              class="pull-right mt10"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="itemTotal"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 案例 评论 结束 -->
  </div>
</template>
<script>
import { Rate } from 'element-ui'
export default {
  created () {
    this.id = this.$route.params.id
    this.loading = true
    axios.all([
      this.fetchProductData(),
      this.fetchCaseData(),
      this.fetchAbstract()]
    ).finally(() => {
      this.loading = false
    })
  },
  data () {
    return {
      id: 0,
      loading: false,
      commentLoading: false,
      pageIndex: 1,
      pageSize: 8,
      itemTotal: 0,
      productData: {},
      caseData: [],
      commentData: {},
      abstractData: {},
      toggle: false,
      height: 20
    }
  },
  methods: {
    fetchProductData (params) {
      return this.$http.get(`/writer/${this.id}`).then((resp) => {
        this.productData = resp.data
      })
    },
    fetchCaseData (params) {
      return this.$http.get(`/writer/${this.id}/article/list`, {params})
      .then((resp) => {
        this.caseData = resp.data.data
      })
    },
    fetchAbstract (params) {
      this.$http.get(`/comments/writer/${this.id}/comment/abstract`, {params})
        .then((resp) => {
          var data = resp.data
          this.abstractData = {
            'star': data.fdStar,
            'serverStar': data.fdServerStar,
            'workStar': data.fdWorkStar,
            'finishStar': data.fdFinishStar,
            'express': data.fdExpress
          }
        })
    },
    fetchCommentData (params) {
      this.commentLoading = true
      this.$http.get(`/comments/writer/comment/list`, {params})
      .then((resp) => {
        var data = resp.data
        this.commentData = {
          'star': data.fdStar,
          'serverStar': data.fdServerStar,
          'workStar': data.fdWorkStar,
          'finishStar': data.fdFinishStar,
          'express': data.fdExpress,
          'list': data.list
        }
        this.itemTotal = resp.data.total
      }).finally(() => {
        this.commentLoading = false
      })
    },
    handleClick (tab, event) {
      var className = tab.$el.className
      if (className === 'el-tab-pane comment') {
        this.fetchCommentData()
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageIndex = val
    }
  },
  watch: {
    pageIndex (newValue, oldValue) {
      var params = {
        pageIndex: newValue
      }
      this.fetchCommentData(params)
    }
  },
  filters: {
    numToCn: function (value) {
      var arabToCn = {
        '1': '一',
        '2': '二',
        '3': '三',
        '4': '四',
        '5': '五',
        '6': '六',
        '7': '七',
        '8': '八',
        '9': '九'
      }
      var classifier = ['十', '百', '千', '万', '十万', '百万', '千万']
      var array = String(value).split('')
      var newString = ''
      for (var i = 0; i < array.length; i++) {
        if (classifier[array.length - i - 2] === undefined) {
          newString = newString + arabToCn[array[i]]
        } else {
          newString = newString + arabToCn[array[i]] + classifier[array.length - i - 2]
        }
      }
      return newString
    },
    dateToTime: function (value) {
      var past = new Date(value)
      var now = new Date()
      var delta = Math.floor((now - past) / (24 * 3600 * 1000))
      if (delta <= 31) {
        delta = delta + '天'
      } else if (delta > 31 && delta <= 365) {
        delta = Math.floor(delta / 30) + '月'
      } else {
        delta = Math.floor(delta / 365) + '年'
      }
      return delta
    }
  },
  components: {
    [Rate.name]: Rate
  }
}

</script>
<style lang="less" scoped>
@import '../../assets/styles/detail.less';
</style>
