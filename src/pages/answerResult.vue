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
            <video class="img-item" id="videoPlay" controls :poster="detail.coverUrl" v-if="detail.videos && detail.videos !== ''">
              <source :src="detail.videos" type="video/mp4" />
            </video>
            <img class="img-item" v-for="(child, index) in util.splitImg(detail.images)" :key="index" :src="child" alt="" v-if="detail && detail.userPush">
        </div>
         <!-- <div id='video'>
            <video class="img-item" id="videoPlay1" v-if="detail.videos && detail.videos !== ''"></video>
            <img class="img-item" v-for="(child, index) in util.splitImg(detail.images)" :key="index" :src="child" alt="" v-if="detail.images && detail.images.length > 0">
        </div> -->
        <div class="content backstagePush" v-if="!detail.userPush" v-html="detail.questionContent"></div>
        <div class="content userPush" v-if="detail.userPush" v-html="detail.questionContent"></div>
        <!-- <div class="video-cover"></div> -->
        <div class="operation-bar">
          <div class="left">
            <div v-if="detail.avatar" class="head" v-lazy:background-image="detail.avatar.filterImage(api.ip)"></div>
            <div v-if="!detail.avatar" class="head" v-lazy:background-image="detail.avatar"></div>
            <div v-if="detail.anonymity" class="name">匿名</div>
            <div v-else class="name">{{detail.nickName ? detail.nickName : '匿名'}}</div>
          </div>
          <div class="right">
            <div class="report" @click="report">
              <span class="report_img"></span>
              <span>举报</span>
            </div>
          </div>
        </div>
      </div>
      <div class="title-num">
        <span class="comment_img"></span>
        <span>{{totalNum}}</span>个回答
      </div>
      <transition-group name="fade">
        <div class="row" v-for="(item,index) in items" :key="index">
          <div class="content backstagePushAnswer" v-html="item.content"></div>
          <div class="img-list" v-if="item.userPush">
            <img class="img-item" v-for="(child, index) in util.splitImg(item.images)" :key="index" :src="child" alt="">
          </div>
          <!-- <div class="video-cover"></div> -->
          <div class="operation-bar">
            <div class="left">
              <div class="head" v-lazy:background-image="item.userAvatar.filterImage(api.ip)" v-if="item.isUserAvatar"></div>
              <div class="head" v-lazy:background-image="item.userAvatar.filterImage(api.ip)" v-if="!item.isUserAvatar"></div>
              <div v-if="item.anonymity" class="name">匿名</div>
              <div v-else class="name">{{item.userNickName ? item.userNickName : '匿名'}}</div>
              <div class="time">{{formatting(item.createTime)}}</div>
            </div>
            <div class="right">
              <transition name="fade">
                <div class="zan" @click="praise(item.id)">
                  <span class="zan_green" v-if="item.praise"></span>
                  <span class="zan_gray" v-else></span>
                  <span>{{item.praiseNum}}</span>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </transition-group>
    </scroller>
    <div class="footer-bar">
      <div v-if="detail.auth == 1" class="btn" @click="letMeAnswer">我来回答</div>
      <div v-else class="gray_btn" @click="letMeAnswer">我来回答</div>
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
        <div class="swiper-wrapper"><div class="swiper-slide" v-for="(child, index) in showImgSlideArr" :key="index"><img class="img-responsive" :src="child" alt=""/></div></div>
        <div class="swiper-pagination" id="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import "swiper/dist/css/swiper.css";
  // import Swiper from "swiper";
  import Swiper from "swiper/dist/js/swiper.min.js";
  import Search from "../components/search";
  import routers from "../router/index"

  export default {
    name: "answerResult",
    data() {
      return {
        imgIp: this.api.imgIp,
        items: [],
        detail: {},
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
        GoSlideToNub:0,
        // Swiper: '',
        isLogin: Number
      };
    },
    watch:{
        detail:{
          handler(curVal,oldVal) {
            console.log(curVal)
            if(curVal != null){
              let images = this.util.splitImg(curVal.images)
              let shareImage = ""
              if(images != null && images.length > 0){
                shareImage = images[0].filterImage(this.api.ip)
              }
              let context = curVal.questionContent ? curVal.questionContent.formatHtml(): ""
              let shareData =  {
                title: curVal.questionTitle,
                desc: context,
                link: window.location.href.split(/[#?]/)[0] + 'static/share?questionId=' + curVal.id,
                image: shareImage
              }
              this.$store.dispatch("setShare",shareData);
            }
          },
          deep: true
        },
    },
    components: {
      Search
    },
    created() {
      this.checkLogin();
      console.log('this.$route.query.questionId==>', this.$route.query.questionId)
      this.api.http("post", this.api.findById, {id: this.$route.query.questionId}, (result) => {
        this.detail = result.question;
        if (this.detail && this.detail.id) {
          console.log('this.detail.id', this.detail.id);
          localStorage.setItem("questionId", this.detail.id);
        }
        this.$store.dispatch("setAnswerDetail", this.detail);
        // if (this.detail && this.detail.videos && this.detail.videos.length > 0) {
        //   this.videoPlay(this.detail);
        // }
        this.detail.collection = result.isCollection;
        document.title = this.detail.questionTitle;
      }, (error) => {
        if (error.code == 1002) {
          this.$toast("对不起，问题正在审核！");
          this.$router.push({path: "/index/answer"});
        } else {
          this.$toast(error.msg);
        }
      })
    },
    mounted() {
      this.scrollHeight = (window.innerHeight - 52 - 54) + "px";
    },
    updated() {
      this.$nextTick(() => {
        let that = this;
        $("img").on('click',function(){
          let imgSrcArr = [],imgArr;
          let thisImgAttr = $(this).attr("src");
          if($(this).parents().hasClass("backstagePush")){
            imgArr = $(this).parents(".backstagePush").children("p").children("img");
          }else if($(this).parents().hasClass("userPush")){
            imgArr = $(this).parents(".userPush").children("p").children("img");
          }else if($(this).parents().hasClass("img-list")){
            imgArr = $(this).parents(".img-list").children("img");
          }else if($(this).parents().hasClass("backstagePushAnswer")){
            imgArr = $(this).parents(".backstagePushAnswer").children("p").children("img");
          }
          if (imgArr && imgArr.length > 0) {
            for(let i=0;i<imgArr.length;i++){
              if(thisImgAttr == imgArr[i].src){
                that.GoSlideToNub = i+1;
              }
              imgSrcArr.push(imgArr[i].src.filterImage(that.api.ip));
            }
          }

          that.showImgSlideArr = imgSrcArr;
          that.isShowSwiperImgShow = true;
          return false;
        })
      });

      this.newSwiper();
      // if(this.Swiper != null)
      //  this.Swiper.slideTo(this.GoSlideToNub,0,true);
	  },

    methods: {
      checkLogin () {
        let accessToken = localStorage.getItem("accessToken");
        if (accessToken && accessToken.length > 0) {
          console.log('已登录')
          this.isLogin = 1
        } else {
          console.log('未登录')
          this.isLogin = 0
        }
        console.log('accessToken=======>', accessToken);
      },
      newSwiper (){
        this.Swiper = new Swiper(".swiper-container", {
          pagination: {
            el: '.swiper-pagination',
          },
          slidesPerView: 1,
          paginationClickable: true,
          loop: true,
        });
      },
      letMeAnswer() {
        if (this.detail && Number(this.detail.auth) === 1) {
          this.$router.push({
            path: "/index/icomeAnswer",
            query: {keywords:this.detail.questionTitle,questionId: this.detail.id, isLogin: this.isLogin}
          })
        } else {
          this.$toast("该问题不允许回答");
        }
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
            if (result && result.data && result.data.length == 0) {
              this.isEnd = true;
            }
          }
          else {
            if (result && result.data && result.data.length == 0) {
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
              if(this.items[i].content.indexOf("img") != -1){
                this.items[i].userPush=false;
              }else{
                this.items[i].userPush=true;
              };

              if(this.items[i].userAvatar.indexOf("http") != -1){
                this.items[i]["isUserAvatar"] = true;
              }else{
                this.items[i]["isUserAvatar"] = false;
              };
          }
          if (!result.status) {
            this.isEnd = true;
          }
        }, error => {
          this.isEnd = true;
          this.$toast(error.msg);
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
      /*接收搜索参数*/
      searchData(value) {
        this.$router.push({ path: '/index/result?keywords=' + value });
      },
      /*赞*/
      praise(id) {
        if (this.isLogin == 1) {
          console.log('已登录')
          this.goPraise(id);
        } else {
          console.log('wei登录')
          console.log('wei登录===>this.detail.id', this.detail.id)
          this.$router.replace({ 
            path: '/index/login', 
            query: { redirect: '/index/answerResult' }
          })
          this.goPraise(id);
        }
      },
      goPraise (id) {
        if (this.config != null && this.config.isLike == 0) {
          this.$toast("对不起，您暂无权限点赞");
          return;
        }
        this.api.http("post", this.api.praise, { answerId: id }, result => {
          if (this.items.length > 0) {
            for (let i = 0; this.items.length; i++) {
              if (this.items[i].id == id) {
                this.items[i].praiseNum = this.items[i].praise ? this.items[i].praiseNum - 1 : this.items[i].praiseNum + 1;
                this.items[i].praise = !this.items[i].praise;
                break;
              }
            }
          }
        }, error => {
          this.$toast(error.msg);
          console.log(error);
        });
      },
      /*收藏*/
      collect() {
        if (this.isLogin == 1) {
          console.log('已登录')
          this.goCollect();
        } else {
          console.log('wei登录')
          console.log('wei登录===>this.detail.id', this.detail.id)
          this.$router.replace({ 
            path: '/index/login', 
            query: { redirect: '/index/answerResult' }
          })
          this.goCollect();
        }
      },
      goCollect () {
        this.api.http("post", this.api.collectionSave, { questionId: this.detail.id, }, result => {
          this.detail.collection = !this.detail.collection;
          //this.$store.dispatch("setAnswerDetail", this.detail);
          this.$toast(this.detail.collection ? "收藏成功" : "取消成功");
        }, error => {
          this.$toast(error.msg);
          console.log(error);
        });
      },
      /*举报*/
      report() {
        this.$router.replace({
          path: "/index/report",
          query: {
            questionTitle: this.detail.questionTitle,
            isLogin: this.isLogin,
            id: this.detail.id
          }
        });
      },
      formatting (time) {
        return this.util.formatting(time);
      },
      /*隐藏这个图片滑动查看模块*/
      clickCloseShowSwiper(){
        this.isShowSwiperImgShow = false;
      },
      configShare(data){

      }
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
      .title , .title span{
        font-size: 16px;
        color: #555555;
        line-height: 24px;
        margin-bottom: 5px;
        font-family: PingFangSC-Semibold;
        span {
          font-weight: bold;
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
            /* &:nth-child(2n) {
              margin-right: 10;
            } */
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
            background: #ddd;
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
      .gray_btn {
        display: inline-block;
        background-image: linear-gradient(-90deg, gray 0%, gray 100%);
        border-radius: 100px;
        box-shadow: 0 2px 8px 0 gray;
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
  .backstagePush p img{
    display: block !important;
    max-height: none !important;
  }
  .backstagePushAnswer p{
    color: rgba(85,85,85,200) !important;
    font-family: PingFangSC-Light !important;
    font-weight:normal !important;
    width:100% !important;
    font-size:16px !important;
    font-weight:300 !important;
    line-height:21px !important;
    margin: 4px 0px 4px 0px !important;
  }
  .backstagePushAnswer img{
    display: block !important;
    max-height: none !important;
    margin: 4px 0px 4px 0px !important;
  }
  .backstagePush p{
    font-size:16px !important;
    display: block !important;
  }
  .zan_green {
    background: url(../assets/news-zan.png);
    background-size: contain;
    object-fit: cover;
    display: inline-block;
    width: 13px;
    height: 13px;
  }
  .zan_gray {
    background: url(../assets/zan.png) no-repeat;
		background-size: contain;
    object-fit: cover;
    display: inline-block;
    width: 13px;
    height: 13px;
  }
  .report_img {
    background: url(../assets/report.png) no-repeat;
		background-size: contain;
    object-fit: cover;
    display: inline-block;
    width: 13px;
    height: 13px;
  }
  .comment_img {
    background: url(../assets/comment.png) no-repeat;
		background-size: 100%;
    object-fit: cover;
    display: inline-block;
    width: 13px;
    height: 13px;
    position: relative;
    top: 4px;
  }
</style>
