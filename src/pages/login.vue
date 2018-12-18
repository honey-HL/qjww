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
          <div class="success" v-if="score > 0">登录成功
            <span>+</span>
            <span>{{score}}</span>
          </div>
          <div class="hint">正在跳转...</div>
        </div>
      </div>
    </transition>

    <Loader v-if="isLoading" title="登录中"/>

  </div>
</template>

<script>
  import Loader from "../components/loader"

  export default {
    name: "login",
    components: {
      Loader
    },
    data() {
      return {
        // user: { phone: "", code: "", openId: "ot23W05_9NC1bfllkCWiAS7Fuexw", },
        user: { phone: "", code: "", openId: "",nickName: "", avatar: "" },
        isLoading: true,
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
        weChatUser: null,
        detail: {},
        openid: '',
        token: '',
        score: 0,
      };
    },
    created() {
      document.title =this.$route.meta.title;
      console.log(this.$store.state);
      this.detail = this.$store.state.answerDetail;
    },
    mounted() {
     console.log('code-->', this.code);
      console.log(this.$store.state);
      console.log(localStorage.getItem('openid'));
      this.openid = localStorage.getItem('openid') ? localStorage.getItem('openid'):false;
      this.user.openId = this.openid;
      this.token = localStorage.getItem("accessToken") ? localStorage.getItem("accessToken") :false;
      console.log('token',localStorage.getItem("accessToken"));
      if (this.openid) { // 1.有openid
        this.get_login()
      } else { // 2.没有openid
        // if (!this.token) {
          if (!this.isAll) {
            this.get_wx_code(2)
          } else {
            this.get_wx_code(1)
          }
        // }
      }
      // if (this.openid == '') { // 1.绑定过还是空  2.没绑定
      //   this.get_wx_code()
      // } 
      // else {
      //   this.isLoading = false;
      //   this.get_login()
      // }
      // if (this.isLogin && this.user.openId) { // 已绑定手机号
      //   this.isLoading = true;
      //   this.get_login()
      // }
      // if (this.code && this.code.length > 0 && !this.isLogin) { // 未绑定手机号
      //   this.isLoading = true;
      //   this.get_open_id()
      // }
      // this.get_open_id()
      // if (this.$store.state.openId == null) {
      //   this.api.http("post", this.api.isGetCode, {}, result => {
      //     if (result == 1) {
      //       if (this.code == null) {
      //         location.href = this.api.ip + "wxClient/getCode?redirectUrl=" + encodeURIComponent(location.href);
      //       }
      //       else {
      //         this.api.http("post", this.api.getOpenId, { code: this.code }, result => {  
      //           result = JSON.parse(result);
      //           this.$store.dispatch("setOpenId", result.openid);
      //           localStorage.setItem("openid", result.openid);
      //           this.user.openId = result.openid;
      //           this.user.nickName = result.nickname;
      //           this.user.avatar = result.headimgurl;
      //           this.weChatUser = result;
      //           window.weChatUserNickName = result.nickname;
      //           window.weChatUserHeadimgurl = result.headimgurl;
      //           //localStorage.setItem("userInfo", JSON.stringify(result));
      //           this.api.http("post", this.api.login, {
      //             openId: this.user.openId,
      //             nickName: result.nickname,
      //             avatar: result.headimgurl
      //           }, result => {
      //             localStorage.setItem("accessToken", result.token);
      //             this.$store.dispatch("setToken", result.token);
      //             localStorage.setItem("userInfo", JSON.stringify(result));
      //             this.isLogin = true;
      //             this.isLoading = false;
      //             let redirectUrl = this.$route.query.redirect;
      //             let questionId = localStorage.getItem("questionId");
      //             console.log('redirect跳转 :', redirectUrl);
      //             console.log('Number(localStorage.getItem("questionId")', Number(localStorage.getItem("questionId")));
      //             if (this.$route.query.redirect != undefined) {
      //                 console.log('直接跳转=====》', redirectUrl);
      //                 console.log('this.detail====>', this.detail);
      //                 this.$store.dispatch("setAnswerDetail", this.detail);
      //                 this.$router.replace({ path: redirectUrl, query: {questionId: questionId}});
      //             }
      //             else {
      //               this.$router.go(-3);
      //             }
      //           }, error => {
      //             this.isLoading = false;
      //             this.$toast(error.msg);
      //           });
      //         }, error => { });
      //       }
      //     }
      //   }, error => { });
      // }
      // else {
      //   console.log('已有openid');
      //   debugger
      //   this.isLoading = false;
      //   this.user.openId = this.$store.state.openId;
      // }

    },
    methods: {
      /**********获取微信授权code**********/
      get_wx_code (type) { // 1第一次绑定手机号  2.已绑定
        this.api.http("post", this.api.isGetCode, {}, result => {
          if (result == 1) {
            if (this.code == null) {
              location.href = this.api.ip + "wxClient/getCode?redirectUrl=" + encodeURIComponent(location.href);
            } else {
              this.get_open_id(type)
            }
          }
        }, error => {
          this.$toast(error.msg)
        })
      },
      /*********登录***********/
      get_login () {
        this.api.http("post", this.api.login, {
          openId: this.user.openId,
          nickName: this.user.nickName,
          avatar: this.user.avatar
        }, result => {
          localStorage.setItem("accessToken", result.token);
          this.$store.dispatch("setToken", result.token);
          localStorage.setItem("userInfo", JSON.stringify(result));
          this.isLogin = true;
          this.isLoading = false;
          let redirectUrl = this.$route.query.redirect;
          let questionId = localStorage.getItem("questionId");
          console.log('redirect跳转 :', redirectUrl);
          console.log('Number(localStorage.getItem("questionId")', Number(localStorage.getItem("questionId")));
          if (this.$route.query.redirect != undefined) {
              console.log('直接跳转=====》', redirectUrl);
              console.log('this.detail====>', this.detail);
              this.$store.dispatch("setAnswerDetail", this.detail);
              this.$router.replace({ path: redirectUrl, query: {questionId: questionId}});
          }
          else {
            this.$router.go(-3);
          }
        }, error => {
          this.isLoading = false;
          this.$toast(error.msg);
        });
      },
      /*********获取openid**********/
      get_open_id (type) {
        this.api.http("post", this.api.getOpenId, { code: this.code }, result => {  
            result = JSON.parse(result);
            this.$store.dispatch("setOpenId", result.openid);
            localStorage.setItem("openid", result.openid);
            this.user.openId = result.openid;
            this.user.nickName = result.nickname;
            this.user.avatar = result.headimgurl;
            console.log('this.user', this.user);
            this.weChatUser = result;
            window.weChatUserNickName = result.nickname;
            window.weChatUserHeadimgurl = result.headimgurl;
            if (type === 1) {
              this.get_phone_bind()
            } else if (type === 2) {
              this.get_login()
            }
        }, error => {
          this.$toast(error.msg);
          this.isLoading = false;
        });
      },
      get_phone_bind () {
        console.log('this.user', this.user);
        this.api.http("post", this.api.bindPhone, this.user, result => {
          localStorage.setItem("accessToken", result.token);
          this.$store.dispatch("setToken", result.token);
          this.score = result.score;
          this.isLogin = true;
          this.isLoading = false;
          this.api.http("post", this.api.getInfo, {}, result => {
            console.log('260 result', JSON.stringify(result));
            console.log('this.$route.query', this.$route.query);
            if(result.avatar && result.avatar.indexOf("http") != -1){
              result["isUserHeadPic"] = true;
            }else{
              result["isUserHeadPic"] = false;
            }
            localStorage.setItem("userInfo", JSON.stringify(result));
            setTimeout(() => {
              if (this.$route.query.redirect != undefined) {
                this.$router.replace({ path: this.$route.query.redirect });
              }
              else {
                this.$router.go(-3);
              }
            }, 1000);
          }, error => { });
        }, error => {
          this.$toast(error.msg);
          this.isCodeError = true;
          this.isLoading = false;
        });
      },
      /*登录*/
      submit() {
        if (this.util.empty(this.user.phone) || !this.util.isPhone.test(this.user.phone)) {
          this.isPhoneError = true;
          return;
        } else if (this.okPhone !== '' &&  this.okPhone !== this.user.phone) {
          this.isPhoneError = true;
          return;
        }
        if (this.util.empty(this.user.code)) {
          this.isCodeError = true;
          return;
        }
        this.isLoading = true;
        // this.user.nickName = window.weChatUserNickName;
        // this.user.avatar = window.weChatUserHeadimgurl;
        this.get_phone_bind()
        // this.get_wx_code(1)
        // this.get_phone_bind()
        // this.api.http("post", this.api.bindPhone, this.user, result => {
        //   localStorage.setItem("accessToken", result.token);
        //   this.$store.dispatch("setToken", result.token);
        //   this.score = result.score;
        //   this.isLogin = true;
        //   this.isLoading = false;
        //   this.api.http("post", this.api.getInfo, {}, result => {
        //     if(result.avatar.indexOf("http") != -1){
        //       result["isUserHeadPic"] = true;
        //     }else{
        //       result["isUserHeadPic"] = false;
        //     }
        //     localStorage.setItem("userInfo", JSON.stringify(result));
        //     setTimeout(() => {
        //       if (this.$route.query.redirect != undefined) {
        //         this.$router.replace({ path: this.$route.query.redirect });
        //       }
        //       else {
        //         this.$router.go(-3);
        //       }
        //     }, 1000);
        //   }, error => { });
        // }, error => {
        //   this.$toast(error.msg);
        //   this.isCodeError = true;
        //   this.isLoading = false;
        // });
      },
      /*获取验证码*/
      getCode() {
        if (this.util.empty(this.user.phone) || !this.util.isPhone.test(this.user.phone)) {
          this.isPhoneError = true;
          return;
        }
        this.api.http("post", this.api.getBindCode, this.user, result => {
          //Test
         // this.user.code = result;
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
        }, error => { 
          // console.log(error)
          this.$toast(error.msg) 
        });
      },
      /*检查输入*/
      check(type) {
        if (type == 0) {
          if (!this.util.isPhone.test(this.user.phone)) {
            this.isPhoneError = true;
          } else {
            this.isPhoneError = false;
          }
        }
        else if (type == 1){
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
