<template>
  <div class="receipt" v-loading="loading" element-loading-text="正在拼命加载中">
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
    <c-steps :text="['买家选标', '卖家执行并上传内容', '买家确认收货', '买家评价']" :cur="3"></c-steps>
    <!-- 步骤 结束 -->
    <!-- 确认收货 开始 -->
    <div class="receipt-block container">
      <div class="width1150">
        <span class="title font18">确认收货</span>
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
                    <p class="ellipsis-two abstract text-left">{{ product.fdAbstract }}</p>
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
                  class="blue-link block see-copy el-button-blue-text"
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
              <td colspan="8">
                <el-form :model="form" :rules="rules" ref="form">
                  <el-form-item label="请输入支付密码" prop="payPwd" class="text-center pwd-line">
                    <p class="color-primary tips">
                      请收到内容后，再确认收货！否则您可能钱货两空！
                    </p>
                    <el-input type="password" v-model="form.payPwd" placeholder="请输入支付密码"></el-input>
                  </el-form-item>
                  <el-form-item label=" " class="text-center" >

                    <p v-if="!!product.fdComplaintStatus">
                      注：确认收货后视为放弃之前对该订单项的投诉
                    </p>

                    <el-button
                      class="el-button-confirm"
                      type="primary"
                      @click="submitForm()"
                      :loading="submitLoading"
                      >
                      确认
                    </el-button>
                    <el-button @click="resetForm()" class="el-button-cancel">重置</el-button>
                  </el-form-item>
                </el-form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- 确认收货 结束 -->
  </div>
</template>
<script>
import CViewCopy from 'components/writer/CViewCopy'
export default {
  created () {
    this.orderItemId = this.$route.params.orderItemId
    this.fetchProductData()
  },
  data () {
    var validatePayPwd = (rule, value, callback) => {
      if (this.trim(value).length === 0) {
        callback(new Error('请输入支付密码'))
      } else if (this.trim(value).length < 6) {
        callback(new Error('请输入至少6位密码'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      submitLoading: false,
      copyFetched: false,
      viewCopyToggle: false,
      viewCopyFlag: false,
      product: {},
      copyData: [],
      orderItemId: 1,
      form: {
        payPwd: ''
      },
      rules: {
        payPwd: [
          { validator: validatePayPwd, trigger: 'blur' }
        ]
      }
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
    viewCopy (params) {
      if (this.copyFetched) {
        this.viewCopyToggle = !this.viewCopyToggle
      } else {
        this.viewCopyFlag = true
        this.$http.get(`/writerOrderItemArticle/wrorderItem/articles?${this.orderItemId}`, {params})
        .then((resp) => {
          this.copyData = resp.data.data
        }).finally(() => {
          this.viewCopyFlag = false
          this.copyFetched = true
          this.viewCopyToggle = true
        })
      }
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitLoading = true
          this.$http.post(
            `/wrorderItem/${this.orderItemId}/confirm`,
            {fdPayPassword: this.form.payPwd}
          ).then((resp) => {
            if (resp.data.code !== 1) {
              this.$message.error('密码错误！')
            } else {
              this.$msgbox({
                title: '提示',
                message: '交易成功',
                closeOnClickModal: false
              }
              ).then(resp => {
                this.$router.go(-1)
              })
            }
          }).finally(() => {
            this.submitLoading = false
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs.form.resetFields()
    },
    trim (str) {
      return str.replace(/(^\s*)|(\s*$)/g, ' ')
    }
  },
  components: {
    CViewCopy
  }
}

</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
@import "../../assets/styles/proInfoTable.less";
.receipt-block {
  background-color: @color-white;
  padding: 30px 0px;
  margin-bottom: 100px;
}
.el-button-confirm,
.el-button-cancel {
  margin: auto 12px;
}
</style>
<style lang="less">
@import '../../assets/styles/variables.less';
.receipt .el-form {
  padding: 0px 0px 64px 0px;
}
.receipt  .el-form-item {
  width: 445px;
  margin: auto !important;
  .el-form-item__label {
    width: 110px;
    font-size: 14px;
    color: @color-font;
  }
}
.receipt .pwd-line {
  margin: 125px auto 90px auto !important;
  .el-form-item__content {
    .tips {
      position: absolute;
      top: -30px;
      left: 115px;
    }
    .el-input {
      width: 325px;
      .el-input__inner {
        border-radius: 0px;
      }
    }
    .el-form-item__error {
      left: 115px;
    }
  }
}
</style>
