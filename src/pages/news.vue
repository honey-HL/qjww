<template>
    <div class="news">
        <scroller v-if="items.length > 0" class="scroller" :on-refresh="refresh" :on-infinite="infinite" refresh-layer-color="#5FB62A"
            loading-layer-color="#5FB62A">
            <Loading v-if="isShowLoading" />
            <div class="row" v-for="item in items">
                <div class="title">
                    <i :class="[{'news-zan': item.type == 0},{'news-comment': item.type == 1},{'news-activity': item.type == 2}]"></i>
                    {{item.userName == null ? '匿名' : item.userName}} 回答了您提出的问题
                    <span v-html="item.title"></span>
                </div>
                <div class="time">{{item.createTime}}</div>
            </div>
        </scroller>
        <div class="not" v-else>
            <Not title="暂未收到通知" hint="您收到的通知都在这里汇集" />
        </div>
    </div>
</template>
<script>
    import Not from "@/components/notData";
    export default {
        name: "news",
        components: {
            Not
        },
        data() {
            return {
                items: [],
                pageNO: 1,
                pageSize: 10,
                isShowLoading: true,
            }
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
                this.api.http("post", this.api.getNotification, {
                    pageNO: this.pageNO,
                    pageSize: this.pageSize
                }, result => {
                    this.isShowLoading = false;
                    if (this.pageNO == 1) {
                        this.items = result;
                    }
                    else {
                        if (result.length == 0) {
                            this.pageNO--;
                        }
                        else {
                            this.items.concat(result);
                        }
                    }
                }, error => {
                    console.log(error);
                });
            },
            /*下拉刷新*/
            refresh(done) {
                setTimeout(() => {
                    this.pageNO = 1;
                    this.getData();
                    done();
                }, 1000);
            },
            /*上拉刷新*/
            infinite(done) {
                setTimeout(() => {
                    this.pageNO++;
                    this.getData();
                    done(true);
                }, 1000);
                return;
            },
        }
    }
</script>
<style lang="scss" scoped>
    .news {
        position: absolute;
        width: 100%;
        overflow: hidden;
        top: 0;
        height: 100%;
        padding: 15px;
        box-sizing: border-box;
        .scroller {
            height: 100%;
            box-sizing: border-box;
        }
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
    }
</style>