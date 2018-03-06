import Vue from 'vue'
import { createApp } from './main'
import { createClientHttp } from 'src/http'
import ProgressBar from 'components/CProgressBar.vue'
import { MessageBox } from 'element-ui'
import utils from 'src/utils'
import './assets/scripts/requestAnimationFrame'
require('smoothscroll-polyfill').polyfill()
// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    console.log(23 + 'fasdassa')
    const { asyncData } = this.$options
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router, store } = createApp(createClientHttp())
console.log(store)

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
if (window.__INITIAL_STATE__) {
  const localState = {
    media: Object.assign(
      {},
      window.__INITIAL_STATE__.media,
      {
        wechatSpec: utils.restore('wechatSpec'),
        weiboSpec: utils.restore('weiboSpec')
      }
    )
  }
  store.replaceState(Object.assign({}, window.__INITIAL_STATE__, localState))
  // store.replaceState(window.__INITIAL_STATE__)
}

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })

  router.beforeEach((to, from, next) => {
    let isLogin = !_.isEmpty(store.state.account.loginType)
    if (to.meta.isRequireLogin && !isLogin) {
      next(false)
      MessageBox.confirm('您当前还未登录, 是否先去登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.assign('/userLogin')
      })
    } else if (store.state.account.nothirdLogin && !store.state.account.fdMobile && isLogin) {
      console.log('complelte: ', to)
      next(false)
      window.location.assign('/webapp/media/forcetocomplete')
    } else {
      bar.start()
      next()
    }
  })

  router.afterEach(route => {
    bar.finish()
  })

  // this assumes App.vue template root element has id="app"
  app.$mount('#app')
  window.vm = app
})
