<template>
  <div id="signin">
    <div class="bg">
      <div class="score">
        <div>
          <div class="num">{{countScore}}</div>
          <div class="hint">积分总数</div>
        </div>
      </div>
      <div class="total">
        <div class="left">
          <div class="num">
            <span>{{signData.days}}</span>
            <span>天</span>
          </div>
          <div class="name">连续签到</div>
        </div>
        <div class="right">
          <div class="num">
            <span>{{signData.countDays}}</span>
            <span>天</span>
          </div>
          <div class="name">累计签到</div>
        </div>
      </div>
    </div>
    <div class="ad-bg" v-if="adItem != null && adItem.status == 1" @click="adDetail">
      <img class="signInLogo" :src="imgIp + adItem.img" alt="">
    </div>
    <div class="worp">
      <div class="sign-bg">
        <div class="title">{{month}}月签到日历</div>
        <div class="week">
          <div>日</div>
          <div>一</div>
          <div>二</div>
          <div>三</div>
          <div>四</div>
          <div>五</div>
          <div>六</div>
        </div>
        <transition-group name="fade">
          <div class="day-row" v-for="(item, index) in signHistory.monthArr" :key="index">
              <div class="day-item" :class="{active: childItem.isSign}" v-for="(childItem, index) in item" :key="index" :data-days="childItem.days">{{childItem.days}}</div>
          </div>
        </transition-group>
      </div>
    </div>
    <div class="title"><router-link to="/index/rule" tag="span">查看积分规则说明</router-link></div>
    <div class="row" @click="mall">
      <div class="name">积分商城
        <i class="right-icon"></i>
      </div>
    </div>
    <transition name="fade">
      <div class="mask" v-if="isShow">
        <div class="signnin-bg">
          <div class="title">签到成功</div>
          <div class="sig-row" v-if="signScore > 0">
            <div class="success">签到积分
              <span>+</span>
              <span>{{signScore}}</span>
            </div>
            <div class="success">连续签到
              <span>+</span>
              <span>{{signScore}}</span>
            </div>
          </div>
          <img src="../assets/signin.png" alt="">
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: "signin",
    data() {
      return {
        imgIp: this.api.imgIp,
        countScore: 0,
        signData: {
          days: 0,
          countDays: 0
        },
        signHistory: {},
        month: new Date().format("MM"),
        isShow: false,
        adItem: null,
        signScore: 0,
      }
    },
    created() {
      //签到客户数据统计
      this.api.http("post", this.api.pvUploadData, {place:4,flag:1}, (result) => {}, (error) => {});

      //是否签到
      this.api.http("post", this.api.isSign, {}, (result) => {
        if (!result) {
          this.api.http("post", this.api.sign, {}, (result) => {
            this.signScore = result;
            this.isShow = true;
            setTimeout(() => {
              this.isShow = false;
              this.$router.go(0);
            }, 3000)
          }, (error) => {})
        }
      }, (error) => {})
      //总分
      this.api.http("post", this.api.getCountScore, {}, (result) => {
        this.countScore = result;
      }, (error) => {})
      //连续签到
      this.api.http("post", this.api.getSignData, {}, (result) => {
        this.signData = result;
      }, (error) => {})
      //签到记录
      this.api.http("post", this.api.getSignHistory, {}, (result) => {
        result.monthArr = [];
        let tempList = [];
        let count = 0;
        for (let j = 0; j < result.length; j++) {
          ++count;
          let item = result[j];
          item.days = new Date(item.day).getDate();
          if (result.monthArr.length == 0 && tempList.length == 0) {
            for (let k = 0; k < this.util.getWeekNumber(item.day) - 1; k++) {
              tempList.push("");
            }
          }
          if (tempList.length < 7) {
            tempList.push(item);
            if (tempList.length == 7 || count == result.length){
              result.monthArr.push(tempList);
              tempList = [];
            }
          }
        }
        this.signHistory = result;
        //console.log(this.signHistory.monthArr);
      }, (error) => {})

      //获取广告位
      this.api.http("post", this.api.getAdList, {position: 3}, (result) => {
        this.adItem = result;
      }, (error) => {})

    },

    updated() {
        let childArr = document.getElementsByClassName("active");     //borderTopLeftRadius  borderTopRightRadius  borderBottomLeftRadius  borderBottomRightRadius
        console.log(childArr)
        let firstDiv = childArr[0];
        firstDiv.style.borderTopLeftRadius = "50px";
        firstDiv.style.borderBottomLeftRadius = "50px";
        if (childArr.length > 1) {
        
          for(var i=0;i<=childArr.length-2;i++){
            if((childArr[i+1].innerHTML - childArr[i].innerHTML) == 1 && i==0 &&childArr.length>=3){
              childArr[i].style.borderTopLeftRadius = "50px";
              childArr[i].style.borderBottomLeftRadius = "50px";
              childArr[i+1].style.borderRadius = "0";
            }else if((childArr[i+1].innerHTML - childArr[i].innerHTML) == 1 && i==0 &&childArr.length<3){
              childArr[i].style.borderTopLeftRadius = "50px";
              childArr[i].style.borderBottomLeftRadius = "50px";
              childArr[i+1].style.borderTopRightRadius = "50px";
              childArr[i+1].style.borderBottomRightRadius = "50px";
            }else if((childArr[i+1].innerHTML - childArr[i].innerHTML) > 1 && i==0 &&childArr.length>=3){
              childArr[i].style.borderTopRightRadius = "50px";
              childArr[i].style.borderBottomRightRadius = "50px";
              childArr[i+1].style.borderTopLeftRadius = "50px";
              childArr[i+1].style.borderBottomLeftRadius = "50px";
            }else if((childArr[i+1].innerHTML - childArr[i].innerHTML) > 1 && i==0 &&childArr.length<3){
              childArr[i].style.borderTopRightRadius = "50px";
              childArr[i].style.borderBottomRightRadius = "50px";
              childArr[i+1].style.borderTopLeftRadius = "50px";
              childArr[i+1].style.borderBottomLeftRadius = "50px";            
            }

            if((childArr[i+1].innerHTML - childArr[i].innerHTML) == 1 && i>0){
              childArr[i].style.borderTopRightRadius = "0";
              childArr[i].style.borderBottomRightRadius = "0";
              childArr[i+1].style.borderTopLeftRadius = "0";
              childArr[i+1].style.borderBottomLeftRadius = "0";
            }else if((childArr[i+1].innerHTML - childArr[i].innerHTML) > 1 && i>0){
              childArr[i].style.borderTopRightRadius = "50px";
              childArr[i].style.borderBottomRightRadius = "50px";
              childArr[i+1].style.borderTopLeftRadius = "50px";
              childArr[i+1].style.borderBottomLeftRadius = "50px";
            }
          }
        }
        let lastDiv = childArr[childArr.length - 1];
        
        lastDiv.style.borderTopRightRadius = "50px";
        lastDiv.style.borderBottomRightRadius = "50px";
    },
    methods: {
      mall() {
        this.$toast('功能后续上线中,暂时无法访问')
      },
      adDetail(type) {
        this.api.http("post", this.api.pvUploadData, {place:4,flag:0}, (result) => {}, (error) => {});
        if (this.adItem.type == 1) {
          location.href = this.adItem.url;
        }
        else {
          this.$store.dispatch("setAdDetail", this.adItem);
          this.$router.push({ path: "/index/content" });
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  #signin {
    position: absolute;
    width: 100%;
    height: 100%;
    .bg {
      height: calc(434px / 2);
      background: url(../assets/bg2.png);
      background-size: cover;
      background-position: center;
      position: relative;
      .score {
        position: absolute;
        left: 50%;
        top: 30px;
        transform: translate(-50%, 0);
        width: 80px;
        height: 80px;
        background: #fff;
        box-shadow: 0 0 15px 0 #539019;
        text-align: center;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .num {
          font-size: 24px;
          color: #5FB62A;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .hint {
          color: #666666;
        }
      }
      .total {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 80px;
        display: flex;
        align-items: center;
        .left,
        .right {
          width: 50%;
          text-align: center;
          .num span:first-child {
            font-size: 24px;
            color: #5FB62A;
          }
          .num span:last-child {
            color: #666666;
          }
          .name {
            color: #666666;
          }
        }
      }
    }
    .ad-bg{
      height: 80px;
      background: #fff;
      padding: 0;
      box-sizing: border-box;
      margin-top: 10px;
    }
    .worp {
      padding: 15px;
      display: flex;
      justify-content: center;
      .sign-bg {
        height: calc(550px / 2);
        width: calc(702px / 2);
        background: url(../assets/sign-bg.png);
        background-size: cover;
        background-position: center;
        .title {
          padding-top: 30px;
        }
        .week {
          display: flex;
          flex-wrap: nowrap;
          padding: 10px;
          div {
            width: calc(100% / 7);
            text-align: center;
            letter-spacing: 1px;
            color: #666666;
          }
        }
        .day-row{
          display: flex;
          flex-wrap: nowrap;
          padding: 0 10px;
          .day-item{
            padding: 5px 0;
            width: calc(100% / 7);
            text-align: center;
            letter-spacing: 1px;
          }
          .day-item.active{
            background: #5DB42F;
            color: #fff;
            &:first-child{
              border-radius: 50px 0 0 50px;
            }
            &:last-child{
              border-radius: 0 50px 50px 0;
            }
          }
        }
      }
    }

    .title {
      text-align: center;
      color: #5FB62A;
    }
    .row {
      display: flex;
      background: #FFFFFF;
      height: 40px;
      margin-top: 10px;
      align-items: center;
      position: relative;
      padding: 0 15px;
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
      .signnin-bg{
        width: 200px;
        height: 187px;
        background: #FFFFFF;
        border-radius: 4px;
        padding: 15px;
        padding-bottom: 0;
        img{
          width: calc(318px / 2);
          height: calc(186px / 2);
          display: block;
          margin: 0 auto;
        }
        .title {
          font-size: 16px;
          color: #555555;
        }
        .sig-row{
          display: flex;
          .success {
            color: #555555;
            margin-top: 15px;
            width: 50%;
            text-align: center;
            span:nth-child(1) {
              color: #5FB62A;
            }
            span:nth-child(2) {
              font-size: 20px;
              color: #5FB62A;
            }
          }
        }
      }
    }
  }
</style>
<style>
  .signInLogo{
    width: 100%;
    height: auto;
  }
</style>