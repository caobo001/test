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
          <li class="inline-block" v-for="fanCount in optFanRange" :key="fanCount.text"  v-if="fanCount.flag !== true">
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
      <div class="title pull-left">
        <img src="../../assets/img/filter-idfy.png" class="filter-icon">
        <span class="vertical-middle">认证类型</span>
      </div>
      <div class="content pull-right">
        <ul class="inline-block">
          <li class="inline-block" v-for="vipType in optVipType" :key="vipType.text">
            <a href="javascript:" @click="pick(optVipType, vipType, 'vipType')" :class="{ active: vipType.isActive }">{{vipType.text}}</a>
          </li>
        </ul>
        <div class="separate-line"></div>
      </div>
    </div>

    <div class="section clearfix">
      <div class="title pull-left"></div>
      <div class="content pull-right">
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
          转发数
          <el-input-number v-model="forwardRange.gt" :min="0"></el-input-number>至
          <el-input-number v-model="forwardRange.lt" :min="0"></el-input-number>
          <div class="range-in">
            <span class="clear-btn" @click="clearRange(forwardRange)">清空</span>
            <button class="confirm-btn" @click="setRange(forwardRange)">确定</button>
          </div>
        </div>

        <div class="range">
          点赞数
          <el-input-number v-model="likeRange.gt" :min="0"></el-input-number>至
          <el-input-number v-model="likeRange.lt" :min="0"></el-input-number>
          <div class="range-in">
            <span class="clear-btn" @click="clearRange(likeRange)">清空</span>
            <button class="confirm-btn" @click="setRange(likeRange)">确定</button>
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
      <li v-show="advType !== '不限'">
        广告类型：
        <span>{{advType}}</span>
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
      <li v-show="!!filterKeys.vipType.value">
        类型：{{filterKeys.vipType.text}}
        <i class="iconfont icon-delete" @click="clearFilter('vipType')"></i>
      </li>
      <li v-show="filterKeys.weightRange.text !== ''">
        易指数：{{filterKeys.weightRange.text}}
        <i class="iconfont icon-delete" @click="clearFilter('weight')"></i>
      </li>
      <li v-show="filterKeys.forwardRange.text !== ''">
        转发数：{{filterKeys.forwardRange.text}}
        <i class="iconfont icon-delete" @click="clearFilter('forward')"></i>
      </li>
      <li v-show="filterKeys.commentRange.text !== ''">
        评论数：{{filterKeys.commentRange.text}}
        <i class="iconfont icon-delete" @click="clearFilter('comment')"></i>
      </li>
      <li v-show="filterKeys.likeRange.text !== ''">
        点赞数：{{filterKeys.likeRange.text}}
        <i class="iconfont icon-delete" @click="clearFilter('like')"></i>
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
import { optWriterType, optPriceRange, optArea, optFanRange, optVipType } from 'assets/scripts/filter-config.js'
import Utils from '../../utils.js'

