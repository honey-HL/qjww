<template>
    <div class="home">
        <img class="logo" src="../assets/qjww.png">
        <p class="title">手机问题，就来千机问问</p>
        <div class="search-bar">
            <img src="../assets/search.png" />
            <input type="text" placeholder="请输入您遇到的手机问题">
        </div>
        <div class="solve">
            已有
            <span>5466545</span>个问题被解决
        </div>
        <div class="bottom-bar">
            <div class="title">不止解答·直至解决</div>
            <img src="../assets/ad.png">
        </div>

        <MyFooter />

    </div>
</template>

<script>
    import MyFooter from "@/components/myFooter";

    export default {
        name: "home",
        components: {
            MyFooter
        },
        data() {
            return {};
        },
    };
</script>

<style lang="scss" scoped>
    .home {
        .logo {
            display: block;
            margin: 0 auto;
            margin-top: 100px;
            width: calc(304px / 2);
            height: calc(64px / 2);
        }
        .title {
            font-size: 13px;
            color: #999999;
            margin-top: 5px;
            text-align: center;
        }

        .search-bar {
            width: 80%;
            margin: 0 auto;
            position: relative;
            margin-top: 50px;
            img {
                width: calc(34px / 2);
                height: calc(34px / 2);
                position: absolute;
                top: 11.5px;
                left: 15px;
            }
            input {
                width: 100%;
                height: 40px;
                font-size: 12px;
                line-height: 40px;
                border: 1px solid #e1e1e1;
                border-radius: 30px;
                padding-left: 45px;
                box-sizing: border-box;
                outline: none;
            }
        }
        .solve {
            text-align: center;
            padding-top: 10px;
            font-size: 12px;
            color: #666;
            span {
                color: #60B72B;
            }
        }
        .bottom-bar {
            position: absolute;
            bottom: 50px;
            width: 100%;
            & .title {
                font-size: 18px;
                letter-spacing: 2px;
                color: #666;
                margin-bottom: 10px;
            }

        }
    }
</style>