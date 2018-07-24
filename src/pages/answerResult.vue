<template>
    <div id="result">
        <Search />
        <div class="row first">
            <div class="title">
                <i class="badge problem"></i>
                阿斯蒂芬噶大概
            </div>
            <div class="content">
                1.阿斯蒂芬的鬼地方大师法规地方个地方个地方鬼地方个电饭锅大范甘迪发 2.阿斯蒂芬的鬼地方大师法规地方个地方个地方鬼地方个电饭锅大范甘迪发
            </div>
            <div class="img-list">
                <div class="img-item"></div>
                <div class="img-item"></div>
                <div class="img-item"></div>
            </div>
            <div class="video-cover">

            </div>
            <div class="operation-bar">
                <div class="left">
                    <div class="head"></div>
                    <div class="name">阿斯蒂芬</div>
                </div>
                <div class="right">
                    <div class="report">
                        <img src="../assets/report.png">
                        <span>举报</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="title-num">
            <img src="../assets/comment.png">
            <span>566</span>个回答
        </div>
        <div class="row">
            <div class="content">
                1.阿斯蒂芬的鬼地方大师法规地方个地方个地方鬼地方个电饭锅大范甘迪发 2.阿斯蒂芬的鬼地方大师法规地方个地方个地方鬼地方个电饭锅大范甘迪发
            </div>
            <div class="video-cover">

            </div>
            <div class="operation-bar">
                <div class="left">
                    <div class="head"></div>
                    <div class="name">阿斯蒂芬</div>
                    <div class="time">4月28日</div>
                </div>
                <div class="right">
                    <div class="zan">
                        <img src="../assets/zan.png">
                        <span>566</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="content">
                1.阿斯蒂芬的鬼地方大师法规地方个地方个地方鬼地方个电饭锅大范甘迪发 2.阿斯蒂芬的鬼地方大师法规地方个地方个地方鬼地方个电饭锅大范甘迪发
            </div>
            <div class="video-cover">

            </div>
            <div class="operation-bar">
                <div class="left">
                    <div class="head"></div>
                    <div class="name">阿斯蒂芬</div>
                    <div class="time">4月28日</div>
                </div>
                <div class="right">
                    <div class="zan">
                        <img src="../assets/zan.png">
                        <span>566</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer-bar">
            <div class="btn">我来回答</div>
            <div class="collect">
                <img src="../assets/collect.png">
                <div class="name">收藏该问题</div>
            </div>
        </div>
    </div>
</template>

<script>
    import Search from "@/components/search";

    export default {
        name: "answerResult",
        data() {
            return {
                items: [],
                searchValue: "阿斯"
            };
        },
        components: {
            Search
        },
        mounted() {

        },
        methods: {

        },
        computed: {}
    };
</script>

<style lang="scss" scoped>
    #result {
        & .row.first {
            margin-top: 10px;
            &::before {
                height: 0;
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
            & .more-hint {
                text-align: center;
                padding-top: 10px;
                color: #999999;
                span {
                    color: #5fb62a;
                }
            }
            .title {
                font-size: 16px;
                color: #000;
                line-height: 22px;
                margin-bottom: 5px;
                font-family: 微软雅黑;
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
                color: #555555;
                font-size: 16px;
                line-height: 21px;
                margin-bottom: 10px;
            }
            .img-list {
                display: flex;
                flex-flow: wrap;
                padding-top: 5px;
                .img-item {
                    width: calc((100% - 20px) / 2);
                    height: 80px;
                    margin: 0 10px 10px 0;
                    border-radius: 4px;
                    background: #e6e6e6;
                }
                .img-item:nth-child(2n) {
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
                align-items: center;
                padding-top: 10px;
                .left {
                    width: 50%;
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
                        color: #9a9a9a;
                    }
                    .time {
                        color: #9a9a9a;
                        margin-left: 15px;
                    }
                }
                .right {
                    width: 50%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
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
                        color: #666;
                        position: relative;
                    }
                }
            }

        }
        .title-num {
            position: relative;
            background: #fff;
            padding: 15px;
            color: #666;
            margin-top: 10px;
            img {
                width: calc(26px / 2);
                height: calc(26px / 2);
                vertical-align: center;
                position: relative;
                top: 2px;
            }
            span {
                color: #5FB62A;
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
        }
        .footer-bar {
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 54px;
            line-height: 54px;
            box-shadow: 0 4px 20px 0 #CCCCCC;
            background: #fff;
            text-align: center;
            .btn {
                display: inline-block;
                background-image: linear-gradient(-90deg, #5FB62A 0%, #78BC28 100%);
                border-radius: 100px;
                box-shadow: 0 3px 10px 0 #5FB62A;
                height: 30px;
                width: 170px;
                text-align: center;
                line-height: 30px;
                color: #fff;
            }
            .collect {
                width: 60px;
                position: absolute;
                right: 15px;
                top: 0;
                img {
                    width: 13px;
                    height: 13px;
                    position: absolute;
                    top: 12px;
                    left: 50%;
                    transform: translate(-50%, 0);
                }
                .name {
                    color: #999999;
                    position: absolute;
                    top: 8px;
                }
            }
        }
    }
</style>