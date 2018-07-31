<template>
  <div class="quiz">
    <Search @searchData="searchData" />
    <div class="content">
      <div class="hint">您可以继续搜索您遇到的手机问题</div>
      <input type="text" placeholder="请输入标题" maxlength="20" v-model="quiz.title">
      <div class="text-div">
        <textarea name="" id="" cols="30" rows="10" placeholder="问题描述（选填）" maxlength="200" v-model="quiz.content"></textarea>
        <span class="num">{{quiz.content.length}}
                    <span class="font-hint">字</span>
                </span>
      </div>
      <div class="row">
        <div class="item" v-for="item in images" v-lazy:background-image="item.url">
          <i class="del" @click="delImg(item.fileName)"></i>
        </div>
        <div class="item add-icon" @click="selectFile"></div>
      </div>
      <div class="num-hint">最多可上传8张</div>
      <div class="anonymous">
        <i :class="{active: quiz.isAnonymity}"></i>
        <span @click="quiz.isAnonymity = !quiz.isAnonymity">匿名提问</span>
      </div>
      <div class="btn">
        <span v-if="quiz.title != '' && quiz.content != ''" class="active" @click="submit">发表提问</span>
        <span v-else>发表提问</span>
      </div>
    </div>

    <input type="file" id="file" @change="upload" style="display: none;">
    <transition name="fade">
      <div class="mask" v-if="isFileLoading">
        <div class="loading-bg">
          <Loading />
          <div class="success">上传中</div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import axios from 'axios'
  import Search from "@/components/search"
  import Loading from "@/components/loading"
  export default {
    name: "quiz",
    components: {
      Search, Loading
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
        isFileLoading: false,
      }
    },
    methods: {
      /*接收搜索参数*/
      searchData(value) {
        this.$router.push({ path: '/index/result?keywords=' + value });
      },
      /*文件上传*/
      selectFile() {
        if (this.images.length >= 8) {
          this.$toast("最多可上传8张");
          return;
        }
        document.getElementById("file").click();
      },
      upload(e) {
        let formData = new FormData();
        let file = e.target.files[0];
        formData.append('file', e.target.files[0]);
        let name = file.name;
        let size = Math.round(file.size / 1024 / 1024 * 100) / 100;
        if(size >= 10){
          this.$toast("照片最大尺寸为10MB，请重新上传!");
          return;
        }
        else if(name.indexOf("jpg") != -1
          || name.indexOf("jpeg") != -1
          || name.indexOf("gif") != -1
          || name.indexOf("png") != -1) {
          this.isFileLoading = true;
          let req = new XMLHttpRequest();
          req.open("post", this.api.ip + this.api.uploadImage, true);
          req.onreadystatechange = () => {
            if (req.readyState == 4 && (req.status == 200 || req.status == 304)) {
              let result = JSON.parse(req.response);
              if (result.code == 200) {
                this.images.push(result.body);
              } else {
                this.$toast("上传失败");
              }
              this.isFileLoading = false;
            }
          }
          req.send(formData);
        }
        else {
          this.$toast("您选择的图片格式暂不支持");
        }
      },
      /*提交*/
      submit() {
        if (this.util.empty(this.quiz.title)) {
          this.$toast("请输入标题");
          return;
        }
        else if (this.util.empty(this.quiz.content)) {
          this.$toast("请输入内容");
          return;
        }
        this.images.forEach(item => {
          this.quiz.images.push(item.url);
        });
        this.quiz.images = this.quiz.images.toString();
        this.quiz.isAnonymity = this.quiz.isAnonymity ? 1 : 0;
        console.log(this.quiz);
        this.api.http("post", this.api.questionSave, this.quiz, result => {
          this.$router.push({ path: '/index/quizSuccess?keywords=' + this.quiz.title });
        }, error => { });
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
          bottom: 20px;
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
            width: 20px;
            height: 20px;
            right: 5px;
            top: 5px;
            background: #ddd;
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

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
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
    .loading-bg {
      padding: 15px 50px;
      border-radius: 6px;
      background: #fff;
      text-align: center;
      position: relative;
      box-sizing: border-box;
      transition: all 0.5s;
      .success {
        padding-top: 10px;
        font-size: 16px;
        color: #555555;
      }
    }
  }
</style>
