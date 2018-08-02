<template>
  <div class="edit">
    <div class="row">
      <div class="left">
        <div class="head"></div>
      </div>
      <div class="right">
        <span class="hint">修改头像</span>
        <i class="icon"></i>
      </div>
    </div>
    <div class="row">
      <div class="left">名称</div>
      <div class="right">
        <span class="name">用户名字</span>
        <i class="icon"></i>
      </div>
    </div>
    <div class="row">
      <div class="left">绑定手机</div>
      <div class="right">
        <span class="name">15200000000</span>
        <i class="icon"></i>
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
  import Loading from "@/components/loading"

  export default {
    name: "edit",
    comments: {Loading},
    data() {
      return {
        isFileLoading: false,
        img: "",
      };
    },
    methods: {
      /*文件上传*/
      selectFile() {
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
                this.img = result.body;
                //TODO 更新头像
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
    }
  };
</script>

<style lang="scss" scoped>
  .edit{
    position: absolute;
    width: 100%;
    height: 100%;
    & .row{
      display: flex;
      justify-content: center;
      align-items: center;
      background: #fff;
      margin-bottom: 10px;
      padding: 15px;
      box-sizing: border-box;
      & .left{
        width: 30%;
        font-size: 14px;
        color: #555555;
        .head {
          display: inline-block;
          width: 60px;
          height: 60px;
          background: #ddd;
          border-radius: 100%;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        }
      }
      & .right{
        width: 70%;
        text-align: right;
        span{
          font-size: 14px;
          color: #999999;
          padding-right: 10px;
        }
        span.name{
          color: #555555;
        }
        .icon{
          display: inline-block;
          width: 4px;
          height: 7px;
          background: url("../assets/right.png");
          background-size: cover;
          background-position: center;
          position: relative;
          top: -1px;
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
