<template>
  <div class="media-bill-list">
    <c-title title="账单记录"></c-title>
    <div class="container clearfix">
      <c-menu class="pull-left mt10"></c-menu>
      <div class="container-right pull-right mt10">
        <ul class="tab-list clearfix">
          <li
            v-for="item in typeList"
            :key="item"
            :class="{'active': item === activeType}"
            @click="setActiveType(item)">
            {{item}}
          </li>
        </ul>

        <div class="main-content mt10">
          <div class="filter">
            <span>时间：</span>
            <el-date-picker
              clearable
              v-model="gtCurDate"
              type="date"
              format="yyyy-MM-dd"
              @change="setDate"
              placeholder="选择日期时间"
              class="date-picker">
            </el-date-picker>
            —
            <el-date-picker
              clearable
              v-model="ltCurDate"
              type="date"
              format="yyyy-MM-dd"
              @change="setDate"
              placeholder="选择日期时间"
              class="date-picker">
            </el-date-picker>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <div class="pull-right">
              <span
                class="time-choice"
                :class="{'cur': activeTimeRange === '今天'}"
                @click="setActiveTimeRange('今天')">
                今天
              </span>
              <span class="longitudinal-bar color-font-light2">|</span>
              最近：&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                class="time-choice mr15"
                :class="{'cur': activeTimeRange === '1个月'}"
                @click="setActiveTimeRange('1个月')">
                1个月
              </span>
              <span
                class="time-choice mr15"
                :class="{'cur': activeTimeRange === '3个月'}"
                @click="setActiveTimeRange('3个月')">
                3个月
              </span>
              <span
                class="time-choice mr15"
                :class="{'cur': activeTimeRange === '1年'}"
                @click="setActiveTimeRange('1年')">
                1年
              </span>
            </div>

          </div>

          <div class="total-line">
            <span class="cn vertical-middle">销账</span>
            <span class="num">
              ￥{{statistic.chargeOffTotal}}
            </span>
            <span class="longitudinal-bar vertical-middle"></span>
            <span class="cn vertical-middle">充值</span>
            <span class="num">
              ￥{{statistic.rechargeTotal}}
            </span>
          </div>

          <table class="bill-list-table" v-loading.fullscreen="loading" element-loading-text="拼命加载中">
            <thead>
              <tr>
                <th>流水号</th>
                <th>日期</th>
                <th class="type">类型</th>
                <th>金额(元)</th>
                <!-- <th>详情</th> -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in dataList" :key="item.id">
                <td class="serial-num">{{item.fdNo}}</td>
                <td>{{item.created_date}}</td>
                <td class="type">
                  <div class="cn" v-if="item.fdTnsType === 20 || item.fdTnsType === 100">充值</div>
                  <div class="cn" v-if="item.fdTnsType === 30 || item.fdTnsType === 110">销账</div>
                  <div class="cn" v-if="item.fdTnsType === 80">其他</div>
                  <!--<div class="info color-font-light2">中国工商银行 | 62212****3625 </div>-->
                </td>
                <td class="money-num"><span class="green">{{item.fdTnsBottom}}</span></td>
              </tr>
            </tbody>
          </table>
          <c-no-data v-if="dataList.length === 0"></c-no-data>
          <c-modal v-model="modal" :opts="optModal">
            <c-bill-detail :bill="bill"></c-bill-detail>
          </c-modal>
          <div class="pagination">
            <el-pagination
              v-if="dataList.length !== 0"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="itemTotal">
            </el-pagination>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {DatePicker} from 'element-ui'
