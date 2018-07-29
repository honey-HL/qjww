<template>
  <div id="myCollection">
    <scroller v-if="items.length > 0" class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A">
      <transition name="fade">
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
      </transition>
    </scroller>
    <div class="not" v-else>
      <Not title="暂未收藏" hint="快去收藏吧" />
    </div>
  </div>
</template>
<script>
  import Not from "@/components/notData";
  import Loading from "@/components/loading";

  export default {
    name: "myCollection",
    components: {
      Not, Loading
    },
    data() {
      return {
        items: [],
        pageNO: 1,
        pageSize: 10,
        isShowLoading: true,
      };
    },
    mounted() {

    },
    methods: {
      /*获取列表*/
      getData() {
        this.api.http("post", this.api.getNotification, {
          pageNO: this.pageNO,
          pageSize: this.pageSize
        }, result => {
          this.isShowLoading = false;
          if (this.pageNO == 1) {
            this.items = result;
          }
          else {
            if (result.length == 0) {
              this.pageNO--;
            }
            else {
              this.items.concat(result);
            }
          }
        }, error => {
          console.log(error);
        });
      },
      /*下拉刷新*/
      refresh(done) {
        setTimeout(() => {
          this.pageNO = 1;
          this.getData();
          done();
        }, 1000);
      },
      /*上拉刷新*/
      infinite(done) {
        setTimeout(() => {
          this.pageNO++;
          this.getData();
          done(true);
        }, 1000);
        return;
      },
    },
    computed: {

    }
  };
</script>
<style lang="scss" scoped>
  #myCollection {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    box-sizing: border-box;
    .scroller {
      height: 100%;
      box-sizing: border-box;
    }
    & .row {
      background: #fff;
      box-shadow: 0 3px 10px 0 rgba(190, 190, 190, 0.2);
      box-sizing: border-box;
      margin: 10px 15px;
      margin-bottom: 0;
      &:first-child {
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
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
