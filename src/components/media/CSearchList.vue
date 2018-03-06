<template>
	<div id="search-block" class="search-block" ref="search-block" tabindex="1">
		<div class="search inline-block mr15">

			<input
      type="text"
      v-model="inputName"
      :placeholder="placeholder"
      @keydown="move($event)"
      @focus="focus">
      <i class="iconfont icon-sousuo search-icon"></i>
			<a href="javascript:;" @click="searchConfirm()" class="search-btn">
        搜索
			</a>
      <i
        class="icon iconfont icon-delete clear-search"
        @click="clearSearch()">
      </i>
		</div>
    <ul class="search-list" :class="{'show': dataList.length !== 0}">
      <li
        v-for="(item, index) in dataList"
        :key="index"
        class="cursor-default"
        :class="{'hover': index === curIndex}"
        @click="setCur(index, $event)">
        {{item}}
      </li>
    </ul>
	</div>
</template>
<script>
import { Notification } from 'element-ui'
export default {
  mounted () {
    document.body.addEventListener('click', this.clearDataList)
  },
  beforeDestroy () {
    document.body.removeEventListener('click', this.clearDataList)
  },
  data () {
    return {
      inputName: this.value,
      searchName: '',
      dataList: [],
      curIndex: -1,
      choosing: false,
      focusFlag: false,
      preciseFlag: false,
      warningNotification: '',
      wechat: this.$store.state.goodsGroups.wechat,
      weibo: this.$store.state.goodsGroups.weibo
    }
  },
  watch: {
    inputName () {
      this.$emit('setInputName', this.inputName)
      var params = {
        fdName: this.inputName,
        fdGoodsGroupId: this.type
      }
      if (!this.choosing) {
        if (this.inputName.length <= 20) {
          this.fetchData(params)
        }
      }
    },
    value () {
      this.inputName = this.value
    }
  },
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    type: {
      type: String
    }
  },
  methods: {
    focus () {
      this.choosing = false
      this.preciseFlag = false
    },
    clearDataList () {
      this.dataList = []
    },
    clearSearch () {
      this.inputName = ''
      this.preciseFlag = false
      this.$emit('setSearchName', this.inputName)
    },
    trimStr (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '')
    },
    searchConfirm () {
      this.preciseFlag = true
      this.inputName = this.trimStr(this.inputName)
      var arr = this.inputName.split(/[,， ]/)
      var count = 0
      var curIndex = 0
      var str = this.inputName
      let wxValidate = true
      let wxList = []
      if (!_.isEmpty(this.warningNotification)) {
        this.warningNotification.close()
      }
      arr.forEach((item, index) => {
        wxList.push(item)
        if (item.split('').length !== 0) {
          count++
          if (count === 1) {
            curIndex = index
          }
        }
      })
      if (count === 1) {
        str = arr[curIndex].trim()
      }
      this.searchName = str
      var length = this.searchName.length

      var num = arr.length
      if (length >= 5000) {
        this.$message.error('输入字符不能超过5000，当前有' + length + '个字符')
      } else if (num > 200) {
        this.$message.error('搜索条目不能超过200条，当前有' + num + '条搜索项')
      }

      if (length < 5000 && num <= 200) {
        // this.$emit('setSearchName', this.searchName)
        if (num > 1) {
          if (this.type === this.wechat) {
            if (wxValidate) {
              this.$emit('setSearchName', this.searchName, true, this.preciseFlag)
            } else {
              const h = this.$createElement
              this.warningNotification = Notification({
                title: '不合法微信号',
                type: 'warning',
                // message: h('i', { style: 'color: teal'}, '微信号格式为：6-20个字母、数字、下划线和减号，必须以字母开头。' + '不合法微信号：' + wxList.join(','),
                offset: 100,
                duration: 0,
                customClass: 'illegal-notification',
                message: h('p', {style: 'color: teal'}, '微信号格式为：6-20个字母、数字、下划线和减号，必须以字母开头。')
              })
            }
          } else {
            this.$emit('setSearchName', this.searchName, true, this.preciseFlag)
          }
        } else {
          this.$emit('setSearchName', this.searchName, false, this.preciseFlag)
        }
        this.dataList = []
      }
    },
    fetchData (params) {
      this.$http.get('/goods/search', {params}).then((resp) => {
        this.dataList = resp.data
      })
    },
    setCur (index, event) {
      event.stopPropagation()
      this.inputName = this.dataList[index]
      this.choosing = true
      this.searchConfirm()
    },
    move (event) {
      this.preciseFlag = true
      if (event.keyCode === 40) {
        this.curIndex++
        if (this.curIndex >= this.dataList.length) {
          this.curIndex = 0
        }
        this.inputName = this.dataList[this.curIndex]
        this.choosing = true
      }
      if (event.keyCode === 38) {
        this.curIndex--
        if (this.curIndex < 0) {
          this.curIndex = this.dataList.length - 1
        }
        this.inputName = this.dataList[this.curIndex]
        this.choosing = true
      }
      if (event.keyCode === 13) {
        this.choosing = false
        this.searchConfirm()
      }
    },
    components: {
      [Notification.name]: Notification
    }
  }
}
</script>
<style lang="less">
@import '../../assets/styles/variables.less';
.search-block {
  position: relative;
  margin: 20px auto auto auto;
  text-align: center;
  width: 665px;
  outline: 0;
  .search {
    width: 665px;
    box-shadow: none;
  }
}
.search-list {
  position: absolute;
  width: 560px;
  top: 40px;
  background-color: lighten(@color-bg, 5%);
  border: 1px solid #ededed;
  z-index: 10;
  display: none;
  &.show {
    display: block;
  }
  li {
    padding: 5px 15px;
    text-align: left;
    font-size: 14px;
    &:hover, &.hover {
      color: #ffffff;
      background-color: @color-primary;
    }
  }
}
.search, .publish {
  vertical-align: middle;
  border-radius: 20px;
}

.search {
  position: relative;
  width: 465px;
  height: 40px;
  border-radius: 22px;
  background: white;
  box-shadow: 1px 1px 8px #cccccc;
  .search-icon {
    position: absolute;
    top: 10px;
    left: 10px;
    color: @color-font-light2;
  }
  .clear-search {
    position: absolute;
    right: 110px;
    top: 3px;
    color: @color-primary;
    font-size: 22px;
    display: none;
  }
  &:hover .clear-search {
    display: inline-block;
    cursor: default;
  }
  &.focus {
    border-color: @color-primary;
  }
  input {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 560px;
    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    font-size: 14px;
    border: 1px solid #cccccc;
    &:focus {
      border-color: @color-primary;
    }
  }
  .search-btn {
    position: absolute;
    width: 105px;
    height: 40px;
    line-height: 40px;
    right: 0px;
    top: 0px;
    color: #ffffff;
    font-size: 18px;
    background-color: @color-primary;
    &:visited, &:hover {
      background-color: @color-primary;
    }
  }
}
.el-notification.illegal-notification {
  right: 50px;
}
</style>
