<template>
    <div>
        <header class="topB">

            <p>会员注册</p>
        </header>
        <form action="" @submit.prevent>
            <div class="regf">
                <div>
                    <label for="user">账号</label>
                    <input type="text" placeholder="账号不小于8位数">
                </div>
                <div>
                    <label for="password">密码</label>
                    <input v-if="!showPassword" v-model="password" type="password" placeholder="密码英文数字">
                    <input v-else v-model="password" type="text" placeholder="密码英文数字">
                    <i class="el-icon-more" @click="changePassWordType"></i>
                </div>

                <div class="zcinput ">
                    <input type="submit" name="submit" value="确定注册">
                    <input type="reset" name="rest" value="重置信息">
                </div>
            </div>
        </form>
    </div>
</template>
<script>
export default {
  data() {
    return {
      password: null,
      showPassword: fasle
    };
  },
  methods: {
    changePassWordType() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>
<style lang="stylus" scoped>

.topB
    position relative
    height 35px
    line-height 35px
    font-size 14px
    color #fff
    text-align center
    background #f78ba5
    .return
        position absolute
        left 7px
.regf
    margin-top 1.55rem
    font-size 0.45rem
    label
        width 2.25rem
        display inline-block
        text-align right
        color #888
    div
        padding 12px
    .zcinput
        padding 15px 2rem
        display flex
        justify-content space-between
    input
        padding 12px
        font-size 0.4rem
        border 1px solid #fff
        margin-bottom 15px
        border-radius 5px
        color #fff
        background rgb(247, 139, 165)
    input::-webkit-input-placeholder
        color #fff
    input[type='submit']
        background #fc4e4e
    input[type='reset']
        background #50bfff
</style>