export default {
  name: 'CFilter',
  mounted () {
    if (this.$route.query.trades) {
      this.trades = this.$route.query.trades.split(',')
    }
    if (this.$route.query.gtFanRange) {
      this.fanRange.gtCurFanCount = this.$route.query.gtFanRange
      this.setToOpt(this.fanRange, this.optFanRange, 'fan')
    }
    if (this.$route.query.vipType) {
      _.find(this.optVipType, {'isActive': true}).isActive = false
      _.find(this.optVipType, {'text': this.$route.query.vipType}).isActive = true
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
      optVipType: Utils.deepClone(optVipType),
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
      weightRange: {
        gt: '',
        lt: '',
        ngt: '',
        nlt: '',
        text: '',
        type: 'weight'
      },
      forwardRange: {
        gt: '',
        lt: '',
        ngt: '',
        nlt: '',
        text: '',
        type: 'forward'
      },
      commentRange: {
        gt: '',
        lt: '',
        ngt: '',
        nlt: '',
        text: '',
        type: 'comment'
      },
      likeRange: {
        gt: '',
        lt: '',
        ngt: '',
        nlt: '',
        text: '',
        type: 'like'
      }
    }
  },
  props: {
    value: {},
    advtypedata: {
      type: Array
    }
  },
  computed: {
    filterKeys () {
      var writerType, priceRange, area, goodSpecId, fanRange, vipType, advType
      var weightRange, forwardRange, commentRange, likeRange
      var gtWeight, ltWeight, gtForward, ltForward, gtComment, ltComment, gtLike, ltLike

      writerType = _.find(this.optWriterType, {'isActive': true})
      priceRange = _.find(this.optPriceRange, {'isActive': true})
      fanRange = _.find(this.optFanRange, {'isActive': true})
      vipType = _.find(this.optVipType, {'isActive': true})
      area = _.isEmpty(this.customArea) ? _.find(this.optArea, {'isActive': true}) : this.customArea
      if (this.advType === '不限') {
        goodSpecId = this.advtypedata[0].defaultSpecId
      } else {
        goodSpecId = this.goodSpecId
      }
      advType = this.advType

      weightRange = this.weightRange
      forwardRange = this.forwardRange
      commentRange = this.commentRange
      likeRange = this.likeRange

      gtWeight = this.weightRange.ngt
      ltWeight = this.weightRange.nlt

      gtForward = this.forwardRange.ngt
      ltForward = this.forwardRange.nlt

      gtComment = this.commentRange.ngt
      ltComment = this.commentRange.nlt

      gtLike = this.likeRange.ngt
      ltLike = this.likeRange.nlt

      console.log(this.weightRange.ngt, this.weightRange.nlt)
      return {
        trades: this.trades,
        writerType,
        priceRange,
        area,
        goodSpecId,
        fanRange,
        weightRange,
        forwardRange,
        commentRange,
        likeRange,
        gtWeight,
        ltWeight,
        gtForward,
        ltForward,
        gtComment,
        ltComment,
        gtLike,
        ltLike,
        vipType,
        advType
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
        this.filterKeys.weightRange.text !== '' ||
        this.filterKeys.forwardRange.text !== '' ||
        this.filterKeys.commentRange.text !== '' ||
        this.filterKeys.likeRange.text !== '' ||
        !!this.filterKeys.vipType.value
    },
    optTrades () {
      return this.$store.state.trades
    },
    optProvince () {
      return this.$store.state.provinceList
    }
  },
  watch: {
    filterKeys (newValue) {
      console.log(newValue)
      this.$store.dispatch('goodsList/setFilter', Utils.deepClone({
        trades: newValue.trades.join(','),
        writerType: newValue.writerType.value,
        gtPrice: newValue.priceRange.gtPrice,
        ltPrice: newValue.priceRange.ltPrice,
        gtFanCount: newValue.fanRange.gtFanCount,
        ltFanCount: newValue.fanRange.ltFanCount,
        gtWeight: newValue.gtWeight,
        ltWeight: newValue.ltWeight,
        gtForward: newValue.gtForward,
        ltForward: newValue.ltForward,
        gtComment: newValue.gtComment,
        ltComment: newValue.ltComment,
        gtLike: newValue.gtLike,
        ltLike: newValue.ltLike,
        area: newValue.area.name,
        goodSpecId: newValue.goodSpecId,
        vipType: newValue.vipType,
        advType: newValue.advType
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
        case 'trades':
          this.trades = []
          break
        case 'vipType':
          this.reset(this.optVipType)
          break
        case 'weight':
          this.clearRange(this.weightRange)
          break
        case 'forward':
          this.clearRange(this.forwardRange)
          break
        case 'comment':
          this.clearRange(this.commentRange)
          break
        case 'like':
          this.clearRange(this.likeRange)
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
      this.reset(this.optFanRange)
      this.reset(this.optArea)
      this.province = ''
      this.city = ''
      this.customArea = {}
      this.trades = []
      this.fetchedCity = []
      this.goodSpecId = ''
      this.advType = '不限'
      this.reset(this.optVipType)
      this.resetRange(this.priceRange)
      this.resetRange(this.fanRange)
      this.clearRange(this.weightRange)
      this.clearRange(this.forwardRange)
      this.clearRange(this.commentRange)
      this.clearRange(this.likeRange)
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
      console.log(range.ngt, range.nlt, range.text)
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
          obj.text = obj.gtPrice + ' - ' + obj.ltPrice
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
.other-filter-box {
  padding: 8px 20px;
  background-color: @color-bg2;
}
.count-range {
  position: relative;
  z-index: 0;
  width: 230px;
  height: 25px;
  font-size: 14px;
  margin: 0 10px;
  .count-range-con {
    position: absolute;
  }
  .count-range-wrapper {
    display: none;
    z-index: -1;
    position: absolute;
    width: 230px;
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
        margin-right: 3px;
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
</style>
