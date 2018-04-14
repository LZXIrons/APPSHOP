<template>
    <footer>
        <slot name=""> 
            <div class="foot-nav">
                <ul class="Nav-list">
                    <router-link to="/index" tag="li" class="Nav-item-li">
                        <i class="iconfont icon-shouye"></i>
                        <p>首页</p>
                    </router-link>
                    <router-link to="/classify" tag='li' class="Nav-item-li">
                        <i class="iconfont icon-tubiao3"></i>
                        <p>分类</p>
                    </router-link>
                    <router-link to="/shopcart" tag="li" class="Nav-item-li">
                        <i class="iconfont icon-gouwuche"></i>
                        <p>购物车</p>
                    </router-link>
                    <router-link to="/user" tag="li" class="Nav-item-li">
                        <i class="iconfont icon-yonghu"></i>
                        <p>我的</p>
                    </router-link>
                </ul>
            </div>
        </slot>
    </footer>
</template>

<script>
    export default {
        name: 'name',
        data() {
            return {

            }
        },
        methods: {
            cs(){
                console.log('zff')
            }
        }
    }

</script>

<style>
    
    .Nav-list {
        display: flex;
        text-align: center;
        color: #fff
    }
    
    .Nav-item-li {
        flex: 1;
        font-size:12px; 
    }
    
    .active {
        color: rgba(218, 27, 70, 0.82);
    }
</style>