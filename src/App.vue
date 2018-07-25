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
</style>
