// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { createRouter } from './router'
import { createStore } from './store'
import { sync } from 'vuex-router-sync'
import titleMixin from './title-mixin'
import CToggle from 'components/CToggle'
import CBreadcrumb from 'components/CBreadcrumb'
import CMenu from 'components/CMenu'
import CSteps from 'components/CSteps'
import './filters'
import './assets/scripts/lodash.core'

import {
  Col,
  Row,
  Form,
  FormItem,
  Button,
  Input,
  Checkbox,
  Select,
  Option,
  Tabs,
  TabPane,
  Pagination,
  Loading,
  Dialog,
  Message,
  MessageBox
} from 'element-ui'

import 'es6-promise/auto'

function polyfill () {
  var local

  if (typeof global !== 'undefined') {
    local = global
  } else if (typeof self !== 'undefined') {
    local = self
  }
  local.Promise.prototype['finally'] = function (callback) {
    let P = this.constructor
    return this.then(
      value => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => {
        throw reason
      })
    )
  }
}
polyfill()

// 安装全局 element-ui 组件
Vue.use(Col)
Vue.use(Row)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Button)
Vue.use(Input)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Option)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Pagination)
Vue.use(Loading)
Vue.use(Dialog)

// 安装全局自定义组件
Vue.component('CToggle', CToggle)
Vue.component('CBreadcrumb', CBreadcrumb)
Vue.component('CMenu', CMenu)
Vue.component('CSteps', CSteps)

Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox

// mixin for handling title
Vue.mixin(titleMixin)

export function createApp (http) {
  Vue.prototype.$http = http
  console.log(Vue.$http + '------')

  // create router and store instances
  const router = createRouter()
  const store = createStore(http)
  // sync the router with the vuex store.
  // this registers `store.state.route`
  sync(store, router)

  // create the app instance.
  // here we inject the router, store and ssr context to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  })
  // expose the app, the router and the store.
  return { app, router, store }
}
