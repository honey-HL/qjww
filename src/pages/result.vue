<template>
  <div id="result">
    <Search :searchValue="searchValue" @searchData="searchData" />
    <scroller :style="{height : scrollHeight}" class="scroller" ref="myscroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
      <div class="hint">最佳匹配答案</div>
      <transition-group name="fade">
        <div class="row" v-for="(item, index) in items" :key="index" v-if="!item.userPush" @click="detail(item)">
          <div class="title" v-html="item.questionTitle"></div>
          
          <!--回答或者描述开始-->
          <div class="content" v-html="item.questionContent" v-if="item.answer == null"></div>
          <!--新增第一条回答-->
          <div class="hasAnswer" v-if="item.answer != null">
            <div class="answerContent" v-html="item.answer.content"></div>
            <img class="img-item" v-for="child in splitImg(item.answer.images)" :src="child" >
          </div>

          <div class="img-list" v-if="item.label == 0&&item.answer == null">
            <img class="img-item" v-for="child in splitImg(item.images)" :src="child" >  
          </div>
          <div class="img-list" v-if="item.label == 2&&item.answer == null">
            <video class="img-item" :src="item.videos"></video>
            <div class="ThisVideoPlayButton" v-if="item.label === 2 && item.coverUrl !=null">
              <img class="suspend img-responsive" :src="item.coverUrl" alt="">  
            </div>
          </div>
          <!--回答或者描述结束-->



        </div>
      </transition-group>
      <transition name="fade">
        <div class="more-hint">
          <span>{{totalNum}}</span>条相关讨论
        </div>
      </transition>
      <transition-group name="fade">
        <div v-for="(item, index) in items" :key="index" class="row" v-if="item.userPush" @click="detail(item)">
          <div class="title" v-html="item.questionTitle"></div>
          <!-- <div class="content" v-html="item.questionContent"></div>
          <div class="img-list">
            <div class="img-item" v-for="child in splitImg(item.images)" v-lazy:background-image="child">
              <img v-lazy="child" width="100%" height="100%">-->
            <!--</div>
          </div> -->

          <!--回答或者描述开始-->
          <div class="content" v-html="item.questionContent" v-if="item.answer == null"></div>
          <!--新增第一条回答-->
          <div class="hasAnswer" v-if="item.answer != null">
            <div class="answerContent" v-html="item.answer.content"></div>
            <img class="img-item" v-for="child in splitImg(item.answer.images)" :src="child" >
          </div>

          <div class="img-list" v-if="item.label == 0&&item.answer == null">
            <img class="img-item" v-for="child in splitImg(item.images)" :src="child" >  
          </div>
          <div class="img-list" v-if="item.label == 2&&item.answer == null">
            <video class="img-item" :src="item.videos"></video>
            <div class="ThisVideoPlayButton" v-if="item.label === 2 && item.coverUrl !=null">
              <img class="suspend img-responsive" :src="item.coverUrl" alt="">  
            </div>
          </div>
          <!--回答或者描述结束-->


          <div class="operation-bar">
            <div class="left">
              <div v-if="item.isUserAvatar" class="head" v-lazy:background-image="item.avatar"></div>
              <div v-if="!item.isUserAvatar" class="head" v-lazy:background-image="imgIp + item.avatar"></div>
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
    <div class="not-data">
      <div class="hint-bar">
        <img src="../assets/not.png" />
        <span>没有找到答案? 您还可以</span>
      </div>
      <div class="btn-bar">
        <router-link tag="div" to="/index/quiz">
          <span>去提问</span>
        </router-link>
        <router-link tag="div" to="/index/expert">
          <span>找专家</span>
        </router-link>
      </div>
    </div>

  </div>
</template>

<script>
  import Search from "../components/search";
  import Loading from "../components/loading";

  export default {
    name: "result",
    components: {
      Search, Loading
    },
    data() {
      return {
        imgIp: this.api.imgIp,
        items: [],
        searchValue: "",
        start: 0,
        row: 10,
        totalNum: 0,
        isEnd: false,
        scrollHeight: "100%"
      };
    },
    created() {
      document.title =this.$route.meta.title;
      this.searchValue = this.$route.query.keywords;
    },
    updated() {
      this.scrollHeight = (window.innerHeight - 52 - 88) + "px";
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
            this.$refs.myscroller.scrollTo(0, 0, false); //返回顶部
            this.items = result.data;
            this.totalNum = result.numFound;
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
          for(var i in this.items){
              if(this.items[i].avatar.indexOf("http") != -1){
                this.items[i]["isUserAvatar"] = true;
              }else{
                this.items[i]["isUserAvatar"] = false;
              };
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
      /*详情*/
      detail(item) {
        this.$store.dispatch("setAnswerDetail", item);
        this.$router.push({
          path : "/index/answerResult"
        });
      }

    },
  };
</script>

<style lang="scss" scoped>
  #result {
    height: 100%;
    position: absolute;
    width: 100%;
    overflow: hidden;
    top: 0;
    & .scroller {
      top: 70px;
      box-sizing: border-box;
      bottom: 88px;
    }
    & .hint {
      font-size: 12px;
      color: #999999;
      text-align: center;
      padding-bottom: 15px;
    }
    & .more-hint {
      text-align: center;
      padding: 15px;
      color: #999999;
      font-size: 12px;
      span {
        color: #5fb62a;
      }
    }
    & .row {
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
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
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
    .not-data {
      background: #fff;
      position: fixed;
      width: 100%;
      box-sizing: border-box;
      box-shadow: 0 4px 15px 0 #CCCCCC;
      bottom: 0;
      z-index: 1;
      padding: 10px;
      text-align: center;
      .hint-bar {
        padding-bottom: 25px;
        img {
          width: calc(32px / 2);
          height: calc(28px / 2);
          position: relative;
          top: 3px;
        }
        span {
          font-size: 12px;
          color: #555555;
        }
      }
      .btn-bar {
        padding-bottom: 10px;
        display: flex;
        justify-content: center;
        width: calc(100% - 30px);
        span {
          font-size: 12px;
          background: #63B729;
          color: #ffffff;
          padding: 10px 30px;
          border-radius: 30px;
          box-shadow: 0 5px 20px rgba(99, 183, 41, 0.3);
        }
        span:last-child {
          margin-left: 30px;
        }
      }
    }
  }
</style>
<style lang="css">
  .content p,.hasAnswer p{
    display: inline-block;
  }
  .content p img,.hasAnswer p img{
    max-height: 63px;
  }
  .hasAnswer{
    height: max-content;
    max-height: 100px;
    font-family: PingFangSC-Light;
    font-size: 14px;
    color: #999999;
    line-height: 21px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
  .hasAnswer img.img-item {
    width: calc((100% - 30px) / 4);
    height: auto;
    margin: 0 10px 10px 0;
    border-radius: 4px;
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
</style>