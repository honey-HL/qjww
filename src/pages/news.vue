<template>
    <div class="news">
        <div class="row">
            <div class="title">
                <i class="news-zan"></i>
                用户896333 回答了您提出的问题
                <span>R9的相机总是显示故障无法连接，到底应R9的相机总是显示故障无法连接，到底应</span>
            </div>
            <div class="time">5分钟前</div>
        </div>
        <div class="row">
            <div class="title">
                <i class="news-comment"></i>
                用户896333 回答了您提出的问题
                <span>R9的相机总是显示故障无法连接，到底应R9的相机总是显示故障无法连接，到底应</span>
            </div>
            <div class="time">5分钟前</div>
        </div>
        <div class="row">
            <div class="title">
                <i class="news-activity"></i>
                用户896333 回答了您提出的问题
                <span>R9的相机总是显示故障无法连接，到底应R9的相机总是显示故障无法连接，到底应</span>
            </div>
            <div class="time">5分钟前</div>
        </div>
        <div class="not" v-if="false">
            <div class="icon"></div>
            <div class="title">暂未收到通知</div>
            <div class="hint">您收到的通知都在这里汇集</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "news",
        data() {
            return {

            }
        }
    }
</script>
<style lang="scss" scoped>
    .news {
        height: 100%;
        padding: 15px;
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
        .not {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            .icon {
                width: calc(356px / 2);
                height: calc(354px / 2);
                background-size: cover !important;
                background-position: center !important;
                background: url(../assets/new-not.png);
            }
            .title {
                font-size: 16px;
                color: #000000;
            }
            .hint {
                color: #999999;
            }
        }
    }
</style>