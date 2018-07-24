<template>
    <div id="tab">
        <div class="tabbar">
            <ul>
                <li v-for="(item, index) in meunList" 
                :style="{width: 'calc(100% /' + meunList.length + ')'}" 
                :key="index" @click="setCurrent(index)"
                :class="{'active': current == index}"
                >{{item.name}}</li>
            </ul>
            <div class="border-bar" :style="{width: 'calc(100% /' + meunList.length + ')', left: countLeft + '%'}">
                <span></span>
            </div>
        </div>

        <div class="swiper-container" id="swiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item, index) in meunList" :key="index">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";
export default {
  name: "tab",
  props: {
    meunList: {
      type: Array,
      default: () => {
        return [{ id: 1, name: "item1" }, { id: 2, name: "item2" }];
      }
    }
  },
  data() {
    return {
      current: 0,
      swiper: null
    };
  },
  mounted() {
    let thas = this;
    this.swiper = new Swiper(".swiper-container", {
      on: {
        slideChangeTransitionStart: function() {
          thas.current = this.activeIndex;
        }
      }
    });
  },
  methods: {
    setCurrent(index) {
      this.current = index;
      this.swiper.slideTo(index);
    }
  },
  computed: {
    countLeft() {
      return this.current == 0 ? this.current : 50;
    }
  }
};
</script>
<style lang="scss" scoped>
#tab {
  position: absolute;
  width: 100%;
  height: 100%;
  & .tabbar {
    position: relative;
    height: 50px;
    & ul {
      display: flex;
      list-style: none;
      position: relative;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      & li {
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #999999;
        transition: all 0.5s;
      }
      & li.active {
        color: #5fb62a;
      }
    }
    & .border-bar {
      position: absolute;
      bottom: 5px;
      display: flex;
      justify-content: center;
      transition: all 0.3s;
      left: 0;
      span {
        display: inline-block;
        width: 30px;
        height: 4px;
        background: #5fb62a;
        border-radius: 100px;
      }
    }
  }

  .swiper-container {
    width: 100%;
    height: calc(100% - 50px);
  }
}
</style>