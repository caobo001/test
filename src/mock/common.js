var Mock = require('mockjs')

Mock.setup({
  timeout: '1000-3000'
})

// 行业类型
Mock.mock(/\/common\/trades/, 'get', [
  {
    text: '综合类'
  }, {
    text: '新闻资讯'
  }, {
    text: 'IT互联网'
  }, {
    text: '母婴育儿'
  }, {
    text: '时尚娱乐'
  }, {
    text: '教育培训'
  }, {
    text: '影视音乐'
  }, {
    text: '美容护肤'
  }, {
    text: '星座命理'
  }, {
    text: '运动健身'
  }, {
    text: '成功励志'
  }, {
    text: '文学艺术'
  }, {
    text: '健康养生'
  }, {
    text: '网络红人'
  }, {
    text: '幽默搞笑'
  }, {
    text: '历史文化'
  }, {
    text: '财经'
  }, {
    text: '旅游'
  }, {
    text: '家居'
  }, {
    text: '科技'
  }, {
    text: '游戏'
  }, {
    text: '美食'
  }, {
    text: '汽车'
  }, {
    text: '宠物'
  }, {
    text: '生活'
  }, {
    text: '数码'
  }, {
    text: '摄影'
  }, {
    text: '情感'
  }, {
    text: '房地产'
  }, {
    text: '动漫'
  }, {
    text: '体育'
  }, {
    text: '公益'
  }, {
    text: '购物'
  }, {
    text: '职场'
  }, {
    text: '营销'
  }, {
    text: '明星'
  }, {
    text: '其他'
  }
])

// 省份列表
Mock.mock(/\/common\/area/, 'get', [
  {
    'id': '1',
    'name': '湖南省'
  }, {
    'id': '2',
    'name': '湖北省'
  }, {
    'id': '3',
    'name': '北京市'
  }, {
    'id': '4',
    'name': '天津市'
  }, {
    'id': '5',
    'name': '河北省'
  }, {
    'id': '6',
    'name': '山西省'
  }, {
    'id': '7',
    'name': '内蒙古自治区'
  }, {
    'id': '8',
    'name': '湖北省'
  }]
)
