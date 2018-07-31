<template>
  <div class="home">
    <div id="top" class="top">
      <img class="logo" src="../assets/qjww.png">
      <p class="title">手机问题，就来千机问问</p>
      <div class="search-bar">
        <img src="../assets/search.png" />
        <input @blur="blurInput" @focus="focusInput" type="search" placeholder="请输入您遇到的手机问题" maxlength="30" v-model="searchValue" @keyup.enter="searchEnterFun">
      </div>
      <div class="solve">
        已有
        <span>5466545</span>个问题被解决
      </div>
    </div>
    <div class="bottom-bar" v-show="isShow">
      <div class="title">不止解答·直至解决</div>
      <div class="ad" v-lazy:background-image="imgIp + adBottom.img"></div>
    </div>
    <MyFooter />

  </div>
</template>

<script>
  import MyFooter from "@/components/myFooter";

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
        adBottom: {},
        logo: {},
        isShow: true,
      };
    },
    created() {
      this.top = window.innerHeight;
      this.api.http("get", this.api.getAdList, {position: 1, pageNO: 1, pageSize: 1}, (result) => {
        this.adBottom = result.records[0];
      }, (error) => {})
    },
    methods: {
      searchEnterFun(e) {
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13 && this.searchValue != "") {
          //存入状态当中
          //this.$store.dispatch("setSearchValue", this.searchValue);
          this.$router.push({ path: '/index/result?keywords=' + this.searchValue });
        }
        else {
          this.$toast("请输入问题内容");
        }
      },
      focusInput() {
        this.isShow = false;
      },
      blurInput() {
        this.isShow = true;
      },
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
        border: 1px solid #e1e1e1;
        border-radius: 30px;
        padding-left: 45px;
        box-sizing: border-box;
        outline: none;
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
        width: calc(692px / 2);
        max-width: calc(100% - 20px);
        margin: 0 auto;
        height: calc(242px / 2);
        background-size: cover !important;
        background-origin: center !important;
        background: #ddd;
      }

    }
  }
</style>
