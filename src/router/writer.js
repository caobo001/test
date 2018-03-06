const goodsList = r => require.ensure([], () => r(require('views/writer/goods.vue')))
const publish = r => require.ensure([], () => r(require('views/writer/publish.vue')))
const goodsDetail = r => require.ensure([], () => r(require('views/writer/goods-detail.vue')))
const orderList = r => require.ensure([], () => r(require('views/writer/order-list.vue')))
const cart = r => require.ensure([], () => r(require('views/writer/cart.vue')), 'cart')
const cartPick = r => require.ensure([], () => r(require('views/writer/cart-pick.vue')), 'cart')
const cartConfirm = r => require.ensure([], () => r(require('views/writer/cart-confirm.vue')), 'cart-confirm')
const purchased = r => require.ensure([], () => r(require('views/writer/purchased.vue')), 'cart-confirm')
const orderDetail = r => require.ensure([], () => r(require('views/writer/order-detail.vue')))
const communicate = r => require.ensure([], () => r(require('views/writer/communicate.vue')))
const receipt = r => require.ensure([], () => r(require('views/writer/receipt.vue')))
const evaluate = r => require.ensure([], () => r(require('views/writer/evaluate.vue')))

const routes = [{
  path: '/goods-list/:model?',
  component: goodsList,
  name: 'goods',
  meta: {
    title: '写手市场'
  }
}, {
  path: '/publish',
  component: publish,
  name: 'publish',
  meta: {
    title: '发布需求'
  }
}, {
  path: '/goods/:id',
  component: goodsDetail,
  name: 'goods-detail',
  meta: {
    title: '写手详情'
  }
}, {
  path: '/purchased',
  component: purchased,
  name: 'purchased',
  meta: {
    title: '购买成功'
  }
}, {
  path: '/order-list',
  component: orderList,
  name: 'order-list',
  meta: {
    title: '订单列表'
  }
}, {
  path: '/order/:orderId',
  component: orderDetail,
  name: 'order-detail',
  meta: {
    title: '订单详情'
  }
}, {
  path: '/cart',
  component: cart,
  name: 'cart',
  meta: {
    title: '购物车'
  }
}, {
  path: '/cart/pick',
  component: cartPick,
  name: 'cart-pick',
  meta: {
    title: '选择写手'
  }
}, {
  path: '/cart/confirm',
  component: cartConfirm,
  name: 'cart-confirm',
  meta: {
    title: '确认订单'
  }
}, {
  path: '/order/:orderId/item/:orderItemId/communicate',
  component: communicate,
  name: 'communicate',
  meta: {
    title: '沟通'
  }
}, {
  path: '/order/:orderId/item/:orderItemId/receipt',
  component: receipt,
  name: 'receipt',
  meta: {
    title: '确认收货'
  }
}, {
  path: '/order/:orderId/item/:orderItemId/evaluate',
  component: evaluate,
  name: 'evaluate',
  meta: {
    title: '评价'
  }
}]

export default routes
