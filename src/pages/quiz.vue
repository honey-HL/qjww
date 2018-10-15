<template>
  <div class="quiz">
    <!-- <Search @searchData="searchData" /> -->
    <div class="content">
      <!-- <div class="hint">您可以继续搜索您遇到的手机问题</div> -->
      <input type="text" placeholder="请输入标题" maxlength="50" v-model="quiz.title">
      <div class="text-div">
        <textarea name="" id="" cols="30" rows="10" placeholder="问题描述（选填）" maxlength="500" v-model="quiz.content"></textarea>
        <span class="num">{{quiz.content.length}}
                    <span class="font-hint">字</span>
                </span>
      </div>
      <div class="row">
        <div class="item" v-for="(item, index) in images" :key="index" v-lazy:background-image="item.url.filterImage(api.ip)">
          <i class="del" @click="delImg(item.fileName)"></i>
        </div>
        <div v-if="config != null && config.isPush == 0" @click="check" class="item add-icon"></div>
        <UploadFile @uploadCall="onRead" v-else-if="images.length < 8">
          <div class="item add-icon"></div>
        </UploadFile>
      </div>
      <div class="num-hint">最多可上传8张</div>
      <div class="anonymous">
        <i @click="quiz.isAnonymity = !quiz.isAnonymity" :class="{active: quiz.isAnonymity}"></i>
        <span @click="quiz.isAnonymity = !quiz.isAnonymity">匿名提问</span>
      </div>
      <div class="btn">
        <span v-if="quiz.title != ''" class="active" @click="submit">发表提问</span>
        <span v-else>发表提问</span>
      </div>
    </div>

    <Loader v-if="isLoading" title="提交中"/>

    <transition name="fade">
      <div class="mask" v-if="isShow">
        <div class="login-bg">
          <div class="title">提交成功</div>
          <div class="success" v-if="score > 0">提问积分
            <span>+</span>
            <span>{{score}}</span>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import Search from "../components/search"
  import Loader from "../components/loader"
  import UploadFile from "../components/uploadFile"
  export default {
    name: "quiz",
    components: {
      Search, Loader, UploadFile
    },
    data() {
      return {
        quiz: {
          title: "",
          content: "",
          images: [],
          isAnonymity: false
        },
        images: [],
        isLoading: false,
        isShow: false,
        score: 0,
        config: null,
      }
    },
    watch: {
      'quiz.content': function (content) {
        if (content.length >= 500) {
          this.$toast("文本字数不能超过500");
        }
      }
    },
    created() {
      document.title =this.$route.meta.title;
      this.getGroupAuth();
    },
    methods: {
      /**获取权限配置*/
      getGroupAuth() {
        this.api.http("post", this.api.getGroupAuth, {}, (result) => {
          this.config = result;
        }, (error) => {})
      },
      check() {
        this.$toast("对不起，您暂无权限提问");
      },
      onRead(image) {
        this.images.push(image);
      },
      /*接收搜索参数*/
      searchData(value) {
        this.$router.push({ path: '/index/result?keywords=' + value });
      },
      /*提交*/
      submit() {
        if (this.config != null && this.config.isPush == 0) {
          this.$toast("对不起，您暂无权限提问");
          return;
        }
        if (this.util.empty(this.quiz.title)) {
          this.$toast("请输入标题");
          return;
        }
        else if (this.util.isEmoji.test(this.quiz.title)) {
          this.$toast("暂不支持emoji");
          return;
        }
        else if (this.quiz.title.length > 25) {
          this.$toast("标题不能超过25个字符");
          return;
        }
        else if (this.quiz.content != "" && this.util.isEmoji.test(this.quiz.content)) {
          this.$toast("暂不支持emoji");
          return;
        }
        this.isLoading = true;
        this.images.forEach(item => {
          this.quiz.images.push(item.url);
        });
        let shareImage = this.quiz.images.length > 0 ? this.quiz.images[0].filterImage(this.api.ip) : null
        this.quiz.images = this.quiz.images.toString();
        this.quiz.isAnonymity = this.quiz.isAnonymity ? 1 : 0;
        this.api.http("post", this.api.questionSave, this.quiz, result => {
          this.score = result.score;
          this.isLoading = false;
          this.isShow = true;
          //this.$toast("请耐心等待审核");
          let userInfo = JSON.parse(localStorage.getItem('userInfo'))
          this.$store.dispatch('setShare', {
            link: window.location.href.split(/[?#]/)[0] + '#/share?questionId=' + result.questionId,
            title: userInfo.nickName + ' 邀请你来千机问问回答',
            desc: this.quiz.title,
            image: shareImage
          })
          setTimeout(() => {
            this.$router.replace({ path: '/index/quizSuccess?keywords=' + this.quiz.title + '&questionId=' + result.questionId});
          }, 1000)
        }, error => {
          this.isLoading = false;
        });
      },
      /*删除图片*/
      delImg(fileName) {
        this.api.http("post", this.api.delFile, { fileName }, result => {
          for (let i = 0; i < this.images.length; i++) {
            if (this.images[i].fileName == fileName) {
              this.images.splice(i, 1);
              break;
            }
          }
        }, error => { });
      }
    },

  }
</script>
<style lang="scss" scoped>
  .quiz {
    .content {
      padding: 0 15px;
      .hint {
        padding-left: 15px;
        color: #959595;
        font-size: 12px;
      }
      input {
        height: 32px;
        line-height: 32px;
        background: #FCFCFC;
        border: 1px solid rgba(153, 153, 153, 0.10);
        border-radius: 4px;
        font-size: 12px;
        width: 100%;
        margin: 10px 0;
        padding-left: 10px;
        box-sizing: border-box;
      }
      .text-div {
        position: relative;
        textarea {
          background: #FCFCFC;
          border: 1px solid rgba(153, 153, 153, 0.10);
          border-radius: 4px;
          width: 100%;
          height: 160px;
          padding: 10px 10px;
          box-sizing: border-box;
          resize: none;
          margin-bottom: 10px;
        }
        .num {
          position: absolute;
          right: 10px;
          bottom: -2px;
          font-size: 12px;
          color: #5FB62A;
          .font-hint {
            color: #666;
          }
        }
      }
      .row {
        display: flex;
        flex-flow: wrap;
        .item {
          width: calc((100% - 30px) / 4);
          margin: 0 10px 10px 0;
          height: 78px;
          background: #ddd;
          position: relative;
          background-size: cover !important;
          background-position: center !important;
          &:nth-child(4n) {
            margin-right: 0;
          }
          .del {
            position: absolute;
            width: 24px;
            height: 24px;
            right: 5px;
            top: 5px;
            background: #ddd;
            background: url("../assets/close.png");
            background-size: cover;
            background-position: center;
            border-radius: 100%;
          }
        }
        .item.add-icon {
          background: url(../assets/add.png);
          width: 78px;
          background-size: cover;
          background-origin: center;
        }
      }
      .num-hint {
        text-align: center;
        font-family: PingFangSC-Light;
        font-size: 12px;
        color: #555555;
        letter-spacing: 0;
      }
      .anonymous {
        text-align: center;
        padding-top: 15px;
        i {
          position: relative;
          display: inline-block;
          width: 15px;
          height: 15px;
          box-sizing: border-box;
          border: 1px solid #e6e6e6;
          border-radius: 100%;
          right: 5px;
          top: 3px;
          transition: all 0.5s;
        }
        i.active {
          background: #5FB62A;
          border-color: #5FB62A;
        }
      }
      .btn {
        text-align: center;
        padding-top: 20px;
        transition: all 0.5s;
        span {
          width: 80px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          background: #999999;
          background: rgba(153, 153, 153, 0.50);
          border-radius: 100px;
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 0;
        }
        span.active {
          background: #5FB62A;
        }
      }
    }

  }

  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-bg {
      padding: 15px 50px;
      border-radius: 6px;
      background: #fff;
      text-align: center;
      position: relative;
      box-sizing: border-box;
      transition: all 0.5s;
      .title {
        color: #999999;
      }
      .success {
        font-size: 20px;
        color: #555555;
        margin-top: 15px;
        span:nth-child(1) {
          color: #5FB62A;
        }
        span:nth-child(2) {
          font-size: 20px;
          color: #5FB62A;
        }
      }
    }
  }

</style>
