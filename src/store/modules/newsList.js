export default function (http) {
  const state = {
    newsList: [],
    pageCount: 0,
    total: 0,
    newsDetail: {},
    nextNews: {}
  }

  const mutations = {
    SET_NEWS_LIST (state, value) {
      state.newsList = value
    },
    SET_NEWS_PAGECOUNT (state, value) {
      state.pageCount = value
    },
    SET_NEWS_TOTAL (state, value) {
      state.total = value
    },
    SET_DETAILINFO (state, value) {
      state.newsDetail = value
      // console.log('101010', state.newsDetail)
    },
    SET_NEXT_DETAILINFO (state, value) {
      state.nextNews = value
      console.log('101010', state.nextNews)
    }
  }

  const actions = {
    fetchNewsList ({ commit, state }, params) {
      const uri = '/newsCenter/list'
      // console.log('params: ', {params})
      return http.get(
        uri,
        {params}
      ).then((resp) => {
        // console.log('data', resp)
        // console.log('newsList:', resp.data.data)
        // console.log('pageCount', resp.data.pageCount)
        // console.log('pageCount', resp.data.total)
        commit('SET_NEWS_PAGECOUNT', resp.data.pageCount)
        commit('SET_NEWS_LIST', resp.data.data)
        commit('SET_NEWS_TOTAL', resp.data.total)
      }).catch(e => {
        console.log(e)
      })
    },
    fetchNewsDetail ({ commit, state }, params) {
      return http.get(
         `newsCenter/view/${params.id}`
      ).then((resp) => {
        commit('SET_DETAILINFO', resp.data)
        commit('SET_NEXT_DETAILINFO', resp.data.nextNews)
        // console.log('88888888888888888', resp.data.nextNews)
      }).catch(e => {
        console.log(e)
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
