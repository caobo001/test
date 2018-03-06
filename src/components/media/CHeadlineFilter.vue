<template>
<div class="filter-wrap">
  <div class="filter-box">
    <div class="section clearfix" v-loading="optTrades.length === 0">
      <div class="title pull-left">
        <img src="../../assets/img/filter-category.png" class="filter-icon">
        <span class="vertical-middle">分类</span>
      </div>
      <div class="content pull-right">
        <el-checkbox-group v-model="trades" class="trades" :class="{spread: toggle}">
          <el-checkbox :label="trade.text" v-for="trade in optTrades" :key="trade.text"></el-checkbox>
          <el-checkbox style="margin-left: -3.5px;" label="地方大号" v-model="this.local"></el-checkbox>
        </el-checkbox-group>

        <c-toggle class="more" v-model="toggle"></c-toggle>
        <div class="separate-line"></div>
      </div>
    </div>

    <div class="section clearfix">
      <div class="title pull-left">
        <img src="../../assets/img/filter-advType.png" class="filter-icon">
        <span class="vertical-middle">广告类型</span>
      </div>
      <div class="content pull-right">
        <span
          class="advType cursor-pointer"
          :class="{'active': item.name === advType}"
          v-for="item in advtypedata"
          :key="item.specId"
          @click="getSpecId(item.specId, item.name)">
          {{item.name}}
        </span>
        <div class="separate-line"></div>
      </div>
    </div>

    <div class="section clearfix">
      <div class="title pull-left">
        <img src="../../assets/img/filter-price.png" class="filter-icon">
        <span class="vertical-middle">价格</span>
      </div>
      <div class="content pull-right">
        <ul class="inline-block">
          <li class="inline-block" v-for="price in optPriceRange" :key="price.text" v-if="price.flag !== true">
            <a href="javascript:" @click="pick(optPriceRange, price)" :class="{ active: price.isActive }">{{price.text}}</a>
          </li>
        </ul>
        <div class="pull-right inline-block mr20">
          <el-input-number v-model="priceRange.gtCurPrice" :min="0"></el-input-number>—
          <el-input-number v-model="priceRange.ltCurPrice" :min="0"></el-input-number>元
          <el-button size="mini" @click="setToOpt(priceRange, optPriceRange, 'price')">确认</el-button>
        </div>
        <div class="separate-line"></div>
      </div>
    </div>

    <div class="section clearfix">
      <div class="title pull-left">
        <img src="../../assets/img/filter-fans.png" class="filter-icon">
        <span class="vertical-middle">粉丝数</span>
      </div>
      <div class="content pull-right">
        <ul class="inline-block">
          <li class="inline-block" v-for="fanCount in optFanRange" :key="fanCount.text" v-if="fanCount.flag !== true">
            <a href="javascript:" @click="pick(optFanRange, fanCount)" :class="{ active: fanCount.isActive }">{{fanCount.text}}</a>
          </li>
        </ul>
        <div class="pull-right inline-block mr20">
          <el-input-number v-model="fanRange.gtCurFanCount" :min="0"></el-input-number>—
          <el-input-number v-model="fanRange.ltCurFanCount" :min="0"></el-input-number>万
          <el-button size="mini" @click="setToOpt(fanRange, optFanRange, 'fan')">确认</el-button>
        </div>
        <div class="separate-line"></div>
      </div>
    </div>

    <div class="section clearfix">
      <div class="title pull-left">
        <img src="../../assets/img/filter-position.png" class="filter-icon">
        <span class="vertical-middle">地区</span>
      </div>
      <div class="content pull-right">
        <ul class="inline-block hot-area-list">
          <li class="inline-block" v-for="area in optArea" :key="area.text">
            <a href="javascript:" @click="pick(optArea, area, 'area')" :class="{ active: area.isActive }">{{area.text}}</a>
          </li>
        </ul>
         <!--<a href="javascript:;" @click="setLocal()">地方大号</a>-->
         <el-select v-model="province" size="mini" placeholder="选择省份">
          <el-option
            v-for="item in optProvince"
            :label="item.name"
            :key="item.id"
            :value="item.id">
          </el-option>
         </el-select>

         <el-select v-model="city" size="mini" placeholder="选择城市" clearable v-show="fetchedCity.length != 0">
          <el-option
            v-for="item in fetchedCity"
            :label="item.name"
            :key="item.id"
            :value="item.id">
          </el-option>
         </el-select>
         <el-button @click="confirmArea" size="mini">确认</el-button>
         <div class="separate-line"></div>
      </div>
    </div>

    <div class="section clearfix">
      <div class="title pull-left"></div>
      <div class="content pull-right other-filter">
        <div class="range">
          易指数
          <el-input-number v-model="weightRange.gt" :min="0"></el-input-number>至
          <el-input-number v-model="weightRange.lt" :min="0"></el-input-number>
          <div class="range-in">
            <span class="clear-btn" @click="clearRange(weightRange)">清空</span>
            <button class="confirm-btn" @click="setRange(weightRange)">确定</button>
          </div>
        </div>

        <div class="range">
          阅读数
          <el-input-number v-model="readRange.gt" :min="0"></el-input-number>至
          <el-input-number v-model="readRange.lt" :min="0"></el-input-number>
          <div class="range-in">
            <span class="clear-btn" @click="clearRange(readRange)">清空</span>
            <button class="confirm-btn" @click="setRange(readRange)">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="selected-opts" v-show="showSelected">

    <ul class="inline-block">
      <li class="first">已选择：</li>
      <li v-show="!!filterKeys.trades.length">
        分类：{{filterKeys.trades | arr2str}}
        <i class="iconfont icon-delete" @click="clearFilter('trades')"></i>
      </li>
      <li  v-show="advType !== '不限'">
        广告类型：
        <span v-for="item in advtypedata" :key="item.specId" v-show="filterKeys.goodSpecId === item.specId">{{advType}}</span>
        <i class="iconfont icon-delete" @click="clearFilter('goodSpecId')"></i>
      </li>
      <li v-show="!!filterKeys.priceRange.gtPrice || !!filterKeys.priceRange.ltPrice">
        价格：{{filterKeys.priceRange.text}}
        <i class="iconfont icon-delete" @click="clearFilter('priceRange')"></i>
      </li>
      <li v-show="!!filterKeys.fanRange.gtFanCount || !!filterKeys.fanRange.ltFanCount">
        粉丝数：{{filterKeys.fanRange.text}}
        <i class="iconfont icon-delete" @click="clearFilter('fanRange')"></i>
      </li>
      <li v-show="!!filterKeys.area.name">
        区域：{{filterKeys.area.name || filterKeys.area.fdFullName}}
        <i class="iconfont icon-delete" @click="clearFilter('area')"></i>
      </li>
      <li v-show="!!filterKeys.local">
        区域：地方大号
        <i class="iconfont icon-delete" @click="clearFilter('local')"></i>
      </li>
      <li v-show="filterKeys.readRange.text !== ''">
        阅读量：{{filterKeys.readRange.text}}
        <i class="iconfont icon-delete" @click="clearFilter('read')"></i>
      </li>
      <li v-show="filterKeys.weightRange.text !== ''">
        易指数：{{filterKeys.weightRange.text}}
        <i class="iconfont icon-delete" @click="clearFilter('weight')"></i>
      </li>
      <li class="clearAll" @click="clearFilter('all')">
        <i class="iconfont icon-lajixiang"></i>
        清空选项
      </li>

    </ul>
  </div>

