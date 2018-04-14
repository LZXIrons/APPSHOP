<template>
    <div>
        <div class="list-content shop-list" v-if="this.shopList.length>0">
            <div class="wrapper">
                <div class="Title">
                    <i style="background: #FFA5A7;width: 5px;margin-right:5px "></i>
                    <span class="shopping"> 已下单物品</span>
                    <span class="empty" @click="empty">全部清空</span>
                </div>
                <ul style="margin-bottom: 20px;">
                    <li v-for="(item,index) in shopList" :key="index" class="shop-item">
                        <router-link :to="{path:'/details_GetGood_Desc',query:{
                id:item.id
            }}">
                            <img :src="item.picture" class="goodsPic" style="z-index: 999" />
                        </router-link>
                        <div class="wrap-box" style="    padding-left: 5px;">
                            <h1 class="goodsTitle list-item-Title" style="-webkit-box-orient: vertical">{{item.name}}</h1>
                            <div>
                                <span class="iconfont icon-jianshao" @click="reduce(item.id)"></span>
                                <!--<span class="goodsNum">{{item.num}}</span>-->
                                <input type="number" :value="item.num" class="goodsNum" @input="chanceNum(item.id,index)" :data-shopId="item.id" />
                                <span class="iconfont icon-zengjia" @click="add(item.id)"></span>
                            </div>
                        </div>
                        <div class="goodsPrice">
                            <span class="price-our">
                                <i class="pay-price">￥</i>
                                <big class="price-lef-box">{{item.price}}</big>
                            </span>
                            <p class="iconfont icon-shanchu delete" @click="Delete(item.id)"></p>
                        </div>
                    </li>
                </ul>
            </div>
            <div style="height: 10px;width: 100%；"></div>
            <div class="TotalPrice-box">
                <div class="wrapper" style="display: flex;font-size: .32rem">
                    <div class="selectNum">
                        已经选择
                        <big style="font-size: .45rem;color: #FFA5A7">{{Totalcount}}</big>件商品
                    </div>
                    <div class="TotalPrice">
                        <p>
                            <span>商品总额：</span>
                            <span>￥{{TotalPrice}}</span>
                        </p>
                        <p>
                            <span>优惠：</span>
                            <span style="color: #ccc">-￥0.00</span>
                        </p>
                        <p>
                            <span>总计（不含运费，税费）:</span>
                            <span style="color: red">￥{{TotalPrice}}</span>
                        </p>
                    </div>
                </div>
                <div class="js" style="margin:25px 0 80px;margin-right:25px;float: right ">
                    <button class="b-js" type="button" value="去结算" @click="pay">去结算</button>
                </div>
            </div>
        </div>
        <div class="emptying" v-else>
            <router-link :to="{path:'/index'}" class="go-shop">
                <p class="emptyText">购物车为空，赶紧购物吧!!!</p>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import * as type from "../store/mutations -type.js";
