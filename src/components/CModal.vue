<template>
  <div class="modal" :class="{'show': show}">
    <c-top-bar></c-top-bar>
    <div class="header">
      <span class="title">{{opts.title}}</span>
      <el-button
        @click="close()"
        type="primary"
        plain
        class="cancel-btn">
        取消
      </el-button>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
  const isNode = require('detect-node')
  import CTopBar from 'components/CTopBar'
  export default {
    computed: {
      show () {
        if (!isNode) {
          document.body.style.overflow = this.value ? 'hidden' : ''
          return this.value
        }
      }
    },
    props: {
      value: {
        type: Boolean
      },
      opts: {
        type: Object
      }
    },
    methods: {
      close () {
        this.$emit('input', false)
      }
    },
    beforeDestroy () {
      document.body.style.overflow = ''
    },
    components: {
      CTopBar
    }
  }
</script>
<style lang="less" scoped>
@import '../assets/styles/variables.less';
.modal {
  position: fixed;
  top: 0px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  overflow: auto;
  background-color: @color-white;
  display: none;
  z-index: 999;
  &.show {
    display: block;
  }
}
.header {
  width: @width-page;
  margin: auto;
  padding: 20px 0;
  .title {
    font-size: 24px;
    color: @color-primary;
  }
  .cancel-btn {
    float: right;
    width: 94px;
    height: 37px;
    color: @color-primary;
    border: 1px solid @color-primary;
  }
}
</style>
