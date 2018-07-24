<template>
    <div>
        <router-view v-wechat-title="$route.meta.title"></router-view>
        
    </div>
</template>

<script>
export default {
    name: "index",
   
    data() {
        return {
            
        }
    },
    
}
</script>

<style scoped>
    
</style>
