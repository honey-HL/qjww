<template>
  <div class="news">
    <scroller v-if="!isShow" class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A"
              loading-layer-color="#5FB62A">
      <transition-group name="fade">
        <div class="row" v-for="(item, index) in items" :key="index" @click="clickReaded(item)">
          <div class="title" v-if="item.type == 2">
            <i :class="[{'news-zan': item.type == 2},{'news-comment': item.type == 1},{'news-activity': item.type == 0}]"></i>
            您的回答<span v-html="item.title"></span>获得{{item.userName}}点赞
          </div>
          <div class="title" v-if="item.type == 1">
              <i :class="[{'news-zan': item.type == 2},{'news-comment': item.type == 1},{'news-activity': item.type == 0}]"></i>
              {{item.userName}} 回答了您提出的问题<span v-html="item.title"></span>
          </div>
          <div class="title" v-if="item.type == 0">
              <i :class="[{'news-zan': item.type == 2},{'news-comment': item.type == 1},{'news-activity': item.type == 0}]"></i>
              本周参与<span v-html="item.title"></span>
          </div>
          <div class="time">{{formatting(item.createTime)}}</div>
        </div>
      </transition-group>
    </scroller>
    <div class="not" v-if="isShow">
      <Not title="暂未收到通知" hint="您收到的通知都在这里汇集" />
    </div>
  </div>
</template>
<script>
  import Not from "../components/notData";
  export default {
    name: "news",
    components: {
      Not
    },
    data() {
      return {
        items: [],
        pageNO: 0,
        pageSize: 10,
        isShow: false,
        isEnd: false,
      }
    },
    methods: {
      formatting (time) {
        return this.util.formatting(time);
      },
      /*获取列表*/
      getData() {
        this.api.http("get", this.api.getNotification, {
          pageNO: this.pageNO,
          pageSize: this.pageSize
        }, result => {
          if (this.pageNO == 1) {
            this.items = result;
            if (result.length == 0) {
              this.isShow = true;
              this.isEnd = true;
            }
          }
          else {
            if (result.length == 0) {
              this.pageNO--;
              this.isEnd = true;
            }
            else {
              result.forEach((item) => {
                this.items.push(item);
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
          this.pageNO = 1;
          this.getData();
          done();
        }, 1000);
      },
      /*上拉刷新*/
      infinite(done) {
        setTimeout(() => {
          this.pageNO++;
          this.getData();
          done(this.isEnd);
        }, 1000);
      },
      clickReaded(item){
        console.log(item);
        //debugger;
        this.api.http("get", this.api.clickRead, {
          id:item.id,
        }, result => {}, error =>{});

        if(item.isActivte ==1){
          window.location.href=item.url;
        }else{
          if(item.type ==0){
            localStorage.setItem("newsDetailCon", JSON.stringify(item));
            this.$router.push({path: '/index/newsDetail'});
          }else if(item.type ==1 || item.type ==2){
            this.api.http("post", this.api.findById, {id: item.questionId}, (result) => {
              this.$store.dispatch("setAnswerDetail", result.question);
              this.$router.push({path : "/index/answerResult"});
            }, (error) => {
              
            });
          }
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .news {
    position: absolute;
    width: 100%;
    overflow: hidden;
    top: 0;
    height: 100%;
    padding: 15px;
    box-sizing: border-box;
    .scroller {
      height: 100%;
      box-sizing: border-box;
    }
    .row {
      background: #fff;
      box-shadow: 0 0 10px 0 rgba(190, 190, 190, 0.20);
      border-radius: 4px;
      padding: 15px 10px;
      margin-bottom: 10px;
      .title {
        font-size: 16px;
        color: #000000;
        letter-spacing: 0;
        line-height: 24px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        i {
          width: 13px;
          height: 13px;
          background: #e6e6e6;
          display: inline-block;
          background-size: cover !important;
          background-position: center !important;
          position: relative;
          top: 1px;
        }
        i.news-zan {
          background: url(../assets/news-zan.png);
        }
        i.news-comment {
          width: 15px;
          height: 12px;
          background: url(../assets/news-comment.png);
        }
        i.news-activity {
          width: 13px;
          height: 14px;
          background: url(../assets/news-activity.png);
        }
        span {
          font-size: 16px;
          color: #5DB42F;
        }
      }
      .time {
        padding-top: 10px;
        text-align: right;
        color: #B2B2B2;
      }
    }
    .row:last-child {
      margin-bottom: 0;
    }
  }
</style>
