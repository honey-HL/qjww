<template>
  <div>
    <scroller :on-refresh="refresh"
              :on-infinite="infinite"
              ref="my_scroller">
        <div v-for="(item, index) in items" @click="onItemClick(index, item)"
             class="row" :class="{'grey-bg': index % 2 == 0}">
          {{ item }}
        </div>

    </scroller>
  </div>
</template>

<script>
  export default {
    name: "loadMore",
    data () {
      return {
        items: []
      }
    },
    mounted() {
      console.log("阿斯蒂芬");
      this.top = 1
      this.bottom = 20
    },
    methods: {
      refresh(done) {
        setTimeout(() => {
          let start = this.top - 1
          for (let i = start; i > start - 10; i--) {
            this.items.splice(0, 0, i + ' - keep walking, be 2 with you.')
          }
          this.top = this.top - 10;
          done()
        }, 1500)
      },
      infinite(done) {
        if (this.bottom >= 30) {
          setTimeout(() => {
            done(true)
          }, 1500)
          return;
        }

        setTimeout(() => {
          let start = this.bottom + 1
          for (let i = start; i < start + 10; i++) {
            this.items.push(i + ' - keep walking, be 2 with you.')
          }
          this.bottom = this.bottom + 10
          done()
        }, 1500)
      },
      onItemClick(index, item) {
        console.log(index)
      }
    }
  }
</script>

<style scoped>

</style>
