<template>
  <div id="myCollection">
    <Loading v-if="isShowLoading" />
    <scroller v-else-if="items.length > 0" class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A">
      <transition-group name="fade">
        <div class="row" v-for="(item, index) in items" :key="index" @click="detail(item)">
          <div class="top">
            <div class="head" v-lazy:background-image="imgIp + item.userAvatar"></div>
            <div class="name">{{item.nikeName}}</div>
          </div>
          <div class="title">
            <i class="badge problem"></i>
            <span v-html="item.questionTitle"></span>
          </div>
          <div class="content" v-html="item.questionContent"></div>
          <div class="operation-bar">
            <div class="left">
              <div class="time">{{item.publishTime}}</div>
            </div>
            <div class="right">
              <div class="answer"><span @click.stop="del(item.questionId)">删除收藏</span></div>
            </div>
          </div>
        </div>
      </transition-group>
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
        imgIp: this.api.imgIp,
        items: [],
        pageNO: 1,
        pageSize: 10,
        isShowLoading: true,
      };
    },
    created() {
      setTimeout(() => {
        this.getData();
        this.isShowLoading = false;
      }, 1000);
    },
    methods: {
      /*获取列表*/
      getData() {
        this.api.http("get", this.api.getCollectionList, {
          pageNO: this.pageNO,
          pageSize: this.pageSize
        }, result => {
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
      /*详情*/
      detail(item) {
        // this.$store.dispatch("setAnswerDetail", item);
        // this.$router.push({
        //   path: "/index/answerResult"
        // });
      },
      del (id) {
        this.$dialog.confirm({
          title: '确认提示',
          message: '您确定要删除该收藏吗？'
        }).then(() => {
          this.api.http("get", this.api.delCollection + id, {}, (result) => {
            this.$toast("删除成功");
            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i].questionId == id) {
                this.items.splice(i, 1);
                break;
              }
            }
          }, (error) => {})
        }).catch(() => {});
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
