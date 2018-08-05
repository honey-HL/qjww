<template>
  <div id="expert">
    <div class="tabbar">
      <ul>
        <li v-for="(item, index) in meunList" :style="{width: 'calc(100% /' + meunList.length + ')'}" :key="index" @click="setCurrent(index)"
          :class="{'active': current == index}">{{item.name}}</li>
      </ul>
      <div class="border-bar" :style="{width: 'calc(100% /' + meunList.length + ')', left: countLeft + '%'}">
        <span></span>
      </div>
    </div>

    <div class="swiper-container" id="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="screen-bar">
            <div class="screen-top">
              <div class="left">
                <span class="hint">您的位置：</span>
                {{currentAddress.province + currentAddress.city}}
              </div>
              <div class="right" @click="switchMask">
                切换地区
                <i></i>
              </div>
            </div>
            <transition name="fade">
              <div class="mask" v-if="isScreen" @click="switchMask">
                <div class="input-bar" @click.stop>
                  <div class="input-div"><span @click="showPopup = !showPopup">请选择地址</span></div>
                  <div class="search-bar">
                    <input placeholder="输入地区、师傅名字" maxlength="30" v-model="searchValue" @keyup.enter="searchEnterFun">
                    <img src="../assets/search.png" @click="search"/>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <Loading v-if="isShowLoading" style="padding: 30px 0"/>
          <scroller v-else-if="dataList.length > 0" class="scroller" style="top: 46px;" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
            <transition-group name="fade">
              <div class="row" v-for="(item, index) in dataList" :key="index" @click="detail(item)">
                <div class="head" v-lazy:background-image="imgIp + item.avatar">
                  <i class="b"></i>
                </div>
                <div class="info">
                  <div class="name-bar">
                    <span class="name">{{item.userName}}</span>
                    <span class="address">{{item.detailAdd}}</span>
                    <span class="range">{{countKM(item.distance)}}KM</span>
                  </div>
                  <div class="address-bar">
                    <span class="answer-num">已回答{{item.answerNum}}次</span>
                    <span class="zan-num">{{item.praiseNum == null ? 0 : item.praiseNum}}人点赞</span>
                    <span class="add-detail">{{item.storeName}}</span>
                  </div>
                </div>
              </div>
            </transition-group>
          </scroller>
          <Not v-else-if="isNetwork" title="网络出现故障" hint="网络出现故障，请刷新一下" type="YC">
            <div class="o-btn">
              <span @click="refreshRouter(0)">刷新</span>
            </div>
          </Not>
          <Not v-else-if="dataList.length == 0" title="暂无专家" hint="当前位置暂无专家" type="ZX"></Not>

        </div>
        <div class="swiper-slide">
          <Loading v-if="isShowLoading2" style="padding: 30px 0"/>
          <scroller v-else-if="dataList2.length > 0" class="scroller" :on-refresh="refresh2" :on-infinite="infinite2" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
            <div class="item">
              <div class="row">
                <div class="head">
                  <i class="b"></i>
                </div>
                <div class="info">
                  <div class="name-bar">
                    <span class="name">李师傅</span>
                    <span class="address2">啥都好过分打手犯规放大个</span>
                  </div>
                  <div class="address-bar">
                    <span class="detail">啥都好过分打手犯规放大个</span>
                  </div>
                </div>
              </div>
              <div class="phone-bar">
                <div></div>
                <div @click="openPhone(15208322308)"></div>
              </div>
            </div>
          </scroller>
          <Not v-else-if="isNetwork" title="网络出现故障" hint="网络出现故障，请刷新一下" type="YC">
            <div class="o-btn">
              <span @click="refreshRouter(1)">刷新</span>
            </div>
          </Not>
          <Not v-else-if="dataList2.length == 0" title="暂无专家咨询" hint="已咨询过的专家将显示在这里" type="ZX">
            <div class="o-btn">
              <span>找专家咨询</span>
            </div>
          </Not>

        </div>
      </div>
    </div>

    <van-popup v-model="showPopup" position="bottom">
      <van-area :area-list="areaList" :columns-num="2" title="选择城市" @confirm="confirmArea" @cancel="cancelArea"/>
    </van-popup>

  </div>
