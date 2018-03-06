import utils from 'src/utils'
import http from 'src/http'

const cartDefault = {
  goodsListWa: [],
  goodsListPd: [],
  goodsListYy: []
}

const state = {
  cart: utils.restore('cart', cartDefault, 'sessionStorage'),
  paidOrder: utils.restore('paidOrder', {}, 'sessionStorage'),
  privateOrder: utils.restore('privateOrder', {}, 'sessionStorage')
}

const mutations = {
  // 购物车相关
  SET_CART (state, cart) {
    cart.goodsListWa = _.map(cart.goodsListWa, (item) => {
      item.checked = false
      return item
    })
    state.cart = cart
    window.sessionStorage.setItem('cart', JSON.stringify(state.cart))
  },

  SET_CHECKED (state, goods) {
    let checkedGoods = _.find(state.cart.goodsListWa, {id: goods.id})
    checkedGoods.checked = !checkedGoods.checked
    window.sessionStorage.setItem('cart', JSON.stringify(state.cart))
  },

  SET_CHECKED_ALL (state, bool) {
    _.forEach(state.cart.goodsListWa, (item) => {
      item.checked = bool
    })
    window.sessionStorage.setItem('cart', JSON.stringify(state.cart))
  },

  REMOVE_FROM_CART (state, goods) {
    let list = state.cart.goodsListWa
    let index = _.indexOf(list, _.find(list, {id: goods.id}))
    list.splice(index, 1)
    window.sessionStorage.setItem('cart', JSON.stringify(state.cart))
  },

  // 订单相关
  SET_PAID_ORDER (state, order) {
    state.paidOrder = order
    window.sessionStorage.setItem('paidOrder', JSON.stringify(order))
  },

  SET_PRIVATE_ORDER (state, params) {
    _.extend(state.privateOrder, params)
    window.sessionStorage.setItem('privateOrder', JSON.stringify(state.privateOrder))
  },

  CLEAR_PRIVATE_ORDER (state, params) {
    state.privateOrder = {}
    window.sessionStorage.setItem('privateOrder', JSON.stringify(state.privateOrder))
  }
}

const actions = {
  fetchCart ({ commit, state }) {
    return http.get('/writer/cart').then((resp) => {
      commit('SET_CART', resp.data)
    })
  },

  removeGoodsInCart ({ commit, state }, goods) {
    return http.delete(`/writer/cart/writer/${goods.id}`).then((resp) => {
      commit('REMOVE_FROM_CART', goods)
      return resp
    })
  },

  addGoodsInCart ({ commit, state }, goods) {
    // 添加成功后重新获取购物车列表
    return http.post('/writer/cart/writer', [goods.id]).then(() => {
      return http.get('/writer/cart').then((resp) => {
        commit('SET_CART', resp.data)
        return resp
      })
    })
  },

  setChecked ({ commit, state }, goods) {
    commit('SET_CHECKED', goods)
  },

  setCheckedAll ({ commit, state }, bool) {
    commit('SET_CHECKED_ALL', bool)
    return bool
  },

  // 订单相关
  savePaidOrder ({ commit, state }, order) {
    commit('SET_PAID_ORDER', order)
  },

  savePrivateOrder ({ commit, state }, params) {
    commit('SET_PRIVATE_ORDER', params)
  },

  clearPrivateOrder ({ commit, state }) {
    commit('CLEAR_PRIVATE_ORDER')
  }
}

const getters = {
  getCheckedWa (state, getters) {
    let checkedList = []
    _.forEach(state.cart.goodsListWa, (item) => {
      if (item.checked) {
        checkedList.push(item)
      }
    })
    return checkedList
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
