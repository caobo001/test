<template>
  <div class="page-billboard-search">
    <div class="search-block text-center clearfix">
      <el-autocomplete
        class="search-box pull-left"
        v-model="keyword"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入公众号、名称"
        icon="search"
        @keyup.native.enter="submit"
      ></el-autocomplete>
      <span class="inline-block text-center search-btn pull-left" @click="submit">搜索</span>
    </div>

    <div class="container" v-loading.fullscreen="loading" element-loading-text="拼命加载中">

      <div class="toolbar clearfix">
        <div class="pull-left">
          <span class="category">微信</span>
          <p class="inline-block" v-show="itemTotal !== 0">关键词 "<em>{{searchName}}</em>"，共找到 <em>{{itemTotal}}</em> 条结果</p>
        </div>
        <div class="pull-right">
          筛选：
          <el-checkbox v-model="isOriginal" @change="originalChange">原创</el-checkbox>
          <el-checkbox v-model="isVipType" @change="vipTypeChange">认证</el-checkbox>
          <el-checkbox v-model="isCommentable" @change="commentableChange">带评论</el-checkbox>
        </div>
      </div>

      <c-no-data v-show="sortedValue.length === 0">
        <div slot="tips">换个关键词试试</div>
      </c-no-data>

      <ul class="list">
        <li class="clearfix" v-for="(item, index) in sortedValue" :key="item.id">
          <div class="index pull-left">{{index + 1}}</div>
          <router-link :to="{ name: 'media-billboard-detail', params: {id: item.id} }">
            <img class="avatar pull-left" :src="item.fdImageJson.thumbnailUrl" :alt="item.fdImageJson.name">
            <div class="brief pull-left">
              <h2>{{item.fdName}}</h2>
              <p><em>微信号：</em>{{item.fdCode}}</p>
              <p>
                <em>分类：</em>
                <span class="tag" v-for="(name, index) in item.fdAttr1Array" :key="index">{{name}}</span>
              </p>
              <p><em>简介：</em>{{item.remarks}}</p>
              <p><em>粉丝数：</em>{{item.fdFunsCount | numToMyriad}}</p>
              <p><em>微信认证：</em>{{item.fdVipType}}</p>
            </div>
            <div class="operate pull-right text-right">
              <p>指数 <em>{{item.fdWeight || '暂无'}}</em></p>
              <i
                class="icon iconfont icon-shopcart"
                @click.prevent="toggleCart(item)"
                :class="{'active': item.isInCart}"
                title="加入购物车"
              ></i>
              <i
                class="icon iconfont icon-collect"
                @click.prevent="toggleCollection(item)"
                :class="{'active': item.isCollection}"
                title="收藏"
              ></i>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="pagination">
        <el-pagination
          v-show="itemTotal !== 0"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="itemTotal">
        </el-pagination>
      </div>
    </div>
    <c-cart-bar :actionBtn="cartBarActionBtn"></c-cart-bar>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import CNoData from 'components/CNoData'
import CCartBar from 'components/media/CCartBar'
import { Autocomplete } from 'element-ui'

export default {
  mounted () {
    if (this.keyword) {
      this.searchName = this.keyword
      this.fetchData()
    }
  },
  title () {
    return '榜单搜索'
  },
  data () {
    return {
      dataList: [],
      keyword: this.$route.params.keyword || '',
      searchName: '',
      pageIndex: 1,
      pageSize: 15,
      itemTotal: 0,
      loading: false,
      cartBarActionBtn: {
        text: '立即投放',
        routerName: 'media-cart'
      },
      isOriginal: '',
      original: '',
      isCommentable: '',
      commentable: '',
      isVipType: '',
      vipType: ''
    }
  },
  computed: {
    cartIdList () {
      return _.map(this.$store.state.media.cartList, (item) => {
        return item.id
      })
    },
    sortedValue () {
      var value = this.dataList
      _.forEach(value, (item) => {
        item.isInCart = _.indexOf(this.cartIdList, item.id) >= 0
      })
      return value
    }
  },
  methods: {
    ...mapActions(['rmItemInMediaCart', 'addItemInMediaCart']),
    fetchData () {
      this.loading = true
      this.$http.get('/billboard/search', {params: {
        pageIndex: this.pageIndex,
        s_fdName: this.keyword,
        s_fdIsCommentable: this.commentable,
        s_fdIsOriginal: this.original,
        s_fdVipType: this.vipType
      }}).then(resp => {
        this.dataList = resp.data.data
        this.itemTotal = resp.data.total
      }).finally(() => {
        this.loading = false
      })
    },
    submit () {
      this.keyword = this.keyword.trim()
      if (!this.keyword) return
      if (this.keyword.length > 20) {
        return this.$message.warning('最大搜索长度为 20 字')
      }
      this.searchName = this.keyword
      this.pageIndex = 1
      this.fetchData()
    },
    handleCurrentChange (page) {
      this.pageIndex = page
      this.fetchData()
    },
    toggleCart (obj) {
      if (obj.isInCart) {
        this.rmItemInMediaCart(obj).then((resp) => {
          obj.isInCart = false
          this.$message.success('成功从购物车中移出')
        })
      } else {
        this.addItemInMediaCart(obj).then((resp) => {
          obj.isInCart = true
          this.$message.success('成功添加到购物车')
        })
      }
    },
    toggleCollection (obj) {
      var params = {
        id: obj.id
      }
      if (obj.isCollection) {
        this.$http.delete(`/goods/collection/${obj.id}`).then((resp) => {
          if (resp.data.code === 1) {
            obj.isCollection = false
            this.$message.success('取消收藏成功')
          }
        })
      } else {
        this.$http.post(`/goods/collection`, params).then((resp) => {
          if (resp.data.code === 1) {
            obj.isCollection = true
            this.$message.success('添加收藏成功')
          }
        })
      }
    },
    querySearchAsync (queryString, cb) {
      if (!queryString || queryString.length > 20) {
        cb([])
        return
      }
      this.$http.get(
      '/goods/search', {
        params: {
          fdName: queryString,
          fdGoodsGroupId: this.$store.state.goodsGroups.wechat
        }
      }).then((resp) => {
        cb(_.map(resp.data, (item) => {
          return {
            value: item
          }
        }))
      })
    },
    originalChange () {
      this.original = this.isOriginal ? 1 : ''
      this.fetchData()
    },
    commentableChange () {
      this.commentable = this.isCommentable ? 1 : ''
      this.fetchData()
    },
    vipTypeChange () {
      this.vipType = this.isVipType ? '认证' : ''
      this.fetchData()
    }
  },
  components: {
    CCartBar,
    CNoData,
    [Autocomplete.name]: Autocomplete
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/billboard.less';
</style>
<style lang="less">
@import '../../assets/styles/billboard-search.less';
</style>
