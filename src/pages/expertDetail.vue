<template>
  <div id="expertDetail">
    <scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
      <div class="bg">
        <div class="worp">
          <div class="head-bar">
            <div class="haed" v-lazy:background-image="imgIp + item.avatar">
              <i class="b"></i>
            </div>
          </div>
          <div class="name">{{item.userName}}</div>
          <div class="address">{{item.detailAdd}}</div>
          <div class="hint">专业资深的手机维修专家，精通iPhone、安卓等设备维修，最值得信赖的XXX认证专家。</div>
          <div class="total-bar">
            <div class="left">
              <span class="num">{{item.answerNum}}</span>
              <span class="font">回答</span>
            </div>
            <div class="right">
              <span class="num">{{item.praiseNum}}</span>
              <span class="font">赞</span>
            </div>
          </div>
        </div>
      </div>
      <transition-group name="fade">
        <Loading v-if="isShowLoading" style="padding: 30px 0"/>
        <div class="row" v-for="(child, index) in items" :key="index">
          <div class="top">
            <div class="head" v-lazy:background-image="imgIp + child.userAvatar"></div>
            <div class="name">{{child.userNickName}}</div>
          </div>
          <div class="title">
            <i class="badge problem"></i>
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
      <div class="bottom">
        <div class="btn">在线咨询</div>
        <div class="btn" @click="phone">电话直连</div>
      </div>
    </scroller>
  </div>
</template>

<script>
  import Loading from "../components/loading";
  export default {
    name: "expertDetail",
    components: {
      Loading
    },
    data() {
      return {
        imgIp: this.api.imgIp,
        item: null,
        items: [],
        pageNo: 1,
        pageSize: 10,
        isShowLoading: true,
        phone: null,
      }
    },
    created() {
      this.item = this.$store.state.expertDetail;
      setTimeout(()=> {
        this.getData();
      }, 1000)
    },
    methods: {
      /*获取列表*/
      getData() {
        this.api.http("post", this.api.getSpeciainfo, {
          pageNO: this.pageNo,
          pageSize: this.pageSize,
          id: this.item.id
        }, result => {
          this.isShowLoading = false;
          if (this.pageNo == 1) {
            this.items = result.data;
            this.phone = result.phone;
          }
          else {
            if (result.data.length == 0) {
              this.pageNo--;
            }
            else {
              this.items.concat(result.data);
            }
          }
        }, error => {
          console.log(error);
        });
      },
      /*下拉刷新*/
      refresh(done) {
        setTimeout(() => {
          this.start = 1;
          this.getData();
          done();
        }, 1000);
      },
      /*上拉刷新*/
      infinite(done) {
        setTimeout(() => {
          this.start++;
          this.getData();
          done(true);
        }, 1000);
        return;
      },
      phone() {
        this.$dialog.confirm({
          title: '电话直连',
          message: '确定拨打电话:' + this.phone + ' 吗？'
        }).then(() => {
          // on confirm
        }).catch(() => {
          // on cancel
        });
      },
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
      margin-top: 15px;
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
