import { Message, MessageBox } from 'element-ui'
import utils from 'src/utils'

export function createServerHttp (cookies) {
  const isProd = process.env.NODE_ENV === 'production'
  const port = isProd ? 8080 : 8068

  const cookie = utils.parseCookie(cookies)

  const instance = axios.create({
    baseURL: `http://localhost:${port}/buyer2`,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'cookie': cookie
    }
  })

  instance.interceptors.response.use((resp) => {
    if (_.isString(resp.data)) {
      return Promise.reject(new Error('解析异常'))
    } else {
      return Promise.resolve(resp)
    }
  }, (error) => {
    return Promise.reject(error)
  })
  return instance
}

export function createClientHttp () {
  const instance = axios.create({
    baseURL: '/buyer2',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'X-Requested-With': 'XMLHttpRequest',
      'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT' // 避免 IE10 返回 304
    }
  })

  instance.interceptors.response.use((resp) => {
    console.log('2222222222: ', resp)
    if (_.isString(resp.data)) {
      return Promise.reject(new Error('解析异常'))
    } else {
      return Promise.resolve(resp)
    }
  }, (error) => {
    const filterList = [
      '/buyer2/account',
      '/buyer2/goods/cart_item/list'
    ]
    if (error.response && error.response.data) {
      if (error.response.data.code === 0) {
        Message.error(error.response.data.content)
      } else if (error.response.data.code === 401) {
        if (_.indexOf(filterList, error.config.url) < 0) {
          console.log(error.config.url)
          MessageBox.confirm('您当前还未登录, 是否先去登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            window.location.assign('/userLogin')
          })
        }
      } else {
        Message.error('服务器忙，请稍候再试...')
      }
    }
    return Promise.reject(error)
  })
  return instance
}