export default {
  data() {
    return {
      shopList: '',
      msg: ""
    };
  },
  components: {},
  computed: {
    ...mapGetters(["cartList"]),
    shopCart: function() {
      return Object.assign({}, this.cartList);
    },
    Totalcount: function() {
      let count = 0;
      if (this.shopCart) {
        Object.keys(this.cartList).forEach(goods => {
          if (this.cartList[goods] != null) {
            count += this.cartList[goods].num;
          }
        });
        return count;
      } else {
        return 0;
      }
    },
    TotalPrice: function() {
      let price = 0;
      if (this.shopCart) {
        Object.keys(this.cartList).forEach(goods => {
          if (this.cartList[goods] != null) {
            price += this.cartList[goods].price * this.cartList[goods].num;
          }
        });
        let TotalPrice = price.toFixed(2);
        return TotalPrice;
      }
    }
  },
  methods: {
    chanceNum(id, index) {
      let num = parseInt(
        $(".goodsNum")
          .eq(index)
          .val()
      );
      this.$store.commit(type.CHANCENUM, { id, num, cart: this.cartList });
    },
    empty() {
      let sc = confirm("确定清空所有商品吗？");
      if (sc == true) {
        this.$store.commit(type._ShopRes);
        this.shopList = [];
        $("body").css("background", "#f2f2f2");
      } else {
        return;
      }
    },
    add(id) {
      this.$store.commit(type.AddCart, { id, cart: this.cartList });
    },
    reduce(id) {
      this.$store.commit(type.ReduceCart, { id, cart: this.cartList });
    },
    Delete(id) {
      let sc = confirm("确定删除该商品吗？");
      if (sc == true) {
        this.$store.commit(type.DeleteGoods, { id, cart: this.cartList });
      } else {
        return;
      }
    },
    pay() {
      window.alert(`需支付${this.TotalPrice}元`);
    },
    initData() {
      let cartFoodNum = 0;
      this.shopList = [];
      Object.keys(this.cartList).forEach((item, index) => {
        let foodItem = this.cartList[item];
        if (foodItem != null) {
          let goods_Pic = foodItem.picture;
          let goods_Pics = goods_Pic.substring(0, goods_Pic.length - 1);
          let Pics_Arr = goods_Pics.split("#");
          this.shopList[cartFoodNum] = {};
          this.shopList[cartFoodNum].num = foodItem.num;
          this.shopList[cartFoodNum].id = foodItem.id;
          this.shopList[cartFoodNum].name = foodItem.name;
          this.shopList[cartFoodNum].price = foodItem.price;
          this.shopList[cartFoodNum].picture = Pics_Arr[0];
          cartFoodNum++;
          console.log(window.localStorage.cartList);
        
        }
      });
    }
  },
  created() {
    console.log(this.shopList);
    document.title = "购物车";
    this.initData();
    if(this.shopList ==[]){
        $("body").css("background", "#f2f2f2");
    }
  },
  
  destroyed(){
       $("body").css("background", "#fff");
       console.log("chui")
  },
  watch: {
    shopCart: function(value) {
      this.initData();
    }
  }
};
</script>

<style scoped>
input[type="number"] {
  -moz-appearance: textfield;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.wrapper {
  padding: 8px;
  box-sizing: border-box;
  background: #fff;
}

.Title {
  font-size: 0.45rem;
  display: flex;
}

.shopping {
  color: #ffa5a7;
}

.empty {
  flex: 8;
  text-align: right;
}

.shop-item {
  position: relative;
  display: flex;
  padding: 8px 0;
}

.shop-item::before {
  position: absolute;
  display: block;
  width: 100%;
  bottom: 0;
  border: 1px solid #f2f2f2;
  border-top: 0;
  content: "";
  transform: scaleY(0.5);
}

.goodsPic {
  flex: 1;
  width: 2.2rem;
  height: 2.2rem;
  margin: 0.35rem 0;
}

.goodsPrice {
  flex: 0.8;
  text-align: right;
  position: relative;
}

.goodsTitle {
  font-size: 0.5rem;
  margin-bottom: 0.3rem;
}

.wrap-box {
  flex: 2.5;
}

.wrap-box span {
  line-height: 35px;
  font-size: 25px;
  vertical-align: middle;
  color: #ccc;
}

.goodsNum {
  background: #ffa5a7;
  color: #fff !important;
  padding: 2px;
  width: 50px;
  font-size: 14px !important;
  line-height: 20px !important;
  text-align: center;
  box-sizing: border-box;
  display: inline-block;
  border-radius: 10%;
}

.delete {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 0.5rem;
  color: #2d0101;
}

.TotalPrice-box {
  background: #f2f2f2;
  width: 100%;
  height: 100%;
  font-size: 0.3rem;
}

.selectNum {
  flex: 1;
}

.TotalPrice {
  flex: 2;
}

.TotalPrice p {
  display: flex;
}

.TotalPrice span {
  text-align: right;
  flex: 2.5;
}

.TotalPrice span:nth-child(2) {
  flex: 1.5;
}

.emptying {
  font-size: 0.3rem;
  text-align: center;
  width: 100%;
  height: 100%;
}

.b-js {
  line-height: 35px;
  background: #66ceff;
  color: #fff;
  box-shadow: 0 0 8px #ccc;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 1.8rem;
}

.go-shop {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  bottom: 40px;
  z-index: 1;
}

.emptyText {
  position: relative;
  top: 50%;
}
.shop-list{
  margin-bottom: 150px;
}
</style>