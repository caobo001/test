<template>
  <div class="page-invoice page-invoice-history">

    <c-title title="我的订单"></c-title>

    <div class="container clearfix" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <c-menu class="pull-left mt10"></c-menu>
      <div class="container-right pull-right mt10">
        <div class="tab-bar">
          <ul class="tab-list clearfix">
            <li>
              <router-link :to="{ name: 'media-invoice-list' }" exact>
                申请发票
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'media-invoice-history' }">
                申请记录
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'media-invoice-info' }">
                发票信息及收票地址
              </router-link>
            </li>
          </ul>
        </div>

        <div class="content clearfix">
          <table class="list">
            <thead>
              <tr>
                <th class="text-center">发票编号</th>
                <th class="text-center">开票时间</th>
                <th class="text-center">开票金额</th>
                <th class="text-center">申请状态</th>
                <th class="text-center">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in dataList" :key="item.id">
                <td class="text-center">{{item.fdNo}}</td>
                <td class="text-center">
                  {{item.fdStatus===9 ? item.fdAuditTime:'—'}}
                </td>
                <td class="text-center">{{item.fdPrice | numToThousands}}</td>
                <td class="text-center">{{item.fdStatusValue}}</td>
                <td class="text-right operate">
                  <el-button
                    type="text"
                    :loading="item.loading"
                    @click="fetchDetail(item)">查看详情</el-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="pagination">
            <el-pagination
              v-if="!!dataList.length"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="itemTotal">
            </el-pagination>
          </div>

          <div  v-if="!dataList.length" class="text-center no-data">
            <img src="../../assets/img/no-data-logo.png" class="no-data-logo"/>
            <div>嗷，暂无可开票申请记录哦！</div>
            <div>请看看其他商品。</div>
          </div>

        </div>

      </div>
    </div>
    <c-modal v-model="showModal" :opts="optModal">
      <c-invoice-detail @close="closeModal" :dataInfo="dataInfo"></c-invoice-detail>
    </c-modal>
  </div>
</template>
<script>
import CModal from 'components/CModal'
import CInvoiceDetail from 'components/media/CInvoiceDetail'
import CTitle from 'components/CTitle'

export default {
  mounted () {
    this.fetchData()
    this.$store.dispatch('fetchInvoiceInfo')
  },
  title () {
    return '申请记录'
  },
  data () {
    return {
      pageIndex: 1,
      pageSize: 15,
      itemTotal: 0,
      dataList: [],
      loading: false,
      showModal: false,
      optModal: {
        title: '发票详情'
      },
      dataInfo: {
        invoice: {},
        carriage: {},
        orderList: []
      }
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$http.get('/invoice/list', {params: {pageIndex: this.pageIndex}}).then((resp) => {
        this.dataList = _.map(resp.data.data, (item) => {
          item.loading = false
          return item
        })
        this.itemTotal = resp.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    fetchDetail (item) {
      item.loading = true
      this.$http.get(`/invoice/${item.id}`).then(resp => {
        this.dataInfo = resp.data
        this.showModal = true
      }).finally(() => {
        item.loading = false
      })
    },
    closeModal () {
      this.showModal = false
    },
    handleCurrentChange (page) {
      this.pageIndex = page
    }
  },
  computed: {
    invoiceInfo () {
      return this.$store.state.media.invoiceInfo
    },
    selectedItems () {
      return _.filter(this.dataList, 'checked')
    }
  },
  watch: {
    pageIndex (newValue) {
      this.fetchData()
    }
  },
  components: {
    CModal,
    CInvoiceDetail,
    CTitle
  }
}
</script>
<style lang="less">
@import '../../assets/styles/invoice.less';

</style>
<style lang="less" scoped>
@import "../../assets/styles/variables.less";
.list {
  width: 100%;
  thead {
    tr {
      border-bottom: 1px solid @color-border;
    }
    th {
      color: #999999;
      padding: 6px 0px;
    }
  }
  tr {
    border-bottom: 1px solid lighten(@color-border, 8%);
    td {
      padding: 25px 0px;
      vertical-align: middle;;
    }
  }
  .operate {
    padding-right: 45px;
    width: 150px;
  }
}
</style>
