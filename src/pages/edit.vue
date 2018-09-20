<template>
  <div class="edit">
    <div class="row">
      <div class="left">
          <!-- <van-uploader :after-read="uploadFile" accept="image/*">
            <slot></slot> -->
            <div class="head" v-lazy:background-image="avatar"></div>
            
          <!-- </van-uploader>  -->
      </div>
        <div class="right">
            <!-- <van-uploader :after-read="uploadFile" accept="image/*">
              <slot></slot>
            </van-uploader>  -->
            <span class="hint" @click="changeName">修改头像</span>
            <i class="icon"></i>
            <transition name="fade">
                <Loader title="上传中" v-if="isFileLoading"/>
            </transition>
        </div>
    </div>
    <div class="row">
      <div class="left">名称</div>
      <div class="right" @click="changeName"><!--@click="changeName"-->
        <span class="name">{{userInfo.nickName}}</span>
        <i class="icon" ></i>
      </div>
    </div>
    <div class="row">
      <div class="left">绑定手机</div>
      <div class="right">
        <span class="name">{{userInfo.phone}}</span>
        <i class="icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
  //import UploadFile from "../components/uploadFile"
  import Loader from "../components/loader"
  export default {
    name: "edit",
    components: {
      Loader
    },
    data() {
      return {
        imgIp: this.api.imgIp,
        url:this.api.imgIp + this.api.updateUserHead,
        isFileLoading: false,
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
        avatar: JSON.parse(localStorage.getItem("userInfo")).avatar,
        nickName: "",
      };
    },
    created() {
      document.title =this.$route.meta.title;
      if(this.avatar.indexOf("http") != -1){
        return;
      }else{
        this.avatar = this.imgIp + this.avatar;
      };
    },
    methods: {
      /**上传文件方法**/
      uploadFile(fileObj) {
        console.log(fileObj);
        fileObj = fileObj.file;
        let size = Math.round(fileObj.size / 1024 / 1024 * 100) / 100;
        if(size >= 10){
          this.$toast("照片最大尺寸为10MB，请重新上传!");
          return;
        }
        this.isFileLoading = true;
        let xhr;
        let form = new FormData();
        if(fileObj.size / 1024 > 1025) { //大于1M，进行压缩上传
          this.photoCompress(fileObj, {
            quality: 0.2
          }, (base64Codes) => {
            let bl = this.convertBase64UrlToBlob(base64Codes);
            form.append("file", bl, "file_" + Date.parse(new Date()) + ".jpg");
            form.append("path", "image");
            xhr = new XMLHttpRequest();
            let picFileAndPath={file:fileObj,path:"qjww"};
            xhr.open("post", this.url,picFileAndPath, true);
            xhr.onload = this.uploadComplete; //请求完成
            xhr.send(form); //开始上传，发送form数据
          });
        }
        else {
          form.append("file", fileObj);
          form.append("path", "image");
          xhr = new XMLHttpRequest();
          xhr.open("post", this.url, true);
          xhr.onload = this.uploadComplete;
          xhr.send(form); //开始上传，发送form数据
        }
      },
      convertBase64UrlToBlob(urlData){
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
      },
      /**上传回调*/
      uploadComplete(evt) {
        let data = JSON.parse(evt.target.responseText);
        console.log(data);
        if(data.status) {
          this.avatar = data.body[0].smallPath;
          this.api.http("post", this.api.updateUser, {
            avatar: this.avatar,
            //nickName: this.nickName,
          }, result => {
            this.$toast("修改成功");
            this.api.http("post", this.api.getInfo, {}, result => {
              console.log(result);
              localStorage.setItem("userInfo", JSON.stringify(result));
              //this.avatar = JSON.parse(localStorage.getItem("userInfo")).avatar;//实时跟新用户的头像
            }, error => { });
          }, error => {});
        }
        else{
          this.$toast("上传失败！");
        }
        this.isFileLoading = false;
      },
      photoCompress(file,w,objDiv) {
        let thas = this;
        let ready = new FileReader();
        ready.readAsDataURL(file);
        ready.onload = function () {
          let re = this.result;
          thas.canvasDataURL(re,w,objDiv)
        }
      },
      canvasDataURL(path, obj, callback){
        let img = new Image();
        img.src = path;
        img.onload = function () {
          let that = this;
          let w = that.width,
            h = that.height,
            scale = w / h;
          w = obj.width || w;
          h = obj.height || (w / scale);
          let quality = 0.3;  // 默认图片质量为0.7
          //生成canvas
          let canvas = document.createElement('canvas');
          let ctx = canvas.getContext('2d');
          // 创建属性节点
          let anw = document.createAttribute("width");
          anw.nodeValue = w;
          let anh = document.createAttribute("height");
          anh.nodeValue = h;
          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(that, 0, 0, w, h);
          // 图像质量
          if(obj.quality && obj.quality <= 1 && obj.quality > 0){
            quality = obj.quality;
          }
          // quality值越小，所绘制出的图像越模糊
          let base64 = canvas.toDataURL('image/jpeg', quality);
          // 回调函数返回base64的值
          callback(base64);
        }
      },
      /*用户修改名字*/
      changeName(){
        this.$toast("此功能暂未开放!");
        // this.$router.push({
        //   path: "/index/changeName"
        // });
      }

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
          background-size: cover !important;
          background-position: center !important;
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
</style>
