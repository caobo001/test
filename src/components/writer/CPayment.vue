<template>
  <el-dialog v-model="dialogVisible" class="payment">
    <el-form :model="paymentForm" :rules="paymentRule" ref="paymentForm" label-position="top">
      <el-form-item label="请输入支付密码" prop="passwd">
        <el-input v-model="paymentForm.passwd" type="password"></el-input>
        <p class="font12">广而易为所有大客户提供信用款项，详情请咨询您的客服经理</p>
        <el-button
          type="primary"
          @click="submit"
          :loading="paymentLoading"
          size="large"
        >确认付款</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'CPayment',
  props: {
    value: {
      type: Boolean
    },
    action: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      paymentForm: {
        passwd: ''
      },
      paymentRule: {
        passwd: [
          { required: true, message: '请输入支付密码', trigger: 'blur' },
          { min: 6, max: 15, message: '密码长度在 6 到 15 位', trigger: 'blur' }
        ]
      },
      paymentLoading: false
    }
  },
  computed: {
    dialogVisible: {
      get () {
        return this.value
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  },

  methods: {
    submit () {
      this.$refs.paymentForm.validate((valid) => {
        if (valid) {
          this.paymentLoading = true
          this.action(this.paymentForm.passwd).finally(() => {
            this.paymentLoading = false
          })
        } else {
          return false
        }
      })
    }
  }
}

</script>
<style lang="less">
.payment {
  .el-dialog__body {
    padding: 80px 150px;
  }
  .el-dialog {
    width: 800px;
    transform: translateX(-400px);
    .el-input {
      width: 300px;
    }
    .el-button {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

</style>
