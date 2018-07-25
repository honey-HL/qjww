<template>
  <div id="search">
    <div class="search-bar">
      <input placeholder="请输入您遇到的手机问题" maxlength="30" v-model="searchValue" @keyup.enter="searchEnterFun">
      <img src="../assets/search.png" @click="search" />
    </div>
  </div>
</template>

<script>
  export default {
    name: "search",
    data() {
      return {
      };
    },
    props: {
      searchValue: {
        type: String,
        default: ""
      }
    },
    methods: {
      searchEnterFun(e) {
        console.log(e);
        var keyCode = window.event ? e.keyCode : e.which;
        if (keyCode == 13 && this.searchValue != "") {
          //TODO 
          alert(this.searchValue);

        }
      },
      search() {
        alert(this.searchValue);
        //TODO 
      }
    }
  };
</script>

<style lang="scss" scoped>
  #search {
    padding: 10px 15px;
    background: #fff;
    .search-bar {
      width: 100%;
      position: relative;
      img {
        width: calc(34px / 2);
        height: calc(34px / 2);
        position: absolute;
        top: 6.5px;
        right: 15px;
      }
      input {
        width: 100%;
        height: 32px;
        font-size: 12px;
        line-height: 32px;
        border: 1px solid #e1e1e1;
        border-radius: 30px;
        padding-left: 15px;
        box-sizing: border-box;
        outline: none;
      }
    }
  }
</style>