import { Message } from 'element-ui'

export default function (http) {
  console.log(http)
  const toggleCollection = (item, cb) => {
    const params = {
      id: item.fdGoodsId || item.id
    }
    if (item.isCollection) {
      http.delete(`/goods/collection/${params.id}`).then((resp) => {
        if (resp.data.code === 1) {
          cb(false)
          Message.success('取消收藏成功')
        }
      })
    } else {
      http.post(`/goods/collection`, params).then((resp) => {
        if (resp.data.code === 1) {
          cb(true)
          Message.success('添加收藏成功')
        }
      })
    }
  }

  const state = {
    list: [],
    listCountDate: '',
    type: '1',
    detailInfo: {
      goodsInfo: {}
    },
    article: {
      hotest: [],
      latest: []
    },
    trades: [],
    checkedTrades: '',
    weiboMediaData: {},
    weiboList: [], // 微博榜单 列表
    groupType: '', // 商品类别
    headlineList: [],
    headlineMediaData: {}
  }

  const mutations = {
    // 榜单列表
    SET_LIST (state, value) {
      console.log('微信榜单: ', value)
      state.list = value
    },
    /* 设置 微博列表 */
    SET_WEIBO_LIST (state, value) {
      state.weiboList = value
    },
    /* 设置 头条列表 */
    SET_HEADLINE_LIST (state, value) {
      console.log(value)
      state.headlineList = value
    },
    SET_LIST_COUNT_DATE (state, value) {
      state.listCountDate = value
    },
    SET_TYPE (state, value) {
      state.type = value
    },
    SET_DETAILINFO (state, value) {
      state.detailInfo = value
    },
    SET_ARTICLE (state, value) {
      state.article = value
    },
    SET_ITEM_COLLECTION (state, obj) {
      // const item = _.find(state.list, {fdGoodsId: obj.id})
      let item = {}
      if (state.groupType === 'wechat') {
        item = _.find(state.list, {fdGoodsId: obj.id})
      } else if (state.groupType === 'weibo') {
        item = _.find(state.weiboList, {fdGoodsId: obj.id})
      } else if (state.groupType === 'headline') {
        item = _.find(state.headlineList, {fdGoodsId: obj.id})
      }
      item.isCollection = obj.bool
    },
    SET_DETAIL_COLLECTION (state, bool) {
      if (state.detailInfo.goodsInfo) {
        state.detailInfo.goodsInfo.isCollection = bool
      } else {
        state.detailInfo.isCollection = bool
      }
    },
    SET_TRADES (state, value) {
      state.trades = value
    },
    SET_CHECKEDTRADES (state, value) {
      state.checkedTrades = value
    },
    SET_WEIBOMEDIA_DATA (state, value) {
      state.weiboMediaData = value
    },
    SET_HEADLINEMEDIA_DATA (state, value) {
      state.headlineMediaData = value
    },
    SET_GROUPTYPE (state, value) {
      state.groupType = value
    }
  }

  const actions = {
    fetchList ({ commit, state, rootState }) {
      return http.get(
        '/billboard/index',
        {
          params: {
            s_fdType: state.type,
            s_fdAttr1: state.checkedTrades
          }
        }
      ).then((resp) => {
        commit('SET_LIST', resp.data.rowData)
        commit('SET_LIST_COUNT_DATE', resp.data.countDate)
        commit('SET_GROUPTYPE', 'wechat')
      }).catch(e => {
        console.log(e)
      })
    },
    /* 获取微博媒体数据  */
    fetchWeiboMeidaData ({ commit, state, rootState }, params) {
      return http.get(
        `/billboard/weibo/data/${params.id}`
      ).then((resp) => {
        commit('SET_WEIBOMEDIA_DATA', resp.data)
      }).catch(e => {
        console.log(e)
      })
    },
    /* 获取微博榜单列表 */
    fetchWeiboList ({ commit, state, rootState }) {
      return http.get(
        '/billboard/weibo/list',
        {
          params: {
            fdType: state.type,
            fdAttr1: state.checkedTrades
          }
        }
      ).then((resp) => {
        _.each(resp.data.data, (item) => {
          item.fdGoodsId = item.id
        })
        commit('SET_WEIBO_LIST', resp.data.data)
        commit('SET_LIST_COUNT_DATE', resp.data.deadline)
        commit('SET_GROUPTYPE', 'weibo')
      }).catch(e => {
        console.log(e)
      })
    },
    /* 获取头条榜单列表 */
    fetchHeadlineList ({ commit, state, rootState }) {
      return http.get(
        '/billboard/toutiao/list',
        {
          params: {
            fdType: state.type,
            fdAttr1: state.checkedTrades
          }
        }
      ).then((resp) => {
        console.log('头条: ', resp)
        _.each(resp.data.data, (item) => {
          item.fdGoodsId = item.id
        })
        commit('SET_HEADLINE_LIST', resp.data.data)
        commit('SET_LIST_COUNT_DATE', resp.data.deadline)
        commit('SET_GROUPTYPE', 'headline')
      }).catch(e => {
        console.log(e)
      })
    },
    setType ({ commit, state, rootState }, value) {
      commit('SET_TYPE', value)
    },
    fetchDetail ({ commit, state, rootState }, params) {
      return http.get(
        `/billboard/detail/daily/${params.id}`
      ).then((resp) => {
        commit('SET_DETAILINFO', resp.data)
      }).catch(e => {
        console.log(e)
      })
    },
    fetchWeiboDetail ({ commit, state, rootState }, params) {
      return http.get(
        `/billboard/weibo/info/${params.id}`
      ).then((resp) => {
        resp.data.fdGoodsId = resp.data.id
        // resp.data.goodsInfo.isCollection = resp.data.isCollection
        commit('SET_DETAILINFO', resp.data)
      }).catch(e => {
        console.log(e)
      })
    },
    fetchArticle ({ commit, state, rootState }, params) {
      return http.get(`/billboard/detail/article/${params.id}`).then((resp) => {
        commit('SET_ARTICLE', resp.data)
      }).catch(e => {
        console.log(e)
      })
    },
    fetchWeiboArticle ({ commit, state, rootState }, params) {
      return http.get(`/billboard/weibo/article/${params.id}`).then((resp) => {
        commit('SET_ARTICLE', resp.data)
      }).catch(e => {
        console.log(e)
      })
    },
    fetchHeadlineDetail ({ commit, state, rootState }, params) {
      return http.get(
        `/billboard/toutiao/info/${params.id}`
      ).then((resp) => {
        console.log('头条详情: ', resp.data)
        resp.data.fdGoodsId = resp.data.id
        commit('SET_DETAILINFO', resp.data)
      }).catch(e => {
        console.log(e)
      })
    },
    fetchHeadlineArticle ({ commit, state, rootState }, params) {
      return http.get(`/billboard/toutiao/article/${params.id}`).then((resp) => {
        console.log('头条文章: ', resp.data)
        commit('SET_ARTICLE', resp.data)
      }).catch(e => {
        console.log(e)
      })
    },
    /* 获取头条媒体数据  */
    fetchHeadlineMeidaData ({ commit, state, rootState }, params) {
      return http.get(
        `/billboard/toutiao/data/${params.id}`
      ).then((resp) => {
        console.log('头条媒体数据: ', resp.data)
        commit('SET_HEADLINEMEDIA_DATA', resp.data)
      }).catch(e => {
        console.log(e)
      })
    },
    toggleListCollection ({ commit, state, rootState }, item) {
      console.log(item)
      toggleCollection(item, function (bool) {
        commit('SET_ITEM_COLLECTION', {
          id: item.fdGoodsId,
          bool: bool
        })
      })
    },
    toggleDetailCollection ({ commit, state, rootState }, item) {
      toggleCollection(item, function (bool) {
        commit('SET_DETAIL_COLLECTION', bool)
      })
    },
    fetchTrades ({ commit, state, rootState }) {
      return http.get('/common/trades').then((resp) => {
        commit('SET_TRADES', resp.data)
      }).catch(e => {
        console.log(e)
      })
    },
    setTrades ({ commit, state, rootState }, value) {
      commit('SET_CHECKEDTRADES', value.join(','))
    }
  }
  return {
    namespaced: true,
    state,
    actions,
    mutations
  }
}
