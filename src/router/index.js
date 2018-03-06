import Vue from 'vue'
import 'html5-history-api'
import Router from 'vue-router'
// import commonRoutes from './common'
// import writerRoutes from './writer'
import mediaRoutes from './media'

Vue.use(Router)

const redirect = {
  path: '*',
  redirect: '/webapp/media/wechat-list'
}

const routes = [
  // ...commonRoutes,
  // ...writerRoutes,
  ...mediaRoutes,
  redirect
]

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    routes
  })
}
