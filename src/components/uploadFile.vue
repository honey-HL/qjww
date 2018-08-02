<template>
  <div class="file">
    <van-uploader :after-read="onRead" accept="image/*">
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
    }
  }
</script>

<style scoped lang="scss">

</style>
