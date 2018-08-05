<template>
  <div class="login">
    <div class="bg"></div>
    <div class="login-bar">
      <div>
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
        </div>
        <div class="login-btn">
          <span v-if="!isAll">登录</span>
          <span class="active" @click="submit" v-else>登录</span>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div class="mask" v-if="isLogin">
        <div class="login-bg">
          <div class="title">登录成功</div>
          <div class="success">登录成功
            <span>+</span>
            <span>5</span>
          </div>
          <div class="hint">正在跳转...</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  export default {
    name: "login",
    data() {
      return {
        // user: { phone: "", code: "", openId: "ot23W05_9NC1bfllkCWiAS7Fuexw", },
        user: { phone: "", code: "", openId: "", },
        okPhone: "",
        showToast: false,
        isPhoneError: false,
        isCodeError: false,
        code: this.util.getUrlParam("code"),
        count: 59,
        isCode: false,
        time: null,
        isAll: false,
        isLogin: false,
      };
    },
    mounted() {
      if (this.$store.state.openId == null) {
        this.api.http("post", this.api.isGetCode, {}, result => {
          if (result == 1) {
            if (this.code == null) {
              location.href = this.api.ip + "wxClient/getCode?redirectUrl=" + location.href;
            }
            else {
              this.api.http("post", this.api.getOpenId, { code: this.code }, result => {
                result = JSON.parse(result);
                this.$store.dispatch("setOpenId", result.openid);
                this.user.openId = result.openid;
              }, error => { });
            }
          }
        }, error => { });
      }
      else {
        this.user.openId = this.$store.state.openId;
      }

    },
    methods: {
      /**获取权限配置*/
      getGroupAuth() {
        this.api.http("post", this.api.getGroupAuth, {}, (result) => {
          localStorage.setItem("config", JSON.stringify(result));
        }, (error) => {})
      },
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
        this.api.http("post", this.api.login, { openId: this.user.openId }, result => {
          localStorage.setItem("accessToken", result.token);
          localStorage.setItem("userInfo", JSON.stringify(result));

          //TODO 权限配置
          this.getGroupAuth();

          this.isLogin = true;
          setTimeout(() => {
            this.$router.push({ path: this.$route.query.redirect });
          }, 1000);
        }, error => {
          if (error.code == 1050) {
            this.api.http("post", this.api.bindPhone, this.user, result => {
              localStorage.setItem("accessToken", result.token);
              this.api.http("post", this.api.getInfo, {}, result => {
                localStorage.setItem("userInfo", JSON.stringify(result));
              }, error => { });

              //TODO 权限配置
              this.getGroupAuth();

            }, error => { });
          }
        });
      },
      /*获取验证码*/
      getCode() {
        if (this.util.empty(this.user.phone) || !this.util.isPhone.test(this.user.phone)) {
          this.isPhoneError = true;
          return;
        }
        this.api.http("post", this.api.getBindCode, this.user, result => {
          //Test
          this.user.code = result;
          this.isAll = true;

          this.isCode = true;
          this.okPhone = this.user.phone;
          this.time = setInterval(() => {
            if (this.count <= 0) {
              this.isCode = false;
              this.count = 59;
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
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    .bg {
      height: calc(520px / 2);
      background: #64b72a;
      background: url("../assets/login.png");
      background-size: cover;
      background-position: center;
      position: absolute;
      width: 100%;
    }
    .login-bar {
      display: flex;
      justify-content: center;
      position: relative;
      top: 0;
      width: 100%;
      height: 100%;
      padding: 15px;
      padding-top: 130px;
      box-sizing: border-box;
      .login-model {
        background: #ffffff;
        border-radius: 20px;
        width: 100%;
        height: 250px;
        padding: 20px;
        box-sizing: border-box;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
        width: calc(460px / 2);
        height: calc(300px / 2);
        background: url(../assets/login-bg.png);
        background-size: cover;
        background-position: center;
        padding: 15px;
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
          span:nth-child(1) {
            color: #5FB62A;
          }
          span:nth-child(2) {
            font-size: 20px;
            color: #5FB62A;
          }
        }
        .hint {
          position: absolute;
          bottom: 15px;
          left: 0;
          text-align: center;
          width: 100%;
          color: #fff;
        }
      }
    }
  }
</style>
