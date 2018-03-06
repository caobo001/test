<template>
  <div class="order cursor-default" @click="setState()">
    {{current.text}}
    <div class="order-by">
      <div
        class="arrow arrowup"
        :class="{'active': newCurrent.direction === 'asc' && cur}">
      </div>
      <div
        class="arrow arrowdown"
        :class="{'active': newCurrent.direction === 'desc' && cur}">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      newCurrent: this.current,
      clickCount: 0
    }
  },
  props: {
    current: {
      type: Object
    },
    cur: {
      type: Boolean
    }
  },
  watch: {
    newCurrent: {
      handler: 'sendCur',
      deep: true
    }
  },
  methods: {
    setState () {
      this.clickCount++
      if (this.clickCount % 3 === 1) {
        this.newCurrent.direction = 'asc'
      } else if (this.clickCount % 3 === 2) {
        this.newCurrent.direction = 'desc'
      } else if (this.clickCount % 3 === 0) {
        this.newCurrent.direction = 'default'
      }
    },
    sendCur (curVal, oldVal) {
      console.log('curVal: ', curVal)
      this.$emit('newcurrent', curVal)
    }
  }
}
</script>
<style lang="less" scoped>
.order-by {
  position: relative;
  display: inline-block;
  width: 10px;
  height: 12px;
  .arrow {
    position: absolute;
    width:0;
    height:0;
    left: 0px;
    border-left:5px solid transparent;
    border-right:5px solid transparent;
  }
  .arrowup {
    top: 0px;
    border-bottom:5px solid #999999;
  }
  .arrowup.active {
    border-bottom:5px solid #e01a0f;
  }
  .arrowdown {
    top: 7px;
    border-top:5px solid #999999;
  }
  .arrowdown.active {
    border-top: 5px solid #e01a0f;
  }
}
</style>