</template>
<script>
  import "swiper/dist/css/swiper.css";
  import Swiper from "swiper";
  import Not from "../components/notData";
  import Loading from "../components/loading";
  import areaList from "../common/area"

  export default {
    name: "expert",
    components: {
      Not, Loading
    },
    data() {
      return {
        imgIp: this.api.imgIp,
        meunList: [{ id: 1, name: "专家" }, { id: 2, name: "我的咨询" }],
        current: 0,
        swiper: null,
        isScreen: false,
        searchValue: "",
        isShow: false,
        pageNO1: 1,
        pageNO2: 1,
        pageSize: 10,
        isShowLoading: true,
        isShowLoading2: true,
        dataList: [],
        dataList2: [],
        isFrist: false,
        isEnd: false,
        isEnd2: false,
        isNetwork: false,
        lng: 30.652090,
        lat: 104.066277,
        showPopup: false,
        areaList: areaList,
        currentAddress: {
          province: "四川省",
          city: "成都市",
          cityId: 510100
        },
      };
    },
    created () {
      this.api.http("post", this.api.jsSign, {}, (result) => {
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: result.appId, // 必填，公众号的唯一标识
          timestamp: result.timestamp, // 必填，生成签名的时间戳
          nonceStr: result.noncestr, // 必填，生成签名的随机串
          signature: result.signature,// 必填，签名，见附录1
          jsApiList: ["getLocation","openLocation"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function(){
          wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              console.log(res);
              let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              alert("腾讯：" + latitude + "," + longitude);
            }
          });
        });
        wx.error(function(res){
          alert(JSON.stringify(res));
        });
      }, () => {})
    },
    mounted() {
      let thas = this;
      this.swiper = new Swiper(".swiper-container", {
        on: {
          slideChangeTransitionStart: function () {
            if (this.activeIndex == 1 && !thas.isFrist) {
              thas.isFrist = true;
              thas.getData(1);
            }
            thas.current = this.activeIndex;
          }
        }
      });

      setTimeout(() => {
        this.getData(0);
      }, 1000)
    },
    methods: {
      /*切换tab卡*/
      setCurrent(index) {
        this.current = index;
        this.swiper.slideTo(index);
      },
      /**搜索回调*/
      searchEnterFun(e) {
        let keyCode = window.event ? e.keyCode : e.which;

        if (keyCode == 13) {
          this.search();
        }
      },
      search() {
        if (this.searchValue.trim() == "") {
          this.searchValue = "";
        }
        else if (this.util.isEmoji.test(this.searchValue)) {
          this.$toast("暂不支持emoji");
          this.searchValue = "";
        }
        else {
          this.pageNO1 = 1;
          this.getData(0);
        }
      },
      /*切换遮罩*/
      switchMask() {
        this.isScreen = !this.isScreen;
      },
      /*获取列表*/
      getData(type) {
        this.api.http("post", this.api.getSpecialist, {
          pageNO: type == 0 ? this.pageNO1 : this.pageNO2,
          pageSize: this.pageSize,
          lng: this.lng,
          lat: this.lat
        }, result => {
          if (type == 0) {
            this.isShowLoading = false;
            if (this.pageNO1 == 1) {
              this.dataList = result;
              if (result.length == 0) {
                this.isEnd = true;
              }
            }
            else {
              if (result.length == 0) {
                this.pageNO1 --;
                this.isEnd = true;
              }
              else {
                result.forEach(item => {
                  this.dataList.push(item);
                })
              }
            }
          }
          else {
            this.isShowLoading2 = false;
            if (this.pageNO2 == 1) {
              this.dataList2 = result;
              if (result.length == 0) {
                this.isEnd2 = true;
              }
            }
            else {
              if (result.length == 0) {
                this.pageNO2 --;
                this.isEnd2 = true;
              }
              else {
                result.forEach(item => {
                  this.dataList2.push(item);
                })
              }
            }
          }
        }, error => {
          if (type == 0) {
            this.isShowLoading = false;
          }
          else {
            this.isShowLoading2 = false;
          }
          this.isNetwork = true;
        });
      },
      /*下拉刷新*/
      refresh(done) {
        setTimeout(() => {
          this.pageNO1 = 1;
          this.getData(0);
          done();
        }, 1000);
      },
      /*上拉刷新*/
      infinite(done) {
        setTimeout(() => {
          this.pageNO1 ++;
          this.getData(0);
          done(this.isEnd);
        }, 1000);
        return;
      },
      /*下拉刷新*/
      refresh2(done) {
        setTimeout(() => {
          this.pageNO2 = 1;
          this.getData(1);
          done();
        }, 1000);
      },
      /*上拉刷新*/
      infinite2(done) {
        setTimeout(() => {
          this.pageNO2 ++;
          this.getData(1);
          done(this.isEnd2);
        }, 1000);
        return;
      },
      openPhone(phone) {
        this.$dialog.confirm({
          title: '电话直连',
          message: '确定拨打电话: <span style="color: #5FB62A;">' + phone + '</span> 吗？'
        }).then(() => {
          window.location.href = 'tel://' + this.phone;
        }).catch(() => {
          // on cancel
        });
      },
      refreshRouter (type) {
        this.isNetwork = false;
        if (type == 0) {
          this.pageNO1 = 1;
          this.isShowLoading = true;
          this.getData(0);
        }
        else {
          this.pageNO2 = 1;
          this.isShowLoading2 = true;
          this.getData(1);
        }
      },
      /**计算公里*/
      countKM (km) {
        return (Number(km) / 1000).toFixed(2);
      },
      /**选择地址回调*/
      confirmArea(arr) {
        this.showPopup = false;
        this.isScreen = false;
        this.currentAddress = {
          province: arr[0].name,
          city: arr[1].name,
          cityId: arr[1].code
        }
        this.pageNO1 = 1;
        this.getData(0);
      },
      cancelArea() {
        this.showPopup = false;
      },
      /**详情*/
      detail (item) {
        this.$store.dispatch("setExpertDetail", item);
        this.$router.push({
          path : "/index/expertDetail",
        });
      },
    },
    computed: {
      countLeft() {
        return this.current == 0 ? this.current : 50;
      },
    }
  };
