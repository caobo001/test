<template>
  <div class="safe-center clearfix">
    <c-title title="安全中心"></c-title>
    <div class="container" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <c-menu class="pull-left mt10"></c-menu>
      <div class="container-right pull-right mt10">
        <div class="container-right-title">安全中心</div>
        <div class="container-content mt10">
          <ul class="info-list">
            <li>
              <span class="color-font-light2 inline-block title">手机</span>
              <div class="inline-block info">{{account.fdMobile}}</div>
              <span class="cursor-default action" @click="mobileVisible = true">修改</span>
            </li>
            <li>
              <span class="color-font-light2 inline-block title">登录密码
                <i class="icon iconfont icon-lock"></i>
              </span>
              <div class="inline-block info">登录广而易平台需要输入的密码</div>
              <span class="cursor-default action" @click="pwdVisible = true">修改</span>
            </li>
            <li>
              <span class="color-font-light2 inline-block title">绑定微信</span>
              <div class="inline-block info">更及时地了解平台各项信息</div>
              <span class="cursor-pointer action" v-if="account.loginType.wechat === 0" @click="bindAccount('wechat')">绑定</span>
              <span class="cursor-pointer action" v-if="account.loginType.wechat === 1" @click="unbindAccount('wechat')">解绑</span>
              <i class="icon iconfont icon-weixin1" :class="{'active': account.loginType.wechat === 1}"></i>
            </li>
            <li>
              <span class="color-font-light2 inline-block title">绑定微博</span>
              <div class="inline-block info">更及时地了解平台各项信息</div>
              <span class="cursor-pointer action" v-if="account.loginType.weibo === 0" @click="bindAccount('weibo')">绑定</span>
              <span class="cursor-pointer action" v-if="account.loginType.weibo === 1" @click="unbindAccount('weibo')">解绑</span>
              <i class="icon iconfont icon-weibo" :class="{'active': account.loginType.weibo === 1}"></i>
            </li>
            <li>
              <span class="color-font-light2 inline-block title">绑定QQ</span>
              <div class="inline-block info">更及时地了解平台各项信息</div>
              <span class="cursor-pointer action" v-if="account.loginType.qq === 0" @click="bindAccount('qq')">绑定</span>
              <span class="cursor-pointer action" v-if="account.loginType.qq === 1" @click="unbindAccount('qq')">解绑</span>
              <i class="icon iconfont icon-qq1" :class="{'active': account.loginType.qq === 1}"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <el-dialog v-model="wechatVisible" class="wechat-dialog text-center">
      <h3 class="title">扫一扫&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;绑定微信账号</h3>
      <div class="img"></div>
      <span class="tips">绑定微信账号方便了解更多信息</span>
    </el-dialog>
    <el-dialog v-model="mobileVisible" title="修改手机号码" class="mobile-dialog set-dialog">
      <div class="dialog-content">
        <el-form :model="modifyMobileForm" :rules="modifyMobileRule" ref="modifyMobileForm"  class="modifyPwdForm">
          <el-form-item prop="oldVCode">
            <div class="color-font-light2">为了保证账户安全，需进行手机验证</div>
            <div class="tel-title">请使用安全手机<span class="red">{{account.fdMobile}}</span>获取验证码</div>
            <el-input v-model="modifyMobileForm.oldVCode" class="validate-code" placeholder="请输入验证码"></el-input>
            <el-button
              class="validate-btn"
              @click="getValidate('oldMobile')"
              :disabled="oldCountFlag">
              <span v-if="oldCountFlag" class="downcount">{{oldDownCount}}s</span>
              <span v-if="!oldCountFlag">获取验证码</span>
            </el-button>
          </el-form-item>
          <el-form-item prop="newMobile">
            <div class="new-pwd-title">请输入新手机号并验证</div>
            <el-input v-model="modifyMobileForm.newMobile" class="new-pwd" placeholder="请输入新手机号码"></el-input>
          </el-form-item>
          <el-form-item prop="newVCode">
            <el-input v-model="modifyMobileForm.newVCode" class="validate-code" placeholder="请输入验证码"></el-input>
            <el-button
              class="validate-btn"
              @click="getValidate('newMobile')"
              :disabled="newCountFlag">
              <span v-if="newCountFlag" class="downcount">{{newDownCount}}s</span>
              <span v-if="!newCountFlag">获取验证码</span>
            </el-button>
          </el-form-item>
        </el-form>
        <div class="dialog-footer text-center">
          <el-button type="primary" class="confirm-btn" @click="submitForm('modifyMobileForm')">确 定</el-button>
          <el-button class="reset-btn" @click="resetForm('modifyMobileForm')">重置</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="pwdVisible" title="修改登录密码" class="pwd-dialog set-dialog">
      <div class="dialog-content">
        <el-form :model="modifyPwdForm" :rules="modifyPwdRule" ref="modifyPwdForm"  class="modifyPwdForm">
          <el-form-item prop="oldPwdCode">
            <div class="color-font-light2">为了保证账户安全，需进行手机验证</div>
            <div class="tel-title">请使用安全手机<span class="red">{{account.fdMobile}}</span>获取验证码</div>
            <input type="text" name="clear" style="position:fixed;bottom:-9999px;display: none;">
            <el-input v-model="modifyPwdForm.oldPwdCode" class="validate-code" placeholder="请输入验证码" auto-complete="nope"></el-input>
            <el-button
              class="validate-btn"
              @click="getValidate('pwd')"
              :disabled="pwdCountFlag">
              <span v-if="pwdCountFlag" class="downcount">{{pwdDownCount}}s</span>
              <span v-if="!pwdCountFlag">获取验证码</span>
            </el-button>
          </el-form-item>
          <el-form-item prop="newPwd">
            <div class="new-pwd-title">新密码<span class="color-font-light2">密码长度8~16位，其中数字、字母和符号至少包含两种</span></div>
            <el-input type="password" style="position:fixed;bottom:-9999px;display: none;"></el-input>
            <el-input type="password" v-model="modifyPwdForm.newPwd" class="new-pwd" placeholder="请输入新密码" auto-complete="nope"></el-input>
          </el-form-item>
          <el-form-item prop="reNewPwd">
            <el-input type="password" v-model="modifyPwdForm.reNewPwd" class="new-pwd" placeholder="重复新的密码"></el-input>
          </el-form-item>
        </el-form>
        <div class="dialog-footer text-center">
          <el-button type="primary" class="confirm-btn" @click="submitForm('modifyPwdForm')">确 定</el-button>
          <el-button class="reset-btn" @click="resetForm('modifyPwdForm')">重置</el-button>
        </div>
      </div>
    </el-dialog>

    <el-dialog v-model="successVisible" title="操作成功" class="success-dialog" @close="closeDialog">
      <div class="dialog-content text-center">
        <i class="icon iconfont icon-success"></i>
        <span class="font16">{{successMsg}}</span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
