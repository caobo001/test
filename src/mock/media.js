var Mock = require('mockjs')
var Random = Mock.Random

Mock.setup({
  timeout: '1000-3000'
})

// 微信列表
Mock.mock(/\/goods\/list\/.+/, {
  'data|9': [
    {
      'fdGoodsProducts': [
        {
          'fdGoodsSpecification': {
            'fdName': '头条',
            'fdOrder': 1,
            'id': '153eebe8c2b7b21fa26428d40df81545'
          },
          'fdGoodsId': '15a1189db9bd5c18fff251c4a0b99e13',
          'fdGoodsSpecificationId': '153eebe8c2b7b21fa26428d40df81545',
          'fdPrice|200-500000.1-2': 266000,
          'fdSalesPrice|200-500000.1-2': 200000,
          'id': Random.guid()
        },
        {
          'fdGoodsSpecification': {
            'fdName': '二条',
            'fdOrder': 2,
            'id': '153eebe8c2b7b21fa26428d40df81548'
          },
          'fdGoodsId': '15a1189db9bd5c18fff251c4a0b99e14',
          'fdGoodsSpecificationId': '153eebe8c2b7b21fa26428d40df81545',
          'fdPrice|200-500000.1-2': 266000,
          'fdSalesPrice|200-500000.1-2': 200000,
          'id': Random.guid()
        }
      ],
      'fdAttr1|1': ['情感,KOL', '新闻资讯,生活', '汽车', '美食', 'IT互联网', '新闻资讯,IT互联网,母婴育儿,时尚娱乐,教育培训'],
      'fdAttr2|1': ['全国', '江西省'],
      'fdCode|1': ['yangongziyijinyexing', 'nanchang-nanchang', 'haowai0791', 'topdriverclub', 'Yueshi_China', 'xinchepingwang'],
      'fdFunsCount|1-1000000000': 180000,
      'fdGoodsGroupId': Random.guid(),
      'fdImageJson': {
        'name': '衣锦夜行的燕公子',
        'url': Random.image('100x100', '#4A7BF7', 'url'),
        'thumbnailUrl': Random.image('64x64', '#05ec7c', 'thumbnailUrl')
      },
      'fdIsCommentable|1': [true, false],
      'fdIsMonth': false,
      'fdIsOfficial': true,
      'fdIsOriginal|1': [true, false],
      'fdIsProvideInvoice': true,
      'fdIsTop': 0,
      'fdIsUpdate': false,
      'fdLastPushDate|1': ['2000-10-01 04:55', '2001-10-01 04:55', '2002-10-01 04:55'],
      'fdLastReadNum|20-50000': 20,
      'fdName|1': ['衣锦夜行的燕公子', '飞天红猪侠', '丸子同学', '旗木卡卡西'],
      'fdPriceDown|200-30000.1-10': 1000,
      'fdPriceUp|30000-3000000.1-10': 266000,
      'fdPushArticleCount|1-100': 1,
      'fdPushCount|1-20': 1,
      'fdReadCount|20-100': 25,
      'fdSn': '17020611485173924',
      'fdUpdatePriceDate|1': ['2000-10-01 04:55', '2001-10-01 04:55', '2002-10-01 04:55'],
      'fdVipType': '普通',
      'fdWeight|1': [20, 30, 40],
      'id|+1': 1,
      'isCollection': false,
      'remarks': '微博大V”衣锦夜行的燕公子“唯一官方公众账号'
    }
  ],
  'pageCount': 1,
  'pageSize': 15,
  'total': 9
})

// 微信收藏
Mock.mock(/\/goods\/weixin\/collection/, {
  'code': 1
})

