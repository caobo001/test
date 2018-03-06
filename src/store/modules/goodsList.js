import { Message } from 'element-ui'

export default function (http) {
  const state = {
    wechatList: [],
    weiboList: [],
    headlineList: [],
    itemTotal: 0,
    weiboItemTotal: 0,
    headlineItemTotal: 0,
    isPage: true,
    filter: {
      advType: '不限'
    },
    hotTen: []
  }

  const mutations = {
    SET_WECHAT_LIST (state, value) {
      value.forEach((item) => {
        item.qrcode = '/webapp/static/timg.gif'
      })
      state.wechatList = value
    },
    SET_WEIBO_LIST (state, value) {
      value.forEach((item) => {
        var orderArr = []
        var array = []
        item.fdGoodsProducts.forEach((itemin) => {
          orderArr.push(itemin.fdGoodsSpecification.fdOrder)
        })
        orderArr.sort(function (a, b) {
          return a > b
        })
        orderArr.forEach((it) => {
          var itt = it
          item.fdGoodsProducts.forEach((itin) => {
            if (itin.fdGoodsSpecification.fdOrder === itt) {
              array.push(itin)
            }
          })
        })
        item.fdGoodsProducts = array
      })
      state.weiboList = value
    },
    SET_HEADLINE_LIST (state, value) {
      state.headlineList = value
    },
    SET_ITEM_TOTAL (state, value) {
      state.itemTotal = value
    },
    SET_WEIBO_ITEM_TOTAL (state, value) {
      state.weiboItemTotal = value
    },
    SET_HEADLINE_ITEM_TOTAL (state, value) {
      state.headlineItemTotal = value
    },
    SET_IS_PAGE (state, value) {
      state.isPage = value
    },
    SET_FILTER (state, value) {
      state.filter = value
    },
    SET_ITEM_QRCODE (state, id) {
      const item = _.find(state.wechatList, {id})
      item.qrcode = `http://open.weixin.qq.com/qr/code?username=${item.fdCode}`
    },
    SET_ITEM_COLLECTION (state, obj) {
      const item = _.find([...state.wechatList, ...state.weiboList, ...state.headlineList], {id: obj.id})
      item.isCollection = obj.bool
    },
    SET_HOT_TEN (state, value) {
      state.hotTen = value
    }
  }

  const actions = {
    fetchWechatList ({ commit, state, rootState }, params) {
      const uri = `/goods/list/${rootState.goodsGroups.wechat}`
      return http.post(
        uri,
        params
      ).then((resp) => {
        if (resp.data.data.length === 0) {
          resp.data.isPage = false
        }
        commit('SET_WECHAT_LIST', resp.data.data)
        commit('SET_ITEM_TOTAL', resp.data.total)
        commit('SET_IS_PAGE', resp.data.isPage)
      }).catch(e => {
        console.log(e)
      })
    },
    fetchWeiboList ({ commit, state, rootState }, params) {
      const uri = `/goods/list/${rootState.goodsGroups.weibo}`
      return http.post(
        uri,
        params
      ).then((resp) => {
        if (resp.data.data.length === 0) {
          resp.data.isPage = false
        }
        commit('SET_WEIBO_LIST', resp.data.data)
        commit('SET_WEIBO_ITEM_TOTAL', resp.data.total)
        commit('SET_IS_PAGE', resp.data.isPage)
      }).catch(e => {
        console.log(e)
      })
    },
    fetchHeadlineList ({commit, state, rootState}, params) {
      const uri = `/goods/list/${rootState.goodsGroups.headline}`
      return http.post(
        uri,
        params
      ).then((resp) => {
        if (resp.data.data.length === 0) {
          resp.data.isPage = false
        }
        commit('SET_HEADLINE_LIST', resp.data.data)
        commit('SET_HEADLINE_ITEM_TOTAL', resp.data.total)
        commit('SET_IS_PAGE', resp.data.isPage)
      })
    },
    setType ({ commit, state, rootState }, value) {
      commit('SET_TYPE', value)
    },
    setFilter ({ commit, state, rootState }, value) {
      commit('SET_FILTER', value)
    },
    setItemQrcode ({ commit, state, rootState }, id) {
      commit('SET_ITEM_QRCODE', id)
    },
    toggleCollection ({ commit, state, rootState }, item) {
      const params = {
        id: item.id
      }
      if (item.isCollection) {
        return http.delete(`/goods/collection/${item.id}`).then((resp) => {
          if (resp.data.code === 1) {
            commit('SET_ITEM_COLLECTION', {
              id: item.id,
              bool: false
            })
            Message.success('取消收藏成功')
          }
        })
      } else {
        return http.post(`/goods/collection`, params).then((resp) => {
          if (resp.data.code === 1) {
            commit('SET_ITEM_COLLECTION', {
              id: item.id,
              bool: true
            })
            Message.success('添加收藏成功')
          }
        })
      }
    },
    fetchHotTen ({ commit, state, rootState }, type) {
      let fdGoodsGroupId = ''
      switch (type) {
        case 'wechat':
          fdGoodsGroupId = rootState.goodsGroups.wechat
          break
        case 'weibo':
          fdGoodsGroupId = rootState.goodsGroups.weibo
          break
        case 'headline':
          fdGoodsGroupId = rootState.goodsGroups.headline
      }
      console.log('热门前十', fdGoodsGroupId)
      http.get(`/goods/fdGoodsGroupId/${fdGoodsGroupId}/goodsByWeightWeekList`).then((resp) => {
        console.log('热门前十: ', resp.data)
        // SET_HOT_TEN
        commit('SET_HOT_TEN', resp.data)
      })
    }
  }
  return {
    namespaced: true,
    state,
    actions,
    mutations
  }
}
