<template>
  <div class="steps-block text-center">
    <ul
      class="step-list clearfix"
      :style="{'width': totalWidth + 'px'}"
    >
      <li
        v-for="(item, index) in text"
        :style="{
          'width': (index+1) == text.length ? nodeWidth+'px': itemWidth + 'px'
         }"
        class="text-left"
        :class="{'last': (index+1) == text.length}"
      >
        <div
          class="node inline-block"
          :class="{'cur': (index+1)== cur}"
        >
          <span
            class="text"
            :style="{
              'width': textWidth + 'px',
              'left': -textLeft + 'px',
              'text-align': 'center',
              'top': '26px'}"
          >{{ item }}</span>
          <span
            class="bar inline-block"
            :style="{
              'width': barWidth + 'px',
              'left': barLeft + 'px',
              'top': barTop + 'px'}"
          >
        </span>
        </div>
      </li>

    </ul>
  </div>
</template>
<script>
export default {
  name: 'CSteps',
  data () {
    return {
    }
  },
  props: {
    barWidth: {
      type: Number,
      default: 142
    },
    nodeWidth: {
      type: Number,
      default: 15
    },
    text: {
      type: Array,
      default: () => ['第一步', '第二步', '第三步']
    },
    cur: {
      type: Number,
      default: 1
    }
  },
  computed: {
    totalWidth () {
      var totalWidth = this.nodeWidth * this.text.length + this.barWidth * (this.text.length - 1)
      return totalWidth
    },
    itemWidth () {
      var itemWidth = this.barWidth + this.nodeWidth
      return itemWidth
    },
    barLeft () {
      var barLeft = this.nodeWidth - 1
      return barLeft
    },
    barTop () {
      var barTop = this.nodeWidth / 2 - 1
      return barTop
    },
    textWidth () {
      var textWidth = this.itemWidth
      return textWidth
    },
    textLeft () {
      var textLeft = this.textWidth / 2 - 5
      return textLeft
    }
  }
}

</script>
<style lang="less" scoped>
@import "../assets/styles/variables.less";
.step-list {
  display: block;
  margin: auto;
  padding: 50px 0px 70px 0px;
  li {
    float: left;
    .node {
      width: 15px;
      height: 15px;
      border: 1px solid #666666;
      border-radius: 50%;
      position: relative;
      .text {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        top: 0px;
        margin: auto;
        font-size: 12px;
      }
      .bar {
        position: absolute;
        height: 1px;
        background-color: #666666;
      }
    }
    .node.cur {
      border-color: @color-hover;
      .text {
        color: @color-hover;
      }
    }
  }
  li.last {
    .bar {
      display: none;
    }
  }
}
</style>
