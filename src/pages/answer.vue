<template>
  <div class="answer">
    <div class="top">
      <div class="row">
        <Search class="input" @searchData="searchData" />
        <router-link to="/index/news">
          <div class="right">
            <i class="read" v-if="isRead == 1"></i>
            <i class="news-icon"></i>
            <div>通知</div>
          </div>
        </router-link>
      </div>
      <div class="menu-row">
        <div class="item" @click="link('quiz')">
          <div class="icon"></div>
          <div class="name">提问</div>
        </div>
        <div class="item" @click="link('forAnswer')">
          <div class="icon"></div>
          <div class="name">回答</div>
        </div>
        <div class="item" @click="link('myAnswer')">
          <div class="icon"></div>
          <div class="name">我的回答</div>
        </div>
      </div>
      <div class="bg"></div>
    </div>
    <scroller :style="{height : scrollHeight}" class="scroller" ref="myscroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
      <div class="answer-list" v-for="(item, index) in items" :key="index" @click="detail(item)">
        <div class="item">
          <div class="title">
            <span>
              <i class="badge quiz" v-if="item.userPush"></i>
              <i class="badge" v-else :class="{img: item.label == 1, video: item.label == 2, problem: item.label == 3}"></i>
            </span>
            <span class="title_text" v-html="item.questionTitle"></span>
          </div>

          <div class="content" v-html="item.questionContent" v-if="item.answer == null"></div>
          <div class="img-list" v-if="(item.label == 0||item.label == 1||item.label == 3)&&item.answer == null">
            <img class="img-item" v-for="(child, index) in util.splitImg(item.images).slice(0, 4)" :key="index" :src="child.filterImage(api.ip)" >  
          </div>

          <!--新增第一条回答-->
          <div class="hasAnswer_2" v-if="item.answer != null">
            <div class="answerContent" v-html="item.answer.content"></div>
          </div>
          <div class="img-list" v-if="item.answer != null">
            <img class="img-item" v-for="(child, index) in util.splitImg(item.answer.images).slice(0, 4)" :key="index" :src="child.filterImage(api.ip)" >
          </div>
          <!--新增第一条回答结束-->

          <div class="img-list" v-if="item.label == 2&&item.answer == null">
            <video class="img-item" :src="item.videos"></video>
            <div class="ThisVideoPlayButton" v-if="item.label === 2 && item.coverUrl !=null">
              <img class="suspend img-responsive" :src="item.coverUrl.filterImage(api.ip)" alt="">  
            </div>
          </div>

          <!--<div class="video-cover"></div>-->

          <div class="operation-bar">
            <div class="left">
              <div class="time">{{formatting(item.createTime)}}</div>
              <div v-if="item.promot || item.promot == 1">推广</div>
            </div>
            <div class="right">
              <div style="margin-right: 10px">{{item.commentNum}}个回答</div>
              <div style="margin-right: 5px">{{item.praiseNum}}个赞</div>
              <div class="icon-div" v-if="item.userPush || item.label == 3" @click.stop="comment(item.id, item.normalQuestionTitle)">
                <i class="comment"></i>
                <span>回答</span>
              </div>
              <div class="icon-div" v-else-if="item.label == 1 || item.label == 2">
                <i class="enter"></i>
                <span>进入</span>
              </div>
            </div>
          </div>
        </div>
        <div class="bg"></div>
      </div>
    </scroller>

    <div class="foot-height"></div>
    <MyFooter />
  </div>
</template>

