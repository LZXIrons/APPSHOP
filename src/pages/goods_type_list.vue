<template>
    <div>
        <main>
            <article>
                <ul class="list-content">
                    <router-link :to="{path:'/details_GetGood_Desc',query:{
                id:item.id
            }}" tag="li" v-for="(item,index) in goods_list" class="list-item list-item-bc" :key="index">
                        <div class="L-Goods-img-box">
                            <div class="L-Goods-img-wrap">
                                <img v-lazy="item.goodspics" alt="" class="list-item-img">
                            </div>
                        </div>
                        <div class="L-Goods-txt-box">
                            <div class="L-Goods-txt">
                                <h3>
                                    <img src="../common/img/城市.png" class="city">
                                    <span> {{item.country}}直采</span>
                                    <span> {{item.bigname}}发货</span>
                                    <p class="list-item-Title" style="-webkit-box-orient: vertical"> {{item.title}}</p>
                                </h3>
                                <p class="txt-box">
                                    <span class="price-our txt-span">￥<strong style="font-size: .65rem">{{item.ourprice}}</strong></span>
                                    <i class="iconfont icon-huiyuanzhekou-copy" style="color: #f40f46;"></i> <span style="color: #f40f46;font-weight: bold">{{item.ourprice |discount(item.marketprice)}}折</span>
                                    <span class="marketprice txt-span">￥{{item.marketprice}}</span>
                                </p>
                            </div>
                        </div>
                        </router-link>
                </ul>
            </article>
            <aside class="loading">
                <Load :fullscreenLoading="fullscreenLoading"></Load>
            </aside>
        </main>
    </div>
</template>

<script>
    import Load from 'components/common/loading.vue'
    export default {
        name: 'name',
        data() {
            return {
                goods_list: [],
                page: 1,
                scroll: true,
                fullscreenLoading: ''
            }
        },
        components: {
            Load
        },
        methods: {
            Get_goods_list() {
                let typeid = this.$route.query.id
                let page = this.page
                this.scroll = false
                this.fullscreenLoading = true
                this.$http.get("/tz/goods/goodsList?goodstype=" + typeid + "&p=" + page).then((res) => {
                    let data = res.body.data
                    data.dataList.forEach((res) => {
                        this.goods_list.push(res)
                    })
                    this.scroll = true
                    this.fullscreenLoading = false
                })

            }
        },
        created() {
            this.Get_goods_list()

        },
      
        filters: {
            discount: function (value, discount) {
                let result = value / discount * 10
                return result.toFixed(1)
            }
        }
    }

</script>

<style>
.city {
  width: 0.55rem;
  vertical-align: middle;
}
.city {
  width: 0.55rem;
  vertical-align: middle;
}

.L-Goods-img-wrap {
  width: 100%;
  height: 4rem;
  margin: 0.2rem 0;
}

.L-Goods-img-box {
  flex: 1.3;
}

.L-Goods-txt-box {
  flex: 2;
  line-height: 1.3rem;
  font-size: 0.4rem;
  padding-left: 5px;
}

.L-Goods-txt {
  display: block;
  position: relative;
  width: 100%;
  height: 4rem;
  margin: 0.2rem 0;
  box-sizing: border-box;
  line-height: 1.2rem;
}
.txt-box {
  position: absolute;
  bottom: 0px;
  line-height: 12px;
}

.txt-span {
  margin-right: 10px;
  font-size: 15px;
}
</style>