// 微博列表
Mock.mock(/\/goods\/weibo\/list/, {
  'data|9': [
    {
      'fdGoodsProducts': [
        {
          'fdGoodsSpecification': {
            'fdName': '直发',
            'fdOrder': 1,
            'id': '153eebe8c2b7b21fa26428d40df81541'
          },
          'fdGoodsId': '15a1189db9bd5c18fff251c4a0b99e13',
          'fdGoodsSpecificationId': '153eebe8c2b7b21fa26428d40df81541',
          'fdPrice|200-500000.1-2': 266000,
          'fdSalesPrice|200-500000.1-2': 200000,
          'id': Random.guid()
        },
        {
          'fdGoodsSpecification': {
            'fdName': '转发',
            'fdOrder': 3,
            'id': '153eebe8c2b7b21fa26428d40df81542'
          },
          'fdGoodsId': '15a1189db9bd5c18fff251c4a0b99e14',
          'fdGoodsSpecificationId': '153eebe8c2b7b21fa26428d40df81542',
          'fdPrice|200-500000.1-2': 266000,
          'fdSalesPrice|200-500000.1-2': 200000,
          'id': Random.guid()
        },
        {
          'fdGoodsSpecification': {
            'fdName': '防屏蔽直发',
            'fdOrder': 2,
            'id': '153eebe8c2b7b21fa26428d40df81543'
          },
          'fdGoodsId': '15a1189db9bd5c18fff251c4a0b99e14',
          'fdGoodsSpecificationId': '153eebe8c2b7b21fa26428d40df81543',
          'fdPrice|200-500000.1-2': 266000,
          'fdSalesPrice|200-500000.1-2': 200000,
          'id': Random.guid()
        },
        {
          'fdGoodsSpecification': {
            'fdName': '防屏蔽转发',
            'fdOrder': 4,
            'id': '153eebe8c2b7b21fa26428d40df81544'
          },
          'fdGoodsId': '15a1189db9bd5c18fff251c4a0b99e14',
          'fdGoodsSpecificationId': '153eebe8c2b7b21fa26428d40df81544',
          'fdPrice|200-500000.1-2': 266000,
          'fdSalesPrice|200-500000.1-2': 200000,
          'id': Random.guid()
        }
      ],
      'fdAttr1|1': ['情感,KOL', '新闻资讯,生活', '汽车', '美食', 'IT互联网', '新闻资讯,IT互联网,母婴育儿,时尚娱乐,教育培训'],
      'fdAttr2|1': ['全国', '江西省'],
      'fdCode|1': ['yangongziyijinyexing', 'nanchang-nanchang', 'haowai0791', 'topdriverclub', 'Yueshi_China', 'xinchepingwang'],
      'fdFunsCount|1-1000000000': 180000,
      'fdGoodsGroupId': Random.guid(),
      'fdImageJson': {
        'name': '衣锦夜行的燕公子',
        'url': Random.image('100x100', '#4A7BF7', 'url'),
        'thumbnailUrl': Random.image('64x64', '#05ec7c', 'thumbnailUrl')
      },
      'fdIsCommentable|1': [true, false],
      'fdIsMonth': false,
      'fdIsOfficial': true,
      'fdIsOriginal': false,
      'fdIsProvideInvoice': true,
      'fdIsTop': 0,
      'fdIsUpdate': false,
      'fdLastPushDate': '2017-01-28 23:34',
      'fdLastReadNum|20-50000': 20,
      'fdName|1': ['衣锦夜行的燕公子', '飞天红猪侠', '丸子同学', '旗木卡卡西'],
      'fdLink|1': ['http://weibo.com/liuyifeiofficial?topnav=1&wvr=6&topsug=1&is_hot=1',
        'http://weibo.com/u/3125046087?topnav=1&wvr=6&topsug=1&is_all=1',
        'http://weibo.com/hu_ge?topnav=1&wvr=6&topsug=1',
        'http://weibo.com/u/1669879400?refer_flag=1001030103_'],
      'fdPriceDown|200-30000.1-10': 1000,
      'fdPriceUp|30000-3000000.1-10': 266000,
      'fdSn': '17020611485173924',
      'fdUpdatePriceDate|1': ['2000-10-01 04:55', '2001-10-01 04:55', '2002-10-01 04:55'],
      'fdVipType|1': ['普通', '黄V', '蓝V', '金V', '达人'],
      'id|+1': 1,
      'isCollection': false,
      'remarks': '微博大V”衣锦夜行的燕公子“唯一官方公众账号'
    }
  ],
  'pageCount': 1,
  'pageSize': 15,
  'total': 9
})

