<template>
    <div class="answer">
        <div class="top">
            <div class="row">
                <Search class="input" />
                <div class="right">
                    <i class="news-icon"></i>
                    <div>通知</div>
                </div>
            </div>
            <div class="menu-row">
                <div class="item">
                    <div class="icon"></div>
                    <div class="name">提问</div>
                </div>
                <div class="item">
                    <div class="icon"></div>
                    <div class="name">回答</div>
                </div>
                <div class="item">
                    <div class="icon"></div>
                    <div class="name">我的回答</div>
                </div>
            </div>
            <div class="bg"></div>
        </div>

        <div class="answer-list">
            <div class="item">
                <div class="title">
                    <i class="badge video"></i>
                    如何看待锤子新发布的R1手机？到底有什么自信卖那么贵？
                </div>
                <div class="content">
                    锤子TNT工作站是我见过最强大的手机配件，没有之一。确切的说这是一个手机配件系。锤子TNT工作站是我见过最强大的手机配件，没有之一。确切的说…
                </div>
                <div class="img-list">
                    <div class="img-item"></div>
                </div>
                <div class="video-cover">

                </div>
                <div class="operation-bar">
                    <div class="left">
                        <div class="time">8小时前</div>
                        <div>推广</div>
                    </div>
                    <div class="right">
                        <!-- <div>12个回答</div>
                        <div>22个赞</div> -->
                        <div class="icon-div">
                            <i class="enter"></i>
                            <span>进入</span>
                        </div>
                        <div class="icon-div">
                            <i class="comment"></i>
                            <span>回答</span>
                        </div>
                        <div class="icon-div">
                            <i class="activity"></i>
                            <span>活动</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg"></div>

        </div>
        <div class="foot-height"></div>
        <MyFooter />
    </div>
</template>

<script>
    import MyFooter from "@/components/myFooter";
    import Search from "@/components/search";

    export default {
        name: 'answer',
        components: {
            MyFooter, Search
        },
    }
</script>

<style lang="scss" scoped>
    .foot-height {
        height: 60px;
    }

    .answer {
        .row {
            display: flex;
            .input {
                width: calc(100% - 30px);
            }
            .right {
                width: 30px;
                padding: 10px 0;
                text-align: center;
                padding-right: 15px;
                .news-icon {
                    display: inline-block;
                    width: calc(32px / 2);
                    height: calc(32px / 2);
                    background: url(../assets/news.png);
                    background-size: cover;
                    background-origin: center;
                }
                div {
                    color: #555;
                    position: relative;
                    top: -1px;
                }
            }
        }
        .menu-row {
            display: flex;
            padding-bottom: 10px;
            .item {
                width: calc(100% / 3);
                text-align: center;
                .icon {
                    display: inline-block;
                    width: calc(96px / 2);
                    height: calc(96px / 2);
                    background-size: cover !important;
                    background-origin: center !important;
                }
                .name {
                    font-family: PingFangSC-Light;
                    color: #555555;
                }
            }
            .item:nth-child(1) {
                .icon {
                    background: url(../assets/quiz.png);
                }
            }
            .item:nth-child(2) {
                .icon {
                    background: url(../assets/answer.png);
                }
            }
            .item:nth-child(3) {
                .icon {
                    background: url(../assets/wd.png);
                }
            }
        }
        .answer-list {
            .item {
                padding: 15px;
                background: #fff;
                .title {
                    font-size: 16px;
                    color: #555555;
                    line-height: 24px;
                    margin-bottom: 5px;
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
                    i.img{
                        background: url(../assets/img.png);
                    }
                    i.problem{
                        background: url(../assets/problem.png);
                    }
                    i.video{
                        background: url(../assets/video.png);
                    }
                }
                .content {
                    font-family: PingFangSC-Light;
                    font-size: 14px;
                    color: #999999;
                    line-height: 21px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 3;
                    overflow: hidden;
                }
                .img-list {
                    display: flex;
                    padding-top: 5px;
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
                .video-cover {
                    margin-top: 5px;
                    height: 168px;
                    border-radius: 4px;
                    background: #e6e6e6;
                }
                .operation-bar {
                    display: flex;
                    padding-top: 15px;
                    align-items: center;
                    .left {
                        display: flex;
                        width: 30%;
                        color: #999999;
                        .time {
                            margin-right: 10px;
                        }
                    }
                    .right {
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        width: 70%;
                        color: #555555;
                        .icon-div {
                            position: relative;
                            margin-left: 10px;
                            width: 40px;
                            text-align: right;
                            i {
                                display: inline-block;
                                width: 15px;
                                height: 12px;
                                background: #e6e6e6;
                                position: absolute;
                                top: 2px;
                                left: -3px;
                                background-size: cover !important;
                                background-position: center !important;
                            }
                            i.enter{
                                background: url(../assets/enter.png)
                            }
                            i.comment{
                                background: url(../assets/comment.png)
                            }
                            i.activity{
                                width: 12px;
                                height: 15px;
                                left: 1px;
                                top: 0px;
                                background: url(../assets/activity.png)
                            }
                        }
                    }
                }
            }
        }

    }

    .bg {
        background: #fcfcfc;
        height: 10px;
    }
</style>