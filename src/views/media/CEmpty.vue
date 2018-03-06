<template>
  <div class="empty">
    <div class="container clearfix">
      <c-menu class="pull-left mt10"></c-menu>
      <div class="container-right pull-right mt10 text-center">
        该功能正在开发中······
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
.empty {
  background-color: @color-bg2;
  min-height: 900px;
}
.container-right {
  width: 1030px;
  float: right;
  background-color: @color-bg;
  padding: 288px 0;
  font-size: 18px;
}

</style>
<style lang="less">
.empty .left-menu li .router-link.router-link-active {
  color: #333 !important;
}
.empty .left-menu li .router-link.router-link-active .triangle {
  display: none !important;
}
</style>
