<template>
<div class="filter-wrap">
  <div class="filter-box">
    <div class="section clearfix" v-loading="optTrades.length === 0">
      <div class="title pull-left">常见分类</div>
      <div class="content pull-right">
        <el-checkbox-group v-model="trades" class="trades" :class="{spread: toggle}">
          <el-checkbox :label="trade.text" v-for="trade in optTrades"></el-checkbox>
        </el-checkbox-group>

        <c-toggle class="more" v-model="toggle"></c-toggle>
      </div>
    </div>

    <div class="section clearfix">
      <div class="title pull-left">写作类型</div>
      <div class="content pull-right">
        <ul>
          <li class="inline-block" v-for="type in optWriterType" :key="type.text">
            <a href="javascript:" @click="pick(optWriterType, type)" :class="{ active: type.isActive }">
              {{type.text}}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div class="section clearfix">
      <div class="title pull-left">价格</div>
      <div class="content pull-right">
        <ul>
          <li class="inline-block" v-for="price in optPriceRange" :key="price.text">
            <a href="javascript:" @click="pick(optPriceRange, price)" :class="{ active: price.isActive }">{{price.text}}</a>
          </li>
        </ul>
      </div>
    </div>

    <div class="section clearfix">
      <div class="title pull-left">地区</div>
      <div class="content pull-right">
        <ul class="inline-block">
          <li class="inline-block" v-for="area in optArea" :key="area.text">
            <a href="javascript:" @click="pick(optArea, area, 'area')" :class="{ active: area.isActive }">{{area.text}}</a>
          </li>
        </ul>
         <el-select v-model="province" size="mini" placeholder="选择省份">
          <el-option
            v-for="item in optProvince"
            :label="item.name"
            :value="item">
          </el-option>
         </el-select>

         <el-select v-model="city" size="mini" placeholder="选择城市" v-show="fetchedCity.length != 0">
          <el-option
            v-for="item in fetchedCity"
            :label="item.name"
            :value="item">
          </el-option>
         </el-select>

         <el-button @click="confirmArea" size="mini">确认</el-button>
      </div>
    </div>
  </div>

  <div class="selected-opts" v-show="showSelected">
    已选择：
    <ul class="inline-block">
      <li v-show="!!filterKeys.trades.length">
        分类：{{filterKeys.trades | arr2str}}
        <i class="iconfont icon-delete" @click="clearFilter('trades')"></i>
      </li>
      <li v-show="!!filterKeys.writerType.value">
        类型：{{filterKeys.writerType.text}}
        <i class="iconfont icon-delete" @click="clearFilter('writerType')"></i>
      </li>
      <li v-show="!!filterKeys.priceRange.gtPrice || !!filterKeys.priceRange.ltPrice">
        价格：{{filterKeys.priceRange.text}}
        <i class="iconfont icon-delete" @click="clearFilter('priceRange')"></i>
      </li>
      <li v-show="!!filterKeys.area.name">
        区域：{{filterKeys.area.name || filterKeys.area.fdFullName}}
        <i class="iconfont icon-delete" @click="clearFilter('area')"></i>
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
import { CheckboxGroup } from 'element-ui'
import { optWriterType, optPriceRange, optArea } from 'assets/scripts/filter-config.js'

export default {
  name: 'CFilter',
  created () {
    if (this.optTrades.length === 0) {
      this.$store.dispatch('fetchTrades')
    }
    if (this.optProvince.length === 0) {
      this.$store.dispatch('fetchProvinceList')
    }
  },
  data () {
    return {
      optWriterType,
      optPriceRange,
      optArea,
      fetchedCity: [],
      trades: [],
      province: {},
      city: {},
      customArea: {},
      toggle: false
    }
  },
  props: {
    value: {}
  },
  computed: {
    filterKeys () {
      var writerType, priceRange, area
      writerType = _.find(this.optWriterType, {'isActive': true})
      priceRange = _.find(this.optPriceRange, {'isActive': true})
      area = _.isEmpty(this.customArea) ? _.find(this.optArea, {'isActive': true}) : this.customArea

      return {
        trades: this.trades,
        writerType,
        priceRange,
        area
      }
    },
    showSelected () {
      return !!this.filterKeys.trades.length ||
        !!this.filterKeys.writerType.value ||
        !!this.filterKeys.priceRange.gtPrice ||
        !!this.filterKeys.priceRange.ltPrice ||
        !!this.filterKeys.area.name
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
      this.$emit('input', {
        trades: newValue.trades.join(','),
        writerType: newValue.writerType.value,
        gtPrice: newValue.priceRange.gtPrice,
        ltPrice: newValue.priceRange.ltPrice,
        area: newValue.area.name
      })
    },
    province (newValue) {
      this.city = {}
      if (newValue.name) {
        this.$http.get(
          '/common/area',
          {params: {
            parentId: newValue.id
          }}
        ).then((resp) => {
          this.fetchedCity = resp.data
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
        this.province = {}
        this.city = {}
        this.customArea = {}
        this.fetchedCity = []
      }
    },
    confirmArea () {
      this.customArea = _.isEmpty(this.city) ? this.province : this.city
    },
    reset (field) {
      _.forEach(field, (obj) => {
        obj.isActive = false
      })
      field[0].isActive = true
    },
    clearFilter (label) {
      switch (label) {
        case 'writerType':
          this.reset(this.optWriterType)
          break
        case 'priceRange':
          this.reset(this.optPriceRange)
          break
        case 'area':
          this.reset(this.optArea)
          this.province = {}
          this.city = {}
          this.customArea = {}
          this.fetchedCity = []
          break
        case 'trades':
          this.trades = []
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
      this.province = {}
      this.city = {}
      this.customArea = {}
      this.trades = []
      this.fetchedCity = []
    },
    pickTrade (trade) {
      this.trades.push(trade)
    },
    pickWriterType (statusNum) {
      _.forEach(this.optWriterType, (item) => {
        item.isActive = false
      })
      _.find(this.optWriterType, {value: String(statusNum)}).isActive = true
    }
  },
  components: {
    [CheckboxGroup.name]: CheckboxGroup
  }

}

</script>
<style lang="less" scoped>
@import '../../assets/styles/filter.less';
</style>
