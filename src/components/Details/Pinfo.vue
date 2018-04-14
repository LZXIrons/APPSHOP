<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
             <el-tab-pane label="图片详情" name="first"> 
                <div class="show-Text-Pic" v-html="details_info.detailinfo" style="margin-top: 10px"></div>
            </el-tab-pane>
            <el-tab-pane label="产品参数" name="second">
                <span class="product-txt" :class="index % 2==0? 'Small-b':'Big-b'" v-for="(item,index) in productInfos" :key="index"> 
                        {{item.name}}
                    <small v-if="index % 2==0">:</small>	
                </span>
            </el-tab-pane>      
    </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first"
    };
  },
  props: ["details_info", "productInfos"],
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
.show-Text-Pic img {
  display: inline-block;
  height: auto;
  max-width: 100%;
}
.product-txt {
  box-sizing: border-box;
  padding-left: 15px;
  vertical-align: middle;
}

.Small-b {
  display: inline-block;
  width: 25%;
  color: #a7a5a5;
}

.Big-b {
  display: inline-block;
  width: 75%;
  font-size: 13px;
}
</style>
