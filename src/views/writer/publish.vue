<template>
  <div class="page page-publish">
    <!-- 当前位置 开始 -->
    <c-breadcrumb
      :routers="[
        {
          name: 'home',
          text: '买家中心'
        },{
          name: 'publish',
          text: '发布需求'
        }
      ]"
      backgroundColor="#eeeeee"
    >
    </c-breadcrumb>
    <!-- 当前位置 结束 -->
    <div class="container">

      <el-form class="form" :model="form" :rules="rules" ref="form" label-width="100px">

        <el-form-item label="招标类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio :label="1">公开招标</el-radio>
            <el-radio :label="2">指定招标</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="写作类型" prop="writerType">
          <el-radio-group v-model="form.writerType">
            <el-radio :label="2">微信</el-radio>
            <el-radio :label="1">微博</el-radio>
            <el-radio :label="3">其他</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="标单名称" prop="name">
          <el-input v-model="form.name" placeholder="可输入 4 - 20 个字符"></el-input>
        </el-form-item>

        <el-form-item label="行业类型" prop="trades">
           <el-select v-model="form.trades" placeholder="请选择">
            <el-option
              v-for="item in optTrades"
              :value="item.text">
            </el-option>
           </el-select>
        </el-form-item>

        <el-form-item label="文案篇数" prop="articleCount">
          <el-input-number v-model="form.articleCount" :min="1" :max="10"></el-input-number>
        </el-form-item>

        <el-form-item label="赏金" prop="price" v-show="form.type == 1">
          <el-input-number v-model="form.price" :min="100" :controls="false" ></el-input-number>
        </el-form-item>

        <el-form-item label="字数要求" prop="wordCount">
          <el-radio-group v-model="form.wordCount">
            <el-radio label="0-1000000">不限</el-radio>
            <el-radio label="0-300">300 以内</el-radio>
            <el-radio label="300-1000">300 - 1000</el-radio>
            <el-radio label="1000-2000">1000 - 2000</el-radio>
            <el-radio label="2000-1000000">2000 以上</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="截标时间" prop="bidEndTime">
          <el-date-picker
            v-model="form.bidEndTime"
            type="datetime"
            :editable="false"
            format="yyyy-MM-dd HH:mm"
            :picker-options="{disabledDate: bidEndTimeDisabledDate}"
            placeholder="卖家参与竞标的截止时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="截稿时间" prop="articleEndTime">
          <el-date-picker
            v-model="form.articleEndTime"
            type="datetime"
            :editable="false"
            format="yyyy-MM-dd HH:mm"
            :picker-options="{disabledDate: articleEndTimeDisabledDate}"
            placeholder="卖家上传文案的截止时间">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="联系方式" prop="canContact">
          <el-checkbox v-model="form.canContact">公开</el-checkbox>
        </el-form-item>

        <el-form-item label="详细要求" prop="desc">
          <el-input v-model="form.desc" type="textarea" placeholder="文案的详细要求"></el-input>
        </el-form-item>

        <el-form-item label="附件">
          <c-uploader
            :onComplete="uploadComplete"
            :onUpload="uploadStart"
            :onError="uploadError"
          >
           <el-button :loading="uploadLoading">上传图片</el-button>
          </c-uploader>
        </el-form-item>

        <el-form-item>
          <c-upload-preview v-model="form.attachment"></c-upload-preview>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="agreeWithTheTerms">同意</el-checkbox>
          <a href="javascript:">《广而易服务协议》</a>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
            :loading="submitLoading"
            size="large"
          >确认发布</el-button>
        </el-form-item>

      </el-form>

    </div>

    <c-payment v-model="dialogVisible" :action="payment"></c-payment>

  </div>
</template>

<script>
import {
  InputNumber,
  Radio,
  RadioGroup,
  DatePicker
} from 'element-ui'
import CUploader from 'components/CUploader'
import CUploadPreview from 'components/CUploadPreview'
import CPayment from 'components/writer/CPayment'
import { mapActions } from 'vuex'

