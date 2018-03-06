module.exports = {
  optWriterType: [{
    text: "不限",
    value: "",
    isActive: true
  }, {
    text: "微信",
    value: "2",
    isActive: false
  }, {
    text: "微博",
    value: "1",
    isActive: false
  }, {
    text: "其他",
    value: "3",
    isActive: false
  }],

  optPriceRange: [{
    text: "不限",
    gtPrice: "",
    ltPrice: "",
    isActive: true
  }, {
    text: "1000 以下",
    gtPrice: 0,
    ltPrice: 1000,
    isActive: false
  }, {
    text: "1000 - 3000",
    gtPrice: 1000,
    ltPrice: 3000,
    isActive: false
  }, {
    text: "3000 - 10000",
    gtPrice: 3000,
    ltPrice: 10000,
    isActive: false
  }, {
    text: "10000 - 50000",
    gtPrice: 10000,
    ltPrice: 50000,
    isActive: false
  }, {
    text: "5 万以上",
    gtPrice: 50000,
    ltPrice: "",
    isActive: false
  }],

  optArea: [{
    text: "不限",
    name: "",
    isActive: true
  }, {
    text: "上海",
    name: "上海市",
    isActive: false
  }, {
    text: "北京",
    name: "北京市",
    isActive: false
  }, {
    text: "广州",
    name: "广州市",
    isActive: false
  }, {
    text: "深圳",
    name: "深圳市",
    isActive: false
  }, {
    text: "杭州",
    name: "杭州市",
    isActive: false
  }, {
    text: "天津",
    name: "天津市",
    isActive: false
  }, {
    text: "西安",
    name: "西安市",
    isActive: false
  }, {
    text: "长沙",
    name: "长沙市",
    isActive: false
  }, {
    text: "武汉",
    name: "武汉市",
    isActive: false
  }, {
    text: "海外",
    name: "海外",
    isActive: false
  }],
  optFanRange: [{
      text: "不限",
      gtFanCount: "",
      ltFanCount: "",
      isActive: true
    }, {
      text: "5万以下",
      gtFanCount: 0,
      ltFanCount: 5,
      isActive: false
    }, {
      text: "5-10万",
      gtFanCount: 5,
      ltFanCount: 10,
      isActive: false
    }, {
      text: "10-20万",
      gtFanCount: 10,
      ltFanCount: 20,
      isActive: false
    }, {
      text: "20-50万",
      gtFanCount: 20,
      ltFanCount: 50,
      isActive: false
    }, {
      text: "50-100万",
      gtFanCount: 50,
      ltFanCount: 100,
      isActive: false
    }, {
      text: "100万以上",
      gtFanCount: 100,
      ltFanCount: "",
      isActive: false
    }],
  optVipType: [
    {
      text: "不限",
      value: "",
      isActive: true
    }, {
      text: "黄V",
      value: "黄V",
      isActive: false
    }, {
      text: "蓝V",
      value: "蓝V",
      isActive: false
    }, {
      text: "金V",
      value: "金V",
      isActive: false
    }, {
      text: "达人",
      value: "达人",
      isActive: false
    }
  ]
}
