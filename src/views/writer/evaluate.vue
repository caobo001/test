<template>
  <div class="evaluate" v-loading="loading">
    <!-- 当前位置 开始 -->
    <c-breadcrumb :routers="[
      {
        name: 'home',
        text: '买家中心'
      },{
        name: 'order-list',
        text: '文案标单'
      },{
        name: 'order-detail',
        text: '标单详情'
      }
    ]">
    </c-breadcrumb>
    <!-- 当前位置 结束 -->
    <!-- 步骤 开始 -->
    <c-steps :text="['买家选标', '卖家执行并上传内容', '买家确认收货', '买家评价']" :cur="4"></c-steps>
    <!-- 步骤 结束 -->
    <!-- 评价区域 开始 -->
    <div class="evaluate-block container">
      <div class="width1150">
        <span class="font18">评价</span>
        <table
          class="pro-info-table text-center width1150">
          <thead>
            <tr>
              <th>商品信息</th>
              <th>写作类型</th>
              <th>联系方式</th>
              <th>竞标时间</th>
              <th>执行篇数</th>
              <th>赏金</th>
              <th>状态</th>
              <th>文案内容</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="brief-td">
                <div class="bidden-label inline-block"><span class="text font14">中标</span></div>
                <div class="media">
                  <a href="javascript:;" class="media-left">
                    <img :src="product.fdImage ? product.fdImage.url: ''" />
                  </a>
                  <div class="media-body">
                    <h4 class="media-heading ellipsis text-left">{{ product.fdName }}</h4>
                    <p class="ellipsis abstract text-left">{{ product.fdAbstract }}</p>
                  </div>
                </div>
              </td>
              <td>{{ product.fdWriterTypeValue }}</td>
              <td>{{ product.fdMobile }}</td>
              <td>{{ product.fdWinBidTime }}</td>
              <td>{{ product.fdWinBitCount }}</td>
              <td>￥{{ product.fdPrice }}</td>
              <td>{{ product.fdStatusValue }}</td>
              <td class="see-copy-td">
                <el-button type="text"
                  class="blue-link block see-copy"
                  @click="viewCopy()"
                  :disabled="viewCopyFlag"
                  :loading="viewCopyFlag"
                  >
                  查看文案
                  <span class="new inline-block">
                    有更新
                  </span>
                </el-button>
              </td>
            </tr>
            <c-view-copy
              :copy="copyData"
              :colspan="8"
              :toggle="viewCopyToggle">
            </c-view-copy>
            <tr>
              <td colspan="8" class="evaluate-td">
                <div class="evaluate-content">
                  <div class="width1000">
                    <div class="top-line text-center">
                      <div class="media inline-block">
                        <div class="media-left pull-left">
                          <i class="success-icon iconfont icon-chenggong2"></i>
                        </div>
                        <div class="media-body text-left">
                          <h4 class="media-heading">交易成功</h4>
                          <p>
                            卖家将收到您的货款
                          </p>
                        </div>
                      </div>
                    </div>
                    <hr size="1"/>
                    <div class="comprehensive text-left pull-left">
                      综合得分 <span class="color-primary font16">{{star}}分</span>
                      <el-rate
                        :disabled="disabled"
                        v-model="star">
                      </el-rate>
                    </div>
                    <div class="impress pull-left text-left clearfix">
                      <span class="color-primary key">对他的印象</span>
                      <ul class="impress-list">
                        <li class="pull-left">好评<span class="color-primary num">10</span></li>
                        <li class="pull-left">不错<span class="color-primary num">10</span></li>
                        <li class="pull-left">服务周到<span class="color-primary num">10</span></li>
                        <li class="pull-left">质量很高<span class="color-primary num">10</span></li>
                        <li class="pull-left">性价比高<span class="color-primary num">10</span></li>
                        <li class="pull-left">严谨认真<span class="color-primary num">10</span></li>
                        <li class="pull-left">态度不好<span class="color-primary num">10</span></li>
                      </ul>
                    </div>
                    <hr size="1" class="clearfix" />
                    <div class="comment text-left inline-block pull-left">
                      <span class="font16">评论</span>
                      <span class="tips">其他买家，需要你的建议哦！</span>
                      <p :class="{'hide': !disabled}">
                        {{ content }}
                      </p>
                      <el-input
                        v-model="content"
                        type="textarea"
                        class="textarea"
                        :class="{'hide': disabled}"
                        :disabled="disabled"
                      >
                      </el-input>
                    </div>
                    <ul class="rate-list pull-left text-left">
                      <li>
                        <span>服务态度：</span>
                        <el-rate
                          class="inline-block"
                          :disabled="disabled"
                          v-model="serverStar"
                          :texts="['1分 极差', '2分 失望', '3分 一般', '4分 满意', '5分 惊喜']"
                          show-text>
                        </el-rate>
                        <span v-if="disabled">{{ serverStar | numToCn }}</span>
                      </li>
                      <li>
                        <span>工作速度：</span>
                        <el-rate
                          class="inline-block"
                          :disabled="disabled"
                          v-model="workStar"
                          :texts="['1分 极差', '2分 失望', '3分 一般', '4分 满意', '5分 惊喜']"
                          show-text>
                        </el-rate>
                        <span v-if="disabled">{{ workStar | numToCn }}</span>
                      </li>
                      <li>
                        <span>完成质量：</span>
                        <el-rate
                          class="inline-block"
                          :disabled="disabled"
                          v-model="finishStar"
                          :texts="['1分 极差', '2分 失望', '3分 一般', '4分 满意', '5分 惊喜']"
                          show-text>
                        </el-rate>
                        <span v-if="disabled">{{ finishStar | numToCn }}</span>
                      </li>
                    </ul>
                    <div class="clearfix"></div>
                    <hr size="1" :class="{'hide': disabled}"/>
                    <el-button
                      type="primary"
                      class="submit-btn"
                      :class="{'hide': disabled}"
                      @click="submit()"
                      :loading="submitLoading">
                      提交评价
                    </el-button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 评价区域 结束 -->
  </div>
