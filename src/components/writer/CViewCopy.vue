<template>
  <el-dialog
    v-model="toggle"
    class="copy-dialog"
    title="查看文案"
  >
    <div class="copy-block">
      <div class="wrapper">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in copyData"
            :label="'文案' + index | numToCn"
            :name="'item' + index">
            <div class="copy-content" v-html="item.fdDesc">
              {{ item.desc }}
            </div>
            <div class="attachment-block text-left">
              <span class="pull-left key">附件：</span>
              <ul class="attachment-list inline-block">
                <li v-for="att in item.fdAtt">
                  <span class="name">{{att.name}}</span>
                  <a :href="att.url" class="link">下载</a>
                </li>
              </ul>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-dialog>

</template>
<script>
export default {
  name: 'CViewCopy',
  props: {
    copy: {
      type: Array,
      required: true
    },
    value: {
      type: Boolean
    }
  },
  data () {
    return {
      activeName: 'item0'
    }
  },
  computed: {
    toggle: {
      get () {
        return this.value
      },
      set (newValue) {
        this.activeName = 'item0'
        this.$emit('input', newValue)
      }
    },
    copyData () {
      var copy = this.copy
      _.forEach(copy, (item, index) => {
        if (item.fdDesc.indexOf('<script>') >= 0) {
          item.fdDesc = '文案中包含非法字符串，无法显示。'
        }
      })
      return this.copy
    }
  },
  methods: {
    handleClick (tab, event) {
    }
  },
  filters: {
    numToCn (value) {
      var obj = {
        '文案0': '文案一',
        '文案1': '文案二',
        '文案2': '文案三',
        '文案3': '文案四',
        '文案4': '文案五',
        '文案5': '文案六',
        '文案6': '文案七',
        '文案7': '文案八',
        '文案8': '文案九',
        '文案9': '文案十'
      }
      return obj[value]
    }
  }
}

</script>
<style lang="less" scoped>
@import '../../assets/styles/variables.less';
.copy-content {
  border: 1px solid @color-border;
  padding: 20px;
  height: 360px;
  overflow-y: auto;
  line-height: 1.8;
  text-align: left;
}
.attachment-block {
  margin-top: 15px;
}
.attachment-block .key {
  color: #999999;
  margin-right: 10px;
}
.attachment-list {
  width: 935px;
}
.link {
  color: #0084d7;
  margin-left: 10px;
}
.link:hover {
  color: #00aaff;
}
</style>
<style lang="less">
@import '../../assets/styles/variables.less';
.copy-block .el-tabs .el-tabs__header {
  background: none !important;
  background-color: @color-white !important;
  .el-tabs__item {
    margin: 0 20px 5px 0;
    padding: 0px 28px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #666666;
    border: 1px solid #666666;
    font-weight: normal;
    border-radius: 15px;
    background: none;
  }
  .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__item.is-active {
    border-color: @color-hover;
    color: @color-hover;
  }
  .el-tabs__item.is-active:after {
    display: none;
  }
}
</style>
