var Mock = require('mockjs')
var Random = Mock.Random

Mock.setup({
  timeout: '1000-3000'
})

// 获取商品列表
Mock.mock(/^\/writer\/list/, {
  'data|1-15': [
    {
      'id|+1': 0,
      'fdName|+1': ['某某知名写手', '李铁跟', '所长别开枪是我', '鸟人与鱼'],
      'fdAbstract': '擅长推广微信软文',
      'isCollected|+1': [true, false, true, false],
      'isInCart|+1': [false, true, true, false],
      'fdTrades': ['汽车', '女性'],
      'fdWeight|1-1000.1-5': 1,
      'fdWriterType': '2',
      'fdWriterTypeValue': '微信',
      'fdPriceUp|300-1000': 1,
      'fdPriceDown|100-300': 1,
      'fdSales|0-100000': 1,
      'fdCollectionCount|0-100000': 1,
      'fdWinBitCount|0-100000': 1,
      'fdStar|0-5.1-1': 1.1,
      'fdImage': {
        'name': '0',
        'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0',
        'thumbnailUrl': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0@1e_1c_0o_0l_100h_100w_90q.src'
      }
    }
  ],
  'pageCount': '@natural(1, 50)',
  'pageIndex': '@natural(1, 10)',
  'pageSize': 15,
  'total': 450
})

// 买家中心
Mock.mock('/ucenter', {
  'avatar': Random.image('86x86', '#03efaf'),
  'username': Random.first(),
  'accountSafety|0-100': 80,
  'amount|0-200000.2': 100,
  'freezingAmount|0-200000.2': 100,
  'bindingAccount': {
    'name': 'bank',
    'account': '6225652152535655452'
  },
  'todos': [
    {
      'name': 'pdOrder',
      'status': [
        {
          'name': 'waitingPayment',
          'num|0-100': 50
        },
        {
          'name': 'waitingConfirm',
          'num|0-100': 50
        }
      ]
    },
    {
      'name': 'yyOrder',
      'status': [
        {
          'name': 'waitingPayment',
          'num|0-100': 50
        },
        {
          'name': 'waitingAddDoc',
          'num|0-100': 50
        },
        {
          'name': 'processing',
          'num|0-100': 50
        },
        {
          'name': 'waitingConfirm',
          'num|0-100': 50
        }
      ]
    },
    {
      'name': 'waOrder',
      'status': [
        {
          'name': 'waitingPayment',
          'num|0-100': 50
        },
        {
          'name': 'waitingBidSelection',
          'num|0-100': 50
        },
        {
          'name': 'waitingConfirm',
          'num|0-100': 50
        },
        {
          'name': 'waitingComment',
          'num|0-100': 50
        }
      ]
    }
  ]
})

// 购物车
Mock.mock('/writer/cart', {
  'goodsListWa|5-15': [{
    'id|+1': 0,
    'fdName': Random.first(),
    'fdAbstract': '擅长推广微信软文',
    'fdTrades': ['汽车', '女性'],
    'fdWeight': 0.98,
    'fdWriterType': 'wechat',
    'fdWriterTypeValue': '微信',
    'fdPriceUp|300-1000': 1,
    'fdPriceDown|100-300': 1,
    'fdSales': 100,
    'fdCollectionCount': 666,
    'fdWinBitCount': 10,
    'fdStar': 5.0,
    'fdImage': {
      'name': '0',
      'url': Random.image('86x86', '#03efaf'),
      'thumbnailUrl': Random.image('86x86', '#03efaf')
    }
  }],
  'goodsListPd': [],
  'goodsListYy': []
})

Mock.mock(/\/writer\/cart\/writer/, 'post', {
  'code': 1
})

Mock.mock(/\/writer\/cart\/writer\/\d+/, 'delete', {
  'code': 1
})

// 收藏商品
Mock.mock(/^\/collection\/writer\/list/, {
  'data|1-15': [
    {
      'id|+1': 0,
      'fdName|+1': ['某某知名写手', '李铁跟', '所长别开枪是我', '鸟人与鱼'],
      'fdAbstract': '擅长推广微信软文(收藏)',
      'isInCart|+1': [false, true, true, false],
      'fdTrades': ['IT互联网', '女性', '美女'],
      'fdWeight|1-1000.1-5': 1,
      'fdWriterType': '2',
      'fdWriterTypeValue': '微信',
      'fdPriceUp|300-1000': 1,
      'fdPriceDown|100-300': 1,
      'fdSales|0-100000': 1,
      'fdCollectionCount|0-100000': 1,
      'fdWinBitCount|0-100000': 1,
      'fdStar|0-5.1-1': 1.1,
      'fdImage': {
        'name': '0',
        'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0',
        'thumbnailUrl': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0@1e_1c_0o_0l_100h_100w_90q.src'
      }
    }
  ],
  'pageCount': '@natural(1, 50)',
  'pageIndex': '@natural(1, 10)',
  'pageSize': 15,
  'total': 450
})

