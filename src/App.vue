<template>
  <div>
    <transition :name="transitionName" mode='out-in'>
      <keep-alive>
        <router-view v-cloak v-if="$route.meta.keepAlive" class="active_view"></router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName" mode='out-in'>
      <router-view v-cloak v-if="!$route.meta.keepAlive" class="active_view"></router-view>
    </transition>
    <Foot_Nav v-if="Isshow"></Foot_Nav>
  </div>

</template>

<script>
import Foot_Nav from "./components/foot/foot.vue";
export default {
  data() {
    return {
      transitionName: "",
      is_Adclass: true,
      Isshow: true
    };
  },
  components: {
    Foot_Nav
  },
  mounted() {
    if (this.$route.name == "details") {
      this.Isshow = false
    }
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("").length;
      const fromDepth = from.path.split("").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
      if (to.name == "details" || to.name == "login" || to.name == "reg") {
        this.Isshow = false;
        // alert( this.transitionName)
      } else {
        this.Isshow = true;
      }
      // title
      if (to.meta.title) {
        document.title = to.meta.title;
      }
    }
  }
};
</script>

<style>
[v-cloak] {
  display: none;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(150px, 0);
  transform: translate(150px, 0);
  transition-delay: 0.5s;
  -webkit-transition-delay: 0.5s;
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-150px, 0);
  transform: translate(-150px, 0);
  transition-delay: 0.5s;
  -webkit-transition-delay: 0.5s;
}

.slide-enter-active {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.slide-leave-active {
  -webkit-transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.active_view {
  box-sizing: border-box;
  bottom: 0;
  height: 100%;
  width: 100%;
  max-width: 780px;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>