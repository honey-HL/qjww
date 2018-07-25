<template>
    <div class="not">
        <div class="icon" :class="type"></div>
        <div class="title">{{title}}</div>
        <div class="hint">{{hint}}</div>
        <slot></slot>
    </div>
</template>
<script>
    export default {
        name: "notData",
        props: {
            type: {
                type: String,
                default: 'TZ'
            },
            title: {
                type: String,
                default: "标题"
            },
            hint: {
                type: String,
                default: "提示信息"
            },
        }
    } 
</script>
<style lang="scss" scoped>
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
        }
        .icon.TZ{
            background: url(../assets/not/TZ.png);
        }
        .icon.TW{
            background: url(../assets/not/TW.png);
        }
        .icon.HD{
            background: url(../assets/not/HD.png);
        }
        .icon.ZX{
            background: url(../assets/not/ZX.png);
        }
        .icon.YC{
            background: url(../assets/not/YC.png);
        }
        .title {
            font-size: 16px;
            color: #000000;
            margin-bottom: 5px;
        }
        .hint {
            color: #999999;
        }
    }
</style>