</script>
<style lang="scss" scoped>
  #expert {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    & .tabbar {
      position: relative;
      height: 50px;
      background: #fff;
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
      & ul {
        display: flex;
        list-style: none;
        position: relative;
        & li {
          line-height: 50px;
          text-align: center;
          font-size: 16px;
          color: #999999;
          transition: all 0.5s;
        }
        & li.active {
          color: #5fb62a;
        }
      }
      & .border-bar {
        position: absolute;
        bottom: 5px;
        display: flex;
        justify-content: center;
        transition: all 0.3s;
        left: 0;
        span {
          display: inline-block;
          width: 20px;
          height: 3px;
          background: #5fb62a;
          border-radius: 100px;
        }
      }
    }

    .swiper-container {
      width: 100%;
      height: calc(100% - 50px);
      & .swiper-slide {
        position: relative;
        & .o-btn {
          text-align: center;
          padding-top: 15px;
          span {
            display: inline-block;
            width: 108px;
            height: 32px;
            line-height: 32px;
            background-image: linear-gradient(-90deg, #5FB62A 0%, #78BC28 100%);
            border-radius: 100px;
            color: #fff;
          }
        }
        &:nth-child(1) {
          padding-top: 46px;
        }
        .item .phone-bar {
          background: #fff;

          display: flex;
          justify-content: flex-end;
          align-items: center;
          padding-bottom: 10px;
          padding-right: 15px;
          div {
            background-size: cover !important;
            background-position: center !important;
            margin-left: 40px;
            &:first-child {
              width: 24px;
              height: 21px;
              background: url(../assets/comment-1.png);
            }
            &:last-child {
              width: 23px;
              height: 23px;
              background: url(../assets/phone.png);
            }
          }
        }
        & .row {
          background: #fff;
          margin-top: 10px;
          padding: 10px 15px;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          .head {
            width: 48px;
            height: 48px;
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
          .info {
            width: calc(100% - 48px);
            padding-left: 15px;
            box-sizing: border-box;
            position: relative;
          }
          .name-bar {
            display: flex;
            margin-bottom: 6px;
            & .name {
              display: inline-block;
              font-size: 14px;
              color: #555555;
              width: 50px;
            }
            .address {
              font-size: 14px;
              color: #999999;
              padding-right: 50px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .address2 {
              font-size: 14px;
              color: #999999;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .range {
              position: absolute;
              right: 0;
              top: 2px;
              color: #999999;
            }
          }
          .address-bar {
            color: #555555;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .zan-num {
              margin-left: 10px;
            }
            .add-detail {
              color: #999999;
              position: absolute;
              right: 0;
              top: 1px;
            }
            .detail {
              color: #999999;
            }
          }

        }
        & .screen-bar {
          position: absolute;
          width: 100%;
          top: 0;
          z-index: 1;
          & .screen-top {
            display: flex;
            padding: 15px;
            box-sizing: border-box;
            background: #fff;
            .left {
              width: 50%;
              .hint {
                color: #999999;
              }
            }
            .right {
              width: 50%;
              text-align: right;
              color: #5FB62A;
              position: relative;
              padding-right: 15px;
              i {
                display: inline-block;
                position: absolute;
                width: 10px;
                height: 4px;
                top: 6px;
                right: 0px;
                background: url(../assets/down.png);
                background-size: cover;
                background-position: center;
              }
            }

          }
          & .mask {
            position: fixed;
            height: 100%;
            width: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 1;
            transition: all 0.5s;
            & .input-bar {
              background: #fff;
              box-sizing: border-box;
              padding: 15px;
              padding-top: 0;
              .input-div {
                span {
                  color: #999;
                  display: inline-block;
                  height: 32px;
                  line-height: 32px;
                  background: #fff;
                  border: 1px solid rgba(153, 153, 153, 0.10);
                  border-radius: 4px;
                  font-size: 12px;
                  width: 100%;
                  margin: 10px 0;
                  padding-left: 10px;
                  box-sizing: border-box;
                }
              }
              .search-bar {
                width: 100%;
                position: relative;
                img {
                  width: calc(34px / 2);
                  height: calc(34px / 2);
                  position: absolute;
                  top: 6.5px;
                  right: 15px;
                }
                input {
                  width: 100%;
                  height: 32px;
                  font-size: 12px;
                  line-height: 32px;
                  border: 1px solid rgba(153, 153, 153, 0.10);
                  border-radius: 4px;
                  padding-left: 15px;
                  box-sizing: border-box;
                  outline: none;
                }
              }
            }
          }
        }

      }
    }
  }
</style>