// 购物车
Mock.mock('/goods/cart_item/list', {
  'data|2-10': [{
    'fdCode|1': ['yangongziyijinyexing', 'nanchang-nanchang', 'haowai0791', 'topdriverclub', 'Yueshi_China', 'xinchepingwang'],
    'fdFunsCount': 17437,
    'fdGoodsProducts': [
      {
        'fdGoodsSpecification': {
          'fdName': '防屏直发',
          'id': '测试内容di6d'
        },
        'fdGoodsSpecificationId': '测试内容66i1',
        'fdPrice': 84471,
        'id': '测试内容31i2'
      }
    ],
    'fdImageJson': {
      'name': '测试内容8f6g',
      'thumbnailUrl': Random.image('100x100', '#4A7BF7'),
      'url': '测试内容tb0y'
    },
    'fdIsCommentable': false,
    'fdIsOfficial|1': [false, true],
    'fdIsOriginal': false,
    'fdName': '测试内容q929',
    'fdVipType': '测试内容dc44',
    'id|+1': 1,
    'fdGoodsGroupId|1': ['153ee98b2a8f8b86d0c51ee4a68a492d', '153ee9861064430132ad9554b2a9c6eb'],
    'remarks': '测试内容835o'
  }]
})

Mock.mock(/\/goods\/cart_item/, {
  'code': 1
})

// 搜索列表
Mock.mock(/\/goods\/searchlist/, {
  'data': [
    '我真的还想再活五百年',
    '壮士，让我们干了这杯',
    'NARUTO',
    '叫爸爸',
    '帅的人在敲代码，丑的人还在睡',
    '今当远离，临表涕零，不知所言',
    ' 我们总是在注意错过太多，却不注意自己拥有多少',
    '我就是这么浪荡放棒，帅得一笔'
  ]
})

// 订单列表
Mock.mock(/\/order_item\/list/, {
  'data|20': [
    {
      'id|1': ['12d5g4ghh8h5g2dd3', '12d5g4ghh8h5g2dd4', '12d5g4ghh8h5g2dd5', '12d5g4ghh8h5g2dd6'],
      'fdBottom|300-30000.2': 83123,
      'fdChargeOffDate|1': ['2017-01-28 23:34', '2017-01-28 06:34', '2017-01-27 23:34'],
      'fdChargeOffId|1': ['123456512895', '123456512896', ''],
      'fdDocTitle|1': ['十年一品温如言', '深山有鬼', '浪荡放榜'],
      'fdInvoiceDate|1': ['2017-01-28 23:34', '2017-01-28 06:34', '2017-01-27 23:34'],
      'fdInvoiceId|1': ['123456512895', '123456512896', ''],
      'fdNo': Random.id(),
      'fdPrice|300-30000.2': 87531,
      'fdProcessDate|1': ['2017-01-28 23:34', '2017-01-28 06:34', '2017-01-27 23:34'],
      'fdProcessUri': Random.url(),
      'fdStatus|1': [1, 2, 3, 9, 10],
      'fdStatusValue|1': ['待响应', '待执行', '待确认', '已结束', '已取消'],
      'goodsInfo': {
        'fdGoodsCode': 1,
        'fdGoodsId|1': ['565213895021142', '565213895821143', '565213895821144'],
        'fdGoodsName|1': ['chaorenhuifei', '小和尚下山去化斋', '墨渊好帅啊啊啊啊啊'],
        'fdImageJson': {
          'name|1': ['走你', '全微信最丑', '全微信最美', '燥起来来啊来啊来啊了'],
          'url': Random.image('100x100', '#4A7BF7', 'url'),
          'thumbnailUrl': Random.image('64x64', '#05ec7c', 'thumbnailUrl')
        },
        'fdIsCommentable|1': [1, 0],
        'fdIsOfficial|1': [1, 0],
        'fdIsOriginal|1': [1, 0],
        'fdVipType|1': ['金V', '黄V', '蓝V', '达人'],
        'remarks|1': ['超人会飞超人会飞超人会飞超人会飞', '燥起来来啊来啊来啊了', '很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害']
      }
    }
  ],
  'pageCount': 1,
  'pageSize': 1,
  'total': 20
})

