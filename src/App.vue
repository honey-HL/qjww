<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  * {margin: 0; padding: 0;outline: none;font-family: 微软雅黑;font-size: 12px}
  html, body, #app{background: #fcfcfc;height: 100%;}
  img{max-width: 100%;}
  a, a:active{text-decoration: none;background: initial}
  input, textarea{-webkit-appearance: none;}
  * {
    /**阻止移动端长按图片复制行为*/
    -webkit-touch-callout: none;
    /*禁用webkit内核浏览器的文字大小调整功能*/
    -webkit-text-size-adjust: none;
    /*避免点击a标签或者注册了click事件的元素时产生高亮*/
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    /*禁止用户进行复制选择 TODO iphone 有bug*/
    /*-webkit-user-select: none; */
    -webkit-overflow-scrolling: touch;/*这句是为了滑动更顺畅*/
  }
  /*解决ios弹出键盘*/
  input[readonly]{-webkit-user-select: none !important;}

  .fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
  .fade-enter, .fade-leave-to {opacity: 0;}
</style>
