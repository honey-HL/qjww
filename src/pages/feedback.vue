<template>
  <div class="feedback">
    <div class="content">
      <div class="img">
        <img style="border-radius:50%;" src="../assets/sj.png">
      </div>
      <div class="title">创造你最爱的千机问问</div>
      <div class="hint">问问的改进需要您宝贵的意见</div>
      <div class="text-div">
        <textarea name="" id="" cols="30" rows="10" maxlength="500" v-model="content" placeholder="反馈问题或意见，帮助我们一起创造更好的千机问问"></textarea>
        <span class="font-hint">
            已输入<span class="num">{{content.length}}/500</span>字
        </span>
      </div>
      <div class="row">
        <div class="item" v-for="(item, index) in imgs" :key="index" v-lazy:background-image="item.url.filterImage(api.ip)">
          <i class="del" @click="delImg(item.fileName)"></i>
        </div>
        <UploadFile @uploadCall="onRead" v-if="images.length < 8">
          <div class="item add-icon"></div>
        </UploadFile>
      </div>
      <div class="num-hint">最多可上传8张</div>
      <div class="btn">
        <span v-if="content != ''" class="active" @click="submit">提交</span>
        <span v-else>提交</span>
      </div>
    </div>

    <Loader v-if="isLoading" title="提交中"/>

  </div>
</template>
<script>
  import Search from "../components/search"
  import Loader from "../components/loader"
  import UploadFile from "../components/uploadFile"

  export default {
    name: "feedback",
    components: {
      Search, Loader, UploadFile
    },
    data() {
      return {
        content: "",
        images: [],
        imgs: [],
        isLoading: false,
      }
    },
    created() {
      document.title =this.$route.meta.title;
    },
    watch: {
      'content': function (content) {
        if (content.length >= 500) {
          this.$toast("文本字数不能超过500");
        }
        if (this.util.isEmoji.test(content)) {
          this.$toast("暂不支持emoji");
        }
      }
    },
    methods: {
      onRead(image) {
        this.imgs.push(image);
      },
      /*提交*/
      submit() {
        if (this.util.empty(this.content)) {
          this.$toast("请输入内容");
          return;
        }
        this.isLoading = true;
        this.imgs.forEach(item => {
          this.images.push(item.url);
        });
        this.api.http("post", this.api.addSuggest, {
          content: this.content,
          images: this.images.toString()
        }, result => {
          this.isLoading = false;
          this.$toast("提交成功");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1000);
        }, error => { });
      },
      /*删除图片*/
      delImg(fileName) {
        this.api.http("post", this.api.delFile, { fileName }, result => {
          for (let i = 0; i < this.imgs.length; i++) {
            if (this.imgs[i].fileName == fileName) {
              this.imgs.splice(i, 1);
              break;
            }
          }
        }, error => { });
      }
    }
  }
</script>
<style lang="scss" scoped>
  .feedback {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    .content {
      padding: 0 15px;
      .img {
        text-align: center;
        padding: 15px 0;
        img {
          width: 60px;
        }
      }
      .title {
        font-size: 16px;
        color: #555555;
        text-align: center;
      }
      .hint {
        color: #999999;
        font-size: 14px;
        padding-top: 5px;
        padding-bottom: 15px;
        text-align: center;
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
        .font-hint {
          position: absolute;
          right: 10px;
          bottom: -5px;
          font-size: 12px;
          color: #666;
          .num {
            color: #5FB62A;
          }
        }
      }
      .row {
        display: flex;
        flex-flow: wrap;
        margin-top: 8px;
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
          background-position: center;
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
        span.active{
          background: #5FB62A;
        }
      }
    }
  }

</style>
