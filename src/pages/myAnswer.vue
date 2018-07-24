<template>
    <div id="myAnswewr">
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
                <div class="swiper-slide">
                    <div class="row">
                        <div class="top">
                            <div class="head"></div>
                            <div class="name">阿实打实的个</div>
                        </div>
                        <div class="title">
                            阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概
                        </div>
                        <div class="operation-bar">
                            <div class="left">
                                <div class="time">5月16日 16:45</div>
                            </div>
                            <div class="right">
                                <div class="answer">32回答</div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="top">
                            <div class="head"></div>
                            <div class="name">阿实打实的个</div>
                        </div>
                        <div class="title">
                            阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概
                        </div>
                        <div class="operation-bar">
                            <div class="left">
                                <div class="time">5月16日 16:45</div>
                            </div>
                            <div class="right">
                                <div class="answer">32回答</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div class="row">
                        <div class="top">
                            <div class="head"></div>
                            <div class="name">阿实打实的个</div>
                        </div>
                        <div class="title">
                            <i class="badge problem"></i>
                            阿斯蒂芬噶大概
                        </div>
                        <div class="content">
                            啊地方敢死队风格地方法规和法国恢复规划法规好大飞哥啊地方敢死队风格地方法规和法国恢复规划法规好大飞哥
                        </div>
                        <div class="operation-bar">
                            <div class="left">
                                <div class="time">5月16日 16:45</div>
                            </div>
                            <div class="right">
                                <div class="answer">删除该回答</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import "swiper/dist/css/swiper.css";
import Swiper from "swiper";
export default {
  name: "myAnswewr",
  props: {
    meunList: {
      type: Array,
      default: () => {
        return [{ id: 1, name: "提问" }, { id: 2, name: "回答" }];
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
#myAnswewr {
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
        width: 20px;
        height: 3px;
        background: #5fb62a;
        border-radius: 100px;
      }
    }
  }

  .swiper-container {
    width: 100%;
    height: calc(100% - 50px);
    & .swiper-slide {
      padding: 15px 10px;
      box-sizing: border-box;
      & .row {
        background: #fff;
        box-shadow: 0 3px 10px 0 rgba(190, 190, 190, 0.2);
        margin-top: 10px;
        &:first-child{
            margin-top: 0;
        }
        .top {
          padding: 10px;
          display: flex;
          align-items: center;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            height: 1px;
            width: 100%;
            left: 0;
            bottom: 0;
            transform: scaleY(0.5);
            background: #e1e1e1;
          }
          .head {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-size: cover !important;
            background-origin: center !important;
            background: #ddd;
          }
          .name {
            padding-left: 10px;
            color: #9a9a9a;
          }
        }
        .title {
          font-size: 16px;
          color: #000;
          padding: 10px;
          padding-bottom: 0;
          line-height: 22px;
          font-family: 微软雅黑;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          i {
            display: inline-block;
            width: calc(52px / 2);
            height: calc(28px / 2);
            background: #e6e6e6;
            position: relative;
            top: 1px;
            background-size: cover !important;
            background-position: center !important;
          }
          i.img {
            background: url(../assets/img.png);
          }
          i.problem {
            background: url(../assets/problem.png);
          }
          i.video {
            background: url(../assets/video.png);
          }
        }
        .content {
          line-height: 21px;
          font-size: 14px;
          color: #999999;
          padding: 10px;
          padding-bottom: 0;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .operation-bar {
          display: flex;
          align-items: center;
          padding: 10px;
          .left {
            width: 50%;
            .time {
              color: #999999;
            }
          }
          .right {
            width: 50%;
            text-align: right;
            .answer {
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>