</template>
<script>
import { Rate } from 'element-ui'
import CViewCopy from 'components/writer/CViewCopy'
export default {
  created () {
    this.fetchProductData()
    this.fetchComment()
  },
  data () {
    return {
      star: 5,
      serverStar: 5,
      workStar: 5,
      finishStar: 5,
      content: '',
      disabled: false,
      loading: false,
      submitLoading: false,
      copyFetched: false,
      viewCopyToggle: false,
      viewCopyFlag: false,
      product: {},
      copyData: [],
      orderItemId: this.$route.params.orderItemId
    }
  },
  methods: {
    fetchProductData (params) {
      this.loading = true
      return this.$http.get(`/wrorderItem/${this.orderItemId}`, {params})
      .then((resp) => {
        this.product = resp.data
      }).finally(() => {
        this.loading = false
      })
    },
    fetchComment (params) {
      this.$http.get(`/comments/wrorderItem/${this.orderItemId}/comment`, {params})
      .then((resp) => {
        this.star = resp.data.fdStar === undefined ? 5 : parseInt(resp.data.fdStar)
        this.serverStar = resp.data.fdServerStar === undefined ? 5 : parseInt(resp.data.fdServerStar)
        this.workStar = resp.data.fdWorkStar === undefined ? 5 : parseInt(resp.data.fdWorkStar)
        this.finishStar = resp.data.fdFinishStar === undefined ? 5 : parseInt(resp.data.fdFinishStar)
        this.content = resp.data.fdContent
        if (this.content === '' || this.content === undefined) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      })
    },
    viewCopy () {
      if (this.copyFetched) {
        this.viewCopyToggle = !this.viewCopyToggle
      } else {
        this.viewCopyFlag = true
        this.$http.get(
          '/writerOrderItemArticle/wrorderItem/articles',
          {params: {s_wrorderItemId: this.orderItemId}}
        ).then((resp) => {
          this.copyData = resp.data.data
        }).finally(() => {
          this.viewCopyFlag = false
          this.copyFetched = true
          this.viewCopyToggle = true
        })
      }
    },
    submit () {
      var valid = true
      if (this.trim(this.content).length === 0 || this.trim(this.content) === ' ') {
        this.$message.error('请填写评价内容！')
        valid = false
      }
      if (valid) {
        var params = {
          'fdContent': this.content,
          'fdStar': this.star,
          'fdServerStar': this.serverStar,
          'fdWorkStar': this.workStar,
          'fdFinishStar': this.finishStar
        }
        this.submitLoading = true
        this.$http.post(`/comments/wrorderItem/${this.orderItemId}/comment`, params)
        .then((resp) => {
          this.disabled = true
          this.$message.success('评价成功！')
        }).finally(() => {
          this.submitLoading = false
        })
      }
    },
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)/g, ' ')
    }
  },
  filters: {
    numToCn (value) {
      const valueS = value + ''
      const text = {
        '1': '分 极差',
        '2': '分 失望',
        '3': '分 一般',
        '4': '分 满意',
        '5': '分 惊喜'
      }
      return text[valueS]
    }
  },
  components: {
    CViewCopy,
    [Rate.name]: Rate
  }
}

</script>
<style lang="less" scoped>
@import "../../assets/styles/evaluate.less";
@import "../../assets/styles/proInfoTable.less";
</style>
<style lang="less">
@import "../../assets/styles/variables.less";
.evaluate .el-textarea__inner {
  width: 100%;
  height: 138px;
  border: 1px solid @color-border;
  border-radius: 4px;
  padding: 10px;
}

</style>
