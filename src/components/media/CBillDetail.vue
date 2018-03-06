<template>
  <div class="bill-detail container">
    <div class="info-list">
      <div class="line clearfix">
        <div class="left pull-left">
          <span class="title">类型</span>
          <div class="content">销账</div>
        </div>
        <div class="right pull-left">
          <span class="title">金额</span>
          <div class="content green">￥156,000.00</div>
        </div>
      </div>
      <div class="line clearfix">
        <div class="left pull-left">
          <span class="title">流水号</span>
          <div class="content">20170256358</div>
        </div>
        <div class="right pull-left">
          <span class="title">打款账户</span>
          <div class="content">中国工商银行|622212***3625</div>
        </div>
      </div>
      <div class="line clearfix">
        <div class="left pull-left">
          <span class="title">日期</span>
          <div class="content">2016-04-24 14:53:33</div>
        </div>
        <div class="right pull-left">
          <span class="title">状态</span>
          <div class="content">交易成功</div>
        </div>
      </div>
    </div>

    <h3 class="detail-title">销账订单</h3>
    <table class="bill-order-table goods-list">
      <thead>
        <tr>
          <th>序号</th>
          <th>订单编号</th>
          <th>商品名称</th>
          <th>发布文案信息</th>
          <th>金额</th>
          <th>订单状态</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in bill.orderList">
          <td>1</td>
          <td>1234567895263</td>
          <td class="brief">
            <div class="wechat" v-if="item.goodsInfo.fdGoodsGroupId === wechat">
              <div class="media-left">
                <img  class="media-object" :src="item.goodsInfo.fdImage.thumbnailUrl? item.goodsInfo.fdImage.thumbnailUrl: '/webapp/static/portrait-default.jpg'">
              </div>
              <div class="media-body">
                <h4 class="media-heading">
                  <a
                    class="inline-block ellipsis name vertical-middle max-width8em"
                    :href="`http://weixin.sogou.com/weixin?type=1&query=${item.goodsInfo.fdGoodsCode}&ie=utf8&_sug_=n&_sug_type_=`"
                    target="_blank">
                    {{item.goodsInfo.fdGoodsName}}
                  </a>
                  <img
                    src="../../assets/img/icon-wechat-identified.png"
                    class="vertical-middle"
                    v-if="item.fdVipType === '认证'"
                    title="微信认证"
                    alt="微信认证"/>
                </h4>
                <div class="wechat-id">
                  <span class="ellipsis inline-block color-font-light2" :title="item.goodsInfo.fdGoodsCode">{{item.goodsInfo.fdGoodsCode}}</span>
                  <img src="../../assets/img/icon-detail.png" class="vertical-top" title="商品详情" alt="商品详情"/>
                </div>
                <div class="qrcode-wrapper vertical-middle">
                  <i class="icon iconfont icon-rqcode" title="微信二维码" alt="微信二维码"></i>
                  <img class="img-qrcode" :src="`http://open.weixin.qq.com/qr/code/?username=${item.fdCode}`" />
                </div>
                <img
                  src="../../assets/img/icon-commentable.png"
                  v-if="item.goodsInfo.fdIsCommentable"
                  title="带评论" alt="带评论"
                  class="vertical-middle" />
                <img
                  src="../../assets/img/icon-original.png"
                  v-if="item.goodsInfo.fdIsOriginal"
                  title="原创" alt="原创"
                  class="vertical-middle" />
              </div>
            </div>
            <!--<div class="weibo" v-if="item.goodsInfo.fdGoodsGroupId === weibo">
              <div class="media-left">
                <img  class="media-object" :src="item.goodsInfo.fdImage.thumbnailUrl? item.goodsInfo.fdImage.thumbnailUrl: '/webapp/static/portrait-default.jpg'">
              </div>
              <div class="media-body">
                <h4 class="media-heading">
                  <a
                    class="inline-block ellipsis name vertical-middle"
                    :href="item.goodsInfo.fdLink"
                    target="_blank">
                    {{item.goodsInfo.fdGoodsName}}
                  </a>
                  <img
                  class="vipType vertical-middle"
                  :src="getSrc(item.goodsInfo.fdVipType)"
                  :title="item.goodsInfo.fdVipType"
                  :alt="item.goodsInfo.fdVipType"
                  v-if="item.goodsInfo.fdVipType !== '普通'"/>
                </h4>
                <div class="wechat-id">
                  <span class="ellipsis inline-block color-font-light2" :title="item.goodsInfo.remarks">{{item.goodsInfo.remarks}}</span>
                  <img src="../../assets/img/icon-detail.png" class="vertical-top" title="商品详情" alt="商品详情"/>
                </div>
              </div>
            </div>-->
        </td>
        <td>
          2017-02-30 19:22
          <div class="ellipsis">最火现场观看哈哈哈哈</div>
        </td>
        <td>
          <span class="color-font-light2">头条</span>
          <span>1950.00<i class="icon iconfont icon-invoice"></i></span>
        </td>
        <td>已完成</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data () {
    return {
      wechat: this.$store.state.goodsGroups.wechat, // groupId 商品类型
      weibo: this.$store.state.goodsGroups.weibo // groupId  商品类型
    }
  },
  props: {
    bill: {
      type: Object
    }
  },
  methods: {
    getSrc (type) {
      var src = ''
      switch (type) {
        case '金V':
          src = '/webapp/static/vip-golden.png'
          break
        case '黄V':
          src = '/webapp/static/vip-yellow.png'
          break
        case '蓝V':
          src = '/webapp/static/vip-blue.png'
          break
        case '达人':
          src = '/webapp/static/vip-star.png'
          break
      }
      return src
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
.info-list {
  margin-top: 30px;
  border: 1px solid @color-border;
  border-bottom: none;
  .line {
    margin-top: -1px;
    padding: 25px 0 20px 0;
    border-bottom: 1px solid @color-border;
    font-size: 14px;
    .left, .right {
      display: inline-block;
      width: 50%;
      .title {
        display: inline-block;
        float: left;
        width: 130px;
        color: @color-font-light2;
      }
      .content {
        float: left;
      }
    }
    .left {
      .title {
        padding-left: 40px;
      }
    }
    .right {
      .title {
        padding-left: 30px;
      }
    }
  }
}
.green {
  color: #35b974;
}
.detail-title {
  position: relative;
  padding-left: 20px;
  margin-top: 25px;
  font-size: 16px;
  font-weight: bold;
  &:before {
    position: absolute;
    width: 3px;
    height: 18px;
    background-color: #e24a5c;
    content: "";
    left: 5px;
    top: 0px;
    bottom: 0px;
    margin: auto;
  }
}
.bill-order-table {
  margin-top: 5px;
  thead {
    background: none;
    border: 1px solid lighten(@color-border, 5%);
    tr {
      th {
        text-align: center;
        padding: 10px 0 8px 0;
        font-size: 14px;
      }
    }
  }
  tbody {
    tr {
      border: 1px solid lighten(@color-border, 5%);
    }
    td {
      border: none;
      &.publish-info {
        .cn {
          max-width: 8em;
          margin: 6px auto;
        }
      }
    }
  }
}
.icon-invoice {
  color: @color-primary;
  margin-left: 4px;
}
.weibo {
  .name {
    padding: 8px 0 5px 0;
  }
}
</style>
