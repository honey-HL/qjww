<template>
  <div id="footer">
    <div class="item" v-for="(item, index) in footNav" :key="index">
      <router-link tag="div" :to="item.id">
        <div class="icon" v-if="item.active" :style="{background: 'url(' + item.activeIcon + ')'}"></div>
        <div class="icon" v-else :style="{background: 'url(' + item.icon + ')'}"></div>
        <div class="name">{{item.name}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: "myFooter",
    data() {
      return {
        footNav: [
          {id: "/index/home", name: "首页", active: false, icon: require("../assets/tab/home.png"), activeIcon: require("../assets/tab/home-active.png")},
          {id: "/index/answer", name: "问答", active: false, icon: require("../assets/tab/answer.png"), activeIcon: require("../assets/tab/answer-active.png")},
          {id: "/index/my", name: "我的", active: false, icon: require("../assets/tab/my.png"), activeIcon: require("../assets/tab/my-active.png")},
        ]
      }
    },
    mounted() {
      this.footNav.forEach((item) => {
        if (this.$route.path === item.id) {
          item.active = true;
        }
      })
    }

  };
</script>

<style lang="scss" scoped>
  #footer {
    display: flex;
    height: 50px;
    background: #fff;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 999;
    box-shadow: 0 4px 15px 0 #CCCCCC;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
      transform: scaleY(0.5);
      background: #CCCCCC;
    }

    & .item {
      width: calc(100% / 3);
      text-align: center;
      &:nth-child(1) .icon {
        width: 23px;
        height: 22px;
      }

      &:nth-child(2) .icon {
        width: 23px;
        height: 19px;
      }

      &:nth-child(3) .icon {
        width: 18px;
        height: 19px;
      }
    }

    & .name {
      font-size: 12px;
      color: #c3c3c3;
    }

    & .icon {
      width: 20px;
      height: 20px;
      display: inline-block;
      background-size: cover !important;
      background-position: center !important;
    }
  }
  .router-link-active .name{
    color: #555555 !important;
  }
</style>

