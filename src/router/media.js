const wechatList = r => require.ensure([], () => r(require('views/media/wechat-list.vue')))
const weiboList = r => require.ensure([], () => r(require('views/media/weibo-list.vue')))
const orderList = r => require.ensure([], () => r(require('views/media/order-list.vue')))
const cart = r => require.ensure([], () => r(require('views/media/cart.vue')))
const billList = r => require.ensure([], () => r(require('views/media/bill-list.vue')))
const cartConfirm = r => require.ensure([], () => r(require('views/media/cart-confirm.vue')))
const purchased = r => require.ensure([], () => r(require('views/media/purchased.vue')))
const collectList = r => require.ensure([], () => r(require('views/media/collect-list.vue')))
const empty = r => require.ensure([], () => r(require('views/media/CEmpty.vue')))
const invoiceList = r => require.ensure([], () => r(require('views/media/invoice-list.vue')))
const invoiceInfo = r => require.ensure([], () => r(require('views/media/invoice-info.vue')))
const invoiceInfoEdit = r => require.ensure([], () => r(require('views/media/invoice-info-edit.vue')))
const invoiceInfoAdd = r => require.ensure([], () => r(require('views/media/invoice-info-add.vue')))
const invoiceHistory = r => require.ensure([], () => r(require('views/media/invoice-history.vue')))
const charge = r => require.ensure([], () => r(require('views/media/charge.vue')))
const safeCenter = r => require.ensure([], () => r(require('views/media/safe-center.vue')))
const completeInfo = r => require.ensure([], () => r(require('views/media/complete-info.vue')))
const billboard = r => require.ensure([], () => r(require('views/media/billboard.vue')))
const billboardSearch = r => require.ensure([], () => r(require('views/media/billboard-search.vue')))
const billboardDetail = r => require.ensure([], () => r(require('views/media/billboard-detail.vue')))
const billboardWeibo = r => require.ensure([], () => r(require('views/media/billboard-weibo.vue')))
const billboardWeiboDetail = r => require.ensure([], () => r(require('views/media/billboard-weibo-detail.vue')))
const billboardWeiboSearch = r => require.ensure([], () => r(require('views/media/billboard-weibo-search.vue')))
const billboardHeadline = r => require.ensure([], () => r(require('views/media/billboard-headline.vue')))
const billboardHeadlineSearch = r => require.ensure([], () => r(require('views/media/billboard-headline-search.vue')))
const billboardHeadlineDetail = r => require.ensure([], () => r(require('views/media/billboard-headline-detail.vue')))
const forceToComplete = r => require.ensure([], () => r(require('views/media/force-to-complete.vue')))
const rewardList = r => require.ensure([], () => r(require('views/media/pointReward/reward-list.vue')))
const pointRecord = r => require.ensure([], () => r(require('views/media/pointReward/point-record.vue')))
const pointOrder = r => require.ensure([], () => r(require('views/media/pointReward/point-order.vue')))
const pointAddress = r => require.ensure([], () => r(require('views/media/pointReward/point-address.vue')))
const pointSuccess = r => require.ensure([], () => r(require('views/media/pointReward/point-success.vue')))
const headlineList = r => require.ensure([], () => r(require('views/media/headline-list.vue')))
const aboutUs = r => require.ensure([], () => r(require('views/media/about-us.vue')))
const joinUs = r => require.ensure([], () => r(require('views/media/join-us.vue')))
const caseLibrary = r => require.ensure([], () => r(require('views/media/case-library.vue')))
const caseDetail = r => require.ensure([], () => r(require('views/media/case-detail.vue')))
const news = r => require.ensure([], () => r(require('views/media/news.vue')))
const newsDetail = r => require.ensure([], () => r(require('views/media/news-detail.vue')))

const prefix = '/webapp'