// 订单统计
Mock.mock(/\/order_item\/statistic/, {
  'data': {
    fdDebtTotal: 95425632,
    fdPaidTotal: 54682456,
    fdPriceTotal: 12548652354
  }
})

// 订单详情
Mock.mock(/\/order_item/, {
  'data': {
    'clientInfo': {
      'fdMobile': 152795246521,
      'fdNickName': '东京食尸鬼'
    },
    'fdGoodsGroupId|1': ['2', '2'],
    'fdGoodsSpecificationName|1': ['头条', '二条'],
    'fdProcessDate': '2017-02-02 20:30',
    'createdDate': '2017-02-02 20:30',
    'fdBottom': 152365423,
    'fdChargeOffDate|1': ['2017-02-02 20:30', ''],
    'fdChargeOffId|1': ['1526532625d5dff', ''],
    'fdDocTitle': '金木研',
    'fdInvoiceDate': '2017-02-02 20:30',
    'fdInvoiceId|1': ['1526532625d5dff', ''],
    'fdPrice': 63104,
    'fdProcessUri': 'http://www.baidu.com',
    'fdStatusValue|1': ['执行中', '已完成', '待响应'],
    'fdFunsCount|1-1000000000': 180000,
    'goodsInfo': {
      'fdGoodsCode': 'lvtianhaha',
      'fdGoodsId': 'sd52df5fg233d5s',
      'fdGoodsName': '测试内容rvb6',
      'fdImage': {
        'name': '飞天红猪侠',
        'thumbnailUrl': Random.image('100x100', '#4A7BF7', 'url'),
        'url': Random.image('64x64', '#05ec7c', 'thumbnailUrl')
      },
      'fdIsCommentable|1': [true, false],
      'fdIsOfficial|1': [true, false],
      'fdIsOriginal|1': [true, false],
      'fdVipType|1': ['金V', '达人', '蓝V', '黄V'],
      'remarks': '哈哈哈哈哈哈哈哈哈哈，嘻嘻嘻嘻嘻嘻嘻嘻，嘿嘿嘿嘿嘿嘿嘿，嚯嚯嚯嚯，呵呵呵呵呵呵呵呵'
    }
  }
})

// 客服信息
Mock.mock(/\/account\/client/, {
  'fdImageJson': {
    'name': '成院林',
    'url': Random.image('130x130', '#05ec7c', 'thumbnailUrl')
  },
  'fdMobile': 17678729810,
  'fdNickName': '张三',
  'fdQq': 257272828,
  'fdWechat': 'lvtianhaha'
})

// 商品规格
Mock.mock(/\/goods_spec/, {
  'fdName': '大大大',
  'fdOrder': 1,
  'id': '1235ghhhh'
})

