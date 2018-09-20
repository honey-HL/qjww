<template>
  <div class="newsDetail">
      <div class="newsDetailTitle">
          <p>{{items.title}}</p>
      </div>
      <div class="newsDetailContent" v-html="items.content"></div>
  </div>
</template>
  <script>
    export default {
      name: "newsDetail",
      data() {
        return {
          items:JSON.parse(localStorage.getItem("newsDetailCon")),
        }
      },
      created() {
        document.title =this.$route.meta.title;
      }, 
    }
  </script>
  <style lang="scss" scoped>
   .newsDetailTitle{
     width: 100%;
     height: auto;
     margin: 0;
     padding: 0;
     p{
       color:#000;
       font-size:18px;
       text-align:center;
       margin:8px 0;
     }
   }
   .newsDetailContent{
     width: calc(100%-16px);
     height: auto;
     margin: 0 8px;
     padding: 0;
     overflow: hidden;
   }
  
  </style>
  