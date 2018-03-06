<template>
  <img :src="src" class="image" @click="zoom">
</template>

<script>
import Vue from 'vue'
const ModalConstructor = Vue.extend(require('./modal.vue'))

export default {
  name: 'CImageZoom',
  props: {
    src: {
      type: String
    },
    originSrc: {
      type: String
    }
  },
  data () {
    return {
      modalInstance: {}
    }
  },
  methods: {
    zoom () {
      this.modalInstance = new ModalConstructor({
        data: {
          src: this.originSrc || this.src
        }
      })
      this.modalInstance.$mount()
      document.body.appendChild(this.modalInstance.$el)
      this.modalInstance.visible = true
    }
  }
}

</script>

<style lang="less" scoped>
.image {
  cursor: pointer;
}
</style>
