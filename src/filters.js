import Vue from 'vue'
import utils from './utils'

Vue.filter('arr2str', (value, separator = ',') => value.join(separator))

Vue.filter('numToMyriad', (value = 0) => {
  if (String(value).length < 5) {
    return value
  } else {
    let result = parseFloat(value / 10000).toFixed(1)
    return result + ' 万'
  }
})

Vue.filter('numToThousands', utils.numToThousands)
Vue.filter('numToThousandsRound', utils.numToThousandsRound)
Vue.filter('deleteSpace', utils.deleteSpace)