import { Dialog } from 'element-ui'
import CMenu from 'components/CMenu'
import { mapState } from 'vuex'
let that
const isNode = require('detect-node')

if (!isNode) {
  window.remoteHandle = function (param) {
    that.bindFlag = param
  }
}

export default {
  name: 'safeCenter',
  created () {
    that = this
    // 屏蔽第三方 登录
    this.$store.dispatch('fetchAccount').then(() => {
      if (this.account.existPassWord === false) {
        this.$router.push('/webapp/media/safe-center/complete-info')
      }
    })
  },
  title () {
    return '安全中心'
  },
  data () {
    var validateOldVCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else if (this.oldVCode !== value) {
        return callback(new Error('验证码错误'))
      } else {
        callback()
      }
    }
    var validateNewMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('新手机号码不能为空'))
      } else if (this.account.fdMobile === value) {
        return callback(new Error('新手机号不能与旧手机号码一致'))
      } else {
        callback()
      }
    }
    var validateNewVCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    var validateOldPwdCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else {
        callback()
      }
    }
    var validateNewPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('新密码不能为空'))
      } else {
        let reg = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('密码长度8~16位，其中数字、字母和符号至少包含两种'))
        }
      }
    }
    var validateReNewPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写确认密码'))
      } else if (value !== this.modifyPwdForm.newPwd) {
        return callback(new Error('密码不一致'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      wechatVisible: false,
      mobileVisible: false,
      pwdVisible: false,
      successVisible: false,
      successMsg: '',
      newMobile: '',
      modifyMobileForm: {
        oldVCode: '',
        newMobile: '',
        newVCode: ''
      },
      modifyPwdForm: {
        oldPwdCode: '',
        newPwd: '',
        reNewPwd: ''
      },
      oldVCode: '',
      newVCode: '',
      pwdVCode: '',
      oldKey: '',
      newKey: '',
      disabledOld: false,
      disabledNew: false,
      disabledPwd: false,
      oldDownCount: 120,
      oldCountFlag: false,
      newDownCount: 120,
      newCountFlag: false,
      pwdDownCount: 120,
      pwdCountFlag: false,
      oldInterval: '',
      newInterval: '',
      pwdInterval: '',
      modifyMobileRule: {
        oldVCode: [
          { validator: validateOldVCode, trigger: 'blur' }
        ],
        newMobile: [
          { validator: validateNewMobile, trigger: 'blur' }
        ],
        newVCode: [
          { validator: validateNewVCode, trigger: 'blur' }
        ]
      },
      modifyPwdRule: {
        oldPwdCode: [
          { validator: validateOldPwdCode, trigger: 'blur' }
        ],
        newPwd: [
          { validator: validateNewPwd, trigger: 'blur' }
        ],
        reNewPwd: [
          { validator: validateReNewPwd, trigger: 'blur' }
        ]
      },
      bindUrl: '',
      windowInreval: '',
      newWindow: {},
      bindFlag: {},
      selfName: 'safeCenter'
    }
  },
  computed: {
    ...mapState(['account'])
  },
  watch: {
    mobileVisible () {
      if (this.mobileVisible === false) {
        this.resetForm('modifyMobileForm')
      }
    },
    pwdVisible () {
      if (this.pwdVisible === false) {
        this.resetForm('modifyPwdForm')
      }
    },
    bindFlag () {
      if (this.bindFlag.code === 1) {
        this.$store.dispatch('fetchAccount').then(() => {
          this.$message.success('绑定成功！')
        })
      } else {
        this.$message.error(this.bindFlag.content)
      }
    }
  },
  filters: {
    hideCenterNumber (value) {
      var str = ''
      var arr = value.split('')
      for (var i = 0; i < arr.length; i++) {
        if (i >= 3 && i <= 6) {
          str = str + '*'
        } else {
          str = str + arr[i]
        }
      }
      return str
    }
  },
  methods: {
    fetchValidateCode (params, type) {
      this.$http.get('/message', {params}).then((resp) => {
        if (resp.data.code === 0) {
          this.$message.error(resp.data.content)
        }
        switch (type) {
          case 'oldMobile':
            this.oldVCode = resp.data.mobileCode
            this.oldKey = resp.data.key
            break
          case 'newMobile':
            this.newVCode = resp.data.mobileCode
            this.newKey = resp.data.key
            break
          case 'pwd':
            this.pwdVCode = resp.data.mobileCode
        }
      })
    },
    fetchMobileCode (params, type) {
      this.$http.post('/account/update/fdMobile', {params}).then((resp) => {
      })
    },
    sendPwd (params) {
      this.$http.post('/account/update/password', params).then((resp) => {
        if (resp.data.code === 1) {
          this.successMsg = '修改登录密码成功！'
          this.successVisible = true
          this.pwdVisible = false
        }
        if (resp.data.code === 0) {
          this.$message.error(resp.data.content)
        }
      })
    },
    sendNewMobile (params) {
      this.$http.post('/account/update/fdMobile', params).then((resp) => {
        if (resp.data.code === 1) {
          this.successMsg = '修改手机号成功！'
          this.$store.dispatch('modifyAccountMobile', this.modifyMobileForm.newMobile)
          this.successVisible = true
          this.mobileVisible = false
        }
        if (resp.data.code === 0) {
          this.$message.error(resp.data.content)
        }
      })
    },
    downCount (type) {
      /* eslint-disable no-unused-vars */
      switch (type) {
        case 'oldDownCount':
          this.oldInterval = setInterval(() => {
            this.oldDownCount--
            if (this.oldDownCount <= 0) {
              this.oldCountFlag = false
              clearInterval(this.oldInterval)
              this.oldDownCount = 120
            }
          }, 1000)
          break
        case 'newDownCount':
          this.newInterval = setInterval(() => {
            this.newDownCount--
            if (this.newDownCount <= 0) {
              this.newCountFlag = false
              clearInterval(this.newInterval)
              this.newDownCount = 120
            }
          }, 1000)
          break
        case 'pwdDownCount':
          this.pwdInterval = setInterval(() => {
            this.pwdDownCount--
            if (this.pwdDownCount <= 0) {
              this.pwdCountFlag = false
              clearInterval(this.pwdInterval)
              this.pwdDownCount = 120
            }
          }, 1000)
      }
    },
    getValidate (type) {
      var params = {
        fdMobile: '',
        onlyFor: ''
      }
      switch (type) {
        case 'oldMobile':
          params.fdMobile = this.account.fdMobile
          params.onlyFor = 203
          this.oldCountFlag = true
          this.downCount('oldDownCount')
          this.fetchValidateCode(params, type)
          break
        case 'newMobile':
          if (this.modifyMobileForm.newMobile.length !== 0) {
            params.fdMobile = this.modifyMobileForm.newMobile
            params.onlyFor = 204
            this.newCountFlag = true
            this.downCount('newDownCount')
            this.fetchValidateCode(params, type)
          }
          break
        case 'pwd':
          params.fdMobile = this.account.fdMobile
          params.onlyFor = 201
          this.pwdCountFlag = true
          this.downCount('pwdDownCount')
          this.fetchValidateCode(params, type)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (formName) {
            case 'modifyMobileForm':
              var params1 = {
                'newKey': this.newKey,
                'newMobile': this.modifyMobileForm.newMobile,
                'newMobileCode': this.newVCode,
                'oldKey': this.oldKey,
                'oldMobileCode': this.oldVCode
              }
              this.sendNewMobile(params1)
              break
            case 'modifyPwdForm':
              var params2 = {
                'key': 201,
                'mobileCode': this.pwdVCode,
                'newPassword': this.modifyPwdForm.newPwd
              }
              this.sendPwd(params2)
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      if (formName === 'modifyMobileForm') {
        this.oldDownCount = 120
        this.newDownCount = 120
        this.oldCountFlag = false
        this.newCountFlag = false
        clearInterval(this.oldInterval)
        clearInterval(this.newInterval)
      } else if (formName === 'modifyPwdForm') {
        this.pwdDownCount = 120
        this.pwdCountFlag = false
        clearInterval(this.pwdInterval)
      }
    },
    closeDialog () {
      this.mobileVisible = false
      this.pwdVisible = false
      this.resetForm('modifyMobileForm')
    },
    bindAccount (type) {
      let params = {}
      this.newWindow = this.openWin()
      this.$http.get(`/account/getStatic/${type}`, {params}).then((resp) => {
        this.newWindow.location.href = resp.data.url
      })
    },
    unbindAccount (type) {
      this.$http.put(`/account/unbundling/${type}`).then((resp) => {
        if (resp.data.code === 1) {
          this.$message.success('解绑成功！')
          this.$store.dispatch('fetchAccount')
        } else {
          this.$message.error(resp.data.content)
        }
      }).catch((err) => {
        this.$message.error(err.response.data.content)
      })
    },
    openWin () {
      var iWidth = 800 // 弹出窗口的宽度;
      var iHeight = 600 // 弹出窗口的高度;
      // 获得窗口的垂直位置
      var iTop = (window.screen.availHeight - 30 - iHeight) / 2
      // 获得窗口的水平位置
      var iLeft = (window.screen.availWidth - 10 - iWidth) / 2
      var newWindow = window.open('', '_blank', 'height=' + iHeight + ',,innerHeight=' + iHeight + ',width=' + iWidth + ',innerWidth=' + iWidth + ',top=' + iTop + ',left=' + iLeft + ',status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0,titlebar=no')
    // window.open("AddScfj.aspx", "newWindows", 'height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
      return newWindow
    }
  },
  components: {
    [Dialog.name]: Dialog,
    CMenu,
    CTitle
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
.safe-center {
  background-color: @color-bg;
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
.info-list {
  width: 828px;
  margin: auto;
  font-size: 14px;
  li {
    padding: 20px 0;
    border-bottom: 1px solid @color-border;
    .title {
      width: 125px;
    }
    .info {
      width: 600px;
    }
    .action {
      color: #0084d7;
    }
  }
}
.wechat-dialog {
  .title {
    font-size: 18px;
    color: @color-primary;
  }
  .img {
    width: 265px;
    height: 265px;
    margin: 35px auto 10px auto;
    background-color: @color-bg2;
  }
}
.set-dialog {
  .dialog-content {
    padding: 50px 0 60px 0;
    width: 340px;
    margin: auto;
    .new-pwd-title {
      span {
        font-size: 12px;
      }
    }
    .new-pwd {
      margin-bottom: 10px;
    }
    .el-input__inner {
      height: 40px !important;
      line-height: 40px;
    }
    .validate-code {
      width: 160px;
      vertical-align: middle;
    }
    .dialog-footer {
      padding-top: 35px;
      .confirm-btn, .reset-btn {
        width: 98px;
        height: 40px;
        border-radius: 5px;
        color: #ffffff;
      }
      .reset-btn {
        background-color: #999999;
      }
    }
  }
}
.mobile-dialog .dialog-content {
  width: 262px;
}
.validate-btn {
  width: 98px;
  height: 40px;
  padding: 0;
  border-radius: 5px;
  background-color: @color-border;
  vertical-align: middle;
  .downcount {
    color: #999999;
  }
}
.red {
  color: #e01a0f;
}
.success-dialog {
  .dialog-content {
    padding: 80px 0;
    .icon-success {
      margin-right: 10px;
      font-size: 34px;
      color: @color-success;
      vertical-align: middle;
    }
  }
}
.icon-weixin1, .icon-weibo, .icon-qq1 {
  font-size: 20px;
  color: #cccccc;
  vertical-align: middle;
}
.icon-qq1 {
  vertical-align: top;
}
.icon-weixin1.active {
  color: #70ca43;
}
.icon-weibo.active {
  color: #fc6464;
}
.icon-qq1.active {
  color: #3cb6ed;
}
</style>
<style lang="less">
.safe-center .set-dialog {
  .el-dialog {
    max-width: 580px !important;
  }
  .el-input__inner {
    height: 40px !important;
    line-height: 40px;
  }
  .el-form-item__error {
    position: static;
    margin-bottom: 5px;
  }
  .el-form-item {
    margin-bottom: 0;
  }
  .el-icon-loading {
    display: none;
  }
}
.safe-center .success-dialog .el-dialog {
  max-width: 580px !important;
}
</style>
