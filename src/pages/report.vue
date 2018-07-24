<template>
    <div class="report">
        <div class="content">
            <div class="hint">举报内容</div>
            <div class="title">阿道夫噶大鬼地方广东省个单方事故大飞哥大飞哥大飞哥</div>
            <input type="text" placeholder="请选择举报分类" readonly>
            <div class="text-div">
                <textarea name="" id="" cols="30" rows="10" placeholder="问题描述（选填）"></textarea>
                <span class="num">{{num}}
                    <span class="font-hint">字</span>
                </span>
            </div>
            <div class="row">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item add-icon"></div>
            </div>
            <div class="num-hint">最多可上传8张</div>
            <div class="btn">
                <span>提交</span>
            </div>
            <div class="footer-hint">请正确提交举报信息，不实举报将对您的信用产生影响</div>
        </div>
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
                num: 20
            }
        }
    }
</script>
<style lang="scss" scoped>
    .report {
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
            }
            .footer-hint{
                color: #999999;
                text-align: center;
                margin-top: 20px;
            }
        }

    }
</style>