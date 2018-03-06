<template>
<div class="list list-suc"  v-loading="dataList.length === 0" v-if="visible">
  <c-toggle
    class="more pull-right"
    v-model="toggle"
    color="#008aff"
    :text="['收起', '展开']"
    :icon="['icon-xiangshang', 'icon-xiangxia']"
  ></c-toggle>
  <h2>
    已中标的写手
    <span class="font12 normal"> 共有 {{itemTotal}} 个写手</span>

    <div class="inline-block tips">
      温馨提示：
      <span>
        直接联系很方便，关键信息注意保留证据，平台沟通记录作为解决问题的唯一凭证。
      </span>
    </div>

  </h2>
  <div class="wrap" :class="{ 'spread': toggle }">
    <table class="googs-list">
      <thead>
        <tr>
          <td></td>
          <td>写手信息</td>
          <td>写作类型</td>
          <td>联系方式</td>
          <td>参与时间</td>
          <td>执行篇数</td>
          <td>赏金</td>
          <td>状态</td>
          <td style="width: 100px;">文案内容</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <template v-for="(item, index) in dataList">
          <tr>
            <td class="index">
              <span>{{index+1}}</span>
              <em>中标</em>
            </td>
            <td class="brief">
              <router-link :to=" { name: 'goods-detail', params: {id:item.id} } " class="media">
                <div class="media-left">
                  <img :src="item.fdImage.thumbnailUrl" class="media-object">
                </div>
                <div class="media-body">
                  <h4 class="media-heading ellipsis">{{item.fdName}}</h4>
                  <p class="ellipsis-two">{{item.fdAbstract}}</p>
                </div>
              </router-link>
            </td>
            <td>{{item.fdWriterTypeValue}}</td>
            <td>{{item.fdMobile}}</td>
            <td>{{item.createdDate}}</td>
            <td>{{item.fdArticleCount}}</td>
            <td>{{item.fdPrice}}</td>
            <td>{{item.fdStatusValue}}</td>
            <td>
              <el-button
                v-if="item.fdStatus == stat.waitingConfirm || item.fdStatus == stat.finish"
                @click="fetchCopyData(item)"
                :loading="item.copyLoading"
                type="text"
              >查看文案</el-button>
            </td>
            <td>
              <ul>
                <li v-if="item.fdStatus == stat.waitingConfirm">
                  <router-link :to="{
                    name: 'receipt',
                    params: {orderId: $route.params.orderId, orderItemId: item.id }
                  }" >确认收货</router-link>
                </li>
                <li v-if="item.fdStatus == stat.waitingProcess || item.fdStatus == stat.waitingConfirm">
                  <router-link :to="{
                    name: 'communicate',
                    params: {orderId: $route.params.orderId, orderItemId: item.id }
                  }">沟通</router-link>
                </li>
                <li v-if="(item.fdStatus == stat.waitingConfirm) && !item.fdComplaintStatus">
                  <a href="javascript:" @click="openDialog(item)">投诉</a>
                </li>

                <li v-if="item.fdStatus == stat.finish">
                  <router-link :to="{
                    name: 'communicate',
                    params: {orderId: $route.params.orderId, orderItemId: item.id }
                  }" >查看沟通</router-link>
                </li>
                <li v-if="item.fdStatus == stat.finish">
                  <router-link :to="{
                    name: 'evaluate',
                    params: {orderId: $route.params.orderId, orderItemId: item.id }
                  }">查看评价</router-link>
                </li>
              </ul>
            </td>
          </tr>

        </template>

      </tbody>
    </table>

    <el-pagination
      class="mt20 text-right"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="itemTotal">
    </el-pagination>

  </div>

  <c-view-copy
    :copy="dialogCopyData"
    v-model="copyDialogVisible"
  ></c-view-copy>

  <el-dialog v-model="complaintDialogVisible" class="complaint-dialog" title="投诉">
    <el-form :model="form" :rules="rule" ref="form" label-width="100px" class="pr30">
      <el-form-item label="投诉理由" prop="content">
        <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
      </el-form-item>
      <el-form-item label="上传凭证">
        <c-upload-preview v-model="form.attachment" class="inline-block vertical-top"></c-upload-preview>
        <c-uploader
          :onComplete="uploadComplete"
          :onUpload="uploadStart"
          :onError="uploadError"
        >
          <div class="btn-upload text-center">
            <i class="iconfont icon-jiahao" v-show="!uploadLoading"></i>
            <p v-show="uploadLoading">上传中</p>
          </div>
        </c-uploader>

      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button class="el-button-cancel" @click="complaintDialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="complaint"
        :disabled="complaintLoading"
        :loading="complaintLoading"
      >确 定</el-button>
    </span>

  </el-dialog>

