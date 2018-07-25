<template>
  <div id="expert">
    <div class="tabbar">
      <ul>
        <li v-for="(item, index) in meunList" :style="{width: 'calc(100% /' + meunList.length + ')'}" :key="index" @click="setCurrent(index)"
          :class="{'active': current == index}">{{item.name}}</li>
      </ul>
      <div class="border-bar" :style="{width: 'calc(100% /' + meunList.length + ')', left: countLeft + '%'}">
        <span></span>
      </div>
    </div>

    <div class="swiper-container" id="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="screen-bar">
            <div class="screen-top">
              <div class="left">
                <span class="hint">您的位置：</span>
                四川成都
              </div>
              <div class="right" @click="switchMask">
                切换地区
                <i></i>
              </div>
            </div>
            <div class="mask" v-if="isScreen" @click="switchMask">
              <div class="input-bar" @click.stop>
                <div class="input-div">
                  <input type="text" placeholder="请选择地址" readonly>
                </div>
                <div class="search-bar">
                  <input placeholder="输入地区、师傅名字" maxlength="30" v-model="searchValue">
                  <img src="../assets/search.png" />
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="head">
              <i class="b"></i>
            </div>
            <div class="info">
              <div class="name-bar">
                <span class="name">李师傅</span>
                <span class="address">啥都好过分打手犯规放大个</span>
                <span class="range">0.03KM</span>
              </div>
              <div class="address-bar">
                <span class="answer-num">已回答50次</span>
                <span class="zan-num">304人点赞</span>
                <span class="add-detail">温江区-涌泉店</span>
              </div>
            </div>
          </div>
          <Not v-if="true" title="网络出现故障" hint="网络出现故障，请刷新一下" type="YC">
            <div class="o-btn">
              <span>刷新</span>
            </div>
          </Not>
        </div>
        <div class="swiper-slide">
          <Not v-if="true" title="暂无专家咨询" hint="已咨询过的专家将显示在这里" type="ZX">
            <div class="o-btn">
              <span>找专家咨询</span>
            </div>
          </Not>
          <div class="item">
            <div class="row">
              <div class="head">
                <i class="b"></i>
              </div>
              <div class="info">
                <div class="name-bar">
                  <span class="name">李师傅</span>
                  <span class="address2">啥都好过分打手犯规放大个</span>
                </div>
                <div class="address-bar">
                  <span class="detail">啥都好过分打手犯规放大个</span>
                </div>
              </div>
            </div>
            <div class="phone-bar">
              <div></div>
              <div></div>
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
  import Not from "@/components/notData";
  export default {
    name: "expert",
    components: {
      Not
    },
    data() {
      return {
        meunList: [{ id: 1, name: "专家" }, { id: 2, name: "我的咨询" }],
        current: 0,
        swiper: null,
        isScreen: false,
        searchValue: "",
      };
    },
    mounted() {
      let thas = this;
      this.swiper = new Swiper(".swiper-container", {
        on: {
          slideChangeTransitionStart: function () {
            thas.current = this.activeIndex;
          }
        }
      });
    },
    methods: {
      /*切换tab卡*/
      setCurrent(index) {
        this.current = index;
        this.swiper.slideTo(index);
      },
      /*切换遮罩*/
      switchMask() {
        this.isScreen = !this.isScreen;
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
  #expert {
    position: absolute;
    width: 100%;
    height: 100%;
    & .tabbar {
      position: relative;
      height: 50px;
      background: #fff;
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
      & ul {
        display: flex;
        list-style: none;
        position: relative;
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
        position: relative;
        & .o-btn {
          text-align: center;
          padding-top: 15px;
          span {
            display: inline-block;
            width: 108px;
            height: 32px;
            line-height: 32px;
            background-image: linear-gradient(-90deg, #5FB62A 0%, #78BC28 100%);
            border-radius: 100px;
            color: #fff;
          }
        }
        &:nth-child(1) {
          padding-top: 46px;
        }
        .item .phone-bar {
          background: #fff;

          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-bottom: 10px;
          padding-right: 15px;
          div {
            background-size: cover !important;
            background-position: center !important;
            margin-left: 40px;
            &:first-child {
              width: 24px;
              height: 21px;
              background: url(../assets/comment-1.png);
            }
            &:last-child {
              width: 23px;
              height: 23px;
              background: url(../assets/phone.png);
            }
          }
        }
        & .row {
          background: #fff;
          margin-top: 10px;
          padding: 10px 15px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .head {
            width: 48px;
            height: 48px;
            background-size: cover !important;
            background-position: center !important;
            background: #e6e6e6;
            border-radius: 100%;
            box-sizing: border-box;
            border: 2px solid #fff;
            position: relative;
            i {
              display: inline-block;
              width: 12px;
              height: 12px;
              position: absolute;
              bottom: 0;
              right: 0;
              background-size: cover !important;
              background-position: center !important;
            }
            i.b {
              background: url(../assets/attestation-b.png)
            }
            i.o {
              background: url(../assets/attestation-o.png)
            }
          }
          .info {
            width: calc(100% - 48px);
            padding-left: 15px;
            box-sizing: border-box;
            position: relative;
          }
          .name-bar {
            display: flex;
            margin-bottom: 6px;
            & .name {
              display: inline-block;
              font-size: 14px;
              color: #555555;
              width: 50px;
            }
            .address {
              font-size: 14px;
              color: #999999;
              padding-right: 50px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .address2 {
              font-size: 14px;
              color: #999999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .range {
              position: absolute;
              right: 0;
              top: 2px;
              color: #999999;
            }
          }
          .address-bar {
            color: #555555;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .zan-num {
              margin-left: 10px;
            }
            .add-detail {
              color: #999999;
              position: absolute;
              right: 0;
              top: 1px;
            }
            .detail {
              color: #999999;
            }
          }

        }
        & .screen-bar {
          position: absolute;
          width: 100%;
          top: 0;
          z-index: 1;
          & .screen-top {
            display: flex;
            padding: 15px;
            box-sizing: border-box;
            background: #fff;
            .left {
              width: 50%;
              .hint {
                color: #999999;
              }
            }
            .right {
              width: 50%;
              text-align: right;
              color: #5FB62A;
              position: relative;
              padding-right: 15px;
              i {
                display: inline-block;
                position: absolute;
                width: 10px;
                height: 4px;
                top: 6px;
                right: 0px;
                background: url(../assets/down.png);
                background-size: cover;
                background-position: center;
              }
            }

          }
          & .mask {
            position: fixed;
            height: 100%;
            width: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1;
            transition: all 0.5s;
            & .input-bar {
              background: #fff;
              box-sizing: border-box;
              padding: 15px;
              padding-top: 0;
              .input-div {
                input {
                  height: 32px;
                  line-height: 32px;
                  background: #fff;
                  border: 1px solid rgba(153, 153, 153, 0.10);
                  border-radius: 4px;
                  font-size: 12px;
                  width: 100%;
                  margin: 10px 0;
                  padding-left: 10px;
                  box-sizing: border-box;
                }
              }
              .search-bar {
                width: 100%;
                position: relative;
                img {
                  width: calc(34px / 2);
                  height: calc(34px / 2);
                  position: absolute;
                  top: 6.5px;
                  right: 15px;
                }
                input {
                  width: 100%;
                  height: 32px;
                  font-size: 12px;
                  line-height: 32px;
                  border: 1px solid rgba(153, 153, 153, 0.10);
                  border-radius: 4px;
                  padding-left: 15px;
                  box-sizing: border-box;
                  outline: none;
                }
              }
            }
          }
        }

      }
    }
  }
</style>