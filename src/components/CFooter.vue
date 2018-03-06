<template>
  <div id="footer">
    <ul>
      <li><a href="/aboutUs">关于我们</a></li>
      <li><a href="/contact">联系我们</a></li>
      <li><a href="/protocal">用户协议</a></li>
      <li><a href="/lawStatement">法律声明</a></li>
      <li><a href="/recruit">招贤纳士</a></li>
    </ul>
    <p>Copyright © 2005-2015 广而易 版权所有  |  赣ICP备15008908号-1</p>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
@import '../assets/styles/variables.less';

#footer {
  height: 124px;
  padding-top: 40px;
  text-align: center;
  background-color: #131415;
  clear: both;
  ul {
    margin: 0 auto;
    width: @width-page;
    li {
      display: inline-block;
      padding-right: 10px;
      margin-right: 10px;
      line-height: 1;
      border-right: 1px solid #c5cad2;
      a {
        color: #c5cad2;
        font-size: 14px;
      }
      &:last-child {
        padding-right: 0;
        border: 0;
      }
    }
  }
  p {
    font-size: 12px;
    color: #747b86;
    margin-top: 5px;
  }
}
</style>
