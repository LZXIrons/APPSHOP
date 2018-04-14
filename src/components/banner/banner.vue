<template>
        <el-carousel trigger="click" height='5rem' indicator-position="outside">
            <el-carousel-item v-for="(item,index) in Banner_slide" :key="index">
                <a :href="item.targeturl">
                    <img :src="item.picurl" class="img-Pos" />
                </a>
            </el-carousel-item>
        </el-carousel>
</template>

<script>
    export default {
        data() {
            return {
                Banner_slide: [],           //轮播图
            }
        },
        methods: {
            //banner获取
            Get_banner() {

                this.$http.get('/tz/slider/list').then((res) => {
                    let data = res.body
                    data.forEach((item) => {
                        this.Banner_slide.push(item)
                    })
                })

            }
        },
       created () {
             this.Get_banner();
             console.log(this.Banner_slide)
        },
      
    }

</script>

<style scoped>
    
    .img-Pos {
        width: 100%;
        height: 100%;
    }
</style>