<template>
  <div class="home">
    <transition v-if="adShow" name="fade">
      <div v-if="adShow && adItem && adItem.status == 1" @click="adDetail(2)" class="ad-flex" v-lazy:background-image="imgIp + adItem.img">
        <span class="btn" @click.stop="hideAd">跳过 {{timeCount}}s</span>
      </div>
    </transition>
    <div v-if="!adShow" id="top" class="top">
      <img class="logo" v-if="logo != null && logo.status == 1" @click="adDetail(0)" v-lazy="imgIp + logo.img">
      <img class="logo" v-else src="../assets/qjww.png">
      <p class="title">手机问题，就来千机问问</p>
      <div class="search-bar">
        <img @click="searchEnterFun" src="../assets/search.png" />
        <input @blur="blurInput" @focus="focusInput" type="search" placeholder="请输入您遇到的手机问题" maxlength="30" v-model="searchValue" @keyup.enter="searchEnterFun">
      </div>
      <div class="solve">
        已有
        <span>{{totalNumber}}</span> 个问题被解决
      </div>
    </div>
    <div v-if="!adShow" class="bottom-bar" v-show="isShow">
      <div class="title">不止解答·直至解决</div>
      <div class="ad" v-if="adBottom != null && adBottom.status == 1" @click="adDetail(1)" v-lazy:background-image="imgIp + adBottom.img"></div>
    </div>
    <MyFooter v-if="!adShow" />

  </div>
</template>

<script>
  import MyFooter from "../components/myFooter";

  export default {
    name: "home",
    components: {
      MyFooter
    },
    data() {
      return {
        imgIp: this.api.imgIp,
        searchValue: "",
        top:50,
        adBottom: null,
        logo: null,
        isShow: true,
        adItem: null,
        adImg: "http://lofter.nos.netease.com/sogou-Z0dOZDFfa3ByVzBPRThmVUM1SHphUmxxNGlIc2lTWXdSWTRuOUxmRTdfUW5zUTN5MTNEWDJOMGx1c3ZvZTBaOQ.jpg",
        timeCount: 5,
        setInterval: null,
        adShow: true,
        totalNumber: 0
      };
    },
    created() {
      let shareUrl = this.$store.state.sharedUrl
      if(shareUrl != null && shareUrl.length > 0){
        this.$store.dispatch("setSharedUrl",'')
        this.$router.push({path: shareUrl})
        return
      }
      //console.log(sessionStorage.getItem("isShowAd"));
      document.title =this.$route.meta.title;
      this.adShow = sessionStorage.getItem("isShowAd") == null ? true : sessionStorage.getItem("isShowAd") == "false" ? false : true;
    },
    mounted() {
      if (this.adShow) {
        this.setInterval = setInterval(() => {
          if (this.timeCount == 1) {
            clearInterval(this.setInterval);
            this.adShow = false;
            sessionStorage.setItem("isShowAd", "false");
          }
          this.timeCount--;
        }, 1000);
      }
      this.api.http("post", this.api.getAdList, {position: 0}, (result) => {
        this.logo = result;
      }, (error) => {});

      this.api.http("post", this.api.getAdList, {position: 1}, (result) => {
        this.adBottom = result;
      }, (error) => {});
      this.api.http("post", this.api.getAdList, {position: 2}, (result) => {
        this.adItem = result;
      }, (error) => {});
      this.api.http("get", this.api.countSolveQuestion, {}, (result) => {
        this.totalNumber = result;
      }, (error) => {});

      this.api.http("post", this.api.pvUploadData, {place:0,flag:1}, (result) => {}, (error) => {});
      this.api.http("post", this.api.pvUploadData, {place:1,flag:1}, (result) => {}, (error) => {});

      this.api.http("post", this.api.pvUploadData, {place:3,flag:1}, (result) => {}, (error) => {});
    },
    methods: {
      searchEnterFun(e) {
        let keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13 || e.type === "click") {
          //this.$store.dispatch("setSearchValue", this.searchValue);
          if (this.searchValue.trim() == "") {
            this.searchValue = "";
            this.$toast("请输入问题内容");
          }
          else if (this.util.isEmoji.test(this.searchValue)) {
            this.$toast("暂不支持emoji");
            this.searchValue = "";
          }
          else {
            this.$router.push({ path: '/index/result?keywords=' + this.searchValue });
          }
        }
      },
      focusInput() {
        this.isShow = false;
      },
      blurInput() {
        this.isShow = true;
      },
      adDetail(type) {
        if (type == 0) {
          this.api.http("post", this.api.pvUploadData, {place:1,flag:0}, (result) => {}, (error) => {});
          if (this.logo.type == 1) {
            location.href = this.logo.url;
          }
          else {
            this.$store.dispatch("setAdDetail", this.logo);
            this.$router.push({ path: "/index/content" });
          }
        }
        else if (type == 1) {
          this.api.http("post", this.api.pvUploadData, {place:1,flag:0}, (result) => {}, (error) => {});
          if (this.logo.type == 1) {
            location.href = this.adBottom.url;
          }
          else {
            this.$store.dispatch("setAdDetail", this.adBottom);
            this.$router.push({ path: "/index/content" });
          }
        }
        else {
          this.api.http("post", this.api.pvUploadData, {place:3,flag:0}, (result) => {}, (error) => {});
          if (this.adItem.type == 1) {
            location.href = this.adItem.url;
          }
          else {
            this.$store.dispatch("setAdDetail", this.adItem);
            this.$router.push({ path: "/index/content" });
          }
        }
      },
      hideAd () {
        sessionStorage.setItem("isShowAd", "false");
        this.adShow = false;
      }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus();
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .home {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ad-flex{
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background: #ddd;
      background-position: center !important;
      background-size: cover !important;
      span.btn{
        background: rgba(0, 0, 0, 0.5);
        padding: 5px 20px;
        color: #fff;
        border-radius: 50px;
        position: absolute;
        bottom: 15px;
        right: 15px;
      }
    }
    .ad-flex.zoomOut{
      transform: translate(-100%, 0);
    }
    .top{
      padding-top: 50px;
    }
    .logo {
      display: block;
      margin: 0 auto;
      width: calc(304px / 2);
      height: calc(64px / 2);
    }
    .title {
      font-size: 13px;
      color: #999999;
      margin-top: 5px;
      text-align: center;
    }

    .search-bar {
      width: 80%;
      margin: 0 auto;
      position: relative;
      margin-top: 30px;
      img {
        width: calc(34px / 2);
        height: calc(34px / 2);
        position: absolute;
        top: 11.5px;
        left: 15px;
      }
      input {
        width: 100%;
        height: 40px;
        font-size: 12px;
        line-height: 40px;
        border: 1px solid rgba(153, 153, 153, 0.1);
        border-radius: 30px;
        padding-left: 45px;
        box-sizing: border-box;
        outline: none;
        color: #5FB62A;
      }
    }
    .solve {
      text-align: center;
      padding-top: 10px;
      font-size: 12px;
      color: #666;
      span {
        color: #60B72B;
      }
    }
    .bottom-bar {
      position: absolute;
      bottom: 60px;
      width: 100%;
      text-align: center;
      & .title {
        font-size: 18px;
        letter-spacing: 2px;
        color: #666;
        margin-bottom: 10px;
      }
      & .ad {
        display: inline-block;
        border-radius: 6px;
        width: calc(670px / 2);
        max-width: calc(100% - 20px);
        margin: 0 auto;
        height: calc(180px / 2);
        background-size: cover !important;
        background-position: center !important;
        background: #ddd;
      }

    }
  }
</style>
