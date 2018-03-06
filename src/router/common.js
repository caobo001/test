const home = r => require.ensure([], () => r(require('views/home.vue')))

const routes = [{
  path: '/',
  component: home,
  name: 'home',
  meta: {
    title: '买家中心'
  }
}]

export default routes
