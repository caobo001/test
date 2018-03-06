<template>
  <a href="javascript:" @click="toggle" :style="{'color': color}">
    <slot>{{toggleText}}</slot>
     <i :class="['iconfont', classObject]"></i>
  </a>
</template>

<script>
export default {
  name: 'CToggle',
  props: {
    value: {
      type: Boolean
    },
    text: {
      type: Array,
      default: () => ['收起', '更多']
    },
    icon: {
      type: Array,
      default: () => ['icon-xiangshangjiantou', 'icon-xiangxiajiantou']
    },
    color: {
      type: String,
      default: '#333'
    }
  },
  data () {
    return {
      toggleValue: this.value
    }
  },
  methods: {
    toggle () {
      this.toggleValue = !this.toggleValue
      this.$emit('input', this.toggleValue)
    }
  },
  computed: {
    classObject () {
      return {
        [this.icon[0]]: this.toggleValue,
        [this.icon[1]]: !this.toggleValue
      }
    },
    toggleText () {
      return this.toggleValue ? this.text[0] : this.text[1]
    }
  }

}

</script>
<style>
</style>
