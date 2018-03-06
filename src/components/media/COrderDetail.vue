<template>
  <div class="order-detail">
    <div class="container clearfix">
      <div class="title">订单详情信息</div>
      <div class="left pull-left">
        <div class="line">
          <div class="label-name">订单编号</div>
          <div class="label-con">{{order.fdNo}}</div>
        </div>

        <div class="line">
          <div class="label-name">创建时间</div>
          <div class="label-con">{{order.createdDate}}</div>
        </div>

        <div class="line">
          <div class="label-name">订单状态</div>
          <div class="label-con">{{order.fdStatusValue}}</div>
        </div>

        <div class="line">
          <div class="label-name">商品信息</div>
          <div class="label-con">
            <div class="content-in clearfix brief" v-if="order.fdGoodsGroupId === wechat">
              <div class="media-img-out">
                <img class="media-img" :src="order.goodsInfo.fdImageJson.thumbnailUrl? order.goodsInfo.fdImageJson.thumbnailUrl: '/webapp/static/portrait-default.jpg'">
              </div>
              <div class="media-body">
                <h4 class="media-heading">
                  {{order.goodsInfo.fdGoodsName}}
                  <img
                    src="../../assets/img/icon-wechat-identified.png"
                    class="vertical-top"
                    v-if="order.goodsInfo.fdVipType === '认证'"
                    title="微信官方认证"
                    alt="微信官方认证"/>
                </h4>
                <div class="wechat-id">
                  <span class="ellipsis inline-block color-font-light2" :title="order.goodsInfo.fdGoodsCode">{{order.goodsInfo.fdGoodsCode}}</span>
                  <router-link
                    :to="{
                      name: 'media-billboard-detail',
                      params: {id: order.goodsInfo.fdGoodsId}
                    }">
                    <img src="../../assets/img/icon-detail.png" class="vertical-top" title="商品详情" alt="商品详情"/>
                  </router-link>
                </div>
                <div class="qrcode-wrapper">
                  <img src="../../assets/img/qrcode.png" title="微信二维码" alt="微信二维码">
                  <img class="img-qrcode" :src="`http://open.weixin.qq.com/qr/code?username=${order.goodsInfo.fdGoodsCode}`" />
                </div>
                <img src="../../assets/img/icon-commentable.png" v-if="order.goodsInfo.fdIsCommentable" title="带评论" alt="带评论">
                <img src="../../assets/img/icon-original.png" v-if="order.goodsInfo.fdIsOriginal" title="原创" alt="原创">
              </div>
            </div>

            <div class="content-in clearfix brief weibo" v-if="order.fdGoodsGroupId === weibo">
              <div class="media-img-out">
                <img class="media-img" :src="order.goodsInfo.fdImageJson.thumbnailUrl? order.goodsInfo.fdImageJson.thumbnailUrl: '/webapp/static/portrait-default.jpg'">
              </div>
              <div class="media-body">
                <h4 class="media-heading cursor-default">
                  <span class="vertical-middle">{{order.goodsInfo.fdGoodsName}}</span>
                  <img
                    class="vipType vertical-middle"
                    :src="getSrc(order.goodsInfo.fdVipType)"
                    :title="order.goodsInfo.fdVipType"
                    :alt="order.goodsInfo.fdVipType"
                    v-if="order.goodsInfo.fdVipType !== '普通'"/>
                </h4>
                <span class="desc color-font-light2 ellipsis inline-block" :title="order.goodsInfo.remarks">{{order.goodsInfo.remarks}}</span>
                <router-link
                  :to="{
                    name: 'media-billboard-weibo-detail',
                    params: {id: order.goodsInfo.fdGoodsId}
                  }">
                  <img
                    src="../../assets/img/icon-detail.png"
                    class="vertical-top"
                    title="商品详情"
                    alt="商品详情"/>
                </router-link>
              </div>
            </div>

            <div class="content-in clearfix brief weibo" v-if="order.fdGoodsGroupId === headline">
              <div class="media-img-out">
                <img class="media-img" :src="order.goodsInfo.fdImageJson.thumbnailUrl? order.goodsInfo.fdImageJson.thumbnailUrl: '/webapp/static/portrait-default.jpg'">
              </div>
              <div class="media-body">
                <h4 class="media-heading cursor-default">
                  <span class="vertical-middle">{{order.goodsInfo.fdGoodsName}}</span>
                  <img
                    src="../../assets/img/icon-headline-identified.png"
                    class="vertical-top"
                    v-if="order.goodsInfo.fdVipType === '认证'"
                    title="今日头条官方认证"
                    alt="今日头条官方认证"/>
                </h4>
                <span class="desc color-font-light2 ellipsis inline-block" :title="order.goodsInfo.remarks">{{order.goodsInfo.remarks}}</span>
                <router-link
                  :to="{
                    name: 'media-billboard-headline-detail',
                    params: {id: order.goodsInfo.fdGoodsId}
                  }">
                  <img
                    src="../../assets/img/icon-detail.png"
                    class="vertical-top"
                    title="商品详情"
                    alt="商品详情"/>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <div class="line">
          <div class="label-name">粉丝数</div>
          <div class="label-con">{{order.goodsInfo.fdFunsCount | numToMyriad}}</div>
        </div>

        <div class="line">
          <div class="label-name">金额</div>
          <div class="label-con">{{order.fdGoodsSpecificationName}}￥{{order.fdPrice}}</div>
        </div>

        <div class="line">
          <div class="label-name">发布时间</div>
          <div class="label-con">{{order.fdProcessDate}}</div>
        </div>

        <div class="line">
          <div class="label-name">文案标题</div>
          <div class="label-con">{{order.fdDocTitle? order.fdDocTitle:'暂无标题'}}</div>
        </div>

        <div class="line">
          <div class="label-name">链接凭证</div>
          <div class="label-con">{{order.fdProcessUri? order.fdProcessUri:'暂无标题'}}</div>
        </div>
      </div>
      <div class="right pull-right">
        <div class="line">
          <div class="label-name">客服人员</div>
          <div class="label-con">{{clientInfo.fdNickName}}</div>
        </div>

        <div class="line">
          <div class="label-name">联系电话</div>
          <div class="label-con">{{clientInfo.fdMobile}}</div>
        </div>

        <div class="line">
          <div class="label-name">是否开发票</div>
          <div class="label-con">
            <div v-if="order.fdInvoiceId">已开<i class="icon iconfont icon-invoice vertical-middle ml5"></i></div>
            <div v-if="!order.fdInvoiceId">未开</div>
          </div>
        </div>

        <div class="line">
          <div class="label-name">是否销账</div>
          <div class="label-con">
            <div v-if="order.fdChargeOffId">已销账<span class="charge-off vertical-middle ml5">已销</span></div>
            <div v-if="!order.fdChargeOffId">未销账</div>
          </div>
        </div>

        <div class="line">
          <div class="label-name">销账时间</div>
          <div class="label-con">
            <div v-if="order.fdChargeOffDate">{{order.fdChargeOffDate}}</div>
            <div v-if="!order.fdChargeOffDate">—</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
