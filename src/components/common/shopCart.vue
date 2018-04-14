<template>
    <div class="foot-nav">
        <slot></slot>
        <section class="cart-Box">
            <router-link to="/shopcart" class="shop-cart">
                <div class="cart-logo">
                    <div class="shadow">
                        <div class="logo-wrapp-box" id="logo-box">
                            <i class="iconfont icon-gouwuche" style="font-size: 30px;color: #000"></i>
                        </div>
                    </div>
                    <div class="shopping-num" v-if="Totalcount">
                        <p>
                            <span  v-if="Totalcount<1000">{{Totalcount}}</span>
                            <span v-else >...</span>
                        </p>
                    </div>
                </div>
            </router-link>
            <div class="addcart" @click="Addcart" @mousedown="Bshadow()" @mouseup="Sshadow()">
                点击加入购物车
            </div>
        </section>
    </div>

</template>

<script>
    
    import Vue from 'vue'
    import { mapGetters, mapActions } from 'vuex'
    import * as type from '../../store/mutations -type.js'
    export default {
        data() {
            return {

            }
        },
        props: ['details_info'],
        computed: {
        ...mapGetters([
            'cartList'

        ]),
            shopCart: function () {
                return Object.assign({}, this.cartList[this.details_info.id]);
            },
            Totalcount: function () {
                let count = 0;
                if (this.shopCart) {
                    Object.keys(this.cartList).forEach((goods) => {
                        if (this.cartList[goods] != null) {
                            count += this.cartList[goods].num
                        }
                    })
                    return count
                } else {
                    return 0
                }
            },

        },
        methods: {
        ...mapActions([
            'Get_shopping'
        ]),
            Addcart() {
                if (!this.details_info.count) {
                    Vue.set(this.details_info, 'count', 1)
                    console.log('无记录')
                }
                this.Get_shopping({
                    data: this.details_info,
                    id: this.details_info.id
                })
                this.$emit('ball-show')
            },
            Bshadow() {
                let node = document.getElementById("logo-box")
                node.style.boxShadow = "0 0 0px rgba(255, 255, 255, 0.8) inset"
            },
            Sshadow() {
                let node = document.getElementById("logo-box")
                node.style.boxShadow = ""
            }
        },
        created() {
            $('.addcart').on('touchstart', function (event) {
                let node = document.getElementById("logo-box")
                node.style.boxShadow = "0 0 0px rgba(255, 255, 255, 0.8) inset"
            })
            $('.addcart').on('touchend', function (event) {
                let node = document.getElementById("logo-box")
                node.style.boxShadow = ""
            })
            
        },
      

    }

</script>

<style scoped>
    .cart-Box {
        display: flex;
        height: 50px;
        line-height: 55px;
        color: #fff;
        z-index: 999
    }
    
    .shop-cart {
        display: inline-block;
        flex: 1;
        text-align: center;
        background: #141d27;
    }
    
    .cart-logo {
        position: relative;
        box-sizing: border-box;
        margin: 0 20px;
        padding: 5px;
        height: 55px;
        width: 55px;
        top: -10px;
        border-radius: 50%;
        background: #141d27;
    }
    
    .logo-wrapp-box {
        border-radius: 50%;
        line-height: 40px;
        background: #fff;
        box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.2);
        transition: all linear .25s;
    }
    
    .addcart {
        flex: 2.5;
        text-align: center;
        background-color: #F78BA5;
    }
    
    .shopping-num {
        position: absolute;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        top: -5px;
        right: -5px;
        line-height: 28px;
        text-align: center;
        color: #fff;
        background: #F78BA5;
    }
</style>