<template>
  <div>
    <div class="logoBOX">
      <img src="../../common/img/loginT.png" alt="">
      <form action="" class="loginF" @submit.prevent="submit">
          <input type="text" name="user" v-model="user" placeholder="点击输入账号" autocomplete required>
          <input type="password" name="password" v-model="password" placeholder="点击输入密码" autocomplete required>
          <input type="submit" value="立即登陆" @click="login">
          <div class="reg">
              <i></i>
              <router-link to="/register" tag="span">注册账号</router-link>
              <i></i>
          </div>
      </form>
    </div>
  </div>
</template>
<script>
    export default{
        data(){
            return{
                user:"",
                password:'',
            }
           
        },
        methods:{
                login(){
                   alert("提交了")
               }
           }
    }
</script>
<style lang="stylus" scoped>
.logoBOX
    text-align center
    font-size .466rem
    img
        margin: 1.75rem auto 0
    .loginF
        margin-top 1.55rem
    input[type=text],input[type=password],input[type=submit]
       width: 85%
       height: 1.2222rem
       margin-bottom: 1.45rem
       border: 1px solid #fff
       font-size .4rem
       border-radius: 35px
       text-align left 
       text-indent .8rem
       background #cfd6de
    input[type=submit]
        background -webkit-radial-gradient(bottom left,circle,#ff9160,#fb3a61,#b375d3)
        text-align center
        text-indent 0
        color #fff
        font-size .466rem
        font-weight bold
        line-height 1.2222rem
    .reg
        color #ff72a3
        transform: translateY(-.55rem)
        i 
            width 1.55rem
            height 1px
            background #ff72a3
            display inline-block
            margin-bottom: 5px
        span 
            margin 0 8px
</style>