Mock.mock(/\/collection\/writer/, 'post', {
  'code': 1
})

Mock.mock(/\/collection\/writer\/\d+/, 'delete', {
  'code': 1
})

// 上传
Mock.mock('/file/uploadLocal', 'post', {
  'success': true,
  'files': [{
    'thumbnailUrl': Random.image('86x86', '#03efaf'),
    'name': '示例图片'
  }]

})

// 写手商品详情
Mock.mock(/\/writer\/\d+$/, {
  'id|+1': 1,
  'fdName|1': ['某某知名写手', '老鸨子划船不用浆，全靠浪~~'],
  'fdAbstract': '手游君年度最佳手游排行榜新鲜出炉啦，你喜欢玩的那款游戏究竟有没有上榜呢？小羊最喜欢玩的是年度最佳健康手游',
  'fdSellerRemarks': '手游君年度最佳手游排行榜新鲜出炉啦，你喜欢玩的那款游戏究竟有没有上榜呢？小羊最喜欢玩的是年度最佳健康手游',
  'fdTrades|1-2': [
    '汽车',
    '女性',
    'IT互联网',
    '二次元',
    '萌宠',
    '明星',
    '穿搭',
    '运动'
  ],
  'fdWeight': 0.98,
  'fdWriterType': 'wechat',
  'fdPriceUp|1000-20000': 2000,
  'fdPriceDown|0-1000': 1000,
  'fdSales|0-2000': 100,
  'fdCollectionCount|0-2000': 666,
  'fdWinBitCount|0-200': 10,
  'fdStar|0-5.0-1': 4,
  'fdImage': {
    'name': '0',
    'url': Random.image('260x260', '#4A7BF7', 'Hello'),
    'thumbnailUrl': Random.image('100x100', '#4A7BF7', 'Hello')
  }
})

// 写手商品案例
Mock.mock(/^\/writer\/\d+\/article\/list/, {
  'data|1-5': [{
    'id|+1': 1,
    'fdOrder|+1': 1,
    'fdName|1': ['某某知名写手', '老鸨子划船不用浆，全靠浪~~'],
    'fdAbstract': '手游君年度最佳手游排行榜新鲜出炉啦，你喜欢玩的那款游戏究竟有没有上榜呢？小羊最喜欢玩的是年度最佳健康手游',
    'fdDesc': '手游君年度最佳手游排行榜新鲜出炉啦，你喜欢玩的那款游戏究竟有没有上榜呢？小羊最喜欢玩的是年度最佳健康手游,你喜欢玩的那款游戏究竟有没有上榜呢？小羊最喜欢玩的是年度最佳健康手游。',
    'fdLink': 'https://lodash.com/docs/',
    'fdAtt|1-3': [{
      'name': '案例图片1',
      'url': Random.image('120x95', '#4A7BF7', 'Hello')
    }]
  }]
})
// 商品评论概要
Mock.mock(/^\/writer\/\d+\/comment\/abstract/, {
  'fdStar|0-5.0-1': 4.5,
  'fdServerStar|0-5.0-1': 4.5,
  'fdWorkStar|0-5.0-1': 4.5,
  'fdFinishStar|0-5.0-1': 4.5,
  'fdExpress': [
    {
      'text': '性价比高',
      'num': 10
    },
    {
      'text': '质量很好',
      'num': 20
    },
    {
      'text': '态度不行',
      'num': 100
    }
  ]
})
// 写手商品评论
Mock.mock(/^\/writer\/comment\/list/, {
  'list|15': [
    {
      'fdStar|0-5.0-1': 4.8,
      'createdDate|1': ['2016-12-21 08:00:00', '2015-12-21 08:00:00', '2015-9-21 12:00:00'],
      'fdContent|1': ['好，很好，有希望了', '厉害啊，小伙砸！', '瓦嚓拉~牛叉！', '不怎么样。', '还行。'],
      'fdName|1': ['张三', '李四', '王五', '赵六']
    }],
  'pageCount': 20,
  'page': 1,
  'pageSize': 15,
  'total': 160
})
// 订单
Mock.mock(/\/writerOrder\/wrorder$/, 'post', {
  'fdWriteOrderId': 1110
})

