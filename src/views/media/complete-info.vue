<template>
  <div class="complete-info clearfix">
    <div class="container" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <c-menu class="pull-left mt10"></c-menu>
      <div class="container-right pull-right mt10">
        <div class="container-right-title">安全中心</div>
        <div class="container-content mt10">
          <div class="login-block text-center">
          <div class="login-container">
            <div class="login-title">完善信息</span></div>
              <el-form :model="infoForm" :rules="infoRules" ref="infoForm">
                <el-form-item prop="username" class="login-form-item">
                  <i class="icon iconfont icon-user left-icon vertical-middle"></i>
                  <el-input v-model="infoForm.username" type="text" class="login-username vertical-middle" placeholder="用户名"></el-input>
                  <i class="icon iconfont icon-cha vertical-middle"></i>
                  <i class="icon iconfont icon-right"></i>
                </el-form-item>
                <el-form-item prop="pwd" class="login-form-item">
                  <i class="icon iconfont icon-lock left-icon vertical-middle"></i>
                  <el-input v-model="infoForm.pwd" type="password" class="login-pwd vertical-middle" placeholder="密码"></el-input>
                  <i class="icon iconfont icon-cha vertical-middle"></i>
                  <i class="icon iconfont icon-right vertical-middle"></i>
                </el-form-item>
                <el-form-item prop="repwd" class="login-form-item">
                  <i class="icon iconfont icon-lock left-icon vertical-middle"></i>
                  <el-input v-model="infoForm.repwd" type="password" class="login-pwd vertical-middle" placeholder="确认密码"></el-input>
                  <i class="icon iconfont icon-cha vertical-middle"></i>
                  <i class="icon iconfont icon-right vertical-middle"></i>
                </el-form-item>
                <el-button type="primary" @click="submitForm('infoForm')">确认</el-button>
                <el-button @click="resetForm('infoForm')">重置</el-button>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  title () {
    return '安全中心'
  },
  data () {
    var vUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else if (!this.available) {
        callback(new Error('用户名已存在'))
      } else {
        callback()
      }
    }
    var vPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'))
      } else {
        let reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('密码长度8~16位，其中数字、字母和符号至少包含两种'))
        }
      }
    }
    var vRepwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('确认密码不能为空'))
      } else if (value !== this.infoForm.pwd) {
        callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      key: '',
      downCount: 120,
      countFlag: false,
      countInterval: '',
      infoForm: {
        username: '',
        pwd: '',
        repwd: '',
        id: this.$store.state.account.id
      },
      infoRules: {
        username: [
          { validator: vUsername, trigger: 'blur' }
        ],
        pwd: [
          { validator: vPwd, trigger: 'blur' }
        ],
        repwd: [
          { validator: vRepwd, trigger: 'blur' }
        ]
      },
      available: true
    }
  },
  computed: {
    username () {
      return this.infoForm.username
    },
    params () {
      var obj = {
        fdPassword: this.infoForm.pwd,
        checkPassword: this.infoForm.repwd,
        fdUsename: this.infoForm.username,
        id: this.infoForm.id
      }
      return obj
    }
  },
  watch: {
    username () {
      this.checkUsername()
    },
    '$store.state.account.id' (newValue) {
      this.infoForm.id = newValue
    }
  },
  methods: {
    checkUsername (params) {
      if (this.infoForm.username !== '') {
        this.$http.get(`/account/isExist/fdUsename/${this.infoForm.username}`, {params}).then((resp) => {
          if (resp.data.code === 0) {
            this.available = false
          } else {
            this.available = true
          }
          this.$refs.infoForm.validateField('username')
        })
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.put('/account/evpi', this.params).then((resp) => {
            var code = resp.data.code
            if (code === 1) {
              this.$message.success('已完善信息！')
              this.$store.dispatch('fetchAccount')
              // 跳转到安全中心
              setTimeout(() => {
                console.log('complete-info')
                this.$router.push('/media/safe-center')
              }, 1000)
            } else {
              this.$message.error(resp.data.content)
              console.log('then error' + resp.data.content)
            }
          }).catch((err) => {
            this.$message.error(err.response.data.content)
            setTimeout(() => {
              this.$router.push('/media/safe-center')
            }, 2000)
          })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
.complete-info {
  background-color: @color-bg2;
  padding-bottom: 50px;
}
.container-right {
  width: 1030px;
}
.container-content {
  min-height: 608px;
  padding-top: 30px;
  background-color: @color-bg;
}
.login-container {
  width: 340px;
  margin: 30px auto 55px auto;
}
.login-title {
  margin-bottom: 20px;
  font-size: 30px;
}
.login-form-item {
  margin: 10px 0;
}
.left-icon {
  position: absolute;
  z-index: 10;
  top: 5px;
  left: 10px;
  font-size: 19px;
  color: #ff4e00;
  display: inline-block;
}
.login-username, .login-pwd {
  display: inline-block;
  width: 100%;
  font-size: 14px;
  border: none;
  padding: 0;

}
.login-form-item .icon-cha {
  position: absolute;
  margin: auto;
  top: 10px;
  bottom: 0px;
  right: 10px;
  display: none;
  font-size: 16px;
  color: #8d8d8d;
}
.login-form-item .validate-input {
  width: 230px;
}
input {
  outline: 0;
}
.validate-btn {
  width: 100px;
  height: 42px;
  margin-top: 2px;
  padding: 0;
  background-color: #eeeeee;
  border: 1px solid #dddddd;
  border-radius: 5px;
  text-align: center;
}
.login-btn {
  margin-top: 20px;
}
button:focus {
  outline: 0;
}
</style>
<style lang="less">
.complete-info .el-form-item__error {
  position: relative;
  clear: both;
}
.complete-info .el-input__inner {
  padding: 0 10px 0 35px;
  height: 44px;
  font-size: 14px;
}
</style>