const routes = [{
  path: prefix + '/media/wechat-list',
  component: wechatList,
  name: 'media-wechat-list'
}, {
  path: prefix + '/media/weibo-list',
  component: weiboList,
  name: 'media-weibo-list'
}, {
  path: prefix + '/media/order-list',
  component: orderList,
  name: 'media-order-list',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/cart',
  component: cart,
  name: 'media-cart',
  meta: {
    hideFooter: true,
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/cart-confirm',
  component: cartConfirm,
  name: 'media-cart-confirm',
  meta: {
    hideFooter: true,
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/bill-list',
  component: billList,
  name: 'media-bill-list',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/purchased',
  component: purchased,
  name: 'media-purchased',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/collect-list',
  component: collectList,
  name: 'media-collect-list',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/charge',
  component: charge,
  name: 'charge',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/empty',
  component: empty,
  name: 'media-empty',
  meta: {
    title: '开发中',
    hideHeader: true
  }
}, {
  path: prefix + '/media/invoice',
  component: invoiceList,
  name: 'media-invoice-list',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/invoice/info',
  component: invoiceInfo,
  name: 'media-invoice-info',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/invoice/info/edit/:id?',
  component: invoiceInfoEdit,
  name: 'media-invoice-info-edit',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/invoice/info/add',
  component: invoiceInfoAdd,
  name: 'media-invoice-info-add',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/invoice/history',
  component: invoiceHistory,
  name: 'media-invoice-history',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/safe-center',
  component: safeCenter,
  name: 'media-safe-center',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/safe-center/complete-info',
  component: completeInfo,
  name: 'media-complete-info',
  meta: {
    isRequireLogin: true,
    hideHeader: true
  }
}, {
  path: prefix + '/media/billboard',
  component: billboard,
  name: 'media-billboard'
}, {
  path: prefix + '/media/billboard/search/:keyword?',
  component: billboardSearch,
  name: 'media-billboard-search'
}, {
  path: prefix + '/media/billboard/detail/:id',
  component: billboardDetail,
  name: 'media-billboard-detail'
}, {
  path: prefix + '/media/billboard/weibo',
  component: billboardWeibo,
  name: 'media-billboard-weibo'
}, {
  path: prefix + '/media/billboard/weibo/detail/:id',
  component: billboardWeiboDetail,
  name: 'media-billboard-weibo-detail'
}, {
  path: prefix + '/media/billboard/weibo/search/:keyword?',
  component: billboardWeiboSearch,
  name: 'media-billboard-weibo-search'
}, {
  path: prefix + '/media/billboard/headline',
  component: billboardHeadline,
  name: 'media-billboard-headline'
}, {
  path: prefix + '/media/billboard/headline/detail/:id',
  component: billboardHeadlineDetail,
  name: 'media-billboard-headline-detail'
}, {
  path: prefix + '/media/billboard/headline/search/:keyword?',
  component: billboardHeadlineSearch,
  name: 'media-billboard-headline-search'
}, {
  path: prefix + '/media/forcetocomplete',
  component: forceToComplete,
  name: 'media-force-to-complete'
}, {
  path: prefix + '/media/pointReward',
  component: rewardList,
  name: 'media-reward-list',
  meta: {
    hideHeader: true
  }
}, {
  path: prefix + '/media/pointReward/pointRecord',
  component: pointRecord,
  name: 'media-point-record',
  meta: {
    hideHeader: true
  }
}, {
  path: prefix + '/media/pointReward/pointOrder',
  component: pointOrder,
  name: 'media-point-order',
  meta: {
    hideHeader: true
  }
}, {
  path: prefix + '/media/pointReward/pointAddress',
  component: pointAddress,
  name: 'media-point-address',
  meta: {
    hideHeader: true
  }
}, {
  path: prefix + '/media/pointReward/pointSuccess',
  component: pointSuccess,
  name: 'media-point-success',
  meta: {
    hideHeader: true
  }
}, {
  path: prefix + '/media/headline',
  component: headlineList,
  name: 'media-headline-list'
}, {
  path: prefix + '/media/aboutUs',
  component: aboutUs,
  name: 'about-us'
}, {
  path: prefix + '/media/joinUs',
  component: joinUs,
  name: 'join-us'
}, {
  path: prefix + '/media/caseLibrary',
  component: caseLibrary,
  name: 'case-library'
}, {
  path: prefix + '/media/caseLibrary/detail/:id',
  component: caseDetail,
  name: 'media-case-detail'
}, {
  path: prefix + '/media/news',
  component: news,
  name: 'news'
}, {
  path: prefix + '/media/news/detail/:id',
  component: newsDetail,
  name: 'media-news-detail'
}
]

export default routes