// 公募付款
Mock.mock(/\/writerOrder\/wrorder\/\d+\/payment\/public$/, 'post', {
  'fdNo': 123,
  'fdPrice': 1231,
  'date': '2016-12-19 18:09',
  'fromDeadline': 7
})

// 私募付款
Mock.mock(/\/writerOrder\/wrorder\/\d+\/payment\/private$/, 'post', {
  'fdNo': 123,
  'fdPrice': 1231,
  'date': '2016-12-19 18:09',
  'fromDeadline': 7
})

// 订单列表
Mock.mock(/\/writerOrder\/wrorder\/list/, {
  'data|15': [
    {
      'id|+1': 1,
      'fdNo|1': ['123123', '123456', '256314', '895465'],
      'fdStatus|1': [1, 2, 3, 4, 5, 9, 10, 11, 12, 13],
      'fdStatusValue|1': ['待付款', '竞标中', '选标中', '执行中', '待确认', '已结束', '已取消', '已流标', '已流单', '未选标'],
      'fdName|1': ['想起你的时候', '浪得飞起', '咋地啊，谁还不是小公举！', 'gakki'],
      'fdType|1': ['1', '2'],
      'fdTrades': [
        '汽车',
        '女性',
        'IT互联网'],
      'fdPrice|0-2000': 600,
      'fdWriterType|1-3': 1,
      'fdArticleCount|1-10': 1,
      'fdBidEndTime|1': ['2016-12-19 18:09', '2017-1-19 18:09', '2016-12-30 06:09'],
      'fdArticleEndTime|1': ['2016-12-19 18:09', '2017-1-19 18:09', '2016-12-30 06:09'],
      'createdDate|1': ['2016-12-19 18:09', '2017-1-19 18:09', '2016-12-30 06:09']
    }
  ],
  'pageCount': 30,
  'pageIndex': 2,
  'pageSize': 15,
  'total': 450
})

// 订单详情
Mock.mock(/\/writerOrder\/wrorder\/\d+$/, {
  'id': 1,
  'fdNo': 109876543455,
  'fdStatus': 4,
  'fdStatusValue': '待付款',
  'fdName': '想起你的时候 ,浪得飞起, 咋地啊，谁还不是小公举！',
  'fdType': 'public',
  'fdTrades': ['IT互联网'],
  'fdPrice|0-2000': 600,
  'fdWriterType': 'wechat',
  'fdWriterTypeValue': '微信',
  'fdArticleCount': 20,
  'fdWordCount': 1000,
  'fdDesc': '详细要求，比如提高店铺转化率 balabal~~~',
  'createdDate': '2016-12-19 18:09',
  'fdBidEndTime': '2016-12-19 18:09',
  'fdArticleEndTime': '2016-12-29 18:09',
  'fdAtt': [{
    'name': '需求文档',
    'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0'
  }, {
    'name': '案例图片2',
    'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0'
  }]
})

// 取消订单
Mock.mock(/\/wrorder\/\d+\/cancel$/, 'post', {
  'code': 1
})

// 订单项详情（沟通）
Mock.mock(/\/writerOrderItemMessage\/wrorderItem\/message\/list/, {
  'data|8': [
    {
      'createdBy|1': [1, 2],
      'fdNo|+1': 1,
      'createdDate|1': ['2016-12-19 18:09', '2017-01-02 11:30', '2017-01-11-10 10:10'],
      'fdMessage|1': ['带图片版本的，看看可以不', '美美哒！', '正是我想要的啊！', '我们走的是一个狂野的风格'],
      'fdIsRead': true,
      'fdAtt|0-1': [
        {
          'name': '附件1',
          'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0'
        },
        {
          'name': '附件2',
          'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0'
        }
      ]
    }
  ],
  'pageCount': 2,
  'pageIndex': 1,
  'pageSize': 15,
  'total': 25
})
// 订单项详情
Mock.mock(/\/wrorderItem\/\d+$/, {
  'id|1': [1, 2, 3],
  'fdName|1': ['某某知名写手', '想学习，想得睡不着觉', '扶朕起来，真还能学'],
  'fdAbstract|1': ['我这巴掌下去，你可能会死，你信不信？', '论美貌你是比不过我的，你造吗？', '你丑你先说'],
  'fdTrades|1': ['汽车', 'IT互联网'],
  'fdWriterType|1': ['wechat', 'weibo', 'other'],
  'fdWriterTypeValue|1': ['微信', '微博', '其他'],
  'fdWinBitCount|1-10': 10,
  'fdMobile': 17687919017,
  'fdImage': {
    'name': '0',
    'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0',
    'thumbnailUrl': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0@1e_1c_0o_0l_100h_100w_90q.src'
  },
  'fdComplaintStatus': null,
  'createdDate': '2016-12-19 18:09',
  'fdWinBidTime': '2016-12-29 18:09',
  'fdArticleCount': 3,
  'fdPrice': 600,
  'fdStatus|1': [1, 2, 3, 4, 5, 9, 10, 11, 12, 13],
  'fdStatusValue|1': ['待付款', '竞标中', '选标中', '待执行', '待确认', '已结束', '已取消', '已流标', '已流单', '未选标'],
  'fdBuyerReadMessageCount': 1
})
// 订单项详情（沟通）消息
Mock.mock(/\/writerOrderItemMessage\/wrorderItem\/\d+\/message/, {
  'createdBy|1': [1, 2, 3],
  'fdNo|+1': 1,
  'createdDate|1': ['2016-12-19 18:09', '2017-01-02 11:30', '2017-01-11-10 10:10'],
  'fdMessage': '洪湖水浪打浪',
  'fdIsRead': false,
  'fdAtt': [
    {
      'name': '示例图片1',
      'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0'
    },
    {
      'name': '示例图片2',
      'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0'
    }
  ]
})

