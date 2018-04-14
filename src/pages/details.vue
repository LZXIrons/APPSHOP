<template>
    <div>
        <main class="wrapp" id="main-hook" style="margin-bottom: 80px">
            <div class="Tag-Dh">
            </div>
            <header>
                <el-carousel trigger="click" height="340px" :interval="5000" arrow="always" indicator-position="outside">
                    <el-carousel-item v-for="(item,index) in goods_PicInfo" :key="index">
                        <img :src="item.picurl" class="img_Pos" width="100%" height="340px" />
                    </el-carousel-item>
                </el-carousel>
            </header>
            <article style="padding: 0 8px;">
                <section>
                    <div class="wrapp-box">
                        <div class="good-wrap-box">
                            <span class="price-our asset-item asset-item-detail">
                                <i class="pay-price">￥</i>
                                <strong style="font-size: .8rem;" class="price-lef-box">
                                {{details_info.ourprice}}.00         
                                </strong>
                            </span>
                            <span class="discount-tag asset-item asset-item-detail">
                            <i class="iconfont icon-huiyuanzhekou-copy discount-img" ></i> 
                            {{details_info.ourprice |discount(details_info.marketprice)}}折
                            </span>
                            <span class="marketprice asset-item asset-item-detail">￥{{details_info.marketprice}}</span>
                        </div>
                        <p style="color: #B9B7B7">
                            <img src="../common/img/城市.png" class="city-img city-img-jz">
                            <span> {{details_info.country}}直采</span>
                            <span> {{details_info.bigname}}发货</span>
                            <span> 5天送达</span>
                        </p>
                    </div>
                </section>
                <section>
                    <div class="wrapp-box2">
                        <p class="item-title"> {{details_info.title}}</p>
                        <p class="item-desc">{{details_info.reason}}</p>
                    </div>
                </section>
                <section>
                    <div class="wrapp-box" style="padding: 10px 0;">
                        <p class="wra-tag">
                            <i class="iconfont icon-yunshuzhongwuliu i-bk"></i>
                            <span class="wra-tag-text"> 满包邮，非偏远地区满88包邮，偏远地区498包邮</span>
                        </p>
                        <p class="wra-tag">
                            <i class="iconfont icon-anquanbaozhang i-bk"></i>
                            <span class="wra-tag-text"> 免税费，每单低于50元免征，系统将为你自动拆单</span>
                        </p>
                        <p class="wra-tag">
                            <i class="iconfont icon-zonglanmendian54 i-bk"></i>
                            <span class="wra-tag-text">实体店，实体店可现货自选/体验直邮</span>
                        </p>
                    </div>
                </section>
                <section>
                    <div class="product-box">                 
                           <pinfo :details_info="details_info" :productInfos="productInfos"></pinfo>                    
                    </div>
                </section>
            </article>
            <aside class="loading">
                <Load :fullscreenLoading="fullscreenLoading"></Load>
            </aside>
        </main>
        <footer>
            <shopCart @ball-show="ball_dh" :details_info="details_info">
                <section>
                    <div class="ball-hook" v-for="(ball,index) in balls" :key="index">
                        <transition name="ball_dh"  @before-enter="DropBefore()" @enter="Droping()" @after-enter="DropAfter()" >
                            <div v-show="ball.show" class="ballImg-box">
                                <img :src="PicInfo_first" class="ballImg" />
                            </div>
                        </transition>
                    </div>
                </section>
            </shopCart>
        </footer>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import * as type from "../store/mutations -type.js";
