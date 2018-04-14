<template>
  <div>
    <main>
      <header>
        <router-link to="/search">
            <search_Goods :show="shs"></search_Goods>
        </router-link>
      </header>
      <article>
        <div class="wrapper-box">
          <div class="menu-wrapp" ref="menuWrapper">
            <ul>
              <li v-for="(item,index) in types_list" :key="index" class="menu-li" :class="cur_Nav==item.id? 'active iconfont icon-wodefensi':''" @click="getIndex(index)">
                <img v-if="cur_Nav==item.id" src="../common/img/cur_Nav.png" width="28px" style="vertical-align: middle" />
                <span v-for="(item_child,index) in item" :key="index">{{item_child.desc}}</span>
              </li>
            </ul>

          </div>
          <div class="goods-wrapp" ref="goodsWrapper">
            <div class="box">
              <h3 class="goods-classify-Title">
                <i class="iconfont icon-pinpai tag-img" style="font-size: 1.2rem;"></i>
                <span>人气品牌</span>
              </h3>
              <ul class="goods-classify">
                <router-link :to="{path:'/classify_goods_list',query:{
                            Brand_id:item.id,
                            type_id:types_list[cur_Index].id
                        }}" v-for="(item,index) in types_list[cur_Index].tree.nodes[0].tree.nodes" tag="li" :key="index"
                  class="goods-classify-item">

                  <img v-lazy="item.tree.logo" class="item-logo" />
                  <div>
                    <p>{{item.tree.desc2}}</p>
                    <p>{{item.tree.desc}}</p>
                  </div>
                </router-link>
              </ul>
              <div style="height: 50px"></div>
              <h3 class="goods-classify-Title">
                <i class="iconfont icon-ceshi01 tag-img"></i>
                <span>精选分类</span>
              </h3>
              <ul class="goods-classify">
                <router-link :to="{path:'/classify_goods_type_list',query:{
                             id:item.id
                         }}" v-for="(item,index) in types_list[cur_Index].tree.nodes" tag="li" :key="index" class="goods-classify-item">
                  <img v-lazy="item.tree.logo" class="item-logo" />
                  <p>{{item.tree.desc}}</p>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </article>
      <aside>
        <div v-if="fullscreenLoading" v-loading.fullscreen="fullscreenLoading" element-loading-text="拼命加载中" style="text-align: center;"></div>
      </aside>
    </main>
  </div>
</template>

<script>
  import search_Goods from 'components/search/search_Goods.vue'
  import BScroll from 'better-scroll'

  export default {
    data() {
      return {
        types_list: [],
        cur_Nav: 1,
        cur_Index: 0,
        fullscreenLoading: '',
        shs:false
      }
    },
    components: {
      search_Goods
    },
    methods: {
      Get_types_list() {
        this.fullscreenLoading = true
        this.$http.get('/tz/goodstype/typebrandList').then((res) => {
          let data = res.body

          data.forEach((type) => {
            this.types_list.push(type)
          })
          this.$nextTick(() => {

            this._initScroll()
          })
          this.fullscreenLoading = false;
        })

      },
      _initScroll() {

        if (!this.meunScroll) {
          this.meunScroll = new BScroll(this.$refs.menuWrapper, {
            click: true,
            bounceTime: 400

          });
        }

        if (!this.goodsScroll) {
          this.goodsScroll = new BScroll(this.$refs.goodsWrapper, {
            click: true,
          });
        } else {
          this.goodsScroll.refresh()
          $('.box').css('transform', 'translate(0)')
        }
      },
      getIndex(index) {
        if (!event._constructed) {
          return;
        }
        this.cur_Nav = index + 1
        this.cur_Index = index
        this.$nextTick(() => {
          this._initScroll()
        })

      }
    },
    created() {
      this.Get_types_list();
      console.log(this.types_list)
    },


  }

</script>

<style scoped>
  .wrapper-box {
    display: flex;
    width: 100%;
    border-top: 1px solid #f2f2f2;
    font-size: .35rem;
    overflow: hidden;
  }

  .menu-wrapp {
    flex: 1;
    width: 100%;
    color: rgb(90, 88, 88);
    background: rgba(230, 228, 228, 0.6823);
  }

  .menu-li {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    overflow: hidden;
  }

  .menu-li::after {
    position: absolute;
    display: block;
    width: 100%;
    bottom: 0;
    border-bottom: 1px solid #ccc;
    content: '';
    transform: scale(1, .25);
  }

  .active {
    color: #f40f46;
    font-size: .35rem;
    background: #fff;
  }

  .goods-wrapp {
    flex: 3
  }

  .goods-classify {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    font-size: .3rem;
    text-align: center;
  }

  .goods-classify-item {
    position: relative;
    width: 31.45%;
    padding: 2px;
    margin-top: -1px;
    margin-left: -1px;
    border: 1px solid #f2f2f2;
  }

  .goods-classify-Title {
    display: table;
    width: 100%;
    height: 45px;
    line-height: 40px;
  }

  .tag-img {
    font-size: .9rem;
    color: #f40f46;
    vertical-align: middle;
  }

  .item-logo {
    width: 40px;
    height: 30px;
  }
</style>