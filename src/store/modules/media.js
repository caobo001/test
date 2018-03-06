import utils from 'src/utils'
const isNode = require('detect-node')

export default function (http) {
  const formatCart = function (list) {
    return _.map(list, (item) => {
      const defaultDate = new Date(Date.now() + (1000 * 60 * 60 * 24))

      item.specifications = _.map(item.fdGoodsProducts, (goodsProduct) => {
        return {
          fdPrice: goodsProduct.fdPrice,
          fdName: goodsProduct.fdGoodsSpecification.fdName,
          fdGoodsSpecificationId: goodsProduct.fdGoodsSpecificationId
        }
      })

      item.checked = false
      item.fdProcessDate = defaultDate.toJSON()

      // 取默认选择的规格，排除价格为 0 的
      for (let i = 0; i < item.specifications.length; i++) {
        if (item.specifications[i].fdPrice !== 0) {
          item.checkedSpecId = item.specifications[i].fdGoodsSpecificationId
          break
        }
      }

      delete item.fdMediaSeller
      delete item.fdImage
      delete item.fdGoodsProducts

      return item
    })
  }

  const state = {
    cartList: utils.restore('mediaCart'),
    wechatSpec: utils.restore('wechatSpec'),
    weiboSpec: utils.restore('weiboSpec'),
    headlineSpec: utils.restore('headline'),
    clientInfo: {},
    invoiceInfoList: [],
    invoiceInfo: {
      id: '',
      fdType: 1,
      fdInvoiceTitle: '',
      fdBusinessAddress: '',
      fdPhoneNum: '',
      fdBankName: '',
      fdBankAccount: '',
      fdTaxNo: '',
      fdReceiverName: '',
      fdReceiverMobile: '',
      fdOpenType: 2,
      fdContent: '',
      fdProvince: '',
      fdCity: '',
      fdAddress: '',
      fdCertificateType: '',
      fdAttrKhxk: [],
      fdAttrYbnsr: [],
      fdAttrYyzz: [],
      fdAttrSwdj: [],
      fdAttrZzjg: [],
      fdBillingInfo: []
    }
  }

  const getters = {
    mediaCartGroups (state, getters, rootState) {
      const groups = {
        wechat: [],
        weibo: [],
        headline: []
      }
      _.forEach(state.cartList, (item) => {
        if (item.fdGoodsGroupId === rootState.goodsGroups.wechat) {
          groups.wechat.push(item)
        } else if (item.fdGoodsGroupId === rootState.goodsGroups.weibo) {
          groups.weibo.push(item)
        } else if (item.fdGoodsGroupId === rootState.goodsGroups.headline) {
          groups.headline.push(item)
        }
      })
      return groups
    }
  }

  const mutations = {
    // 购物车相关
    SET_MEDIA_CART (state, cartList) {
      state.cartList = formatCart(cartList)
      if (!isNode) {
        window.sessionStorage.setItem('mediaCart', JSON.stringify(state.cartList))
      }
    },

    SAVE_MEDIA_CART (state, cartList) {
      state.cartList = cartList
      if (!isNode) {
        window.sessionStorage.setItem('mediaCart', JSON.stringify(state.cartList))
      }
    },

    RM_FROM_MEDIA_CART (state, goods) {
      let list = state.cartList
      let index = _.indexOf(list, _.find(list, {id: goods.id}))
      list.splice(index, 1)
      if (!isNode) {
        window.sessionStorage.setItem('mediaCart', JSON.stringify(state.cartList))
      }
    },

    BATCH_RM_FROM_MEDIA_CART (state, ids) {
      let list = state.cartList
      _.forEach(ids, (id) => {
        let index = _.indexOf(list, _.find(list, {id}))
        list.splice(index, 1)
      })
      if (!isNode) {
        window.sessionStorage.setItem('mediaCart', JSON.stringify(state.cartList))
      }
    },

    // 商品规格
    SET_WECHAT_SPEC (state, spec) {
      state.wechatSpec = spec
      if (!isNode) {
        window.sessionStorage.setItem('wechatSpec', JSON.stringify(state.wechatSpec))
      }
    },

    SET_WEIBO_SPEC (state, spec) {
      state.weiboSpec = spec
      if (!isNode) {
        window.sessionStorage.setItem('weiboSpec', JSON.stringify(state.weiboSpec))
      }
    },

    SET_HEADLINE_SPEC (state, spec) {
      state.headlineSpec = spec
      if (!isNode) {
        window.sessionStorage.setItem('headlineSpec', JSON.stringify(state.headlineSpec))
      }
    },
    // 客服信息
    SET_CLIENT_INFO (state, clientInfo) {
      state.clientInfo = clientInfo
    },
    // 默认发票信息
    SET_INVOICE_INFO (state, invoiceInfo) {
      state.invoiceInfo = invoiceInfo
    },
    // 发票信息列表
    SET_INVOICE_INFO_LIST (state, invoiceInfoList) {
      state.invoiceInfoList = invoiceInfoList
    }
  }

  const actions = {
    // 购物车相关
    fetchMediaCart ({ commit, state }) {
      return http.get('/goods/cart_item/list').then((resp) => {
        commit('SET_MEDIA_CART', resp.data.data)
      }).catch(e => {
        commit('SET_MEDIA_CART', [])
      })
    },

    saveMediaCart ({ commit, state }, cartList) {
      return commit('SAVE_MEDIA_CART', cartList)
    },

    rmItemInMediaCart ({ commit, state }, goods) {
      return http.delete(`/goods/cart_item/${goods.id}`).then((resp) => {
        commit('RM_FROM_MEDIA_CART', goods)
        return resp
      })
    },

    batchRmItemInMediaCart ({ commit, state }, ids) {
      return http.post('/goods/cart_item/delete', ids).then((resp) => {
        commit('BATCH_RM_FROM_MEDIA_CART', ids)
        return resp
      })
    },

    addItemInMediaCart ({ commit, state }, goods) {
      // 添加成功后重新获取购物车列表
      return http.post('/goods/cart_item', {id: goods.id}).then(() => {
        return http.get('/goods/cart_item/list').then((resp) => {
          commit('SET_MEDIA_CART', resp.data.data)
          return resp
        })
      })
    },
    // 商品规格
    fetchWechatSpec ({ commit, state, rootState }) {
      return http.get(`/goods_spec/${rootState.goodsGroups.wechat}`).then((resp) => {
        commit('SET_WECHAT_SPEC', resp.data)
      })
    },

    fetchWeiboSpec ({ commit, state, rootState }) {
      return http.get(`/goods_spec/${rootState.goodsGroups.weibo}`).then((resp) => {
        commit('SET_WEIBO_SPEC', resp.data)
      })
    },
    fetchHeadlineSpec ({ commit, state, rootState }) {
      return http.get(`/goods_spec/${rootState.goodsGroups.headline}`).then((resp) => {
        commit('SET_HEADLINE_SPEC', resp.data)
      })
    },
    // 客服信息
    fetchClientInfo ({ commit, state }) {
      return http.get('/account/client').then((resp) => {
        commit('SET_CLIENT_INFO', resp.data)
      })
    },
    fetchInvoiceInfo ({ commit, state }) {
      return http.get('/invoice_info/default').then((resp) => {
        if (resp.data.code !== 0) {
          commit('SET_INVOICE_INFO', resp.data)
        } else {
          commit('SET_INVOICE_INFO', {
            id: '',
            fdType: 2,
            fdInvoiceTitle: '',
            fdBusinessAddress: '',
            fdPhoneNum: '',
            fdBankName: '',
            fdBankAccount: '',
            fdTaxNo: '',
            fdReceiverName: '',
            fdReceiverMobile: '',
            fdOpenType: 1,
            fdContent: '',
            fdProvince: '',
            fdCity: '',
            fdAddress: '',
            fdCertificateType: '',
            fdAttrKhxk: [],
            fdAttrYbnsr: [],
            fdAttrYyzz: [],
            fdAttrSwdj: [],
            fdAttrZzjg: [],
            fdBillingInfo: []
          })
        }
        console.log('dispatch info', resp.data)
        return resp
      })
    },
    // 发票信息列表
    fetchInvoiceInfoList ({ commit, state }) {
      return http.get('/invoice_info').then((resp) => {
        if (resp.data.code !== 0) {
          commit('SET_INVOICE_INFO_LIST', resp.data)
        }
        console.log('dispatch infoList', resp.data)
        return resp
      })
    }
  }
  return {
    state,
    getters,
    actions,
    mutations
  }
}