import shopCart from "components/common/shopCart.vue";
import Load from "components/common/loading.vue";
import Pinfo from "components/Details/Pinfo";
export default {
  data() {
    return {
      goods_PicInfo: [],
      PicInfo_first: {},
      productInfos: [],
      fullscreenLoading: false,
      IsShow: "",
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: []
    };
  },
  computed: {
    ...mapGetters(["details_info"])
  },
  components: {
    shopCart,
    Load,
    Pinfo
  },
  methods: {
    Get_details_info() {
      let _Goodsid = this.$route.query.id;
      this.fullscreenLoading = true;
      this.$http.get("/tz/goods/inqgoods?id=" + _Goodsid).then(res => {
        let data = res.body.data;
        let goods_Pic = data.goodspics;
        let goods_Pics = goods_Pic.substring(0, goods_Pic.length - 1);
        let Pics_Arr = goods_Pics.split("#");
        if (Pics_Arr) {
          for (var i = 0; i < Pics_Arr.length; i++) {
            this.goods_PicInfo.push({
              picurl: Pics_Arr[i]
            });
          }
          this.PicInfo_first = this.goods_PicInfo[0].picurl;
        }
        let product_Info = data.prodparams;
        let product_Infos = product_Info.substring(3, product_Info.length - 3);
        let productArr = product_Infos.split("|||");
        if (productArr) {
          for (var i = 0; i < productArr.length; i++) {
            this.productInfos.push({
              name: productArr[i]
            });
          }
        }
        this.$store.commit(type.DETAILS_INFO, data);
        this.$nextTick(() => {
          this.fullscreenLoading = false;
        });
      });
    },
 ball_dh() {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          ball.show = true;
          this.dropBalls.push(ball);
          return;
        }
        console.log(ball.show);
      }
    },
    DropBefore(DropEl) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let tag = document.getElementsByClassName("Tag-Dh")[0];
          let rect = tag.getBoundingClientRect();
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 30);
          let move_box = document.getElementsByClassName("ballImg-box")[0];
          let move_inner = document.getElementsByClassName("ballImg")[0];
          move_box.style.display = "";
          move_box.style.webkitTransform = `translate3d(0,${y}px,0)`;
          move_box.style.transform = `translate3d(0,${y}px,0)`;
          move_inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          move_inner.style.transform = `translate3d(${x}px,0,0)`;
          console.log(1);
        }
      }
    },
    Droping(DropEl, done) {
      let move_box = document.getElementsByClassName("ballImg-box")[0];
      let move_inner = document.getElementsByClassName("ballImg")[0];
      /* eslint-disable no-unused-vars */
      let rf = move_box.offsetHeight; //html重绘
      this.$nextTick(() => {
        move_box.style.transform = "translate3d(0,0,0)";
        move_box.style.webkitTransform = "translate3d(0,0,0)";
        move_inner.style.transform = "translate3d(0,0,0)";
        move_inner.style.webkitTransform = "translate3d(0,0,0)";
       move_box.addEventListener("transitionend", done);

      });
      console.log(2);
    },
    DropAfter(DropEl) {
    
        let move_box = document.getElementsByClassName("ballImg-box")[0];
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          move_box.style.display = "none";
        }
     
      console.log(3);
    }
  },
  filters: {
    discount: function(value, discount) {
      let result = value / discount * 10;
      return result.toFixed(1);
    }
  },

  mounted() {
    this.Get_details_info();
  }
};
</script>

<style>
.Tag-Dh {
  position: fixed;
  left: 45%;
  top: 100px;
}

.item-title {
  line-height: 30px;
  font-size: 0.5rem;
}

.item-desc {
  padding-top: 12px;
  line-height: 25px;
}

.wrapp-box {
  margin-bottom: -1px;
  border: 1px solid #f2f2f2;
  border-left: none;
  border-right: none;
}

.wrapp-box2 {
  padding: 10px 0;
}

.asset-item-detail {
  margin-right: 15px;
}

.wra-tag {
  display: block;
  text-align: left;
  line-height: 30px;
}

.wra-tag-text {
  color: #464242;
}

.product-box {
  width: 100%;
}

.ball-hook {
  position: absolute;
  bottom: 10px;
  left: 32px;
  height: 50px;
}

.ballImg-box {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.6s cubic-bezier(0, 0, 1, -0.33);
}

.ballImg {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.6s linear;
}
.move_ballImg-box {
  /*display:none;
		transition: all .6s cubic-bezier(0, 0, 1, -0.33);*/
}
.p-title-fixed {
  position: fixed;
  width: 780px;
  top: 0;
  border-bottom: 1px solid #f2f2f2;
  font-size: 0.45rem;
  line-height: 45px;
  background: #fff;
}

.el-carousel__item.is-active {
  z-index: 0 !important;
}
</style>