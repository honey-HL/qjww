<template>
    <div class="changeName">
        <div class="changeNameDiv">
            <input type="text" placeholder="请输入您要修改的名称，限10字内 " maxlength="10" v-model="inputChangeName">
        </div>
        <div class="btn">
            <span v-if="inputChangeName != ''" class="active" @click="submit">确定修改</span>
            <span v-else>确定修改</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: "changeName",
        data() {
          return {
            inputChangeName:"",
          }
        },
        methods: {
            submit(){
                this.api.http("post", this.api.updateNickName, {nickName:this.inputChangeName}, result => {
                    this.api.http("post", this.api.getInfo,{}, result => {
                        localStorage.setItem("userInfo", JSON.stringify(result));
                        setTimeout(() => {
                            this.$router.push({ path: "/index/my" });
                        }, 1000);
                    }, error => {
                        
                    });
                }, error => {
                    
                });
            }
        }
    }
</script>
<style lang="scss" scoped>
    .changeNameDiv {
      padding: 0 15px;
      input {
        height: 32px;
        line-height: 32px;
        background: #FCFCFC;
        border: 1px solid rgba(153, 153, 153, 0.10);
        border-radius: 4px;
        font-size: 12px;
        width: 100%;
        margin: 10px 0;
        padding-left: 10px;
        box-sizing: border-box;
      }
    }
    .btn {
        text-align: center;
        padding-top: 20px;
        transition: all 0.5s;
        span {
          width: 80px;
          height: 32px;
          text-align: center;
          line-height: 32px;
          background: #999999;
          background: rgba(153, 153, 153, 0.50);
          border-radius: 100px;
          display: inline-block;
          font-family: PingFangSC-Medium;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 0;
        }
        span.active {
          background: #5FB62A;
        }
    }
</style>
    