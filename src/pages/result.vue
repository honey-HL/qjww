<template>
    <div id="result">
        <Search :searchValue="searchValue" @searchData="searchData" />
        <scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
            <Loading v-if="isShowLoading" />
            <div class="hint">最佳匹配答案</div>
            <transition-group name="fade">
                <div class="row" v-for="(item, index) in items" :key="index" v-if="item.userPush">
                    <div class="title" v-html="item.questionTitle"></div>
                    <div class="content" v-html="item.questionContent"></div>
                </div>
            </transition-group>
            <transition name="fade">
                <div class="more-hint">
                    <span>{{totalNum}}</span>条相关讨论
                </div>
            </transition>
            <transition-group name="fade">
                <div v-for="(item, index) in items" :key="index" class="row" v-if="!item.userPush" @click="detail(item)">
                    <div class="title" v-html="item.questionTitle"></div>
                    <div class="content" v-html="item.questionContent"></div>
                    <div class="img-list">
                        <div class="img-item" v-for="child in splitImg(item.images)" v-lazy:background-image="child">
                            <img v-lazy="child" width="100%" height="100%">
                        </div>
                    </div>
                    <div class="operation-bar">
                        <div class="left">
                            <div class="head" v-lazy:background-image="imgIp + item.avatar"></div>
                            <div class="name">{{!item.anonymity ? item.nickName : '匿名'}}</div>
                        </div>
                        <div class="right">
                            <div class="time">{{item.createTime}}</div>
                            <div class="comment" @click.stop="comment(item.id, item.questionTitle)">
                                <img src="../assets/comment.png">
                                <span>{{item.commentNum}}</span>
                            </div>
                            <div class="zan" @click.stop="praise(item.id)">
                                <img src="../assets/zan.png">
                                <span>{{item.praiseNum}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </transition-group>
            <transition name="fade">
                <div class="not-data">
                    <div class="hint-bar">
                        <img src="../assets/not.png" />
                        <span>没有找到答案? 您还可以</span>
                    </div>
                    <div class="btn-bar">
                        <router-link to="/index/quiz">
                            <span>去提问</span>
                        </router-link>
                        <router-link to="/index/expert">
                            <span>找专家</span>
                        </router-link>
                    </div>
                </div>
            </transition>
        </scroller>

    </div>
</template>

<script>
    import Search from "@/components/search";
    import Loading from "@/components/loading";

    export default {
        name: "result",
        components: {
            Search, Loading
        },
        data() {
            return {
                items: [],
                searchValue: "",
                start: 0,
                row: 10,
                totalNum: 0,
                isShowLoading: true,
                imgIp: this.api.imgIp
            };
        },
        created() {
            this.searchValue = this.$route.query.keywords;
            setTimeout(() => {
                this.getData();
            }, 1000);
        },
        methods: {
            /*获取列表*/
            getData() {
                this.api.http("post", this.api.searchQuestion, {
                    start: this.start,
                    row: this.row,
                    title: this.searchValue
                }, result => {
                    this.isShowLoading = false;
                    if (this.start == 0) {
                        this.items = result.data;
                        this.totalNum = result.numFound;
                    }
                    else {
                        if (result.data.length == 0) {
                            this.start -= this.row + 1;
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
                    this.start = 0;
                    this.getData();
                    done();
                }, 1000);
            },
            /*上拉刷新*/
            infinite(done) {
                setTimeout(() => {
                    this.start += this.row + 1;
                    this.getData();
                    done(true);
                }, 1000);
                return;
            },
            /*分割图片*/
            splitImg(image) {
                return image == "" ? [] : image.split(",");
            },
            /*接收搜索参数*/
            searchData(value) {
                this.searchValue = value;
                this.isShowLoading = true;
                setTimeout(() => {
                    this.start = 0;
                    this.getData();
                }, 1000);
            },
            /*评论*/
            comment(id, title) {
                this.$router.push({ 
                    path: "/index/icomeAnswer",
                    query: { 
                        keywords: title,
                        questionId: id,
                    } 
                });
            },
            /*赞*/
            praise(id) {
                this.api.http("post", this.api.questionPraise, { questionId: id, }, result => {
                    for (let i = 0; this.items.length; i++) {
                        if (this.items[i].id == id) {
                            this.items[i].praiseNum += 1;
                            break;
                        }
                    }
                }, error => {
                    console.log(error);
                });
            },
            /*详情*/
            detail(item) {
                this.$store.dispatch("setAnswerDetail", item);
                this.$router.push({
                    path : "/index/answerResult"
                });
            }

        },
    };
</script>

<style lang="scss" scoped>
    #result {
        height: 100%;
        position: absolute;
        width: 100%;
        overflow: hidden;
        top: 0;
        & .scroller {
            top: 70px;
            box-sizing: border-box;
            height: 100%;
        }
        & .hint {
            font-size: 12px;
            color: #999999;
            text-align: center;
            padding-bottom: 15px;
        }
        & .more-hint {
            text-align: center;
            padding: 15px;
            color: #999999;
            font-size: 12px;
            span {
                color: #5fb62a;
            }
        }
        & .row {
            position: relative;
            padding: 15px;
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

            .title {
                font-size: 16px;
                color: #000;
                font-weight: 600;
                line-height: 22px;
                margin-bottom: 5px;
                font-family: 微软雅黑;
                .search-text {
                    color: #5fb62a;
                }
            }
            .content {
                font-size: 12px;
                color: #9a9a9a;
                line-height: 16px;
                margin-bottom: 10px;
            }
            .img-list {
                display: flex;
                padding-top: 5px;
                flex-wrap: wrap;
                .img-item {
                    width: calc((100% - 30px) / 4);
                    height: 58px;
                    margin: 0 10px 10px 0;
                    border-radius: 4px;
                    background: #e6e6e6;
                }
                .img-item:nth-child(4n) {
                    margin-right: 0;
                }
            }
            .operation-bar {
                display: flex;
                align-items: center;
                .left {
                    width: 30%;
                    display: flex;
                    align-items: center;
                    .head {
                        width: 26px;
                        height: 26px;
                        border-radius: 50%;
                        background-size: cover !important;
                        background-origin: center !important;
                        background: #ddd;
                    }
                    .name {
                        padding-left: 5px;
                        font-size: 12px;
                        color: #9a9a9a;
                    }
                }
                .right {
                    width: 70%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    .time {
                        font-size: 12px;
                        color: #9a9a9a;
                    }
                    .comment {
                        display: table-cell;
                        vertical-align: middle;
                    }
                    img {
                        width: calc(26px / 2);
                        height: calc(26px / 2);
                        margin-left: 15px;
                        vertical-align: center;
                        position: relative;
                        top: 2px;
                    }
                    span {
                        font-size: 12px;
                        color: #666;
                        position: relative;
                    }
                }
            }
        }
        .not-data {
            padding: 15px;
            text-align: center;
            .hint-bar {
                margin-bottom: 25px;
                img {
                    width: calc(32px / 2);
                    height: calc(28px / 2);
                    position: relative;
                    top: 3px;
                }
                span {
                    font-size: 12px;
                    color: #555555;
                }
            }
            .btn-bar {
                span {
                    font-size: 12px;
                    background: #63B729;
                    color: #ffffff;
                    padding: 10px 30px;
                    border-radius: 30px;
                    box-shadow: 0 5px 20px rgba(99, 183, 41, 0.3);
                }
                span:last-child {
                    margin-left: 30px;
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
</style>