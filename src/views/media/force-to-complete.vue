<template>
  <div class="complete-info force-to-complete clearfix">
    <div class="container" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
        <div class="top">
          <img src="../../assets/img/logo-header.png" class="logo">
          <span class="dot"></span>
          <span class="title">完善信息</span>
        </div>

        <div class="tips">
          <div>
            <span class="color-primary">尊敬的用户</span>，
            您好！
          </div>
          <div>
            由于您的账号未通过手机验证，请您使用您常用的手机进行验证。
          </div>
        </div>

        <div class="grey-bg">
          <span class="title">手机验证</span>
        </div>

        <el-form :model="infoForm" :rules="infoRules" ref="infoForm" class="form">
          <el-form-item prop="tel" class="login-form-item">
            <i class="icon iconfont icon-tel left-icon vertical-middle"></i>
            <el-input
              icon="circle-close"
              :on-icon-click="deleteTel"
              v-model="infoForm.tel"
              type="text"
              class="login-pwd vertical-middle"
              placeholder="手机号码"></el-input>
          </el-form-item>

          <el-form-item prop="vcode" class="login-form-item validate-code">
            <el-input v-model="infoForm.vcode" type="text" class="validate-input inline-block pull-left" placeholder="短信验证码"></el-input>
            <el-button
              class="inline-block validate-btn pull-right font14"
              :disabled="countFlag"
              @click.native="fetchValidateCode">
              <span v-if="countFlag" class="downcount">{{downCount}}s</span>
              <span v-if="!countFlag">获取验证码</span>
            </el-button>
          </el-form-item>

          <el-form-item class="login-form-item">
            <el-input
              icon="circle-close"
              :on-icon-click="deleteRefCode"
              v-model="infoForm.refCode"
              type="text"
              class="login-pwd vertical-middle"
              placeholder="推荐码(可选)"></el-input>
          </el-form-item>
          <el-button type="primary" @click="submitForm('infoForm')" class="next-step-btn">下一步</el-button>
        </el-form>
    </div>
  </div>
