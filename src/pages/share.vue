<template>
    <div></div>
</template>

<script>
    export default {
        name: "share",
        data() {
          return {
          }
        },
        mounted() {
            let questionId = this.$route.query.questionId
            console.log("share page ===>",questionId)
            if (questionId != null && questionId.length > 0) {
                this.$store.dispatch("setSharedUrl",'/index/answerResult?questionId=' + questionId)
            }
            this.$router.replace({ path: '/index/home'})
        },
    }
</script>
