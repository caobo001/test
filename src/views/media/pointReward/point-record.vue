<template>
  <div class="page-media-reward">

    <c-title title="积分兑换"></c-title>

    <div class="container clearfix" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
      <c-menu class="pull-left mt10"></c-menu>

      <div class="container-right pull-right">
        <ul class="tab-list clearfix">
          <li>
             <router-link :to="{ name: 'media-reward-list' }" >积分兑换</router-link>
          </li>
          <li class="active">
             <router-link :to="{ name: 'media-point-record' }" >积分明细</router-link>
          </li>
          <li>
             <router-link :to="{ name: 'media-point-order' }" >兑换订单</router-link>
          </li>
        </ul>

        <div class="point-in-tab-list">
          <span
            v-for="item in typeList"
            :key="item"
            :class="{'active': item === curType}"
            @click="setCurType(item)">
            {{item}}
          </span>
        </div>

        <div class="filter">
          <div class="date">
            起始日期：
            <el-date-picker
              class="date-picker"
              popper-class="date-picker-in"
              v-model="gtDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>

          <div class="date">
            截至日期：
            <el-date-picker
              class="date-picker"
              v-model="ltDate"
              type="datetime"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>

          <el-button
            @click="setDate"
            size="middle"
            type="primary"
            class="search-btn">
            查询
          </el-button>
        </div>

        <table class="record-table">
          <thead>
            <tr>
              <th>时间</th>
              <th>积分</th>
              <th>用途/来源</th>
              <th>备注</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in dataList"
              :key="item.id">
              <td>{{item.createdDate}}</td>
              <td>
                <span class="color-green" v-if="item.fdType === 1">-{{item.fdPoints | numToThousandsRound}}</span>
                <span class="color-primary" v-if="item.fdType === 0">+{{item.fdPoints | numToThousandsRound}}</span>

              </td>
              <td>
                  {{item.fdDomainName}}
              </td>
              <td>{{item.remarks}}</td>
            </tr>
          </tbody>
        </table>
        <c-no-data v-if="!dataList.length">
          <div slot="tips">换换筛选条件更好哦！</div>
        </c-no-data>
        <div class="pagination" v-if="dataList.length">
          <el-pagination
            @current-change="handlePageChange"
            :current-page="pageIndex"
            :page-size="pageSize"
            layout="total, prev, pager, next, jumper"
            :total="itemTotal">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CTitle from 'components/CTitle'
import { DatePicker } from 'element-ui'
import CNoData from 'components/CNoData'
import utils from '../../../utils.js'
export default {
  data () {
    return {
      loading: false,
      pageIndex: 1,
      pageSize: 15,
      itemTotal: 0,
      params: {
        s_GTE_createdDate: '',
        s_LTE_createdDate: '',
        s_IN_fdType: '',
        sortName: 'createdDate',
        sortOrder: 'desc'
      },
      curType: '全部',
      typeList: ['全部', '收入', '支出'],
      dataList: [],
      gtDate: '',
      ltDate: ''
    }
  },
  mounted () {
    this.fetchData()
  },
  computed: {
    cGtDate () {
      var cGtDate = utils.formatTime(this.gtDate)
      if (cGtDate === 'NaN-NaN-NaN NaN:NaN:NaN') {
        cGtDate = ''
      }
      return cGtDate
    },
    cLtDate () {
      var cLtDate = utils.formatTime(this.ltDate)
      if (cLtDate === 'NaN-NaN-NaN NaN:NaN:NaN') {
        cLtDate = ''
      }
      return cLtDate
    }
  },
  methods: {
    fetchData () {
      this.loading = true
      this.$http.get('/pm/pointsDetail/list', {params: this.params}).then((resp) => {
        console.log('积分明细: ', resp)
        resp.data.data.forEach((item, index) => {
          let fdPoints = item.fdPoints + ''
          if (fdPoints.substring(0, 1) === '-') {
            item.fdPointsType = 'minus'
          } else {
            item.fdPointsType = 'plus'
          }
        })
        this.dataList = resp.data.data
        this.itemTotal = resp.data.total
        console.log(this.dataList)
        this.loading = false
      })
    },
    setCurType (item) {
      this.curType = item
      switch (item) {
        case '全部':
          this.params.s_IN_fdType = ''
          break
        case '收入':
          this.params.s_IN_fdType = 0
          break
        case '支出':
          this.params.s_IN_fdType = 1
      }
      this.fetchData()
    },
    handlePageChange (page) {
      this.params.pageIndex = page
      this.fetchData()
    },
    setDate () {
      this.params.s_GTE_createdDate = this.cGtDate
      this.params.s_LTE_createdDate = this.cLtDate
      this.fetchData()
    }
  },
  components: {
    [DatePicker.name]: DatePicker,
    CTitle,
    CNoData
  }
}
</script>
<style lang="less" scoped>
@import '../../../assets/styles/point-common.less';
.filter {
  padding: 35px 0;
  text-align: right;
  .date {
    display: inline-block;
    font-size: 14px;
    .date-picker {
      width: 275px;
    }
  }
  .date, .search-btn {
    margin-left: 60px;
  }
}
.record-table {
  width: 100%;
  text-align: center;
  font-size: 14px;
  thead {
    background-color: @color-bg2;
    th {
      padding: 10px 0;
      text-align: center;
    }
  }
  tbody {
    tr {
      td {
        padding: 20px 0;
      }
    }
  }
}
.color-green {
  color: #62a656;
}
</style>
