export default function (http) {
  const state = {
    caseList: [],
    pageCount: 0,
    total: 0,
    caseDetail: {}
  }

  const mutations = {
    SET_CASE_LIST (state, value) {
      state.caseList = value
    },
    SET_CASE_PAGECOUNT (state, value) {
      state.pageCount = value
    },
    SET_CASE_TOTAL (state, value) {
      state.total = value
    },
    SET_DETAILINFO (state, value) {
      state.caseDetail = value
      // console.log('9898989898', state.caseDetail)
    }
  }

  const actions = {
    fetchCaseList ({ commit, state }, params) {
      const uri = '/caseLibrary/list'
      return http.get(
        uri,
        {params}
      ).then((resp) => {
        commit('SET_CASE_PAGECOUNT', resp.data.pageCount)
        commit('SET_CASE_LIST', resp.data.data)
        commit('SET_CASE_TOTAL', resp.data.total)
      }).catch(e => {
        console.log(e)
      })
    },
    fetchCaseDetail ({ commit, state }, params) {
      return http.get(
         `caseLibrary/view/${params.id}`
      ).then((resp) => {
        commit('SET_DETAILINFO', resp.data)
        // console.log('88888888888888888', resp.data)
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
