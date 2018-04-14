<template>
    <div>
        <main>
            <header>
                <div class="head">
                    <div class="wrapp">
                        <div class="fileimg">
                            <div v-if="login"><img src="../common/img/user.jpg" alt=""></div>
                            <div class="login-link"  v-else>
                                <router-link to="/login"> 点击注册/登陆</router-link>             
                               </div>
                        </div>
                    </div>
                </div>
            </header>
            <section>
                <div class="userbox">
                    <ul>
                        <li class="userbox-item">
                            <i class="iconfont icon-dingdan i-left"></i> 我的订单
                            <i class="iconfont icon-jiantouyou i-right"></i>
                        </li>
                        <li class="order-dsf userbox-item">
                            <div class="dsf-wrapper">
                                <i class="iconfont icon-daibanshoufei i-block"></i> 代付款
                            </div>
                            <div class="dsf-wrapper">
                                <i class="iconfont icon-yizhandaishou i-block"></i> 代收货
                            </div>
                        </li>
                        <br/>
                        <li class="userbox-item">
                            <i class="iconfont icon-jikediancanicon18 i-left"></i> 我的代金卷
                            <i class="iconfont icon-jiantouyou i-right"></i>
                        </li>
                        <li class="userbox-item">
                            <i class="iconfont icon-icontuan i-left"></i> 我的拼团
                            <i class="iconfont icon-jiantouyou i-right"></i>
                        </li>
                        <li class="userbox-item">
                            <i class="iconfont icon-gouwuche i-left"></i> 我的购物车
                            <i class="iconfont icon-jiantouyou i-right"></i>
                        </li>
                        <li class="userbox-item">
                            <i class="iconfont icon-shouhuodizhi i-left"></i> 收获地址管理
                            <i class="iconfont icon-jiantouyou i-right"></i>
                        </li>
                        <li class="userbox-item">
                            <i class="iconfont icon-yunshuzhongwuliu i-left"></i> 送货流程
                            <i class="iconfont icon-jiantouyou i-right"></i>
                        </li>
                        <li class="userbox-item">
                            <i class="iconfont icon--kefu i-left"></i> 联系客服，节假日无休09:00~21:00
                            <i class="iconfont icon-jiantouyou i-right"></i>
                        </li>
                    </ul>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {
  components: {}
};
</script>
<style lang="stylus" scoped>
.fileimg {
    img {
        width: 100%;
    }

    .login-link {
        text-align: center;
        line-height: 2rem;
    }
}
</style>

<style scoped>
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 100%;
  background: #66ceff;
}

.wrapp {
  width: 2rem;
  height: 2rem;
  padding: 2px;
  border: 1px solid #f2f2f2;
  border-radius: 50%;
}

.fileimg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: #fff;
  overflow: hidden;
}

.userbox {
  margin-bottom: 50px;
  background: #ccc;
}

.userbox-item {
  box-sizing: border-box;
  width: 100%;
  padding: 0 15px;
  border-bottom: 1px solid #f2f2f2;
  line-height: 45px;
  background: #fff;
}

.i-left {
  float: left;
  margin-right: 15px;
  color: #a7abab;
}

.i-right {
  float: right;
  font-size: 20px;
  color: #ccc;
}

.i-block {
  display: block;
  color: #ccc;
}

.order-dsf {
  display: flex;
}

.dsf-wrapper {
  flex: 1;
  text-align: center;
  line-height: 30px;
}
</style>