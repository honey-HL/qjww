<template>
  <div class="file">
    <van-uploader :after-read="uploadFile" accept="image/*">
      <slot></slot>
    </van-uploader>
    <transition name="fade">
      <Loader title="上传中" v-if="isFileLoading"/>
    </transition>
  </div>
</template>

<script>
  import Loader from "../components/loader"
  export default {
    name: "uploadFile",
    components: {
      Loader
    },
    data(){
      return {
        isFileLoading: false,
        url: this.api.ip + this.api.uploadImage,
      }
    },
    methods: {
      onRead(object) {
        let formData = new FormData();
        formData.append('file', object.file);
        let size = Math.round(object.file.size / 1024 / 1024 * 100) / 100;
        if(size >= 10){
          this.$toast("照片最大尺寸为10MB，请重新上传!");
          return;
        }
        this.isFileLoading = true;
        let req = new XMLHttpRequest();
        req.open("post", this.api.ip + this.api.uploadImage, true);
        req.onreadystatechange = () => {
          if (req.readyState == 4 && (req.status == 200 || req.status == 304)) {
            let result = JSON.parse(req.response);
            if (result.code == 200) {
              this.$emit("uploadCall", result.body);
            } else {
              this.$toast("上传失败");
            }
            this.isFileLoading = false;
          }
        }
        req.send(formData);
      },
      /**
        三个参数
        file：一个是文件(类型是图片格式)，
        w：一个是文件压缩的后宽度，宽度越小，字节越小
        objDiv：一个是容器或者回调函数
        photoCompress()
      */
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
      /**
       * 将以base64的图片url数据转换为Blob
       * @param urlData
       * 用url方式表示的base64图片数据
       */
      convertBase64UrlToBlob(urlData){
        let arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
      },
      /**上传文件方法**/
      uploadFile(fileObj) {
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
            xhr = new XMLHttpRequest();
            xhr.open("post", this.url, true);
            xhr.onload = this.uploadComplete; //请求完成
            // xhr.upload.onprogress = this.progressFunction;//【上传进度调用方法实现】
            // xhr.upload.onloadstart = function(){//上传开始执行方法
            //   ot = new Date().getTime();   //设置上传开始时间
            //   oloaded = 0;//设置上传开始时，以上传的文件大小为0
            // };

            xhr.send(form); //开始上传，发送form数据
          });
        }
        else {
          form.append("file", fileObj);
          xhr = new XMLHttpRequest();
          xhr.open("post", this.url, true);
          xhr.onload = this.uploadComplete;

          // xhr.upload.onprogress = this.progressFunction;//【上传进度调用方法实现】
          // xhr.upload.onloadstart = function(){//上传开始执行方法
          //   ot = new Date().getTime();   //设置上传开始时间
          //   oloaded = 0;//设置上传开始时，以上传的文件大小为0
          // };

          xhr.send(form); //开始上传，发送form数据
        }
      },
      /**上传回调*/
      uploadComplete(evt) {
        let data = JSON.parse(evt.target.responseText);
        console.log(data);
        if(data.code == 200) {
          this.$emit("uploadCall", data.body);
          this.$toast("上传成功");
        }
        else{
          this.$toast("上传失败！");
        }
        this.isFileLoading = false;
      },
      /**上传进度实现方法，上传过程中会频繁调用该方法*/
      progressFunction(evt) {
        let progressBar = document.getElementById("progressBar");
        let percentageDiv = document.getElementById("percentage");
        // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
        if (evt.lengthComputable) {//
          progressBar.max = evt.total;
          progressBar.value = evt.loaded;
          percentageDiv.innerHTML = Math.round(evt.loaded / evt.total * 100) + "%";
        }
        let time = document.getElementById("time");
        let nt = new Date().getTime();//获取当前时间
        let pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
        ot = new Date().getTime(); //重新赋值时间，用于下次计算
        let perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
        oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
        //上传速度计算
        let speed = perload/pertime;//单位b/s
        let bspeed = speed;
        let units = 'b/s';//单位名称
        if(speed/1024>1){
          speed = speed/1024;
          units = 'k/s';
        }
        if(speed/1024>1){
          speed = speed/1024;
          units = 'M/s';
        }
        speed = speed.toFixed(1);
        //剩余时间
        let resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
        time.innerHTML = '，速度：'+speed+units+'，剩余时间：'+resttime+'s';
        if(bspeed==0) time.innerHTML = '上传已取消';
      },

    }
  }
</script>

<style scoped lang="scss">

</style>
