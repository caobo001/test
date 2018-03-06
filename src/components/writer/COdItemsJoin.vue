<template>
<div class="list list-join"  v-loading="dataList.length === 0" v-if="visible">
 <c-toggle
    class="more pull-right"
    v-model="toggle"
    :text="['收起', '展开']"
    color="#008aff"
    :icon="['icon-xiangshang', 'icon-xiangxia']"
  ></c-toggle>
  <h2>参与竞标的写手 <span class="font12 normal"> 已有 {{itemTotal}} 个写手竞标</span></h2>
  <div class="wrap" :class="{ 'spread': toggle }">
    <table class="googs-list">
      <thead>
        <tr>
          <td v-if="!readOnly">
            <el-checkbox @change="toggleCheckedAll($event)"></el-checkbox>
          </td>
          <td>写手信息</td>
          <td>写作类型</td>
          <td>行业类型</td>
          <td>中标次数</td>
          <td>执行篇数</td>
          <td>参与时间</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataList" :key="item.id">
          <td v-if="!readOnly" class="check-box">
            <el-checkbox v-model="item.checked" @change="handleCheckboxChange(item, $event)"></el-checkbox>
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
          <td class="trades">
            <ul>
              <li v-for="trade in item.fdTrades" class="inline-block ml10">{{trade}}</li>
            </ul>
          </td>
          <td>{{item.fdWinBitCount}}</td>
          <td>{{item.fdSellerArticleCount}}</td>
          <td>{{item.createdDate}}</td>

        </tr>

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

    <div v-if="!readOnly" class="action text-center mt30">
      <p>已选择 <em>{{checkedList.length}}</em> 个写手</p>
      <el-button
        class="mt10"
        @click="dialogVisible = true"
        :disabled="checkedList.length === 0 || loading"
        type="primary"
        size="large"
      >确认选标</el-button>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" class="dialog" title="已选择的写手">

    <table class="googs-list">
      <tbody>
        <tr v-for="(item, index) in checkedList" :key="item.id">
          <td>{{index + 1}}</td>
          <td class="brief">
            <div class="media-left">
              <img :src="item.fdImage.thumbnailUrl" class="media-object">
            </div>
            <div class="media-body">
              <h4 class="media-heading ellipsis">{{item.fdName}}</h4>
              <p class="ellipsis-two">{{item.fdAbstract}}</p>
            </div>
          </td>
          <td>{{item.fdWriterTypeValue}}</td>
          <td>
            <el-input-number v-model="item.inputNumber" :min="0" :max="orderArticleCount"></el-input-number>
          </td>
        </tr>

      </tbody>
    </table>
    <span slot="footer" class="dialog-footer">
      <el-button class="el-button-cancel" @click="dialogVisible = false">取 消</el-button>
      <el-button
        type="primary"
        @click="submit"
        :loading="loading"
      >确 定</el-button>
    </span>
  </el-dialog>

</div>
</template>

<script>
import { InputNumber } from 'element-ui'
import { orderItemStatus } from 'assets/scripts/status-config.js'

export default {
  name: 'COdItemsJoin',
  props: {
    readOnly: {
      type: Boolean,
      default: true
    },
    orderArticleCount: {
      type: Number,
      default: 1
    }
  },
  created () {
    this.fetchData()
  },
  data () {
    return {
      dataList: [],
      checkedList: [],
      pageIndex: 1,
      pageSize: 15,
      itemTotal: 0,
      loading: false,
      toggle: true,
      stat: orderItemStatus,
      visible: true,
      dialogVisible: false
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
            s_fdStatus: this.stat.waitingSelection
          }
        }
      ).then(resp => {
        if (resp.data.data.length === 0) {
          this.visible = false
        } else {
          this.dataList = _.map(resp.data.data, item => {
            item.checked = false
            item.inputNumber = 0

            _.forEach(this.checkedList, (checkedItem) => {
              if (item.id === checkedItem.id) {
                item.checked = true
              }
            })

            return item
          })
          this.itemTotal = resp.data.total
        }
      })
    },
    toggleCheckedAll (event) {
      _.forEach(this.dataList, (item) => {
        if (event.target.checked) {
          let index = -1
          _.forEach(this.checkedList, (checkedItem, i) => {
            if (item.id === checkedItem.id) {
              index = i
            }
          })
          if (index >= 0) {
            this.checkedList.splice(index, 1)
          }
        }

        item.checked = event.target.checked
        this.handleCheckboxChange(item, event)
      })
    },
    handleCheckboxChange (item, event) {
      if (event.target.checked) {
        this.checkedList.push(item)
      } else {
        let index = -1
        _.forEach(this.checkedList, (checkedItem, i) => {
          if (item.id === checkedItem.id) {
            index = i
          }
        })
        if (index >= 0) {
          this.checkedList.splice(index, 1)
        }
      }
    },
    handleCurrentChange (page) {
      this.pageIndex = page
    },
    submit () {
      let articleTotal = 0
      _.forEach(this.checkedList, (item) => {
        articleTotal += item.inputNumber
      })

      if (articleTotal > this.orderArticleCount) {
        this.$message.warning('所选写手的执行篇数之和不能大于订单总执行篇数')
      } else if (articleTotal === 0) {
        this.$message.warning('所选写手的执行篇数不能为零')
      } else {
        this.loading = true
        this.$http.post(
          `/wrorderItem/wrorder/${this.$route.params.orderId}/wrorderItem/choose`,
          _.map(this.checkedList, item => {
            return {
              fdOrderItemId: item.id,
              fdArticleCount: item.inputNumber
            }
          })
        ).then(resp => {
          if (resp.data.code === 1) {
            this.dialogVisible = false
            this.$emit('chooseCompleted')
          }
        }).finally(() => {
          this.loading = false
        })
      }
    }
  },
  watch: {
    pageIndex (newValue, oldValue) {
      this.fetchData()
    }
  },
  components: {
    [InputNumber.name]: InputNumber
  }

}

</script>
<style lang="less" scoped>
@import "../../assets/styles/order-items.less";
</style>
