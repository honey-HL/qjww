<template>
  <div id="expertDetail">
    <scroller :style="{height: scrollHeight}" class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
      <div class="bg">
        <div class="worp">
          <div class="head-bar">
            <div class="haed" v-lazy:background-image="imgIp + item.avatar">
              <i class="b"></i>
            </div>
          </div>
          <div class="name">{{item.userName}}</div>
          <div class="address">{{item.detailAdd}}</div>
          <div class="hint"><p>{{item.introduce}}</p></div>
          <div class="total-bar">
            <div class="left">
              <span class="num">{{item.answerNum == null ? 0 : item.answerNum}}</span>
              <span class="font">回答</span>
            </div>
            <div class="right">
              <span class="num">{{item.praiseNum == null ? 0 : item.praiseNum}}</span>
              <span class="font">赞</span>
            </div>
          </div>
        </div>
      </div>
      <div class="NewestAnswerDiv">
        <p>最新回答</p>
      </div>
      <transition-group name="fade">
        <div class="row" v-for="(child, index) in items" :key="index">
          <div class="top">
            <div class="head" v-lazy:background-image="imgIp + child.userAvatar"></div>
            <div class="name">{{child.userNickName}}</div>
          </div>
          <div class="title">
            <i class="badge quiz" v-if="child.userPush">提问</i>
            <i class="badge" v-else :class="{img: child.label == 1, video: child.label == 2, problem: child.label == 3}"></i>
            <span v-html="child.questionTitle"></span>
          </div>
          <div class="content" v-html="child.content"></div>
          <div class="operation-bar">
            <div class="left">
              <div class="time">{{child.createTime}}</div>
            </div>
            <div class="right">
            </div>
          </div>
        </div>
      </transition-group>
    </scroller>
    <div class="bottom">
      <div class="btn" @click="consult">在线咨询</div>
      <div class="btn" @click="openPhone">电话直连</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "expertDetail",
    data() {
      return {
        imgIp: this.api.imgIp,
        item: null,
        items: [],
        pageNo: 0,
        pageSize: 10,
        phone: null,
        isEnd: false,
        scrollHeight: "100%"
      }
    },
    created() {
      //window.alert=function(){};
      document.title =this.$route.meta.title;
      this.item = this.$store.state.expertDetail;
      if (this.item == null) {
        this.api.http("post", this.api.specialistInfo, {
          pageNO: this.pageNo,
          pageSize: this.pageSize,
          id: this.$route.query.expertId
        }, (result) => {
          console.log(result);
          this.item = result;
        }, (error) => {
          if(error.code == 203){
            window.history.go(-1);
          }
          window.history.go(-1);
        })
      }
    },
    mounted() {
      this.scrollHeight = (window.innerHeight - 62) + "px";
    },
    methods: {
      /*获取列表*/
      getData() {
        this.api.http("post", this.api.getSpeciainfo, {
          pageNO: this.pageNo,
          pageSize: this.pageSize,
          id: this.item.id
        }, result => {
          if (this.pageNo == 1) {
            this.items = result.data;
            this.phone = result.contactNumber;
            if (result.data.length == 0) {
              this.isEnd = true;
            }
          }
          else {
            if (result.data.length == 0) {
              this.pageNo--;
              this.isEnd = true;
            }
            else {
              result.data.forEach((item) => {
                this.items.push(item);
                console.log(this.items);
              })
            }
          }
        }, error => {
          console.log(error);
        });
      },
      /*下拉刷新*/
      refresh(done) {
        setTimeout(() => {
          this.pageNo = 1;
          this.getData();
          done();
        }, 1500);
      },
      /*上拉刷新*/
      infinite(done) {
        setTimeout(() => {
          this.pageNo++;
          this.getData();
          done(this.isEnd);
        }, 1500);
      },
      openPhone() {
        console.log(this.phone);
        this.$dialog.confirm({
          title: '电话直连',
          message: '确定拨打电话: <span style="color: #5FB62A;">' + this.item.contactNumber + '</span> 吗？'
        }).then(() => {
          window.location.href = 'tel://' + this.item.contactNumber;
        }).catch(() => {
          // on cancel
        });
      },
      consult() {
        this.api.http("post", this.api.speciaListAddRelation, {specialistId:this.item.id}, result => {
          location.href = "https://kefu.easemob.com/webim/im.html?configId=d73a5083-b57e-4eb9-bccf-900f3ad55adf&agentName=" + this.item.email;
        }, error => {
        });
      }
    }
  }
