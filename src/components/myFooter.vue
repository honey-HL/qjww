<template>
    <div id="footer">
        <div class="item" v-for="(item, index) in footNav" :key="index">
          <router-link tag="div" :to="'/index/' + item.id">
            <div class="icon"></div>
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
        {id: "home", name: "首页", icon: "", activeIcon: ""},
        {id: "answer", name: "问答", icon: "", activeIcon: ""},
        {id: "my", name: "我的", icon: "", activeIcon: ""},
      ]
    }
  },
  methods: {
    
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
  }

  & .name {
    font-size: 12px;
    color: #c3c3c3;
  }

  & .icon {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 100%;
    background: #ddd;
  }
}
.router-link-active .name{
    color: #555555 !important;
}
</style>

