<template>
    <div id="result">
        <Search :searchValue="searchValue" />
        <scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A" loading-layer-color="#5FB62A">
            <div class="hint">最佳匹配答案</div>
            <div class="row">
                <div class="title">阿萨德大范甘迪发大师法规地方鬼地方个电饭锅电饭锅地方</div>
                <div class="content">
                    1.阿斯蒂芬的鬼地方大师法规地方个地方个地方鬼地方个电饭锅大范甘迪发 2.阿斯蒂芬的鬼地方大师法规地方个地方个地方鬼地方个电饭锅大范甘迪发
                </div>
                <div class="more-hint">
                    还有
                    <span>34</span>条相关讨论
                </div>
            </div>
            <div v-for="(item, index) in items" :key="index" class="row">
                <div class="title" v-html="ruleTitles(item.title)"></div>
                <div class="content">
                    1.阿斯蒂芬的鬼地方大师法规地方个地方个地方鬼地方个电饭锅大范甘迪发 2.阿斯蒂芬的鬼地方大师法规地方个地方个地方鬼地方个电饭锅大范甘迪发
                </div>
                <div class="operation-bar">
                    <div class="left">
                        <div class="head"></div>
                        <div class="name">阿斯蒂芬</div>
                    </div>
                    <div class="right">
                        <div class="time">4月28日</div>
                        <div class="comment">
                            <img src="../assets/comment.png">
                            <span>566</span>
                        </div>
                        <div class="zan">
                            <img src="../assets/zan.png">
                            <span>566</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="not-data">
                <div class="hint-bar">
                    <img src="../assets/not.png" />
                    <span>没有找到答案? 您还可以</span>
                </div>
                <div class="btn-bar">
                    <span>去提问</span>
                    <span>找专家</span>
                </div>
            </div>


        </scroller>
    </div>
</template>

<script>
    import Search from "@/components/search";

    export default {
        name: "result",
        components: {
            Search
        },
        data() {
            return {
                items: [],
                searchValue: ""
            };
        },
        created() {
            this.searchValue = this.$route.query.keywords
        },
        mounted() {
            for (let i = 1; i <= 20; i++) {
                this.items.push({
                    title: "阿斯蒂芬"
                });
            }
            this.top = 1;
            this.bottom = 20;
        },
        methods: {
            refresh(done) {
                setTimeout(() => {
                    this.items = [];
                    for (let i = 1; i <= 20; i++) {
                        this.items.push({
                            title: "阿斯蒂芬"
                        });
                    }
                    done();
                }, 1500);
            },
            infinite(done) {
                setTimeout(() => {
                    for (let i = 1; i <= 20; i++) {
                        this.items.push({
                            title: "阿斯蒂芬"
                        });
                    }
                    done();
                }, 1500);
                return;
            },
            /*高亮*/
            ruleTitles(value) {
                if (!value) return;
                if (this.searchValue && this.searchValue.length > 0) {
                    // 匹配关键字正则
                    let replaceReg = new RegExp(this.searchValue, "g");
                    // 高亮替换v-html值
                    let replaceString =
                        '<span style="color: #5fb62a;font-size:16px;">' + this.searchValue + "</span>";
                    // 开始替换
                    value = value.replace(replaceReg, replaceString);
                }
                return value;
            }
        },
        computed: {}
    };
</script>

<style lang="scss" scoped>
    #result {
        & .scroller {
            top: 70px;
            padding: 0 15px;
            box-sizing: border-box;
        }
        & .hint {
            font-size: 12px;
            color: #999999;
            text-align: center;
        }
        & .row {
            position: relative;
            padding: 15px 0;
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
                font-size: 12px;
                span {
                    color: #5fb62a;
                }
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
            .operation-bar {
                display: flex;
                align-items: center;
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
                        font-size: 12px;
                        color: #9a9a9a;
                    }
                }
                .right {
                    width: 50%;
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
                margin-bottom: 10px;
                img {
                    width: calc(32px / 2);
                    height: calc(28px / 2);
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
</style>