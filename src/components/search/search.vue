<template>
    <div>
      <search_Goods style="padding: 10px 5px;" :show="shs"></search_Goods>
    </div>

</template>
<script>
import search_Goods from "./search_Goods.vue";
export default {
  data() {
    return{
      shs:true
  }
  },
  components: {
    search_Goods
  }
};
</script>