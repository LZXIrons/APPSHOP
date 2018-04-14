<template>
  <div>
    <main>
      <header>
        <Banner_slide></Banner_slide>
      </header>
      <section>
        <shop_tag></shop_tag>
      </section>
      <article>
        <div class="Index-con">
          <section>
            <h3 class="lt-head">
              <span class="tag-tit iconfont icon-mingguan"></span>
              <span class="lt-title t-subject">主题馆</span>
            </h3>
            <div class="subject-list">
              <router-link v-for="(item,index) in Subject_Arry" :key="index" :to="{path:'/subject_List',query:{
                    id:item.id

                }}" class="subject-item">
                <img v-lazy="item.smallpic" class="subject_img" />
              </router-link>
            </div>
          </section>
          <section>
            <h3 class="lt-head">
              <span class="tag-tit-jx iconfont icon-jingxuantuijian"></span>
              <span class="lt-title">环球精选</span>
            </h3>

            <!-- 滚动加载 -->
            <div class="good-list">
              <router-link :to="{path:'/details_GetGood_Desc',query:{
                id:good.id
            }}" v-for="(good,index) in scrolldata" :key="index">
                <img v-lazy="good.choicepic" width="100%" />
                <div style="margin: .28rem 0">
                  <h1 class="Good-tit">{{good.title}}</h1>
                  <div style="margin-top:.22rem ">
                    <div class="good-wrap-box">
                      <span class="price-our asset-item-index asset-item-p-index">
                        <i class="pay-price">￥</i>
                        <strong class="price-lef-box">{{good.ourprice}}.00</strong>
                      </span>
                      <span class="discount-tag  asset-item-index">
                        <i class="iconfont icon-huiyuanzhekou-copy discount-img"></i>
                        <big> {{good.ourprice|discount(good.marketprice)}}折</big>
                      </span>
                      <span class="marketprice  asset-item-index">
                        ￥{{good.marketprice}}.00
                      </span>
                      <span class="Address">
                        <span style="float: right">
                          <img src="../common/img/城市.png" class="city-img" />
                          <div class="address-text">
                            <small class="a-t-css">{{good.country}}直采</small>
                            <br>
                            <small class="a-t-css">{{good.bigname}}发货</small>
                          </div>
                        </span>
                      </span>

                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </section>
        </div>
      </article>
      <aside style="margin-bottom: 50px;">
        <Load :fullscreenLoading="fullscreenLoading"></Load>
      </aside>
    </main>
  </div>
</template>

<script>
import Banner_slide from "components/banner/banner.vue";
import shop_tag from "components/common/shop_tag.vue";
import $ from "jquery";
import Load from "components/common/loading.vue";
export default {
  name: "name",
  data() {
    return {
      scrolldata: [],
      Subject_Arry: [],
      fullscreenLoading: true,
      get: true //是否滚动加载
    };
  },

  computed: {

  },
  components: {
    Banner_slide,
    shop_tag,
    Load
  },
  created() {
    this.subjectGet();
    this.scrollGet();
  },
  mounted() {
    let i = 0;
    $(window).on("scroll", () => {
      let wh = $(window).height();
      let sh = $(window).scrollTop();

      if ($(document).height() < wh + sh + 20 && this.get) {
        this.get = false;
        this.scrollGet();
        i++;
        console.log("滚动加载+", i);
      }
    });
  },
  methods: {
    subjectGet() {
      this.$http.get("/tz/venues/venuesList").then(res => {
        let data = res.data;
        data.data.forEach(subject => {
          this.Subject_Arry.push(subject);
        });
      });
    },
    scrollGet() {
      this.$http.get("/tz/goods/choiceList").then(res => {
        let scdata = res.data;
        scdata.data.dataList.forEach(good => {
          this.scrolldata.push(good);
        });
        this.fullscreenLoading = false;
        this.get = true;
      });
    }
  },
  filters: {
    discount: function(value, discount) {
      let result = value / discount * 10;
      return result.toFixed(1);
    }
  }
};
</script>

<style scoped>
.tag-tit {
  font-size: 1.5rem;
}

.tag-tit-jx {
  font-size: 1.2rem;
  color: #f40f46;
}

.lt-head {
  display: flex;
  line-height: 2.2rem;
}

.lt-title {
  padding-left: 5px;
  font-size: 0.7rem;
}

.t-subject {
  position: relative;
  top: 15px;
}

.Index-con {
  padding: 0 10px;
  box-sizing: border-box;
}

.subject-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.subject-item {
  width: 49%;
}

.subject_img {
  width: 100%;
}

.Good-tit {
  font-size: 0.5rem;
  color: #353030;
}
.asset-item-index {
  flex: 1;
  line-height: 1.2rem;
}
.asset-item-p-index {
  flex: 1.2;
}

.Address {
  flex: 1.5 !important;
}

.address-text {
  display: inline-block;
  line-height: 0.4rem;
}
.a-t-css {
  font-size: 0.3rem;
}
</style>