/* eslint-disable no-unused-vars */
import filters from '../../filters.js'
export default {
  created () {
    if (_.isEmpty(this.clientInfo)) {
      this.fetchClientInfo()
    }
  },
  data () {
    return {
      wechat: this.$store.state.goodsGroups.wechat, // groupId 商品类型
      weibo: this.$store.state.goodsGroups.weibo, // groupId  商品类型
      headline: this.$store.state.goodsGroups.headline
    }
  },
  computed: {
    ...mapState({
      clientInfo (state) {
        return state.media.clientInfo
      }
    }),
    show () {
      return this.detailShow
    }
  },
  props: {
    detailShow: {
      type: Boolean
    },
    order: {
      type: Object
    }
  },
  methods: {
    ...mapActions(['fetchClientInfo']),
    closeDetail () {
      this.$emit('close-detail', false)
    },
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
.title {
  padding: 5px 35px;
  background-color: #f2f9fe;
  font-size: 16px;
}
.left,
.right {
  margin-top: 15px;
  width: 50%;
  font-size: 14px;
}
.line {
  padding: 12px 0;
  .label-name,
  .label-con {
    display: inline-block;
    width: 385px;
    word-break:break-all;
  }
  .label-name {
    width: 150px;
    padding-left: 35px;
    vertical-align: top;
  }
}
.left {
  padding-right: 60px;
  border-right: 1px solid @color-border;
}
.right {
  padding-left: 60px;
}

.brief {
  width: 100%;
  .media-img-out {
    display: inline-block;
    position: relative;
    float: left;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    .media-img {
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      margin: auto;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      border: 1px solid @color-font-light2;
    }
  }
  .media-body {
    overflow: visible;
    text-align: left;
    width: 200px;
    display: inline-block;
    margin-left: 10px;
    .media-heading {
      margin-bottom: 0;
    }
    .iconfont {
      font-size: 21px;
    }
  }
  .wechat-id {
    .ellipsis {
      max-width: 8em;
    }
  }
}
.qrcode-wrapper {
  position: relative;
  display: inline-block;
  .img-qrcode {
    position: absolute;
    left: 30px;
    top: 0px;
    width: 180px;
    height: 180px;
    border: 1px solid @color-thead;
    display: none;
  }
  &:hover {
    .img-qrcode {
      display: block;
    }
  }
}
.desc {
  max-width: 8em;
}
.weibo {
  .media-heading {
    padding: 5px 0 8px 0;
  }
}
.icon-invoice {
  margin-left: 5px;
  vertical-align: middle;
  color: @color-primary;
  font-size: 20px;
}
</style>
