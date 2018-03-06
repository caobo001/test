<template>
  <div class="breadcrumb" :style="{'background-color': backgroundColor}">
    <div class="container">
      <span class="triangle"></span>
      <!-- <i class="iconfont icon-xiangyou"></i> -->当前位置：
      <div class="inline-block item" v-for="(item, index) in routers">
        <router-link
          :to="{
            name: item.name,
            params: item.params
          }">
          {{item.text}}
        </router-link>
        <span v-if="(index+1) < routers.length " class="arrow">
          &gt;
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    routers: {
      type: Array,
      required: true
    },
    backgroundColor: {
      type: String,
      default: '#dddddd'
    }
  }
}
</script>
<style lang="less" scoped>
@import "../assets/styles/variables.less";
.breadcrumb {
  width: 100%;
  .container {
    padding: 7px 0px;
    .triangle {
      display:inline-block;
      width:0;
      height:0;
      border-top: 4px solid transparent;
      border-bottom: 4px solid transparent;
      border-left: 6px solid #999999;
      margin: auto 8px;
    }
    .arrow {
      margin: auto 3px;
    }
  }
}
</style>
