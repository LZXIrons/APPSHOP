<template>
    <div>
        <div class="Classify-search-box">
            <input type="text" class="search-box" v-model="searchData" placeholder="点击搜索商品" />
            <button type="submit" class="Classify-search" @click="search" @submit.prevent="search">搜索</button>
        </div>
        
       <div v-show="show">
            <div class="HistBox" >
            <p class="hist">搜索记录:</p>
            <ul class="hisitems">
                <li class="item" v-for="(item,index) in searchHistory" :key="index">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="clear" @click="clear">
            清除历史记录
        </div>
       </div>
        
    </div>

</template>

<script>
export default {
  data() {
    return {
      searchData: "",
      searchHistory:JSON.parse(localStorage.getItem('searchItems')) || [],

    };
  },
  props:['show'],
  methods:{
      search(){
        this.searchHistory.push(this.searchData);
        if(this.searchHistory.length!=0){
            localStorage.setItem("searchItems",JSON.stringify(this.searchHistory))
        };
      },
      clear(){
        localStorage.removeItem("searchItems");
        this.searchHistory=[];
        
      }
  },
  
};
</script>
<style lang="stylus" scoped>
.Classify-search-box
    padding 10px 5px
    display flex
    box-sizing border-box
    justify-content space-between
   
.search-box
    width 80%
input, button
    line-height 38px
    height 38px
    color #fff
    border-radius 5px
    font-weight bold
input[type='text']
    color #000
    text-indent 14px
    border 1px solid #f78ba5
    outline none
    &:focus
        box-shadow 0 0 5px #f78ba5
.Classify-search
    width 19%
    border none
    background #f40f46
    border-radius 5px
.hist
    line-height 38px
    font-size 18px
    color #ccc;
.hisitems
    display flex;
    flex-wrap wrap
    color #fff
    .item
        background #ccc
        padding 5px
        margin 5px
        border-radius 2px
.clear
    text-align center
    color #fff
    font-size 18px;
    line-height 38px;
    border-radius 2px 
    background pink 
    border none
</style>

