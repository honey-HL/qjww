<template>
  <div class="report">
    <div class="content">
      <div class="hint">举报内容</div>
      <div class="title" v-html="detail.questionTitle"></div>
      <div class="title select-div" @click="show = !show">
        <span class="hint" v-if="typeName == ''">请选择举报分类</span>
        <span v-else>{{typeName}}</span>
      </div>
      <div class="text-div">
        <textarea name="" id="" cols="30" rows="10" placeholder="问题描述（选填）" v-model="report.describe" maxlength="200"></textarea>
        <span class="num">{{report.describe.length}}
                    <span class="font-hint">字</span>
                </span>
      </div>
      <div class="row">
        <div class="item" v-for="item in images" v-lazy:background-image="item.url">
          <i class="del" @click="delImg(item.fileName)"></i>
        </div>
        <UploadFile @uploadCall="onRead" v-if="images.length < 8">
          <div class="item add-icon"></div>
        </UploadFile>
      </div>
      <div class="num-hint">最多可上传8张</div>
      <div class="btn">
        <span v-if="report.type != null" class="active" @click="submit">提交</span>
        <span v-else>提交</span>
      </div>
      <div class="footer-hint">请正确提交举报信息，不实举报将对您的信用产生影响</div>
    </div>
    <transition name="fade">
      <div class="mask" v-if="isShow">
        <div class="login-bg">
          <div class="title">提交成功</div>
          <div class="success">感谢你的举报</div>
        </div>
      </div>
    </transition>

    <van-actionsheet v-model="show" :actions="actions" />

    <Loader v-if="isLoading" title="提交中"/>

  </div>
</template>
<script>
  import Search from "../components/search"
  import Loader from "../components/loader"
  import UploadFile from "../components/uploadFile"

  export default {
    name: "report",
    components: {
      Search, Loader, UploadFile
    },
    data() {
      return {
        detail: null,
        report: {
          describe: "",
          imgs: [],
          id: 0,
          reportType: 3,
          type: null,
        },
        isShow: false,
        images: [],
        isLoading: false,
        show: false,
        typeName: "",
        actions: [
          {name: '选择举报分类',callback: this.onClick,disabled: true},
          {name: '广告、软文等内容',callback: this.onClick,type: 1,},
          {name: '诱导分享、点赞等行为',callback: this.onClick,type: 2,},
          {name: '色情、犯罪、不实信息等内容',callback: this.onClick,type: 3,},
          {name: '引起不适的内容',callback: this.onClick,type: 4,},
        ]
      }
    },
    created() {
      this.detail = this.$store.state.answerDetail;
      this.report.id = this.detail.id;
    },
    methods: {
      onRead(image) {
        this.images.push(image);
      },
      /*提交*/
      submit() {
        if (this.report.type == null) {
          this.$toast("请选择分类");
          return;
        }
        this.isLoading = true;
        this.images.forEach(item => {
          this.report.imgs.push(item.url);
        });
        this.report.imgs = this.report.imgs.toString();
        this.api.http("post", this.api.saveReport, this.report, result => {
          this.isLoading = false;
          this.isShow = true;
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
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
      },
      onClick(item) {
        this.report.type = item.type;
        this.typeName = item.name;
        this.show = false;
      }
    }
  }
</script>
<style lang="scss" scoped>
  .report {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    .content {
      padding: 0 15px;
      .hint {
        color: #959595;
        font-size: 14px;
        padding: 15px 0;
      }
      .title{
        border: 1px solid rgba(153, 153, 153, 0.10);
        padding: 10px;
        background: #fff;
        border-radius: 4px;
        font-size: 16px;
      }
      .select-div {
        margin: 10px 0;
        font-size: 12px;
        span.hint{
          color: #999;
        }
      }
      .text-div {
        position: relative;
        textarea {
          background: #fff;
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
          background: #e6e6e6;
          background-size: cover !important;
          background-position: center !important;
          position: relative;
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
      .btn {
        text-align: center;
        padding-top: 20px;
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
      .footer-hint{
        color: #999999;
        text-align: center;
        margin-top: 20px;
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
        }
      }
    }
  }
</style>
