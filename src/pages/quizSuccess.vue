<template>
    <div class="quizSuccess">
        <div class="success-bar">
            <span>邀请朋友来答</span>
            <div class="title">问题发布成功啦</div>
            <div class="title-min">请耐心等待答案</div>
            <div class="success-icon"></div>
        </div>
        <div class="bg"></div>
        <div class="consult">
            <div class="title">想快速解决问题</div>
            <div class="title-min">您还可以直接
                <span>向专家咨询</span>
            </div>
            <span class="right-icon"></span>
        </div>
        <div class="bg"></div>
        <div class="list-title">相关问题</div>
    </div>
</template>
<script>
    export default {
        name: "quizSuccess",
        data() {
            return {

            }
        },
    }
</script>
<style lang="scss" scoped>
    .success-bar {
        padding: 10px 15px;
        position: relative;
        text-align: center;
        box-sizing: border-box;
        span {
            position: absolute;
            right: 15px;
            top: 10px;
            color: #5FB62A;
            border: 1px solid #5FB62A;
            border-radius: 100px;
            height: 22px;
            line-height: 22px;
            padding: 0 3px;
        }
        .title {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #555555;
            padding-top: 30px;
            margin-bottom: 5px;
        }
        .title-min {
            font-family: PingFangSC-Light;
            font-size: 12px;
            color: #999999;
            margin-bottom: 10px;

        }
        .success-icon {
            width: calc(348px / 2);
            height: calc(206px / 2);
            background: url(../assets/success.png);
            display: inline-block;
            background-size: cover;
            background-position: center;
        }
    }

    .bg {
        height: 10px;
        background: #FCFCFC;
    }

    .consult {
        position: relative;
        text-align: center;
        box-sizing: border-box;
        height: 86px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        .title {
            font-family: PingFangSC-Medium;
            font-size: 16px;
            color: #555555;
            margin-bottom: 5px;
        }
        .title-min {
            font-family: PingFangSC-Light;
            font-size: 14px;
            color: #555555;
            span {
                font-size: 14px;
                color: #5FB62A;
            }
        }
        .right-icon {
            display: inline-block;
            position: absolute;
            width: calc(16px / 2);
            height: calc(28px /2);
            background: url(../assets/right-icon.png);
            right: 15px;
            top: 50%;
            transform: translate(0, -50%);
            background-size: cover;
            background-position: center;
        }

    }

    .list-title {
        padding: 10px 15px;
        font-family: PingFangSC-Medium;
        font-size: 16px;
        color: #555555;
        text-align: center;
        position: relative;
        &::before{
            content: "";
            position: absolute;
            height: 1px;
            width: 100%;
            background: #e6e6e6;
            transform:scaleY(0.5);
            bottom: 0;
            left: 0;
        }
    }
</style>