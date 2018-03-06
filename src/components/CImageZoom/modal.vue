<template>
  <div>
    <transition name="c-image-zoom-fade">
      <div class="modal" v-show="visible">
        <img :src="src">
      </div>
    </transition>
    <div class="backdrop" v-show="visible" @click="close"></div>
  </div>
</template>

<script>
export default {
  name: 'CImageZoom',
  data () {
    return {
      visible: false,
      src: ''
    }
  },
  methods: {
    close () {
      this.visible = false
      this.$el.addEventListener('transitionend', this.destroyElement)
    },
    destroyElement () {
      this.$el.removeEventListener('transitionend', this.destroyElement)
      this.$destroy()
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}

</script>

<style lang="less" scoped>
.modal {
  position: fixed;
  top: 15%;
  left: 50%;
  box-shadow: 0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);
  min-width: 200px;
  padding: 10px 12px;
  text-align: center;
  border-radius: 2px;
  transform: translateX(-50%);
  transition: opacity .3s,transform .4s;
  background: #fff;
  z-index: 9999;
  img {
    max-height: 600px;
    max-height: 70vh;
  }
}
.backdrop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: .5;
  background: #000;
  z-index: 9998;
}
</style>
<style>
.c-image-zoom-fade-enter, .c-image-zoom-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -120%) !important;
}
</style>
