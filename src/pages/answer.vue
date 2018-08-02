<template>
  <div class="answer">
    <div class="top">
      <div class="row">
        <Search class="input" @searchData="searchData" />
        <router-link to="/index/news">
          <div class="right">
            <i class="news-icon"></i>
            <div>通知</div>
          </div>
        </router-link>
      </div>
      <div class="menu-row">
        <div class="item">
          <router-link to="/index/quiz">
            <div class="icon"></div>
            <div class="name">提问</div>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/index/quiz">
            <div class="icon"></div>
            <div class="name">回答</div>
          </router-link>
        </div>
        <div class="item">
          <router-link to="/index/myAnswer">
            <div class="icon"></div>
            <div class="name">我的回答</div>
          </router-link>
        </div>
      </div>
      <div class="bg"></div>
    </div>
    <scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
      <div class="answer-list" v-for="item in items" @click="detail(item)">
        <div class="item">
          <div class="title">
            <i class="badge video"></i>
            <span v-html="item.questionTitle"></span>
          </div>
          <div class="content" v-html="item.questionContent"></div>
          <div class="img-list">
            <div class="img-item" v-for="child in splitImg(item.images)" v-lazy:background-image="child">
              <!-- <img v-lazy="child" width="100%" height="100%"> -->
            </div>
          </div>

          <div class="operation-bar">
            <div class="left">
              <div class="time">{{item.createTime}}</div>
            </div>
            <div class="right">
              <div style="margin-right: 10px">{{item.commentNum}}个回答</div>
              <div style="margin-right: 5px">{{item.praiseNum}}个赞</div>
              <div class="icon-div" @click.stop="comment(item.id, item.questionTitle)">
                <i class="comment"></i>
                <span>回答</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bg"></div>
      </div>
      <!--<div class="answer-list" v-for="item in items">
        <div class="item">
          <div class="title">
            <i class="badge video"></i>
            如何看待锤子新发布的R1手机？到底有什么自信卖那么贵？
          </div>
          <div class="content">
            锤子TNT工作站是我见过最强大的手机配件，没有之一。确切的说这是一个手机配件系。锤子TNT工作站是我见过最强大的手机配件，没有之一。确切的说…
          </div>
          <div class="img-list">
            <div class="img-item"></div>
          </div>
          <div class="video-cover">

          </div>
          <div class="operation-bar">
            <div class="left">
              <div class="time">8小时前</div>
              <div>推广</div>
            </div>
            <div class="right">
              &lt;!&ndash; <div>12个回答</div>
                  <div>22个赞</div> &ndash;&gt;
              <div class="icon-div">
                <i class="enter"></i>
                <span>进入</span>
              </div>
              <div class="icon-div">
                <i class="comment"></i>
                <span>回答</span>
              </div>
              <div class="icon-div">
                <i class="activity"></i>
                <span>活动</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bg"></div>
      </div>-->
    </scroller>

    <div class="foot-height"></div>
    <MyFooter />
  </div>
</template>

<script>
  import MyFooter from "@/components/myFooter";
  import Search from "@/components/search";

  export default {
    name: 'answer',
    components: {
      MyFooter, Search
    },
    data() {
      return {
        items: [],
        searchValue: "*",
        start: 0,
        row: 10,
        imgIp: this.api.imgIp,
        isEnd: false,
      };
    },
    methods: {
      /*获取列表*/
      getData() {
        this.api.http("post", this.api.searchQuestion, {
          start: this.start,
          row: this.row,
          title: this.searchValue
        }, result => {
          if (this.start == 0) {
            this.items = result.data;
            if (result.data.length == 0) {
              this.isEnd = true;
            }
          }
          else {
            if (result.data.length == 0) {
              this.start -= this.row + 1;
              this.isEnd = true;
            }
            else {
              result.data.forEach(item => {
                this.items.push(item);
              })
            }
          }
        }, error => {
          console.log(error);
        });
      },
      /*下拉刷新*/
      refresh(done) {
        setTimeout(() => {
          this.start = 0;
          this.getData();
          done();
        }, 1000);
      },
      /*上拉刷新*/
      infinite(done) {
        setTimeout(() => {
          this.start = this.items.length == 0 ? 0 : this.start + this.row + 1;
          this.getData();
          done(this.isEnd);
        }, 1000);
      },
      /*分割图片*/
      splitImg(image) {
        return image == "" || image == null ? [] : image.split(",");
      },
      /*接收搜索参数*/
      searchData(value) {
        this.searchValue = value;
        setTimeout(() => {
          this.start = 0;
          this.getData();
        }, 1000);
      },
      /*评论*/
      comment(id, title) {
        this.$router.push({
          path: "/index/icomeAnswer",
          query: {
            keywords: title,
            questionId: id,
          }
        });
      },
      /*赞*/
      praise(id) {
        this.api.http("post", this.api.questionPraise, { questionId: id, }, result => {
          for (let i = 0; this.items.length; i++) {
            if (this.items[i].id == id) {
              this.items[i].praiseNum += 1;
              break;
            }
          }
        }, error => {});
      },
      /*详情*/
      detail(item) {
        this.$store.dispatch("setAnswerDetail", item);
        this.$router.push({
          path: "/index/answerResult"
        });
      }

    }
  }
