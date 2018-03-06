<template>
<ul class="attachment">
  <li v-for="(item, index) in localAttList" :key="index" class="inline-block mr15">
    <!-- <i class="iconfont icon-delete" @click="removeAtt(index)"></i>
    <img :src="item.thumbnailUrl"> -->

    
    <template v-if="model === 'image'">
      <i class="iconfont icon-delete del-img" @click="removeAtt(index)"></i>
      <c-image-zoom
      :src="item.thumbnailUrl"
      :originSrc="item.url">
      </c-image-zoom>
    </template>
    <template v-else>
      <img :src="item.thumbnailUrl" class="thumbnail" />
      <span :class="{'cao-text-ellipsis':textMaxWidth}" >{{item.name}}</span>
      <i class="iconfont icon-delete del-file" 
      @click="removeAtt(index)" v-show="showDelBtn"></i>
      <a :href="item.url" target="_blank">下载</a>
    </template>
  </li>
</ul>
</template>

<script>
import CImageZoom from 'components/CImageZoom/index.vue'
export default {
  name: 'CUploadPreview',
  props: {
    value: {
      type: Array,
      required: true
    },
    model: {
      type: String,
      default: 'image'
    },
    showDelBtn: {
      type: Boolean,
      default: true
    },
    textMaxWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    localAttList () {
      return this.value
    }
  },
  methods: {
    removeAtt (index) {
      this.localAttList.splice(index, 1)
      this.$emit('input', this.localAttList)
    }
  },
  components: {
    CImageZoom
  }

}

</script>
<style lang="less" scoped>
.attachment {
   li {
    position: relative;
    vertical-align: top;
    text-align: left!important;
    .iconfont {
      cursor: pointer;
      color: red;
    }
    a {
      color: #20a0ff;
    }
    .del-img {
      display: none;
      position: absolute;
      top: 0px;
      right: 0px;
      padding: 4px;
      line-height: 1;
      font-size: 18px;
      color: #666;
      background: rgba(255, 255, 255, 0.5);
    }
    &:hover .del-img {
      display: block;
    }
    .thumbnail {
      width: 26px;
      vertical-align: middle;
    }
    .cao-text-ellipsis {
      display: inline-block;
      max-width: 240px;
      vertical-align: middle;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow: hidden;
    }
  }

  img {
    max-width: 100px;
  }
}
</style>
