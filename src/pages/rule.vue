<template>
    <div class="content">
      <div v-html="item.content"></div>
    </div>
</template>

<script>
    export default {
        name: "rule",
        data() {
          return {
            item: null
          }
        },
        created() {
          document.title =this.$route.meta.title;
          this.api.http("post", this.api.getText, {
            flag: 0
          }, result => {
            this.item = result;
          }, error => { });
        },
    }
</script>

<style scoped lang="scss">
  .content{
    padding: 15px;
    box-sizing: border-box;
  }
</style>
