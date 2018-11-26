<template>
    <div class="instruction">
        <fieldset>
            <legend class="title">积分商城礼品兑换说明</legend>
            <div class="content_instruction">
                <p>1. 您可以根据您现有积分，兑换精美礼品。</p>
                <p>2. 点击获取兑换码生成兑换码，前往千机网商城在结算处兑换相应礼品。</p>
                <p>3. 您可以根据您现有积分，兑换精美礼品。</p>
                <p>4. 点击获取兑换码生成兑换码，前往千机网商城在结算处兑换相应礼品。</p>
                <p>5. 您可以根据您现有积分，兑换精美礼品。</p>
                <p>6. 点击获取兑换码生成兑换码，前往千机网商城在结算处兑换相应礼品。</p>
            </div>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: "instruction",
        data() {
          return {
            item: null
          }
        },
        created() {
          document.title =this.$route.meta.title;
        },
    }
</script>

<style scoped lang="scss">
.content_instruction p {
    font-size: 14px;
    padding: 2px 0;
}
.content_instruction {
    color: #999;
    padding: 10px 5px;
    font-size: 14px;
}
fieldset {
    border: 1px solid #76BB27;
    margin: 15px;
}
.title {
    font-size: 16px;
    color: #555;
    text-align: center;
}
</style>