</script>
<style lang="scss" scoped>
  #expertDetail {
    position: absolute;
    width: 100%;
    height: 100%;
    .bg {
      height: 245px;
      background: url(../assets/bg.png);
      background-size: cover;
      background-position: center;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px;
      .worp{
        min-width:130px;
        max-width:330px;  
          .head-bar {
            text-align: center;
            .haed {
              display: inline-block;
              box-shadow: 0 0 10px rgba(133, 24, 24, 0.2);
              width: 58px;
              height: 58px;
              background-size: cover !important;
              background-position: center !important;
              background: #e6e6e6;
              border-radius: 100%;
              box-sizing: border-box;
              border: 2px solid #fff;
              position: relative;
              i {
                display: inline-block;
                width: 12px;
                height: 12px;
                position: absolute;
                bottom: 0;
                right: 0;
                background-size: cover !important;
                background-position: center !important;
              }
              i.b {
                background: url(../assets/attestation-b.png)
              }
              i.o {
                background: url(../assets/attestation-o.png)
              }
            }
          }

          .name {
            font-size: 20px;
            color: #FFFFFF;
            text-align: center;
            margin-top: 5px;
          }
          .address {
            text-align: center;
            margin-top: 5px;
            font-size: 14px;
            color: #FFFFFF;
          }
          .hint {
            margin-top: 15px;
            text-align: center;
            line-height: 21px;
            font-size: 12px;
            color: #FFFFFF;
            p{
              overflow: hidden;
              white-space: nowrap;
              text-overflow:ellipsis;
            }
          }
          .total-bar {
            width: 100%;
            display: flex;
            align-items: center;
            margin-top: 20px;
            .left {
              width: 50%;
              position: relative;
              text-align: center;
              &::before {
                content: "";
                position: absolute;
                height: 100%;
                width: 1px;
                right: 0;
                top: 0;
                background: #e1e1e1;
              }
            }
            .right {
              width: 50%;
              text-align: center;
            }
            .num {
              font-size: 24px;
              color: #FFFFFF;
            }
            .font {
              color: #FFFFFF;
            }
          }
      }
    }
    & .row {
      background: #fff;
      margin-top: 10px;
      position: relative;
      &:first-child {
        margin-top: 0;
      }
      &::before {
        content: "";
        position: absolute;
        height: 1px;
        width: 100%;
        left: 0;
        bottom: 0;
        transform: scaleY(0.5);
        background: #e1e1e1;
      }
      .top {
        padding: 10px 15px;
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
        &::before {
          content: "";
          position: absolute;
          height: 1px;
          width: 100%;
          left: 15px;
          bottom: 0;
          transform: scaleY(0.5);
          background: #e1e1e1;
        }
        .head {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background-size: cover !important;
          background-position: center !important;
          background: #ddd;
        }
        .name {
          padding-left: 10px;
          color: #9a9a9a;

          width: calc(100% - 36px);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .title {
        font-size: 16px;
        color: #000;
        padding: 10px 15px;
        padding-bottom: 0;
        line-height: 22px;
        font-family: 微软雅黑;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        i {
          display: inline-block;
          width: calc(52px / 2);
          height: calc(28px / 2);
          background: #e6e6e6;
          position: relative;
          top: 1px;
          background-size: cover !important;
          background-position: center !important;
        }
        i.img {
          background: url(../assets/img.png);
        }
        i.problem {
          background: url(../assets/problem.png);
        }
        i.video {
          background: url(../assets/video.png);
        }
        i.quiz {
          background: #5FB62A;
          border-radius: 4px;
          color: #fff; font-style:normal;
          line-height: calc(28px / 2);
          padding: 1px;
          text-align: center;
          top: -1px;
        }
      }
      .content {
        line-height: 21px;
        font-size: 14px;
        color: #999999;
        padding: 10px 15px;
        padding-bottom: 0;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      .operation-bar {
        display: flex;
        align-items: center;
        padding: 10px 15px;
        .left {
          width: 50%;
          .time {
            color: #999999;
          }
        }
        .right {
          width: 50%;
          text-align: right;
          .answer {
            color: #999999;
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: center;
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 15px 0;
      background: #fff;
      .btn {
        background-image: linear-gradient(-90deg, #5FB62A 0%, #78BC28 100%);
        border-radius: 100px;
        width: 94px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #fff;
        &:first-child {
          margin-right: 20px;
        }
      }
    }
  }
</style>
<style>
  .NewestAnswerDiv{
    width: 100%;
    max-height: 90px;
    height:max-content;
    padding: 10px 0;
    margin: 0;
    border-bottom: 1px solid #efefef;
  }
  .NewestAnswerDiv>p{
    font-size: 16px;
    color: #5c695c;
    text-align: center;
    font-weight: lighter;
  }
</style>