</div>
</template>

<script>
import { CheckboxGroup, InputNumber } from 'element-ui'
import { optWriterType, optPriceRange, optArea, optFanRange } from 'assets/scripts/filter-config.js'
import Utils from '../../utils.js'

export default {
  name: 'CFilter',
  mounted () {
    if (this.$route.query.trades) {
      this.trades = this.$route.query.trades.split(',')
    }
    if (this.$route.query.gtReadRange) {
      this.readRange.gt = this.$route.query.gtReadRange
      this.readRange.ngt = this.$route.query.gtReadRange
      this.readRange.text = this.readRange.ngt + '以上'
    }
    if (this.$route.query.local) {
      this.setLocal()
    }
    if (this.optTrades.length === 0) {
      this.$store.dispatch('fetchTrades')
    }
    if (this.optProvince.length === 0) {
      this.$store.dispatch('fetchProvinceList')
    }
  },
  data () {
    return {
      optWriterType: Utils.deepClone(optWriterType),
      optPriceRange: Utils.deepClone(optPriceRange),
      optFanRange: Utils.deepClone(optFanRange),
      optArea: Utils.deepClone(optArea),
      fetchedCity: [],
      trades: [],
      province: '',
      city: '',
      customArea: {},
      goodSpecId: '',
      toggle: false,
      advType: '不限',
      priceRange: {
        text: '',
        gtCurPrice: '',
        ltCurPrice: '',
        gtPrice: '',
        ltPrice: '',
        isActive: false,
        flag: true
      },
      fanRange: {
        text: '',
        gtCurFanCount: '',
        ltCurFanCount: '',
        gtFanCount: '',
        ltFanCount: '',
        isActive: false,
        flag: true
      },
      readRange: {
        gt: '',
        lt: '',
        ngt: '',
        nlt: '',
        text: '',
        type: 'read'
      },
      weightRange: {
        gt: '',
        lt: '',
        ngt: '',
        nlt: '',
        text: '',
        type: 'weight'
      },
      local: false,
      testNum: ''
    }
  },
  props: {
    advtypedata: {
      type: Array
    }
  },
  computed: {
    filterKeys () {
      var writerType, priceRange, area, goodSpecId, fanRange, advType
      var gtRead, ltRead, gtPublish, ltPublish, readRange, local
      var weightRange, gtWeight, ltWeight
      writerType = _.find(this.optWriterType, {'isActive': true})
      priceRange = _.find(this.optPriceRange, {'isActive': true})
      fanRange = _.find(this.optFanRange, {'isActive': true})
      area = _.isEmpty(this.customArea) ? _.find(this.optArea, {'isActive': true}) : this.customArea
      if (this.advType === '不限') {
        goodSpecId = this.advtypedata[0].defaultSpecId
      } else {
        goodSpecId = this.goodSpecId
      }
      advType = this.advType

      readRange = this.readRange
      weightRange = this.weightRange

      gtRead = this.readRange.ngt
      ltRead = this.readRange.nlt
      gtWeight = this.weightRange.ngt
      ltWeight = this.weightRange.nlt

      local = this.local
      console.log('this.trades: ', this.trades)
      return {
        trades: this.trades,
        writerType,
        priceRange,
        area,
        goodSpecId,
        fanRange,
        advType,
        readRange,
        weightRange,
        gtRead,
        ltRead,
        gtPublish,
        ltPublish,
        gtWeight,
        ltWeight,
        local
      }
    },
    showSelected () {
      return !!this.filterKeys.trades.length ||
        !!this.filterKeys.writerType.value ||
        !!this.filterKeys.priceRange.gtPrice ||
        !!this.filterKeys.priceRange.ltPrice ||
        !!this.filterKeys.area.name ||
        this.filterKeys.advType !== '不限' ||
        !!this.filterKeys.fanRange.gtFanCount ||
        !!this.filterKeys.fanRange.ltFanCount ||
        this.filterKeys.readRange.text !== '' ||
        this.filterKeys.weightRange.text !== '' ||
        !!this.filterKeys.local
    },
    optTrades () {
      return this.$store.state.trades
    },
    optProvince () {
      return this.$store.state.provinceList
    }
  },
  watch: {
    priceRange () {
      console.log(this.priceRange.gtPrice, this.priceRange.ltPrice)
      if (this.priceRange.gtPrice >= this.priceRange.ltPrice) {
        this.priceRange.gtPrice = ''
        this.priceRange.ltPrice = ''
      }
    },
    filterKeys (newValue) {
      let trades = Utils.deepClone(newValue.trades)
      let local = ''
      if (trades.indexOf('地方大号') >= 0) {
        local = 1
        console.log(trades.indexOf('地方大号'))
        trades.splice(trades.indexOf('地方大号'), 1)
      }
      this.$store.dispatch('goodsList/setFilter',
      Utils.deepClone({
        trades: trades.join(','),
        writerType: newValue.writerType.value,
        gtPrice: newValue.priceRange.gtPrice,
        ltPrice: newValue.priceRange.ltPrice,
        gtFanCount: newValue.fanRange.gtFanCount,
        ltFanCount: newValue.fanRange.ltFanCount,
        area: newValue.area.name,
        goodSpecId: newValue.goodSpecId,
        advType: newValue.advType,
        gtReadCount: newValue.gtRead,
        ltReadCount: newValue.ltRead,
        gtPublishCount: newValue.gtPublish,
        ltPublishCount: newValue.ltPublish,
        gtWeight: newValue.gtWeight,
        ltWeight: newValue.ltWeight,
        local: local
      }))
    },
    province (newValue) {
      this.city = {}
      if (newValue) {
        this.$http.get(
          '/common/area',
          {params: {
            parentId: newValue
          }}
        ).then((resp) => {
          this.fetchedCity = resp.data
          this.city = ''
        })
      }
    }
  },
  methods: {
    pick (parent, item, type) {
      _.forEach(parent, (obj) => {
        obj.isActive = false
      })
      item.isActive = true
      if (type === 'area') {
        this.province = ''
        this.city = ''
        this.customArea = {}
        this.fetchedCity = []
        this.local = ''
      }
    },
    confirmArea () {
      if (_.isEmpty(this.city)) {
        this.customArea = _.find(this.optProvince, { 'id': this.province })
      } else {
        this.customArea = _.find(this.fetchedCity, { 'id': this.city })
      }
    },
    reset (field) {
      _.forEach(field, (obj) => {
        obj.isActive = false
      })
      field[0].isActive = true
    },
    resetRange (obj) {
      for (var prop in obj) {
        console.log(prop)
        if (prop === 'isActive') {
          obj[prop] = false
        } else if (prop === 'flag') {
          obj[prop] = true
        } else {
          obj[prop] = ''
        }
      }
    },
    clearFilter (label) {
      switch (label) {
        case 'writerType':
          this.reset(this.optWriterType)
          break
        case 'goodSpecId':
          this.goodSpecId = ''
          this.advType = '不限'
          break
        case 'priceRange':
          this.reset(this.optPriceRange)
          this.resetRange(this.priceRange)
          break
        case 'fanRange':
          this.reset(this.optFanRange)
          this.resetRange(this.fanRange)
          break
        case 'area':
          this.reset(this.optArea)
          this.province = ''
          this.city = ''
          this.customArea = {}
          this.fetchedCity = []
          break
        case 'local':
          this.local = ''
          break
        case 'trades':
          this.trades = []
          break
        case 'read':
          this.clearRange(this.readRange)
          break
        case 'weight':
          this.clearRange(this.weightRange)
          break
        case 'all':
          this.resetAll()
          break
      }
    },
    // 以下三个方法可共外部调用
    resetAll () {
      this.reset(this.optWriterType)
      this.reset(this.optPriceRange)
      this.reset(this.optArea)
      this.province = ''
      this.city = ''
      this.customArea = {}
      this.local = ''
      this.trades = []
      this.fetchedCity = []
      this.goodSpecId = ''
      this.advType = '不限'
      this.resetRange(this.priceRange)
      this.resetRange(this.fanRange)
      this.reset(this.optFanRange)
      this.clearRange(this.readRange)
      this.clearRange(this.weightRange)
    },
    pickTrade (trade) {
      this.trades.push(trade)
    },
    pickWriterType (statusNum) {
      _.forEach(this.optWriterType, (item) => {
        item.isActive = false
      })
      _.find(this.optWriterType, {value: String(statusNum)}).isActive = true
    },
    getSpecId (specId, name) {
      this.goodSpecId = specId
      this.advType = name
    },
    setRange (range) {
      if (range.gt >= range.lt) {
        range.gt = ''
        range.lt = ''
      } else {
        range.ngt = range.gt
        range.nlt = range.lt
        range.text = range.ngt + ' - ' + range.nlt
      }
    },
    clearRange (range) {
      range.gt = ''
      range.lt = ''
      range.ngt = ''
      range.nlt = ''
      range.text = ''
    },
    setToOpt (obj, opt, type) {
      if (type === 'price') {
        obj.gtPrice = obj.gtCurPrice
        if (obj.ltCurPrice === 0) {
          obj.ltPrice = ''
        } else {
          obj.ltPrice = obj.ltCurPrice
        }
      } else if (type === 'fan') {
        obj.gtFanCount = obj.gtCurFanCount
        if (obj.ltCurFanCount === 0) {
          obj.ltFanCount = ''
        } else {
          obj.ltFanCount = obj.ltCurFanCount
        }
      }
      this.setOpt(obj, opt, type)
    },
    setOpt (obj, opt, type) {
      switch (type) {
        case 'price':
          if (!obj.ltPrice) {
            obj.text = obj.gtPrice + '以上'
          } else {
            obj.text = obj.gtPrice + ' - ' + obj.ltPrice
          }
          break
        case 'fan':
          if (!obj.ltFanCount) {
            obj.text = obj.gtFanCount + '万以上'
          } else {
            obj.text = obj.gtFanCount + '万 - ' + obj.ltFanCount + '万'
          }
      }
      if (opt[opt.length - 1].flag !== true) {
        opt.push(obj)
      } else {
        opt.splice(opt.length - 1)
        opt.push(obj)
      }
      opt[opt.length - 1].isActive = true
      if (_.find(opt, {'isActive': true}).flag !== true) {
        _.find(opt, {'isActive': true}).isActive = false
      }
    },
    setLocal () {
      this.local = true
    }
  },
  components: {
    [CheckboxGroup.name]: CheckboxGroup,
    [InputNumber.name]: InputNumber
  }
}

