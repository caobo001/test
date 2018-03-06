<template>
  <div class="text-center no-data">
    <img src="../assets/img/no-data-logo.png" class="no-data-logo"/>
    <div>嗷，暂无相关信息哦！</div>
    <div><slot name="tips"><router-link to="wechat-list">请看看其他商品。</router-link></slot></div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
@import '../assets/styles/variables.less';
</style>
