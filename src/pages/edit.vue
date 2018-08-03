<template>
  <div class="edit">
    <div class="row">
      <div class="left">
        <UploadFile @uploadCall="onRead">
          <div class="head" v-lazy:background-image="avatar"></div>
        </UploadFile>
      </div>
        <div class="right">
          <UploadFile @uploadCall="onRead">
            <span class="hint">修改头像</span>
            <i class="icon"></i>
          </UploadFile>
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
  </div>
</template>

<script>
  import UploadFile from "../components/uploadFile"
  export default {
    name: "edit",
    components: {
      UploadFile
    },
    data() {
      return {
        isFileLoading: false,
        avatar: JSON.parse(localStorage.getItem("userInfo")).avatar,
        nickName: "",
      };
    },
    methods: {
      onRead(image) {
        this.avatar = image.url;
        this.api.http("post", this.api.updateUser, {
          avatar: this.avatar,
          //nickName: this.nickName,
        }, result => {
          this.$toast("修改成功");
          this.api.http("post", this.api.getInfo, {}, result => {
            localStorage.setItem("userInfo", JSON.stringify(result));
          }, error => { });
        }, error => {});
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
