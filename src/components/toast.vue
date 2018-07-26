<template>
    <div class="toast">{{msg}}</div>
</template>
<script>
    export default {
        name: "toast",
        props: {
            msg: {
                type: String,
                default: "我是一个toast"
            }
        }
    }
</script>
<style lang="scss" scoped>
    .toast{
        position: fixed;
        padding: 5px 15px;
        background: #5EB42F;
        color: #fff;
        min-width: 100px;
        max-width: 90%;
        left: 50%;
        bottom: 50px;
        border-radius: 100px;
        text-align: center;
        transform: translate(-50%, 0);
        animation: fadeIn 1s;
    }
    @keyframes fadeIn {
        0% {opacity: 0;transform: translate(-50%, 100px)}
        100% {opacity: 1;transform: translate(-50%, 0)}
    }
</style>