// 商品收藏
Mock.mock(/\/goods\/collection\/list/, {
  'data|9': [{
    'fdGoodsProducts': [
      {
        'fdGoodsSpecification': {
          'fdName': '仿屏直发',
          'fdOrder': 10,
          'id': '测试内容vg8k'
        },
        'fdGoodsSpecificationId': '测试内容p1ao',
        'fdPrice|300-30000.2': 83123,
        'id': '15a1189dc9c86ad8e44ef9e4f2b906de'
      },
      {
        'fdGoodsSpecification': {
          'fdName': '仿屏转发',
          'fdOrder': 20,
          'id': '测试内容vg8k'
        },
        'fdGoodsSpecificationId': '测试内容p1ao',
        'fdPrice|300-30000.2': 83123,
        'id': '15a1189dc9c86ad8e44ef9e4f2b906de'
      },
      {
        'fdGoodsSpecification': {
          'fdName': '直发',
          'fdOrder': 30,
          'id': '测试内容vg8k'
        },
        'fdGoodsSpecificationId': '测试内容p1ao',
        'fdPrice|300-30000.2': 83123,
        'id': '15a1189dc9c86ad8e44ef9e4f2b906de'
      },
      {
        'fdGoodsSpecification': {
          'fdName': '转发',
          'fdOrder': 40,
          'id': '测试内容vg8k'
        },
        'fdGoodsSpecificationId': '测试内容p1ao',
        'fdPrice|300-30000.2': 83123,
        'id': '15a1189dc9c86ad8e44ef9e4f2b906de'
      }
    ],
    'fdImage': {
      'name': '测试内容eq38',
      'thumbnailUrl': Random.image('100x100', '#4A7BF7', 'url'),
      'url': Random.image('64x64', '#05ec7c', 'thumbnailUrl')
    },
    'fdAttr1': '情感,KOL',
    'fdAttr2': '全国',
    'fdCode': 'yangongziyijinyexing',
    'fdFunsCount|1-2000000': 10,
    'fdGoodsGroupId|1': ['1', '2'],
    'fdIsCommentable|1': [true, false],
    'fdIsMonth': false,
    'fdIsOfficial|1': [true, false],
    'fdIsOriginal|1': [true, false],
    'fdIsProvideInvoice': true,
    'fdLastPushDate': '2017-01-28 23:34',
    'fdLastReadNum': 0,
    'fdName': '衣锦夜行的燕公子',
    'fdNextUpdatePriceDate|1': ['2017-02-06 11:48', '2017-02-07 11:48'],
    'fdNo': '17020611485173924',
    'fdPriceDown|300-30000.2': 83123,
    'fdPriceUp|300-30000.2': 83123,
    'fdPushArticleCount': 1,
    'fdPushCount|1-10': 1,
    'fdReadCount|1-200000': 10,
    'fdUpdatePriceDate|1': ['2017-02-06 11:48', '2017-02-07 11:48'],
    'fdVipType|1': ['普通', '金V', '蓝V', '黄V', '达人'],
    'fdWeight|1-100': 80,
    'id': '15a1189db9bd5c18fff251c4a0b99e13',
    'remarks': '微博大V”衣锦夜行的燕公子“唯一官方公众账号',
    'fdLink': 'http://weibo.com/liuyifeiofficial?refer_flag=1001030101_&is_hot=1'
  }]
})

// 发票历史列表
Mock.mock(/\/invoice\/list/, {
  'data': [{
    'id': 12313,
    'fdNo': '213123123123',
    'fdAuditTime': '2017-01-28 23:34',
    'fdStatus': 3
  }]
})

// 发票详情
Mock.mock(/\/invoice\/.+/, {
  'carriage': {
    'fdLogistics': '圆通物流',
    'fdLogisticsNo': '1312312dasaaf132423'
  },
  'invoice': {
    'fdAuditTime': '2017-01-28 23:34',
    'fdNo': 'sadasdad',
    'fdPrice': 12312,
    'fdStatus': 4,
    'fdStatusValue': '审核',
    'id': '1231231'
  },
  'orderList|5': [
    {
      'id|1': ['12d5g4ghh8h5g2dd3', '12d5g4ghh8h5g2dd4', '12d5g4ghh8h5g2dd5', '12d5g4ghh8h5g2dd6'],
      'fdBottom|300-30000.2': 83123,
      'fdChargeOffDate|1': ['2017-01-28 23:34', '2017-01-28 06:34', '2017-01-27 23:34'],
      'fdChargeOffId|1': ['123456512895', '123456512896', ''],
      'fdDocTitle|1': ['十年一品温如言', '深山有鬼', '浪荡放榜'],
      'fdInvoiceDate|1': ['2017-01-28 23:34', '2017-01-28 06:34', '2017-01-27 23:34'],
      'fdInvoiceId|1': ['123456512895', '123456512896', ''],
      'fdNo': Random.id(),
      'fdPrice|300-30000.2': 87531,
      'fdProcessDate|1': ['2017-01-28 23:34', '2017-01-28 06:34', '2017-01-27 23:34'],
      'fdProcessUri': Random.url(),
      'fdStatus|1': [1, 2, 3, 9, 10],
      'fdStatusValue|1': ['待响应', '待执行', '待确认', '已结束', '已取消'],
      'goodsInfo': {
        'fdGoodsCode': 1,
        'fdGoodsId|1': ['565213895021142', '565213895821143', '565213895821144'],
        'fdGoodsName|1': ['chaorenhuifei', '小和尚下山去化斋', '墨渊好帅啊啊啊啊啊'],
        'fdImageJson': {
          'name|1': ['走你', '全微信最丑', '全微信最美', '燥起来来啊来啊来啊了'],
          'url': Random.image('100x100', '#4A7BF7', 'url'),
          'thumbnailUrl': Random.image('64x64', '#05ec7c', 'thumbnailUrl')
        },
        'fdIsCommentable|1': [1, 0],
        'fdIsOfficial|1': [1, 0],
        'fdIsOriginal|1': [1, 0],
        'fdVipType|1': ['金V', '黄V', '蓝V', '达人'],
        'remarks|1': ['超人会飞超人会飞超人会飞超人会飞', '燥起来来啊来啊来啊了', '很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害很厉害'],
        'fdStatus': ''
      }
    }
  ]
})

