<template>
  <div id="my">
    <div class="bg"></div>
    <div class="wrop">
      <div class="top">
        <div class="head" v-lazy:background-image="userInfo.avatar" @click="edit"></div>
        
        <div class="name">{{userInfo.nickName}}</div>
        <div>
          <div class="role" v-if="userInfo.roleId == 1">{{userInfo.authName}}</div>
          <router-link tag="span" class="btn" to="/index/signin" v-if="checkSign == false">签到</router-link>
          <router-link tag="span" class="btn" to="/index/signin" v-if="checkSign == true">已签到</router-link>
        </div>
        <div class="total-bar">
          <div class="left">
            <!-- <div class="num" @click="goIntegralMall">{{score}}</div> -->
            <!-- <div class="hint" @click="goIntegralMall">积分</div> -->
            <div class="num">{{score}}</div>
             <div class="hint">积分</div>
          </div>
          <div class="right">
            <div class="num">{{like}}</div>
            <div class="hint">赞</div>
          </div>
        </div>
      </div>

      <div class="meun">
        <router-link tag="div" to="/index/news" class="row">
          <div class="icon">
            <img src="../assets/1.png" />
          </div>
          <div class="name">
            我的消息
            <i class="right-icon"></i>
          </div>
        </router-link>
        <router-link tag="div" to="/index/myCollection" class="row">
          <div class="icon">
            <img src="../assets/2.png" />
          </div>
          <div class="name">
            我的收藏
            <i class="right-icon"></i>
          </div>
        </router-link>
        <router-link tag="div" to="/index/myAnswer" class="row">
          <div class="icon">
            <img src="../assets/3.png" />
          </div>
          <div class="name">
            我的问答
            <i class="right-icon"></i>
          </div>
        </router-link>
        <router-link tag="div" to="/index/feedback" class="row">
          <div class="icon">
            <img src="../assets/4.png" />
          </div>
          <div class="name">
            意见反馈
            <i class="right-icon"></i>
          </div>
        </router-link>
      </div>

    </div>
    <MyFooter />
  </div>
</template>

<script>
  import MyFooter from "../components/myFooter";
  //console.log(localStorage.getItem("userInfo"));
  export default {
    name: 'my',
    components: {
      MyFooter
    },
    data() {
      return {
        imgIp: this.api.imgIp,
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
        like: 0,
        score: 0,
        checkSign:null,
      }
    },
    created() {
      document.title =this.$route.meta.title;
      this.api.http("post", this.api.isSign, {}, result => {
        this.checkSign = result;
      }, error => { });

      this.api.http("post", this.api.getLike, {}, result => {
        this.like = result;
      }, error => { });

      this.api.http("post", this.api.getScore, {}, result => {
        this.score = result;
      }, error => { });

      console.log('this.userInfo', JSON.stringify(this.userInfo))
      if (this.userInfo && this.userInfo.avatar) {
        if (this.userInfo.avatar.indexOf("http") != -1) { // 有头像前缀
          return;
        } else { // 没有头像前缀
          this.userInfo.avatar = this.imgIp + this.userInfo.avatar;
        }
      } else {
        this.userInfo.avatar = ''
      }
      
    },
    methods: {
      goIntegralMall () {
        this.$router.push({
          path: "/index/integralMall"
        })
      },
      edit() {
        this.$router.push({
          path: "/index/edit"
        })
      },
    }

  }
</script>

<style lang="scss" scoped>
  #my {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }
  .bg {
    height: 100px;
    background: #5FB62A;
  }
  .wrop {
    padding: 10px 15px;
    position: absolute;
    width: 100%;
    top: 50px;
    box-sizing: border-box;
    .top {
      background: #fff;
      box-shadow: 0 0 8px 0 rgba(190, 190, 190, 0.20);
      border-radius: 4px;
      text-align: center;
      .head {
        display: inline-block;
        width: 60px;
        height: 60px;
        background: #ddd;
        border-radius: 100%;
        margin-top: -20px;
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
        background-size: cover !important;
        background-position: center !important;
      }
      .name {
        font-size: 16px;
        color: #555555;
        margin: 10px 0;
      }
      .role{
        padding-bottom: 5px;
        text-align: center;
        color: #999999;
      }
      .btn {
        display: inline-block;
        width: 56px;
        height: 19px;
        line-height: 19px;
        background-image: linear-gradient(-90deg, #5FB62A 0%, #78BC28 100%);
        border-radius: 100px;
        color: #fff;
        margin-bottom: 15px;
      }
      .total-bar {
        display: flex;
        position: relative;
        padding: 15px;
        &::before {
          content: "";
          position: absolute;
          height: 1px;
          width: 100%;
          left: 0;
          top: 0;
          transform: scaleY(0.5);
          background: #e1e1e1;
        }
        .left {
          width: 50%;
          position: relative;
          &::before {
            content: "";
            position: absolute;
            height: 100%;
            width: 1px;
            right: 0;
            top: 0;
            transform: scaleX(0.5);
            background: #e1e1e1;
          }
        }
        .right {
          width: 50%;
        }

        .num {
          font-size: 24px;
          color: #5FB62A;
        }
        .hint {
          color: #555555;
        }
      }

    }
    .meun {
      .row {
        display: flex;
        background: #FFFFFF;
        box-shadow: 0 0 8px 0 rgba(190, 190, 190, 0.20);
        border-radius: 4px;
        height: 40px;
        margin-top: 10px;
        align-items: center;
        position: relative;
        padding: 0 15px;
        .icon img {
          width: 17px;
          height: 17px;
          margin-right: 10px;
          position: relative;
          top: 2px;
        }
        .name {
          font-size: 14px;
          color: #555555;
          i {
            position: absolute;
            right: 15px;
            top: 13px;
            width: 8px;
            height: 14px;
            background: url(../assets/right-icon.png);
            background-size: cover;
            background-position: center;

          }
        }
      }
    }
  }
</style>