</script>

<style lang="scss" scoped>
  .foot-height {
    height: 60px;
  }

  .answer {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    padding-bottom: 15px;
    & .scroller {
      top: 140px;
      box-sizing: border-box;
      height: 100%;
    }
    .top {
      background: #fff;
    }
    .row {
      display: flex;
      .input {
        width: calc(100% - 30px);
      }
      .right {
        width: 30px;
        padding: 10px 0;
        text-align: center;
        padding-right: 15px;
        .news-icon {
          display: inline-block;
          width: calc(32px / 2);
          height: calc(32px / 2);
          background: url(../assets/news.png);
          background-size: cover;
          background-origin: center;
        }
        div {
          color: #555;
          position: relative;
          top: -1px;
        }
      }
    }
    .menu-row {
      display: flex;
      padding-bottom: 10px;
      .item {
        width: calc(100% / 3);
        text-align: center;
        .icon {
          display: inline-block;
          width: calc(96px / 2);
          height: calc(96px / 2);
          background-size: cover !important;
          background-position: center !important;
        }
        .name {
          font-family: PingFangSC-Light;
          color: #555555;
        }
      }
      .item:nth-child(1) {
        .icon {
          background: url(../assets/quiz.png);
        }
      }
      .item:nth-child(2) {
        .icon {
          background: url(../assets/answer.png);
        }
      }
      .item:nth-child(3) {
        .icon {
          background: url(../assets/wd.png);
        }
      }
    }
    .answer-list {
      .item {
        padding: 15px;
        background: #fff;
        .title {
          font-size: 16px;
          color: #555555;
          line-height: 24px;
          margin-bottom: 5px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          span {
            color: #000 !important
          }
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
          font-family: PingFangSC-Light;
          font-size: 14px;
          color: #999999;
          line-height: 21px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
        .img-list {
          display: flex;
          padding-top: 5px;
          .img-item {
            width: calc((100% - 30px) / 4);
            height: 58px;
            margin: 0 10px 10px 0;
            border-radius: 4px;
            background: #e6e6e6;
            background-size: cover !important;
            background-position: center !important;
          }
          .img-item:nth-child(4n) {
            margin-right: 0;
          }
        }
        .video-cover {
          margin-top: 5px;
          height: 168px;
          border-radius: 4px;
          background: #e6e6e6;
        }
        .operation-bar {
          display: flex;
          padding-top: 15px;
          align-items: center;
          .left {
            display: flex;
            width: 30%;
            color: #999999;
            .time {
              margin-right: 10px;
            }
          }
          .right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            width: 70%;
            color: #555555;
            .icon-div {
              position: relative;
              margin-left: 10px;
              width: 40px;
              text-align: right;
              i {
                display: inline-block;
                width: 15px;
                height: 12px;
                background: #e6e6e6;
                position: absolute;
                top: 2px;
                left: -3px;
                background-size: cover !important;
                background-position: center !important;
              }
              i.enter {
                background: url(../assets/enter.png)
              }
              i.comment {
                top: 3px;
                background: url(../assets/comment.png)
              }
              i.activity {
                width: 12px;
                height: 15px;
                left: 1px;
                top: 0px;
                background: url(../assets/activity.png)
              }
            }
          }
        }
      }
    }

  }

  .bg {
    background: #fcfcfc;
    height: 10px;
  }
</style>
