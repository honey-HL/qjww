<template>
  <div class="quizSuccess">
    <scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
      <div class="success-bar">
        <span>邀请朋友来答</span>
        <div class="title">问题发布成功啦</div>
        <div class="title-min">请耐心等待答案</div>
        <div class="success-icon"></div>
      </div>
      <div class="bg"></div>
      <div class="consult">
        <div class="title">想快速解决问题</div>
        <div class="title-min">您还可以直接
          <router-link to="/index/expert">
            <span>向专家咨询</span>
          </router-link>
        </div>
        <span class="right-icon"></span>
      </div>
      <div class="bg"></div>
      <div class="list-title">相关问题</div>
      <transition-group name="fade">
        <div v-for="(item, index) in items" :key="index" class="row" v-if="item.userPush" @click="detail(item)">
          <div class="title" v-html="item.questionTitle"></div>
          <div class="content" v-html="item.questionContent"></div>
          <div class="img-list">
            <div class="img-item" v-for="child in splitImg(item.images)" v-lazy:background-image="child"></div>
          </div>
          <div class="operation-bar">
            <div class="left">
              <div v-if="item.userPush" class="head" v-lazy:background-image="item.avatar"></div>
              <div v-if="item.userPush" class="name">{{!item.anonymity ? item.nickName : '匿名'}}</div>
            </div>
            <div class="right">
              <div class="time">{{formatting(item.createTime)}}</div>
              <div class="comment" @click.stop="comment(item.id, item.questionTitle)">
                <img src="../assets/comment.png">
                <span>{{item.commentNum}}</span>
              </div>
              <div class="zan">
                <img src="../assets/zan.png">
                <span>{{item.praiseNum}}</span>
              </div>
            </div>
          </div>
        </div>
      </transition-group>
    </scroller>

  </div>
</template>
<script>
  export default {
    name: "quizSuccess",
    data() {
      return {
        items: [],
        searchValue: "",
        start: 0,
        row: 10,
        isEnd: false,
      }
    },
    created() {
      this.searchValue = this.$route.query.keywords;
    },
    methods: {
      formatting (time) {
        return this.util.formatting(time);
      },
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
              result.data.forEach((item) => {
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
  .quizSuccess {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    & .scroller {
      box-sizing: border-box;
      height: 100%;
    }
  }

  .success-bar {
    padding: 10px 15px;
    position: relative;
    text-align: center;
    box-sizing: border-box;
    background: #fff;
    span {
      position: absolute;
      right: 15px;
      top: 10px;
      color: #5FB62A;
      border: 1px solid #5FB62A;
      border-radius: 100px;
      height: 22px;
      line-height: 22px;
      padding: 0 3px;
    }
    .title {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #555555;
      padding-top: 30px;
      margin-bottom: 5px;
    }
    .title-min {
      font-family: PingFangSC-Light;
      font-size: 12px;
      color: #999999;
      margin-bottom: 10px;

    }
    .success-icon {
      width: calc(348px / 2);
      height: calc(206px / 2);
      background: url(../assets/success.png);
      display: inline-block;
      background-size: cover;
      background-position: center;
    }
  }

  .bg {
    height: 10px;
    background: #FCFCFC;
  }

  .consult {
    position: relative;
    text-align: center;
    box-sizing: border-box;
    background: #fff;

    height: 86px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    .title {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #555555;
      margin-bottom: 5px;
    }
    .title-min {
      font-family: PingFangSC-Light;
      font-size: 14px;
      color: #555555;
      span {
        font-size: 14px;
        color: #5FB62A;
      }
    }
    .right-icon {
      display: inline-block;
      position: absolute;
      width: calc(16px / 2);
      height: calc(28px /2);
      background: url(../assets/right-icon.png);
      right: 15px;
      top: 50%;
      transform: translate(0, -50%);
      background-size: cover;
      background-position: center;
    }

  }

  .list-title {
    padding: 15px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #555555;
    text-align: center;
    position: relative;
    background: #fff;
    &::before {
      content: "";
      position: absolute;
      height: 1px;
      width: 100%;
      background: #e6e6e6;
      transform: scaleY(0.5);
      bottom: 0;
      left: 0;
    }
  }

  .row {
    position: relative;
    padding: 15px;
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

    .title {
      font-size: 16px;
      color: #000;
      font-weight: 600;
      line-height: 22px;
      margin-bottom: 5px;
      font-family: 微软雅黑;
      .search-text {
        color: #5fb62a;
      }
    }
    .content {
      font-size: 12px;
      color: #9a9a9a;
      line-height: 16px;
      margin-bottom: 10px;
    }
    .img-list {
      display: flex;
      padding-top: 5px;
      flex-wrap: wrap;
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
    .operation-bar {
      display: flex;
      align-items: center;
      .left {
        width: 30%;
        display: flex;
        align-items: center;
        .head {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-size: cover !important;
          background-position: center !important;
          background: #ddd;
        }
        .name {
          padding-left: 5px;
          font-size: 12px;
          color: #9a9a9a;

          width: calc(100% - 31px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .right {
        width: 70%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .time {
          font-size: 12px;
          color: #9a9a9a;
        }
        .comment {
          display: table-cell;
          vertical-align: middle;
        }
        .zan img{
          top: 1px;
        }
        img {
          width: calc(26px / 2);
          height: calc(26px / 2);
          margin-left: 15px;
          vertical-align: center;
          position: relative;
          top: 2px;
        }
        span {
          font-size: 12px;
          color: #666;
          position: relative;
        }
      }
    }
  }
</style>