import CModal from 'components/CModal'
import CNoData from 'components/CNoData'
import CBillDetail from 'components/media/CBillDetail'
import CTitle from 'components/CTitle'
import utils from '../../utils.js'
export default {
  mounted () {
    this.fetchData()
  },
  title () {
    return '账单记录'
  },
  data () {
    return {
      pageIndex: 1,
      pageSize: 15,
      itemTotal: 0,
      gtCurDate: '',
      ltCurDate: '',
      gtDate: '',
      ltDate: '',
      loading: false,
      detailLoading: false,
      dataList: [],
      statistic: {},
      bill: {},
      billId: '',
      activeType: '全部',
      tnsType: '',
      activeTimeRange: '',
      modal: false,
      optModal: {
        title: '账单详情'
      },
      typeList: ['全部', '销账', '充值', '其他']
    }
  },
  computed: {
    cgtCurDate () {
      var cgtCurDate = utils.formatTime(this.gtCurDate)

      return cgtCurDate
    },
    cltCurDate () {
      var cltCurDate = utils.formatTime(this.ltCurDate)
      return cltCurDate
    },
    fetchParams () {
      var params = {
        pageIndex: this.pageIndex,
        gtDate: this.gtDate,
        ltDate: this.ltDate,
        tnsType: this.tnsType
      }
      return params
    }
  },
  watch: {
    fetchParams (newValue, oldValue) {
      var gtDate = newValue.gtDate
      var ltDate = newValue.ltDate
      if (gtDate === 'NaN-NaN-NaN NaN:NaN:NaN') {
        gtDate = ''
      } else {
        gtDate = gtDate.split(' ')[0]
      }
      if (ltDate === 'NaN-NaN-NaN NaN:NaN:NaN') {
        ltDate = ''
      } else {
        ltDate = ltDate.split(' ')[0]
      }
      var params = {
        pageIndex: this.pageIndex,
        s_createdDateStart: gtDate,
        s_createdDateEnd: ltDate,
        s_fdTnsType: newValue.tnsType
      }
      this.fetchData(params)
    }
  },
  methods: {
    fetchData (params) {
      this.loading = true
      this.$http.get('/tns/list', {params}).then((resp) => {
        this.dataList = resp.data.data
        this.itemTotal = resp.data.total
        this.statistic = resp.data.statistic
      }).finally(() => {
        this.loading = false
      })
    },
    fetchBillDetail (params) {
      this.detailLoading = true
      this.$http.get(`/tns/${this.billId}`, {params}).then((resp) => {
        this.bill = resp.data
        this.modal = true
      }).finally(() => {
        this.detailLoading = false
      })
    },
    handleCurrentChange (page) {
      this.pageIndex = page
    },
    setActiveTimeRange (timeRange) {
      this.activeTimeRange = timeRange
      this.pageIndex = 1
      var today = utils.formatTime(new Date())
      var todayDate = today.split(' ')[0]
      var toYear = todayDate.split('-')[0]
      var toMonth = todayDate.split('-')[1]
      var toDay = todayDate.split('-')[2]
      switch (timeRange) {
        case '今天':
          this.gtDate = this.getDateStr(0)
          break
        case '1个月':
          var lastMonth = toMonth - 1
          if (lastMonth === 0) {
            lastMonth = 12
            toYear = toYear - 1
          } else {
            if (lastMonth === 2 && toDay >= 28) { // 判断二月的特殊情况
              toDay = 28
            }
          }
          if (lastMonth < 10) {
            lastMonth = '0' + lastMonth
          }
          if (toDay < 10) {
            toDay = '0' + toDay
          }
          this.gtDate = toYear + '-' + lastMonth + '-' + toDay
          break
        case '3个月':
          var lastThreeMonth = toMonth - 3
          if (lastThreeMonth === 0) {
            lastThreeMonth = 12
            toYear = toYear - 1
          } else {
            if (lastThreeMonth === 2 && toDay >= 28) { // 判断二月的特殊情况
              toDay = 28
            }
          }
          if (lastThreeMonth < 10) {
            lastThreeMonth = '0' + lastThreeMonth
          }
          if (toDay < 10) {
            toDay = '0' + toDay
          }
          this.gtDate = toYear + '-' + lastThreeMonth + '-' + toDay
          break
        case '1年':
          if (toMonth < 10) {
            lastMonth = '0' + toMonth
          }
          if (toDay < 10) {
            toDay = '0' + toDay
          }
          this.gtDate = (toYear - 1) + '-' + toMonth + '-' + toDay
      }
      // this.ltDate = todayDate

      this.gtCurDate = this.gtDate
      this.ltCurDate = this.getDateStr(1)
      this.ltDate = this.getDateStr(1)
    },
    getDateStr (AddDayCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount) // 获取AddDayCount天后的日期
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1 // 获取当前月份的日期
      if (m < 10) {
        m = '0' + m
      }
      var d = dd.getDate()
      if (d < 10) {
        d = '0' + d
      }
      return y + '-' + m + '-' + d
    },
    setActiveType (type) {
      this.activeType = type
      switch (type) {
        case '全部':
          this.tnsType = ''
          break
        case '销账':
          this.tnsType = '30,110'
          break
        case '充值':
          this.tnsType = '20,100'
          break
        case '其他':
          this.tnsType = '80'
      }
    },
    setDate () {
      this.gtDate = this.cgtCurDate
      this.ltDate = this.cltCurDate
    },
    viewDetail (id) {
      this.billId = id
      this.fetchBillDetail()
    }
  },
  components: {
    [DatePicker.name]: DatePicker,
    CModal,
    CNoData,
    CBillDetail,
    CTitle
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
.media-bill-list {
  background-color: @color-bg;
}
.container {
  width: 1200px;
  padding-bottom: 50px;
  .container-right {
    width: 1030px;
  }
}
.main-content {
  background-color: @color-bg;
  padding: 20px 10px;
}
.tab-list {
  li {
    float: left;
    padding: 15px 0;
    margin-right: 60px;
    font-size: 16px;
    cursor: default;
    &.active {
      color: @color-primary;
      border-bottom: 3px solid @color-primary;
    }
  }
}
.filter {
  font-size: 14px;
  .longitudinal-bar {
    margin: 0 15px;
  }
  .time-choice {
    display: inline-block;
    width: 70px;
    height: 35px;
    text-align: center;
    line-height: 35px;
    border: 1px solid #dddddd;
    cursor: default;
    &.cur {
      background-color: @color-primary;
      color: #ffffff;
    }
  }
}
.date-picker {
  width: 205px;
  vertical-align: middle;
}
.green {
  color: #35b974;
}
.red {
  color: #ff002a;
}
.total-line {
  margin: 35px 0 45px 0;
  font-size: 24px;
  text-align: center;
  .longitudinal-bar {
    display: inline-block;
    width: 1px;
    height: 16px;
    margin: 0 35px;
  }
  .cn {
    color: @color-font-light2;
    vertical-align: middle;
  }
  .num {
    vertical-align: middle;
  }
}
.bill-list-table {
  width: 100%;
  text-align: center;
  font-size: 14px;
  .type {
    text-align: left;
    padding-left: 20px;
  }
  thead {
    tr {
      background-color: @color-bg2;
      th {
        padding: 14px 0;
        text-align: center;
      }
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid @color-bg2;
      td {
        padding: 20px 0;
        vertical-align: top;
        font-size: 14px;
        &.serial-num {
          width: 245px;
        }
        &.type {
          width: 150px;
        }
        &.detail {
          width: 150px;
          a {
            color: #00aaee;
          }
        }
      }
    }
  }
}
.rmb {
  font-size: 14px;
}
.mr15 {
  margin-right: 15px;
}
</style>
