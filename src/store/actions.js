export default function (http) {
  return {
    // 行业类型
    fetchTrades: ({ commit, state }) => {
      return http.get('/common/trades').then((resp) => {
        commit('SET_TRADES', resp.data)
      })
    },

    // 省份列表
    fetchProvinceList: ({ commit, state }) => {
      return http.get('/common/area').then((resp) => {
        commit('SET_PROVINCE_LIST', resp.data)
      })
    },

    // 获取地区

    fetchAreaList: ({ commit, state }) => {
      if (state.areaList && state.areaList.length === 0) {
        return http.get('/common/getArea').then(resp => {
          let firstList = []
          let secondList = []
          let thirdList = []
          console.log(resp.data + 'fdsdsdsdsdf')
          resp.data.forEach((item, index) => {
            if (item.fdGrade === 0) {
              firstList.push(item)
            } else if (item.fdGrade === 1) {
              secondList.push(item)
            } else if (item.fdGrade === 2) {
              thirdList.push(item)
            }
          })
          firstList.forEach((itemFirst) => {
            itemFirst.secondList = []
            secondList.forEach((itemSecond) => {
              if (itemFirst.id === itemSecond.fdParent) {
                itemFirst.secondList.push(itemSecond)
              }
            })
          })
          secondList.forEach((item, index) => {
            secondList[index].thirdList = []
            thirdList.forEach((itm, idx) => {
              if (item.id === itm.fdParent) {
                secondList[index].thirdList.push(itm)
              }
            })
          })
          commit('SET_AREA_LIST', firstList)
        })
      }
    },

    fetchAccount: ({ commit, state }) => {
      return http.get('/account').then((resp) => {
        commit('SET_ACCOUNT', resp.data)
      }).catch(e => {
        commit('SET_ACCOUNT', {
          loginType: {}
        })
      })
    },

    clearAccount: ({commit, state}) => {
      commit('CLEAR_ACCOUNT', null)
    },

    modifyAccountMobile: ({ commit, state }, tel) => {
      commit('SET_ACCOUNT_TEL', tel)
    }
  }
}
