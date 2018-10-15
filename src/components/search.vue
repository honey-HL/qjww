<template>
  <div id="search">
    <div class="search-bar">
      <input id="searchInput" placeholder="请输入您遇到的手机问题" maxlength="30" v-model="searchValue" @keyup.enter="searchEnterFun">
      <div class="img-div">
        <img src="../assets/search.png" @click="search" />
      </div>
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
        let keyCode = window.event ? e.keyCode : e.which;

        if (keyCode == 13) {
          this.search();
        }
      },
      search() {
        if (this.searchValue.trim() == "") {
          this.searchValue = "";
        }
        else if (this.util.isEmoji.test(this.searchValue)) {
          this.$toast("暂不支持emoji");
          this.searchValue = "";
        }
        else {
          this.$emit("searchData", this.searchValue);
          document.getElementById("searchInput").blur();
        }
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
      .img-div {
        position: absolute;
        width: 50px;
        height: 32px;
        right: 0;
        top: 0;
        text-align: center
      }
      img {
        width: calc(34px / 2);
        height: calc(34px / 2);
        position: relative;
        top: 6.5px;
      }
      input {
        width: 100%;
        height: 32px;
        font-size: 12px;
        line-height: 32px;
        border: 1px solid rgba(153, 153, 153, 0.1);
        border-radius: 30px;
        padding-left: 15px;
        box-sizing: border-box;
        outline: none;
        color: #5FB62A;
      }
    }
  }
</style>
