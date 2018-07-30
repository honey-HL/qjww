<template>
    <div class="report">
        <div class="content">
            <div class="hint">举报内容</div>
            <div class="title" v-html="detail.questionTitle"></div>
            <input type="text" placeholder="请选择举报分类" readonly>
            <div class="text-div">
                <textarea name="" id="" cols="30" rows="10" placeholder="问题描述（选填）" v-model="report.describe" maxlength="200"></textarea>
                <span class="num">{{report.describe.length}}
                    <span class="font-hint">字</span>
                </span>
            </div>
            <div class="row">
              <div class="item" v-for="item in images" v-lazy:background-image="item.url">
                <i class="del" @click="delImg(item.fileName)"></i>
              </div>
              <div class="item add-icon" @click="selectFile"></div>
            </div>
            <div class="num-hint">最多可上传8张</div>
            <div class="btn">
              <span v-if="report.describe != ''" class="active" @click="submit">提交</span>
              <span v-else>提交</span>
            </div>
            <div class="footer-hint">请正确提交举报信息，不实举报将对您的信用产生影响</div>
        </div>
      <input type="file" id="file" accept="image/png,image/gif,image/jpeg" @change="upload" style="display: none;">
      <transition name="fade">
        <div class="mask" v-if="isShow">
          <div class="login-bg">
            <div class="title">提交成功</div>
            <div class="success">感谢你的举报</div>
          </div>
        </div>
      </transition>
    </div>
</template>
<script>
    import Search from "@/components/search"
    export default {
        name: "report",
        components: {
            Search
        },
        data() {
            return {
              detail: null,
              report: {
                describe: "",
                imgs: [],
                id: 0,
                reportType: 3,
                type: 1,

              },
              isShow: false,
              images: [],
            }
        },
      created() {
        this.detail = this.$store.state.answerDetail;
        this.report.id = this.detail.id;
      },
      methods: {
        /*提交*/
        submit() {
          if (this.util.empty(this.report.describe)) {
            this.$toast("请输入内容");
            return;
          }
          this.images.forEach(item => {
            this.report.imgs.push(item.url);
          });
          this.report.imgs = this.report.imgs.toString();
          this.api.http("post", this.api.saveReport, this.report, result => {
            this.isShow = true;
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }, error => { });
        },
        /*文件上传*/
        selectFile() {
          if (this.images.length >= 8) {
            this.$toast("最多可上传8张");
            return;
          }
          document.getElementById("file").click();
        },
        upload(e) {
          let formdata = new FormData();
          formdata.append('file', e.target.files[0]);

          var req = new XMLHttpRequest();
          req.open("post", this.api.ip + this.api.uploadImage, false);
          req.send(formdata);
          console.log(JSON.parse(req.response));
          if (req.status == 200) {
            this.images.push(JSON.parse(req.response).body);
          } else {
            this.$toast("上传失败");
          }
        },
        /*删除图片*/
        delImg(fileName) {
          this.api.http("post", this.api.delFile, { fileName }, result => {
            for (let i = 0; i < this.images.length; i++) {
              if (this.images[i].fileName == fileName) {
                this.images.splice(i, 1);
                break;
              }
            }
          }, error => { });
        }
      }
    }
</script>
<style lang="scss" scoped>
    .report {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
        .content {
            padding: 0 15px;
            .hint {
                color: #959595;
                font-size: 14px;
                padding: 15px 0;
            }
            .title{
                border: 1px solid rgba(153, 153, 153, 0.10);
                padding: 10px;
                background: #fff;
                border-radius: 4px;
                font-size: 16px;
            }
            input {
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
            .text-div {
                position: relative;
                textarea {
                    background: #fff;
                    border: 1px solid rgba(153, 153, 153, 0.10);
                    border-radius: 4px;
                    width: 100%;
                    height: 160px;
                    padding: 10px 10px;
                    box-sizing: border-box;
                    resize: none;
                    margin-bottom: 10px;
                }
                .num {
                    position: absolute;
                    right: 10px;
                    bottom: 20px;
                    font-size: 12px;
                    color: #5FB62A;
                    .font-hint {
                        color: #666;
                    }
                }
            }
            .row {
                display: flex;
                flex-flow: wrap;
                .item {
                    width: calc((100% - 30px) / 4);
                    margin: 0 10px 10px 0;
                    height: 78px;
                    background: #e6e6e6;
                  background-size: cover !important;
                  background-position: center !important;
                    &:nth-child(4n) {
                        margin-right: 0;
                    }
                }
                .item.add-icon {
                    background: url(../assets/add.png);
                    width: 78px;
                    background-size: cover;
                    background-origin: center;
                }
            }
            .num-hint {
                text-align: center;
                font-family: PingFangSC-Light;
                font-size: 12px;
                color: #555555;
                letter-spacing: 0;
            }
            .btn {
                text-align: center;
                padding-top: 20px;
                span {
                    width: 80px;
                    height: 32px;
                    text-align: center;
                    line-height: 32px;
                    background: #999999;
                    background: rgba(153, 153, 153, 0.50);
                    border-radius: 100px;
                    display: inline-block;
                    font-family: PingFangSC-Medium;
                    font-size: 14px;
                    color: #FFFFFF;
                    letter-spacing: 0;
                }
              span.active {
                background: #5FB62A;
              }
            }
            .footer-hint{
                color: #999999;
                text-align: center;
                margin-top: 20px;
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
          padding: 15px 50px;
          border-radius: 6px;
          background: #fff;
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
          }
        }
      }
    }
</style>
