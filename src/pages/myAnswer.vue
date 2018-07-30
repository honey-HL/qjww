<template>
  <div id="myAnswewr">
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
          <Loading v-if="isShowLoading" style="padding: 30px 0"/>
          <scroller v-else-if="dataList.length > 0" class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
            <transition-group name="fade">
              <div class="row" v-for="(item, index) in dataList" :key="index">
                <div class="top">
                  <div class="head" v-lazy:background-image="imgIp + item.userAvatar"></div>
                  <div class="name">{{item.nikeName}}</div>
                </div>
                <div class="title" v-html="item.questionTitle"></div>
                <div class="operation-bar">
                  <div class="left">
                    <div class="time">{{item.publishTime}}</div>
                  </div>
                  <div class="right">
                    <div class="answer">{{item.answerNum}}回答</div>
                  </div>
                </div>
              </div>
            </transition-group>
          </scroller>
          <Not v-else title="您还没有提问哦" hint="已发布的提问将显示在这里" type="TW">
            <div class="o-btn">
              <router-link to="/index/quiz"><span>去提问</span></router-link>
            </div>
          </Not>
        </div>

        <div class="swiper-slide">
          <Loading v-if="isShowLoading2" style="padding: 30px 0"/>
          <scroller v-else-if="dataList2.length > 0" class="scroller" :on-refresh="refresh2" :on-infinite="infinite2" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
            <div class="row" v-for="(item, index) in dataList2" :key="index">
              <div class="top">
                <div class="head" v-lazy:background-image="imgIp + item.userAvatar"></div>
                <div class="name">{{item.userNickName}}</div>
              </div>
              <div class="title">
                <i class="badge problem"></i>
                <span v-html="item.questionTitle"></span>
              </div>
              <div class="content" v-html="item.content"></div>
              <div class="operation-bar">
                <div class="left">
                  <div class="time">{{item.createTime}}</div>
                </div>
                <div class="right">
                  <div class="answer"><span @click.stop="del(item.id)">删除该回答</span></div>
                </div>
              </div>
            </div>
          </scroller>
          <Not v-else title="您还没有回答提问哦" hint="快去回答吧" type="HD">
            <div class="o-btn">
              <span>去回答</span>
            </div>
          </Not>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div class="mask" v-if="isShow">
        <div class="login-bg">
          <div class="success">删除成功</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import "swiper/dist/css/swiper.css";
  import Swiper from "swiper";
  import Not from "@/components/notData";
  import Loading from "@/components/loading";
  export default {
    name: "myAnswewr",
    components: {
      Not, Loading
    },
    data() {
      return {
        imgIp: this.api.imgIp,
        meunList: [{ id: 1, name: "提问" }, { id: 2, name: "回答" }],
        current: 0,
        swiper: null,
        isShow: false,
        pageNO1: 1,
        pageNO2: 1,
        pageSize: 10,
        isShowLoading: true,
        isShowLoading2: true,
        dataList: [],
        dataList2: [],
        isFrist: false,
      };
    },
    created() {
      setTimeout(() => {
        this.getData(0);
      }, 1000);
    },
    mounted() {
      let thas = this;
      this.swiper = new Swiper(".swiper-container", {
        on: {
          slideChangeTransitionStart: function () {
            if (this.activeIndex == 1 && !thas.isFrist) {
              thas.isFrist = true;
              thas.getData(1);
            }
            thas.current = this.activeIndex;
          }
        }
      });
    },
    methods: {
      /*切换tab*/
      setCurrent(index) {
        this.current = index;
        this.swiper.slideTo(index);
      },
      /*获取列表*/
      getData(type) {
        let url = type == 1 ? this.api.getSelfAnswer : this.api.getSelfQuestion;
        this.api.http("post", url, {
          pageNO: type == 0 ? this.pageNO1 : this.pageNO2,
          pageSize: this.pageSize
        }, result => {
          if (type == 0) {
            this.isShowLoading = false;
            if (this.pageNO1 == 1) {
              this.dataList = result;
            }
            else {
              if (result.length == 0) {
                this.pageNO1 --;
              }
              else {
                this.dataList.concat(result);
              }
            }
          }
          else {
            this.isShowLoading2 = false;
            if (this.pageNO2 == 1) {
              this.dataList2 = result;
            }
            else {
              if (result.length == 0) {
                this.pageNO2 --;
              }
              else {
                this.dataList2.concat(result);
              }
            }
          }
        }, error => {
          console.log(error);
        });
      },
      /*下拉刷新*/
      refresh(done) {
        setTimeout(() => {
          this.pageNO1 = 1;
          this.getData(0);
          done();
        }, 1000);
      },
      /*上拉刷新*/
      infinite(done) {
        setTimeout(() => {
          this.pageNO1 ++;
          this.getData(0);
          done(true);
        }, 1000);
        return;
      },
      /*下拉刷新*/
      refresh2(done) {
        setTimeout(() => {
          this.pageNO2 = 1;
          this.getData(1);
          done();
        }, 1000);
      },
      /*上拉刷新*/
      infinite2(done) {
        setTimeout(() => {
          this.pageNO2 ++;
          this.getData(1);
          done(true);
        }, 1000);
        return;
      },
      del(id) {
        this.$dialog.confirm({
          title: '确认提示',
          message: '您确定要删除该回答吗？'
        }).then(() => {
          this.api.http("post", this.api.delAnswer, {id: id}, (result) => {
            this.isShow = true;
            setTimeout(() => {
              this.isShow = false;
            }, 1500)
            for (let i = 0; i < this.dataList2.length; i++) {
              if (this.dataList2[i].id == id) {
                this.dataList2.splice(i, 1);
                break;
              }
            }
          }, (error) => {})
        }).catch(() => {});
      },
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
    top: 0;
    & .tabbar {
      position: relative;
      height: 50px;
      background: #fff;
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
        padding: 15px 0;
        box-sizing: border-box;
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
        & .row {
          background: #fff;
          box-shadow: 0 3px 10px 0 rgba(190, 190, 190, 0.2);
          margin-top: 10px;
          margin-left: 10px;
          margin-right: 10px;
          box-sizing: border-box;
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

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
    .login-bg {
      padding: 15px 50px;
      border-radius: 6px;
      background: #fff;
      text-align: center;
      position: relative;
      box-sizing: border-box;
      transition: all 0.5s;
      .success {
        padding: 15px 0;
        font-size: 20px;
        color: #555555;
      }
    }
  }
</style>
