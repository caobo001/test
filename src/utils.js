const isNode = require('detect-node')

const restore = function (itemName, localDefault = [], storageType = 'sessionStorage') {
  let local = !isNode ? window[storageType].getItem(itemName) : null
  // let local = window[storageType].getItem(itemName)
  if (local) {
    local = JSON.parse(local)
  } else {
    local = localDefault
  }
  return local
}
// 深拷贝，仅适用于 json 数据
const deepClone = function (src) {
  return JSON.parse(
    JSON.stringify(src)
  )
}

const numToThousands = function (value = 0) {
  const numArr = value.toString().split('.')
  let intPart = numArr[0]
  let floatPart = numArr.length > 1 ? numArr[1] : ''

  // 处理整数部分
  let intResult = ''
  let floatResult = ''
  while (intPart.length > 3) {
    intResult = ',' + intPart.slice(-3) + intResult
    intPart = intPart.slice(0, intPart.length - 3)
  }
  if (intPart) { intResult = intPart + intResult }

  // 处理小数部分
  if (floatPart === '') {
    floatResult = '.00'
  } else {
    floatResult = floatPart.slice(0, 2)
    if (floatResult.length === 1) {
      floatResult = '.' + floatResult + '0'
    } else {
      floatResult = '.' + floatResult
    }
  }

  return intResult + floatResult
}

const numToThousandsRound = function (value = 0) {
  const numArr = value.toString().split('.')
  let intPart = numArr[0]

  // 处理整数部分
  let intResult = ''
  let floatResult = ''
  while (intPart.length > 3) {
    intResult = ',' + intPart.slice(-3) + intResult
    intPart = intPart.slice(0, intPart.length - 3)
  }
  if (intPart) { intResult = intPart + intResult }

  return intResult + floatResult
}

const formatTime = function (date) {
  let dataObj = new Date(date)
  function formatNumber (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  var year = dataObj.getFullYear()
  var month = dataObj.getMonth() + 1
  var day = dataObj.getDate()

  var hour = dataObj.getHours()
  var minute = dataObj.getMinutes()
  var second = dataObj.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const parseCookie = cookies => {
  let cookie = ''
  const outPutKeys = ['JSESSIONID']
  Object.keys(cookies).forEach(item => {
    if (outPutKeys.indexOf(item) >= 0) {
      cookie += item + '=' + cookies[item] + '; '
    }
  })
  return cookie
}
// 去除空格
const deleteSpace = function (str) {
  let strName = str.replace(/&nbsp;/ig, '')
  return strName
}

export default {
  restore,
  deepClone,
  numToThousands,
  numToThousandsRound,
  formatTime,
  parseCookie,
  deleteSpace
}
