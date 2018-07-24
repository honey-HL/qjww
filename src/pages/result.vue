<template>
    <div id="result">
        <Search />
        <scroller class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#4b8bf4" loading-layer-color="#ec4949">
            <!--下拉loading-->
            <svg class="spinner" style="stroke: #4b8bf4;" slot="refresh-spinner" viewBox="0 0 64 64">
                <g stroke-width="7" stroke-linecap="round">
                    <line x1="10" x2="10" y1="27.3836" y2="36.4931">
                        <animate attributeName="y1" dur="750ms" values="16;18;28;18;16;16" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" dur="750ms" values="48;46;36;44;48;48" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-opacity" dur="750ms" values="1;.4;.5;.8;1;1" repeatCount="indefinite"></animate>
                    </line>
                    <line x1="24" x2="24" y1="18.6164" y2="45.3836">
                        <animate attributeName="y1" dur="750ms" values="16;16;18;28;18;16" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" dur="750ms" values="48;48;46;36;44;48" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-opacity" dur="750ms" values="1;1;.4;.5;.8;1" repeatCount="indefinite"></animate>
                    </line>
                    <line x1="38" x2="38" y1="16.1233" y2="47.8767">
                        <animate attributeName="y1" dur="750ms" values="18;16;16;18;28;18" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" dur="750ms" values="44;48;48;46;36;44" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-opacity" dur="750ms" values=".8;1;1;.4;.5;.8" repeatCount="indefinite"></animate>
                    </line>
                    <line x1="52" x2="52" y1="16" y2="48">
                        <animate attributeName="y1" dur="750ms" values="28;18;16;16;18;28" repeatCount="indefinite"></animate>
                        <animate attributeName="y2" dur="750ms" values="36;44;48;48;46;36" repeatCount="indefinite"></animate>
                        <animate attributeName="stroke-opacity" dur="750ms" values=".5;.8;1;1;.4;.5" repeatCount="indefinite"></animate>
                    </line>
                </g>
            </svg>

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

            <!-- 上拉loading -->
            <svg class="spinner" style="fill: #ec4949;" slot="infinite-spinner" viewBox="0 0 64 64">
                <g>
                    <circle cx="16" cy="32" stroke-width="0" r="3">
                        <animate attributeName="fill-opacity" dur="750ms" values=".5;.6;.8;1;.8;.6;.5;.5" repeatCount="indefinite"></animate>
                        <animate attributeName="r" dur="750ms" values="3;3;4;5;6;5;4;3" repeatCount="indefinite"></animate>
                    </circle>
                    <circle cx="32" cy="32" stroke-width="0" r="3.09351">
                        <animate attributeName="fill-opacity" dur="750ms" values=".5;.5;.6;.8;1;.8;.6;.5" repeatCount="indefinite"></animate>
                        <animate attributeName="r" dur="750ms" values="4;3;3;4;5;6;5;4" repeatCount="indefinite"></animate>
                    </circle>
                    <circle cx="48" cy="32" stroke-width="0" r="4.09351">
                        <animate attributeName="fill-opacity" dur="750ms" values=".6;.5;.5;.6;.8;1;.8;.6" repeatCount="indefinite"></animate>
                        <animate attributeName="r" dur="750ms" values="5;4;3;3;4;5;6;5" repeatCount="indefinite"></animate>
                    </circle>
                </g>
            </svg>
        </scroller>
    </div>
</template>

<script>
    import Search from "@/components/search";

    export default {
        name: "result",
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
                        top:2px;
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