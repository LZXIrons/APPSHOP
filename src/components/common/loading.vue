<template>
    <div class="Loading-T" v-if="!fullscreenLoading" style="text-align: center;margin-top:20px ">已经显示所有内容</div>
    <div  class="Loading-T" v-else v-loading.fullscreen="fullscreenLoading" element-loading-text="拼命加载中" style="text-align: center;"></div>
</template>

<script>
    export default {
        props: ['fullscreenLoading']

    }

</script>

<style scoped>
    .Loading-T{
        font-size:15px; 
    }
</style>