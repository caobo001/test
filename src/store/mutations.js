import cookies from 'js-cookie'
const isNode = require('detect-node')

export default {
  SET_LOGIN (state) {
    state.isLogined = true
  },
// 商品分类
  SET_GOODSGROUP (state, goodsGroup) {

  },
// 行业类型
  SET_TRADES (state, trades) {
    state.trades = trades
    if (!isNode) {
      window.sessionStorage.setItem('trades', JSON.stringify(trades))
    }
  },

// 省份列表
  SET_PROVINCE_LIST (state, provinceList) {
    state.provinceList = provinceList
    if (!isNode) {
      window.sessionStorage.setItem('provinceList', JSON.stringify(provinceList))
    }
  },

// 地区列表
  SET_AREA_LIST (state, areaList) {
    state.areaList = areaList
  },

// 用户信息
  SET_ACCOUNT (state, account) {
    state.account = account
    cookies('account', state.account)
  },
// 清除用户信息
  CLEAR_ACCOUNT (state) {
    state.account.loginType = {}
    cookies.set('account', {loginType: {}})
    cookies.remove('JSESSIONID')
  },

  SET_ACCOUNT_TEL (state, tel) {
    if (state.account.fdMobile) {
      state.account.fdMobile = tel
    }
  }
}
