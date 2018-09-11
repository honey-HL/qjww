<template>
    <div class="content">
      <div v-html="item.content"></div>
    </div>
</template>

<script>
    export default {
        name: "content",
        data() {
          return {
            item: null
          }
        },
        created() {
          document.title =this.$route.meta.title;
          this.item = this.$store.state.adDetail;
        },
    }
</script>

<style scoped lang="scss">
  .content{
    padding: 15px;
    box-sizing: border-box;
  }
</style>
