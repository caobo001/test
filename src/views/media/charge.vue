<template>
  <div class="page-charge">
    <c-title title="我要充值"></c-title>
    <div class="container clearfix">
      <c-menu class="pull-left mt10"></c-menu>
      <div class="container-right pull-right mt10">
        <h2 class="container-right-title">我要充值</h2>
        <el-form ref="form" :model="form" class="charge mt10" label-width="100px">
          <el-form-item label="充值账户">
            {{account.fdUsename}}
          </el-form-item>
          <el-form-item label="充值金额">
            <el-input-number v-model="form.amount" :controls="false" :min="0"></el-input-number>
            <span class="vertical-top ml10">元</span>
          </el-form-item>
          <el-form-item label="充值方式">
            <el-radio-group v-model="form.payMethod">
              <el-radio label="alipay">
                <img src="../../assets/img/charge_alipay.jpg" class="vertical-middle mr30" alt="支付宝">
              </el-radio>
              <el-radio label="upacp">
                <img src="../../assets/img/charge_upacp.jpg" class="vertical-middle" alt="银联">
              </el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item>
            <el-button
              class="mt30"
              type="primary"
              @click="submit"
              :disabled="form.amount === 0"
              size="large">立即充值</el-button>
          </el-form-item>

        </el-form>

      </div>
    </div>
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
import { InputNumber, Radio, RadioGroup } from 'element-ui'
import pingpp from 'pingpp-js'

export default {
  title () {
    return '我要充值'
  },
  data () {
    return {
      form: {
        amount: 0,
        payMethod: 'alipay'
      }
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    }
  },
  methods: {
    submit () {
      this.$http.get('/payment/apply', {params: {
        channel: this.form.payMethod,
        amount: this.form.amount
      }}).then(resp => {
        pingpp.createPayment(resp.data, (result, err) => {
          console.error(`${result} ${err.msg} ${err.extra}`)
          this.$message.error('支付失败，请稍候再试...')
        })
      })
    }
  },
  components: {
    [InputNumber.name]: InputNumber,
    [Radio.name]: Radio,
    [RadioGroup.name]: RadioGroup,
    CTitle
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
.page-charge {
  background-color: @color-bg;
}
.container-right {
  width: @width-content-right;
  float: right;
}
.charge {
  padding: 35px 65px;
  background: #fff;
}

</style>
<style lang="less">
.page-charge {
  .el-form-item__content {
    padding-left: 30px;
  }
}
</style>