export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      if (from.name === 'cart') {
        vm.form.type = 2
      }
    })
  },
  created () {
    if (this.optTrades.length === 0) {
      this.$store.dispatch('fetchTrades')
    }
  },
  data () {
    return {
      orderId: null,
      form: {
        type: 1,
        writerType: 2,
        name: '',
        trades: '',
        articleCount: '',
        price: '',
        wordCount: '0-1000000',
        bidEndTime: '',
        articleEndTime: '',
        canContact: false,
        desc: '',
        attachment: []
      },
      paymentForm: {
        passwd: ''
      },
      rules: {
        type: [{ type: 'number', required: true, message: '请选择招标类型', trigger: 'change' }],
        writerType: [{ type: 'number', required: true, message: '请选择写作类型', trigger: 'change' }],
        name: [
          { required: true, message: '请选择标单名称', trigger: 'blur' },
          { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        trades: [{ required: true, message: '请选择行业类型', trigger: 'change' }],
        articleCount: [{ type: 'number', required: true, message: '请选择文案篇数', trigger: 'blur' }],
        price: [{ type: 'number', required: true, message: '请输入招标赏金', trigger: 'blur' }],
        wordCount: [{ required: true, message: '请选择字数要求', trigger: 'change' }],
        bidEndTime: [{ type: 'date', required: true, message: '请选择截标时间', trigger: 'change' }],
        articleEndTime: [{ type: 'date', required: true, message: '请选择截稿时间', trigger: 'change' }]
      },
      paymentRule: {
        passwd: [
          { required: true, message: '请输入支付密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 位', trigger: 'blur' }
        ]
      },
      agreeWithTheTerms: true,
      uploadLoading: false,
      submitLoading: false,
      dialogVisible: false,
      paymentLoading: false
    }
  },
  computed: {
    optTrades () {
      return this.$store.state.trades
    }
  },
  methods: {
    ...mapActions(['savePrivateOrder', 'savePaidOrder']),
    bidEndTimeDisabledDate (time) {
      return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
    },
    articleEndTimeDisabledDate (time) {
      let bidEndTime = this.form.bidEndTime ? this.form.bidEndTime : (new Date())
      return time.getTime() < bidEndTime.getTime() - 1000 * 60 * 60 * 24
    },
    formatTime (date) {
      function formatNumber (n) {
        n = n.toString()
        return n[1] ? n : '0' + n
      }

      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()

      var hour = date.getHours()
      var minute = date.getMinutes()
      var second = date.getSeconds()

      return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    },
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let params = {
            fdType: this.form.type,
            fdWriterType: this.form.writerType,
            fdName: this.form.name,
            fdTrades: this.form.trades,
            fdArticleCount: this.form.articleCount,
            fdWordCount: this.form.wordCount,
            fdBidEndTime: this.formatTime(new Date(this.form.bidEndTime)),
            fdArticleEndTime: this.formatTime(new Date(this.form.articleEndTime)),
            fdCanContact: this.form.canContact,
            fdDesc: this.form.desc,
            fdAtt: this.form.attachment
          }
          if (params.fdType === 1) {
            params.fdPrice = this.form.price
          }
          if (this.orderId) {
            params.id = this.orderId
          }

          this.submitLoading = true

          this.$http.post('/writerOrder/wrorder', params).then((resp) => {
            this.orderId = resp.data.fdWriteOrderId
            if (params.fdType === 1) {
              this.dialogVisible = true
            } else {
              this.savePrivateOrder({
                id: resp.data.fdWriteOrderId,
                trade: this.form.trades,
                writerType: this.form.writerType
              })
              this.$router.push({name: 'cart-pick'})
            }
          }).finally(() => {
            this.submitLoading = false
          })
        } else {
          return false
        }
      })
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
    payment (passwd) {
      let params = {
        fdPayPassword: passwd
      }
      return this.$http.post(
        `/writerOrder/wrorder/${this.orderId}/payment/public`,
        params
      ).then((resp) => {
        return this.savePaidOrder(resp.data)
      }).then(() => {
        this.$router.push({name: 'purchased'})
      })
    }
  },

  components: {
    CUploader,
    CUploadPreview,
    CPayment,
    [InputNumber.name]: InputNumber,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    [DatePicker.name]: DatePicker
  }

}

</script>

<style lang="less" scoped>
.page-publish {
  padding-top: 0;
  background: white;
}

.form {
  margin: 85px auto;
  width: 800px;
}

.el-date-editor.el-input {
  width: 200px;
}

</style>

<style lang="less">
.page-publish {
  .el-form-item__label {
    padding-right: 30px;
  }

}
</style>