</template>
<script>
export default {
  title () {
    return '完善信息'
  },
  mounted () {
    document.getElementsByTagName('body')[0].classList.add('display-none')
  },
  destroyed () {
    document.getElementsByTagName('body')[0].classList.remove('display-none')
  },
  data () {
    var vTel = (rule, value, callback) => {
      var reg = /^1(3|4|5|7|8)\d{9}$/
      if (!value) {
        callback(new Error('手机号码不能为空'))
      } else if (!reg.test(value)) {
        callback(new Error('手机号码格式不正确'))
      } else {
        callback()
      }
    }
    var vVcode = (rule, value, callback) => {
      if (!value) {
        callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      key: '',
      downCount: 120,
      countFlag: false,
      countInterval: null,
      infoForm: {
        refCode: '',
        tel: '',
        vcode: '',
        id: this.$store.state.account.id
      },
      infoRules: {
        tel: [
          { validator: vTel, trigger: 'blur' }
        ],
        vcode: [
          { validator: vVcode, trigger: 'blur' }
        ]
      },
      available: true
    }
  },
  computed: {
    params () {
      var obj = {
        fdMobile: this.infoForm.tel,
        id: this.infoForm.id,
        mobileCode: this.infoForm.vcode,
        fdReferralCode: this.infoForm.refCode
      }
      return obj
    }
  },
  watch: {
    '$store.state.account.id' (newValue) {
      this.infoForm.id = newValue
    }
  },
  methods: {
    deleteTel () {
      this.infoForm.tel = ''
    },
    deleteRefCode () {
      this.infoForm.refCode = ''
    },
    fetchValidateCode () {
      var reg = /^1(3|4|5|7|8)\d{9}$/
      if (this.infoForm.tel !== '' && reg.test(this.infoForm.tel)) {
        var params = {
          fdMobile: this.infoForm.tel,
          onlyFor: 205
        }
        this.$http.get('/message', {params}).then((resp) => {
          if (resp.data.code === 0) {
            this.$message.error(resp.data.content)
          } else if (resp.data.code === 1) {
            this.countFlag = true
            this.downCountFunc()
          }
        })
      }
    },
    downCountFunc () {
      this.downCount = 120
      clearInterval(this.countInterval)
      this.countInterval = setInterval(() => {
        this.downCount--
        if (this.downCount < 0) {
          this.countFlag = false
          this.downCount = 120
          clearInterval(this.countInterval)
        }
      }, 1000)
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put('/account/evpi/fdMobile', this.params).then((resp) => {
            console.log('ddd')
            this.countFlag = false
            this.downCount = 120
            clearInterval(this.countInterval)
            var code = resp.data.code
            if (code === 1) {
              this.$message.success('已完善信息！')
              this.$store.dispatch('fetchAccount')
              // 跳转到安全中心
              setTimeout(() => {
                console.log('complete-info')
                this.$router.push('/media/wechat-list')
              }, 1000)
            } else {
              this.$message.error(resp.data.content)
              console.log('then error' + resp.data.content)
            }
          }).catch((err) => {
            this.$message.error(err.response.data.content)
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
#header {
  display: none;
}
.complete-info {
  background-color: @color-bg;
}
.top {
  padding: 10px 0;
  .logo {
    vertical-align: middle;
  }
  .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    margin: 0 8px 0 10px;
    border-radius: 50%;
    background-color: #242424;
    vertical-align: middle;
  }
  .title {
    font-size: 24px;
    color: @color-font-light2;
    vertical-align: middle;
  }
}
.tips {
  padding: 0 70px;
  font-size: 14px;
  line-height: 2.2;
}
.grey-bg {
  width: 1060px;
  height: 40px;
  margin: 40px auto;
  padding: 0 100px;
  font-size: 14px;
  background-color: @color-bg2;
  .title {
    display: inline-block;
    width: 100px;
    height: 35px;
    line-height: 35px;
    margin-top: 5px;
    text-align: center;
    background-color: #ffffff;
  }
}
.form {
  width: 435px;
  margin: auto;
}
.left-icon {
  position: absolute;
  z-index: 10;
  top: 5px;
  left: 10px;
  font-size: 25px;
  color: #ff4e00;
  display: inline-block;
}
.login-username, .login-pwd {
  display: inline-block;
  width: 100%;
  border: none;
  padding: 0;
}

.login-form-item .validate-input {
  width: 207px;
}
input {
  outline: 0;
}
.validate-btn {
  width: 207px;
  height: 55px;
  margin-top: 2px;
  padding: 0;
  background-color: #ffffff;
  border: 1px solid #dddddd;
  text-align: center;
  font-size: 18px;
}
.login-btn {
  margin-top: 20px;
}
button:focus {
  outline: 0;
}
.next-step-btn {
  width: 100%;
  height: 55px;
  font-size: 18px;
}
.icon-tel {
  font-size: 25px;
  top: 10px;
}
</style>
<style lang="less">
@import '../../assets/styles/variables.less';
.force-to-complete  .el-form-item__error {
  position: relative;
  padding-top: 10px;
  clear: both;
  font-size: 16px;
}
body.display-none {
  #header {
    display: none;
  }
}
.force-to-complete .el-button.is-disabled,
.force-to-complete .el-button.is-disabled:hover,
.force-to-complete .el-button.is-disabled:focus {
  color: @color-primary;
  background-color: #ffffff;
  border-color:  @color-primary;
}
.force-to-complete .validate-input .el-input__inner,
.force-to-complete .login-pwd .el-input__inner {
  padding: 0 10px 0 35px;
  height: 55px;
  font-size: 18px;
}
.force-to-complete .login-pwd .el-input__icon {
  font-size: 20px;
}
</style>
