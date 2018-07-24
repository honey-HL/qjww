<template>
  <div class="login">
    <div class="bg"></div>
    <div class="login-bar">
      <div class="login-model">
        <div class="title">请绑定手机，获取更多品质服务</div>
        <div class="title-min">绑定手机后，您将收到问题动态提醒</div>
        <div class="row">
          <input type="text" placeholder="请输入您的手机号" v-model="user.phone" maxlength="11">
          <div class="error-hint">
            <transition name="fade">
              <span>请检查并正确输入11位手机号</span>
            </transition>
          </div>
        </div>
        <div class="row">
          <input type="text" placeholder="请输入验证码" v-model="user.code" maxlength="6">
          <div class="error-hint">
            <transition name="fade">
              <span>请输入正确的验证码</span>
            </transition>
          </div>
        </div>
        <div class="code-bar">
          <span>获取验证码</span>
        </div>
        <div class="login-btn">
          <span @click="login">登录</span>
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
        user: {
          phone: "",
          code: ""
        },
        isPhoneError: false,
        isCodeError: false,
      };
    },
    methods: {
      login() {
        if (this.util.empty(this.user.phone)) {
          alert("不能为空")
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