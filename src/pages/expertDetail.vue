<template>
    <div id="expertDetail">
        <div class="bg">
            <div class="worp">
                <div class="head-bar">
                    <div class="haed">
                        <i class="b"></i>
                    </div>
                </div>
                <div class="name">袁师傅</div>
                <div class="address">阿斯蒂芬打甘道夫</div>
                <div class="hint">专业资深的手机维修专家，精通iPhone、安卓等设备维修，最值得信赖的XXX认证专家。</div>
                <div class="total-bar">
                    <div class="left">
                        <span class="num">32</span>
                        <span class="font">回答</span>
                    </div>
                    <div class="right">
                        <span class="num">32</span>
                        <span class="font">回答</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="top">
                <div class="head"></div>
                <div class="name">阿实打实的个</div>
            </div>
            <div class="title">
                <i class="badge problem"></i>
                阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概阿斯蒂芬噶大概
            </div>
            <div class="content">
                啊地方敢死队风格地方法规和法国恢复规划法规好大飞哥啊地方敢死队风格地方法规和法国恢复规划法规好大飞哥
            </div>
            <div class="operation-bar">
                <div class="left">
                    <div class="time">5月16日 16:45</div>
                </div>
                <div class="right">
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="btn">在线咨询</div>
            <div class="btn">电话直连</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "expertDetail",
        data() {
            return {

            }
        }
    }
</script>
<style lang="scss" scoped>
    #expertDetail {
        .bg {
            height: 245px;
            background: url(../assets/bg.png);
            background-size: cover;
            background-position: center;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 15px;
            .head-bar {
                text-align: center;
                .haed {
                    display: inline-block;
                    box-shadow: 0 0 10px rgba(133, 24, 24, 0.2);
                    width: 58px;
                    height: 58px;
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
            }

            .name {
                font-size: 20px;
                color: #FFFFFF;
                text-align: center;
                margin-top: 5px;
            }
            .address {
                text-align: center;
                margin-top: 5px;
                font-size: 14px;
                color: #FFFFFF;
            }
            .hint {
                margin-top: 15px;
                text-align: center;
                line-height: 21px;
                font-size: 12px;
                color: #FFFFFF;
            }
            .total-bar {
                width: 100%;
                display: flex;
                align-items: center;
                margin-top: 20px;
                .left {
                    width: 50%;
                    position: relative;
                    text-align: center;
                    &::before {
                        content: "";
                        position: absolute;
                        height: 100%;
                        width: 1px;
                        right: 0;
                        top: 0;
                        background: #e1e1e1;
                    }
                }
                .right {
                    width: 50%;
                    text-align: center;
                }
                .num {
                    font-size: 24px;
                    color: #FFFFFF;
                }
                .font {
                    color: #FFFFFF;
                }
            }
        }
        & .row {
            background: #fff;
            margin-top: 10px;
            position: relative;
            &:first-child {
                margin-top: 0;
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
            .top {
                padding: 10px 15px;
                display: flex;
                align-items: center;
                position: relative;
                overflow: hidden;
                &::before {
                    content: "";
                    position: absolute;
                    height: 1px;
                    width: 100%;
                    left: 15px;
                    bottom: 0;
                    transform: scaleY(0.5);
                    background: #e1e1e1;
                }
                .head {
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background-size: cover !important;
                    background-origin: center !important;
                    background: #ddd;
                }
                .name {
                    padding-left: 10px;
                    color: #9a9a9a;
                }
            }
            .title {
                font-size: 16px;
                color: #000;
                padding: 10px 15px;
                padding-bottom: 0;
                line-height: 22px;
                font-family: 微软雅黑;
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
                line-height: 21px;
                font-size: 14px;
                color: #999999;
                padding: 10px 15px;
                padding-bottom: 0;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }
            .operation-bar {
                display: flex;
                align-items: center;
                padding: 10px 15px;
                .left {
                    width: 50%;
                    .time {
                        color: #999999;
                    }
                }
                .right {
                    width: 50%;
                    text-align: right;
                    .answer {
                        color: #999999;
                    }
                }
            }
        }
        .bottom {
            display: flex;
            justify-content: center;
            margin-top: 15px;
            .btn {
                background-image: linear-gradient(-90deg, #5FB62A 0%, #78BC28 100%);
                border-radius: 100px;
                width: 94px;
                height: 32px;
                line-height: 32px;
                text-align: center;
                color: #fff;
                &:first-child {
                    margin-right: 20px;
                }
            }
        }
    }
</style>