<script>
  import MyFooter from "../components/myFooter";
  import Search from "../components/search";
   
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
        scrollHeight: "100%",
        isRead: 0,
        config: null,
        isConfig: false,
      };
    },
    created() {
      document.title = this.$route.meta.title;
      this.api.http("post", this.api.pvUploadData, {place:2,flag:1}, (result) => {}, (error) => {});
      this.api.http("get", this.api.isRead, {}, result => {
        this.isRead = result.isread;
      }, error => {});
    },
    mounted() {
      this.scrollHeight = (window.innerHeight - 55 - 77 - 50) + "px";
    },
    updated() {
    },
    beforeRouteEnter(to,from,next){
      if(!sessionStorage.askPositon || from.path == '/'){//当前页面刷新不需要切换位置
        sessionStorage.askPositon = '';
        next();
      } else {
        next(vm => {
          if (from.name === 'answerResult') {
            if(vm && vm.$refs.myscroller){//通过vm实例访问this
              setTimeout(function () {
                vm.$refs.myscroller.scrollTo(0, sessionStorage.askPositon, false);
              },0)//同步转异步操作
            }
          }
        })
      }
    },
    beforeRouteLeave(to,from,next){//记录离开时的位置
      sessionStorage.askPositon = this.$refs.myscroller && this.$refs.myscroller.getPosition() && this.$refs.myscroller.getPosition().top;
      next()
    },
    methods: {
      link(url) {
        this.$router.push({
          path: "/index/" + url,
          query: {tab: 1}
        })
      },
      /*获取列表*/
      getData() {
        this.api.http("post", this.api.searchQuestion, {
          start: this.start,
          row: this.row,
          highlightColor: '#5FB62A',
          title: this.searchValue
        }, result => {
          if (this.start == 0) {
            this.$refs.myscroller.scrollTo(0, 0, false); //返回顶部
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
          if(this.searchValue === "*"){
           
          }else{
            var a= document.getElementsByClassName("title");
            for(var i in a){
              a[i].style.color="#555555"; 
            }
          }
        }, error => {
          this.isEnd = true;
          if (error.code == 500 && error.msg) {
            this.$toast(error.msg);
          } else if (error.code == 500 && !error.msg) {
            this.$toast("服务器错误");
          }
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
          path: "/index/answerResult",
          query: {
             questionId: item.id
          }
        });
      },
      formatting (time) {
        return this.util.formatting(time);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .foot-height {
    height: 60px;
  }
  .read{
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background: red;
    position: absolute;
    right: 22px;
    top: 10px;
  }
  .answer {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 15px;
    box-sizing: border-box;
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
          background-position: center;
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
          line-height: 24px;
          margin-bottom: 5px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          display: inline-block;
          .title_text {
            // text-align: center;
            vertical-align: middle;
            font-weight: bold;
            color: #555555;
          }
          span{
            vertical-align: middle;
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
            i.quiz {
              background: url(../assets/problem.png);
              border-radius: 4px;
              color: #fff; 
              font-style:normal;
              line-height: calc(28px / 2);
              padding: 1px;
              text-align: center;
              top: -1px;
              vertical-align: middle;
            }
          }
        }
        .content {
          max-height: 63px;
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
          display: block;
          padding-top: 5px;
          position: relative;
          /*.img-item {
            width: calc((100% - 30px) / 4);
            height: 58px;
            margin: 0 10px 10px 0;
            border-radius: 4px;
            background: #e6e6e6;
            background-size: cover !important;
            background-position: center !important;
          }*/
          video.img-item {
            width: 100%;
            height: auto;
            margin: 0 0 10px 0;
            border-radius: 4px;
            /*background: #e6e6e6;*/
            background-size: cover !important;
            background-position: center !important;
          }
          img.img-item {
            width: calc((100% - 40px) / 4);
            height: 63px;
            max-height: 63px;
            margin: 0 10px 10px 0;
            border-radius: 4px;
            object-fit: cover;
            /*background: #e6e6e6;*/
            background-size: cover !important;
            background-position: center !important;
          }
          /* .img-item:nth-child(4n) {
            margin-right: 0;
          } */
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
<style lang="css">
.answerContent p{
  font-size: 1.17rem;
}
.answer-list .item .hasAnswer_2 .answerContent p,
.pull-to-refresh-layer .answer-list .item .hasAnswer_2 .answerContent p span
{
  font-size: 1.17rem;
}
.answer-list .item .hasAnswer_2 .answerContent p {
  display: none;
}
.answer-list .item .hasAnswer_2 .answerContent p:first-child {
  display: block;
  overflow:hidden; 
  text-overflow:ellipsis;
  display:-webkit-box; 
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; 
}
.answer-list .content,.answer-list .content p,.answer-list .content p span{
  font-size: 14px !important;
  color: #999999;
  display: inline-block;
}
.answer-list .content p img,.answerContent p img{
  display:none;
}
.answer-list .content,.hasAnswer_2 p{
  display: inline-block;
}
.hasAnswer_2{
  height: max-content;
  max-height: 63px;
  font-family: PingFangSC-Light;
  font-size: 14px;
  color: #999999;
  line-height: 21px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.hasAnswer_2 img.img-item {
  width: calc((100% - 40px) / 4);
  height: 63px;
  max-height: 63px;
  margin: 0 10px 10px 0;
  border-radius: 4px;
  object-fit: cover;
  /*background: #e6e6e6;*/
  background-size: cover !important;
  background-position: center !important;
}
.ThisVideoPlayButton{
  width: 100%;
  height: calc(100%-20px);
  position: absolute;
  margin: 0;
  /*background-color: rgba(0,0,0,.2);*/
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000 !important;
  border-radius: 5px;
  /*display: block;*/
}
img.suspend{
  width: 100%;
  height: 100%;
  border-radius: 5px;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.answer-list .item .title span{
  font-size: 16px;
  color:#555 !important;
}
.answer-list .item .title span span{
  font-size: 16px;
  color:#555 !important;
}

</style>
