<template>
    <div id="signin">
        <div class="bg">
            <div class="score">
                <div>
                    <div class="num">4564</div>
                    <div class="hint">积分总数</div>
                </div>
            </div>
            <div class="total">
                <div class="left">
                    <div class="num">
                        <span>55</span>
                        <span>天</span>
                    </div>
                    <div class="name">连续签到</div>
                </div>
                <div class="right">
                    <div class="num">
                        <span>45</span>
                        <span>天</span>
                    </div>
                    <div class="name">累计签到</div>
                </div>
            </div>
        </div>
        <div class="worp">
            <div class="sign-bg">
                <div class="title">8月签到日历</div>
                <div class="week">
                    <div>日</div>
                    <div>一</div>
                    <div>二</div>
                    <div>三</div>
                    <div>四</div>
                    <div>五</div>
                    <div>六</div>
                </div>
            </div>
        </div>
        <div class="title">查看积分规则说明</div>
        <div class="row">
            <div class="name">积分商城
                <i class="right-icon"></i>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        name: "signin"
    }
</script>
<style lang="scss" scoped>
    #signin {
        .bg {
            height: calc(434px / 2);
            background: url(../assets/bg2.png);
            background-size: cover;
            background-position: center;
            position: relative;
            .score {
                position: absolute;
                left: 50%;
                top: 30px;
                transform: translate(-50%, 0);
                width: 80px;
                height: 80px;
                background: #fff;
                box-shadow: 0 0 15px 0 #539019;
                text-align: center;
                border-radius: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                .num {
                    font-size: 24px;
                    color: #5FB62A;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .hint {
                    color: #666666;
                }
            }
            .total {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 80px;
                display: flex;
                align-items: center;
                .left,
                .right {
                    width: 50%;
                    text-align: center;
                    .num span:first-child {
                        font-size: 24px;
                        color: #5FB62A;
                    }
                    .num span:last-child {
                        color: #666666;
                    }
                    .name {
                        color: #666666;
                    }
                }
            }
        }
        .worp {
            padding: 15px;
            display: flex;
            justify-content: center;
            .sign-bg {
                height: calc(550px / 2);
                width: calc(702px / 2);
                background: url(../assets/sign-bg.png);
                background-size: cover;
                background-position: center;
                .title {
                    padding-top: 30px;
                }
                .week {
                    display: flex;
                    flex-wrap: nowrap;
                    padding: 10px;
                    div {
                        width: calc(100% / 7);
                        text-align: center;
                        letter-spacing: 1px;
                        color: #666666;
                    }
                }
            }
        }

        .title {
            text-align: center;
            color: #5FB62A;
        }
        .row {
            display: flex;
            background: #FFFFFF;
            height: 40px;
            margin-top: 10px;
            align-items: center;
            position: relative;
            padding: 0 15px;
            .name {
                font-size: 14px;
                color: #555555;
                i {
                    position: absolute;
                    right: 15px;
                    top: 13px;
                    width: 8px;
                    height: 14px;
                    background: url(../assets/right-icon.png);
                    background-size: cover;
                    background-origin: center;

                }
            }
        }

    }
</style>