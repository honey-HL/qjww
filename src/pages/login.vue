<template>
  <div class="login">
    <div class="bg"></div>
    <div class="login-bar">
      <div class="login-model">
        <div class="title">请绑定手机，获取更多品质服务</div>
        <div class="title-min">绑定手机后，您将收到问题动态提醒</div>
        <div class="row">
          <input type="tel" placeholder="请输入您的手机号" v-model="user.phone" maxlength="11" @keyup="check(0)">
          <div class="error-hint">
            <transition name="fade">
              <span v-if="isPhoneError">请检查并正确输入11位手机号</span>
            </transition>
          </div>
        </div>
        <div class="row">
          <input type="text" placeholder="请输入验证码" v-model="user.code" maxlength="6" @keyup="check(1)">
          <div class="error-hint">
            <transition name="fade">
              <span v-if="isCodeError">请输入正确的验证码</span>
            </transition>
          </div>
        </div>
        <div class="code-bar">
          <span @click="getCode" v-if="!isCode">获取验证码</span>
          <span class="hint" v-else>验证码已发送，{{count}}秒后可重新获取</span>
        </div>
        <div class="login-btn">
          <span v-if="!isAll">登录</span>
          <span class="active" @click="submit" v-else>登录</span>
        </div>
      </div>

    </div>

  </div>
</template>

<script>

  export default {
    name: "login",
    data() {
      return {
        user: { phone: "", code: "", openId: "ot23W05_9NC1bfllkCWiAS7Fuexw", },
        okPhone: "",
        showToast: false,
        isPhoneError: false,
        isCodeError: false,
        code: this.util.getUrlParam("code"),
        count: 59,
        isCode: false,
        time: null,
        isAll: false,
      };
    },
    created() {
      // this.api.http("post", this.api.isGetCode, {}, result => {
      //   if (result == 1) {
      //     if (this.code == null) {
      //       location.href = this.api.ip + "wxClient/getCode?redirectUrl=" + location.href;
      //     }
      //     else {
      //       this.api.http("post", this.api.getOpenId, { code: this.code }, result => {
      //         result = JSON.parse(result);
      //         alert(result.openid);
      //         this.user.openId = result.openid;
      //       }, error => { });
      //     }
      //   }
      // }, error => { });
    },
    methods: {
      /*登录*/
      submit() {
        if (this.util.empty(this.user.phone) || !this.util.isPhone.test(this.user.phone)) {
          this.isPhoneError = true;
          return;
        }
        else if (this.util.empty(this.user.code) || !this.isCode) {
          this.isCodeError = true;
          return;
        }
        else if (this.okPhone != this.user.phone) {
          this.isPhoneError = true;
          return;
        }
        this.api.http("post", this.api.bindPhone, this.user, result => {
          this.api.http("post", this.api.login, { openId: this.user.openId }, result => {
            localStorage.setItem("accessToken");
            localStorage.setItem("userInfo");
            this.$router.go(-1);
          }, error => { });
        }, error => { });

      },
      /*获取验证码*/
      getCode() {
        if (this.util.empty(this.user.phone) || !this.util.isPhone.test(this.user.phone)) {
          this.isPhoneError = true;
          return;
        }
        this.api.http("post", this.api.getBindCode, this.user, result => {
          console.log(result);
          this.isCode = true;
          this.okPhone = this.user.phone;
          this.time = setInterval(() => {
            if (this.count <= 0) {
              this.isCode = false;
              clearInterval(this.time);
            }
            this.count--;
          }, 1000);
        }, error => { });
      },
      /*检查输入*/
      check(type) {
        if (type == 0) {
          if (this.util.isPhone.test(this.user.phone)) {
            this.isPhoneError = false;
            return;
          }
        }
        else {
          if (this.user.code.length == 4) {
            this.isCodeError = false;
            return;
          }
        }
        if (this.util.isPhone.test(this.user.phone) && this.user.code.length > 1) {
          this.isAll = true;
        }
        else {
          this.isAll = false;
        }
      },
    }
  };
</script>

<style lang="scss" scoped>
  .login {
    overflow: hidden;
    .bg {
      height: 300px;
      background: #64b72a;
      position: absolute;
      width: 100%;
    }
    .login-bar {
      display: flex;
      position: relative;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 30px;
      padding-top: 100px;
      box-sizing: border-box;
      .login-model {
        background: #ffffff;
        border-radius: 20px;
        width: 100%;
        height: 100%;
        padding: 20px 30px;
        box-sizing: border-box;
        .title {
          font-size: 16px;
          color: #666;
          text-align: center;
        }
        .title-min {
          font-size: 12px;
          color: #ababab;
          text-align: center;
          margin: 10px 0 20px 0;
        }
        .row {
          input {
            width: 100%;
            height: 30px;
            border-radius: 30px;
            border: 1px solid #f1f1f1;
            outline: none;
            color: #5c695c;
            padding-left: 15px;
            box-sizing: border-box;
          }
          .error-hint {
            height: 30px;
            display: flex;
            align-items: center;
            span {
              color: #ff4d0b;
              font-size: 12px;
              padding-left: 15px;
            }
          }
        }
        .code-bar {
          text-align: center;
          padding-top: 10px;
          span {
            color: #63b830;
          }
          span.hint {
            color: #999999;
          }
          span.active {
            color: #adb4ad;
          }
        }
        .login-btn {
          padding-top: 50px;
          text-align: center;
          span {
            padding: 10px 30px;
            background: #c2c2c2;
            font-size: 13px;
            color: #fff;
            border-radius: 30px;
          }
          span.active {
            background: #64b729;
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
  }
</style>