</script>
<style lang="less" scoped>
@import '../../assets/styles/filter.less';

.count-range {
  position: relative;
  z-index: 0;
  width: 242px;
  height: 25px;
  margin: 0 10px;
  font-size: 14px;
  .count-range-con {
    position: absolute;
  }
  .count-range-wrapper {
    display: none;
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 75px;
    padding: 8px 20px;
    top: -8px;
    left: -20px;
    box-sizing: border-box;
    .operate {
      margin-top: 35px;
      .clear {
        color: @color-link;
      }
      button {
        margin-right: 0px;
        padding: 0 8px;
        background-color: @color-bg;
        border: 1px solid @color-border;
      }
    }
  }
  &:hover {
    .count-range-wrapper {
      display: block;
      border: 1px solid darken(@color-border, 5%);
      background-color: @color-white;
    }
  }
}
.last-read-count.count-range {
  .count-range-wrapper {
    left: -12px;
    .clear {
      margin-left: -8px;
    }
    button {
      margin-right: -5px;
    }
  }
}
.weightWeek.count-range {
  width: 230px;
}
</style>
<style lang="less">
@import '../../assets/styles/variables.less';
.filter-wrap .el-input-number {
  margin: 0 5px;
  display: inline-block;
  width: 54px !important;
  vertical-align: middle;;
  .el-input__inner {
    height: 24px;
    border-radius: 0;
    padding: 0 3px 0 3px !important;
    border: 1px solid @color-border;
  }
  .el-input-number__increase,
  .el-input-number__decrease {
    display: none;
  }
}
</style>
