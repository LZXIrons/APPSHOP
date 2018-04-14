
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import store from './store/index'
import router from './router/index'
import app from './App'
import './common/css/reset'
import './common/css/base.css'
import './common/js/flexible'
import './common/css/animate'
import './common/fonts/iconfont.css'


import moment from 'moment'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  error: './static/imgerror.jpg',
  loading: './static/imgloading.gif',
  preLoad: 1,
  attempt: 1
});

Vue.use(ElementUI)
Vue.use(moment)
Vue.use(VueResource)


/* eslint-disable no-new */
var vm= new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app)
})
