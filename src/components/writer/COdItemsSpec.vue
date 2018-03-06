<template>
<div class="list list-specify"  v-loading="dataList.length === 0" v-if="visible">
 <c-toggle
    class="more pull-right"
    v-model="toggle"
    :text="['收起', '展开']"
    color="#008aff"
    :icon="['icon-xiangshang', 'icon-xiangxia']"
  ></c-toggle>
  <h2>指定竞标的写手 <span class="font12 normal"> 已指定 {{itemTotal}} 个写手竞标</span></h2>
  <div class="wrap" :class="{ 'spread': toggle }">
    <table class="googs-list">
      <thead>
        <tr>
          <td>写手信息</td>
          <td>写作类型</td>
          <td>行业类型</td>
          <td>中标次数</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in dataList" :key="item.id">
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

  </div>

</div>
</template>

<script>
import { orderItemStatus } from 'assets/scripts/status-config.js'

export default {
  name: 'COdItemsSpec',
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
      stat: orderItemStatus,
      visible: true
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
            s_fdStatus: this.stat.waitingBid
          }
        }
      ).then(resp => {
        if (resp.data.data.length === 0) {
          this.visible = false
        } else {
          this.dataList = resp.data.data
          this.itemTotal = resp.data.total
        }
      })
    },
    handleCurrentChange (page) {
      this.pageIndex = page
    }
  },
  watch: {
    pageIndex (newValue, oldValue) {
      this.fetchData()
    }
  }

}

</script>
<style lang="less" scoped>
@import "../../assets/styles/order-items.less";
</style>
