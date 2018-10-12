<template>
    <div></div>
</template>

<script>
    export default {
        name: "share",
        data() {
          return {
            item: null
          }
        },
        mounted() {
            let questionId = this.$route.query.questionId
            console.log("share page ===>",questionId)
            if (questionId) {
                this.$store.dispatch("setSharedUrl",'/index/answerResult?questionId=' + questionId)
            }
            this.$router.replace({ path: '/index/home'})
        },
    }
</script>
