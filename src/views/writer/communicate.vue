<template>
  <div class="communicate"
  v-loading.fullscreen="loading"
  element-loading-text="正在拼命加载中"
  >
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
    <c-steps :text="['买家选标', '卖家执行并上传内容', '买家确认收货', '买家评价']" :cur="2"></c-steps>
    <!-- 步骤 结束 -->
    <!-- 订单信息 开始 -->
    <c-order-info :order="order" class="container"></c-order-info>
    <!-- 订单信息 结束 -->
    <!-- 商品信息 开始 -->
    <div class="container pro-info-block">
      <div class="width1150">
        <span class="title font18">商品信息</span>
        <c-toggle
           class="more pull-right"
           v-model="toggle"
           :text="['展开', '收起']"
           color="#008aff"
           :icon="['icon-xiangxia', 'icon-xiangshang']"
         ></c-toggle>
      </div>
      <table
        class="pro-info-table text-center width1150" :class="{'hide': toggle}">
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
            <td>{{ product.fdArticleCount }}</td>
            <td>￥{{ product.fdPrice }}</td>
            <td>{{ product.fdStatusValue }}</td>
            <td class="see-copy-td">
              <el-button type="text"
                class="blue-link block see-copy"
                @click="viewCopy()"
                :loading="viewCopyFlag"
                >
                查看文案
                <span class="new inline-block">
                  有更新
                </span>
              </el-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 商品信息 结束 -->
    <!-- 沟通内容 开始 -->
    <div class="communicate-block container">
      <div class="width1150">
        <span class="font18">沟通内容</span>
        <div class="inline-block tips">
          温馨提示：
          <span class="color-hover">
            直接联系很方便，关键信息注意保留证据，平台沟通记录作为解决问题的唯一凭证。
          </span>
        </div>
      </div>
      <div class="content width1150">
        <div
          class="msg-list-block"
          id="msg-list-block"
          :class="{ 'show': msgToggle }"
          :style="{ 'height': msgToggle ? heightAfter+'px' : heightBefore+'px' }"
          v-loading.body="msgLoading"
          element-loading-text="正在拼命加载中">
          <ul class="msg-list" id="msg-list">
            <li v-for="item in msgData.data" name="msg-li">
              <div class="media">
                <a href="javascript:;" class="media-left pull-left">
                  <img src="assets/img/example/portrait_02.png" alt="" v-if="item.createdBy != id"/>
                  <img src="assets/img/example/portrait.jpg" alt="" v-else/>
                </a>
                <div class="media-body pull-right">
                  <a class="buyer font14" href="javascript:;">
                    {{item.createdBy!=id ? '卖家' : '我'}}
                  </a>
                  <span class="date pull-right">{{item.createdDate}}</span>
                  <p class="font14 msg">{{item.fdMessage}} </p>
                  <div class="attachment" v-if="item.fdAtt.length != 0">
                    附件：
                    <div v-for="att in item.fdAtt" class="att">
                      <a href="att.url">{{ att.name }}</a>
                      <span>{{ att.url }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
         <div class="send-area">
           <c-toggle
              :class="{'hide': !show}"
              @click.native.once="seeAll"
              class="more pull-right clearfix toggle"
              v-model="msgToggle"
              :text="['收起', '查看全部']"
              color="#008aff"
              :icon="['icon-xiangshang', 'icon-xiangxia']"
            ></c-toggle>
            <div class="wrapper clearfix" v-if="product.fdStatusValue != '已结束'">
              <el-form name="" method="" :model="form" :rules="rules" ref="form">
                <el-form-item prop="msg">
                  <el-input type="textarea" v-model="form.msg"></el-input>
                </el-form-item>
                <div class="btn-line clearfix">
                  <c-uploader
                    :onComplete="uploadComplete"
                    :onUpload="uploadStart"
                    :onError="uploadError"
                  >
                  <el-button size="small" class="upload-btn" :loading="uploadLoading">上传附件</el-button>
                  </c-uploader>
                  <el-button
                    class="submit-btn pull-right"
                    @click="submitForm"
                    :loading="submitLoading"
                  >提交</el-button>
                  <c-upload-preview v-model="form.attachment" class="mt10"></c-upload-preview>
                </div>
              </el-form>
            </div>
         </div>
      </div>
    </div>
    <!-- 沟通内容 结束 -->
    <c-view-copy
      :copy="dialogCopyData"
      v-model="copyDialogVisible"
    ></c-view-copy>
  </div>
</template>
<script>
import CUploader from 'components/CUploader'
import CUploadPreview from 'components/CUploadPreview'
import CViewCopy from 'components/writer/CViewCopy'
import COrderInfo from 'components/writer/COrderInfo'
export default {
  created () {
    this.orderItemId = this.$route.params.orderItemId
    this.orderId = this.$route.params.orderId
    this.loading = true
    axios.all([this.fetchOrderData(), this.fetchProductData()])
    .catch((e) => {
      this.$message.error('服务器繁忙，请重新加载...')
    }).finally(() => {
      this.loading = false
    })
    this.fectchMessageData()
  },
  data () {
    return {
      order: {},
      product: {},
      msgData: {},
      dialogCopyData: [],
      show: true, // 控制输入框的隐藏
      copyFetched: false,
      viewCopyFlag: false,
      msgLoading: false,
      loading: false,
      toggle: false,
      msgToggle: false,
      copyDialogVisible: false,
      heightBefore: 0,
      heightAfter: 0,
      pageIndex: 1,
      pageSize: 8,
      itemTotal: 0,
      id: 1,
      orderId: 1,
      orderItemId: 1,
      form: {
        msg: '',
        attachment: []
      },
      rules: {
        msg: [
          {required: true, message: '请填写沟通内容', trigger: 'blur'}
        ]
      },
      submitLoading: false,
      uploadLoading: false,
      messageCount: 4
    }
  },
  methods: {
    fetchOrderData (params) {
      return this.$http.get(`/writerOrder/wrorder/${this.orderId}`, {params})
      .then((resp) => {
        this.order = resp.data
      })
    },
    fetchProductData (params) {
      return this.$http.get(`/wrorderItem/${this.orderItemId}`, {params})
      .then((resp) => {
        this.product = resp.data
      })
    },
    fectchMessageData () {
      this.msgLoading = true
      let params = {
        s_wrorderItemId: this.orderItemId,
        pageSize: this.messageCount
      }
      this.$http.get('/writerOrderItemMessage/wrorderItem/message/list', {params})
      .then((resp) => {
        this.msgData = resp.data
        if (this.msgData.data.length <= 4) {
          this.show = false
        } else {
          this.show = true
        }
        this.itemTotal = resp.data.itemTotal
        this.$nextTick(() => {
          this.getHeight()
        })
      }).finally(() => {
        this.msgLoading = false
      })
    },
    viewCopy () {
      if (this.copyFetched) {
        this.copyDialogVisible = !this.copyDialogVisible
      } else {
        this.viewCopyFlag = true
        this.$http.get(
          '/writerOrderItemArticle/wrorderItem/articles',
          {params: {s_wrorderItemId: this.orderItemId}}
        ).then((resp) => {
          this.dialogCopyData = resp.data.data
          this.copyDialogVisible = true
        }).finally(() => {
          this.viewCopyFlag = false
          this.copyFetched = true
        })
      }
    },
    seeAll () {
      this.getHeight()
      this.messageCount = 1000
      this.fectchMessageData()
    },
    getHeight () {
      var msgLi = document.getElementsByName('msg-li')
      this.heightBefore = 0
      this.heightAfter = 0

      for (var i = 0; i < msgLi.length; i++) {
        if (i <= 3) {
          this.heightBefore = this.heightBefore + msgLi[i].offsetHeight
        }
        this.heightAfter = this.heightAfter + msgLi[i].offsetHeight
      }
      this.heightAfter = this.heightAfter + 40
    },
    uploadComplete (resp) {
      if (resp.success) {
        this.form.attachment.push(resp.files[0])
      }
      this.uploadLoading = false
    },
    uploadStart (id, fileName) {
      this.uploadLoading = true
    },
    uploadError (id, fileName, reason, xhr) {
      this.$message.error('附件上传失败...')
      console.error(reason)
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            fdMessage: this.form.msg,
            fdAtt: this.form.attachment
          }
          this.submitLoading = true
          this.$http.post(`/writerOrderItemMessage/wrorderItem/${this.orderItemId}/message`, params)
          .then((resp) => {
            this.msgData.data.push(resp.data)
            if (this.msgData.data.length <= 4) {
              this.show = false
            } else {
              this.show = true
            }
            this.$nextTick(() => {
              this.getHeight()
            })
            this.form = {
              msg: '',
              attachment: []
            }
          }).finally(() => {
            this.submitLoading = false
          })
        } else {
          return false
        }
      })
    }
  },
  components: {
    CUploader,
    CUploadPreview,
    CViewCopy,
    COrderInfo
  }
}

</script>
<style lang="less" scoped>
@import "../../assets/styles/communicate.less";
</style>
<style lang="less">
.send-area .el-textarea__inner {
  width: 936px !important;
  margin: auto;
  height: 120px;
  display: block;
  border: none;
}
.send-area .el-form-item__error {
  left: 35px;
}
</style>
