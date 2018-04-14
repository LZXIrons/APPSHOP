<template>
    <div>
        <main>
            <article>
                <header>
                    <Banner_slide></Banner_slide>
                </header>
                <nav class="list-nav" ref="menu">
                    <a class="nav-item">人气品牌</a> 
                    <!-- <a href="#" v-for="(item,index) in subject_type" :key="index">{{item.subdesc}}</a>-->
                </nav>
                <section>
                    <div class="list-content subject-list">
                        <ul class="subject-wra">
                            <router-link :to="{path:'/classify_goods_list',query:{
                            Brand_id:item.id,
                            type_id:item.typeid
                        }}" tag="li" v-for="(item,index) in subject_List_Desc" :key="index" class="list-item list-item-subject">                               
                                    <div class="list-item-img-box">
                                        <img v-lazy="item.pic" class="list-item-img" />
                                    </div>
                                    <div class="brand-text">
                                        <div class="brand-text-box">
                                            <img v-lazy="item.logo" class="logo-img" />
                                            <p v-if="item.chinesename">{{item.chinesename}}</p>
                                            <p v-else>{{item.englishname}}</p>
                                            <p>{{item.brief}}</p>
                                            <p class="minprice">￥<strong style="font-size: .5rem">{{item.minprice}}</strong>/件起</p>
                                        </div>
                                    </div>
                                </router-link>
                        </ul>
                    </div>
                </section>
            </article>
            <aside class="loading">
                     <Load :fullscreenLoading="fullscreenLoading"></Load>
            </aside>
        </main>
        <div>{{now}}</div>
    </div>
</template>

<script>
    import Load from 'components/common/loading.vue'
    import BScroll from 'better-scroll'
    import Banner_slide from 'components/banner/banner'
    export default {
        name: 'name',
        data() {
            return {
                subject_List_Desc: [],
                type: {},
                subject_type: [],
                fullscreenLoading: ''
            }
        },
        components: {
            Banner_slide,
            Load
        },
        computed:{
            now: function () {
               
    return Date.now()
  }
        },
        methods: {
            Get_subject_brand() {
                let id = this.$route.query.id
                this.fullscreenLoading = true
                this.$http.get('/tz/venues/getBrandAndType?id=' + id).then((res) => {
                    let brand = res.body.data.brand
                    let types = res.body.data.types
                    this.type = types.slice(0)
                    brand.forEach((sub) => {
                        this.subject_List_Desc.push(sub)
                    }),
                        types.forEach((type) => {
                            this.subject_type.push(type)
                        }),

                       
                    this.fullscreenLoading = false
                })
            },
            
        },
        created() {
            this.Get_subject_brand();

        },
       
    }

</script>

<style>

    .list-nav {
        display: flex;
        font-size: .4rem;
    }
    
    .nav-item {
        flex: 1;
        text-align: center;
    }
    
    .subject-wra {
        font-size: 15px;
    }
    .subject-list{
        margin-top:20px;
    }
    .list-item-subject{
        margin-bottom: 7px;
    }
    
    .list-item-img-box {
        flex: 1.4;
        height: 4.5rem;
    }
    
    .logo-img {
        width: 2rem;
        vertical-align: middle;
    }
    
    .brand-text {
        flex: 1;
        text-align: center; 
    }
    
    .brand-text-box {
        width: 100%;
        height: 4.5rem;
        padding: .5rem 0;
        line-height: .8rem;
        box-sizing: border-box;   
    }
    
    .minprice {
        color: rgba(228, 24, 52, 0.79);
    }
</style>