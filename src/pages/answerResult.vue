<template>
  <div id="result">
    <Search @searchData="searchData" />
    <scroller :style="{height : scrollHeight}" class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
      <div class="row first">
        <div class="title">
          <i class="badge quiz" v-if="detail.userPush">提问</i>
          <i class="badge" v-else :class="{img: detail.label == 1, video: detail.label == 2, problem: detail.label == 3}"></i>
          <span v-html="detail.questionTitle"></span>
        </div>
        <div class="img-list">
            <video class="img-item" id="videoPlay" :src="detail.videos" controls :poster="detail.coverUrl" v-if="detail.videos != null"></video>
            <img class="img-item" v-for="child in splitImg(detail.images)" :src="child" alt="" v-if="detail.userPush" @click="showImgSlide(detail.images)">  
        </div>
        <div class="content" v-html="detail.questionContent" @click="showImgSlide(detail.images)"></div>
        <!-- <div class="video-cover"></div> -->
        <div class="operation-bar">
          <div class="left">
            <div class="head" v-lazy:background-image="detail.avatar"></div>
            <div v-if="detail.userPush" class="name">{{!detail.anonymity ? detail.nickName : '匿名'}}</div>
          </div>
          <div class="right">
            <div class="report" @click="report">
              <img src="../assets/report.png">
              <span>举报</span>
            </div>
          </div>
        </div>
      </div>
      <div class="title-num">
        <img src="../assets/comment.png">
        <span>{{totalNum}}</span>个回答
      </div>
      <transition-group name="fade">
        <div class="row" v-for="(item,index) in items" :key="index">
          <div class="content" v-html="item.content" @click="showUserAnswerImgSlide(item)"></div>
          <div class="img-list" @click="showUserAnswerImgSlide(item)">
            <img class="img-item" v-for="child in splitImg(item.images)" :src="child" alt="">
          </div>
          <!-- <div class="video-cover"></div> -->
          <div class="operation-bar">
            <div class="left">
              <div class="head" v-lazy:background-image="item.userAvatar" v-if="item.isUserAvatar"></div>
              <div class="head" v-lazy:background-image="imgIp + item.userAvatar" v-if="!item.isUserAvatar"></div>
              <div class="name">{{item.userNickName}}</div>
              <div class="time">{{formatting(item.createTime)}}</div>
            </div>
            <div class="right">
              <transition name="fade">
                <div class="zan" @click="praise(item.id)">
                  <img src="../assets/news-zan.png" v-if="item.praise">
                  <img src="../assets/zan.png" v-else>
                  <span>{{item.praiseNum}}</span>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition-group>
    </scroller>
    <div class="footer-bar">
      <div class="btn" @click="answer">我来回答</div>
      <transition name="fade">
        <div class="collect" @click="collect" v-if="detail.collection">
          <img src="../assets/collect-active.png">
          <div class="name active">已收藏</div>
        </div>
        <div class="collect" @click="collect" v-else>
          <img src="../assets/collect.png">
          <div class="name">收藏该问题</div>
        </div>
      </transition>

    </div>
    <div class="swiperShell" v-if="isShowSwiperImgShow" @click="clickCloseShowSwiper">
      <div class="swiper-container" id="swiperImgShow">
        <div class="swiper-wrapper"><div class="swiper-slide" v-for="child in splitImg(showImgSlideArr)"><img class="img-responsive" :src="child" alt=""/></div></div>
        <div class="swiper-pagination" id="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import "swiper/dist/css/swiper.css";
  import Swiper from "swiper";
  import Search from "../components/search";

  export default {
    name: "answerResult",
    data() {
      return {
        imgIp: this.api.imgIp,
        items: [],
        detail: null,
        searchValue: "",
        start: 0,
        row: 10,
        totalNum: 0,
        isEnd: false,
        scrollHeight: "100%",
        code: this.util.getUrlParam("code"),
        user: { phone: "", code: "", openId: "",nickName: "", avatar: "" },
        isShowSwiperImgShow:false,
        showImgSlideArr:null,
      };
    },
    components: {
      Search
    },
    created() {
      this.detail = this.$store.state.answerDetail;
      if (this.detail == null) {
        let url = window.location.href;
        let a = url.substring(url.lastIndexOf('=')+1, url.length); 
        this.api.http("post", this.api.findById, {id: a}, (result) => {

          this.detail = result.question;

        }, (error) => {})
      }
      if(this.detail.avatar.indexOf("http") != -1){
        this.detail.avatar = this.imgIp+this.detail.avatar;
      }else{
        this.detail.avatar = this.detail.avatar;
      };
    },
    mounted() {
      this.scrollHeight = (window.innerHeight - 52 - 54) + "px";
      
    },
    updated() {
		  this.newSwiper();
	  },

    methods: {

       newSwiper:function (){ new Swiper(".swiper-container", {
            pagination: {
                el: '.swiper-pagination',
            },
            slidesPerView: 1,
            paginationClickable: true,
            loop: true,
            autoplay: true,
            disableOnInteraction:false,
          });
      },
      answer() {
        this.$router.push({
          path: "/index/icomeAnswer",
          query: {keywords:this.detail.questionTitle,questionId: this.detail.id}
        })
      },
      /*获取列表*/
      getData() {
        this.api.http("post", this.api.findByQuestion, {
          pageNo: this.start,
          pageSize: this.row,
          questionId: this.detail.id
        }, result => {
          if (this.start == 1) {
            this.items = result.data;
            this.totalNum = result.allNum;
            if (result.data.length == 0) {
              this.isEnd = true;
            }
          }
          else {
            if (result.data.length == 0) {
              this.start--;
              this.isEnd = true;
            }
            else {
              result.data.forEach(item => {
                this.items.push(item);
              })
            }
          }
          for(var i in this.items){
              if(this.items[i].userAvatar.indexOf("http") != -1){
                this.items[i]["isUserAvatar"] = true;
              }else{
                this.items[i]["isUserAvatar"] = false;
              };
          }
        }, error => {
          console.log(error);
          if(error.code == 1005){
            this.$router.push({path: '/index/login'});
          }
        });
      },
      /*下拉刷新*/
      refresh(done) {
        setTimeout(() => {
          this.start = 1;
          this.getData();
          done();
        }, 1000);
      },
      /*上拉刷新*/
      infinite(done) {
        setTimeout(() => {
          this.start++;
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
        this.$router.push({ path: '/index/result?keywords=' + value });
      },
      /*赞*/
      praise(id) {
        // if (this.config == null) {
        //   this.$router.push({path: '/index/login'});
        //   return;
        // }
        if (this.config != null && this.config.isLike == 0) {
          this.$toast("对不起，您暂无权限点赞");
          return;
        }
        this.api.http("post", this.api.praise, { answerId: id, }, result => {
          for (let i = 0; this.items.length; i++) {
            if (this.items[i].id == id) {
              this.items[i].praiseNum = this.items[i].praise ? this.items[i].praiseNum - 1 : this.items[i].praiseNum + 1;
              this.items[i].praise = !this.items[i].praise;
              break;
            }
          }
        }, error => {
          console.log(error);
        });
      },
      /*收藏*/
      collect() {
        this.api.http("post", this.api.collectionSave, { questionId: this.detail.id, }, result => {
          this.detail.collection = !this.detail.collection;
          //this.$store.dispatch("setAnswerDetail", this.detail);
          this.$toast(this.detail.collection ? "收藏成功" : "取消成功");
        }, error => {
          console.log(error);
        });
      },
      /*举报*/
      report() {
        this.$router.push({
          path: "/index/report"
        });
      },
      formatting (time) {
        return this.util.formatting(time);
      },
      /*显示这个图片滑动查看模块*/
      showImgSlide(data){
        if(data==null||data==""){
          this.isShowSwiperImgShow = false;
        }else{
          this.isShowSwiperImgShow = true;
        }
        this.showImgSlideArr=this.detail.images;
      },
      /*隐藏这个图片滑动查看模块*/
      clickCloseShowSwiper(){
        this.isShowSwiperImgShow = false;
      },
      showUserAnswerImgSlide(data){
        var showImgSlideArrData=[],showImgSlideString;
        if(data.images == null||data.images==""){
          var imgReg = /<img.*?(?:>|\/>)/gi;
          var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
          var arr = (data.content).match(imgReg);
          if(arr==""||arr==null){
            this.isShowSwiperImgShow = false;
          }else{
            for (var i = 0; i < arr.length; i++) {
              var src = arr[i].match(srcReg);
              showImgSlideArrData.push(src[1]);
            }
            showImgSlideString=showImgSlideArrData.join(",");
            this.showImgSlideArr=showImgSlideString;
            this.isShowSwiperImgShow = true;
          }  
        }else{
          this.showImgSlideArr=data.images;
          this.isShowSwiperImgShow = true;
        }
      },
    },
    computed: {}
  };
</script>

<style lang="scss" scoped>
  #result {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    & .scroller {
      top: 52px;
      box-sizing: border-box;
      height: 100%;
    }
    & .row.first {
      margin-top: 10px;
      &::before {
        height: 0;
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
      & .more-hint {
        text-align: center;
        padding-top: 10px;
        color: #999999;
        span {
          color: #5fb62a;
        }
      }
      .title {
        font-size: 16px;
        color: #000;
        line-height: 22px;
        margin-bottom: 5px;
        font-family: 微软雅黑;
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
          background: #5FB62A;
          border-radius: 4px;
          color: #fff; font-style:normal;
          line-height: calc(28px / 2);
          padding: 1px;
          text-align: center;
          top: -1px;
        }
      }
      .content {
        color: #555555;
        font-size: 16px;
        line-height: 21px;
        margin-bottom: 10px;
      }
      .img-list {
        display: contents;
        /*flex-flow: wrap;*/
        padding-top: 5px;
        position: relative;
        /*.img-item {
          width: calc((100% - 10px) / 2);
          height: 80px;
          margin: 0 10px 10px 0;
          border-radius: 4px;
          background: #e6e6e6;
          background-size: cover !important;
          background-position: center !important;
          &:nth-child(2n) {
            margin-right: 0;
          }
        }*/

        video.img-item {
            width: 100%;
            height: auto;
            margin: 0 10px 10px 0;
            border-radius: 4px;
            /*background: #e6e6e6;*/  
            background-size: cover !important;
            background-position: center !important;
          }
          img.img-item {
            /*width: calc((100% - 10px) / 2);*/
            max-height: 63px;
            margin: 0 10px 10px 0;
            border-radius: 4px;
            background: #e6e6e6;
            background-size: cover !important;
            background-position: center !important;
            &:nth-child(2n) {
              margin-right: 0;
            }
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
        align-items: center;
        padding-top: 10px;
        .left {
          width: 60%;
          display: flex;
          align-items: center;
          .head {
            width: 26px;
            height: 26px;
            border-radius: 50%;
            background-size: cover !important;
            background-position: center !important;
            /*background: #ddd;*/
          }
          .name {
            padding-left: 5px;
            color: #9a9a9a;
            max-width: calc(100% - 100px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .time {
            color: #9a9a9a;
            margin-left: 15px;
          }
        }
        .right {
          width: 40%;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .comment {
            display: table-cell;
            vertical-align: middle;
          }
          img {
            width: calc(26px / 2);
            height: calc(26px / 2);
            margin-left: 15px;
            position: relative;
            top: 2px;
          }
          span {
            color: #666;
            position: relative;
          }
        }
      }

    }
    .title-num {
      position: relative;
      background: #fff;
      padding: 15px;
      color: #666;
      margin-top: 10px;
      img {
        width: calc(26px / 2);
        height: calc(26px / 2);
        vertical-align: center;
        position: relative;
        top: 2px;
      }
      span {
        color: #5FB62A;
      }
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
    }
    .footer-bar {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 54px;
      line-height: 54px;
      box-shadow: 0 4px 20px 0 #CCCCCC;
      background: #fff;
      text-align: center;
      .btn {
        display: inline-block;
        background-image: linear-gradient(-90deg, #5FB62A 0%, #78BC28 100%);
        border-radius: 100px;
        box-shadow: 0 2px 8px 0 #5FB62A;
        height: 30px;
        width: 150px;
        text-align: center;
        line-height: 30px;
        color: #fff;
      }
      .collect {
        width: 120px;
        position: absolute;
        right: 0;
        top: 0;
        text-align: center;
        img {
          width: 13px;
          height: 13px;
          position: relative;
          top: -6px;
        }
        .name {
          color: #999999;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translate(-50%, 0);
        }
        .name.active{
          color: #5FB62A;
        }
      }
    }
  }

</style>
<style lang="css">
  /*可能有用的css,暂时未用*/
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
  .swiperShell,#swiperImgShow{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
    background-color: rgba(0,0,0,0.6);
    top: 0;
  }
  #swiperImgShow .swiper-slide>img{
    max-width: 100%;
    max-height: 100%;
    position: absolute;
    margin: auto;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  #swiper-pagination{
    width: 100%;
    height: 10px;
    bottom: 10px;
  }
  #swiper-pagination>.swiper-pagination-bullet-active{
    background-color: #fff;
  }

</style>