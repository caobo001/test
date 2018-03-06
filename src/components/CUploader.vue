<template>
  <div :id="id">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CUploader',
  mounted () {
    const qq = require('../assets/scripts/fine-uploader-core')
    this.id = `uploader${Math.random()}`
    this.$nextTick(() => {
      /* eslint-disable no-new */
      new qq.FineUploaderBasic({
        // debug: true,
        button: document.getElementById(this.id),
        request: {
          endpoint: this.action,
          inputName: this.name,
          customHeaders: {
            Accept: 'text/plain'
          }
        },
        multiple: false,
        validation: {
          acceptFiles: this.accept,
          sizeLimit: this.size,
          allowedExtensions: this.allowedExtensions
        },
        callbacks: {
          onComplete: (id, fileName, respJSON, xhr) => {
            if (this.onComplete) this.onComplete(respJSON, this.cbData)
          },
          onUpload: (id, fileName) => {
            if (this.onUpload) this.onUpload(id, fileName, this.cbData)
          },
          onError: (id, fileName, reason, xhr) => {
            if (this.onError) this.onError(id, fileName, reason, xhr)
          }
        },
        messages: {
          sizeError: `{file} 文件太大, 当前最大尺寸为 ${this.size / 1024 / 1024} M`,
          typeError: '{file} 文件类型不正确, 当前有效的后缀名为: {extensions}'
        }
      })
    })
  },
  props: {
    action: {
      type: String,
      default: '/file/uploadLocal'
    },
    size: {
      type: Number,
      default: 1024 * 1024 * 10
    },
    name: {
      type: String,
      default: 'fdCoverPageFileUpload'
    },
    accept: {
      type: String,
      default: 'image/png,image/jpg,image/jpeg'
    },
    allowedExtensions: {
      type: Array,
      default: function () {
        return []
      }
    },
    onComplete: {
      type: Function
    },
    onUpload: {
      type: Function
    },
    onError: {
      type: Function
    },
    cbData: {
      default: null
    }
  },
  data () {
    return {
      id: ''
    }
  }
}
</script>