// 账单列表
Mock.mock(/\/tns\/list/, {
  'data|20': [
    {
      'createdDate|1': ['2017-03-12 12:00:12', '2017-03-17 15:21:22'], // 账单生成日期
      'fdNo|1': ['1', '2', '3'], // 流水号
      'fdTnsBottom|1': [100, -12333, 4000], // 金额
      'fdTnsTypeValue|1': ['全部', '销账', '充值', '其他'], // 账单类型
      'id|1': ['122415cf52dd5d', '5d4h5h42gh6sa6a1f5e0', '15df4d4fa64g8gdfg'] // 流水id
    }
  ],
  'pageCount': 57516,
  'pageSize': 76448,
  'total': 22632
})

// 账单详情
Mock.mock(/\/tns/, {
  'fdTnsTypeValue|1': ['全部', '销账', '充值', '其他'], // 账单类型
  'fdTnsBottom|1': [100, -12333, 4000], // 金额
  'fdNo|1': ['1', '2', '3'], // 流水号
  'bankAccount': '6251d5555556115415',
  'bankAccountName|1': ['中国银行', '中国工商银行', '中国建设银行'],
  'createdDate|1': ['2017-03-12 12:00:12', '2017-03-17 15:21:22'], // 账单生成日期
  'billStatus|1': ['交易成功', '交易失败'],
  'orderList|20': [
    {
      'fdNo|1': ['1', '2', '3'], // 订单序号
      'id|1': ['12d8djfg45sf5sdf6', '5dfdfs4f64fs9sag4', '5d5f13f1sf4ddsfs6f46'], // 订单编号
      'goodsInfo': {
        'fdGoodsId': '125dfd51s1dfd',
        'fdGoodsGroupId': '153ee9861064430132ad9554b2a9c6eb', // 文档里没有 新加的
        'fdLink': 'http://weibo.com/u/3261134763?topnav=1&wvr=6&topsug=1', // 文档里没有 新加的
        /* weibo: 153ee9861064430132ad9554b2a9c6eb
           wechat: 153ee98b2a8f8b86d0c51ee4a68a492d */
        'fdGoodsCode|1': ['sanshierli-edu', 'duzheweixin'], // 微信号
        'fdGoodsName|1': ['飞起来，好吗？', '他是龙', '这是一个很长很长很长很长的名字'], // 商品名称
        'fdImage': {
          'name|1': ['走你', '全微信最丑', '全微信最美', '燥起来来啊来啊来啊了'],
          'url': Random.image('100x100', '#4A7BF7', 'url'),
          'thumbnailUrl': Random.image('64x64', '#05ec7c', 'thumbnailUrl')
        },
        'fdVipType|1': ['金V', '黄V', '蓝V', '达人'],
        'fdIsCommentable|1': [true, false], // 是否评论
        'fdIsOriginal|1': [true, false], // 是否原创
        'fdVipType|1': ['金V', '黄V', '蓝V', '达人'], // 微博认证类型，微信光放认证['认证', '未认证']
        'remarks': '非常好！帅得一笔，漂亮，让我们燥起来' // 微博简介
      }
    }
  ]
})