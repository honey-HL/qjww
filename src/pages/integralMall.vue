<template>
    <div class="integralMall">
        <div class="mall_container">
            <header>
                <div class="header-bg">
                    <img style="width:100%;height:100%;" src="../assets/bg_score.png" alt="">
                </div>
                <div class="score_box">
                    <img style="width:100%;height:100%;" src="../assets/b.png" alt="">
                    <div class="current_score">
                        <div class="totalNum">{{integral}}</div>
                        <div>积分总数</div>
                    </div>
                    <div class="instruction">积分商城礼品兑换说明
                        <img @click="getInstruction" class="arrow" src="../assets/jump_2x.png" alt="">
                    </div>
                </div>
            </header>
            <article>
                <div class="item_box" v-for="(item, index) in list" :key="item.id">
                    <div class="item_top">
                        <div class="item_name">{{item.title}}</div>
                        <div class="points_stock">
                            <div class="points"><span class="label"><span>{{item.integral}}</span>积分</span></div>
                            <div class="stock">
                                <div class="stock_row">
                                库存:<div class="stock_bar">
                                        <span v-if="item.stock > 0" :style="{width: item.stock/item.totalStock * 60 + 'px'}" class="cur_stock">{{item.stock}}</span>
                                        <span v-else class="cur_stock_0">{{item.stock}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="item_bottom">
                        <div @click="getRedeemCode(item, index)" v-if="!item.goodsCode">
                            <span class="redeem" v-if="item.stock > 0"> 获取兑换码</span>
                            <span class="redeem_0" v-else>获取兑换码</span>
                        </div>
                        <div v-else class="hasGoodsCode">{{item.goodsCode}}</div>
                    </div>
                </div>
            </article>
        </div>
        <div class="footer_bar">
            <div class="btn">使用兑换码兑换</div>
        </div>
        <transition name="fade">
            <div v-if="success" class="mask_mall">
                <div class="loading-bg">
                    <div class="success">兑换成功</div>
                    <div class="content">{{content}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
 import Loader from "../components/loader"
export default {
    name: "integralMall",
    components: {
        Loader
    },
    data() {
        return {
            content: '请复制兑换码点击底部按钮兑换',
            success: false,
            list: [],
            integral: 2588
        }
    },
    methods: {
        getRedeemCode (item, index) {
            if (item.stock <= 0) {
                return
            }
            this.api.http("get", this.api.exchange, {goodsId: item.id}, result => {
                console.log(result);
                this.list[index].goodsCode = result.goodsCode;
                this.success = true;
            }, error => {
                this.$toast(error.msg);
            })
        },
        getInstruction () {
            this.$router.push({path: '/index/instruction'})
        },
        getList () {
            this.api.http("get", this.api.goodsList, {}, result => {
                for (let i in result.goodsList) {
                    this.list.push(result.goodsList[i]);
                }
                this.integral = result.integral;
                console.log(this.list);
            }, error => {
                this.$toast(error.msg);
            })
        }
    },
    mounted() {
        this.getList()
    },
    created() {
        document.title =this.$route.meta.title;
    }
}
</script>

<style scoped lang="scss">
.mask_mall {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    .loading-bg {
      padding: 15px 25px;
      border-radius: 6px;
      background: #fff;
      text-align: center;
      position: relative;
      box-sizing: border-box;
      transition: all 0.5s;
      .success {
        padding-top: 0;
        font-size: 16px;
        color: #555555;
      }
      .content{
        color: #555;
        font-size: 12px;
        padding: 10px 0;
      }
    }
}
.integralMall {
    height: 100%;
}
article {
    // height: calc(100% - 254px);
}
.mall_container {
    height: calc(100% - 54px);
    width:100%;
    overflow-y: auto;
}
.redeem_0 {
    width: 150px;
    position: relative;
    left: 50%;
    margin-left: -75px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-radius: 20px;
    border: 1px solid #BBBBBB;
    margin-top: 10px;
    color: #BBBBBB;
    font-size: 15px;
    display: inherit;
}
.redeem {
    width: 150px;
    position: relative;
    left: 50%;
    margin-left: -75px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-radius: 20px;
    border: 2px solid #5FB62A;
    box-sizing: border-box;
    margin-top: 10px;
    color: #62b436;
    font-size: 15px;
    display: inherit;
}
.hasGoodsCode {
    width: 150px;
    position: relative;
    left: 50%;
    margin-left: -75px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-radius: 20px;
    margin-top: 10px;
    color: #5fb62a;
    background: #E9FBDE;
    font-size: 15px;
}
.cur_stock {
    display: inline-block;
    height: 15px;
    border-radius: 7.5px;
    background: #5FB62A;
    color: #fff;
    text-align: center;
    line-height: 15px;
}
.cur_stock_0 {
    display: inline-block;
    height: 15px;
    border-radius: 7.5px;
    background: #EFEFEF;
    color: #fc461e;
    text-align: center;
    line-height: 15px;
    width: 100%;
}
.stock_bar {
    width: 60px;
    height: 15px;
    border-radius: 7.5px;
    background: #EFEFEF;
    margin-left: 5px;
    display: inline-block;
    float: right;
}
.stock_row {
    display:inline-block;
    float:right;
}
.stock {
    color: #999999;
    font-size: 12px;
    display: flex;
    align-items: center;
    display: inline-block;
    float: right;
}
.points {
    color: #5FB62A ;
    font-size: 20px;
    padding-left: 45px;
    .label {
        font-size: 12px;
        color: #999999;
        padding-left: 5px;
        display: inline-block;
        float: right;
        padding-right: 12px;
    }
}
.points_stock {
    border-left: 1px dashed #D8D8D8;
    float: right;
    display: flex;
    flex-direction: column;
    padding-right: 3px;
}
.item_bottom {
    border-top: 1px solid #EFEFEF ;
    padding-bottom: 10px;
}
.item_name {
    font-size: 16px;
    color:#555555;
    padding-right: 12px;
    float: left;
}
.item_top {
    padding: 10px;
    // display: inline-block;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
}
header {
    width: 100%;
    height: 190px;
    overflow: hidden;
    margin-bottom: 10px;
}
.item_box {
    background: #fff;
    -webkit-box-shadow: 0 3px 10px 0 rgba(190, 190, 190, 0.2);
    box-shadow: 0 3px 10px 0 rgba(190, 190, 190, 0.2);
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 10px;
}
.score_box .instruction {
    color: #fff;
    position: absolute;
    font-size: 14px;
    top: 152px;
    width: calc(100% - 50px);
    left: 30px;
    .arrow {
        display: inline-block;
        float: right;
        margin-top:2px;
        margin-right: 15px;
    }
}
.current_score {
    width: 7rem;
    height: 7rem;
    border-radius: 100%;
    border: 2px solid #78BC28;
    position: absolute;
    top: 50%;
    margin-top: -4.2rem;
    left: 50%;
    margin-left: -3.6rem;
    text-align: center;
    font-size: 12px;
    color: #666;
    .totalNum {
        color: #78BC28;
        font-display: MicrosoftYaHeiUI-Bold;
        font-size: 24px;
        margin-top: 12px;
    }
}
.score_box {
    width: 100%;
    height: 193px;
    position: relative;
    top: -120px;
}
.header-bg {
    width: 100%;
    height: 130px;
//     width: 100%;
//     height: 120px;
//    background: url(../assets/bg_score.png) no-repeat center center;
}
.footer_bar {
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
        box-shadow: 0 2px 8px 0 #5FB62A;
        height: 2.8rem;
        width: 20rem;
        text-align: center;
        line-height: 2.8rem;
        color: #fff;
    }
}
@media screen and (min-width:375px) and (max-width:411px) and (max-width:412px) {
    .current_score {
        width: 8rem;
        height: 8rem;
        border-radius: 100%;
        border: 2px solid #78BC28;
        position: absolute;
        top: 50%;
        margin-top: -4.7rem;
        left: 50%;
        margin-left: -4rem;
        text-align: center;
        font-size: 12px;
        color: #666;
        .totalNum {
            color: #78BC28;
            font-display: MicrosoftYaHeiUI-Bold;
            font-size: 26px;
            margin-top: 20px;
        }   
    }
}
</style>
