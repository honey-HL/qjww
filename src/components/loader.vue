<template>
  <div class="loader">
    <transition name="fade">
      <div class="mask">
        <div class="loading-bg">
          <Loading />
          <div class="success">{{title}}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Loading from "@/components/loading"
  export default {
    name: "loader",
    components: {
      Loading
    },
    props: {
      title: {
        type: String,
        default: "加载中"
      }
    }
  }
</script>

<style scoped lang="scss">
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading-bg {
      padding: 15px 50px;
      border-radius: 6px;
      background: #fff;
      text-align: center;
      position: relative;
      box-sizing: border-box;
      transition: all 0.5s;
      .success {
        padding-top: 10px;
        font-size: 16px;
        color: #555555;
      }
    }
  }
</style>