</div>
</template>

<script>
import CViewCopy from 'components/writer/CViewCopy'
import CUploader from 'components/CUploader'
import CUploadPreview from 'components/CUploadPreview'
import { orderItemStatus } from 'assets/scripts/status-config.js'

export default {
  name: 'COdItemsSuc',
  created () {
    this.fetchData()
  },
  data () {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 15,
      itemTotal: 0,
      toggle: true,
      copyLoading: false,
      stat: orderItemStatus,
      form: {
        content: '',
        attachment: []
      },
      rule: {
        content: [
          { required: true, message: '请输入投诉内容', trigger: 'blur' }
        ]
      },
      uploadLoading: false,
      complaintDialogVisible: false,
      complaintLoading: false,
      complaintId: null,
      visible: true,
      copyDialogVisible: false,
      dialogCopyData: []
    }
  },
  methods: {
    fetchData () {
      this.$http.get(
        '/wrorderItem/wrorder/wrorderItem/list',
        {
          params: {
            pageIndex: this.pageIndex,
            s_fdWrorderId: this.$route.params.orderId,
            s_fdStatus: [
              this.stat.waitingProcess,
              this.stat.waitingConfirm,
              this.stat.finish
            ].join(',')
          }
        }
      ).then(resp => {
        if (resp.data.data.length === 0) {
          this.visible = false
        } else {
          this.dataList = _.map(resp.data.data, item => {
            item.copyLoading = false
            item.copyData = []
            item.copyFetched = false
            return item
          })
          this.itemTotal = resp.data.total
        }
      })
    },
    fetchCopyData (item) {
      if (item.copyFetched) {
        this.dialogCopyData = item.copyData
        this.copyDialogVisible = true
      } else {
        item.copyLoading = true
        let params = {
          s_wrorderItemId: item.id
        }
        this.$http.get('/writerOrderItemArticle/wrorderItem/articles', {params})
        .then((resp) => {
          item.copyData = resp.data.data
          this.dialogCopyData = item.copyData
          this.copyDialogVisible = true
        }).finally(() => {
          item.copyLoading = false
          item.copyFetched = true
        })
      }
    },
    handleCurrentChange (page) {
      this.pageIndex = page
    },
    uploadComplete (resp) {
      if (resp.success) {
        this.form.attachment.push(resp.files[0])
      }
      this.uploadLoading = false
    },
    uploadStart () {
      this.uploadLoading = true
    },
    uploadError (id, fileName, reason, xhr) {
      this.$message.error('附件上传失败...')
      console.error(reason)
    },
    openDialog (item) {
      this.complaintDialogVisible = true
      this.complaintId = item.id
    },
    complaint (item) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.complaintLoading = true
          this.$http.post(`/wrorderItem/${this.complaintId}/complaint`, this.form).then((resp) => {
            this.fetchData()
            this.$message.success('提交成功（投诉会在7个工作日处理，请耐心等待）')
            this.complaintDialogVisible = false
          }).finally(() => {
            this.complaintLoading = false
          })
        } else {
          return false
        }
      })
    }
  },
  watch: {
    pageIndex (newValue, oldValue) {
      this.fetchData()
    }
  },
  components: {
    CViewCopy,
    CUploader,
    CUploadPreview
  }

}

</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
@import "../../assets/styles/order-items.less";

.list-suc {
  .tips {
    margin-left: 30px;
    font-size: 12px;
    span {
      color: @color-primary;
    }
  }
}

.googs-list {
  .index {
    position: relative;
    padding: 20px 0px 20px 20px;
    span {
      display: block;
      width: 25px;
      height: 25px;
      line-height: 25px;
      border: 1px solid @color-border;
      border-radius: 50px;
    }
    em {
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 10px;
      color: white;
      background: @color-primary;
      border-bottom-right-radius: 15px;
    }
  }
}

.btn-upload {
  display: inline-block;
  width: 75px;
  height: 75px;
  line-height: 70px;
  border: 2px dashed @color-border;
  .iconfont {
    font-size: 24px;
    color: @color-border;
  }
}

</style>
