import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import createActions from './actions'
import createMedia from './modules/media'
import createBillboard from './modules/billboard'
import createGoodsList from './modules/goodsList'
import createNewsList from './modules/newsList'
import createCaseList from './modules/caseList'
// import cookies from 'js-cookie'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const createState = function () {
  return {
    account: {loginType: {}},
    trades: [],
    provinceList: [],
    areaList: [],
    goodsGroups: {
      wechat: '153ee98b2a8f8b86d0c51ee4a68a492d',
      weibo: '153ee9861064430132ad9554b2a9c6eb',
      headline: '15d398ae2b41440246b10ee46408535a'
    }
  }
}

export function createStore (http) {
  return new Vuex.Store({
    state: createState(),
    mutations,
    actions: createActions(http),
    modules: {
      billboard: createBillboard(http),
      goodsList: createGoodsList(http),
      media: createMedia(http),
      newsList: createNewsList(http),
      caseList: createCaseList(http)
    },
    strict: debug
  })
}
