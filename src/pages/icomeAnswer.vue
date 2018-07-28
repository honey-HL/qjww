<template>
    <div class="report">
        <div class="content">
            <div class="title" v-html="keywords"></div>
            <div class="text-div">
                <textarea name="" id="" cols="30" rows="10" placeholder="请输入您的回答" v-model="answer.content" maxlength="200"></textarea>
                <span class="num">{{answer.content.length}}
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
                <span v-if="answer.content != ''" class="active" @click="submit">提交</span>
                <span v-else>提交</span>
            </div>
        </div>
        <input type="file" id="file" accept="image/png,image/gif,image/jpeg" @change="upload" style="display: none;">
        <transition name="fade">
            <div class="mask" v-if="isShow">
                <div class="login-bg">
                    <div class="title">提交成功</div>
                    <div class="success">答题积分
                        <span>+</span>
                        <span>5</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        name: "report",
        data() {
            return {
                answer: {
                    content: "",
                    imgs: [],
                    questionId: this.$route.query.questionId,
                },
                isShow: false,
                images: [],
                keywords: "",
            }
        },
        created() {
            this.keywords = this.$route.query.keywords;
        },
        methods: {
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
                if (req.status >= 200) {
                    this.images.push(JSON.parse(req.response).body);
                } else {
                    this.$toast("上传失败");
                }
            },
            /*提交*/
            submit() {
                if (this.util.empty(this.answer.content)) {
                    this.$toast("请输入内容");
                    return;
                }
                this.images.forEach(item => {
                    this.answer.imgs.push(item.url);
                });
                this.answer.imgs = this.answer.imgs.toString();
                this.api.http("post", this.api.saveAnswer, this.answer, result => {
                    this.isShow = true;
                    setTimeout(() => {
                        this.$router.go(-1);
                    }, 1000);
                }, error => { });
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
        .content {
            padding: 0 15px;
            .title {
                padding: 10px;
                border-radius: 4px;
                font-size: 16px;
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
                    background-origin: center !important;
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
</style>