// 订单项详情 查看文案
Mock.mock(/\/writerOrderItemArticle\/wrorderItem\/articles?/, {
  'data|1-3': [
    {
      'fdName|1': ['文案一', '文案二', '文案三'],
      'fdOrder': 1,
      'createdDate': '2016-12-19 18:09',
      'fdAbstract': '概要简介',
      'fdDesc|1': [Random.cparagraph(), Random.cparagraph()],
      'fdAtt|1-3': [
        {
          'name|1': ['附件一', '附件二', '附件三'],
          'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0'
        }
      ]
    }
  ],
  'pageCount': 1,
  'pageIndex': 1,
  'pageSize': 15,
  'total': 2
})

// 订单项列表
Mock.mock(/\/wrorderItem\/wrorder\/wrorderItem\/list/, {
  'data|15': [
    {
      'id|+1': 0,
      'fdName': '某某知名写手某某知名写手某某知名写手某某知名写手某某知名写手',
      'fdAbstract': '擅长推广微信软文擅长推广微信软文擅长推广微信软文擅长推广微信软文擅长推广微信软文擅长推广微信软文',
      'fdTrades': ['汽车', '女性', 'IT互联网'],
      'fdWriterType': 'wechat',
      'fdWriterTypeValue': '微信',
      'fdWinBitCount': 10,
      'fdMobile': 17687919017,
      'fdImage': {
        'name': '0',
        'url': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0',
        'thumbnailUrl': 'http://imgcdn.guangeryi.com/upload/20161111/c9201261-c87b-4133-91cd-0feb3896de7f.cn/mmhead/Q3auHgzwzM5yPwaM3wboia5hgJOZGv2sTqUBv2WKk7WTyR5opYTyDMQ/0@1e_1c_0o_0l_100h_100w_90q.src'
      },
      'fdComplaintStatus': null,
      'createdDate': '2016-12-19 18:09',
      'fdWinBidTime': '2016-12-29 18:09',
      'fdArticleCount': 3,
      'fdPrice': 600,
      'fdStatus|+1': [1, 2, 3, 4, 9, 10, 11, 12, 13],
      'fdStatusValue|+1': ['待竞标', '待选标', '竞标中', '待确认', '已结束', '已取消', '已流标', '已流单', '未选标'],
      'fdBuyerReadMessageCount': 1
    }
  ],
  'pageCount': 2,
  'pageIndex|3-10': 3,
  'pageSize': 15,
  'total|45-200': 30
})

// 买家选标
Mock.mock(/\/wrorder\/\d+\/wrorderItem\/choose$/, 'post', {
  'code': 1
})

// 买家投诉
Mock.mock(/\/wrorderItem\/\d+\/complaint$/, 'post', {
  'code': 1
})

// 取消订单
Mock.mock(/\/wrorder\/\d+\/cancel$/, 'post', {
  'code': 1
})

// 订单项 确认收货
Mock.mock(/\/wrorderItem\/\d+\/confirm/, {
  'code|1': [1]
})

// 订单项 评价
Mock.mock(/\/wrorderItem\/\d+\/comment/, 'get', {
  'fdContent|1': ['厉害啊，小伙砸！', '60！还有谁？！牛不牛X，牛X吗！'],
  'fdStar|1': [1, 3, 5],
  'fdServerStar|1': [1, 3, 5],
  'fdWorkStar|1': [1, 3, 5],
  'fdFinishStar|1': [1, 3, 5]
})

Mock.mock(/\/wrorderItem\/\d+\/comment/, 'post', {
  'code|1': [1, 2]
})
